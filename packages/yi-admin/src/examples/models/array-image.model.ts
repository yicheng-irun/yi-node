import {
   modelOptions, getModelForClass, arrayProp,
} from '@typegoose/typegoose';
import { EditTypes } from '../../server';


@modelOptions({ schemaOptions: { timestamps: true, collection: 'array-image' } })
export class ArrayImageModelClass {
   @arrayProp({
      type: String,
      editType: new EditTypes.EditArrayType({
         childrenType: new EditTypes.EditStringImageType({
            helpText: '图片列表',
            writeFile: EditTypes.EditStringImageType.getFileWriter({
               folder: 'array-images',
            }),
            listStyleMaxHeight: '3em',
         }),
         listStyleInline: true,
         maxLength: 2,
      }),
   })
   public images1?: string[];

   @arrayProp({
      type: String,
      editType: new EditTypes.EditArrayType({
         childrenType: new EditTypes.EditStringImageType({
            helpText: '图片列表',
            writeFile: EditTypes.EditStringImageType.getFileWriter({
               folder: 'array-images2',
            }),
            listStyleMaxHeight: '5em',
         }),
      }),
   })
   public images2?: string[];

   public get imgsInfo (): Promise<string> {
      const rst = `<div>size: ${(this.images1?.length || 0) + (this.images2?.length || 0)}</div>`;
      return Promise.resolve(rst);
   }
}

const ArrayImageModel = getModelForClass(ArrayImageModelClass);
export default ArrayImageModel;
