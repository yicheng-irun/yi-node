/**
 * 用于 EditStringFileType中的本地文件 fileWrite
 * @param param0
 */
export declare function getFileWriter({ folder, baseUploadsFolder, baseUrlPath, }?: {
    folder?: string;
    baseUploadsFolder?: string;
    baseUrlPath?: string;
}): (file: {
    size: number;
    path: string;
    name: string;
    type: string;
    lastModifiedDate?: Date;
    hash?: string;
}) => Promise<{
    url: string;
}>;
