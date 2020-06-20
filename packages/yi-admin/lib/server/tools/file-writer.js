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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS13cml0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL3Rvb2xzL2ZpbGUtd3JpdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkJBRVk7QUFDWiwrQkFFYztBQUNkLG1DQUFvQztBQUVwQyxTQUFnQixhQUFhLENBQUUsT0FBZTtJQUMzQyxJQUFJLENBQUMsZUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3ZCLE1BQU0sS0FBSyxHQUFHLGNBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQixhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsY0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3JCO0FBQ0osQ0FBQztBQU5ELHNDQU1DO0FBRUQ7OztHQUdHO0FBQ0gsU0FBZ0IsYUFBYSxDQUFFLEVBQzVCLE1BQU0sR0FBRyxJQUFJLEVBQ2IsaUJBQWlCLEdBQUcsY0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxZQUFZLENBQUMsRUFDeEQsV0FBVyxHQUFHLFdBQVcsTUFLeEIsRUFBRTtJQVVILE1BQU0sWUFBWSxHQUFHLGNBQU8sQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUV4RCxPQUFPLEtBQUssVUFBVSxDQUFDLENBQUUsSUFPckI7UUFHRCxNQUFNLFFBQVEsR0FBRyxpQkFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxNQUFNLElBQUksR0FBRyxtQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFOUQsTUFBTSxPQUFPLEdBQUcsY0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxNQUFNLFFBQVEsR0FBRyxHQUFHLElBQUksSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLE9BQU8sRUFBRSxDQUFDO1FBRXhELE1BQU0sUUFBUSxHQUFHLGNBQU8sQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDakQsYUFBYSxDQUFDLGNBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sR0FBRyxHQUFHLEdBQUcsV0FBVyxHQUFHLGVBQVEsQ0FBQyxpQkFBaUIsRUFBRSxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFFMUYsa0JBQWEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbEMsT0FBTztZQUNKLEdBQUc7U0FDTCxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTdDRCxzQ0E2Q0MifQ==