"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const edit_base_type_1 = __importDefault(require("./edit-types/edit-base-type"));
const edit_boolean_type_1 = __importDefault(require("./edit-types/edit-boolean-type"));
const edit_date_time_type_1 = __importDefault(require("./edit-types/edit-date-time-type"));
const edit_number_enum_type_1 = __importDefault(require("./edit-types/edit-number-enum-type"));
const edit_number_remote_select_type_1 = __importDefault(require("./edit-types/edit-number-remote-select-type"));
const edit_number_type_1 = __importDefault(require("./edit-types/edit-number-type"));
const edit_string_color_type_1 = __importDefault(require("./edit-types/edit-string-color-type"));
const edit_string_enum_type_1 = __importDefault(require("./edit-types/edit-string-enum-type"));
const edit_string_file_1 = __importDefault(require("./edit-types/edit-string-file"));
const edit_string_image_1 = __importDefault(require("./edit-types/edit-string-image"));
const edit_string_remote_select_type_1 = __importDefault(require("./edit-types/edit-string-remote-select-type"));
const edit_string_textarea_type_1 = __importDefault(require("./edit-types/edit-string-textarea-type"));
const edit_string_type_1 = __importDefault(require("./edit-types/edit-string-type"));
const list_base_type_1 = __importDefault(require("./list-types/list-base-type"));
const list_boolean_type_1 = __importDefault(require("./list-types/list-boolean-type"));
const list_number_enum_type_1 = __importDefault(require("./list-types/list-number-enum-type"));
const list_number_remote_select_type_1 = __importDefault(require("./list-types/list-number-remote-select-type"));
const list_string_enum_type_1 = __importDefault(require("./list-types/list-string-enum-type"));
const list_string_image_type_1 = __importDefault(require("./list-types/list-string-image-type"));
const list_string_remote_select_type_1 = __importDefault(require("./list-types/list-string-remote-select-type"));
exports.EditTypes = {
    EditBaseType: edit_base_type_1.default,
    EditBooleanType: edit_boolean_type_1.default,
    EditDateTimeType: edit_date_time_type_1.default,
    EditNumberEnumType: edit_number_enum_type_1.default,
    EditNumberRemoteSelectType: edit_number_remote_select_type_1.default,
    EditNumberType: edit_number_type_1.default,
    EditStringColorType: edit_string_color_type_1.default,
    EditStringEnumType: edit_string_enum_type_1.default,
    EditStringFileType: edit_string_file_1.default,
    EditStringImageType: edit_string_image_1.default,
    EditStringRemoteSelectType: edit_string_remote_select_type_1.default,
    EditStringTextareaType: edit_string_textarea_type_1.default,
    EditStringType: edit_string_type_1.default,
};
exports.ListTypes = {
    ListBaseType: list_base_type_1.default,
    ListBooleanType: list_boolean_type_1.default,
    ListNumberEnumType: list_number_enum_type_1.default,
    ListNumberRemoteSelectType: list_number_remote_select_type_1.default,
    ListStringEnumType: list_string_enum_type_1.default,
    ListStringImageType: list_string_image_type_1.default,
    ListStringRemoteSelectType: list_string_remote_select_type_1.default,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL2xpYi90eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGlGQUF1RDtBQUN2RCx1RkFBNkQ7QUFDN0QsMkZBQWdFO0FBQ2hFLCtGQUFvRTtBQUNwRSxpSEFBcUY7QUFDckYscUZBQTJEO0FBQzNELGlHQUFzRTtBQUN0RSwrRkFBb0U7QUFDcEUscUZBQStEO0FBQy9ELHVGQUFpRTtBQUNqRSxpSEFBcUY7QUFDckYsdUdBQTRFO0FBQzVFLHFGQUEyRDtBQUMzRCxpRkFBdUQ7QUFDdkQsdUZBQTZEO0FBQzdELCtGQUFvRTtBQUNwRSxpSEFBcUY7QUFDckYsK0ZBQW9FO0FBQ3BFLGlHQUFzRTtBQUN0RSxpSEFBcUY7QUFFeEUsUUFBQSxTQUFTLEdBQUc7SUFDdEIsWUFBWSxFQUFaLHdCQUFZO0lBQ1osZUFBZSxFQUFmLDJCQUFlO0lBQ2YsZ0JBQWdCLEVBQWhCLDZCQUFnQjtJQUNoQixrQkFBa0IsRUFBbEIsK0JBQWtCO0lBQ2xCLDBCQUEwQixFQUExQix3Q0FBMEI7SUFDMUIsY0FBYyxFQUFkLDBCQUFjO0lBQ2QsbUJBQW1CLEVBQW5CLGdDQUFtQjtJQUNuQixrQkFBa0IsRUFBbEIsK0JBQWtCO0lBQ2xCLGtCQUFrQixFQUFsQiwwQkFBa0I7SUFDbEIsbUJBQW1CLEVBQW5CLDJCQUFtQjtJQUNuQiwwQkFBMEIsRUFBMUIsd0NBQTBCO0lBQzFCLHNCQUFzQixFQUF0QixtQ0FBc0I7SUFDdEIsY0FBYyxFQUFkLDBCQUFjO0NBQ2hCLENBQUM7QUFHVyxRQUFBLFNBQVMsR0FBRztJQUN0QixZQUFZLEVBQVosd0JBQVk7SUFDWixlQUFlLEVBQWYsMkJBQWU7SUFDZixrQkFBa0IsRUFBbEIsK0JBQWtCO0lBQ2xCLDBCQUEwQixFQUExQix3Q0FBMEI7SUFDMUIsa0JBQWtCLEVBQWxCLCtCQUFrQjtJQUNsQixtQkFBbUIsRUFBbkIsZ0NBQW1CO0lBQ25CLDBCQUEwQixFQUExQix3Q0FBMEI7Q0FDNUIsQ0FBQyJ9