import modal from "modal.js";

// 全局常用方法
// 全局App对象
var A = {};
// 一些任务处理全局变量
const B = {
    islogin: false //用于url请求时是否挑战到登陆页
};
//返回组件对象的dataset值
const C = _obj => {
        return _obj.currentTarget.dataset;
    }
    //跳转处理
const G = (_url, _reviewPage) => {
        var _uArr = _url.split("://");
        if (_uArr.length > 1) {
            // 当前跳转处理页面是否在登陆
            if (_uArr[1] == A.config.dPage.login && B.islogin) {
                return;
            } else if (_uArr[1] == A.config.dPage.login) {
                B.islogin = true;
            } else {
                B.islogin = false;
            }
            switch (_uArr[0]) {
                case "navigateTo":
                    wx.navigateTo({ url: _uArr[1] });
                    break;
                case "redirectTo":
                    wx.redirectTo({ url: _uArr[1] });
                    break;
                case "switchTab":
                    wx.switchTab({ url: _uArr[1] });
                    break;
                case "navigateBack":
                    // 获取打开中的所有页面
                    let pages = getCurrentPages();
                    if (pages.length > 1) {
                        if (_reviewPage) {
                            pages[pages.length - 2].setData({ ReviewPage: true });
                        }
                    }
                    wx.navigateBack({ delta: _uArr[1] });
                    break;
                default:
                    wx.redirectTo({ url: _uArr[1] });
            }
        } else {
            wx.navigateTo({ url: _uArr[0] })
        }
    }
    //数据交互提示
const S = {
        toast: _obj => {
            getParentPage(0).wToast(_obj);
        },
        OK: _obj => {
            let _o = {
                icon: 'success',
                duration: 3000,
            }
            Object.assign(_o, _obj);
            wx.showToast(_o);
        },
        loading: _obj => {
            let _o = { title: 'loading.' }
            if (_obj) Object.assign(_o, _obj);
            wx.showLoading(_o)
        },
        showModal: _obj => {
            wx.showModal(_obj);
        },
        showActionSheet: _obj => {
            wx.showActionSheet(_obj);
        },
        showToast: _obj => {
            wx.showToast(_obj);
        }
    }
    //发起网络请求
