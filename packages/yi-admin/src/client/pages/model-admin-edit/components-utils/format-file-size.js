
/**
 * @param {number} size
 */
export default function formatFileSize (size) {
   const num = Number.parseFloat(size);
   if (Number.isNaN(num)) return 'NaN';

   if (num > 1000 * 1000 * 1000) {
      return `${(num / (1000 * 1000 * 1000)).toFixed(2)}Mb`;
   }
   if (num > 1000 * 1000) {
      return `${(num / (1000 * 1000)).toFixed(2)}Mb`;
   }
   if (num > 1000) {
      return `${(num / 1000).toFixed(2)}Kb`;
   }
   return `${num}b`;
}
