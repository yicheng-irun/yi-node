"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTypes = exports.EditTypes = void 0;
const edit_array_string_tag_type_1 = require("./edit-types/edit-array-string-tag-type");
const edit_array_type_1 = require("./edit-types/edit-array-type");
const edit_base_type_1 = require("./edit-types/edit-base-type");
const edit_boolean_type_1 = require("./edit-types/edit-boolean-type");
const edit_date_time_type_1 = require("./edit-types/edit-date-time-type");
const edit_number_enum_type_1 = require("./edit-types/edit-number-enum-type");
const edit_number_remote_select_type_1 = require("./edit-types/edit-number-remote-select-type");
const edit_number_type_1 = require("./edit-types/edit-number-type");
const edit_object_type_1 = require("./edit-types/edit-object-type");
const edit_string_enum_type_1 = require("./edit-types/edit-string-enum-type");
const edit_string_file_1 = require("./edit-types/edit-string-file");
const edit_string_image_1 = require("./edit-types/edit-string-image");
const edit_string_jodit_type_1 = require("./edit-types/edit-string-jodit-type");
const edit_string_remote_select_type_1 = require("./edit-types/edit-string-remote-select-type");
const edit_string_textarea_type_1 = require("./edit-types/edit-string-textarea-type");
const edit_string_type_1 = require("./edit-types/edit-string-type");
const edit_string_ueditor_type_1 = require("./edit-types/edit-string-ueditor-type");
const list_array_type_1 = require("./list-types/list-array-type");
const list_base_type_1 = require("./list-types/list-base-type");
const list_boolean_type_1 = require("./list-types/list-boolean-type");
const list_number_enum_type_1 = require("./list-types/list-number-enum-type");
const list_number_remote_select_type_1 = require("./list-types/list-number-remote-select-type");
const list_string_enum_type_1 = require("./list-types/list-string-enum-type");
const list_string_image_type_1 = require("./list-types/list-string-image-type");
const list_string_remote_select_type_1 = require("./list-types/list-string-remote-select-type");
exports.EditTypes = {
    EditArrayStringTagType: edit_array_string_tag_type_1.EditArrayStringTagType,
    EditArrayType: edit_array_type_1.EditArrayType,
    EditBaseType: edit_base_type_1.EditBaseType,
    EditBooleanType: edit_boolean_type_1.EditBooleanType,
    EditDateTimeType: edit_date_time_type_1.EditDateTimeType,
    EditNumberEnumType: edit_number_enum_type_1.EditNumberEnumType,
    EditNumberRemoteSelectType: edit_number_remote_select_type_1.EditNumberRemoteSelectType,
    EditNumberType: edit_number_type_1.EditNumberType,
    EditObjectType: edit_object_type_1.EditObjectType,
    EditStringEnumType: edit_string_enum_type_1.EditStringEnumType,
    EditStringFileType: edit_string_file_1.EditStringFileType,
    EditStringImageType: edit_string_image_1.EditStringImageType,
    EditStringJoditEditorType: edit_string_jodit_type_1.EditStringJoditEditorType,
    EditStringRemoteSelectType: edit_string_remote_select_type_1.EditStringRemoteSelectType,
    EditStringTextareaType: edit_string_textarea_type_1.EditStringTextareaType,
    EditStringType: edit_string_type_1.EditStringType,
    EditStringUEditorType: edit_string_ueditor_type_1.EditStringUEditorType,
};
exports.ListTypes = {
    ListArrayType: list_array_type_1.ListArrayType,
    ListBaseType: list_base_type_1.ListBaseType,
    ListBooleanType: list_boolean_type_1.ListBooleanType,
    ListNumberEnumType: list_number_enum_type_1.ListNumberEnumType,
    ListNumberRemoteSelectType: list_number_remote_select_type_1.ListNumberRemoteSelectType,
    ListStringEnumType: list_string_enum_type_1.ListStringEnumType,
    ListStringImageType: list_string_image_type_1.ListStringImageType,
    ListStringRemoteSelectType: list_string_remote_select_type_1.ListStringRemoteSelectType,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL2xpYi90eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3RkFBaUY7QUFDakYsa0VBQTZEO0FBQzdELGdFQUEyRDtBQUMzRCxzRUFBaUU7QUFDakUsMEVBQW9FO0FBQ3BFLDhFQUF3RTtBQUN4RSxnR0FBeUY7QUFDekYsb0VBQStEO0FBQy9ELG9FQUErRDtBQUMvRCw4RUFBd0U7QUFDeEUsb0VBQW1FO0FBQ25FLHNFQUFxRTtBQUNyRSxnRkFBZ0Y7QUFDaEYsZ0dBQXlGO0FBQ3pGLHNGQUFnRjtBQUNoRixvRUFBK0Q7QUFDL0Qsb0ZBQThFO0FBRTlFLGtFQUE2RDtBQUM3RCxnRUFBMkQ7QUFDM0Qsc0VBQWlFO0FBQ2pFLDhFQUF3RTtBQUN4RSxnR0FBeUY7QUFDekYsOEVBQXdFO0FBQ3hFLGdGQUEwRTtBQUMxRSxnR0FBeUY7QUFHNUUsUUFBQSxTQUFTLEdBQUc7SUFDdEIsc0JBQXNCLEVBQXRCLG1EQUFzQjtJQUN0QixhQUFhLEVBQWIsK0JBQWE7SUFDYixZQUFZLEVBQVosNkJBQVk7SUFDWixlQUFlLEVBQWYsbUNBQWU7SUFDZixnQkFBZ0IsRUFBaEIsc0NBQWdCO0lBQ2hCLGtCQUFrQixFQUFsQiwwQ0FBa0I7SUFDbEIsMEJBQTBCLEVBQTFCLDJEQUEwQjtJQUMxQixjQUFjLEVBQWQsaUNBQWM7SUFDZCxjQUFjLEVBQWQsaUNBQWM7SUFDZCxrQkFBa0IsRUFBbEIsMENBQWtCO0lBQ2xCLGtCQUFrQixFQUFsQixxQ0FBa0I7SUFDbEIsbUJBQW1CLEVBQW5CLHVDQUFtQjtJQUNuQix5QkFBeUIsRUFBekIsa0RBQXlCO0lBQ3pCLDBCQUEwQixFQUExQiwyREFBMEI7SUFDMUIsc0JBQXNCLEVBQXRCLGtEQUFzQjtJQUN0QixjQUFjLEVBQWQsaUNBQWM7SUFDZCxxQkFBcUIsRUFBckIsZ0RBQXFCO0NBQ3ZCLENBQUM7QUFHVyxRQUFBLFNBQVMsR0FBRztJQUN0QixhQUFhLEVBQWIsK0JBQWE7SUFDYixZQUFZLEVBQVosNkJBQVk7SUFDWixlQUFlLEVBQWYsbUNBQWU7SUFDZixrQkFBa0IsRUFBbEIsMENBQWtCO0lBQ2xCLDBCQUEwQixFQUExQiwyREFBMEI7SUFDMUIsa0JBQWtCLEVBQWxCLDBDQUFrQjtJQUNsQixtQkFBbUIsRUFBbkIsNENBQW1CO0lBQ25CLDBCQUEwQixFQUExQiwyREFBMEI7Q0FDNUIsQ0FBQyJ9