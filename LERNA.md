
* 给子库增加包
```bash

lerna add


# 例子

lerna add dotenv @babel/core @babel/plugin-proposal-optional-chaining @babel/plugin-syntax-dynamic-import @babel/plugin-transform-runtime @babel/preset-env @babel/runtime autoprefixer babel-loader css-hot-loader css-loader cssnano eslint eslint-config-airbnb-base eslint-plugin-html eslint-plugin-import eslint-plugin-vue file-loader html-webpack-plugin loader-utils mini-css-extract-plugin postcss-loader style-loader stylus stylus-loader typescript url-loader vue-loader vue-style-loader vue-template-compiler webpack webpack-dev-server webpack-merge packages/yi-vue-ssr-build

lerna add glob packages/yi-vue-ssr-build

npx lerna add css-hot-loader packages/yi-vue-ssr-build

lerna add @types/cssnano @types/html-webpack-plugin @types/loader-utils @types/mini-css-extract-plugin @types/webpack @types/webpack-dev-server @types/webpack-merge --dev packages/yi-vue-ssr-build

npx lerna add @types/vue-server-renderer --dev packages/yi-vue-ssr-build



npx lerna add typescript


npx lerna add koa packages/yi-vue-ssr-middleware

```



发布
```

npx lerna publish packages/yi-vue-ssr-build

```



# yi-admin
