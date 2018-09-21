<template>
<div class="baseout">
    <div class="cont1">
        <p class="top">
              由中本聪在2009年提出，据其思路设计发布的开源软件以及建构其上的P2P网络。比特币依据特定算法，通过大量的计算产生，不依靠特定货币机构发行，其使用整个P2P网络中众多节点构成的分布式数据库来确认并记录所有的交易行为，并使用密码学设计确保货币流通各个环节安全性，可确保无法通过大量制造比特币来人为操控币值。基于密码学的设计可以使比特币只能被真实的拥有者转移或支付及兑现。同样确保了货币所有权与流通交易的匿名性。比特币总数有限，其总数量将被限制在2100万个。
        </p>
        <div class="info">
            <div class="incont">
                <div class="modl" v-for="(item,index) in baseinfo">
                    <div class="left">
                        <p v-for="itt in item.title">{{itt[0]}}</p>
                    </div>
                    <div class="right">
                        <p v-for="itt in item.value">{{itt}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="basebox">
        <div class="box">
            <div class="box_detail">
                <p>
                    社交媒体 
                </p>
                <div class="detail_left">
                    <div class="most_left">
                        <p>1221</p>
                        <p>1221</p>
                        <p>1221</p>
                        <p>1221</p>
                        <p>1221</p>
                    </div>
                    <div  class="most_right">
                        <p><img src="../../../static/logo1.png" alt=""></p>
                        <p><img src="../../../static/logo1.png" alt=""></p>
                        <p><img src="../../../static/logo1.png" alt=""></p>
                        <p><img src="../../../static/logo1.png" alt=""></p>
                        <p><img src="../../../static/logo1.png" alt=""></p>
                    </div>
                </div>
                <div class="detail_right">
                    <div class="most_left">
                        <p>1221</p>
                        <p>1221</p>
                        <p>1221</p>
                        <p>1221</p>
                    </div>
                    <div  class="most_right">
                        <p><img src="../../../static/logo1.png" alt=""></p>
                        <p><img src="../../../static/logo1.png" alt=""></p>
                        <p><img src="../../../static/logo1.png" alt=""></p>
                        <p><img src="../../../static/logo1.png" alt=""></p>
                    </div>
                </div>
            </div>
        </div>

        <div class="box">
            <div class="box_detail">
                <p>
                    众筹信息 
                </p>
                <div style="overflow:hidden;">
                    <div class="tego_left">
                        <p>q32312</p>
                        <p>q32312</p>
                        <p>q32312wqeee</p>
                    </div>
                    <div class="tego_left">
                        <p>3423123</p>
                        <p>q32312</p>
                        <p>q32312</p>
                    </div>
                </div>
                    
                <p class="pictitle">tututu</p>
                <div class="outbasechart">
                    <div id="basechart">
                        
                    </div>
                </div>
                
            </div>
        </div>

        <div class="box">
            <div class="box_detail">
                <p>
                    路线图 
                </p>
                <div class="showtime">
                    <div class="alltime">
                        <div class="timecont"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Highcharts from 'highcharts/highstock';
export default {
    data(){
        return{
            baseinfo:''
        }
    },
    created(){
        var bbc = alllanguage.base.baseinfo
        this.baseinfo=[{
            title:[bbc[0],bbc[1]],
            value:[1221,342]
        },{
            title:[bbc[2],bbc[3]],
            value:[1221,342]
        },{
            title:[bbc[4],bbc[5]],
            value:[1221,342]
        }]
    },
    mounted(){
        this.draw()
    },
    methods:{
        draw(){
            var chart = Highcharts.chart('basechart', {
                chart: {
                    spacing : [40, 0 , 40, 0]
                },
                title: {
                    floating:true,
                    text: ''
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        },
                        point: {
                            events: {
                                mouseOver: function(e) {  // 鼠标滑过时动态更新标题
                                    // 标题更新函数，API 地址：https://api.hcharts.cn/highcharts#Chart.setTitle
                                    chart.setTitle({
                                        text: e.target.name+ '\t'+ e.target.y + ' %'
                                    });
                                }
                            }
                        },
                    }
                },
                series: [{
                    type: 'pie',
                    innerSize: '80%',
                    name: '市场份额',
                    data: [
                        {name:'Firefox',   y: 45.0, url : 'http://bbs.hcharts.cn'},
                        ['IE',       26.8],
                        {
                            name: 'Chrome',
                            y: 12.8,
                            sliced: true,
                            selected: true,
                            url: 'http://www.hcharts.cn'
                        },
                        ['Safari',    8.5],
                        ['Opera',     6.2],
                        ['其他',   0.7]
                    ]
                }]
            }, function(c) { // 图表初始化完毕后的会掉函数
                // 环形图圆心
                var centerY = c.series[0].center[1],
                    titleHeight = parseInt(c.title.styles.fontSize);
                // 动态设置标题位置
                c.setTitle({
                    y:centerY + titleHeight/2
                });
            });
        }
    }
}
</script>

