"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edit_array_type_1 = require("./edit-types/edit-array-type");
const edit_base_type_1 = require("./edit-types/edit-base-type");
const edit_boolean_type_1 = require("./edit-types/edit-boolean-type");
const edit_date_time_type_1 = require("./edit-types/edit-date-time-type");
const edit_number_enum_type_1 = require("./edit-types/edit-number-enum-type");
const edit_number_remote_select_type_1 = require("./edit-types/edit-number-remote-select-type");
const edit_number_type_1 = require("./edit-types/edit-number-type");
const edit_string_color_type_1 = require("./edit-types/edit-string-color-type");
const edit_string_enum_type_1 = require("./edit-types/edit-string-enum-type");
const edit_string_file_1 = require("./edit-types/edit-string-file");
const edit_string_image_1 = require("./edit-types/edit-string-image");
const edit_string_jodit_type_1 = require("./edit-types/edit-string-jodit-type");
const edit_string_remote_select_type_1 = require("./edit-types/edit-string-remote-select-type");
const edit_string_textarea_type_1 = require("./edit-types/edit-string-textarea-type");
const edit_string_type_1 = require("./edit-types/edit-string-type");
const edit_string_ueditor_type_1 = require("./edit-types/edit-string-ueditor-type");
const list_base_type_1 = require("./list-types/list-base-type");
const list_boolean_type_1 = require("./list-types/list-boolean-type");
const list_number_enum_type_1 = require("./list-types/list-number-enum-type");
const list_number_remote_select_type_1 = require("./list-types/list-number-remote-select-type");
const list_string_enum_type_1 = require("./list-types/list-string-enum-type");
const list_string_image_type_1 = require("./list-types/list-string-image-type");
const list_string_remote_select_type_1 = require("./list-types/list-string-remote-select-type");
exports.EditTypes = {
    EditArrayType: edit_array_type_1.EditArrayType,
    EditBaseType: edit_base_type_1.EditBaseType,
    EditBooleanType: edit_boolean_type_1.EditBooleanType,
    EditDateTimeType: edit_date_time_type_1.EditDateTimeType,
    EditNumberEnumType: edit_number_enum_type_1.EditNumberEnumType,
    EditNumberRemoteSelectType: edit_number_remote_select_type_1.EditNumberRemoteSelectType,
    EditNumberType: edit_number_type_1.EditNumberType,
    EditStringColorType: edit_string_color_type_1.EditStringColorType,
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
    ListBaseType: list_base_type_1.ListBaseType,
    ListBooleanType: list_boolean_type_1.ListBooleanType,
    ListNumberEnumType: list_number_enum_type_1.ListNumberEnumType,
    ListNumberRemoteSelectType: list_number_remote_select_type_1.ListNumberRemoteSelectType,
    ListStringEnumType: list_string_enum_type_1.ListStringEnumType,
    ListStringImageType: list_string_image_type_1.ListStringImageType,
    ListStringRemoteSelectType: list_string_remote_select_type_1.ListStringRemoteSelectType,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL2xpYi90eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtFQUE2RDtBQUM3RCxnRUFBMkQ7QUFDM0Qsc0VBQWlFO0FBQ2pFLDBFQUFvRTtBQUNwRSw4RUFBd0U7QUFDeEUsZ0dBQXlGO0FBQ3pGLG9FQUErRDtBQUMvRCxnRkFBMEU7QUFDMUUsOEVBQXdFO0FBQ3hFLG9FQUFtRTtBQUNuRSxzRUFBcUU7QUFDckUsZ0ZBQWdGO0FBQ2hGLGdHQUF5RjtBQUN6RixzRkFBZ0Y7QUFDaEYsb0VBQStEO0FBQy9ELG9GQUE4RTtBQUU5RSxnRUFBMkQ7QUFDM0Qsc0VBQWlFO0FBQ2pFLDhFQUF3RTtBQUN4RSxnR0FBeUY7QUFDekYsOEVBQXdFO0FBQ3hFLGdGQUEwRTtBQUMxRSxnR0FBeUY7QUFHNUUsUUFBQSxTQUFTLEdBQUc7SUFDdEIsYUFBYSxFQUFiLCtCQUFhO0lBQ2IsWUFBWSxFQUFaLDZCQUFZO0lBQ1osZUFBZSxFQUFmLG1DQUFlO0lBQ2YsZ0JBQWdCLEVBQWhCLHNDQUFnQjtJQUNoQixrQkFBa0IsRUFBbEIsMENBQWtCO0lBQ2xCLDBCQUEwQixFQUExQiwyREFBMEI7SUFDMUIsY0FBYyxFQUFkLGlDQUFjO0lBQ2QsbUJBQW1CLEVBQW5CLDRDQUFtQjtJQUNuQixrQkFBa0IsRUFBbEIsMENBQWtCO0lBQ2xCLGtCQUFrQixFQUFsQixxQ0FBa0I7SUFDbEIsbUJBQW1CLEVBQW5CLHVDQUFtQjtJQUNuQix5QkFBeUIsRUFBekIsa0RBQXlCO0lBQ3pCLDBCQUEwQixFQUExQiwyREFBMEI7SUFDMUIsc0JBQXNCLEVBQXRCLGtEQUFzQjtJQUN0QixjQUFjLEVBQWQsaUNBQWM7SUFDZCxxQkFBcUIsRUFBckIsZ0RBQXFCO0NBQ3ZCLENBQUM7QUFFVyxRQUFBLFNBQVMsR0FBRztJQUN0QixZQUFZLEVBQVosNkJBQVk7SUFDWixlQUFlLEVBQWYsbUNBQWU7SUFDZixrQkFBa0IsRUFBbEIsMENBQWtCO0lBQ2xCLDBCQUEwQixFQUExQiwyREFBMEI7SUFDMUIsa0JBQWtCLEVBQWxCLDBDQUFrQjtJQUNsQixtQkFBbUIsRUFBbkIsNENBQW1CO0lBQ25CLDBCQUEwQixFQUExQiwyREFBMEI7Q0FDNUIsQ0FBQyJ9