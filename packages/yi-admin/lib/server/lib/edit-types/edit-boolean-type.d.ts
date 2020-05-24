import EditBaseType from './edit-base-type';
import ListBaseType from '../list-types/list-base-type';
export default class EditBooleanType extends EditBaseType {
    /**
     * 前端的组件名称
     */
    componentName: string;
    getListType(): ListBaseType;
}
