import store from '../../udb/store/index.js';
var sid = null;
Component({
    properties: {
        toastTitle: {
            type: String,
            value: '',
            observer: 'toast'
        },
        mask:{
          type:Boolean,
          value:false
        }
    },
    data: {
        show: true,
        toastShow: false,
        toastTxt: "",
        statusBarHeight:store.SystemInfo.statusBarHeight,
    },
    attached(){
        //console.log(this.data.statusBarHeight)
    },
    methods: {
        showToast: function(newVal, oldVal) {
            if (newVal != oldVal) {
                if (sid) clearTimeout(sid);
                this.setData({ toastShow: true, toastTxt: newVal, show: false })
                sid = setTimeout(() => {
                    this.setData({ toastShow: false, toastTxt: "" })
                    clearTimeout(sid);
                }, 3000)
            }
        },
        hideToast: function() {
            this.setData({ toastShow: false });
        },
        showModal(opts) {
            this.selectComponent('#modal').showModal(opts);
        },
        hideModal() {
            this.selectComponent('#modal').hideModal();
        },
        showBaseModal(opt1, opt2, opt3, opt4) {
            this.selectComponent('#modal').showBaseModal(opt1, opt2, opt3, opt4);
        },
        showTipModal(opt1, opt2) {
            this.selectComponent('#modal').showTipModal(opt1, opt2);
        },
        showDiyModal(opt1, opt2) {
            this.selectComponent('#modal').showDiyModal(opt1, opt2);
        },
        hideMask(e){
            // this.setData({mask:false})
            this.triggerEvent('hideMask', e.currentTarget.dataset)
        }
    }
})