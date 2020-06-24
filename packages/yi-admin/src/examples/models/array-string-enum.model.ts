import {
   modelOptions, getModelForClass, arrayProp,
} from '@typegoose/typegoose';
import { EditTypes, MongooseModelAdmin } from '../../server';

@modelOptions({ schemaOptions: { timestamps: true, collection: 'array-string-enum' } })
export class ArrayStringEnumModelClass {
   @arrayProp({
      type: String,
      editType: new EditTypes.EditArrayType({
         childrenType: new EditTypes.EditStringRemoteSelectType({
            required: false,
            async getLabelByValue (value): Promise<string> {
               if (value) { return `${value}`; }
               return '';
            },
            async getOptions (query: string): Promise<({ label: string; value: string })[]> {
               const q = String(query).trim();

               // eslint-disable-next-line @typescript-eslint/no-use-before-define
               const distinctData = await ArrayStringEnumModel.distinct('remoteSelect').exec();
               const options = [];
               if (q && distinctData.indexOf(q) < 0) {
                  options.push({
                     value: q,
                     label: `${q}`,
                  });
               }
               distinctData.forEach((item) => {
                  options.push({
                     value: String(item),
                     label: `${item}`,
                  });
               });

               return options;
            },
         }),
      }),
      filterType: new MongooseModelAdmin.FilterTypes.FilterStringSearchType({}),
   })
   public remoteSelect?: string[];

   @arrayProp({
      type: String,
      editType: new EditTypes.EditArrayType({
         childrenType: new EditTypes.EditStringRemoteSelectType({
            required: false,
            async getLabelByValue (value): Promise<string> {
               if (value) { return `${value}`; }
               return '';
            },
            async getOptions (query: string): Promise<({ label: string; value: string })[]> {
               const q = String(query).trim();

               // eslint-disable-next-line @typescript-eslint/no-use-before-define
               const distinctData = await ArrayStringEnumModel.distinct('remoteSelect2').exec();
               const options = [];
               if (q && distinctData.indexOf(q) < 0) {
                  options.push({
                     value: q,
                     label: `${q}`,
                  });
               }
               distinctData.forEach((item) => {
                  options.push({
                     value: String(item),
                     label: `${item}`,
                  });
               });

               return options;
            },
         }),
         listStyleInline: true,
      }),
      filterType: new MongooseModelAdmin.FilterTypes.FilterRemoteSelectType({
         multiSelect: true,
      }),
   })
   public remoteSelect2?: string[];
}

const ArrayStringEnumModel = getModelForClass(ArrayStringEnumModelClass);
export default ArrayStringEnumModel;
