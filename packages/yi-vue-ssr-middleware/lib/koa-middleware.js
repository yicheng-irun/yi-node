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
function ssrHandler({ bundlePath, isCacheRenderer, serverOrigin = 'http://127.0.0.1:80', }) {
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
        ctx.render = async (pagePath, ssrParams = {}) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia29hLW1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsia29hLW1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsNENBQW9CO0FBQ3BCLGdEQUF3QjtBQUN4QixxRUFBdUQ7QUFTdkQ7OztHQUdHO0FBQ0gsU0FBUyxVQUFVLENBQUUsRUFDakIsVUFBVSxFQUNWLGVBQWUsRUFDZixZQUFZLEdBQUcscUJBQXFCLEdBbUJ2QztJQUNHLElBQUksQ0FBQyxVQUFVLEVBQUU7UUFDYixNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsVUFBVSxvQkFBb0IsQ0FBQyxDQUFDO0tBQ2xFO0lBRUQsTUFBTSxlQUFlLEdBRWpCLEVBQUUsQ0FBQztJQUVQLElBQUksWUFBWSxHQUFPLElBQUksQ0FBQztJQUU1Qjs7T0FFRztJQUNILFNBQVMsU0FBUztRQUNkLElBQUksWUFBWSxFQUFFO1lBQ2QsT0FBTyxZQUFZLENBQUM7U0FDdkI7UUFFRCxNQUFNLFFBQVEsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSw0QkFBNEIsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxZQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMsVUFBVSxRQUFRLGlCQUFpQixDQUFDLENBQUM7U0FDeEQ7UUFDRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN0RSxJQUFJLGVBQWUsRUFBRTtZQUNqQixZQUFZLEdBQUcsWUFBWSxDQUFDO1NBQy9CO1FBQ0QsT0FBTyxZQUFZLENBQUM7SUFDeEIsQ0FBQztJQUVELFNBQVMsV0FBVyxDQUFFLFdBQW1CO1FBQ3JDLE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpELElBQUksZUFBZSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzNCLE9BQU8sZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3BDO1FBRUQsSUFBSSxZQUFZLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFFMUQsTUFBTSxnQkFBZ0IsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsR0FBRyxRQUFRLE9BQU8sQ0FBQyxDQUFDO1FBQ2hGLElBQUksWUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQ2pDLFlBQVksR0FBRyxnQkFBZ0IsQ0FBQztTQUNuQzthQUFNLElBQUksQ0FBQyxZQUFFLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ3JDLE1BQU0sSUFBSSxLQUFLLENBQUMsVUFBVSxZQUFZLGlCQUFpQixDQUFDLENBQUM7U0FDNUQ7UUFFRCxNQUFNLFlBQVksR0FBRyxTQUFTLEVBQUUsQ0FBQztRQUNqQyxNQUFNLFFBQVEsR0FBRyxZQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRTFELE1BQU0sUUFBUSxHQUFHLGVBQWUsQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLEVBQUU7WUFDaEUsZUFBZSxFQUFFLElBQUk7WUFDckIsUUFBUTtTQUVYLENBQUMsQ0FBQztRQUVILElBQUksZUFBZSxFQUFFO1lBQ2pCLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxRQUFRLENBQUM7U0FDeEM7UUFFRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBR0QsS0FBSyxVQUFVLFVBQVUsQ0FBRSxHQUFZLEVBQUUsSUFBVTtRQUMvQyxHQUFHLENBQUMsTUFBTSxHQUFHLEtBQUssRUFBRSxRQUFnQixFQUFFLFlBQWlDLEVBQUUsRUFBaUIsRUFBRTtZQUN4RixNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzdDLE1BQU0sT0FBTyxHQUFHO2dCQUNaLFNBQVM7Z0JBQ1QsWUFBWTtnQkFDWixRQUFRO2dCQUNSLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSztnQkFDaEIsR0FBRzthQUNOLENBQUM7WUFDRixNQUFNLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDcEQsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDcEIsQ0FBQyxDQUFDO1FBQ0YsTUFBTSxJQUFJLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsT0FBTyxVQUFVLENBQUM7QUFDdEIsQ0FBQztBQUVELGtCQUFlLFVBQVUsQ0FBQyJ9