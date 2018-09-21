<template>
    <div class="cont">
       <p class="top">{{first[0]}} > <span class="top_init">{{theid}}</span></p>
       <div class="basecont">
           <div class="baseleftout">
                <div class="baseleft">
                    <p class="firstp">
                        <img src="../../static/logo1.png" alt="">
                        <span class="name">{{theid}} <span >111111</span> </span>
                    </p>
                    <p class="money">
                        $998457398
                        <span class="updown" :style="theid>=0?{backgroundColor:'#2f9e84'}:{backgroundColor:'#d80220'}">
                            {{theid}}%
                        </span>
                    </p>
                    <div class="price">
                        <p>{{basefont[0][0]}}</p>
                        <p>234242</p>
                        <p>{{basefont[0][0]}}</p>
                        <p>345345345</p>
                        <p>{{basefont[0][0]}}</p>
                        <p>453453435</p>
                    </div>
                    <div class="volue">
                        <p>{{basefont[0][0]}}</p>
                        <p>234242</p>
                        <p>{{basefont[0][0]}}</p>
                        <p>345345345</p>
                    </div>
                </div>
           </div>
           
           <div id="baseright">
               <m-chart></m-chart>
           </div>
       </div>

       <div class="selectbox">
           <div style="overflow:hidden;">
                <div v-for="(item,index) in selectarr" class="thebox cur" :style="selec == index?{color:'#a376d4',backgroundColor:'#fff'}:{}" @click="change(index)">
                    {{item[0]}}
                </div>
           </div>
           <base-info class="infoc"></base-info>
       </div>
    </div>
</template>

<script>
import newfn from '../../static/base/base.js'
import mChart from '../components/moostchart.vue'
import baseInfo from '../components/coin/baseinfo.vue'
export default {
    components:{
                mChart,
                baseInfo
            },
    data(){
        return{
            first:['首页',''],
            base:[],
            theid:'',
            basefont:[],
            selectarr:[],
            selec:3
        }
    },
    created(){
        this.theid = newfn.getid()
        console.log(this.theid)
        this.basefont = alllanguage.coindetail.base
        this.selectarr = alllanguage.coindetail.childtype
    },
    methods:{
        change(a){
            this.selec = a
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
        height: 43px;
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
