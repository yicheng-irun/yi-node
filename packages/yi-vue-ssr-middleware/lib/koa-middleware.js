"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const vueServerRender = __importStar(require("vue-server-renderer"));
/**
 * 获取中间件
 * @param options 参数
 */
function ssrHandler({ renderFunctionName = 'render', bundlePath, isCacheRenderer, serverOrigin = 'http://127.0.0.1:80', }) {
    if (!bundlePath) {
        throw new Error(`bundlePath "${bundlePath}" is not available`);
    }
    const cachedRenderers = {};
    let cachedBundle = null;
    /**
      * 获取bundle
      */
    function getBundle() {
        if (cachedBundle) {
            return cachedBundle;
        }
        const jsonPath = path_1.default.join(bundlePath, 'vue-ssr-server-bundle.json');
        if (!fs_1.default.existsSync(jsonPath)) {
            throw new Error(`file: '${jsonPath}' is not exists`);
        }
        const serverBundle = JSON.parse(fs_1.default.readFileSync(jsonPath).toString());
        if (isCacheRenderer) {
            cachedBundle = serverBundle;
        }
        return serverBundle;
    }
    function getRenderer(pagePathArg) {
        const pagePath = pagePathArg.replace(/^\/+/, '');
        if (cachedRenderers[pagePath]) {
            return cachedRenderers[pagePath];
        }
        let templatePath = path_1.default.join(bundlePath, 'template.html');
        const custTemplatePath = path_1.default.join(bundlePath, 'templates', `${pagePath}.html`);
        if (fs_1.default.existsSync(custTemplatePath)) {
            templatePath = custTemplatePath;
        }
        else if (!fs_1.default.existsSync(templatePath)) {
            throw new Error(`file: '${templatePath}' is not exists`);
        }
        const serverBundle = getBundle();
        const template = fs_1.default.readFileSync(templatePath).toString();
        const renderer = vueServerRender.createBundleRenderer(serverBundle, {
            runInNewContext: true,
            template,
        });
        if (isCacheRenderer) {
            cachedRenderers[pagePath] = renderer;
        }
        return renderer;
    }
    async function middleWare(ctx, next) {
        ctx[renderFunctionName] = async (pagePath, ssrParams = {}) => {
            const renderer = getRenderer(pagePath || '');
            const context = {
                ssrParams,
                serverOrigin,
                pagePath,
                query: ctx.query,
                ctx,
            };
            const html = await renderer.renderToString(context);
            ctx.body = html;
        };
        await next();
    }
    return middleWare;
}
exports.default = ssrHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia29hLW1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsia29hLW1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsNENBQW9CO0FBQ3BCLGdEQUF3QjtBQUN4QixxRUFBdUQ7QUFZdkQ7OztHQUdHO0FBQ0gsU0FBUyxVQUFVLENBQUUsRUFDbEIsa0JBQWtCLEdBQUcsUUFBUSxFQUM3QixVQUFVLEVBQ1YsZUFBZSxFQUNmLFlBQVksR0FBRyxxQkFBcUIsR0FxQnRDO0lBQ0UsSUFBSSxDQUFDLFVBQVUsRUFBRTtRQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxVQUFVLG9CQUFvQixDQUFDLENBQUM7S0FDakU7SUFFRCxNQUFNLGVBQWUsR0FFaEIsRUFBRSxDQUFDO0lBRVIsSUFBSSxZQUFZLEdBQU8sSUFBSSxDQUFDO0lBRTVCOztRQUVJO0lBQ0osU0FBUyxTQUFTO1FBQ2YsSUFBSSxZQUFZLEVBQUU7WUFDZixPQUFPLFlBQVksQ0FBQztTQUN0QjtRQUVELE1BQU0sUUFBUSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLDRCQUE0QixDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLFlBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxVQUFVLFFBQVEsaUJBQWlCLENBQUMsQ0FBQztTQUN2RDtRQUNELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLElBQUksZUFBZSxFQUFFO1lBQ2xCLFlBQVksR0FBRyxZQUFZLENBQUM7U0FDOUI7UUFDRCxPQUFPLFlBQVksQ0FBQztJQUN2QixDQUFDO0lBRUQsU0FBUyxXQUFXLENBQUUsV0FBbUI7UUFDdEMsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakQsSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDNUIsT0FBTyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbkM7UUFFRCxJQUFJLFlBQVksR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUUxRCxNQUFNLGdCQUFnQixHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxHQUFHLFFBQVEsT0FBTyxDQUFDLENBQUM7UUFDaEYsSUFBSSxZQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDbEMsWUFBWSxHQUFHLGdCQUFnQixDQUFDO1NBQ2xDO2FBQU0sSUFBSSxDQUFDLFlBQUUsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDdEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxVQUFVLFlBQVksaUJBQWlCLENBQUMsQ0FBQztTQUMzRDtRQUVELE1BQU0sWUFBWSxHQUFHLFNBQVMsRUFBRSxDQUFDO1FBQ2pDLE1BQU0sUUFBUSxHQUFHLFlBQUUsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFMUQsTUFBTSxRQUFRLEdBQUcsZUFBZSxDQUFDLG9CQUFvQixDQUFDLFlBQVksRUFBRTtZQUNqRSxlQUFlLEVBQUUsSUFBSTtZQUNyQixRQUFRO1NBRVYsQ0FBQyxDQUFDO1FBRUgsSUFBSSxlQUFlLEVBQUU7WUFDbEIsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBQztTQUN2QztRQUVELE9BQU8sUUFBUSxDQUFDO0lBQ25CLENBQUM7SUFHRCxLQUFLLFVBQVUsVUFBVSxDQUFFLEdBQVksRUFBRSxJQUFVO1FBQ2hELEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEtBQUssRUFBRSxRQUFnQixFQUFFLFlBQWlDLEVBQUUsRUFBaUIsRUFBRTtZQUN0RyxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzdDLE1BQU0sT0FBTyxHQUFHO2dCQUNiLFNBQVM7Z0JBQ1QsWUFBWTtnQkFDWixRQUFRO2dCQUNSLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSztnQkFDaEIsR0FBRzthQUNMLENBQUM7WUFDRixNQUFNLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDcEQsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDbkIsQ0FBQyxDQUFDO1FBQ0YsTUFBTSxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsT0FBTyxVQUFVLENBQUM7QUFDckIsQ0FBQztBQUVELGtCQUFlLFVBQVUsQ0FBQyJ9