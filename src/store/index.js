import Vue from 'vue'
import Vuex from 'Vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    state:{
    
        currentPage:1,//首页页码
        ph_page:0,
        coin_list:[],
        // 中英文翻译：1.中文
        //            2.英文
        //            3.繁体
        //             4.日语
        //              5.韩语
        //            6.菲律宾语
        lanfalg:1,
        //汇率
        usd_cny: [7, 1],
        money_sym: ['￥', '$'],
        //控制loading显示
        //true显示loading
        //false显示内容
        loadshow:true,
        //控制头部下划线显示
        topshow:1,
        //请求url
        requrl:'http://service.tokenrank.net',
        ph_icon_box:[
            {name:['官网','Website'],value:'',imgsrc:["../../static/home1.png", "../../static/home2.png"],},
            {name:['GitHub','GitHub'],value:'',imgsrc: ["../../static/git1.png", "../../static/git2.png"],},
            {name:['浏览器', 'Explorer'],value:'',imgsrc: ["../../static/block1.png", "../../static/block2.png"]},
            {name:['白皮书','Whitepaper'],value:'',imgsrc:["../../static/white1.png", "../../static/white2.png"],}
        ],
        user_active_list:[],//活跃的唯一用户 活跃地址
        user_new_list:[],//当天的新用户总数  新增地址
        transaction_list:[],//交易次数
        data_time_list:[],//

        
    },
    mutations:{
        changelang(state,payload){//这里的state对应着上面这个state
            state.lanfalg = payload
        },
        changeload(state){//这里的state对应着上面这个state
            state.loadshow = state.loadshow?false:true;
            //你还可以在这里执行其他的操作改变state
        }
    }
})

