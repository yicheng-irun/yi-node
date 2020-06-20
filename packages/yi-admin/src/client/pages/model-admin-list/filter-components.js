
const FilterComponents = {
   base: () => import('./filter-components/base.vue'),
   'remote-select': () => import('./filter-components/remote-select.vue'),
   select: () => import('./filter-components/select.vue'),
   'string-search': () => import('./filter-components/string-search.vue'),
};

export default FilterComponents;
