//app.js
import { vwx } from '/vwx/index.js'
import config from '/config/config.js'
import exta from '/common/exta';
import { DF, STATE } from '/config/define.js'
import store from '/udb/store/index.js'
import DB from '/udb/DB/index.js'
import webservice from '/service/webservice.js'
// import utils from '/utils/util.js'
// 注册App，vwx初始化数据
App(vwx({
    config,
    exta,
    webservice,
    store,
    DB,
    DF,
    STATE,
    onLaunch: function() {
        // let unionid = wx.getStorageSync('thisCode');
        // if (unionid) {
        //     this.config.req.data.unionid = wx.getStorageSync('thisCode');
        //     this.store.unid = wx.getStorageSync('thisCode');
        // } else {
        //     wx.reLaunch({
        //         url: '/pages/userPower/userPower',
        //     })
        // }
        //wx.setEnableDebug({ enableDebug: config.testDebug });
    },
    // 推出身份的接口
    quitBtn(event, upidentity) {
        
    },
    onShow: function() {
        try {
            this.store.SystemInfo.statusBarHeight = wx.getSystemInfoSync().statusBarHeight > 20 ? 66 : 0
        } catch (e) {
            this.store.SystemInfo.statusBarHeight = 20
        }
        console.log("%c", "background: url(https://graph.baidu.com/resource/138b2ebb99f890c8b8c7c01543836115.jpg) no-repeat center; background-size:100% 100%;padding-left:150px;padding-bottom: 150px;margin-left:640px;")
        console.log([
            "%c                   _ooOoo_",
            "                  o8888888o",
            "                  88\" . \"88",
            "                  (| -_- |)",
            "                  O\\  =  /O",
            "               ____/`---'\\____",
            "             .'  \\\\|     |//  `.",
            "            /  \\\\|||  :  |||//  \\",
            "           /  _||||| -:- |||||-  \\",
            "           |   | \\\\\\  -  /// |   |",
            "           | \\_|  ''\\---/''  |   |",
            "           \\  .-\\__  `-`  ___/-. /",
            "         ___`. .'  /--.--\\  `. . __",
            "      .\"\" '<  `.___\\_<|>_/___.'  >'\"\".",
            "     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |",
            "     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /",
            "======`-.____`-.___\\_____/___.-`____.-'======",
            "                   `=---='",
            "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
        ].join('\n'),'color: #fad144;');
        console.log('%c     佛祖保佑   T_T    永无BUG', 'color: #fa4844;font-size: 16px;font-weight: bold');
        this.review.init(this.config.dApi);
    }
}));