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
exports.getFileWriter = getFileWriter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS13cml0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL3Rvb2xzL2ZpbGUtd3JpdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkJBRVk7QUFDWiwrQkFFYztBQUNkLG1DQUFvQztBQUVwQyxTQUFTLE1BQU0sQ0FBRSxPQUFlO0lBQzdCLElBQUksQ0FBQyxlQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDdkIsTUFBTSxLQUFLLEdBQUcsY0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNkLGNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNyQjtBQUNKLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFnQixhQUFhLENBQUUsRUFDNUIsTUFBTSxHQUFHLElBQUksRUFDYixpQkFBaUIsR0FBRyxjQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLFlBQVksQ0FBQyxFQUN4RCxXQUFXLEdBQUcsV0FBVyxNQUt4QixFQUFFO0lBVUgsTUFBTSxZQUFZLEdBQUcsY0FBTyxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRXhELE9BQU8sS0FBSyxVQUFVLENBQUMsQ0FBRSxJQU9yQjtRQUdELE1BQU0sUUFBUSxHQUFHLGlCQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sSUFBSSxHQUFHLG1CQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU5RCxNQUFNLE9BQU8sR0FBRyxjQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLE1BQU0sUUFBUSxHQUFHLEdBQUcsSUFBSSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsT0FBTyxFQUFFLENBQUM7UUFFeEQsTUFBTSxRQUFRLEdBQUcsY0FBTyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNqRCxNQUFNLENBQUMsY0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDMUIsTUFBTSxHQUFHLEdBQUcsR0FBRyxXQUFXLEdBQUcsZUFBUSxDQUFDLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUUxRixrQkFBYSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNsQyxPQUFPO1lBQ0osR0FBRztTQUNMLENBQUM7SUFDTCxDQUFDLENBQUM7QUFDTCxDQUFDO0FBN0NELHNDQTZDQyJ9