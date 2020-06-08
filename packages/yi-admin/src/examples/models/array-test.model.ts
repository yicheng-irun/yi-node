import {
   modelOptions, getModelForClass, arrayProp, prop,
} from '@typegoose/typegoose';
import { EditTypes } from '../../server';

@modelOptions({ schemaOptions: { timestamps: true, collection: 'array-test' } })
export class ArrayModelClass {
   @arrayProp({
      type: String,
      outerOptions: {
         name: '鹅鹅鹅',
         editType: new EditTypes.EditArrayType({
            childrenType: new EditTypes.EditStringType({
               helpText: '呃呃呃',
            }),
         }),
      },
   })
   public arrayField?: string[];

   @arrayProp({
      type: Number,
      outerOptions: {
         editType: new EditTypes.EditArrayType({
            childrenType: new EditTypes.EditNumberType({}),
         }),
      },
   })
   public arrayField2?: number[];

   @arrayProp({
      type: Boolean,
      outerOptions: {
         editType: new EditTypes.EditArrayType({
            childrenType: new EditTypes.EditBooleanType({}),
         }),
      },
   })
   public arrayField3?: boolean[];


   @arrayProp({
      type: Boolean,
      outerOptions: {
         editType: new EditTypes.EditArrayType({
            childrenType: new EditTypes.EditBooleanType({}),
         }),
         name: '布尔数组',
      },
   })
   public arrayField4?: boolean[];
}

const ArrayTestModel = getModelForClass(ArrayModelClass);
export default ArrayTestModel;
