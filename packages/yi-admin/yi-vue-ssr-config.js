/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
// / 感谢使用yi-vue-ssr-build工具
const devConfig = require('./yi-vue-ssr-config-dev');

module.exports = {
   ...devConfig,
   webpack: {
      ...devConfig.webpack,

      /**
         * clientConfig 基于baseConfig生成的clientConfig，用于给客户端使用的
         * @param configuration webpack.Configuration
         * @param buildConfig BuildConfig
         */
      clientConfigProcess (configuration, buildConfig) {
         delete configuration.output.publicPath;
         configuration.plugins[4].options.inject = false;
         // configuration.plugins.push(new BundleAnalyzerPlugin());
         return configuration;
      },

      /**
         * serverConfig 基于baseConfig生成的serverConfig，用于给服务端使用的
         * @param configuration webpack.Configuration
         * @param buildConfig BuildConfig
         */
      serverConfigProcess (configuration, buildConfig) {
         delete configuration.output.publicPath;
         configuration.plugins[4].options.inject = false;
         return configuration;
      },
   },
};
