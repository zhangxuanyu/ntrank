<template>
    <div id="trend-box">
        <!-- <p class="title">
            <span>21 类行业</span>
            <span>总市值 $211,236,404,626.93124</span>
            <span>通证数量：350</span>
        </p> -->
        <ul class="trend clearfix">
            <li v-for="index in 1" :key="index" @click="goto_detail(index)" >
                <div class="trend-top clearfix">
                    <div class="img">
                        <img :src="list.icon" alt="">
                    </div>
                    <div class="word">
                        <p class="name">
                            <span>{{list.short_name}}</span>
                            <span>({{name_list[lanfalg]}})</span>
                        </p>
                        <p class="price">
                            <span>{{money_sym[lanfalg]+list.price_usd>1?(list.price_usd*usd_cny[lanfalg]).toFixed(2):(list.price_usd*usd_cny[lanfalg]).toFixed(6)}}</span>
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
            <li class="followup">
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
            seven_price:[],
            list:[],
            name_list:[],
        }
    },
    created(){
    },
    mounted(){
        this.$ajax.get(this.host+"/tokenrank/V2/tokenTradeDetail.json", {
            params: { code: 'steem' }
        }).then(res=>{
            this.list = res.data.data;
            console.log(res.data.data)
             this.name_list.push(this.list.name);
            this.name_list.push(this.list.en_name);
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
            // list.forEach(element => {
                
            // });
            this.seven_price = seven_price;
            // this.price_list = [
            //     [n*0,list[0]*76],[n*1,list[1]*76],[n*2,list[2]*76],[n*3,list[3]*76],[n*4,list[4]*76],[n*5,list[5]*76],[n*6,list[6]*76]
            // ];
            
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
};
</script>
<style lang="scss" scoped>
#trend-box{
    padding: 0 70px;
    min-height: calc(100vh - 160px);
    .title{
        line-height: 55px;
        font-size: 14px;
        color: #333333;
        text-align: left;
        span:nth-of-type(2){
            margin-left: 20px;
            margin-right: 20px;
        }
        span:nth-of-type(3){
            color: #999999;
        }

    }
    .trend{
        width: 100%;
        display: flex;
        justify-content:flex-start;
        flex-wrap: wrap;
        margin-top: 55px;
        li{
            background: #fff;
            height: 206px;
            width: calc((100% - 50px) / 3);
            margin-bottom: 25px;
            position: relative;
            cursor: pointer;
            .trend-top{
                margin-top: 20px;
                margin-left: 20px;
                .img{
                margin-right: 20px;
                    width: 50px;
                    height: 50px;
                    vertical-align: middle;
                    float: left;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .word{
                    text-align: left;
                    p{
                        height: 25px;
                        line-height: 25px
                    }
                    .name{
                        font-size: 16px;
                        span{
                           letter-spacing: 2px; 
                        }
                        span:nth-of-type(1){
                            color: #000000;
                        }
                        span:nth-of-type(2){
                            color:  #999999;
                        }
                    }
                    .price{
                        font-size: 14px;
                        span{
                           letter-spacing: 1px; 
                        }
                        span:nth-of-type(1){
                            color: #000000;
                        }
                        span:nth-of-type(2){
                            color:  #ff0000;
                        }
                    }
                }
            }
            .svg{
                width: 100%;
                margin-top: 42px;
                height: 94px;
                // transform: rotateX(180deg);
                transform-origin:center;
            }
            .oth{
                position: absolute;
                right: 20px;
                bottom: 20px;
                font-size: 12px;
                letter-spacing: 1px;
                color: #999999;
            }
        }
        li:nth-of-type(3n+2){
            margin-left: 25px;
            margin-right: 25px;
        }
        .followup{
             background: #fff;
            height: 206px;
            width: calc((100% - 50px) / 3);
            line-height: 206px;
            letter-spacing: 1px;
            color: #999999;
            font-size: 14px;
        }
    }
}
</style>
