<template>
    <div style=" position: relative;">
        <p v-if="no_commit">近30日暂无commits</p>
        <div id="chart"></div>
    </div>
</template>
<script>
import Highcharts from "highcharts/highstock";
export default {
    props: {
        chart_list: {
            default: [],
            type: Array
        }
    },
    data() {
        return {
            option: {},
            no_commit:false
        };
    },
    created() {},
    mounted() {  
        setTimeout(()=>{
            if(this.chart_list.length === 0){
                this.no_commit = true;
                
            }    
            this.chart_list.forEach(item=>{
                item.name = item.name.substring(5,item.name.length);
            })
            this.draw()
        },1000)
    },
    methods: {
        draw() {
            Highcharts.chart("chart", {
                chart: {
                    type: "column"
                },
                title: {
                    text: ""
                },
                xAxis: {
                    type: "category"
                },
                yAxis: {
                    title: {
                        text: ""
                    }
                },
                 tooltip: {
                    crosshairs: true,
                    shared: true
                },
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: "{point.y}",
                            color :'#a376d4'
                        }
                    }
                },
                colors:['#a376d4'],
                series: [
                    {
                        name: "Commits",
                        colorByPoint: true,
                        data: this.chart_list
                    }
                ]
            });
        }
    }
};
</script>
<style lang="scss" scoped>
#chart {
    height: 4rem;
    width: 100%;
}
p{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 999;
    height: 0.28rem;
    font-size: 0.28rem;
    text-align: center;
    color: #999
}
</style>