<style scoped  lang="scss">
::-webkit-scrollbar {display:none}
.baseout{
    .cont1{
        padding: 20px;
        background-color: #fff;
        .top{
            width: 100%;
            border-bottom: 1px solid $border;
            text-align: left;
            padding-bottom: 20px;
        }
        .info{
            width: 100%;
            margin-top: 20px;
            .incont{
                display: flex;
                justify-content:space-between;
                overflow: hidden;
                .modl{
                    text-align: left;
                    min-width: 390px;
                    font-size: 12px;
                    .left{
                        float: left;
                        margin-right: 30px;
                        color: #999;
                        p:nth-of-type(2){
                            margin-top: 20px;
                        }
                    }
                    .right{
                        float: left;
                        color: #666;
                        margin-top: 2px;
                        p:nth-of-type(2){
                            margin-top: 22px;
                        }
                    }
                }
            }
        }
    }
    .basebox{
        display: flex;
        justify-content:space-between;
        
        .box{
            width: 33.33%;
            min-width: 387px;
            .box_detail{
                height: 400px;
                padding: 20px 20px 20px 20px;
                background-color: #fff;
                margin: 20px 10px;
                border-radius: 5px;
                text-align: left;
                overflow: hidden;
                position: relative;
                p{
                    font-size: 16px;
                    border-bottom: 1px solid $border;
                    padding-bottom: 17px;
                    margin-bottom: 13px;
                }
                .detail_left{
                    float: left;
                    min-width: 120px;
                    overflow: hidden;
                    
                    .most_left{
                        float: left;
                        margin-top: 4px;
                        p{
                           @include fontwave;
                            color: $subcolor;
                            font-size: 14px;
                        }
                    }
                    .most_right{
                        float: right;
                        p{
                            border: none;
                            margin-bottom: 2px;
                            font-size: 14px;
                            img{
                                width: 25px;
                            }
                        }
                    }
                }
                .detail_right{
                    float: right;
                    min-width: 120px;
                    overflow: hidden;
                    .most_left{
                        float: left;
                        margin-top: 4px;
                        p{
                            color: $subcolor;
                            font-size: 14px;
                            @include fontwave;
                        }
                    }
                    .most_right{
                        float: right;
                        p{
                            border: none;
                            font-size: 14px;
                            margin-bottom: 2px;
                            img{
                                width: 25px;
                            }
                        }
                    }
                }
                .tego_left{
                    float: left;
                    height: 124px;
                    margin-right: 20px;
                    
                    p{
                        @include fontwave;
                        font-size: 14px;
                    }
                }
                .tego_left:nth-of-type(1){
                    color: $subcolor;
                }
                .pictitle{
                    border:  0;
                    color: $subcolor;
                    margin-top: 30px;
                }
                .outbasechart{
                    position: absolute;
                    width: 300px;
                    height: 170px;
                    bottom: 20px;
                    left: 80px;
                    overflow: hidden;
                    #basechart{
                        width: 400px;
                        height: 250px;
                        margin-top: -70px;
                        margin-left: -80px;
                    }
                }
                .showtime{
                    width: 100%;
                    height: 312px;
                    overflow: scroll;
                    .alltime{
                        width: 100%;
                        height: 1000px;
                        padding-left: 10px;
                        border-image: url('../../../static/dashed.png') 30 1 round;
                        .timecont{
                            width: 100%;
                            height: 100px;
                            
                        }
                    }
                }
            }
        }
        .box:nth-of-type(1) .box_detail{
            margin-left: 0px;
        }
        .box:nth-of-type(3) .box_detail{
            margin-right: 0px;
        }
    }
}
</style>
