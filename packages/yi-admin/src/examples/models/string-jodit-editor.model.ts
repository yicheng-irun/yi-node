import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';
import { EditTypes } from '../../server';

@modelOptions({ schemaOptions: { timestamps: true, collection: 'string-jodit-editor' } })
export class StringJoditEditorModelClass {
   @prop({
      type: String,
      editType: new EditTypes.EditStringJoditEditorType({
         writeFile: EditTypes.EditStringJoditEditorType.getFileWriter({
            folder: 'jodit',
         }),
      }),
   })
   public text1?: string;

   @prop({
      type: String,
      editType: new EditTypes.EditStringJoditEditorType({
         placeholder: '呃呃呃，输入点什么吧',
         writeFile: EditTypes.EditStringJoditEditorType.getFileWriter({
            folder: 'jodit2',
         }),
      }),
   })
   public text2?: string;
}

const StringJoditEditorModel = getModelForClass(StringJoditEditorModelClass);
export default StringJoditEditorModel;
