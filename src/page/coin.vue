<template>
    <div class="cont">
        <div class="card_flex">
            <div v-for="(item,index) in showarr" class="card_in" :key="index">
                <my-rank :show-type='item.value' v-if="item.type == 'rank'"></my-rank>
                <my-chart :show-type='item.value' v-if="item.type == 'chart'"></my-chart>
            </div>
        </div>
        
        <div class="table_out">
            <p>{{TOP100[lanfalg]}}</p>
            <table  width="100%" cellspacing='0' style="text-align: center;display: block;">
                <!-- 无分类 -->
                    <tr class="top alltitle">
                        <th  v-for="(item,index) in titlearr" :class="{'title':true,'all':true,'cur':index != 0&&index != 1&&index != 9}" @click="rankdata(index)" :key="index">
                            <div>
                                <img :src="imgarr[rankarr[index]]" alt="" v-if="index != 0">
                                {{item.name[lanfalg]}}
                               
                            </div>
                            <div class="titletips" v-if="titletipsarr[index][lanfalg]">{{titletipsarr[index][lanfalg]}}</div>
                        </th>
                    </tr>
                    <tr class="top pd" v-for="(item,index) in arr" :key="index">
                        <td class=" all">
                            {{10*(currentPage-1)+index+1}}
                        </td>
                        <td class=" all cur" @click="gotodetail(item.code)">
                            <img :src="item.icon" alt="">
                            <div class="coinname">
                                <p style="">{{item.short_name}}</p>
                                <p style="font-size:12px;color:#666;fontWeight: normal;">{{item['name_list'][lanfalg]}}</p>
                            </div> 
                            
                        </td>
                        <td class=" all">{{item.price_usd?(item.price_usd>1?addgap(((item.price_usd*usd_cny[lanfalg]).toFixed(2))):addgap((item.price_usd*usd_cny[lanfalg]).toFixed(6))):'0.00'}}</td>
                        <td class=" all">{{item.market_cap?addgap((item.market_cap*usd_cny[lanfalg]).toFixed(0)):'0.00'}}</td>
                        <td class=" all">{{item.market_cap?addgap((item.volume_usd*usd_cny[lanfalg]).toFixed(0)):'0.00'}}</td>
                        <td class=" all" :style="item.change_quantity==='--'?{color:'#000'}:item.change_quantity*1>=0?{color:'#2f9e84'}:{color:'#fd2e40'}">{{item.change_quantity==='--'?item.change_quantity:item.change_quantity+'%'}}</td>
                        <td class=" all">{{item.github_score?item.github_score:'--'}}</td>
                        <td class=" all">{{item.society_score?item.society_score:'--'}}</td>
                        <td class=" all" style="color:#fd2e40">{{item.total_score?item.total_score:'--'}}</td>
                        <td class=" all">
                            <svg width="90" height="30" version="1.1"
                                xmlns="http://www.w3.org/2000/svg">

                                <polyline :points='item.seven_price'
                                style="fill:#f4eefe;stroke:#775f9f;stroke-width:1"/>

                            </svg>
                        </td>
                    </tr>
            </table>
            <div class="outpage">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="$store.state.currentPage"
                    :page-size="10"
                    background
                    layout="prev, pager, next, jumper"
                    :total="page_total" style="float: right;margin-top: 16px;margin-right:20px;">
                </el-pagination>

            </div>
        </div>
    </div>
</template>

<script>
import newfn from '../../static/base/base.js'
import myRank from '../components/data/rank.vue'
import myChart from '../components/data/chart.vue'
import { mapState } from "Vuex";

