<template>
    <div id="container" style="position: relative;min-width:500px;"></div>
</template>

<script>

import newfn from '../../static/base/base.js'
export default {
    data(){
        return {
            klinearr:[],
            xarr:[],
            marketarr:[],
            pricearr:[],
            tradearr:[],
            fontarr:[ ['市值','Market Cap'], ['价格','Price'], ['(24H)交易量','Volume(24h)']],
            moneyarr:['￥ {value}','$ {value}']
        }
    },
    created(){
        var code = newfn.getid()
        newfn.fornew('get','/tokenrank/V2/tokenKline.json',{params:{
            "code":code,
            "days":30
        }}).then((data)=>{
            console.log(data)
            this.klinearr = data.data.data
            this.klinearr.forEach(e => {
                this.xarr.push(e.data_time)
                this.marketarr.push(e.market_cap)
                this.pricearr.push(e.price_usd)
                this.tradearr.push(e.volume_usd)
                this.draw()
            });
        })
    },
    mounted(){
        
    },
    computed:{
        forlang(){
            return this.$store.state.lanfalg
        }
    },
    watch:{
        forlang(n,o){
            this.marketarr=[]
            this.pricearr=[]
            this.tradearr=[]
            if(this.$store.state.currency == 2){
                this.klinearr.forEach(e => {
                    this.marketarr.push(e.market_cap*this.$store.state.usd_cny)
                    this.pricearr.push(e.price_usd*this.$store.state.usd_cny)
                    this.tradearr.push(e.volume_usd*this.$store.state.usd_cny)
                });
            }else{
                this.klinearr.forEach(e => {
                    this.marketarr.push(e.market_cap)
                    this.pricearr.push(e.price_usd)
                    this.tradearr.push(e.volume_usd)
                    this.draw()
                });
            }
            
            this.draw()
        }
    },
    methods:{
        draw(){
            var upColor = '#ec0000';
            var upBorderColor = '#8A0000';
            var downColor = '#00da3c';
            var downBorderColor = '#008F28';
            var echarts = require('echarts');
            var myChart = echarts.init(document.getElementById('container'));

// 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)

var  option = {
    
        title: {
        text: '',
        left: 0
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    legend: {
        bottom: 10,
        left: 'center',
        data: [ this.fontarr[0][this.$store.state.lanfalg-1], this.fontarr[1][this.$store.state.lanfalg-1], this.fontarr[2][this.$store.state.lanfalg-1]]
    },
    xAxis: {
        type: 'category',
        data: this.xarr,
        scale: true,
        boundaryGap : false,
        axisLine: {onZero: false},
        splitLine: {show: false},
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax'
    },
    yAxis: [{
        scale: true,
        splitArea: {
            show: false
        },
        
        show:false
    },{
        scale: true,
        splitLine:{
            show:false
        },
        position:'left',
        name:this.fontarr[1][this.$store.state.lanfalg-1],
        axisLabel: {
            formatter: this.moneyarr[this.$store.state.lanfalg-1]
        }
    },{
        scale: true,
        splitArea: {
            show: true
        },
        show:false
    }],
    dataZoom: [
        {
            type: 'inside',
            start: 50,
            end: 100
        },
        {
            show: true,
            type: 'slider',
            y: '80%',
            start: 50,
            end: 100
        }
    ],
    grid: {
            left: '10%',
            right: '10%',
            bottom: '30%'
        },
    series: [
        {
            name:  this.fontarr[0][this.$store.state.lanfalg-1],
            type: 'line',
            data: this.marketarr,
            smooth: true,
            lineStyle: {
                normal: {opacity: 0.5}
            }
        },
        {
            name:  this.fontarr[1][this.$store.state.lanfalg-1],
            type: 'line',
            data: this.pricearr,
            smooth: true,
            lineStyle: {
                normal: {opacity: 0.5}
            },
            yAxisIndex: 1
        },
        {
            name: this.fontarr[2][this.$store.state.lanfalg-1],
            type: 'line',
            data: this.tradearr,
            smooth: true,
            lineStyle: {
                normal: {opacity: 0.5}
            },
            yAxisIndex: 2
        }

    ]

};
myChart.setOption(option)
}
        }
}
</script>

<style scoped>
#container{
    width: 100%;
    height: 370px;
    min-width: 810px;
    overflow: hidden;
}
</style>
