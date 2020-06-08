
/**
 * 从环境变量中获取一个值
 * @param name 环境变量名
 * @param defaultValue 默认值
 */
export function getEnv (name: string, defaultValue = ''): string {
   const { env = {} } = process;
   if (Object.prototype.hasOwnProperty.call(env, name)) {
      return env[name] || '';
   }
   return defaultValue;
}

const isDev = getEnv('NODE_ENV', 'production') === 'development';
const host = getEnv('HTTP_HOST', '0.0.0.0');
const port = Number.parseInt(getEnv('HTTP_PORT', '0'), 10);

if (port === 0) throw new Error('请在.env环境变量中设置HTTP_PORT');

const mongodbUri = getEnv('MONGODB_URI', 'mongodb://localhost:27017/');

const settings = {
   /**
    * 是否是开发环境
    */
   isDev,

   /**
    * http服务监听的host
    */
   host,

   /**
    * http服务监听的端口
    */
   port,

   MONGODB_URI: mongodbUri,

};

export default settings;
