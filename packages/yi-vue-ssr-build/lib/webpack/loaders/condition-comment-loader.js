"use strict";
/**
 * 条件注释loader
 *
 * // #only dev start
 *
 * // #only dev end
 *
 *
 * <!-- #only dev start --> xxxxx <!-- #only dev end -->
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loader_utils_1 = __importDefault(require("loader-utils"));
function ConditionCommentLoader(source, map) {
    this.cacheable();
    const options = loader_utils_1.default.getOptions(this) || {
        isProd: true,
    };
    const { isProd } = options;
    let result = source;
    if (isProd) {
        result = source.replace(/\/\/\s+#only dev start([\S\s]*?)\/\/\s+#only dev end.*/g, (a, b) => {
            let newLine = '';
            b.replace(/\n/g, () => {
                newLine += '\n';
                return '';
            });
            return newLine;
        });
        result = result.replace(/<!--\s+#only dev start\s+-->([\S\s]*?)<!--\s+#only dev end\s+-->/g, () => '');
    }
    this.callback(null, result, map);
}
exports.default = ConditionCommentLoader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uLWNvbW1lbnQtbG9hZGVyLmpzIiwic291cmNlUm9vdCI6InNyYy8iLCJzb3VyY2VzIjpbIndlYnBhY2svbG9hZGVycy9jb25kaXRpb24tY29tbWVudC1sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7R0FTRzs7Ozs7QUFFSCxnRUFBdUM7QUFFdkMsU0FBUyxzQkFBc0IsQ0FBRSxNQUFNLEVBQUUsR0FBRztJQUN6QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFakIsTUFBTSxPQUFPLEdBQUcsc0JBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUk7UUFDN0MsTUFBTSxFQUFFLElBQUk7S0FDZCxDQUFDO0lBQ0YsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQztJQUMzQixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFFcEIsSUFBSSxNQUFNLEVBQUU7UUFDVCxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyx5REFBeUQsRUFBRSxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsRUFBRTtZQUN6RyxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDakIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBVyxFQUFFO2dCQUMzQixPQUFPLElBQUksSUFBSSxDQUFDO2dCQUNoQixPQUFPLEVBQUUsQ0FBQztZQUNiLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxPQUFPLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxtRUFBbUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUN6RztJQUVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBRUQsa0JBQWUsc0JBQXNCLENBQUMifQ==