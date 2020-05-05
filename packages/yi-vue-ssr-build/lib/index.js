"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = __importDefault(require("./builder"));
exports.Builder = builder_1.default;
exports.default = builder_1.default;
function startBuild() {
    const b = new builder_1.default();
    b.startBuild();
    return b;
}
exports.startBuild = startBuild;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsiaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSx3REFBZ0M7QUFXNUIsa0JBWEcsaUJBQU8sQ0FXSDtBQVRYLGtCQUFlLGlCQUFPLENBQUM7QUFFdkIsU0FBUyxVQUFVO0lBQ2YsTUFBTSxDQUFDLEdBQUcsSUFBSSxpQkFBTyxFQUFFLENBQUM7SUFDeEIsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2YsT0FBTyxDQUFDLENBQUM7QUFDYixDQUFDO0FBS0csZ0NBQVUifQ==