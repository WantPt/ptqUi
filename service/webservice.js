// web service api 业务处理
// 此模块用于扩展updata功能
const home = require('home.js');
const agentservice = require('agentservice.js');
const A = require('../vwx/uset.js');
module.exports = {
    ...agentservice,
    getTData: (_url, josn) => {
        return new Promise((resolve, reject) => {
            if (typeof _url == 'string') {
                _url = _url;
            } else {
                _url.url = _url.url;
            }
            // 默认参数设置
            wx.showLoading({
                title: '请求中...',
            })
            A.RSG(_url, josn).then(data => {
                setTimeout(()=>{
                    wx.hideLoading();
                },500)
                wx.stopPullDownRefresh();
                resolve(data);
            }, err => {
                reject(err);
            });
        })
    },
    postTData: (_url, josn) => {
        return new Promise((resolve, reject) => {
            if (typeof _url == 'string') {
                _url = _url;
            } else {
                _url.url = _url.url;
            }
            // 默认参数设置
            wx.showLoading({
                title: '请求中...',
            })
            A.RS(_url, josn).then(data => {
                setTimeout(()=>{
                    wx.hideLoading();
                },500)
                wx.stopPullDownRefresh();
                resolve(data);
            }, err => {
                reject(err);
            });
        })
    },
}