"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function jsonErrorMiddleware(ctx, next) {
    try {
        await next();
    }
    catch (e) {
        ctx.body = {
            success: false,
            message: (e === null || e === void 0 ? void 0 : e.message) || '出错了',
        };
    }
}
exports.jsonErrorMiddleware = jsonErrorMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1lcnJvci1taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9saWIvdG9vbHMvanNvbi1lcnJvci1taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRU8sS0FBSyxVQUFVLG1CQUFtQixDQUFFLEdBQVksRUFBRSxJQUFVO0lBQ2hFLElBQUk7UUFDRCxNQUFNLElBQUksRUFBRSxDQUFDO0tBQ2Y7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNULEdBQUcsQ0FBQyxJQUFJLEdBQUc7WUFDUixPQUFPLEVBQUUsS0FBSztZQUNkLE9BQU8sRUFBRSxDQUFBLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxPQUFPLEtBQUksS0FBSztTQUM5QixDQUFDO0tBQ0o7QUFDSixDQUFDO0FBVEQsa0RBU0MifQ==