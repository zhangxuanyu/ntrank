<template>
    <div class="cont">
       <p class="top"><span class="cur"  @click="gotoindex()">{{first[$store.state.lanfalg-1]}}</span> > <span class="top_init">{{theid}}</span></p>
       <div class="basecont">
           <div class="baseleftout">
                <div class="baseleft">
                    <p class="firstp">
                        <img :src="basevalue.icon" alt="">
                        <span class="name">{{basevalue.short_name}} <span >({{basevalue.name}})</span> </span>
                    </p>
                    <p class="money">
                        {{$store.state.currency==2?'￥'+(basevalue.price_usd*$store.state.usd_cny).toFixed(2):'$'+basevalue.price_usd.toFixed(2)}}
                        <span class="updown" :style="parseFloat(basevalue.change_quantity)>=0?{backgroundColor:'#2f9e84'}:{backgroundColor:'#d80220'}">
                            {{basevalue.change_quantity}}%
                        </span>
                    </p>
                    <div class="price">
                        <p >{{basefont[0][$store.state.lanfalg-1]}}</p>
                        <p>{{$store.state.currency==2?'￥'+addgap(basevalue.volume_usd*$store.state.usd_cny):'$'+addgap(basevalue.volume_usd)}}</p>
                        <p>{{basefont[2][$store.state.lanfalg-1]}}</p>
                        <p>{{addgap(basevalue.circulating_supply)}} {{basevalue.short_name}}</p>
                        <p>{{basefont[4][$store.state.lanfalg-1]}}</p>
                        <p>{{$store.state.currency==2?'￥'+addgap(basevalue.market_cap*$store.state.usd_cny):'$'+addgap(basevalue.market_cap)}}</p>
                    </div>
                    <div class="volue">
                        <p>{{basefont[1][$store.state.lanfalg-1]}}</p>
                        <p>{{basevalue.turnover_rate}}</p>
                        <p>{{basefont[3][$store.state.lanfalg-1]}}</p>
                        <p>{{basevalue.flow_rate}}</p>
                    </div>
                </div>
           </div>
           
           <div id="baseright">
               <m-chart></m-chart>
           </div>
       </div>

       <div class="selectbox">
           <div style="overflow:hidden;height:43px;">
                <div v-for="(item,index) in selectarr" class="thebox cur" :style="selec == index?{color:'#a376d4',backgroundColor:'#fff'}:{}" @click="change(index)">
                    {{item[$store.state.lanfalg-1]}}
                </div>
           </div>
           <base-info  v-show="selec == 1"></base-info>
           <the-active  v-show="selec == 0"></the-active>
       </div>
    </div>
</template>

<script>
import newfn from '../../static/base/base.js'
import mChart from '../components/moostchart.vue'
import baseInfo from '../components/coin/baseinfo.vue'
import theActive from '../components/coin/active.vue'
export default {
    components:{
                mChart,
                baseInfo,
                theActive
            },
    data(){
        return{
            first:['首页','index'],
            base:[],
            theid:'',
            basefont:[],
            basevalue:'',
            selectarr:[],
            selec:0,
            //数据详情
            
        }
    },
    created(){
        this.theid = newfn.getid()
        console.log(this.theid)
        this.basefont = alllanguage.coindetail.base
        this.selectarr = alllanguage.coindetail.childtype

         //交易数据
        newfn.fornew('get','/tokenrank/V2/tokenTradeDetail.json',{params:{"code": this.theid}}).then((data)=>{
             console.log(data.data.data)
             this.basevalue = data.data.data
        })
    },
    methods:{
        change(a){
            this.selec = a
        },
        addgap(aa){
            return newfn.conversion(aa)
        },
        gotoindex(){
             this.$router.push({path:'/'});
        }
    }
}
</script>

<style scoped lang="scss">
.cont{
    color: $basecolor;
    padding-top: 19px;
    .top{
        text-align: left;
        padding-left: 10px;
        margin-bottom: 20px;
        .top_init{
            color: $color;
        }
    }
    .basecont{
        overflow: hidden;
        .baseleftout{
            width: 30%;
            float: left;
            padding-right: 20px;
        }
       .baseleft{
           width: 100%;
           padding: 50px;
           @include bgheight;
           .firstp{
               margin-bottom: 30px;
           }
           p{
               text-align: left;
               font-size: 16px;
               
               img{
                   width: 50px;
               }
               .name{
                   vertical-align: 21px;
                   color: #000;
                   span{
                       color: #999;
                   }
               }
           }
           .money{
               font-size: 30px;
               color: #000;
               margin-bottom: 27px;
               .updown{
                   color: #fff;
                   border-radius: 5px;
                   height: 15px;
                   font-size: 10px;
                   padding: 1px 8px;
                   vertical-align: 7px;
               }
           }
           .price{
               float: left;
               text-align: left;
               p:nth-of-type(2n+1){
                   color: #999;
                   font-size: 12px;
                   line-height: 20px;
               }
               p:nth-of-type(2n){
                   color: #000;
                   font-size: 14px;
                   margin-bottom: 15px;
               }
           }
           .volue{
               float: right;
               text-align: left;
               p:nth-of-type(2n+1){
                   color: #999;
                   font-size: 12px;
                   line-height: 20px;
               }
               p:nth-of-type(2n){
                   color: #000;
                   font-size: 14px;
                   margin-bottom: 15px;
               }
           }
       }
       #baseright{
           width: 70%;
           float: right;
           min-width: 810px;
           @include bgheight
       }
    }
    .selectbox{
        margin-top: 30px;
        .thebox{
            float: left;
            height: 43px;
            line-height: 43px;
            color: $basecolor;
            font-size: 16px;
            padding: 0 25px;
            background-color: #edeef7;
        }
        .thebox:nth-of-type(1){
            border-radius: 5px 0px 0px 0px;
        }
        .thebox:nth-of-type(4){
            border-radius:  0px 5px 0px 0px;
        }
        .infoc{
           
        }
    }
}
</style>
