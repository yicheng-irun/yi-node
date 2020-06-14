// 感谢使用yi-vue-ssr-build工具
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const projectPath = process.cwd();
module.exports = {
   projectPath,

   /**
     * 默认情况下是 src/client
     */
   srcPath: path.resolve(projectPath, './src/client'),

   /**
     * 默认情况下是 dist/client
     */
   distPath: path.resolve(projectPath, './lib/client'),

   /**
     * 默认情况下是 dist/server-bundle
     * 路径最终需要传给yi-vue-ssr-middleware库来使用
     */
   distBundlePath: path.resolve(projectPath, './lib/server-bundle'),

   /**
     * 开发时，请访问devServerPort
     */
   devServerPort: Number.parseInt(process.env.DEV_SERVER_PORT || '20000', 10),

   /**
     * node server 在开发模式下监听的端口，用于webpack devServer 的proxy
     */
   devNodeServerPort: Number.parseInt(process.env.HTTP_PORT || '80', 10),

   webpack: {
      /**
         * baseConfig 是生成clientContig和serverConfig的基础配置，有些配置项改这个是一箭双雕
         * @param configuration webpack.Configuration
         * @param buildConfig BuildConfig
         * @param chunks client|server
         * @returns webpack.Configuration
         */
      baseConfigProcess (configuration, buildConfig, chunks) {
         const { rules } = configuration.module;
         rules.forEach((ruleItem) => {
            if (ruleItem.test && ruleItem.test.test('xxx.less')) {
               ruleItem.use.forEach((useItem) => {
                  if (useItem && useItem.loader === 'less-loader') {
                     useItem.options = {
                        ...useItem.options,
                        lessOptions: {
                           modifyVars: {
                              'success-color': '#52c41a',
                              'error-color': '#f5222d',
                           //   'primary-color': '#1DA57A',
                           //   'link-color': '#1DA57A',
                           //   'border-radius-base': '2px',
                           },
                           javascriptEnabled: true,
                        },
                     };
                  }
               });
            }
         });
         return configuration;
      },

      /**
         * clientConfig 基于baseConfig生成的clientConfig，用于给客户端使用的
         * @param configuration webpack.Configuration
         * @param buildConfig BuildConfig
         */
      clientConfigProcess (configuration, buildConfig) {
         return configuration;
      },

      /**
         * serverConfig 基于baseConfig生成的serverConfig，用于给服务端使用的
         * @param configuration webpack.Configuration
         * @param buildConfig BuildConfig
         */
      serverConfigProcess (configuration, buildConfig) {
         return configuration;
      },
   },
};
