import YiAdmin from './lib/yi-admin';
export * from './lib/types';
export declare const getFileWriter: ({ folder, baseUploadsFolder, baseUrlPath, }?: {
    folder?: string | undefined;
    baseUploadsFolder?: string | undefined;
    baseUrlPath?: string | undefined;
}) => (file: {
    size: number;
    path: string;
    name: string;
    type: string;
    lastModifiedDate?: Date | undefined;
    hash?: string | undefined;
}) => Promise<{
    url: string;
}>;
export default YiAdmin;
