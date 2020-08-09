import { Handler } from 'express';
export declare type expressRenderFunction = (pagePath: string, ssrParams?: any, cacheOptions?: {
    key: string;
    time: number;
}) => Promise<void>;
/**
 * 获取中间件
 * @param options 参数
 */
declare function ssrHandler({ renderFunctionName, bundlePath, isCacheRenderer, serverOrigin, }: {
    renderFunctionName?: string;
    /**
     * bundlePath  vue ssr bundle 的路径
     * 通常情况下，配合yi-vue-ssr-builder,此值应该设置为 dist/server-bundle
     */
    bundlePath: string;
    /**
     * 是否缓存renderer，在正式环境下开启，在开发测试环境下关闭
     */
    isCacheRenderer: boolean;
    /**
     * 这个是一个必传值
     * 默认是：http://127.0.0.1:80
     * 此值用于传给vue ssr context, 用于服务端渲染时访问本服务器接口
     */
    serverOrigin: string;
}): Handler;
export default ssrHandler;
