<template>
    <div class="cont">
        <p class="top"><span class="cur" @click="gotoindex()">{{first[lanfalg]}}</span> > <span class="top_init">{{upfirst(theid)}}</span></p>
        <div class="basecont" v-if="JSON.stringify(basevalue)!='{}'">
            <div class="baseleftout">
                <div class="baseleft">
                    <p class="firstp">
                        <img :src="basevalue.icon" alt="">
                        <span class="name">{{basevalue.short_name}} <span>({{name_list[lanfalg]}})</span> </span>
                    </p>
                    <p class="money">
                        {{basevalue.price_usd>1?money_sym[lanfalg]+(basevalue.price_usd*usd_cny[lanfalg]).toFixed(2):money_sym[lanfalg]+(basevalue.price_usd*usd_cny[lanfalg]).toFixed(6)}}
                        <span class="updown" :style="parseFloat(basevalue.change_quantity)>=0?{backgroundColor:'#2f9e84'}:{backgroundColor:'#d80220'}">
                            {{(100*basevalue.change_quantity).toFixed(2)}}%
                        </span>
                    </p>
                    <div class="price">
                        <p>{{basefont[0][lanfalg]}}</p>
                        <p>{{money_sym[lanfalg]+addgap((basevalue.volume_usd*usd_cny[lanfalg]).toFixed(0))}}</p>
                        <p>{{basefont[2][lanfalg]}}</p>
                        <p>{{addgap(basevalue.circulating_supply)}} {{basevalue.short_name}}</p>
                        <p>{{basefont[4][lanfalg]}}</p>
                        <p>{{money_sym[lanfalg]+addgap((basevalue.market_cap*usd_cny[lanfalg]).toFixed(0))}}</p>
                    </div>
                    <div class="volue">
                        <p>{{basefont[1][lanfalg]}}</p>
                        <p>{{basevalue.turnover_rate}}</p>
                        <p>{{basefont[3][lanfalg]}}</p>
                        <p>{{basevalue.flow_rate}}</p>
                    </div>
                    <div class="tendency" @click="tendency" v-if="has_tendency">{{tendency_word[lanfalg]}}</div>
                </div>
            </div>

            <div id="baseright">
                <m-chart style="width:100%"></m-chart>
            </div>
        </div>

        <div class="selectbox">
            <div style="overflow:hidden;height:43px;">
                <div v-for="(item,index) in selectarr" :key="index" class="thebox cur" :style="selec == index?{color:'#a376d4',backgroundColor:'#fff'}:{}" @click="change(index)">
                    {{item[lanfalg]}}
                </div>
            </div>
            <base-info v-show="selec == 1"></base-info>
            <the-active v-show="selec == 0"></the-active>
        </div>
    </div>
</template>

<script>
import newfn from "../../static/base/base.js";
import mChart from "../components/moostchart.vue";
import baseInfo from "../components/coin/baseinfo.vue";
import theActive from "../components/coin/active.vue";
import { mapState } from "Vuex";

export default {
    components: {
        mChart,
        baseInfo,
        theActive
    },
    data() {
        return {
            first: ["币种", "Coin"],
            base: [],
            theid: "",
            basefont: [],
            basevalue: {},
            selectarr: [],
            selec: 0,
            name_list: [],
            tendency_list:['steem'],
            has_tendency:false,
            tendency_word:['产品详情>>','Product Details>>']
            //数据详情
        };
    },
    created() {
        window.scrollTo(0, 0);
        this.theid = newfn.getid();
        this.tendency_list.forEach(item=>{
            console.log(this.has_tendency)
            if(item === this.theid){
                this.has_tendency = true;
            }
        })
        this.basefont = alllanguage.coindetail.base;
        this.selectarr = alllanguage.coindetail.childtype;

        //交易数据
        newfn
            .fornew("get", "/tokenrank/V2/tokenTradeDetail.json", {
                params: { code: this.theid }
            })
            .then(data => {
                this.basevalue = data.data.data;
                console.log(this.basevalue);
                this.name_list.push(this.basevalue.name);
                this.name_list.push(this.upfirst(this.basevalue.en_name));
            });
    },
    methods: {
        tendency(){
            this.$router.push({
                path:'/trenddetail',
                query:{
                    coin:this.theid
                }
            })
        },
        //首字母大写
        upfirst(aa) {
            return aa.substring(0, 1).toUpperCase() + aa.substring(1);
        },
        change(a) {
            this.selec = a;
        },
        addgap(aa) {
            return newfn.conversion(aa);
        },
        gotoindex() {
            this.$router.push({ path: "/" });
        }
    },
    computed: mapState(["lanfalg", "usd_cny", "money_sym"])
};
</script>

<style scoped lang="scss">
.cont {
    color: $basecolor;
    padding-top: 19px;
    .top {
        text-align: left;
        padding-left: 10px;
        margin-bottom: 20px;
        .top_init {
            color: $color;
        }
    }
    .basecont {
        overflow: hidden;
        .baseleftout {
            width: 33%;
            float: left;
            padding-right: 20px;
        }
        .baseleft {
            width: 100%;
            padding: 40px;
            @include bgheight;
            position: relative;
            .firstp {
                margin-bottom: 30px;
            }
            .tendency{
                position: absolute;
                right: 40px;
                bottom: 40px;
                color: #a376d4;
                cursor: pointer;
                font-size: 14px;
            }
            p {
                text-align: left;
                font-size: 16px;

                img {
                    width: 50px;
                }
                .name {
                    vertical-align: 21px;
                    color: #000;
                    span {
                        color: #999;
                    }
                }
            }
            .money {
                font-size: 30px;
                color: #000;
                margin-bottom: 27px;
                height: 30px;
                line-height: 30px;
                .updown {
                    color: #fff;
                    border-radius: 5px;
                    height: 15px;
                    font-size: 10px;
                    padding: 1px 8px;
                    vertical-align: 7px;
                }
            }
            .price {
                float: left;
                text-align: left;
                p:nth-of-type(2n + 1) {
                    color: #999;
                    font-size: 12px;
                    line-height: 20px;
                }
                p:nth-of-type(2n) {
                    color: #000;
                    font-size: 14px;
                    margin-bottom: 15px;
                    height: 20px;
                    line-height: 20px;
                }
            }
            .volue {
                float: right;
                text-align: left;
                p:nth-of-type(2n + 1) {
                    color: #999;
                    font-size: 12px;
                    line-height: 20px;
                }
                p:nth-of-type(2n) {
                    color: #000;
                    font-size: 14px;
                    margin-bottom: 15px;
                }
            }
        }
        #baseright {
            width: 67%;
            float: right;
            @include bgheight;
        }
    }
    .selectbox {
        margin-top: 20px;
        .thebox {
            float: left;
            height: 43px;
            line-height: 43px;
            color: $basecolor;
            font-size: 16px;
            padding: 0 25px;
            background-color: #edeef7;
        }
        .thebox:nth-of-type(1) {
            border-radius: 5px 0px 0px 0px;
        }
        .thebox:nth-of-type(4) {
            border-radius: 0px 5px 0px 0px;
        }
    }
}
</style>
