"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = __importDefault(require("./builder"));
exports.Builder = builder_1.default;
exports.default = builder_1.default;
async function startBuild({ isProduction = true, ssrBuildConfigFile, } = {}) {
    const b = new builder_1.default({
        isProduction,
        ssrBuildConfigFile,
    });
    await b.loadConfig();
    b.startBuild();
    return b;
}
exports.startBuild = startBuild;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsiaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSx3REFBZ0M7QUFzQjdCLGtCQXRCSSxpQkFBTyxDQXNCSjtBQW5CVixrQkFBZSxpQkFBTyxDQUFDO0FBRXZCLEtBQUssVUFBVSxVQUFVLENBQUUsRUFDeEIsWUFBWSxHQUFHLElBQUksRUFDbkIsa0JBQWtCLE1BSWpCLEVBQUU7SUFDSCxNQUFNLENBQUMsR0FBRyxJQUFJLGlCQUFPLENBQUM7UUFDbkIsWUFBWTtRQUNaLGtCQUFrQjtLQUNwQixDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNyQixDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDZixPQUFPLENBQUMsQ0FBQztBQUNaLENBQUM7QUFLRSxnQ0FBVSJ9