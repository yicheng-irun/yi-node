"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const crypto_1 = require("crypto");
function mkdirs(dirpath) {
    if (!fs_1.existsSync(dirpath)) {
        const bpath = path_1.dirname(dirpath);
        mkdirs(bpath);
        fs_1.mkdirSync(dirpath);
    }
}
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
        mkdirs(path_1.dirname(savePath));
        const url = `${baseUrlPath}${path_1.relative(baseUploadsFolder, savePath).replace(/\\+/g, '/')}`;
        fs_1.writeFileSync(savePath, fileData);
        return {
            url,
        };
    };
}
exports.default = {
    getFileWriter,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS13cml0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL3Rvb2xzL2ZpbGUtd3JpdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkJBRVk7QUFDWiwrQkFFYztBQUNkLG1DQUFvQztBQUVwQyxTQUFTLE1BQU0sQ0FBRSxPQUFlO0lBQzdCLElBQUksQ0FBQyxlQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDdkIsTUFBTSxLQUFLLEdBQUcsY0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNkLGNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNyQjtBQUNKLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFTLGFBQWEsQ0FBRSxFQUNyQixNQUFNLEdBQUcsSUFBSSxFQUNiLGlCQUFpQixHQUFHLGNBQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsWUFBWSxDQUFDLEVBQ3hELFdBQVcsR0FBRyxXQUFXLE1BS3hCLEVBQUU7SUFVSCxNQUFNLFlBQVksR0FBRyxjQUFPLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFeEQsT0FBTyxLQUFLLFVBQVUsQ0FBQyxDQUFFLElBT3JCO1FBR0QsTUFBTSxRQUFRLEdBQUcsaUJBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsTUFBTSxJQUFJLEdBQUcsbUJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTlELE1BQU0sT0FBTyxHQUFHLGNBQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsTUFBTSxRQUFRLEdBQUcsR0FBRyxJQUFJLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxPQUFPLEVBQUUsQ0FBQztRQUV4RCxNQUFNLFFBQVEsR0FBRyxjQUFPLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELE1BQU0sQ0FBQyxjQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUMxQixNQUFNLEdBQUcsR0FBRyxHQUFHLFdBQVcsR0FBRyxlQUFRLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDO1FBRTFGLGtCQUFhLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLE9BQU87WUFDSixHQUFHO1NBQ0wsQ0FBQztJQUNMLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxrQkFBZTtJQUNaLGFBQWE7Q0FDZixDQUFDIn0=