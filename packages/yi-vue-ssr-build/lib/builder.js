"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const build_config_1 = __importDefault(require("./build-config"));
const webpack_ssr_build_1 = __importDefault(require("./webpack/webpack-ssr-build"));
dotenv_1.default.config();
class Builder {
    constructor({ isProduction = true, ssrBuildConfigFile = path_1.default.join(process.cwd(), 'yi-vue-ssr-config.js'), } = {}) {
        this.isProduction = false;
        this.config = null;
        this.isProduction = isProduction;
        this.ssrBuildConfigFile = ssrBuildConfigFile;
        console.log(`build for production: ${this.isProduction}`);
    }
    async loadConfig() {
        this.config = await build_config_1.default({
            isProduction: this.isProduction,
            ssrBuildConfigFile: this.ssrBuildConfigFile,
        });
    }
    startBuild() {
        webpack_ssr_build_1.default(this.config);
    }
}
exports.Builder = Builder;
exports.default = Builder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJidWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0RBQTRCO0FBQzVCLGdEQUF3QjtBQUN4QixrRUFBZ0U7QUFDaEUsb0ZBQWdEO0FBRWhELGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEIsTUFBYSxPQUFPO0lBT2hCLFlBQWEsRUFDVCxZQUFZLEdBQUcsSUFBSSxFQUNuQixrQkFBa0IsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxzQkFBc0IsQ0FBQyxNQUlyRSxFQUFFO1FBWkMsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFJckIsV0FBTSxHQUFnQixJQUFJLENBQUM7UUFTOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO1FBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFTSxLQUFLLENBQUMsVUFBVTtRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sc0JBQWlCLENBQUM7WUFDbEMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQy9CLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0I7U0FDOUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLFVBQVU7UUFDYiwyQkFBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QixDQUFDO0NBQ0o7QUE3QkQsMEJBNkJDO0FBRUQsa0JBQWUsT0FBTyxDQUFDIn0=