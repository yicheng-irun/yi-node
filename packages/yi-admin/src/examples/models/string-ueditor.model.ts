import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';
import { EditTypes } from '../../server';

@modelOptions({ schemaOptions: { timestamps: true, collection: 'string-u-editor' } })
export class StringUEditorModelClass {
   @prop({
      type: String,
      editType: new EditTypes.EditStringUEditorType({
         writeFile: EditTypes.EditStringUEditorType.getFileWriter({
            folder: 'ueditor',
         }),
      }),
   })
   public text1?: string;

   @prop({
      type: String,
      editType: new EditTypes.EditStringUEditorType({
         placeholder: '呃呃呃，输入点什么吧',
         writeFile: EditTypes.EditStringUEditorType.getFileWriter({
            folder: 'ueditor2',
         }),
      }),
   })
   public text2?: string;
}

const StringUEditorModel = getModelForClass(StringUEditorModelClass);
export default StringUEditorModel;