export default {
    components:{
                myRank,
                myChart
            },
    data(){
        return{
            date:'',
            
            // rank 和 chart 显示数组
            showarr:[{
                type:'rank',
                value:0
            },{
                type:'rank',
                value:1
            },{
                type:'chart',
                value:0
            }],
            arr:[],
            TOP100:['列表','List'],
            titlearr:[
                {
                    name:['#','#']
                },{
                    name:['名称','Name']
                },{
                    name:['价格/￥','Price/$']
                },{
                    name:['市值/￥','Market/$']
                },{
                    name:['交易量(24H)/￥','Volume(24H)/$']
                },{
                    name:['涨幅(24H)','Change(24H)']
                },{
                    name:['开发者','Developer']
                },{
                    name:['社交媒体','Social Media']
                },{
                    name:['总分','Total']
                },{
                    name:['价格图(7D)','Price Graph (7D)']
                }
            ],
            //请求type
            typearr:['','',"price_usd","market_cap","volume_usd","change_quantity","github_score","society_score","total_score",""],
            //排序图片数组
            imgarr:['../../static/nomal.png','../../static/down.png','../../static/up.png'],
            //排序
            rankarr:[-1,-1,0,0,0,0,0,0,0,-1],
            //控制点击图片下划线显示
            now:-1,
            page_size:10,
            page_total:1000,
            type:"market_cap",
            ranktype:-1,
            titletipsarr:[
                ['',''],
                ['',''],
                ['实时价格','Current price'],
                ['由总供给量乘以价格得出','Total supply * price'],
                ['近24小时的总交易量','The total transaction value over the last 24h'],
                ['近24小时的价格跌涨情况','Price change over the last 24h'],
                ['该币种的公共开发源代码库及GitHub社区活跃度概况，采集了Commits, Stars,Watchers等多个参数','An overview of development and GitHub activity for a coin. We are currently including Commits, Stars, Watchers, Forks, etc.'],
                ['该币种在社交媒体平台的关注人数，包括Twitter、Facebook、Reddit等平台','Community size on social media（incl. Twitter, Facebook, Reddit, etc.)'],
                ['总分 Total 该币种在市值、交易量、开发者及社交媒体等维度中的得分总和','Total coin analysis score of MKT Cap, Vol, Developer, Social Media, etc.'],
                ['近七日的价格变化情况','Price movement over the past 7 days']
            ]
        }
    },
    created(){
        this.newdata()
    },
    mounted(){
        this.fun = 11111;
    },
    methods:{
        newdata(a=3){
            this.arr = []
            newfn.fornew('get','/tokenrank/V2/tokenTrade.json',{params:{
                "page_num":this.$store.state.currentPage-1,
                "page_size":this.page_size,
                "sort_field":this.typearr[a],
                "sort_type":this.ranktype,
                "trade_list":1
            }}).then((data)=>{
                console.log(data.data)
                let list =  data.data.data;
                this.page_total = data.data.total_cnt;
                    var pricearr=[]
         
                    list.forEach(el => {
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


                    this.arr = list;

                })
        },
        addgap(aa){
            return newfn.conversion(aa)
        },
        handleCurrentChange(val){
            this.$store.state.currentPage = val;
            if(this.now == -1){
                this.newdata()
            }else{
                this.newdata(this.now)
            }
            
        },
        gotodetail(aa){
            this.$router.push({path:'/coindetail?id='+aa});
        },
        rankdata(aa){
            if(aa>=2&&aa<=8){
                this.now = aa
                if(this.rankarr[aa] == 0){
                    this.rankarr = [-1,-1,0,0,0,0,0,0,0,-1]
                    this.rankarr[aa] = 1
                    this.ranktype = -1
                }else if(this.rankarr[aa] == 1){
                    this.rankarr = [-1,-1,0,0,0,0,0,0,0,-1]
                    this.rankarr[aa] = 2
                    this.ranktype = 1
                }else if(this.rankarr[aa] == 2){
                    this.rankarr = [-1,-1,0,0,0,0,0,0,0,-1]
                    this.rankarr[aa] = 1
                    this.ranktype = -1
                }
                this.newdata(this.now)
                
            }
        }
    },
    computed:{
       
        ...mapState(["lanfalg",'usd_cny','currentPage']),
    }    
}
</script>


<style>
.el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: #775f9f;
}
.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
    background-color: #fff;
    border: 1px solid #dddee1;
}

</style>

<style scoped lang="scss">
table {
     table-layout:fixed;
     }
