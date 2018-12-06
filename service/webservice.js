// web service api 业务处理
// 此模块用于扩展updata功能
const home = require('home.js');
const agentservice = require('agentservice.js');
const A = require('../vwx/uset.js');
module.exports = {
    ...home,
    ...agentservice,
    getTData: (_url) => {
        return new Promise((resolve, reject) => {
            if (typeof _url == 'string') {
                _url = "/WeChatAppsCs/" + _url;
            } else {
                _url.url = "/WeChatAppsCs/" + _url.url;
            }
            A.RS(_url).then(data => {
                wx.hideLoading();
                wx.stopPullDownRefresh();
                if (!data.status && data.status != 0) {
                    A.showTipModal('网络错误,请重新登陆!', () => {
                        wx.reLaunch({
                            url: '/pages/loading/loading'
                        })
                    })
                    return
                } else if (data.status == 233) {
                    A.showTipModal(data.info, () => {
                        wx.reLaunch({
                            url: '/pages/loading/identChang/identChang'
                        })
                    })
                    return
                } else if (data.status == 333) {
                    A.showTipModal('您的代理商身份已被禁用', () => {
                        wx.reLaunch({
                            url: '/pages/loading/identChang/identChang'
                        })
                    })
                    return
                } else if (data.status == 12) {
                    A.showTipModal(data.info, () => {
                        wx.reLaunch({
                            url: '/pages/loading/loading'
                        })
                    })
                    return
                }
                resolve(data);
            }, err => {
                reject(err);
            });
        })
    }
}