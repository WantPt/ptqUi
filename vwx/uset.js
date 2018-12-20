import simple from './common/simple.js';
import utils from '../utils/util.js'
var A = null;
// 输出扩展对象
const _exp = {
   utils,
   set A(_val) {
      A = _val;
   },
   get config() {
      return A.config;
   },
   get DB() {
      return A.DB;
   },
   get STATE() {
      return A.STATE;
   },
   get DF() {
      return A.DF;
   }
}
// 添加扩展属性
for (let key in simple) {
   Object.defineProperties(_exp, {
      [key]: {
         get() {
            return A[key];
         },
         set() {
            return false;
         }
      }
   })
}

module.exports = _exp