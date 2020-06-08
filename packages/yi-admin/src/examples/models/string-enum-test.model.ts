import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';
import { EditTypes } from '../../server';

@modelOptions({ schemaOptions: { timestamps: true, collection: 'string-enum-test' } })
export class StringEnumTestModelClass {
     @prop({
        type: String,
        enum: ['aaa', 'bbb', 'ccc', 'ddd'],
     })
     public strEnumField?: string;

     @prop({
        type: String,
        enum: ['1', '2', '3', '4'],
        editType: new EditTypes.EditStringEnumType({
           required: false,
           enum: [{
              label: '一',
              value: '1',
           }, {
              label: '二',
              value: '2',
           }, {
              label: '三',
              value: '3',
           }, {
              label: '四',
              value: '4',
           }],
        }),
     })
     public strEnumField2?: string;

     @prop({
        type: String,
        helpText: '字符串远程选择类型示例',
        editType: new EditTypes.EditStringRemoteSelectType({
           required: false,
           async getLabelByValue (value): Promise<string> {
              if (value) { return `label:${value}`; }
              return '';
           },
           async getOptions (query: string): Promise<(string| { label: string; value: string })[]> {
              const q = String(query).trim();

              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              const distinctData = await StringEnumTestModel.distinct('strRemoteSelectField3').exec();
              const options = [];
              if (q && distinctData.indexOf(q) < 0) {
                 options.push({
                    value: q,
                    label: `value is ${q}`,
                 });
              }
              distinctData.forEach((item) => {
                 options.push({
                    value: String(item),
                    label: `value is ${item}`,
                 });
              });

              return options;
           },
        }),
     })
     public strRemoteSelectField3?: string;
}

const StringEnumTestModel = getModelForClass(StringEnumTestModelClass);
export default StringEnumTestModel;
