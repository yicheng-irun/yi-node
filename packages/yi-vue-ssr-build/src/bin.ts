#! /usr/bin/env node

import program from 'commander';
import path from 'path';
import { startBuild } from './index';


program.option('-c, --config-file <path>', './yi-vue-ssr-config.js');

program.command('serve').action(() => {
   startBuild({
      isProduction: false,
      ssrBuildConfigFile: program.configFile || path.join(process.cwd(), 'yi-vue-ssr-config.js'),
   }).catch((e) => console.error(e));
});

program.command('build').action(() => {
   console.log(program.configFile);
   startBuild({
      isProduction: true,
      ssrBuildConfigFile: program.configFile || path.join(process.cwd(), 'yi-vue-ssr-config.js'),
   }).catch((e) => console.error(e));
});

program.parse(process.argv);
