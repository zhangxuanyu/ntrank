<template>
    <div class="rank_box">
        <p class="alltitle">
            <span class="title_tips">{{top_title[showType].title[$store.state.lanfalg-1]}}</span>          
        </p>
        <!-- <div :id="'mychart'+showType" class="formychart"></div> -->
        <div class="formychart">
            {{content_chart[$store.state.lanfalg-1]}}
        </div>
    </div>
</template>

<script>
import newfn from '../../../static/base/base.js'
import Highcharts from 'highcharts/highstock';
export default {
    data(){
        return{
            content_chart:['榜单待开放中...','COMING SOON...'],
            top_title:[{
                title:['活跃地址数','Active Address']
            },{
                title:['交易量(24H)','']
            }],
            titlearr:[
                [['排名','rank'],['名称','name'],['价格','price'],[['涨幅','increase'],['跌幅','reduce']]],
                [['排名','rank'],['名称','name'],['交易量','volume']]
            ],
            arr:[11111,'namedd','5413165131'],
            subarr:[],
            // 请求数据
            
            requestarr:['/tokenrank/tokenTrade.json','/tokenrank/tokenTrade.json'],
            requestdata:[
                {
                 "page_size":100,
                "sort_param":"market_value,-1"
                },{
                    "page_size":100,
                    "sort_param":"market_value,-1"
                }],
            //预制的title等内容
            prechart:[
                {title:'',series:[{
				            name: 'BTC',
				            data: [],
				            type: 'spline',
				        },{
				            name: 'ETH',
				            data: [],
				            type: 'spline',
				        },{
				            name: 'BDSG',
				            data: [],
				            type: 'spline',
				        },{
				            name: 'EOS',
				            data: [],
				            type: 'spline',
				        },{
				            name: 'YTR',
				            data: [],
				            type: 'spline',
				        },{
				            name: 'HGF',
				            data: [],
				            type: 'spline',
				        },{
				            name: 'BJH',
				            data: [],
				            type: 'spline',
				        },{
				            name: 'GFD',
				            data: [],
				            type: 'spline',
				        }]}
            ],
            //图表内容
            chartarr:[{
                //普通折线图
                chart:{
                    type: 'spline'
                },
                colors:['#11a0f8','#ff8000','#775f9f','#f99999','#3ee070','#9f9f9f','#9f9f9f','#ded203'],
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                credits: {
                        enabled: false
                    },
                xAxis: [{ //横坐标
			            categories: [],
			            crosshair: true
                    }],
                yAxis: [
				        { // Primary yAxis
				            title: {
				                text: 'ETH',
				            }
				        }	
                    ], 
                tooltip: {
			            shared: true
                    },
                series: [
				        {
				            name: 'ETH',
				            data: [],
				            type: 'spline',
				        }
			        ]       
            },{
                // 竖型柱状图
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories: [
                        '一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'
                    ],
                    crosshair: true
                },
                yAxis: {
                    title: {
                        text: '降雨量 (mm)'
                    }
                },
                tooltip: {
                    shared: true
                },
                exporting: {
                    enabled:false
                },
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    column: {
                        borderWidth: 0
                    }
                },
                series: [{
                    name: '东京',
                    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
                }]    
            },{
                // 横行柱状图
                chart: {
                    type: 'bar'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories: ['非洲', '美洲', '亚洲', '欧洲', '大洋洲'],
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    title: {
                        text: '人口总量 (百万)',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ' 百万'
                },
                exporting: {
                    enabled:false
                },
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: false
                },
                series: [{
                    name: '1800 年',
                    data: [107, 31, 635, 203, 2]
                }]
            },{
                // 饼状图
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                colors:['#11a0f8','#ff8000','#775f9f','#f99999','#3ee070','#9f9f9f','#9f9f9f','#ded203'],
                title: {
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
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                exporting: {
                    enabled:false
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: [{
                        name: 'Chrome111',
                        y: 61.41,
                        sliced: true,
                        selected: true
                    }, {
                        name: 'Internet Explorer',
                        y: 11.84
                    }, {
                        name: 'Firefox',
                        y: 10.85
                    }, {
                        name: 'Edge',
                        y: 4.67
                    }, {
                        name: 'Safari',
                        y: 4.18
                    }, {
                        name: 'Other',
                        y: 7.05
                    }]
                }]
            }]
        }
    },
    props: ['showType'],
    created(){
            console.log(this.showType)
            // this.request(this.requestarr[this.showType],this.requestdata[this.showType])
    },
    methods:{
        change_select(aa){
            this.selected = aa
        },

        // 请求函数，并处理数据
        request(url,argument){
            var that = this
            newfn.fornew('post',url,argument).then(function(data){
               console.log(data)
            //    根据传入的props判断类型
               if(that.showType==0){
                   var type = 0
               }
            //    根据请求回来的data处理出x轴，和argument
            that.prechart[that.showType].series.forEach(e => {
                e.data = [12,45,56,78,45,234,234,45,34,45]
            });
               var bbc = that.chartobj(type,[1,2,3,4,5,6,7,8,9,10],that.prechart[that.showType].title,that.prechart[that.showType].series)
               that.draw(bbc)
            })
        },

        // 画图函数
        draw(obj){
            var theid = 'mychart'+ this.showType
            var options1=obj
                window.chartsss = Highcharts.chart(theid,options1)
                
	        	    window.onresize = function () {
                        // chart.reflow();
                        
                        window.chartsss.reflow()
	        	    }
        },
        //图表配置处理函数
        chartobj(type,xarr,yarr,argument){
            if(type ==0||type ==1||type == 2){
                this.chartarr[type].xAxis.categories = xarr
                this.chartarr[type].yAxis[0].title.text = yarr
                this.chartarr[type].series = argument
            }else{
                this.chartarr[type].series[0].data = argument
            }
            return this.chartarr[type]
            
        }
    }

}
</script>

<style scoped lang="scss">
.rank_box{
    padding: 0 20px 20px 20px;
    background-color: #fff;
    margin: 0 10px;
    border-radius: 5px;
    .alltitle{
        height: 55px;
        line-height: 55px;
        margin-bottom: 20px;
        .title_tips{
            float: left;
            font-size: 16px;
            color: $basecolor;
        }
        
    }
    .formychart{
        width: 100%;
        height: 300px;
        line-height: 300px;
    }
    
}
</style>

