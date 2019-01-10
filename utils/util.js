import A from '../vwx/common/simple.js';
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return [year, month, day].map(formatNumber).join('-')
}
const minTime = date => {
    const hour = date.getHours()
    const minute = date.getMinutes()
    return [hour, minute]
}

const formatTime18 = date => {
    const year = Number(date.getFullYear()) - 18
    const month = date.getMonth() + 1
    const day = date.getDate()
    return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

// 直接输出倒计时封装
const dayTime = bb => {
    var bb = bb
    var day = parseInt(bb / 86400);
    var time = parseInt((bb - (day * 86400)) / 3600);
    var min = parseInt((bb - (time * 3600 + day * 86400)) / 60)
    var sinTime = time * 3600 + min * 60 + day * 86400
    var sinTimeb;
    var sin1 = parseInt((bb - sinTime))
    var thisTime = addEge(day) + "天" + addEge(time) + ":" + addEge(min) + ":" + addEge(sin1);
    bb <= 0 ? thisTime = "0天00:00:00" : thisTime
    return thisTime
}
const addEge = a => {
    return a < 10 ? a = "0" + a : a = a
}
// 输出数组倒计时封装
const dayTimeArr = bb => {
    var bb = bb
    var day = parseInt(bb / 86400);
    var time = parseInt((bb - (day * 86400)) / 3600);
    var min = parseInt((bb - (time * 3600 + day * 86400)) / 60)
    var sinTime = time * 3600 + min * 60 + day * 86400
    var sinTimeb;
    var sin1 = parseInt((bb - sinTime))
    var timeArr = [addEge(day), addEge(time), addEge(min), addEge(sin1)];
    if (bb <= 0) {
        timeArr = ["00", "00", "00", "00"];
    }
    return timeArr
}
// 检测当前机型的长宽
const nowPhoneWH = () => {
    var a = []
    var res = wx.getSystemInfoSync()
    a[0] = res.windowWidth;
    a[1] = res.windowHeight;
    return a
}
// 获取data-index 属性
function dataIndex(e) {
    var a = e.currentTarget.dataset.index;
    var b = e.currentTarget.dataset.id;
    var d = e.currentTarget.dataset.type;
    var e = e.currentTarget.dataset.name;
    var c = [a, b, d, e];
    return c
}
// 获取所有属性值 属性
function dataType(e,type) {
    return e.currentTarget.dataset[type];
}
// 图片去空格输出
function imgSup(arr) {
    var cc = []
    for (let k in arr) {
        let aa = arr[k].replace(/[\r\n]/g, "");
        let bb = aa.replace("https://pintuanqu.oss-cn-hangzhou.aliyuncs.com", "");
        cc.push(bb);
    }
    return cc
}
// 版本比较

function compareVersion(v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    var len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
        v1.push('0')
    }
    while (v2.length < len) {
        v2.push('0')
    }

    for (var i = 0; i < len; i++) {
        var num1 = parseInt(v1[i])
        var num2 = parseInt(v2[i])

        if (num1 > num2) {
            return 1
        } else if (num1 < num2) {
            return -1
        }
    }

    return 0
}

function ToMiniProgram(appId, path, data) {
    wx.navigateToMiniProgram({
        appId: appId,
        path: path,
        extraData: data,
        success: function(res) {
            console.log(res)
        }
    })
}
// 获取input框里面所有的数据
function inputArr(arr, e) {
    var index = dataIndex(e)[0];
    var a = arr;
    var b = e.detail.value;
    a[index] = b;
    return a
}
// 身份证验证
function IdentityCodeValid(code) {
    var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
    var tip = "";
    var pass = true;

    if (!code || !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(code)) {
        console.log(1)
        tip = "身份证号格式错误";
        pass = false;
    } else if (!city[code.substr(0, 2)]) {
        console.log(2)
        tip = "地址编码错误";
        pass = false;
    } else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if (parity[sum % 11] != code[17]) {
                tip = "校验位错误";
                pass = false;
            }
        }
    }

    return [pass, tip];
}
// 数字隐私处理
const passStrat = num => {
    var newTel = []
    for (let i = 0; i < num.length; i++) {
        let aa = num.substring(i, i + 1);
        if (i >= 3 && i <= 7) {
            aa = '*'
        }
        newTel.push(aa);
    }
    var newTelS = newTel.join("");
    return newTelS
}

