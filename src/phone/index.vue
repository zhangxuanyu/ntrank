<template>
    <div>
        <div class="top-box">
            <ul class="nav-box">
                <li :class="nav_active===index?'nav-active':''" v-for="(item,index) in nav_title_list[lanfalg]" @click="change_nav(index)" v-if="index != 3" :key="index">
                    <p>{{item}}</p>
                    <span></span>
                </li>
            </ul>
            <div class="nav-con-box" v-if="nav_active===0||nav_active===1">
                <ul class="nav-name-box">
                    <li v-for="(item,index) in nav_name_list[lanfalg]" :key="index">{{item}}</li>
                </ul>
                <ul class="nav-con">
                    <li v-for="(item,index) in tokentrade_list" :key="index">
                        <span style="color:#999">{{index+1}}</span>
                        <span  @click="goto_detail(item.code)">{{item.short_name}}</span>
                        <span>{{item.price_usd?(item.price_usd>1?(item.price_usd*usd_cny[lanfalg]).toFixed(2):(item.price_usd*usd_cny[lanfalg]).toFixed(6)):'--'}}</span>
                        <span :style="item.change_quantity >= 0 ?{color:'#2f9e84'}:{color:'#fd2e40'}">{{isNaN(item.change_quantity)?'--':(100*item.change_quantity).toFixed(2)+'%'}}</span>
                    </li>
                </ul>
            </div>
            <div class="nav-con-box" v-if="nav_active===2">
                <ul class="nav-name-box">
                    <li v-for="(item,index) in nav_name_list_volume[lanfalg]" :key="index">{{item}}</li>
                </ul>
                <ul class="nav-con">
                    <li v-for="(item,index) in tokentrade_list" :key="index">
                        <span style="color:#999">{{index+1}}</span>
                        <span @click="goto_detail(item.code)">{{item.short_name+"-"+item['name_list'][lanfalg]}}</span>
                        <span style="width:2.68rem"  v-if="!isNaN(item.volume_usd)">{{addgap((item.volume_usd*usd_cny[lanfalg]).toFixed(0))}}</span>
                    </li>
                </ul>
            </div>

        </div>
        <div class="coin-con-box clearfix">
            <div class="title" :style="top_style">{{top_name[lanfalg]}}</div>
            <div class="left">
                <ul class="coin-nav-name ccc clearfix coin-nav-name-left" :style="top_style_nav_left">
                     <li v-for="(item,index) in titlearr[lanfalg]" :key="index" v-if="index<2">{{item.name}}</li>
                </ul>
                <ul class="coin-name clearfix"  v-for="(item,index) in coin_list" :key="index">
                    <li style="color:#999">{{index+1}}</li>
                    <li class="coinname" @click="goto_detail(item.code)">
                        <img :src="item.icon" alt="">
                        <div>
                            <p>{{item.short_name}}</p>
                            <p>{{item['name_list'][lanfalg]}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="right">
                <div class="scroll-box cccc" :style="top_style_nav_right">
                    <ul class="coin-nav-name clearfix">
                        <li  v-for="(item,index) in titlearr[lanfalg]" :key="index" v-if="index>1" @click="change_type(index)">
                            <img :src="imgarr[item.img_type]" alt="" v-if="index>1&&index!=9">
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                </div>
                <ul class="coin-name coin-scroll clearfix" v-for="(item,index) in coin_list" :key="index" @touchmove='touchmove'>
                    <li>{{item.price_usd?(item.price_usd>1?addgap(((item.price_usd*usd_cny[lanfalg]).toFixed(2))):addgap((item.price_usd*usd_cny[lanfalg]).toFixed(6))):'0.00'}}</li>
                    <li>{{item.market_cap?addgap((item.market_cap*usd_cny[lanfalg]/1000000000).toFixed(2))+'B':'0.00'}}</li>
                    <li>{{item.market_cap?addgap((item.volume_usd*usd_cny[lanfalg]/1000000).toFixed(2))+'M':'0.00'}}</li>
                    <li :style="item.change_quantity==='--'?{color:'#000'}:item.change_quantity*1>=0?{color:'#2f9e84'}:{color:'#fd2e40'}">{{item.change_quantity==='--'?item.change_quantity:item.change_quantity+'%'}}</li>
                    <li>{{item.github_score?item.github_score:'--'}}</li>
                    <li>{{item.society_score?item.society_score:'--'}}</li>
                    <li>{{item.total_score?item.total_score:'--'}}</li>
                    <li>
                         <svg width="100%" height="30" version="1.1" style="vertical-align:middle"
                            xmlns="http://www.w3.org/2000/svg">
                            <polyline :points='item.seven_price'
                            style="fill:#f4eefe;stroke:#775f9f;stroke-width:1"/>

                        </svg>
                    </li>
                </ul>
            </div>
            <div class="more" @click="more" v-if="show_more">
                <span>查看更多</span>
                <img src="../../static/more.png" alt="">
            </div>
            <div class="more" v-else>
                <span>没有更多了....</span>
            </div>
        </div>
    </div>
</template>
<script>
import newfn from '../../static/base/base.js'
import { mapState } from "Vuex";
export default {
    data() {
        return {
            top_name:['列表','List'],
            titlearr:[
                [{img_type:0,name:'#'},{img_type:0,name:'名称'},{img_type:0,name:'价格/￥'},{img_type:0,name:'市值/￥'},{img_type:0,name:'交易量(24H)/￥'},{img_type:0,name:'涨幅(24H)'},{img_type:0,name:'开发者'},{img_type:0,name:'社交媒体'},{img_type:0,name:'总分'},{img_type:-1,name:'价格图(7D)'}],
                [{img_type:0,name:'#'},{img_type:0,name:'Name'},{img_type:0,name:'Price/$'},{img_type:0,name:'Market/$'},{img_type:0,name:'Volume(24H)/$'},{img_type:0,name:'Change(24H)'},{img_type:0,name:'Developer'},{img_type:0,name:'Social Media'},{img_type:0,name:'Total'},{img_type:-1,name:'Price Graph (7D)'}]         
            ],
            nav_title_list: [
                ["涨幅榜(24H)", "跌幅榜(24H)", "交易量(24H)", "活跃地址数"],
                ["Increase(24H)", "Decline(24H)", "Volume(24H)", "Active Address"]
            ],
            nav_name_list: [
                ["排名", "名称", "价格/￥", "涨幅"],
                ["#", "Name", "Price/$	", "Increase"]
            ],
            nav_name_list_volume: [
                ["排名", "名称", "交易量/￥"],
                ["#", "Name", "Volume/$"]
            ],
            nav_active: 0,
            //请求type
            coin_typearr:['','',"price_usd","market_cap","volume_usd","change_quantity","github_score","society_score","total_score",""],
            typearr: [
                "change_quantity",
                "change_quantity",
                "volume_usd",
                "",
            ],
            tokentrade_list: [],
             //排序图片数组
            imgarr:['../../static/nomal.png','../../static/down.png','../../static/up.png'],
            sort_field:3,
            sort_type:-1,
            left:'',
            top_style:{},
            top_style_nav_left:{},
            top_style_nav_right:{},
            show_more:true
        };
    },
    created() {
        window.addEventListener("scroll", this.handleScroll1);
        this.get_tokentrade(0,8,this.nav_active, -1, 0);
        if(this.$store.state.coin_list.length === 0){
            this.get_coin(0,10,this.sort_field, this.sort_type, 1);
        }
    },
    mounted(){

    },
    destroyed(){
        window.removeEventListener("scroll", this.handleScroll1)
    },
    methods: {
        goto_detail(name){
            this.$router.push({path:'/coindetail?id='+name});
        },
        touchmove(){
            let x = $('.coin-scroll').offset().left;
            this.top_style_nav_right["left"] = x+'px';

        },
        //监听滚动条事件
        handleScroll1() {
            var scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            let coin_top =  $('.coin-con-box').offset().top;
            let h = $('#header-box').height();
            if (scrollTop+h >= coin_top) {
                let x = $('.coin-scroll').offset().left + 'px';
                this.top_style = { position: "fixed", top: "0.88rem" ,width:'100%'};
                this.top_style_nav_left={position: 'fixed',top: '1.5rem',zIndex:10}
                this.top_style_nav_right={position: 'fixed',top: '1.5rem',left:x}
            }else{
                this.top_style = {};
                this.top_style_nav_right={};
                this.top_style_nav_left={};
            }
        },
        more(){
            this.$store.state.ph_page+=1;
            this.get_coin(this.$store.state.ph_page,10,this.sort_field, this.sort_type, 1);
        },
        change_type(index){
            if(index === 0 || index === 1 || index === 9){
                return
            }
            let arr = [
                [{img_type:0,name:'#'},{img_type:0,name:'名称'},{img_type:0,name:'价格/￥'},{img_type:0,name:'市值/￥'},{img_type:0,name:'交易量(24H)/￥'},{img_type:0,name:'涨幅(24H)'},{img_type:0,name:'开发者'},{img_type:0,name:'社交媒体'},{img_type:0,name:'总分'},{img_type:-1,name:'价格图(7D)'}],
                [{img_type:0,name:'#'},{img_type:0,name:'Name'},{img_type:0,name:'Price/$'},{img_type:0,name:'Market/$'},{img_type:0,name:'Volume(24H)/$'},{img_type:0,name:'Change(24H)'},{img_type:0,name:'Developer'},{img_type:0,name:'Social Media'},{img_type:0,name:'Total'},{img_type:-1,name:'Price Graph (7D)'}]         
            ]
            if(this.titlearr[0][index].img_type === 0){
                this.titlearr = arr;
                this.titlearr[0][index].img_type = 1;
                this.titlearr[1][index].img_type = 1;
                this.sort_type = -1;
            }else if(this.titlearr[0][index].img_type === 1){
                this.titlearr = arr;
                this.titlearr[0][index].img_type = 2;
                this.titlearr[1][index].img_type = 2;
                this.sort_type = 1;
            }else{
                this.titlearr = arr;
                this.titlearr[0][index].img_type = 1;
                this.titlearr[1][index].img_type = 1;
                this.sort_type = -1;
            }
            this.sort_field = index;
             this.$store.state.coin_list = [];
            this.get_coin(0,10,index, this.sort_type, 1);

        },
        addgap(num){
            return newfn.conversion(num)
        },
        change_nav(index) {
            this.nav_active = index;
            let type;
            let trade_list;
            let num = 0;
            let size = 8;
            switch (index) {
                case 0:
                    type = -1;
                    trade_list = 0;
                    break;
                case 1:
                    type = 1;
                    trade_list = 0;
                    break;
                case 2:
                    type = -1;
                    trade_list = 0;
                    break;
                case 3:
                    type = -1;
                    trade_list = 0;
                    break;
            }
            this.get_tokentrade(num,size,index, type, trade_list);
        },
        get_tokentrade(num,size,index, sort_type, trade_list) {
            this.tokentrade_list = [];
            let obj = {
                params: {
                    page_num: num,
                    page_size: size,
                    sort_field: this.typearr[index],
                    sort_type: sort_type,
                    trade_list: trade_list
                }
            };
            this.$ajax.get(this.host + "/tokenrank/V2/tokenTrade.json", obj).then(res => {
                    let data = res.data.data;
                    data.forEach(element => {
                        element['name_list']=[element.name,element.en_name];
                    });
                    this.tokentrade_list = data;
                    
                });
        },
        get_coin(num,size,index, type, trade_list) {
            let obj = {
                params: {
                    page_num: num,
                    page_size: size,
                    sort_field: this.coin_typearr[index],
                    sort_type: type,
                    trade_list: trade_list
                }
            };
            this.$ajax.get(this.host + "/tokenrank/V2/tokenTrade.json", obj).then(res => {
                    let data = res.data.data; 
                    if(data.length<=0){
                        this.show_more = false;
                        return
                    }         
                    this.show_more = true;      
                    data.forEach(el => {
                        el['name_list']=[el.name,el.en_name];
                        if(el.change_quantity||el.change_quantity === 0){
                            let n =(100*el.change_quantity).toFixed(2)*1;
                            if(n == 0){
                                n = '0.00';
                            }
                            el.change_quantity = n;
                        }else{
                            el.change_quantity = '--';
                        }

                        el['seven'] = []
                        if(el.seven_day_price){
                            for(let i=0;i<7;i++){
                                if(el.seven_day_price[i]&&el.seven_day_price[i]['price_usd']){
                                    el['seven'].unshift(el.seven_day_price[i].price_usd)
                                }else{
                                    el['seven'].unshift(0)
                                }
                            }
                        }else{
                            el['seven'] = [0,0,0,0,0,0,0]
                        }
                        let maxnn = Math.max.apply(null, el['seven']);//最大值
                        let minnn = Math.min.apply(null, el['seven']);//最小值 
                        let gapn = maxnn - minnn//差值
                        if(gapn == 0){
                            el['seven_price'] = [[-1,30],[0,30],[90/7,30],[90/7*2,30],[90/7*3,30],[90/7*4,30],[90/7*5,30],[90/7*6,30],[90,30],[91,30],[92,30]]
                        
                        }else{
                            el['seven_price'] = [[-1,30],[0,30-(el['seven'][0] - minnn)/gapn*30],[90/7,30-(el['seven'][0] - minnn)/gapn*30],[90/7*2,30-(el['seven'][1] - minnn)/gapn*30],[90/7*3,30-(el['seven'][2] - minnn)/gapn*30],[90/7*4,30-(el['seven'][3] - minnn)/gapn*30],[90/7*5,30-(el['seven'][4] - minnn)/gapn*30],[90/7*6,30-(el['seven'][5] - minnn)/gapn*30],[90,30-(el['seven'][6] - minnn)/gapn*30],[91,30-(el['seven'][6] - minnn)/gapn*30],[92,30]]
                        }

                    });
                    this.$store.state.coin_list.push(...data);
                });
        },
    },
    computed: {
        ...mapState(["lanfalg", "usd_cny",'ph_page','coin_list'])
    }
};
</script>
<style lang="scss" scoped>
.top-box {
    margin-top: 0.08rem;
    margin-bottom: 0.08rem;
    box-sizing: border-box;
    padding: 0 0.24rem;
    background: #fff;
    .nav-box {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        flex-wrap: nowrap;
        border-bottom: 0.01rem solid #e5e5e5;
        li {
            line-height: 0.74rem;
            color: #999999;
            font-size: 0.28rem;
            padding-left: 0.2rem;
            padding-right: 0.2rem;
            position: relative;
            span {
                position: absolute;
                width: 0.02rem;
                height: 0.22rem;
                background-color: #e5e5e5;
                right: 0;
                top: (0.74rem - 0.22rem) / 2;
            }
        }
        li:nth-of-type(1) {
            padding-left: 0;
        }
        li:last-of-type {
            padding-right: 0;
            span {
                display: none;
            }
        }
        .nav-active {
            color: #a376d4;
        }
    }
}
.nav-con-box {
    margin-top: 0.3rem;
    .nav-name-box {
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        li {
            font-size: 0.28rem;
            color: #999999;
            line-height: 0.52rem;
            text-align: left;
            height: 0.52rem;
        }
        li:nth-of-type(1) {
            width: 0.72rem;
        }
        li:nth-of-type(2) {
            width: 2.88rem;
        }
        li:nth-of-type(3) {
            width: 1.68rem;
            text-align: right;
        }
        li:nth-of-type(4) {
            width: 1.74rem;
            text-align: right;
          
        }
    }
    .nav-con {
        li {
            display: flex;
            justify-content: space-between;
            flex-wrap: nowrap;
            span {
                text-align: left;
                font-size: 0.28rem;
                letter-spacing: 0.03rem;
                color: #333333;
                line-height: 0.52rem;
                display: inline-block;
                height: 0.52rem;
                overflow: hidden;
                word-break: break-all;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            span:nth-of-type(1) {
                width: 0.72rem;
            }
            span:nth-of-type(2) {
                width: 2.88rem;
            }
            span:nth-of-type(3) {
                width: 1.68rem;
                text-align: right;
            }
            span:nth-of-type(4) {
                width: 1.74rem;
                text-align: right;
            }
        }
    }
}
.coin-con-box {
    background: #fff;
    box-sizing: border-box;
    .title {
        padding: 0 0.24rem;
        line-height: 0.45rem;
        box-sizing: border-box;
        font-size: 0.28rem;
        color: #333333;
        background: #fff;
        text-align: left;
        line-height: 0.64rem;
        font-weight: 600;
    }
}
.left {
    box-sizing: border-box;
    width: 3.2rem;
    float: left;
    ul {
        padding-left: 0.24rem;
    }
}
.scroll-box{
    width: 1.9rem+1.8rem+2.7rem+2.7rem+2.6rem+2.7rem+1.4rem+2rem;
    overflow-x: scroll;
    overflow-y: hidden;
    float: left;
    // position: fixed;
    // top: 0;

}
.right {
    float: left;
    width: calc(100% - 3.2rem);
    overflow-x: scroll;
    overflow-y: hidden;
    ul {
        float: left;
        width: 1.9rem+1.8rem+2.7rem+2.7rem+2.6rem+2.7rem+1.4rem+2rem;
        li:nth-of-type(1) {
            width: 1.9rem;
            text-align: left;
        }
        li:nth-of-type(2) {
            width: 1.81rem;
        }
        li:nth-of-type(3) {
            width:2.71rem;
        }
        li:nth-of-type(4) {
            width:2.71rem;
        }
        li:nth-of-type(5) {
            width:2.6rem;
        }
        li:nth-of-type(6) {
            width:2.7rem;
        }
        li:nth-of-type(7) {
            width:1.41rem;
        }
        li:nth-of-type(8) {
            width:1.96rem;
        }
    }
}
.right::-webkit-scrollbar {
    width: 0; /* 滚动条宽度为0 */
    height: 0; /* 滚动条高度为0 */
    display: none; /* 滚动条隐藏 */
}
.coin-nav-name-left li:nth-of-type(2){
    padding-left: 0.5rem;
    box-sizing: border-box;
    text-align: left;
}
.coin-nav-name {
    height: 0.74rem;
    background-color: #f7f4fb;
    line-height: 0.74rem;
    color: #a376d4;
    font-size: 0.28rem;
    li {
        float: left;
        height:0.74rem;
        img{
           width: 0.21rem;
            height: 0.24rem;
            vertical-align: middle; 
        }
        span{
              vertical-align: middle; 
            display: inline-block;
            line-height: 0.74rem;
        }
    }
    li:nth-of-type(1) {
        width: 0.6rem;
        text-align: left;
    }
    li:nth-of-type(2) {
        width: 2.36rem;
    }
}

.coin-name {
    line-height: 0.9rem;
    border-bottom: 0.01rem solid #e5e5e5;
    font-size: 0.28rem;
    height: 0.9rem;
    box-sizing: content-box;
    .coinname{
        text-align: left;
        img{
            width: 0.5rem;
	        height: 0.5rem;
            vertical-align: middle;
        }
        div{
            display: inline-block;
            vertical-align: middle;
            width: 1.4rem;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            word-break: break-all;
            p:nth-of-type(1){
                letter-spacing: 0.03rem;
                color: #333333;
                font-size: 0.28rem;
                line-height: .28rem;
            }
            p:nth-of-type(2){
                letter-spacing: 0.03rem;
                color: #666;
                font-size: 0.2rem;
                line-height: .22rem;
            }
        }
    }
    li {
        float: left;
        height: 0.9rem;
    }
    li:nth-of-type(1) {
        width: 0.6rem;
        text-align: left;
    }
    li:nth-of-type(2) {
        width: 2.36rem;
    }
}
.more{
   line-height: .94rem;
   height: .94rem;
    color: $color;
    width: 100%;
    font-size: 0.28rem;
    letter-spacing: 0.03rem;
    float: left;
    span{
        vertical-align: middle;
    }
    img{
        vertical-align: middle;
        width: 0.16rem;
	    height: 0.08rem;
    }
}
</style>
