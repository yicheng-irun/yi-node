
export function tileResult (data: any): {
    [key: string]: any;
} {
   if (typeof data === 'object') {
      if (Array.isArray(data)) {
         const t = [];
         for (let i = 0; i < data.length; i += 1) {
            t.push(tileResult(data[i]));
         }
         return t;
      }


      const result: {
         [key: string]: any;
      } = {};

      const keys = Object.keys(data);
      for (let i = 0; i < keys.length; i += 1) {
         const key = keys[i];
         // eslint-disable-next-line no-continue
         if (key === '_id') continue;
         const item = data[key];
         if (typeof item === 'object') {
            if (Array.isArray(item)) {
               result[key] = tileResult(item);
            } else {
               const temp = tileResult(item);
               const tempKeys = Object.keys(temp);
               for (let k = 0; k < tempKeys.length; k += 1) {
                  const tempKey = tempKeys[k];
                  result[`${key}.${tempKey}`] = temp[tempKey];
               }
            }
         } else {
            result[key] = item;
         }
      }
      return result;
   }
   return data;
}
