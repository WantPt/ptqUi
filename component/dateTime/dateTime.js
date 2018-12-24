var dateTimePicker = require('./dateTimePicker.js');
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        startYear: {
            type: [String, Number],
            value: ''
        },
        endYear: {
            type: [String, Number],
            value: ''
        },
        fmt: {
            type: String,
            value: 'yyyy-MM-dd hh:mm:ss'
        }
    },

    data: {
        dateTimeArray1: null,
        dateTime1: null,
        fmtArr: {},
        monIndex: 2,
    },
    attached() {
        var crtTime = new Date();
        let startYear = this.data.startYear || crtTime.getFullYear();
        let endYear = this.data.endYear || crtTime.getFullYear() + 50;
        var obj = dateTimePicker.dateTimePicker(startYear, endYear);
        // 精确到分的处理，将数组的秒去掉
        var lastArray = [];
        var lastTime = [];
        let fmt = this.data.fmt;
        let monIndex = this.data.monIndex;
        var fmtArr = [
            { reg: "M+", val: obj.dateTimeArray[1][obj.dateTime[1]] }, //月份   
            { reg: "d+", val: obj.dateTimeArray[2][obj.dateTime[2]] }, //日   
            { reg: "h+", val: obj.dateTimeArray[3][obj.dateTime[3]] }, //小时   
            { reg: "m+", val: obj.dateTimeArray[4][obj.dateTime[4]] }, //分
            { reg: "s+", val: obj.dateTimeArray[5][obj.dateTime[5]] }, //秒
        ];
        let fmtArrNew = {};
        if (/(y+)/.test(fmt)) {
            lastArray[0] = obj.dateTimeArray[0];
            lastTime[0] = obj.dateTime[0];
        }
        fmtArr.find((item, i) => {
            if (new RegExp("(" + item.reg + ")").test(fmt)) {
                if (~item.reg.indexOf('d')) {
                    monIndex = i;
                }
                fmtArrNew[item.reg] = item.val;
                lastArray.push(obj.dateTimeArray[i + 1]);
                lastTime.push(obj.dateTime[i + 1]);
            }
        });
        this.setData({
            dateTimeArray: lastArray,
            dateTime: lastTime,
            fmtArr: fmtArrNew,
            endYear,
            startYear,
            monIndex
        });
    },
    methods: {
        changeDateTime(e) {
            var arr = e.detail.value,
                dateTimeArray = this.data.dateTimeArray;
            let fmt = this.data.fmt;
            var fmtArr = this.data.fmtArr;
            let count = /(y+)/.test(fmt)?0:-1;
            console.log(fmtArr)
            for (let i in fmtArr) {
                count++;
                console.log(dateTimeArray[count][arr[count]])
                fmtArr[i] = dateTimeArray[count][arr[count]]
            }
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (dateTimeArray[0][arr[0]] + "").substr(4 - RegExp.$1.length));
            for (var k in fmtArr)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (fmtArr[k]) : (("00" + fmtArr[k]).substr(("" + fmtArr[k]).length)));
            this.triggerEvent('confirm', fmt);
        },
        // 子类更改
        changeDateTimeColumn(e) {
            var dateTime = this.data.dateTime,
                dateTimeArray = this.data.dateTimeArray;
            dateTime[e.detail.column] = e.detail.value;
            var crtTime = new Date();
            let year = crtTime.getFullYear();
            let mon = String(dateTimeArray[0][dateTime[0]]);
            let fmt = this.data.fmt;
            if (/(y+)/.test(fmt)) {
                year = String(dateTimeArray[0][dateTime[0]]);
                mon = String(dateTimeArray[1][dateTime[1]]);
            }
            dateTimeArray[this.data.monIndex] = dateTimePicker.getMonthDay(year, mon);
            console.log(dateTimeArray)
            this.triggerEvent('change', e.detail);
            this.setData({
                dateTimeArray: dateTimeArray,
            })
        }
    }
})