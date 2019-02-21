<template>
    <div id="data-box">
        <div class="headlist">红黑榜是XXXXXXXXXXXXXX</div>
        <div class="red-box">
            <p class="name">{{name_list[0][langaaaa]}}</p>
            <ul class="red-ul">
                <li>
                    <div class="title">
                        <span>
                            <span class="maintitle">{{title_list[0][langaaaa].main_title}}</span>
                            <span class="subtitle">{{title_list[0][langaaaa].subtitle}}</span>
                        </span>
                    </div>
                    <table class="table">
                        <tr class="table-head">
                            <td>{{table_list[langaaaa][0]}}</td>
                            <td>{{table_list[langaaaa][1]}}</td>
                            <td>{{table_list[langaaaa][2]+money_sym[langaaaa]}}</td>
                            <td>{{table_list[langaaaa][3]}}</td>
                        </tr>
                        <tr class="table-con" v-for="index in 14" :key="index">
                            <td><span>1</span></td>
                            <td>
                                <img src="../../static/reddit1.png" alt="">
                                <span>BTC</span>
                            </td>
                            <td><span>6,437.27</span></td>
                            <td><span>78.43%</span></td>
                        </tr>
                    </table>
                </li>
                <li>
                    <div class="title">
                        <span>
                            <span class="maintitle">{{title_list[1][langaaaa].main_title}}</span>
                            <span class="subtitle">{{title_list[1][langaaaa].subtitle}}</span>
                        </span>
                    </div>
                    <table class="table">
                        <tr class="table-head">
                            <td>{{table_list[langaaaa][0]}}</td>
                            <td>{{table_list[langaaaa][1]}}</td>
                            <td>{{table_list[langaaaa][2]+money_sym[langaaaa]}}</td>
                            <td>{{table_list[langaaaa][4]+money_sym[langaaaa]}}</td>
                        </tr>
                        <tr class="table-con" v-for="index in 14" :key="index">
                            <td><span>1</span></td>
                            <td>
                                <img src="../../static/reddit1.png" alt="">
                                <span>BTC</span>
                            </td>
                            <td><span>6,437.27</span></td>
                            <td><span>4,571,600,000</span></td>
                        </tr>
                    </table>
                </li>
                <li>
                    <div class="title">
                        <span>
                            <span class="maintitle">{{title_list[2][langaaaa].main_title}}</span>
                            <span class="subtitle">{{title_list[2][langaaaa].subtitle}}</span>
                        </span>
                    </div>
                    <table class="table">
                        <tr class="table-head">
                            <td>{{table_list[langaaaa][0]}}</td>
                            <td>{{table_list[langaaaa][1]}}</td>
                            <td>{{table_list[langaaaa][2]+money_sym[langaaaa]}}</td>
                            <td>{{table_list[langaaaa][3]}}</td>
                        </tr>
                        <tr class="table-con" v-for="index in 14" :key="index">
                            <td><span>1</span></td>
                            <td>
                                <img src="../../static/reddit1.png" alt="">
                                <span>BTC</span>
                            </td>
                            <td><span>6,437.27</span></td>
                            <td><span>78.43%</span></td>
                        </tr>
                    </table>
                </li>
                <li>
                    <div class="title">
                        <span>
                            <span class="maintitle">{{title_list[3][langaaaa].main_title}}</span>
                            <span class="subtitle">{{title_list[3][langaaaa].subtitle}}</span>
                        </span>
                    </div>
                    <table class="table">
                        <tr class="table-head">
                            <td>{{table_list[langaaaa][0]}}</td>
                            <td>{{table_list[langaaaa][1]}}</td>
                            <td>{{table_list[langaaaa][2]+money_sym[langaaaa]}}</td>
                            <td>{{table_list[langaaaa][5]}}</td>
                        </tr>
                        <tr class="table-con" v-for="index in 14" :key="index">
                            <td><span>1</span></td>
                            <td>
                                <img src="../../static/reddit1.png" alt="">
                                <span>BTC</span>
                            </td>
                            <td><span>6,437.27</span></td>
                            <td><span>78.43%</span></td>
                        </tr>
                    </table>
                </li>
                <li>
                    <div class="title">
                        <span>
                            <span class="maintitle">{{title_list[4][langaaaa].main_title}}</span>
                            <span class="subtitle">{{title_list[4][langaaaa].subtitle}}</span>
                        </span>
                    </div>
                    <table class="table">
                        <tr class="table-head">
                            <td>{{table_list[langaaaa][0]}}</td>
                            <td>{{table_list[langaaaa][1]}}</td>
                            <td>{{table_list[langaaaa][2]+money_sym[langaaaa]}}</td>
                            <td>{{table_list[langaaaa][6]}}</td>
                        </tr>
                        <tr class="table-con" v-for="index in 14" :key="index">
                            <td><span>1</span></td>
                            <td>
                                <img src="../../static/reddit1.png" alt="">
                                <span>BTC</span>
                            </td>
                            <td><span>6,437.27</span></td>
                            <td><span>78.43%</span></td>
                        </tr>
                    </table>
                </li>
                <li>
                    <div class="title">
                        <span>
                            <span class="maintitle">{{title_list[5][langaaaa].main_title}}</span>
                        </span>
                    </div>
                    <div id="exchange"></div>
                </li>
            </ul>
        </div>
        <div class="black-box">
            <p class="name">{{name_list[1][langaaaa]}}</p>
            <ul class="black-ul">
                <li>
                    <div class="title">
                        <span>
                            <span class="maintitle">{{title_list[0][langaaaa].main_title}}</span>
                            <span class="subtitle">{{title_list[0][langaaaa].subtitle}}</span>
                        </span>
                    </div>
                    <table class="table">
                        <tr class="table-head">
                            <td>{{table_list[langaaaa][0]}}</td>
                            <td>{{table_list[langaaaa][1]}}</td>
                            <td>{{table_list[langaaaa][2]+money_sym[langaaaa]}}</td>
                            <td>{{table_list[langaaaa][3]}}</td>
                        </tr>
                        <tr class="table-con" v-for="index in 14" :key="index">
                            <td><span>1</span></td>
                            <td>
                                <img src="../../static/reddit1.png" alt="">
                                <span>BTC</span>
                            </td>
                            <td><span>6,437.27</span></td>
                            <td><span>78.43%</span></td>
                        </tr>
                    </table>
                </li>
                <li>
                    <div class="title">
                        <span>
                            <span class="maintitle">{{title_list[1][langaaaa].main_title}}</span>
                            <span class="subtitle">{{title_list[1][langaaaa].subtitle}}</span>
                        </span>
                    </div>
                    <table class="table">
                        <tr class="table-head">
                            <td>{{table_list[langaaaa][0]}}</td>
                            <td>{{table_list[langaaaa][1]}}</td>
                            <td>{{table_list[langaaaa][2]+money_sym[langaaaa]}}</td>
                            <td>{{table_list[langaaaa][4]+money_sym[langaaaa]}}</td>
                        </tr>
                        <tr class="table-con" v-for="index in 14" :key="index">
                            <td><span>1</span></td>
                            <td>
                                <img src="../../static/reddit1.png" alt="">
                                <span>BTC</span>
                            </td>
                            <td><span>6,437.27</span></td>
                            <td><span>4,571,600,000</span></td>
                        </tr>
                    </table>
                </li>
                <li>
                    <div class="title">
                        <span>
                            <span class="maintitle">{{title_list[2][langaaaa].main_title}}</span>
                            <span class="subtitle">{{title_list[2][langaaaa].subtitle}}</span>
                        </span>
                    </div>
                    <table class="table">
                        <tr class="table-head">
                            <td>{{table_list[langaaaa][0]}}</td>
                            <td>{{table_list[langaaaa][1]}}</td>
                            <td>{{table_list[langaaaa][2]+money_sym[langaaaa]}}</td>
                            <td>{{table_list[langaaaa][3]}}</td>
                        </tr>
                        <tr class="table-con" v-for="index in 14" :key="index">
                            <td><span>1</span></td>
                            <td>
                                <img src="../../static/reddit1.png" alt="">
                                <span>BTC</span>
                            </td>
                            <td><span>6,437.27</span></td>
                            <td><span>78.43%</span></td>
                        </tr>
                    </table>
                </li>
                <li style="height:330px">
                    <div class="title">
                        <span>
                            <span class="maintitle">{{title_list[6][langaaaa].main_title}}</span>
                        </span>
                    </div>
                    <div id="skill"></div>
                </li>
                  <li style="height:330px">
                    <div class="title">
                        <span>
                            <span class="maintitle">{{title_list[7][langaaaa].main_title}}</span>
                        </span>
                    </div>
                    <table class="table">
        
                        <tr class="table-con" v-for="index in 10" :key="index">
                            <td><span>1</span></td>
                            <td>
                                <span>BTC</span>
                            </td>
                            <td><span>78.43%</span></td>
                        </tr>
                    </table>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {mapState} from 'Vuex';

