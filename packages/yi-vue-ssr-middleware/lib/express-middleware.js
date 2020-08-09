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
    const CACHE = {
        map: {},
        timeMap: {},
        set(key, value, time) {
            this.map[key] = value;
            const t = time;
            this.timeMap[key] = Date.now() + t;
        },
        get(key) {
            const now = Date.now();
            if (this.map[key]) {
                const t = parseFloat(this.timeMap[key]);
                if (t > now) {
                    return this.map[key];
                }
            }
            return null;
        },
    };
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
    async function middleWare(req, res, next) {
        res[renderFunctionName] = async (pagePath, ssrParams = {}, cacheOptions) => {
            let useCache = false;
            let cacheKey = '';
            let cacheTime = 0;
            if (cacheOptions) {
                useCache = true;
                cacheKey = cacheOptions.key || '';
                cacheTime = cacheOptions.time || 1000 * 60; // 默认缓存1分钟
            }
            const key = `${pagePath}::${cacheKey}`;
            function render() {
                const renderer = getRenderer(pagePath || '');
                let ignoreByNext = false;
                const context = {
                    ssrParams,
                    serverOrigin,
                    pagePath,
                    query: req.query,
                    next(...args) {
                        ignoreByNext = true;
                        req.next(...args);
                    },
                    req,
                    res,
                    ctx: {
                        req,
                        res,
                    },
                };
                renderer.renderToString(context, (err, html) => {
                    if (ignoreByNext) {
                        return;
                    }
                    if (err) {
                        req.next(err);
                        return;
                    }
                    res.end(html);
                    if (useCache) {
                        CACHE.set(key, html, cacheTime);
                    }
                });
            }
            if (useCache) {
                const result = CACHE.get(key);
                if (result) {
                    res.end(result);
                    return;
                }
                render();
            }
            else {
                render();
            }
        };
        next();
    }
    return middleWare;
}
exports.default = ssrHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzcy1taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6InNyYy8iLCJzb3VyY2VzIjpbImV4cHJlc3MtbWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBb0I7QUFDcEIsZ0RBQXdCO0FBQ3hCLHFFQUF1RDtBQVd2RDs7O0dBR0c7QUFDSCxTQUFTLFVBQVUsQ0FBRSxFQUNsQixrQkFBa0IsR0FBRyxRQUFRLEVBQzdCLFVBQVUsRUFDVixlQUFlLEVBQ2YsWUFBWSxHQUFHLHFCQUFxQixHQXFCdEM7SUFDRSxJQUFJLENBQUMsVUFBVSxFQUFFO1FBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLFVBQVUsb0JBQW9CLENBQUMsQ0FBQztLQUNqRTtJQUVELE1BQU0sS0FBSyxHQUFHO1FBQ1gsR0FBRyxFQUFFLEVBQUU7UUFDUCxPQUFPLEVBQUUsRUFBRTtRQUNYLEdBQUcsQ0FBRSxHQUFXLEVBQUUsS0FBYSxFQUFFLElBQVk7WUFDMUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDdEIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFDRCxHQUFHLENBQUUsR0FBVztZQUNiLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN2QixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2hCLE1BQU0sQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRTtvQkFDVixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3ZCO2FB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