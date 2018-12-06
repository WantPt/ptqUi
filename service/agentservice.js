import A from '../vwx/uset.js';

module.exports = {
    // 初始进入的请求接口
    loadingJoin() {
        return this.getTData('Enter/identity', 1);
    },
    // 渠道商身份切换
    identChange(upidentity) {
        return this.getTData({ url: 'IdentityCut/identity_verify', data: {upidentity} }, 1);
    },
    // 代理商首页详情接口
    agentIndexInFo(){
    	return this.getTData('Agent/index', 1);
    },
    // 代理商开发二维码详情接口
    agentInFoEwm(){
    	return this.getTData('Agent/qr_code', 1);
    },
    // 我开发的商家基础数据
    agentDevelpStore(){
    	return this.getTData('Distributor/getStoresCount', 1);
    },
    // 我开发的商家列表
    agentDevelpStoreList(telname, status, paging){
    	return this.getTData({ url: 'Distributor/getStores', data: {telname, status, paging} }, 1);
    },
    // 收益详情明细内容的接口
    moneyInfoBillInFn(detail_id){
        return this.getTData({ url: '/Miniapps/Team/earningsDetail', data: {detail_id} });
    },
    // 收益详情明细的接口
    moneyInfoBillFn(paging,store_id){
        return this.getTData({ url: 'ServiceArea/earnings', data: {paging,store_id} },1);
    },
    // 区域收益商家详情明细的接口
    areaInfoBillFn(store_id){
        return this.getTData({ url: 'ServiceArea/area_store_info', data: {store_id} },1);
    },
    // 代理商收益商家详情明细的接口
    agentInfoBillFn(store_id){
        return this.getTData({ url: 'Agent/myAstoreInfo', data: {store_id} },1);
    },
    // 代理商收益详情列表接口
    agentInfoBillListFn(paging,keywords){
        return this.getTData({ url: 'Agent/myAstore', data: {paging,keywords} },1);
    },
    // 我开发的分销商
    agentDevelpFx(paging){
        return this.getTData({ url: 'Agent/distributor', data: {paging} },1);
    },
    // 获取短信的接口
    obtaibnMessFn(telephone,upidentity){
        return this.getTData({ url: 'IdentityCut/send_code', data: {telephone,upidentity} },1);
    },
    // 提交短信信息
    updataMessFn(telephone,upidentity,code){
        return this.getTData({ url: 'IdentityCut/binding_do', data: {telephone,upidentity,code} },1);
    },
    // 当前身份的获取接口
    gainUpidentityFn(){
        return this.getTData('IdentityCut/binding_do',1);
    },
    // 钱包明细的接口
    balanceDetailFn(url,type,paging){
        return this.getTData({ url: url, data: {type,paging} },1);
    },
    // 钱包详情的接口
    balanceIndexFn(url){
        return this.getTData(url,1);
    },
    // 安全密码设置
    paymenSecAddFn(card_id,real_name,password){
        return this.getTData({ url: 'StoreWallet/password', data: {card_id,real_name,password} },1);
    },
    // 安全密码重置
    paymenSecRebuildFn(card_id,real_name){
        return this.getTData({ url: 'StoreWallet/verify_identity', data: {card_id,real_name} },1);
    },
    // 钱包余额明细详情的接口
    balanceRedetailFn(url,moneywaterid){
        return this.getTData({ url: url, data: {moneywaterid} },1);
    },
    // 初始钱包的提现接口
    balanceWithDrawaFn(identity){
        let alipay_id = 0;
        return this.getTData({ url: 'Wallet/deposit', data: {identity,alipay_id} },1);
    },
    // 钱包的提现接口
    UpbalanceWithDrawaFn(money,identity,pay_way,password){
        let alipay_id = 0;
        return this.getTData({ url: 'Wallet/withdraw_do', data: {money,identity,pay_way,password,alipay_id} },1);
    },
    // 区域代理商的详情页面
    areaIndexInfo(){
        return this.getTData('Service/index',1);
    },
    // 六位密码重设接口
    sixPassWordRebuild(password){
        return this.getTData({ url: 'StoreWallet/re_set_password', data: {password} },1);
    },
    // 获取登录信息的接口
    obtaibnLoginMess(code,encryptedData,iv,store_id){
        return this.getTData({ url: 'Enter/ditch_login', data: {code,encryptedData,iv,store_id} },1);
    },
    // 区域服务商区域收益
    areaFwstoreList(paging){
        return this.getTData({ url: 'ServiceArea/loadteamAstore', data: {paging} },1);
    },
    // 区域服务商区域总收益
    areaFwstoreAllInfo(paging){
        return this.getTData({ url: 'ServiceArea/myteamAstoreLis', data: {paging} },1);
    },
    // 地址详情列表
    areaAdressInfoList(paging){
        return this.getTData({ url: 'ServiceArea/area_store', data: {paging} },1);
    },
    // 我开发的商家店铺详情信息获取
    AgentJuniorInfo(paging,distributor_id,keywords){
        return this.getTData({ url: 'Agent/junior', data: {paging,distributor_id,keywords} },1);
    },
    // 退出身份
    quitUpidentity(upidentity){
        return this.getTData({ url: 'IdentityCut/quit_identity', data: {upidentity} },1);
    }
}