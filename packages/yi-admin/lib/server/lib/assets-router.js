"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const path_1 = require("path");
const fs_1 = require("fs");
exports.assetsRouter = new router_1.default();
const allowFile = ['.js', '.css', '.html', '.tff', '.woff', '.png', '.jpg', '.gif',
    '.json', '.eot', '.svg', '.swf',
];
const clientAssetsPath = path_1.resolve(__dirname, '../../client/assets');
exports.assetsRouter.get(/__yi-admin-assets__\/assets\/(.*)/, async (ctx) => {
    const file = ctx.params['0'];
    const filePath = path_1.join(clientAssetsPath, file);
    if (filePath.startsWith(clientAssetsPath) && fs_1.existsSync(filePath)) {
        const extName = path_1.extname(filePath);
        if (allowFile.includes(extName)) {
            ctx.type = extName;
            ctx.body = fs_1.createReadStream(filePath);
        }
    }
});
const clientStaticPath = path_1.resolve(__dirname, '../../../static');
exports.assetsRouter.get(/__yi-admin-assets__\/static\/(.*)/, async (ctx) => {
    const file = ctx.params['0'];
    const filePath = path_1.join(clientStaticPath, file);
    if (filePath.startsWith(clientStaticPath) && fs_1.existsSync(filePath)) {
        const extName = path_1.extname(filePath);
        if (allowFile.includes(extName)) {
            ctx.type = extName;
            ctx.body = fs_1.createReadStream(filePath);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzLXJvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL2Fzc2V0cy1yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5REFBaUM7QUFDakMsK0JBQThDO0FBQzlDLDJCQUFrRDtBQUdyQyxRQUFBLFlBQVksR0FBRyxJQUFJLGdCQUFNLEVBQWUsQ0FBQztBQUd0RCxNQUFNLFNBQVMsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO0lBQy9FLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU07Q0FDakMsQ0FBQztBQUVGLE1BQU0sZ0JBQWdCLEdBQUcsY0FBTyxDQUFDLFNBQVMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0FBQ25FLG9CQUFZLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUNqRSxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLE1BQU0sUUFBUSxHQUFHLFdBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxlQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDaEUsTUFBTSxPQUFPLEdBQUcsY0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM5QixHQUFHLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztZQUNuQixHQUFHLENBQUMsSUFBSSxHQUFHLHFCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3hDO0tBQ0g7QUFDSixDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sZ0JBQWdCLEdBQUcsY0FBTyxDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQy9ELG9CQUFZLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUNqRSxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLE1BQU0sUUFBUSxHQUFHLFdBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxlQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDaEUsTUFBTSxPQUFPLEdBQUcsY0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM5QixHQUFHLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztZQUNuQixHQUFHLENBQUMsSUFBSSxHQUFHLHFCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3hDO0tBQ0g7QUFDSixDQUFDLENBQUMsQ0FBQyJ9