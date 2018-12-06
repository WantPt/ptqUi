// component/store/store.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        storeArr:{
            type:Array,
            value:[]
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        storeSty:null
    },

    /**
     * 组件的方法列表
     */
    methods: {
        clickSlect(e){
            let storeSty = this.data.storeSty;
            let index =e.currentTarget.dataset.index;
            storeSty = storeSty==index?null:index;
            this.setData({storeSty})
        },
        // 点击保存
        changeOver(){
            let storeSty = this.data.storeSty;
            let storeArr = this.data.storeArr;
            let obj = {}
            if(storeSty || storeSty==0){
                obj.arr = storeArr[storeSty];
                obj.flag = true;
            }else{
                obj.arr = {};
                obj.flag = false;
            }
            this.triggerEvent('over', obj)
        }
    }
})