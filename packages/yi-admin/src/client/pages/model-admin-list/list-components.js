
const FormComponents = {
   base: () => import('./list-components/base.vue'),
   boolean: () => import('./list-components/boolean.vue'),
   'string-enum': () => import('./list-components/string-enum.vue'),
   'string-remote-select': () => import('./list-components/string-remote-select.vue'),
   'string-image': () => import('./list-components/string-image.vue'),
};

export default FormComponents;
