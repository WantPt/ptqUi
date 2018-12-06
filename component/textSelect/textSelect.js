import store from '../../udb/store/index.js';
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        textSelectArr: {
            type: Array,
            value: []
        },
        tit: {
            type: String,
            value: '暂无标题'
        },
        placeholder: {
            type: String,
            value: ''
        },
        multiple: {
            type: Boolean,
            value: true
        },
        show: {
            type: Boolean,
            value: false
        },
        nowData:{
            type: String,
            value: ''
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        selectPos: 0,
        selectChangeArr: [],
        inputTxt: '',
        inputFlagShow: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 点击确认选择完成
        ok(e) {
            this.maskClick();
            let aa = {};
            let multiple = this.data.multiple;
            aa.inputTxt = this.data.inputTxt;
            let textSelectArr = this.data.textSelectArr;
            let selectChangeArr = this.data.selectChangeArr;
            if (multiple) {
                aa.arr = [];
                if (this.data.placeholder && selectChangeArr[selectChangeArr.length - 1].name=="其它") {
                    selectChangeArr[selectChangeArr.length - 1].name = this.data.inputTxt;
                    selectChangeArr[selectChangeArr.length - 1].code += this.data.inputTxt  
                }
                console.log(selectChangeArr)
                for (let item of selectChangeArr) {
                    item && aa.arr.push(item)
                }
            } else {
                if (textSelectArr[textSelectArr.length - 1] && this.data.placeholder) {
                    textSelectArr[textSelectArr.length - 1].name = this.data.inputTxt;
                    textSelectArr[textSelectArr.length - 1].code += this.data.inputTxt  
                }
                aa.arr = [textSelectArr[this.data.selectPos]]
            }

            this.setData({
                selectPos: 0,
                selectChangeArr: [],
                inputTxt: '',
                inputFlagShow: false
            })
            this.triggerEvent('ok', aa)
        },
        // 点击更改样式(单选)
        changeSty(e) {
            let inputFlagShow = false;
            let selectPos = e.currentTarget.dataset.index;
            console.log(this.data.placeholder, selectPos,this.data.textSelectArr.length - 1)
            if(this.data.placeholder && selectPos == this.data.textSelectArr.length - 1){
                inputFlagShow = true
            }
            
            this.setData({ selectPos,inputFlagShow })
        },
        // 点击更改样式(多选)
        multipleChangeSty(e) {
            let index = e.currentTarget.dataset.index;
            let selectChangeArr = this.data.selectChangeArr;
            let inputFlagShow = false;
            selectChangeArr[index] = selectChangeArr[index] ? '' : this.data.textSelectArr[index];
            if(this.data.placeholder && selectChangeArr[this.data.textSelectArr.length - 1]){
                inputFlagShow = true
            }
            
            this.setData({ selectChangeArr,inputFlagShow })
        },
        // 输入值
        inputBtn(e) {
            this.setData({ inputTxt: e.detail.value })
        },
        maskClick() {
            this.setData({ show: false })
        },
    }
})