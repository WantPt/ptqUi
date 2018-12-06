// 获取A对象
import A from '../vwx/uset.js'

// 过滤不存在商家ID的请求
const filterSore = function (_promise) {
   if (A.DB.user.sid == "" && A.DB.user.sid != 0) {
      return A.promiseReject("缺少商户ID");
   } else {
      return _promise;
   }
}
module.exports = {
   //店铺基本信息
   getMember() {
      return new Promise((resolve, reject) => {
         this.getTDataStorage({ url: '/WeChatAppsCs/Member/index', data: { store_id: 0 } }).then(res => {
            if (res.status == A.STATE.STATUS.OK) {
               resolve(res.store_info);
               A.DB.user.sid = res.store_info.store_id;
               A.DB.user.uid = res.user_id
            } else {
               reject(res)
            }
         }, rej => {
            reject(rej)
         })
      })
   },
   // 本店特惠活动的列表
   getMemberPointSpecialsList(_paging) {
      _paging = _paging || 1;
      return filterSore(this.getTData({ url: '/WeChatAppsCs/MemberPoint/specials_list', data: { store_id: A.DB.user.sid, paging: _paging } }));
   }
}
