"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
const projectPath = process.cwd();
/**
 * 获取构建配置
 * @param param0
 */
function createBuildConfig({ isProduction = false, } = {}) {
    const devNodeServerPort = Number.parseInt(process.env.HTTP_PORT || '80', 10);
    const srcPath = path_1.default.resolve(projectPath, './src/client');
    const config = {
        isProduction,
        projectPath,
        distPath: path_1.default.resolve(projectPath, './dist/client'),
        distBundlePath: path_1.default.resolve(projectPath, './dist/client-bundle'),
        srcPath,
        devServerPort: Number.parseInt(process.env.DEV_SERVER_PORT || '20000', 10),
        devNodeServerPort,
        getAllPageTemplates() {
            const pages = glob_1.default.sync(`${srcPath}/pages/**/template.html`).map((page) => page.replace(/^.*src\/client\/pages\/(.*)\/template.html$/, '$1'));
            return pages;
        },
    };
    return config;
}
exports.default = createBuildConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQtY29uZmlnLmpzIiwic291cmNlUm9vdCI6InNyYy8iLCJzb3VyY2VzIjpbImJ1aWxkLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGdEQUF3QjtBQUN4QixnREFBd0I7QUFxQnhCLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUVsQzs7O0dBR0c7QUFDSCxTQUF3QixpQkFBaUIsQ0FBRSxFQUN2QyxZQUFZLEdBQUcsS0FBSyxNQUdwQixFQUFFO0lBQ0YsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUc3RSxNQUFNLE9BQU8sR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUUxRCxNQUFNLE1BQU0sR0FBZ0I7UUFDeEIsWUFBWTtRQUNaLFdBQVc7UUFDWCxRQUFRLEVBQUUsY0FBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsZUFBZSxDQUFDO1FBQ3BELGNBQWMsRUFBRSxjQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxzQkFBc0IsQ0FBQztRQUNqRSxPQUFPO1FBQ1AsYUFBYSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLElBQUksT0FBTyxFQUFFLEVBQUUsQ0FBQztRQUMxRSxpQkFBaUI7UUFDakIsbUJBQW1CO1lBQ2YsTUFBTSxLQUFLLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8seUJBQXlCLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsNkNBQTZDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM5SSxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO0tBQ0osQ0FBQztJQUNGLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUF4QkQsb0NBd0JDIn0=