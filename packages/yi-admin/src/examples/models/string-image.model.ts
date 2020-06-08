import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';
import { EditTypes } from '../../server';

@modelOptions({ schemaOptions: { timestamps: true, collection: 'string-image-test' } })
export class StringImageTestModelClass {
   @prop({
      type: String,
      name: '图片1',
      editType: new EditTypes.EditStringImageType({
         writeFile: EditTypes.EditStringImageType.getFileWriter(),
         listStyleMaxWidth: '5em',
         listStyleMaxHeight: '3em',
      }),
   })
   public image1?: string;

   @prop({
      type: String,
      name: '图片2',
      editType: new EditTypes.EditStringImageType({
         maxFileSize: 80 * 1000,
         writeFile: EditTypes.EditStringImageType.getFileWriter({
            folder: 'image2',
         }),
      }),
   })
   public image2?: string;
}

const StringImageTestModel = getModelForClass(StringImageTestModelClass);
export default StringImageTestModel;
