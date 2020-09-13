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
    ].concat(config.isProduction ? [] : [new webpack_1.default.HotModuleReplacementPlugin()]);
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
            writeToDisk: (filePath) => {
                if (filePath.startsWith(config.distBundlePath))
                    return true;
                return false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay1zc3ItYnVpbGQuanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsid2VicGFjay93ZWJwYWNrLXNzci1idWlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5QixrRUFBeUM7QUFDekMsNEVBQWtEO0FBQ2xELDRGQUE2RDtBQUM3RCw0RkFBNkQ7QUFFN0Qsb0RBQWdDO0FBRWhDLFNBQVMsS0FBSyxDQUFFLE1BQW1CO0lBQ2hDLE1BQU0sWUFBWSxHQUFHLG1DQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hELE1BQU0sWUFBWSxHQUFHLG1DQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRWhELE1BQU0sYUFBYSxHQUFHLHVCQUFZLENBQUMsWUFBWSxFQUFFO1FBQzlDLFNBQVMsRUFBRTtZQUNSLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZO1NBQzNCO0tBQ0gsQ0FBQyxDQUFDO0lBR0gsYUFBYSxDQUFDLE9BQU8sR0FBRztRQUNyQixHQUFHLGFBQWEsQ0FBQyxPQUFPO0tBQzFCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLGlCQUFPLENBQUMsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFHaEYsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFO1FBQ3RCLE9BQU8sYUFBYSxDQUFDLFNBQVMsQ0FBQztRQUMvQixpQkFBTyxDQUFDLGFBQWEsRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNuQyxlQUFTLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFDLENBQUM7S0FDTDtTQUFNO1FBQ0osTUFBTSxnQkFBZ0IsR0FBbUM7WUFDdEQsSUFBSSxFQUFFLFNBQVM7WUFDZixJQUFJLEVBQUUsTUFBTSxDQUFDLGFBQWE7WUFDMUIsa0JBQWtCLEVBQUUsS0FBSztZQUN6QixNQUFNLEVBQUUsSUFBSTtZQUNaLEdBQUcsRUFBRSxJQUFJO1lBQ1QsWUFBWSxFQUFFLEVBQ2I7WUFDRCxJQUFJLEVBQUUsS0FBSztZQUNYLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLE1BQU0sQ0FBRSxHQUFHO2dCQUNSLDBCQUEwQjtZQUM3QixDQUFDO1lBQ0QsS0FBSyxFQUFFO2dCQUNKLEdBQUcsRUFBRSxvQkFBb0IsTUFBTSxDQUFDLGlCQUFpQixFQUFFO2FBQ3JEO1lBQ0QsV0FBVyxFQUFFLENBQUMsUUFBZ0IsRUFBVyxFQUFFO2dCQUN4QyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQztvQkFBRSxPQUFPLElBQUksQ0FBQztnQkFDNUQsT0FBTyxLQUFLLENBQUM7WUFDaEIsQ0FBQztTQUNILENBQUM7UUFFRiw0QkFBZ0IsQ0FBQyx1QkFBdUIsQ0FBQyxhQUFhLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUUxRSxNQUFNLFFBQVEsR0FBRyxpQkFBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXhDLE1BQU0sTUFBTSxHQUFHLElBQUksNEJBQWdCLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFFaEUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFDO0tBQ0w7SUFFRCxJQUFJLFlBQVksRUFBRTtRQUNmLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM3QixpQkFBTyxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNsQyxlQUFTLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDM0MsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFO2dCQUN0QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sR0FBRyxTQUFTLENBQUMsQ0FBQzthQUM5QztRQUNKLENBQUMsQ0FBQyxDQUFDO0tBQ0w7U0FBTTtRQUNKLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztLQUNyQztBQUNKLENBQUM7QUFFRCxrQkFBZSxLQUFLLENBQUMifQ==