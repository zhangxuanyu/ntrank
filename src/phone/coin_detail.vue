<template>
    <div id="box">
        <div class="top-box">
            <div class="name-box clearfix">
                <img :src="base_list.icon" alt="">
                <p>
                    <span :style="has_tendency?'':{'line-height': '1rem','height': '1rem'}">{{base_list.short_name}}</span>
                    <span :style="has_tendency?'':{'line-height': '1rem','height': '1rem'}" class="name">({{name_list[lanfalg]}})</span>
                </p>
                <div class="quotes" @click="tendency" v-if="has_tendency">
                    {{tendency_word[lanfalg]}}
                </div>
            </div>
            <div class="price-box">
                <span>{{base_list.price_usd>1?money_sym[lanfalg]+(base_list.price_usd*usd_cny[lanfalg]).toFixed(2):money_sym[lanfalg]+(base_list.price_usd*usd_cny[lanfalg]).toFixed(6)}}</span>
                <span class="percen" :style="parseFloat(base_list.change_quantity)>=0?{color:'#fe0000'}:{color:'#d80220'}">{{(100*base_list.change_quantity).toFixed(2)}}%</span>
            </div>
            <ul class="detail-box">
                <li>
                    <p>{{basefont[0][lanfalg]}}</p>
                    <span>{{money_sym[lanfalg]+addgap((base_list.volume_usd*usd_cny[lanfalg]).toFixed(0))}}</span>
                </li>
                <li>
                    <p>{{basefont[1][lanfalg]}}</p>
                    <span>{{base_list.turnover_rate}}</span>
                </li>
                <li>
                    <p>{{basefont[2][lanfalg]}}</p>
                    <span>{{addgap(base_list.circulating_supply)}} {{base_list.short_name}}</span>
                </li>
                <li>
                    <p>{{basefont[3][lanfalg]}}</p>
                    <span>{{base_list.flow_rate}}</span>
                </li>
                <li>
                    <p>{{basefont[4][lanfalg]}}</p>
                    <span>{{money_sym[lanfalg]+addgap((base_list.market_cap*usd_cny[lanfalg]).toFixed(0))}}</span>
                </li>
            </ul>
            <ul class="icon-box clearfix">
                <li v-for="(item,index) in icon_box" :key="index">
                    <div v-if="index != 3">
                        <img :src="item.imgsrc[0]" alt="" v-if="item.value"  @click="opennew(index)">
                        <img :src="item.imgsrc[1]" alt="" v-else>
                    </div>
                    <div v-if="index === 3">
                        <i v-for="(it,idx) in item.value" :key="idx">
                            <img :src="item.imgsrc[0]" alt="" v-if="it"  @click="opennew(index,idx)">
                            <img :src="item.imgsrc[1]" alt="" v-else>
                        </i>
                    </div>
                </li>
            </ul>
              <div id="baseright">
                <k-line style="width:350px"></k-line>
            </div>
        </div>
        <div class="nav-box">
            <div @click="change_module(1)" :class="show_ab?'nav-active':''">{{nav_name[0][lanfalg]}}</div>
            <div @click="change_module(2)" :class="show_ab?'':'nav-active'">{{nav_name[1][lanfalg]}}</div>
        </div>
        <div>
            <ph-active v-if="show_ab"></ph-active>
            <ph-baseinfo v-if="!show_ab"></ph-baseinfo>
        </div>
    </div>
