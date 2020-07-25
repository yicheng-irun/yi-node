/**
 * 条件注释loader
 *
 * // #only dev start
 *
 * // #only dev end
 *
 *
 * <!-- #only dev start --> xxxxx <!-- #only dev end -->
 */

import loaderUtils from 'loader-utils';

function ConditionCommentLoader (source, map): void {
   this.cacheable();

   const options = loaderUtils.getOptions(this) || {
      isProd: true,
   };
   const { isProd } = options;
   let result = source;

   if (isProd) {
      result = source.replace(/\/\/\s+#only dev start([\S\s]*?)\/\/\s+#only dev end.*/g, (a: string, b: string) => {
         let newLine = '';
         b.replace(/\n/g, (): string => {
            newLine += '\n';
            return '';
         });
         return newLine;
      });

      result = result.replace(/<!--\s+#only dev start\s+-->([\S\s]*?)<!--\s+#only dev end\s+-->/g, () => '');
   }

   this.callback(null, result, map);
}

export default ConditionCommentLoader;
