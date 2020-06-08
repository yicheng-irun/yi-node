import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';
import { EditTypes } from '../../server';

@modelOptions({ schemaOptions: { timestamps: true, collection: 'string-file-test' } })
export class StringFileTestModelClass {
   @prop({
      type: String,
      name: '文件1',
      editType: new EditTypes.EditStringFileType({
         writeFile: EditTypes.EditStringFileType.getFileWriter(),
      }),
   })
   public file1?: string;

   @prop({
      type: String,
      name: '文件2',
      editType: new EditTypes.EditStringFileType({
         maxFileSize: 50 * 1000,
         writeFile: EditTypes.EditStringFileType.getFileWriter({
            folder: 'file2',
         }),
      }),
   })
   public file2?: string;
}

const StringFileTestModel = getModelForClass(StringFileTestModelClass);
export default StringFileTestModel;
