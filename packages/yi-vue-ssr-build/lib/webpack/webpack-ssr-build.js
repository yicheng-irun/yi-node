"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const webpack_merge_1 = __importDefault(require("webpack-merge"));
const webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
const webpack_ssr_client_config_1 = __importDefault(require("./webpack-ssr-client-config"));
const webpack_ssr_server_config_1 = __importDefault(require("./webpack-ssr-server-config"));
const print_1 = __importDefault(require("./print"));
function build(config) {
    const clientConfig = webpack_ssr_client_config_1.default(config);
    const serverConfig = webpack_ssr_server_config_1.default(config);
    const clientConfig2 = webpack_merge_1.default(clientConfig, {
        devServer: {
            hot: !config.isProduction,
        },
    });
    clientConfig2.plugins = [
        ...clientConfig2.plugins,
    ].concat(config.isProduction ? [] : [new webpack_1.default.NamedModulesPlugin(), new webpack_1.default.HotModuleReplacementPlugin()]);
    if (config.isProduction) {
        delete clientConfig2.devServer;
        webpack_1.default(clientConfig2, (err, stats) => {
            print_1.default(err, stats, config.isProduction);
        });
    }
    else {
        const devServerOptions = {
            host: '0.0.0.0',
            port: config.devServerPort,
            historyApiFallback: false,
            noInfo: true,
            hot: true,
            allowedHosts: [],
            open: false,
            openPage: 'index.html',
            before(app) {
                // app.use(morgan('dev'));
            },
            proxy: {
                '/': `http://localhost:${config.devNodeServerPort}`,
            },
        };
        webpack_dev_server_1.default.addDevServerEntrypoints(clientConfig2, devServerOptions);
        const compiler = webpack_1.default(clientConfig2);
        const server = new webpack_dev_server_1.default(compiler, devServerOptions);
        server.listen(config.devServerPort, '0.0.0.0', () => {
            console.log(`dev服务监听在${config.devServerPort}`);
        });
    }
    if (serverConfig) {
        const startTime = Date.now();
        webpack_1.default(serverConfig, (err, stats) => {
            print_1.default(err, stats, config.isProduction);
            if (config.isProduction) {
                const endTime = Date.now();
                console.log('服务端构建时间', endTime - startTime);
            }
        });
    }
    else {
        console.info('返回空服务端构建配置，跳过服务端构建');
    }
}
exports.default = build;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay1zc3ItYnVpbGQuanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsid2VicGFjay93ZWJwYWNrLXNzci1idWlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5QixrRUFBeUM7QUFDekMsNEVBQWtEO0FBQ2xELDRGQUE2RDtBQUM3RCw0RkFBNkQ7QUFFN0Qsb0RBQWdDO0FBRWhDLFNBQVMsS0FBSyxDQUFFLE1BQW1CO0lBQ2hDLE1BQU0sWUFBWSxHQUFHLG1DQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hELE1BQU0sWUFBWSxHQUFHLG1DQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRWhELE1BQU0sYUFBYSxHQUFHLHVCQUFZLENBQUMsWUFBWSxFQUFFO1FBQzlDLFNBQVMsRUFBRTtZQUNSLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZO1NBQzNCO0tBQ0gsQ0FBQyxDQUFDO0lBR0gsYUFBYSxDQUFDLE9BQU8sR0FBRztRQUNyQixHQUFHLGFBQWEsQ0FBQyxPQUFPO0tBQzFCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLGlCQUFPLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxJQUFJLGlCQUFPLENBQUMsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFHbEgsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFO1FBQ3RCLE9BQU8sYUFBYSxDQUFDLFNBQVMsQ0FBQztRQUMvQixpQkFBTyxDQUFDLGFBQWEsRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNuQyxlQUFTLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFDLENBQUM7S0FDTDtTQUFNO1FBQ0osTUFBTSxnQkFBZ0IsR0FBRztZQUN0QixJQUFJLEVBQUUsU0FBUztZQUNmLElBQUksRUFBRSxNQUFNLENBQUMsYUFBYTtZQUMxQixrQkFBa0IsRUFBRSxLQUFLO1lBQ3pCLE1BQU0sRUFBRSxJQUFJO1lBQ1osR0FBRyxFQUFFLElBQUk7WUFDVCxZQUFZLEVBQUUsRUFDYjtZQUNELElBQUksRUFBRSxLQUFLO1lBQ1gsUUFBUSxFQUFFLFlBQVk7WUFDdEIsTUFBTSxDQUFFLEdBQUc7Z0JBQ1IsMEJBQTBCO1lBQzdCLENBQUM7WUFDRCxLQUFLLEVBQUU7Z0JBQ0osR0FBRyxFQUFFLG9CQUFvQixNQUFNLENBQUMsaUJBQWlCLEVBQUU7YUFDckQ7U0FDSCxDQUFDO1FBRUYsNEJBQWdCLENBQUMsdUJBQXVCLENBQUMsYUFBYSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFFMUUsTUFBTSxRQUFRLEdBQUcsaUJBQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV4QyxNQUFNLE1BQU0sR0FBRyxJQUFJLDRCQUFnQixDQUFDLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBRWhFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUMsQ0FBQztLQUNMO0lBRUQsSUFBSSxZQUFZLEVBQUU7UUFDZixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDN0IsaUJBQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDbEMsZUFBUyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzNDLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRTtnQkFDdEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLEdBQUcsU0FBUyxDQUFDLENBQUM7YUFDOUM7UUFDSixDQUFDLENBQUMsQ0FBQztLQUNMO1NBQU07UUFDSixPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7S0FDckM7QUFDSixDQUFDO0FBRUQsa0JBQWUsS0FBSyxDQUFDIn0=