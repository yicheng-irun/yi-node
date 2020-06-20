import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';
import { EditTypes, MongooseModelAdmin } from '../../server';

@modelOptions({ schemaOptions: { timestamps: true, collection: 'string-test' } })
export class StringTestModelClass {
   @prop({
      type: String,
      maxlength: 20,
      minlength: 3,
      name: '字符串strField',
      default: 'defaultValue',
      placeholder: '请输入xxx',

   })
   public strField?: string;

   @prop({
      type: String,
      required: true,
   })
   public strField2?: string;

   @prop({
      filterType: new MongooseModelAdmin.FilterTypes.FilterStringSearchType({
         tip: '就是提示你一下',
      }),
   })
   public strField3?: string;

   @prop({
      type: String,
      name: '文本字段3',
      editType: new EditTypes.EditStringTextareaType({
         required: false,
         maxLength: 100,
         placeholder: '请输入XXX',
      }),
      filterType: new MongooseModelAdmin.FilterTypes.FilterStringSearchType({
         placeholder: '额额额',
      }),
   })
   public textField3?: string;
}

const StringTestModel = getModelForClass(StringTestModelClass);
export default StringTestModel;