const R = (_obj, josn) => {
        if (typeof _obj.url != "undefined") {
            // 拼接url
            if (_obj.url.indexOf('http://') == -1 && _obj.url.indexOf('https://') == -1) {
                _obj.url = A.config.host + _obj.url;
            }
            _obj["_fail"] = err => {}
                // 获取success方法并处理
            if (typeof _obj.success != "undefined") {
                _obj["_success"] = _obj.success;
                delete _obj.success;
            }
            // 获取fail方法并处理
            if (typeof _obj.fail != "undefined") {
                _obj["_fail"] = _obj.fail;

                delete _obj.fail;

            }

            let _defObj = {
                    url: A.config.host,
                    method: "POST",
                    header: {},
                    success: res => {
                        if (res.statusCode == 200) {
                            if (res.data.code == 600 || res.data.code == 582) {
                                A.showTipModal('登录过期OR授权过期！', () => {
                                    wx.reLaunch({
                                        url: "/pages/index/index"
                                    })
                                })
                                return
                            }
                            if (res.data.code != 200) {
                                wx.showToast({
                                    title: res.data.msg,
                                    icon: 'none',
                                    duration: 1500
                                })
                            }
                            _defObj._success(res.data);

                        } else {
                            wx.showToast({
                                title: '服务器错误码：' + res.statusCode,
                                icon: 'none',
                                duration: 1500
                            })
                        }
                    },
                    fail: err => {
                        A.showTipModal('请求超时！当前网络不稳定，请稍后再试...', () => {
                            wx.reLaunch({
                                url: "/pages/index/index"
                            })
                        })
                        wx.hideLoading();
                        _defObj._fail(err);
                    }
                }
                // 配置覆盖
            if (typeof A.config.req != 'undefined') {
                // 将默认配置传参扩展至传入对象
                if (typeof A.config.req.data != 'undefined') {
                    for (let i in _obj.data) {
                        _obj.data[i] = _obj.data[i] || ''
                    }
                    _obj.data = Object.assign({}, A.config.req.data, _obj.data);
                }
                let header = josn == 1 ? { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' } : {};
                A.config.req.header = header;
                // 请求覆盖
                Object.assign(_defObj, A.config.req);
            }
            // 合并传入的参数对象
            Object.assign(_defObj, _obj);
            // 提交数据
            wx.request(_defObj);
        }
    }
    //发起网络请求，返回promise 对象
const RS = (_url, josn) => {
        return new Promise(function(resolve, reject) {
            let _object = {
                url: _url,
                method: "POST",
                data: {},
                success: res => {
                    if (res.status == 1) {
                        resolve(res);
                    } else {
                        resolve(res);
                        //  reject(res);
                    }
                },
                fail: r => {
                    reject(r);
                }
            };
            if (typeof(_url) == "object") {
                if (_url['data']) _url['data'] = Object.assign(_object.data, _url['data']);
                Object.assign(_object, _url);
            }
            R(_object, josn);
        });
    }
    //发起网络请求，返回promise 对象
const RSG = (_url, josn) => {
        return new Promise(function(resolve, reject) {
            let _object = {
                url: _url,
                method: "GET",
                data: {},
                success: res => {
                    if (res.status == 1) {
                        resolve(res);
                    } else {
                        resolve(res);
                        //  reject(res);
                    }
                },
                fail: r => {
                    reject(r);
                }
            };
            if (typeof(_url) == "object") {
                if (_url['data']) _url['data'] = Object.assign(_object.data, _url['data']);
                Object.assign(_object, _url);
            }
            R(_object, josn);
        });
    }
    //发起支付请求
const P = _obj => {
    wx.requestPayment(_obj);
}

// 获取当前页面前的页面,_index值是大小表示距离页面位置层级，如 1 表示邻近上一级，2表示上一级的上一级，以此类推
const getParentPage = _index => {
        _index = (_index || _index == 0) ? _index : 1;
        let pages = getCurrentPages();
        if (pages.length > 1) {
            return pages[pages.length - _index - 1];
        } else {
            return pages[0];
        }
    }
    //拷贝对象
function clone(origin) {
    return Object.assign({}, origin);
}
// 上传文件
// _obj:{name:"服务端key",filePath:"文件路径"}
const upFile = _obj => {
        return new Promise(function(resolve, reject) {
            var _o = {
                url: A.config.host + A.config.uApi.upImage, //仅为示例，非真实的接口地址
                filePath: "",
                //  header: {
                //     "token": user.token
                //  },
                name: 'tmp_name',
                success: (res) => {
                    // var data = JSON.parse(res.data);
                    resolve(res);
                },
                fail: (err) => {
                    reject(err);
                }
            };
            // 合并传入的参数对象
            Object.assign(_o, _obj);
            wx.uploadFile(_o);
        });
    }
    // 选择图片
const chooseImage = function() {
        return new Promise(function(resolve, reject) {
            wx.chooseImage({
                count: 1, // 数量
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: (res) => {
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                    resolve(res.tempFilePaths);
                },
                fail: (err) => {
                    reject(err);
                }
            })
        });
    }
    //发送手机验证码
const sendSMS = _mobile => {
        return new Promise(function(resolve, reject) {
            R({
                url: A.config.uApi.sms,
                data: { mobile: _mobile },
                success: r => {
                    resolve(r.data);
                },
                fail: r => {
                    reject(r.data);
                }
            })
        });
    }
    //微信小程序登录,获取code
const wxLogin = _obj => {
        return new Promise(function(resolve, reject) {
            wx.login({
                success: res => {
                    if (res.code) {
                        resolve(res.code);
                        // ...........从服务端验证获取token
                    } else {
                        reject(res);
                    }
                },
                fail: res => {
                    reject(res);
                }
            })
        });
    }
    //格式化时间
const dateFormat = (_val, _fmt) => {
    var _fmt = _fmt || "YYYY-MM-DD";
    var fDate = new Date();
    if (typeof _val == "number" || typeof _val == "string") {
        //秒补充为微秒
        _val = (parseInt(_val) < 10000000000) ? parseInt(_val) * 1000 : parseInt(_val);
        fDate = new Date(_val);
    } else if (_val instanceof Date) {
        fDate = _val;
    }
    var o = {
        "M+": fDate.getMonth() + 1, //月份 
        "D+": fDate.getDate(), //日 
        "h+": fDate.getHours(), //小时 
        "m+": fDate.getMinutes(), //分 
        "s+": fDate.getSeconds(), //秒 
        "q+": Math.floor((fDate.getMonth() + 3) / 3), //季度 
        "S": fDate.getMilliseconds() //毫秒 
    };
    if (/(Y+)/.test(_fmt)) {
        _fmt = _fmt.replace(RegExp.$1, (fDate.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(_fmt)) {
            _fmt = _fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return _fmt;
}

// base64数据处理
const formatData = {
    // 字符串转为ArrayBuffer数据对象
    STB(_str) {
        var out = new ArrayBuffer(_str.length);
        var u16a = new Uint8Array(out);
        var strs = _str.split("");
        for (let i = 0; i < strs.length; i++) {
            u16a[i] = strs[i].charCodeAt();
        }
        return u16a;
    },
    // ArrayBuffer数据对象转字符串
    BTS(_buf) {
        var out = "";
        var u8 = new Uint8Array(_buf);
        for (let i = 0; i < u8.length; i++) {
            out += String.fromCharCode(u8[i]);
        }
        return out;
    },
    // 字符串转base64
    stringToBase64(_str) {
        return wx.arrayBufferToBase64(formatData.STB(_str));
    },
    // base64转字符串
    base64ToString(_str) {
        return formatData.BTS(wx.base64ToArrayBuffer(_str));
    }
}
const promiseReject = function(_obj) {
        return new Promise((resolve, reject) => {
            reject(_obj)
        })
    }
    // 设置当前模块全局A对象
const setSimpleApp = function(_app) {
        A = _app;
    }
    // 获取当前页面组件
const selectComponent = function(id) {
    return getParentPage(0).selectComponent(id);
}

module.exports = {
    B,
    C,
    G,
    S,
    R,
    RS,
    P,
    setSimpleApp,
    sendSMS,
    wxLogin,
    upFile,
    chooseImage,
    formatData,
    dateFormat,
    getParentPage,
    promiseReject,
    selectComponent,
    ...modal,
    RSG,
}