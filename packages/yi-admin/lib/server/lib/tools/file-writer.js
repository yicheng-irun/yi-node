"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const crypto_1 = require("crypto");
function mkdirTraverse(dirpath) {
    if (!fs_1.existsSync(dirpath)) {
        const bpath = path_1.dirname(dirpath);
        mkdirTraverse(bpath);
        fs_1.mkdirSync(dirpath);
    }
}
exports.mkdirTraverse = mkdirTraverse;
/**
 * 用于 EditStringFileType中的本地文件 fileWrite
 * @param param0
 */
function getFileWriter({ folder = './', baseUploadsFolder = path_1.resolve(process.cwd(), './uploads/'), baseUrlPath = '/uploads/', } = {}) {
    const uploadFolder = path_1.resolve(baseUploadsFolder, folder);
    return async function _(file) {
        const fileData = fs_1.readFileSync(file.path);
        const hash = crypto_1.createHash('md5').update(fileData).digest('hex');
        const extName = path_1.extname(file.name);
        const fileName = `${hash}_${fileData.length}${extName}`;
        const savePath = path_1.resolve(uploadFolder, fileName);
        mkdirTraverse(path_1.dirname(savePath));
        const url = `${baseUrlPath}${path_1.relative(baseUploadsFolder, savePath).replace(/\\+/g, '/')}`;
        fs_1.writeFileSync(savePath, fileData);
        return {
            url,
        };
    };
}
exports.getFileWriter = getFileWriter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS13cml0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmVyL2xpYi90b29scy9maWxlLXdyaXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJCQUVZO0FBQ1osK0JBRWM7QUFDZCxtQ0FBb0M7QUFFcEMsU0FBZ0IsYUFBYSxDQUFFLE9BQWU7SUFDM0MsSUFBSSxDQUFDLGVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUN2QixNQUFNLEtBQUssR0FBRyxjQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0IsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLGNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNyQjtBQUNKLENBQUM7QUFORCxzQ0FNQztBQUVEOzs7R0FHRztBQUNILFNBQWdCLGFBQWEsQ0FBRSxFQUM1QixNQUFNLEdBQUcsSUFBSSxFQUNiLGlCQUFpQixHQUFHLGNBQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsWUFBWSxDQUFDLEVBQ3hELFdBQVcsR0FBRyxXQUFXLE1BS3hCLEVBQUU7SUFVSCxNQUFNLFlBQVksR0FBRyxjQUFPLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFeEQsT0FBTyxLQUFLLFVBQVUsQ0FBQyxDQUFFLElBT3JCO1FBR0QsTUFBTSxRQUFRLEdBQUcsaUJBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsTUFBTSxJQUFJLEdBQUcsbUJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTlELE1BQU0sT0FBTyxHQUFHLGNBQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsTUFBTSxRQUFRLEdBQUcsR0FBRyxJQUFJLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxPQUFPLEVBQUUsQ0FBQztRQUV4RCxNQUFNLFFBQVEsR0FBRyxjQUFPLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELGFBQWEsQ0FBQyxjQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNqQyxNQUFNLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxlQUFRLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDO1FBRTFGLGtCQUFhLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLE9BQU87WUFDSixHQUFHO1NBQ0wsQ0FBQztJQUNMLENBQUMsQ0FBQztBQUNMLENBQUM7QUE3Q0Qsc0NBNkNDIn0=