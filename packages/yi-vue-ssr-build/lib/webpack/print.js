"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function printInfo(err, stats, isProd) {
    if (err)
        throw err;
    // production 模式下显示详细构建结果
    if (isProd) {
        console.log(stats.toString({
            assets: true,
            version: false,
            hash: false,
            colors: true,
            children: true,
            entrypoints: false,
            modules: false,
            chunks: false,
            chunkModules: false,
            timings: true,
        }));
    }
    // 显示 errors 和 warnings
    if (stats.hasErrors()) {
        stats.toJson().errors.forEach((e) => {
            console.error(e);
        });
    }
    if (stats.hasWarnings()) {
        stats.toJson().warnings.forEach((w) => {
            console.warn(w);
        });
    }
}
exports.default = printInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnQuanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsid2VicGFjay9wcmludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLFNBQXdCLFNBQVMsQ0FBRSxHQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU07SUFDekQsSUFBSSxHQUFHO1FBQUUsTUFBTSxHQUFHLENBQUM7SUFDbkIseUJBQXlCO0lBQ3pCLElBQUksTUFBTSxFQUFFO1FBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1lBQ3hCLE1BQU0sRUFBRSxJQUFJO1lBQ1osT0FBTyxFQUFFLEtBQUs7WUFDZCxJQUFJLEVBQUUsS0FBSztZQUNYLE1BQU0sRUFBRSxJQUFJO1lBQ1osUUFBUSxFQUFFLElBQUk7WUFDZCxXQUFXLEVBQUUsS0FBSztZQUNsQixPQUFPLEVBQUUsS0FBSztZQUNkLE1BQU0sRUFBRSxLQUFLO1lBQ2IsWUFBWSxFQUFFLEtBQUs7WUFDbkIsT0FBTyxFQUFFLElBQUk7U0FDZixDQUFDLENBQUMsQ0FBQztLQUNOO0lBQ0QsdUJBQXVCO0lBQ3ZCLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ3BCLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDakMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztLQUNMO0lBQ0QsSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDdEIsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNuQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0tBQ0w7QUFDSixDQUFDO0FBNUJELDRCQTRCQyJ9