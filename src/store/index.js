import Vue from 'vue'
import Vuex from 'Vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        // 中英文翻译：1.中文
        //            2.英文
        //            3.繁体
        //             4.日语
        //              5.韩语
        //            6.菲律宾语
        lanfalg:1,
        //货币结算：1.美元
        //         2.人民币
        //         
        currency:2,
        //控制loading显示
        //true显示loading
        //false显示内容
        loadshow:true,
        //控制头部下划线显示
        topshow:1,
        //请求url
        requrl:'http://service.tokenrank.net',
        //汇率
        usd_cny:7
    },
    mutations:{
        changelang(state,payload){//这里的state对应着上面这个state
            state.lanfalg = payload
        },
        changecur(state,payload){
            state.currency = payload
        },
        changeload(state){//这里的state对应着上面这个state
            state.loadshow = state.loadshow?false:true;
            //你还可以在这里执行其他的操作改变state
        }
    }
})