table td{
    white-space:nowrap;
    overflow:hidden; 
    text-overflow:ellipsis;
    } 
    th{
    font-weight: 400;
    padding: 0;
}
.cont{
    padding-top: $alladtop;
    padding-bottom:  $alladtop;
    .card_flex{
        display: flex;
        justify-content:space-between;
        .card_in{
            width: 33.33%;
            min-width: 300px;
        }
        .card_in:nth-of-type(2){
           margin-left: 20px;
    margin-right: 20px; 
        }
    }
    .table_out{
        background-color: #fff;
        margin-top: 20px;
        min-height: 800px;
        border-radius: 5px;
        p{
            text-align: left;
            padding-left: 20px;
            font-size: 14px;
            color: $basecolor;
            height:54px;
            line-height: 54px;
            font-weight: 600;
        }
        .top{
            height: 56px;
            background-color: #f7f4fb;
            line-height: 56px;
            color: $color;
            display: flex;
            justify-content: space-between;
            width: 100%;
            flex-wrap: nowrap;
            .all{
                position: relative;
                box-sizing: border-box;
                padding:0 5px;
                // background: rgba($color: #000000, $alpha: .2);
                .titletips{
                    position: absolute;
                    // top: 10px;
                    // left: 10px;
                    width: 160px;
                    padding: 10px;
                    z-index: 9;
                    height: auto;
                    text-align: left;
                    line-height: 22px;
                    font-size: 12px;
                    border-radius: 4px;
                    background-color: #000;
                    color: #fff;
                    display: none;
                }
                &:hover .titletips{
                    display: block;
                }
                .coinname{
                    float: left;
                    margin-top: 9px;
                    max-width: calc(100% - 25px);
                    p{
                        height: 20px;
                        line-height: 20px;
                        overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap
                    }
                }
            }
            .all:nth-of-type(1){
                width: 50px;
            }
            .all:nth-of-type(2){
                width: 125px;
                text-align: left;
            }
            .all:nth-of-type(3){
                width: 119px;
                text-align: right;
            }
            .all:nth-of-type(4){
                width: 166px;
                text-align: right;
            }
            .all:nth-of-type(5){ 
                width: 150px;
                text-align: right;
            }
            .all:nth-of-type(6){
                width: 132px;
                text-align: center;
            }
            .all:nth-of-type(7){
                width: 120px;
                text-align: center;
            }
            .all:nth-of-type(8){
                width: 125px;
                text-align: center;
            }
            .all:nth-of-type(9){
                width: 85px;
                text-align: center;
            }
            .all:nth-of-type(10){
                width: 155px;
                text-align: center;
            }
            // .all:nth-of-type(4),.all:nth-of-type(5),.all:nth-of-type(6),.all:nth-of-type(7),.all:nth-of-type(8){
            //     text-align: right;
            //     padding-right: 10px;
                
            // }
            // .all:nth-of-type(4){
            //     width: 312 / 1200*100%
            // }
            // .all:nth-of-type(4),.all:nth-of-type(5){
            //     width: 180px;
            // }
            // .all:nth-of-type(3){
            //     width: 160px;
            // }
        }
        .alltitle{
            font-size: 14px;
            .all div{
                height: 54px;
                img{
                    vertical-align: -2px;
                    margin-right: 7px;
                }
            }
            .all:hover div{
                border-bottom: 2px solid #dddee1;
               img{
                   display: inline;
               }
            }
            .all:nth-of-type(1) div{
                border: 0;
            }
        }
        .pd{
            height:$tableheight;
            line-height: $tableheight;
            color: $basecolor;
            background-color: #fff;
            border-bottom: 1px solid #f2f2f2;
            .all:nth-of-type(1){
                color: #999;
            }
            &:hover{
                background-color: $bg;
            }
            img{
                width: 25px;
                margin-top:15px;
                float: left;
            }
            td{
                font-size: 14px;
            }
            
        }
        .outpage{
            height: 66px;
        }
        svg{
                vertical-align: middle;
        }
    }
}
</style>

