#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const path_1 = __importDefault(require("path"));
const index_1 = require("./index");
commander_1.default.option('-c, --config-file <path>', './yi-vue-ssr-config.js');
commander_1.default.command('serve').action(() => {
    index_1.startBuild({
        isProduction: false,
        ssrBuildConfigFile: commander_1.default.configFile || path_1.default.join(process.cwd(), 'yi-vue-ssr-config.js'),
    }).catch((e) => console.error(e));
});
commander_1.default.command('build').action(() => {
    console.log(commander_1.default.configFile);
    index_1.startBuild({
        isProduction: true,
        ssrBuildConfigFile: commander_1.default.configFile || path_1.default.join(process.cwd(), 'yi-vue-ssr-config.js'),
    }).catch((e) => console.error(e));
});
commander_1.default.parse(process.argv);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluLmpzIiwic291cmNlUm9vdCI6InNyYy8iLCJzb3VyY2VzIjpbImJpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQSwwREFBZ0M7QUFDaEMsZ0RBQXdCO0FBQ3hCLG1DQUFxQztBQUdyQyxtQkFBTyxDQUFDLE1BQU0sQ0FBQywwQkFBMEIsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO0FBRXJFLG1CQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7SUFDbEMsa0JBQVUsQ0FBQztRQUNSLFlBQVksRUFBRSxLQUFLO1FBQ25CLGtCQUFrQixFQUFFLG1CQUFPLENBQUMsVUFBVSxJQUFJLGNBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLHNCQUFzQixDQUFDO0tBQzVGLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyQyxDQUFDLENBQUMsQ0FBQztBQUVILG1CQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7SUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2hDLGtCQUFVLENBQUM7UUFDUixZQUFZLEVBQUUsSUFBSTtRQUNsQixrQkFBa0IsRUFBRSxtQkFBTyxDQUFDLFVBQVUsSUFBSSxjQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxzQkFBc0IsQ0FBQztLQUM1RixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckMsQ0FBQyxDQUFDLENBQUM7QUFFSCxtQkFBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMifQ==