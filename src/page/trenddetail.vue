<template>
    <div id="tdd-box">
        <p class="bread-crumb">
            <span @click="goto_back">{{index_list[lanfalg]}}</span>
            <span> > </span>
            <span>{{coin_name}}</span>
        </p>
        <div class="tdd-header clearfix">
            <div class="tdd-left">
                <div class="con-top clearfix">
                    <div class="img">
                        <img :src="list.icon" alt="">
                    </div>
                    <p class="name">
                        <span>{{list.short_name}}</span>
                        <span>({{name_list[lanfalg]}})</span>
                    </p>
                </div>
                <div class="content">
                    Steem 定位于一个基于区块链的社交媒体平台，旨在通过 Token 经济对内容生产者产生激励，使得传统的社交媒体和网上社区更加活跃。
                </div>
                <div class="quotes">
                    <span>{{quotes_word[0][lanfalg]}}:</span>
                    <span  @click="goto_index('steem')">STEEM</span>
                    <span >SP</span>
                    <span >SBD</span>
                </div>
            </div>
            <div class="tdd-right clearfix">
                <ul class="tdd-nav">
                    <li @click="change_nav(0)" :class="tdd_nav===0?'tdd-nav-active':''">{{nav_word[0][lanfalg]}}</li>
                    <li></li>
                    <li :class="tdd_nav===1?'tdd-nav-active':''"  @click="change_nav(1)">{{nav_word[1][lanfalg]}}</li>
                </ul>
                <div class="tdd-right-word" v-show="tdd_nav===1">
                    SMT，全称为 Smart Media Tokens，即一套支持生成代币的智能合约，可以使其他内容开发者使用，发行属于其自身体系的代币。SMT 主要是为了将 Steemit 的成功经验赋能给其他的内容开发者，包括共识机制、激励体系等方面，最终丰富 Steem 的内容开发生态。
                    <br/><br/><br/>SMT合约目前在Steem代码库中没有关于SMT的具体体现，只在一些协议中找到相关代码。另外目前SMT的应用主要针对特定企业用户，所以推断目前SMT的应用需要特殊权限，还没有大量的应用落地。
                </div>
                <div id="p-chain" v-show="tdd_nav===0"></div>
                <table class="tdd-table" border="1" cellpadding='0' cellspacing='0' width="100%" v-show="tdd_nav===0">
                    <tr>
                        <td v-for="(item,index) in tdd_table_name[lanfalg]" :key="index">{{item}}</td>
                    </tr>
                    <tr class="tdd-table-td">
                        <td>21</td>
                        <td>--</td>
                        <td>10000</td>
                        <td>DPOS</td>
                        <td>Graphene (石墨烯)</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="tdd-choose clearfix">
            <div v-for="(item,index) in tdd_choose_name[lanfalg]" :key="index" :class="choose_nav===index?'choose':''" @click="change_choose(index)">{{item}}</div>
        </div>
        <div class="nav-box">
            <pro-trend v-if="choose_nav === 0"></pro-trend>
            <info-trend v-if="choose_nav === 1"></info-trend>
        </div>
    </div>
</template>
<script>
import newfn from '../../static/base/base.js';
import {mapState} from 'Vuex';
import proTrend from '../components/producttrend';
import infoTrend from '../components/infotrend';
export default {
    components:{
        proTrend,infoTrend
    },
    data() {
        return {
            quotes_word:[
                ['关联币种','Related Coins']
            ],
            coin_name:'',
            index_list:['趋势','Tendency'],
            tdd_table_name:[
                ['Dapps数量','合约调用次数','TPS','共识机制','技术'],
                ['Dapps','Transactions','TPS','Consensus','Technical'],
            ],
            tdd_choose_name:[
                ['变化趋势','基本信息'],
                ['Trends','Basic Info']
            ],
            choose_nav:0,
            list:[],
            name_list:[],
            tdd_nav:0,
            nav_word:[
                ['公链','Chain'],
                ['合约','Contract']
            ]
        };
    },
    created(){
        this.coin_name = this.upfirst(this.$route.query.coin);
       


    },
    mounted() {
         this.$ajax.get(this.host+"/tokenrank/V2/tokenTradeDetail.json", {
            params: { code: 'steem' }
        }).then(res=>{
            this.list = res.data.data;
            this.name_list.push(this.list.name);
            this.name_list.push(this.list.en_name);
            console.log( this.name_list)
        })
        setTimeout(() => {
            //活跃用户 cnt_user_new_active  user_active_list  活跃地址
            //活跃的唯一用户 cnt_user_new   user_new_list   新增地址
             //交易次数  cnt_transaction  transaction_list
            this.draw(this.$store.state.user_active_list,this.$store.state.transaction_list,this.$store.state.user_new_list,this.$store.state.data_time_list);
        }, 1000);
    },
    methods: {
        change_nav(index){
            this.tdd_nav = index;
        },
        goto_back(){
            this.$router.push({
                path:'/trend'
            })
        },
        goto_index(name){
            this.$router.push({
                path:'./coindetail',
                query:{
                    id:name
                }
            })
        },
        change_choose(index){
            this.choose_nav = index;
        },
        //首字母大写
        upfirst(name) {
            return name.substring(0, 1).toUpperCase() + name.substring(1);
        },
        draw(arr1,arr2,arr3,time) {
            var echarts = require("echarts");
            var myChart = echarts.init(document.getElementById("p-chain"));
            var option = {
                title: {
                    text: ""
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: [
                        "新增地址",
                        "交易次数",
                        "活跃地址"
                    ],
                    y: "bottom"
                },
                color:['#FFEB8C','#95F2F4','#77C2E8'],
                grid: {
                    top: "20",
                    left: "20",
                    right: "40",
                    bottom: "20",
                    containLabel: true
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data:time
                },
                yAxis: {
                    type: "value"
                },
                series: [
                    {
                        name: "新增地址",
                        type: "line",
                        data: arr3
                    },
                    {
                        name: "交易次数",
                        type: "line",
                        data: arr2
                    },
                    {
                        name: "活跃地址",
                        type: "line",
                        data: arr1
                    },
                ]
            };
            myChart.setOption(option);
            setTimeout(function() {
                window.onresize = function() {
                    myChart.resize();
                };
            }, 200);
        }
    },
    computed:{
        ...mapState(['lanfalg','usd_cny','money_sym','user_active_list','user_new_list','transaction_list','data_time_list'])
    }
};
</script>
<style lang="scss" scoped>
#tdd-box {
    padding: 0 70px;
    .bread-crumb {
        text-align: left;
        line-height: 45px;
        font-size: 14px;
        span {
            color: #333;
        }
        span:nth-of-type(3) {
            color: $color;
        }
    }
    .tdd-header {
        width: 100%;
        height: 342px;
        .tdd-left {
            width: 33%;
            height: 100%;
            background-color: #ffffff;
            border-radius: 5px;
            float: left;
            box-sizing: border-box;
            padding: 40px;
            position: relative;
            .con-top {
                height: 50px;
                margin-bottom: 23px;
                .img {
                    margin-right: 20px;
                    float: left;
                    width: 50px;
                    height: 50px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .name {
                    line-height: 50px;
                    float: left;
                    letter-spacing: 2px;
                    color: #000;
                    span:nth-of-type(2) {
                        color: #999;
                    }
                }
            }
            .content {
                text-align: left;
                line-height: 21px;
                font-size: 14px;
                letter-spacing: 1px;
                color: #000000;
            }
            .quotes {
                position: absolute;
                left: 40px;
                bottom: 40px;
                font-size: 14px;
                width: 100%;
                color: #999;
                text-align: left;
                span{
                    margin-right: 5px;
                }
                span:nth-of-type(2){
                    cursor: pointer;
                    color: $color;
                }
            }
        }
        .tdd-right {
            height: 100%;
            box-sizing: border-box;
            padding: 26px 40px 28px;
            position: relative;
            background: #fff;
            width: calc(67% - 20px);
            float: right;
            text-align: left;
            .tdd-nav {
                float: right;
                display: flex;
                justify-content: flex-start;
                flex-wrap: nowrap;
                li {
                    letter-spacing: 1px;
                    color: #999999;
                    font-size: 14px;
                    line-height: 16px;
                    cursor: pointer;
                }
                li:nth-of-type(2) {
                    height: 12px;
                    width: 1px;
                    margin-top: 2px;
                    background-color: #f2f2f2;
                    margin-left: 10px;
                    margin-right: 10px;
                }
                .tdd-nav-active {
                    color: $color;
                }
            }
            .tdd-right-word,
            #p-chain {
                width: 100%;
                float: left;
                line-height: 21px;
                letter-spacing: 1px;
                font-size: 14px;
            }
            .tdd-right-word {
                margin-top: 30px;
            }
            #p-chain {
                margin-top: 10px;
                height: 165px;
            }
            .tdd-table {
                margin-top: 10px;
                float: left;
                border: 1px solid #f2f2f2;
                height: 80px;
                text-align: center;
                color: #999999;
                font-size: 14px;
                .tdd-table-td{
                    color: #303030;
                }
            }
        }
    }
    .tdd-choose {
       margin-top: 20px;
        height: 42px;
        
        div{
            background-color: #edeef7;
            float: left;
            min-width: 128px;
            line-height: 42px;
            color: #333;
            letter-spacing: 1px;
            cursor: pointer;
            padding-left: 10px;
            padding-right: 10px;
        }
        div:nth-of-type(1){
            border-radius: 5px 0px 0px 0px;
        }
        div:nth-of-type(2){
            border-radius: 0px 5px 0px 0px;
        }
        div.choose{
            background-color: #fff;
            color:$color;
            
        }
    }
    .nav-box{
        width: 100%;
        min-height: 500px;
        background: #fff;
    }
}
</style>
