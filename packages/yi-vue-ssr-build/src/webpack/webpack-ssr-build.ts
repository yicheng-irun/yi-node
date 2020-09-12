import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import WebpackDevServer from 'webpack-dev-server';
import createClientConfig from './webpack-ssr-client-config';
import createServerConfig from './webpack-ssr-server-config';
import { BuildConfig } from '../build-config';
import printInfo from './print';

function build (config: BuildConfig): void {
   const clientConfig = createClientConfig(config);
   const serverConfig = createServerConfig(config);

   const clientConfig2 = webpackMerge(clientConfig, {
      devServer: {
         hot: !config.isProduction,
      },
   });


   clientConfig2.plugins = [
      ...clientConfig2.plugins,
   ].concat(config.isProduction ? [] : [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()]);


   if (config.isProduction) {
      delete clientConfig2.devServer;
      webpack(clientConfig2, (err, stats) => {
         printInfo(err, stats, config.isProduction);
      });
   } else {
      const devServerOptions = {
         host: '0.0.0.0',
         port: config.devServerPort,
         historyApiFallback: false,
         noInfo: true,
         hot: true,
         allowedHosts: [
         ],
         open: false,
         openPage: 'index.html',
         before (app): void {
            // app.use(morgan('dev'));
         },
         proxy: { // 全局代理到后端
            '/': `http://localhost:${config.devNodeServerPort}`,
         },
      };

      WebpackDevServer.addDevServerEntrypoints(clientConfig2, devServerOptions);

      const compiler = webpack(clientConfig2);

      const server = new WebpackDevServer(compiler, devServerOptions);

      server.listen(config.devServerPort, '0.0.0.0', () => {
         console.log(`dev服务监听在${config.devServerPort}`);
      });
   }

   if (serverConfig) {
      const startTime = Date.now();
      webpack(serverConfig, (err, stats) => {
         printInfo(err, stats, config.isProduction);
         if (config.isProduction) {
            const endTime = Date.now();
            console.log('服务端构建时间', endTime - startTime);
         }
      });
   } else {
      console.info('返回空服务端构建配置，跳过服务端构建');
   }
}

export default build;
