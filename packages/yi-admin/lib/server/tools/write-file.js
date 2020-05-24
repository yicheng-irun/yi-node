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
exports.default = getFileWriter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvdG9vbHMvd3JpdGUtZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJCQUVZO0FBQ1osK0JBRWM7QUFDZCxtQ0FBb0M7QUFFcEMsU0FBUyxNQUFNLENBQUUsT0FBZTtJQUM3QixJQUFJLENBQUMsZUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3ZCLE1BQU0sS0FBSyxHQUFHLGNBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDZCxjQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDckI7QUFDSixDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBd0IsYUFBYSxDQUFFLEVBQ3BDLE1BQU0sR0FBRyxJQUFJLEVBQ2IsaUJBQWlCLEdBQUcsY0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxZQUFZLENBQUMsRUFDeEQsV0FBVyxHQUFHLFdBQVcsTUFLeEIsRUFBRTtJQVVILE1BQU0sWUFBWSxHQUFHLGNBQU8sQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUV4RCxPQUFPLEtBQUssVUFBVSxDQUFDLENBQUUsSUFPckI7UUFHRCxNQUFNLFFBQVEsR0FBRyxpQkFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxNQUFNLElBQUksR0FBRyxtQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFOUQsTUFBTSxPQUFPLEdBQUcsY0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxNQUFNLFFBQVEsR0FBRyxHQUFHLElBQUksSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLE9BQU8sRUFBRSxDQUFDO1FBRXhELE1BQU0sUUFBUSxHQUFHLGNBQU8sQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDakQsTUFBTSxDQUFDLGNBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzFCLE1BQU0sR0FBRyxHQUFHLEdBQUcsV0FBVyxHQUFHLGVBQVEsQ0FBQyxpQkFBaUIsRUFBRSxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFFMUYsa0JBQWEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbEMsT0FBTztZQUNKLEdBQUc7U0FDTCxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTdDRCxnQ0E2Q0MifQ==