function canClick(num, arr) {
    let aa = 0;
    for (let i = 0; i < num; i++) {
        if (arr[i]) {
            aa++
        }
    }
    return aa == num ? true : false
}
// 图片上传的封装
function upImgAll(imgArr, success, num, that) {
    var num = num || 9;
    if (imgArr.length >= num) {
        that.setData({ textareaFlag: true })
        A.showTipModal('最多上传' + num + '张图片，请删除图片后继续上传', () => {
            that.setData({ textareaFlag: false })
            A.hideModal();
        });
        return;
    }

    wx.chooseImage({
        count: num - Number(imgArr.length), // 默认9
        sizeType: ['original', 'compressed'],
        sourceType: ['album'],
        success: res => {
            var res = res;
            let resArr = [];
            for (let i in res.tempFiles) {
                if (res.tempFiles[i].size > (1 * 1024 * 1024)) {
                    if (that) {
                        that.setData({ textareaFlag: true })
                        A.showTipModal('抱歉有图片已超过2MB,您可以选择压缩图片以后重新上传', () => {
                            that.setData({ textareaFlag: false })
                            A.hideModal();
                        });
                    } else {
                        A.showTipModal('抱歉有图片已超过2MB,您可以选择压缩图片以后重新上传')
                    }

                    continue;
                } else {
                    resArr.push(res.tempFiles[i])
                }
            }
            res.tempFiles = resArr;
            success(res)
        },
    });
}
// 图片上传的封装
// 图片上传的封装
function upImgAllSuccss(imgArr, formData, j) {
    if (imgArr.size > (1 * 1024 * 1024)) {
        A.showTipModal('有图片已超过5MB,您可以选择压缩图片以后重新上传')
        return;
    }
    let reg = imgArr.path.substring(0, 18)
    if (reg == 'http://nvzixueyuan') {
        let obj = {
            res: imgArr.path,
            index: j
        }
        resolve(obj)
        return
    }
    return new Promise((resolve, reject) => {
        wx.uploadFile({
            url: A.config.host + '/common/upload',
            filePath: imgArr.path,
            name: 'file', //这里根据自己的实际情况改
            herder: { 'content-type': 'multipart/form-data;' },
            formData: formData,
            success: res => {
                if (res.data.indexOf('code:200')) {
                    console.log(res.data)
                    var reg = /(\w*)code(.*)msg(.*)results(.*)/g;
                    let str = JSON.parse(res.data.replace(reg, "$1code$2msg$3results$4"));
                    let obj = {
                        res: str.results, //正则匹配缺少g  字符串
                        index: j
                    }
                    resolve(obj)
                } else {
                    wx.showToast({
                        title: '图片上传失败',
                        icon: 'none',
                        duration: 1500
                    })
                }


            },
            fail: err => {
                console.log(err)
            }
        });
    })
}
// 正则匹配方法的封装
function rexFn(str) {

    var rexArr = [
        // 固定号码的正则
        /^0\d{2,3}-?\d{7,8}$/,
        // 身份证正则匹配
        /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
        // 汉字匹配
        /^[\u4e00-\u9fa5]+$/,
        // 中英文匹配
        /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,
        // 手机号码的正则表达式
        /^$|[1][356789][0-9]{9}$/,
        // 验证邮箱
        /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
        // 时分格式
        /^([01]\d|2[01234]):([0-5]\d|60)-([01]\d|2[01234]):([0-5]\d|60)$/,
    ]
    var falgArr = []
    for (let i in rexArr) {
        if (rexArr[i].test(str)) falgArr[i] = 1;
    }
    console.log(falgArr)
    return falgArr;
}
// 支付的封装
function payFn(data, fn, fn2) {
    var payT = data;
    wx.requestPayment({
        'timeStamp': payT.timeStamp,
        'nonceStr': payT.nonceStr,
        'package': payT.package,
        'signType': 'MD5',
        'paySign': payT.paySign,
        'success' (res) {
            fn(res)
        },
        'fail' (res) {
            fn2(res)
        }
    })
}
module.exports = {
    formatTime,
    dayTime,
    dayTimeArr,
    nowPhoneWH,
    formatTime18,
    minTime,
    dataIndex,
    imgSup,
    compareVersion,
    ToMiniProgram,
    inputArr,
    IdentityCodeValid,
    passStrat,
    canClick,
    upImgAll,
    upImgAllSuccss,
    rexFn,
    dataType,
    payFn
}