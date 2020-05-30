"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const edit_string_remote_select_type_1 = require("./edit-types/edit-string-remote-select-type");
const edit_string_textarea_type_1 = require("./edit-types/edit-string-textarea-type");
const edit_string_type_1 = require("./edit-types/edit-string-type");
const list_base_type_1 = require("./list-types/list-base-type");
const list_boolean_type_1 = require("./list-types/list-boolean-type");
const list_number_enum_type_1 = require("./list-types/list-number-enum-type");
const list_number_remote_select_type_1 = require("./list-types/list-number-remote-select-type");
const list_string_enum_type_1 = require("./list-types/list-string-enum-type");
const list_string_image_type_1 = require("./list-types/list-string-image-type");
const list_string_remote_select_type_1 = require("./list-types/list-string-remote-select-type");
exports.EditTypes = {
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
    EditStringRemoteSelectType: edit_string_remote_select_type_1.EditStringRemoteSelectType,
    EditStringTextareaType: edit_string_textarea_type_1.EditStringTextareaType,
    EditStringType: edit_string_type_1.EditStringType,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL2xpYi90eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGdFQUEyRDtBQUMzRCxzRUFBaUU7QUFDakUsMEVBQW9FO0FBQ3BFLDhFQUF3RTtBQUN4RSxnR0FBeUY7QUFDekYsb0VBQStEO0FBQy9ELGdGQUEwRTtBQUMxRSw4RUFBd0U7QUFDeEUsb0VBQW1FO0FBQ25FLHNFQUFxRTtBQUNyRSxnR0FBeUY7QUFDekYsc0ZBQWdGO0FBQ2hGLG9FQUErRDtBQUMvRCxnRUFBMkQ7QUFDM0Qsc0VBQWlFO0FBQ2pFLDhFQUF3RTtBQUN4RSxnR0FBeUY7QUFDekYsOEVBQXdFO0FBQ3hFLGdGQUEwRTtBQUMxRSxnR0FBeUY7QUFFNUUsUUFBQSxTQUFTLEdBQUc7SUFDdEIsWUFBWSxFQUFaLDZCQUFZO0lBQ1osZUFBZSxFQUFmLG1DQUFlO0lBQ2YsZ0JBQWdCLEVBQWhCLHNDQUFnQjtJQUNoQixrQkFBa0IsRUFBbEIsMENBQWtCO0lBQ2xCLDBCQUEwQixFQUExQiwyREFBMEI7SUFDMUIsY0FBYyxFQUFkLGlDQUFjO0lBQ2QsbUJBQW1CLEVBQW5CLDRDQUFtQjtJQUNuQixrQkFBa0IsRUFBbEIsMENBQWtCO0lBQ2xCLGtCQUFrQixFQUFsQixxQ0FBa0I7SUFDbEIsbUJBQW1CLEVBQW5CLHVDQUFtQjtJQUNuQiwwQkFBMEIsRUFBMUIsMkRBQTBCO0lBQzFCLHNCQUFzQixFQUF0QixrREFBc0I7SUFDdEIsY0FBYyxFQUFkLGlDQUFjO0NBQ2hCLENBQUM7QUFHVyxRQUFBLFNBQVMsR0FBRztJQUN0QixZQUFZLEVBQVosNkJBQVk7SUFDWixlQUFlLEVBQWYsbUNBQWU7SUFDZixrQkFBa0IsRUFBbEIsMENBQWtCO0lBQ2xCLDBCQUEwQixFQUExQiwyREFBMEI7SUFDMUIsa0JBQWtCLEVBQWxCLDBDQUFrQjtJQUNsQixtQkFBbUIsRUFBbkIsNENBQW1CO0lBQ25CLDBCQUEwQixFQUExQiwyREFBMEI7Q0FDNUIsQ0FBQyJ9