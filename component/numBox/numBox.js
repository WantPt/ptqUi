const A = require('../../vwx/uset.js');
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        minNum: {
            type: [Number, String],
            value: 1,
        },
        maxNum: {
            type: [Number, String],
            value: 99,
        },
        num: {
            type: [Number, String],
            value: 1,
        },
        numStep: {
            type: [Number, String],
            value: 1,
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        imgUrl: A.config.imgUrl
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 点击计算
        countNumBtn(e) {
            let index = A.utils.dataType(e, 'index');
            let num = this.data.num;
            if (index == 1) {
                num = Number(num) > Number(this.data.minNum) ? Number(num) - Number(this.data.numStep) : Number(this.data.minNum)
            } else {
                num = Number(num) < Number(this.data.maxNum) ? Number(num) + Number(this.data.numStep) : Number(this.data.maxNum)
            }
            this.setData({ num })
            this.triggerEvent('count', num)
        },
        // 失焦的事件处理
        inputBlurBtn(e) {
            let val = e.detail.value;
            let index = A.utils.dataType(e, 'index');
            let num = val && val > Number(this.data.minNum) && val <= Number(this.data.maxNum) ? val : val > Number(this.data.maxNum) ? Number(this.data.maxNum) : Number(this.data.minNum);
            this.setData({ num })
            this.triggerEvent('count', num)
        },
    }
})