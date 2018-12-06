Component({
    /**
     * 组件的属性列表
     */
    properties: {
        preArr: {
            type: Array,
            value: [],
        },
        areaArr: {
            type: Array,
            value: [],
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        cityInfo: [],
        cityArr:[],
        areaArr:[],

    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 省份选择
        preChange(e) {
            let preArr = this.data.preArr;
            let index = e.currentTarget.dataset.index;
            let item = e.currentTarget.dataset.item;
            preArr = this.areaFn(preArr,index,0)
            this.setData({ preArr, cityArr: item, areaArr: []})
        },
        // 城市选择
        cityChange(e) {
            let cityArr = this.data.cityArr;
            let index = e.currentTarget.dataset.index;
            let item = e.currentTarget.dataset.item;
            cityArr = this.areaFn(cityArr,index,1)
            this.setData({ cityArr,areaArr:item})
            this.triggerEvent('city', e.currentTarget.dataset)
        },
        // 区域选择
        areaChange(e) {
            let areaArr = this.data.areaArr;
            let index = e.currentTarget.dataset.index;
            let item = e.currentTarget.dataset.item;
            areaArr = this.areaFn(areaArr,index,2)
            this.setData({areaArr })
        },
        // 点击保存
        changeOver(e){
            let cityInfo = this.data.cityInfo;
            console.log(cityInfo)
            this.triggerEvent('over', cityInfo)
        },
        // 区域选择的封装
        areaFn(arr,index,i){
            let cityInfo = this.data.cityInfo;
            if(i==0)cityInfo = [];
            if(i==1)cityInfo.splice(1, 1);
            cityInfo[i] = arr[index];
            for (let item of arr) {
                item.click = false
            }
            arr[index].click = true;
            this.setData({cityInfo})
            return arr
        }
    }
})