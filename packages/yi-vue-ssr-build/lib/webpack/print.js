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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnQuanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsid2VicGFjay9wcmludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLFNBQXdCLFNBQVMsQ0FBRSxHQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU07SUFDeEQsSUFBSSxHQUFHO1FBQUUsTUFBTSxHQUFHLENBQUM7SUFDbkIseUJBQXlCO0lBQ3pCLElBQUksTUFBTSxFQUFFO1FBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1lBQ3ZCLE1BQU0sRUFBRSxJQUFJO1lBQ1osT0FBTyxFQUFFLEtBQUs7WUFDZCxJQUFJLEVBQUUsS0FBSztZQUNYLE1BQU0sRUFBRSxJQUFJO1lBQ1osUUFBUSxFQUFFLElBQUk7WUFDZCxXQUFXLEVBQUUsS0FBSztZQUNsQixPQUFPLEVBQUUsS0FBSztZQUNkLE1BQU0sRUFBRSxLQUFLO1lBQ2IsWUFBWSxFQUFFLEtBQUs7WUFDbkIsT0FBTyxFQUFFLElBQUk7U0FDaEIsQ0FBQyxDQUFDLENBQUM7S0FDUDtJQUNELHVCQUF1QjtJQUN2QixJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUNuQixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2hDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7S0FDTjtJQUNELElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxFQUFFO1FBQ3JCLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztLQUNOO0FBQ0wsQ0FBQztBQTVCRCw0QkE0QkMifQ==