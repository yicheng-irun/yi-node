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
declare function ConditionCommentLoader(source: any, map: any): void;
export default ConditionCommentLoader;
