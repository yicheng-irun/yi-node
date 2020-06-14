
const FormComponents = {
   array: () => import('./form-components/array.vue'),
   base: () => import('./form-components/base.vue'),
   boolean: () => import('./form-components/boolean.vue'),
   'date-time': () => import('./form-components/date-time.vue'),
   'number-enum': () => import('./form-components/number-enum.vue'),
   'number-remote-select': () => import('./form-components/number-remote-select.vue'),
   number: () => import('./form-components/number.vue'),
   'string-enum': () => import('./form-components/string-enum.vue'),
   'string-file': () => import('./form-components/string-file.vue'),
   'string-image': () => import('./form-components/string-image.vue'),
   'string-jodit-editor': () => import('./form-components/string-jodit-editor.vue'),
   'string-remote-select': () => import('./form-components/string-remote-select.vue'),
   string: () => import('./form-components/string.vue'),
   'string-textarea': () => import('./form-components/string-textarea.vue'),
   'string-ueditor': () => import('./form-components/string-ueditor.vue'),
};

export default FormComponents;
