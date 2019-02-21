<template>
    <div id="tdd-box">
        <div class="tdd-header">
            <div class="tdd-img clearfix">
                <img :src="list.icon" alt="">
                <span class="word">{{list.short_name}}</span>
                <span class="word">({{name_list[lanfalg]}})</span>
                <div class="quotes">
                    <span>{{quotes_word[0][lanfalg]}}:</span>
                    <span  @click="goto_index('steem')">STEEM</span>
                    <span >SP</span>
                    <span >SBD</span>
                </div>
            </div>
            <div class="content">
                Steem 定位于一个基于区块链的社交媒体平台，旨在通过 Token 经济对内容生产者产生激励，使得传统的社交媒体和网上社区更加活跃。
            </div>
            
            <div class="tdd-table clearfix">
                <p class="title">{{quotes_word[1][lanfalg]}}</p>
                <div id="p-chain"></div>
                <ul class="tdd-table-left">
                    <li v-for="(item,index) in tdd_table_name[lanfalg]" :key="index">{{item}}</li>
                </ul>
                <ul class="tdd-table-right">
                    <li v-for="(item,index) in tdd_table_con[lanfalg]" :key="index">{{item}}</li>
                </ul>
            </div>
            <div class="heyve">
                <div class="title">{{quotes_word[2][lanfalg]}}</div>
                <div class="con">SMT，全称为 Smart Media Tokens，即一套支持生成代币的智能合约，可以使其他内容开发者使用，发行属于其自身体系的代币。SMT 主要是为了将 Steemit 的成功经验赋能给其他的内容开发者，包括共识机制、激励体系等方面，最终丰富 Steem 的内容开发生态。<br/><br/>SMT合约目前在Steem代码库中没有关于SMT的具体体现，只在一些协议中找到相关代码。另外目前SMT的应用主要针对特定企业用户，所以推断目前SMT的应用需要特殊权限，还没有大量的应用落地。</div>
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
import proTrend from '../phcom/producttrend';
import infoTrend from '../phcom/infotrend';
import {mapState} from 'Vuex';
export default {
    components:{
        proTrend,infoTrend
    },
    data() {
        return {
            quotes_word:[
                ['关联币种','Related Coins'],
                ['公链','Chain'],
                ['合约','Contract']
            ],
            coin_name:'',
            index_list:['趋势','Tendency'],
            tdd_table_name:[
                ['Dapps数量','合约调用次数','TPS','共识机制','技术'],
                ['Dapps','Transactions','TPS','Consensus','Technical'],
            ],
            tdd_table_con:[
                ['21','--','10000','DPOS','Graphene (石墨烯)'],
                ['21','--','10000','DPOS','Graphene (石墨烯)'],
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
    mounted(){
        this.$ajax.get(this.host+"/tokenrank/V2/tokenTradeDetail.json", {
            params: { code: 'steem' }
        }).then(res=>{
            this.list = res.data.data;
            this.name_list.push(this.list.name);
            this.name_list.push(this.list.en_name);
            console.log( this.name_list)
        })
        setTimeout(() => {
            this.draw(this.$store.state.user_active_list,this.$store.state.transaction_list,this.$store.state.user_new_list,this.$store.state.data_time_list);
        }, 1000);
    },
    methods:{
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
                    top: "10",
                    left: "0",
                    right: "10",
                    bottom: "30",
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
}
</script>
<style lang="scss" scoped>
#tdd-box{
    text-align: left;
    margin-top: 0.96rem !important;
    .tdd-header{
        background: #ffffff;
        padding-top: 0.24rem;
        padding-left: 0.24rem;
        padding-right: 0.24rem;
        .tdd-img{
            height: 1rem;
            line-height: 1rem;
            img{
                width: 1rem;
                height: 1rem;
                float: left;
                margin-right: 0.2rem;
            }
            .word{
                float: left;
                height: 0.5rem;
                line-height: 0.5rem;
                font-size: 0.32rem; 
                letter-spacing: 0.03rem;
	            color: #000000;
            }
            .word:nth-of-type(2){
                color: #999999;
               
            }
            .quotes{
                float: left;
                width: calc(100% - 1.2rem);
                line-height: 0.5rem;
                font-size: 0.28rem;
                color: #999;
                span{
                    margin-right: 5px;
                }
                span:nth-of-type(2){
                    color: $color;
                }
            }
        }
        .content{
            margin-top: 0.4rem;
            margin-bottom: 0.4rem;
            line-height: 0.42rem;
            letter-spacing: 0.01rem;
            color: #000000;
            font-size: 0.28rem;
        }
    
        .tdd-table{
            margin-bottom: 0.4rem;
            .title{
                letter-spacing: 0.03rem;
	            color: #999999;
                font-size: 0.28rem;
                line-height: 0.4rem;
            }
            #p-chain{
                width: 100%;
                height: 3.2rem;
            }
            .tdd-table-left,.tdd-table-right{
                margin-top: 0.1rem;
                float: left;
                width: 2.9rem;
                color: #999999;
	            font-size: 0.28rem;
                li{
                    height: 0.6rem;
                    line-height: 0.6rem;
                }
            }
            .tdd-table-right{
                color: #303030;
                margin-left: 0.5rem;
            }
        }
        .heyve{
            .title{
                letter-spacing: 0.03rem;
	            color: #999999;
                font-size: 0.28rem;
                line-height: 0.4rem;
            }
            .con{
                font-size: 0.28rem;
                color: #000000;
                line-height: 0.42rem;
                margin-top: 0.1rem;
                padding-bottom: 0.4rem;
            }
        }
    }
    .tdd-choose{
        margin-top: 0.08rem;
        border-bottom: 0.01rem solid #e5e5e5;
        width: 100%;
        div{
            width: 50%;
            text-align: center;
            line-height: 0.78rem;
            height: 0.78rem;
            color: #999999;
            font-size: 0.32rem;
            float: left;
            background: #fff;
        }
         div.choose{
            color:$color;    
        }
    }
}
</style>
