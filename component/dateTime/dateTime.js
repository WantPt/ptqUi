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
        fmtArr: {}
    },
    attached() {
        var crtTime = new Date();
        let startYear = this.data.startYear || crtTime.getFullYear();
        let endYear = this.data.endYear || crtTime.getFullYear()+50;
        var obj = dateTimePicker.dateTimePicker(startYear, endYear);
        // 精确到分的处理，将数组的秒去掉
        var lastArray = [];
        var lastTime = [];
        let fmt = this.data.fmt;
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
                fmtArrNew[item.reg] = item.val;
                lastArray.push(obj.dateTimeArray[i+1]);
                lastTime.push(obj.dateTime[i+1]);
            }
        });
        this.setData({
            dateTimeArray: lastArray,
            dateTime: lastTime,
            fmtArr:fmtArrNew,
            endYear,startYear
        });
    },
    methods: {
        changeDateTime(e) {
            var arr = e.detail.value,
                dateArr = this.data.dateTimeArray;
            let fmt = this.data.fmt;
            var fmtArr = this.data.fmtArr;
            let count = 0;
            for(let i in fmtArr){
                count++;
                fmtArr[i] = dateArr[count][arr[count]]
            }
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (dateArr[0][arr[0]] + "").substr(4 - RegExp.$1.length));
            for (var k in fmtArr)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (fmtArr[k]) : (("00" + fmtArr[k]).substr(("" + fmtArr[k]).length)));
            this.triggerEvent('confirm', fmt);
        },
        // 子类更改
        changeDateTimeColumn(e) {
            var arr = this.data.dateTime,
                dateArr = this.data.dateTimeArray;
            arr[e.detail.column] = e.detail.value;
            dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
            this.triggerEvent('change', e.detail);
            this.setData({
                dateTimeArray:dateArr,
                dateTime1:arr,
            })
        }
    }
})