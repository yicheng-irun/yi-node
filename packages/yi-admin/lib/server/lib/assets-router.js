"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const path_1 = require("path");
const fs_1 = require("fs");
exports.assetsRouter = new router_1.default();
const clientAssetsPath = path_1.resolve(__dirname, '../../client/assets');
const elementUiFolder = path_1.resolve(require.resolve('element-ui'), '../');
const allowFile = ['.js', '.css', '.html', '.tff', '.woff'];
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
exports.assetsRouter.get(/__yi-admin-assets__\/element-ui\/(.*)/, async (ctx) => {
    const file = ctx.params['0'];
    const filePath = path_1.join(elementUiFolder, file);
    if (filePath.startsWith(elementUiFolder) && fs_1.existsSync(filePath)) {
        const extName = path_1.extname(filePath);
        if (allowFile.includes(extName)) {
            ctx.type = extName;
            ctx.body = fs_1.createReadStream(filePath);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzLXJvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL2Fzc2V0cy1yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5REFBaUM7QUFDakMsK0JBQThDO0FBQzlDLDJCQUFrRDtBQUdyQyxRQUFBLFlBQVksR0FBRyxJQUFJLGdCQUFNLEVBQWUsQ0FBQztBQUV0RCxNQUFNLGdCQUFnQixHQUFHLGNBQU8sQ0FBQyxTQUFTLEVBQUUscUJBQXFCLENBQUMsQ0FBQztBQUVuRSxNQUFNLGVBQWUsR0FBRyxjQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUV0RSxNQUFNLFNBQVMsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUU1RCxvQkFBWSxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDakUsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixNQUFNLFFBQVEsR0FBRyxXQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUMsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLElBQUksZUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ2hFLE1BQU0sT0FBTyxHQUFHLGNBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsQyxJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDOUIsR0FBRyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7WUFDbkIsR0FBRyxDQUFDLElBQUksR0FBRyxxQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN4QztLQUNIO0FBQ0osQ0FBQyxDQUFDLENBQUM7QUFFSCxvQkFBWSxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDckUsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixNQUFNLFFBQVEsR0FBRyxXQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdDLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsSUFBSSxlQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDL0QsTUFBTSxPQUFPLEdBQUcsY0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM5QixHQUFHLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztZQUNuQixHQUFHLENBQUMsSUFBSSxHQUFHLHFCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3hDO0tBQ0g7QUFDSixDQUFDLENBQUMsQ0FBQyJ9