</template>
<script>
import { mapState } from "Vuex";
import newfn from "../../static/base/base.js";
import kLine from "../phcom/kline.vue";
import phActive from "../phcom/active.vue";
import phBaseinfo from "../phcom/baseinfo.vue";
export default {
    components: {
        kLine,
        phActive,
        phBaseinfo
    },
    data() {
        return {
            has_tendency:false,
            tendency_list:['steem'],
            tendency_word:['产品详情>>','Product Details>>'],
            nav_name:[
                ['活跃度','Liveness'],
                ['基本信息','Basic Information'],
            ],
            base_list:[],
            name_list:[],
            show_ab:true,
            basefont:[
                   ['交易量(24H)','Volume(24H)'],
                    ['换手率(24H)','Turnover Rate(24H)'],
                    ['流通供给量','Circulating Supply'],
                    ['流通率','Flow rate'],
                    ['流通市值', 'Market Cap']
            ],
            icon_box:[
                {name:['官网','Website'],value:'',imgsrc:["../../static/home1.png", "../../static/home2.png"],},
                {name:['GitHub','GitHub'],value:'',imgsrc: ["../../static/git1.png", "../../static/git2.png"],},
                {name:['浏览器', 'Explorer'],value:'',imgsrc: ["../../static/block1.png", "../../static/block2.png"]},
                {name:['白皮书','Whitepaper'],value:'',imgsrc:["../../static/white1.png", "../../static/white2.png"],}
            ]
        };
    },
    created() {
        var code = newfn.getid();
         this.tendency_list.forEach(item=>{
            console.log(this.has_tendency)
            if(item === code){
                this.has_tendency = true;
            }
        })
        //交易数据
        this.$ajax
            .get(this.host + "/tokenrank/V2/tokenTradeDetail.json", {
                params: { code: code }
            })
            .then(res => {
                let data = res.data.data;
                console.log(data);
                this.base_list = data;
                this.name_list.push(data.name);
                this.name_list.push(this.upfirst(data.en_name));
            });
        this.$ajax.get(this.host+'/tokenrank/V2/tokenInfo.json',{
            params: { code: code }
        })
        .then(res=>{
            console.log(res)
            let link = res.data.data.link;
            this.icon_box[0].value = link.website||'';
            this.icon_box[1].value = link.github||'';
            this.icon_box[2].value = link.white_paper||'';
            this.icon_box[3].value = link.block_station||'';
        })
    },
    mounted(){

    },
    methods:{
        tendency(){
            this.$router.push({
                path:'/trenddetail',
                query:{
                    coin:this.theid
                }
            })
        },
        opennew(index,idx){
             let web = '';
            if(index === 3){
                web = this.icon_box[index].value[idx].url;
                window.open(web)
            }else{
                web = this.icon_box[index].value;
                window.open(web)
            }
        },
        change_module(index){
            if(index === 1){
                this.show_ab = true;
            }else{
                this.show_ab = false;
            }
        },
         //首字母大写
        upfirst(name) {
            return name.substring(0, 1).toUpperCase() + name.substring(1);
        },
        addgap(aa) {
            return newfn.conversion(aa);
        },
    },
    computed: mapState(["lanfalg", "usd_cny", "money_sym"])
};
</script>
<style lang="scss" scoped>
#box{
    margin-top: 0.08rem;
    text-align: left;
    .top-box{
        box-sizing: border-box;
        padding: 0.24rem;
        background: #fff;
        .name-box{
            margin-bottom: 0.21rem;
            height: 1rem;
            img{
                width: 1rem;
                height: 1rem;
                margin-right: 0.2rem;
                float: left;
            } 
            p{
                float: left;
                font-size: 0.32rem;
                letter-spacing: 0.03rem;
	            color: #000000;
                line-height: 0.5rem;
                height: 0.5rem;

            }
            .name{
                color: #999999;
            }
            .quotes{
                float: left;
                width: calc(100% - 1.2rem);
                line-height: 0.5rem;
                font-size: 0.28rem;
                color: $color;
            }
        }   
        .price-box{
            font-size: 0.42rem;
            letter-spacing: 0.04rem;
	        color: #333333;
            line-height: .42rem;
            position: relative;
            span{
                vertical-align: middle;
            }
            .percen{
                color: #fe0000;
                font-size: 0.28rem;
                position: absolute;
                bottom: -2px;
                margin-left: 0.12rem;

            }
        }
        .detail-box{
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            margin-top: 0.35rem;
            margin-bottom: 0.1rem;
            li{ 
                letter-spacing: 0.01rem;
                width: 2.86rem;
                margin-bottom: .18rem;
                font-size: 0.28rem;
                p{
	                color: #999999;
                    line-height: 0.4rem;
                }
                span{
                    line-height: 0.4rem;
                    display: block;
                    color: #000000;
                }
            }
        }
        .icon-box{
            li{
                float: left;
                width: 0.5rem;
                height: 0.5rem;
                margin-right: 0.2rem;
                div{
                    width: 0.5rem;
                    height: 0.5rem;
                    img{
                        width: 0.5rem;
                        height: 0.5rem;
                        float: left;
                    }
                }
                
            }
            li:nth-of-type(4){
                width: 3rem;
                div{
                    width: 3rem;
                    i{
                        float: left;
                        width:0.5rem;
                margin-right: 0.2rem;
                    }
                }
            }
        }
    }
    .nav-box{
        margin-top: .08rem;
        background: #fff;
        display: flex;
        justify-content: space-around;
        flex-wrap: nowrap;
        color: #999999;
        font-size: 0.32rem;
        line-height: 0.79rem;
        border-bottom: 0.01rem solid #e5e5e5;
        text-align: center;
        .nav-active{
            color: #a376d4;
        }
        div{
            width: 50%;
        }
    }
}
</style>
