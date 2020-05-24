import Url from 'url';

const runtime = {
   isServer: false,
   isClient: true,
   isProd: true,
   isDev: false,

   serverOrigin: '',
   baseUrl: '', // 用于屏蔽服务端和客户端的ajax请求的baseUrl

   action: {
      ctx: null, // koa的ctx
      ssrParams: null,
   },
   pagePath: '',
   query: {},

   // 仅在服务端运行
   setServerContext (context) {
      const {
         ssrParams,
         serverOrigin,
         pagePath,
         ctx,
         query,
      } = context;

      runtime.serverOrigin = serverOrigin;
      runtime.baseUrl = `${serverOrigin}${ctx.originalUrl}`;
      runtime.action.ctx = ctx;
      runtime.query = query;
      runtime.action.ssrParams = ssrParams;
      runtime.pagePath = pagePath;
   },

   clientInit () {
      const { location } = window;
      const loc = Url.parse(location.href, true);
      runtime.serverOrigin = location.origin;
      runtime.baseUrl = location.href;

      runtime.query = loc.query;
      // eslint-disable-next-line no-underscore-dangle
      runtime.pagePath = window._SSR_PAGE_ || runtime.query._pagePath;
   },
};

if (global.process?.env?.VUE_ENV === 'server') {
   runtime.isServer = true;
   runtime.isClient = false;
} else {
   runtime.clientInit();
}

if (global.process?.env?.NODE_ENV === 'development') {
   runtime.isDev = true;
   runtime.isProd = false;
}


export default runtime;
