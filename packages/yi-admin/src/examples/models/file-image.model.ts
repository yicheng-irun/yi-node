import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { timestamps: true, collection: 'file-image-test' } })
export class FileImageModelClass {
    @prop()
    public file: string;

    @prop()
    public image: string;
}

const FileImageModel = getModelForClass(FileImageModelClass);
export default FileImageModel;