export default {
    data(){
        return{
            langaaaa:0,
            name_list:[
                ['红榜','red'],
                ['黑榜','black'],
            ],
            title_list:[
                [{main_title:'最大涨幅',subtitle:'(24h交易量前100)'},{main_title:'',subtitle:''}],
                [{main_title:'24H交易量最高',subtitle:'(流通市值前100)'},{main_title:'',subtitle:''}],
                [{main_title:'近30日新高',subtitle:'(流通市值前100)'},{main_title:'',subtitle:''}],
                [{main_title:'振幅',subtitle:'(流通市值前100)'},{main_title:'',subtitle:''}],
                [{main_title:'换手率',subtitle:'(流通市值前100)'},{main_title:'',subtitle:''}],
                [{main_title:'上线交易所数量排行',subtitle:''},{main_title:'',subtitle:''}],
                [{main_title:'技术指数Top10',subtitle:''},{main_title:'',subtitle:''}],
                [{main_title:'社交指数Top',subtitle:''},{main_title:'',subtitle:''}],
            ],
            table_list:[
                ['#','名称','价格/','涨幅','交易量/','振幅','换手率'],
                ['#','名称','价格/','涨幅','交易量/','振幅','换手率'],
            ]
        }
    },
    created(){},
    mounted(){
      this.draw_exchange();
      this.draw_skill();
    },
    methods:{
        draw_exchange(){
            var option = {
                color:'#a376d4',
                title: {
                    text: '',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    top:'1%',
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: ['BTC','ETH','XRT','DFR','DGT','WER','VCB','BNM','DFG','ASE','VCX','TER','HIU']
                },
                series: [
                    {
                        name: '交易所数量',
                        type: 'bar',
                        data: [324, 234, 434, 232, 123, 445,324, 234, 434, 232, 123, 445,965]
                    }
                ]
            };
            var echarts = require("echarts");
            var myChart = echarts.init(document.getElementById("exchange"));
            myChart.setOption(option);
            setTimeout(function() {
                window.onresize = function() {
                    myChart.resize();
                };
            }, 200);
        },
        draw_skill(){
            var option = {
                color:'#a376d4',
                    title: {
                        text: '',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        top:'1%',
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: ['BTC','ETH','XRT','DFR','DGT','WER','VCB','BNM','DFG','ASE','VCX','TER','HIU']
                    },
                    series: [
                        {
                            name: '交易所数量',
                            type: 'bar',
                            data: [324, 234, 434, 232, 123, 445,324, 234, 434, 232, 123, 445,965]
                        }
                    ]
                };
            var echarts = require("echarts");
            var myChart = echarts.init(document.getElementById("skill"));
            myChart.setOption(option);
            setTimeout(function() {
                window.onresize = function() {
                    myChart.resize();
                };
            }, 200);
        },
    },
    computed:{
        ...mapState(["usd_cny",'lanfalg','money_sym']),
    }
}
</script>
<style lang="scss" scoped>
#data-box{
    width: 100%;
    text-align: left;
    .headlist{
        width: 100%;
        height: 73px;
        background-color: #ffffff;
        border-radius: 5px;
        padding-left: 20px;
        line-height: 73px;
        color: #333333;
        font-size: 14px;
        margin-top: 11px;
    }
    .red-box,.black-box{
        .name{
            line-height: 46px;
            font-size: 14px;
            color: $color;
            height: 46px;
            width: 100%;
            font-weight: 600;
        }
        .red-ul,.black-ul{
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            
            li{
                height: 455px;
                background-color: #ffffff;
                border-radius: 5px;
                width: calc((100% - 40px) / 3);
                padding-left: 20px;
                padding-right: 20px;
                padding-bottom: 5px;
                margin-bottom: 12px;
                .title{
                    width: 100%;
                    height: 55px;
                    line-height: 54px;
                    border-bottom: 1px solid #f2f2f2;
                    margin-bottom: 6px;
                    .maintitle{
                        color: #333333;
                        font-size: 14px;
                        font-weight: 600;
                    }
                    .subtitle{
                        font-size: 12px;
                        color: #999999;
                    }
                }
                #exchange,#skill{
                    width: 100%;
                    height:calc(100% - 60px) ;
                }
                .table{
                    width: 100%;
                    
                    .table-head,.table-con{
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        flex-wrap: nowrap;
                    }
                    td{
                        color: #999999;
                        font-size: 14px;
                        height: 24px;
                        line-height: 24px;
                        img{
                            height: 14px;
                            width: 14px;
                            position: absolute;
                            left: -20px;
                            top: 5px;
                        }
                    }
                    .table-con td{
                        color: #333;
                        position: relative;
                    }
                    td:nth-of-type(1){
                        width: 30px;
                    }
                    td:nth-of-type(2){
                        width: 80px;
                     
                    }
                    td:nth-of-type(3){
                        width: 95px;
                    }
                    td:nth-of-type(4){
                        width: 72px;
                        text-align: right
                    }
                }
            }
            li:nth-of-type(3n+2){
                margin-left: 20px;
                margin-right: 20px;
            }
        }
    }
}
</style>
