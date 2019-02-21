<template>
    <div id="area_chart" style="height: 400px; min-width: 904px;"></div>
</template>
<script>
import Highcharts from "highcharts/highstock";
import Hmap from "highcharts/modules/export-data";
import Expor from "highcharts/modules/exporting";
Expor(Highcharts);
Hmap(Highcharts);
export default {
    data() {
        return {
            options: {
                chart: {
                    type: "area"
                },
                title: {
                    text:
                        ""
                },
                subtitle: {
                    text: ""
                },
 
                xAxis: {
                    categories: [
                        "1750",
                        "1800",
                        "1850",
                        "1900",
                        "1950",
                        "1999",
                        "2050"
                    ],
                    tickmarkPlacement: "on",
                    title: {
                        enabled: false
                    }
                },
                yAxis: {
                    title: {
                        text: "Billions"
                    },
                    labels: {
                        formatter: function() {
                            return this.value / 1000;
                        }
                    }
                },
                tooltip: {
                    shared: true,
                    valueSuffix: "units",
                    backgroundColor: "rgba(247,247,247,0.85)"
                },
                plotOptions: {
                    area: {
                        stacking: "normal",
                        lineColor: "#666666",
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: "#666666",
                        },
                    }
                },
                
                series: [
                    {
                        name: "Asia",
                        data: [502, 635, 809, 947, 1402, 3634, 5268],
                        marker:{symbol:'circle'},
                        color:'#ead0fe'
                    },
                    {
                        name: "Africa",
                        data: [106, 107, 111, 133, 221, 767, 1766],
                          marker:{symbol:'circle'},
                        color:'#7eccef'
                    },
                    {
                        name: "Europe",
                        data: [163, 203, 276, 408, 547, 729, 628],
                          marker:{symbol:'circle'},
                        color:'#000'
                    }
                ],
                exporting: {
                    enabled:false
                },
             
                credits: {
                    enabled: false
                },
            }
        };
    },
    created() {},
    mounted() {
        Highcharts.chart("area_chart", this.options);
    },
    methods: {}
};
</script>
