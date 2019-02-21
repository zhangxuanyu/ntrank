<template>
   <div id="trend-box">
       <!-- <div class="title-industry">
           <span>21 类行业</span>
           <span>总市值 $211,236,404,626.93124</span>
       </div>
       <div class="title-number">
           通证数量：350
       </div> -->
       <ul>
           <li v-for="index in 1" :key="index" @click="goto_detail(index)" >
                <div class="trend-top clearfix">
                    <div class="img">
                        <img :src="list.icon" alt="">
                    </div>
                    <div class="word">
                        <p class="name">
                            <span>{{list.short_name}}</span>
                            <span>({{lanfalg===0?list.name:list.en_name}})</span>
                        </p>
                        <p class="price">
                            <span>{{money_sym[lanfalg]+list.price_usd}}</span>
                            <span :style="parseFloat(list.change_quantity)>=0?{color:'#2f9e84'}:{color:'#d80220'}"> {{(100*list.change_quantity).toFixed(2)}}%</span>
                        </p>
                    </div>
                </div>
                <div class="svg">
                     <svg width="100%" height="100%" version="1.1"
                        xmlns="http://www.w3.org/2000/svg">
                        <polyline :points='seven_price'
                        style="fill:#f4eefe;stroke:#775f9f;stroke-width:1"/>
                    </svg>
                </div>
                <div class="oth">内容付费及分发</div>
           </li>
           <li class="followup" style="margin-top:0.2rem">
                敬请关注后续项目...
            </li>
       </ul>
   </div>
</template>
<script>
import {mapState} from 'Vuex';
export default {
    data(){
        return{
            list:[],
            seven_price:[],
        }
    },
    mounted(){
         this.$ajax.get(this.host+"/tokenrank/V2/tokenTradeDetail.json", {
            params: { code: 'steem' }
        }).then(res=>{
            this.list = res.data.data;
            console.log(res.data.data)
        })
        this.$ajax.get(this.host+"/tokenrank/V2/tokenKline.json", {
            params: { code: 'steem',days:7,dim:0 }
        }).then(res=>{
            let seven_price = [];
            let list = res.data.data.price_usd;
            
            let maxnn = Math.max.apply(null,list);//最大值
            let minnn = Math.min.apply(null, list);//最小值 
            let gapn = maxnn - minnn//差值
            let n = $('.svg').width() *1 /6;
               if(gapn == 0){
                    seven_price = [[-1,76],[0,76],[n,76],[n*2,76],[n*3,76],[n*4,76],[n*5,76],[n*6,76],[90,76],[91,76],[92,76]]
                
                }else{
                    seven_price = [[0,94],[0,94-(list[0] - minnn)/gapn*94],[n,94-(list[1] - minnn)/gapn*94],[n*2,94-(list[2] - minnn)/gapn*94],[n*3,94-(list[3] - minnn)/gapn*94],[n*4,94-(list[4] - minnn)/gapn*94],[n*5,94-(list[5] - minnn)/gapn*94],[n*6,94-(list[6] - minnn)/gapn*94],[n*6+1,94],[n*6+2,94]]
                }
            this.seven_price = seven_price;
            
            console.log(res.data.data)
        })
    },
    methods:{
        goto_detail(index){
            this.$router.push({
                path: '/trenddetail',
                query:{
                    coin:'steem'
                }
            })
        }
    },
    computed:{
        ...mapState(['lanfalg','usd_cny','money_sym'])
    }
}
</script>
<style lang="scss" scoped>
#trend-box{
    overflow: hidden;
    padding-left: 0.24rem;
    padding-right: 0.24rem;
    min-height: calc(100vh - 0.88rem - 1.34rem);
    ul{
        width: 100%;
        li{
            background: #fff;
            border-radius: 0.05rem;
            height: 3.77rem;
            margin-bottom: 0.08rem;
            position: relative;
            .trend-top{
                margin-top: 0.24rem;
                padding-left: 0.24rem;
                .img{
                    width: 1rem;
	                height: 1rem;
                    vertical-align: middle;
                    float: left;
                    margin-right: 0.3rem;
                     vertical-align: middle;
                    img{
                         width: 1rem;
	                    height: 1rem;
                    }
                }
                .word{
                    text-align: left;
                     p{
                        height: 0.5rem;
                        line-height: 0.5rem;
                    }
                    // float: left;
                    .name{
                        font-size: 0.32rem;
                        span:nth-of-type(2){
                            letter-spacing: 0.03rem;
	                        color: #999999;
                        }
                    }
                    .price{
                        font-size: 0.28rem;
                        span:nth-of-type(2){
                            letter-spacing: 0.01rem;
	                        color: #ff0000;
                        }
                    }
                }
            }
             .svg{
                width: 100%;
                margin-top: calc(3.77rem - 1rem - 94px);
                height: 94px;
                // transform: rotateX(180deg);
                transform-origin:center;
            }
            .oth{
                position: absolute;
                right: 0.24rem;
                bottom: 0.24rem;
                font-size: 0.24rem;
                letter-spacing: 1px;
                color: #999999;
                letter-spacing: 1px;
                color: #999999;
            }
        }
        .followup{
              height: 3.77rem;
              line-height: 3.77rem;

             background: #fff;
             font-size: 0.24rem;
        }
    }
}
.title-industry{
    font-size: 0.28rem;
    color: #333333;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    text-align: left;
}
.title-number{
    text-align: left;
    color: #999999;
    font-size: 0.28rem;
    margin-bottom: 0.36rem;
}
</style>
