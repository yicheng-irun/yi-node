"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const build_config_1 = __importDefault(require("./build-config"));
const webpack_ssr_build_1 = __importDefault(require("./webpack/webpack-ssr-build"));
dotenv_1.default.config();
class Builder {
    constructor() {
        this.isProduction = false;
        this.config = null;
        this.isProduction = process.argv.indexOf('--production') >= 0;
        console.log(`build for production: ${this.isProduction}`);
    }
    async loadConfig() {
        this.config = await build_config_1.default({
            isProduction: this.isProduction,
        });
    }
    startBuild() {
        webpack_ssr_build_1.default(this.config);
    }
}
exports.Builder = Builder;
exports.default = Builder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJidWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0RBQTRCO0FBQzVCLGtFQUFnRTtBQUNoRSxvRkFBZ0Q7QUFFaEQsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQixNQUFhLE9BQU87SUFLaEI7UUFKTyxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUVyQixXQUFNLEdBQWdCLElBQUksQ0FBQztRQUc5QixJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5RCxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRU0sS0FBSyxDQUFDLFVBQVU7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLHNCQUFpQixDQUFDO1lBQ2xDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtTQUNsQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sVUFBVTtRQUNiLDJCQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7Q0FDSjtBQW5CRCwwQkFtQkM7QUFFRCxrQkFBZSxPQUFPLENBQUMifQ==