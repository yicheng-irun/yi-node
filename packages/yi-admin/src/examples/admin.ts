import YiAdmin, {
   MongooseModelAdmin, SiteNavMenu, ModelAdminListAction, ListActionResult,
} from '../server/index';
import YiAdminDemoModel from './models/demo.model';
import RefFieldClassModel from './models/demo.refclass.model';
import FileImageModel from './models/file-image.model';
import StringTestModel from './models/string-test.model';
import StringEnumTestModel from './models/string-enum-test.model';
import NumberEnumTestModel from './models/number-enum-test.model';
import StringFileTestModel from './models/string-file.model';
import StringImageTestModel from './models/string-image.model';
import StringJoditEditorModel from './models/string-jodit-editor.model';
import StringUEditorModel from './models/string-ueditor.model';
import ArrayTestModel from './models/array-test.model';
import ArrayImageModel from './models/array-image.model';
import ArrayStringEnumModel from './models/array-string-enum.model';
import settings from './settings';

const myadmin = new YiAdmin({
   serverOrigin: `http://127.0.0.1:${settings.port}`,
});

myadmin.addModelAdmin(new MongooseModelAdmin({
   name: 'array-image',
   model: ArrayImageModel,
}));

myadmin.addModelAdmin(new MongooseModelAdmin({
   name: 'array-string-enum',
   model: ArrayStringEnumModel,
}));

myadmin.addModelAdmin(new MongooseModelAdmin({
   name: 'array',
   model: ArrayTestModel,
}));

myadmin.addModelAdmin(new MongooseModelAdmin({
   name: 'yi-admin-demo',
   model: YiAdminDemoModel,
   listActions: [
      new ModelAdminListAction({
         actionName: '某某操作',
         actionFunc: async (): Promise<ListActionResult> => {
            throw new Error('执行是不可能执行成功的');
         },
         isBatchAction: false,
         isTableRowAction: true,
      }),

      new ModelAdminListAction({
         actionName: '只是_批量执行',
         actionFunc: async (): Promise<ListActionResult> => {
            throw new Error('执行是不可能执行成功的');
         },
         isBatchAction: true,
         isTableRowAction: false,
         buttonType: 'success',
      }),

      new ModelAdminListAction({
         actionName: '不需确认操作',
         actionFunc: async (): Promise<ListActionResult> => ({
            successfulNum: 0,
            failedNum: 0,
         }),
         popConfirm: false,
         buttonType: 'info',
         buttonIcon: 'el-icon-message-solid',
      }),

      new ModelAdminListAction({
         actionName: '某某操作',
         actionFunc: async (): Promise<ListActionResult> => {
            throw new Error('执行是不可能执行成功的');
         },
         isBatchAction: false,
         isTableRowAction: true,
      }),
   ],
}));

myadmin.addModelAdmin(new MongooseModelAdmin({
   name: 'admin-demo-ref',
   title: '关联模型',
   model: RefFieldClassModel,
}));

myadmin.addModelAdmin(new MongooseModelAdmin({
   name: 'file-image',
   title: '文件和图片测试',
   model: FileImageModel,
}));

myadmin.addModelAdmin(new MongooseModelAdmin({
   name: 'number-enum-test',
   model: NumberEnumTestModel,
}));

myadmin.addModelAdmin(new MongooseModelAdmin({
   name: 'string-enum-test',
   model: StringEnumTestModel,
}));

myadmin.addModelAdmin(new MongooseModelAdmin({
   name: 'string-file',
   model: StringFileTestModel,
}));

myadmin.addModelAdmin(new MongooseModelAdmin({
   name: 'string-image',
   model: StringImageTestModel,
}));

myadmin.addModelAdmin(new MongooseModelAdmin({
   name: 'string-jodit-editor',
   model: StringJoditEditorModel,
}));

myadmin.addModelAdmin(new MongooseModelAdmin({
   name: 'string',
   model: StringTestModel,
}));

myadmin.addModelAdmin(new MongooseModelAdmin({
   name: 'string-ueditor',
   model: StringUEditorModel,
}));


myadmin.siteNavMenu.add(new SiteNavMenu({
   title: '测试菜单1',
   link: 'model-admin/yi-admin-demo/edit/',
}));


// (async function () {
//    const t = await YiAdminDemoModel.findOne();
//    console.log(t);

//    const yad = new YiAdminDemoModel();
//    yad.strField = '哈哈哈';
// //    await yad.save();
// }()).catch(console.error);

export default myadmin;
