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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1lcnJvci1taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZlci90b29scy9qc29uLWVycm9yLW1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFTyxLQUFLLFVBQVUsbUJBQW1CLENBQUUsR0FBWSxFQUFFLElBQVU7SUFDaEUsSUFBSTtRQUNELE1BQU0sSUFBSSxFQUFFLENBQUM7S0FDZjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1QsR0FBRyxDQUFDLElBQUksR0FBRztZQUNSLE9BQU8sRUFBRSxLQUFLO1lBQ2QsT0FBTyxFQUFFLENBQUEsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLE9BQU8sS0FBSSxLQUFLO1NBQzlCLENBQUM7S0FDSjtBQUNKLENBQUM7QUFURCxrREFTQyJ9