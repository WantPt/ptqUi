const config = {
   testDebug: false,
   get c() {
      return "3.2.6";
   },
   get v() {
      return "4";
   },
   get host() {
      if (this.testDebug) {
         // 测试体质
         return "https://pre.pintuanqu.cn";
      } else {
         // 正式地址
         return "https://www.pintuanqu.cn";
      }
   },
   // 默认图片的前缀1
   get imgUrls(){
      return this.host+"/Public/WeChatApps/images/";
   },
   // 默认图片的前缀2
   get imgUrl(){
      return this.host+"/Public/WeChatApps/image/";
   },
   // 请求数据配置 application/x-www-form-urlencoded
   req: {
      header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      data: {
         unionid: ''
      }
   },
   // 全局默认页面地址
   dPage: {
      index: "/pages/index/index"
   },
   // 全局常用接口
   uApi: {
      upImage: "/upfile/image"
   },
   dApi: {
      "/WeChatAppsCs/Member/index": true
   },
   
}
module.exports = config