import axios from 'axios';
import Url from 'url';
import runtime from './runtime';

export function createAxios () {
   if (runtime.isServer) {
      const instance = axios.create({
         // add headers to server side requests
         headers: {
            ...runtime.action.ctx.request.header,
            accept: '*/*',
         },

         baseURL: runtime.baseUrl,
         validateStatus (status) {
            if ([200, 500].indexOf(status) >= 0) return true;
            return false;
         },
      });
      instance.interceptors.request.use((reqConfig) => {
         // 使服务端也能像在前端一样使用相对路径
         reqConfig.url = Url.resolve(`${reqConfig.baseURL}`, reqConfig.url);
         return reqConfig;
      });
      instance.interceptors.response.use((response) => {
         /**
          * throw the 'set-cookie' of the ajax response header to action response header
          */
         let newSetCookie = response.headers && response.headers['set-cookie'];
         if (newSetCookie) {
            const oldSetCookie = runtime.action.ctx.response.header['set-cookie'] || [];
            if (!Array.isArray(newSetCookie)) {
               newSetCookie = [newSetCookie];
            }
            runtime.action.ctx.response.set('set-cookie', newSetCookie.concat(oldSetCookie));
         }
         return response;
      }, (error) => Promise.reject(error));
      return instance;
   }
   return axios.create({
      validateStatus (status) {
         if ([200, 500].indexOf(status) >= 0) return true;
         return false;
      },
   });
}

export function get (url, params, axiosConfig = {}) {
   return createAxios().get(url, {
      params,
      ...axiosConfig,
   });
}

export function post (url, data, params, axiosConfig = {}) {
   return createAxios().post(url, data, {
      params,
      ...axiosConfig,
   });
}


export default {
   get,
   post,
};
