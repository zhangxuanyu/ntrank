<template>
    <div id="container" style="position: relative;width:100%"></div>
</template>

<script>
import newfn from "../../static/base/base.js";
import { mapState } from "Vuex";
import axios from "axios";
export default {
    data() {
        return {
            klinearr: [],
            xarr: [],
            marketarr: [],
            pricearr: [],
            tradearr: [],
            marketarr_base: [],
            pricearr_base: [],
            tradearr_base: [],
            fontarr: [
                ["市值", "Market Cap"],
                ["价格", "Price"],
                ["交易量(24H)", "Volume(24H)"]
            ],
            moneyarr: ["￥ {value}", "$ {value}"]
        };
    },
    created() {
        this.get_kline();
    },
    mounted() {},
    computed: {
        ...mapState(["usd_cny"]),
        forlang: function() {
            return this.$store.state.lanfalg;
        }
    },
    watch: {
        forlang(n, o) {
            let num = this.$store.state.usd_cny[this.$store.state.lanfalg];
            this.marketarr = [];
            this.pricearr = [];
            this.tradearr = [];
            for (let i = 0, len = this.marketarr_base.length; i < len; i++) {
                this.marketarr.push(this.marketarr_base[i] * num);
            }
            for (let j = 0, len = this.pricearr_base.length; j < len; j++) {
                this.pricearr.push(this.pricearr_base[j] * num);
            }
            for (let k = 0, len = this.tradearr_base.length; k < len; k++) {
                this.tradearr.push(this.tradearr_base[k] * num);
            }
            this.draw();
        }
    },
    methods: {
        get_kline() {
            var code = newfn.getid();
            let num = this.$store.state.usd_cny[this.$store.state.lanfalg];
            newfn
                .fornew("get", "/tokenrank/V2/tokenKline.json", {
                    params: {
                        code: code,
                        days: 30,
                        dim: 1
                    }
                })
                .then(res => {
                    console.log(res);
                    let data = res.data.data;
                    data.data_time.forEach(ele => {
                        let t = newfn.timeuse(ele / 1000, 1, [
                            "-",
                            "-",
                            " ",
                            ":",
                            ":"
                        ]);

                        this.xarr.push(t);
                    });
                    this.marketarr_base = data.market_cap;
                    this.pricearr_base = data.price_usd;
                    this.tradearr_base = data.volume_usd;
                    for (let i = 0, len = data.market_cap.length;i < len; i++) {
                        this.marketarr.push(data.market_cap[i] * num);
                    }
                    for (let j = 0, len = data.price_usd.length; j < len; j++) {
                        this.pricearr.push(data.price_usd[j] * num);
                    }
                    for ( let k = 0, len = data.volume_usd.length; k < len; k++) {
                        this.tradearr.push(data.volume_usd[k] * num);
                    }
                    this.draw();
                });
        },
        draw() {
            var echarts = require("echarts");
            var myChart = echarts.init(document.getElementById("container"));

            // 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)

            var option = {
                title: {
                    text: "",
                    left: 0
                },
                tooltip: {
                    trigger: "axis",

                    textStyle: {
                        align: "left"
                    },
                    padding: 10,
                    position: function (point, params, dom, rect, size) {
  // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
  // 提示框位置
  var x = 0; // x坐标位置
  var y = 0; // y坐标位置
 
  // 当前鼠标位置
  var pointX = point[0];
  var pointY = point[1];
 
  // 外层div大小
  // var viewWidth = size.viewSize[0];
  // var viewHeight = size.viewSize[1];
 
  // 提示框大小
  var boxWidth = size.contentSize[0];
  var boxHeight = size.contentSize[1];
 
  // boxWidth > pointX 说明鼠标左边放不下提示框
  if (boxWidth > pointX) {
    x = 5;
  } else { // 左边放的下
    x = pointX - boxWidth;
  }
 
  // boxHeight > pointY 说明鼠标上边放不下提示框
  if (boxHeight > pointY) {
    y = 5;
  } else { // 上边放得下
    y = pointY - boxHeight;
  }
 
  return [x, y];
}

                },
                legend: {
                    bottom: -5,
                    left: "center",
                    data: [
                        this.fontarr[0][this.$store.state.lanfalg],
                        this.fontarr[1][this.$store.state.lanfalg],
                        this.fontarr[2][this.$store.state.lanfalg]
                    ]
                },
                color: ["#a376d4", "#5fcfa6", "#ff6f88"],
                xAxis: {
                    type: "category",
                    data: this.xarr,
                    scale: true,
                    boundaryGap: false,
                    axisLine: { onZero: false },
                    splitLine: { show: false },
                    splitNumber: 20,
                    min: "dataMin",
                    max: "dataMax"
                },
                axisLabel:{
                    formatter:function(val){
                        return val.split(" ").join("\n");
                    }
                },
                yAxis: [
                    {
                        scale: true,
                        splitArea: {
                            show: false
                        },
                        show: false
                    },
                    {
                        scale: true,
                        splitLine: {
                            show: false
                        },
                        position: "left",
                        name: this.fontarr[1][this.$store.state.lanfalg],
                        axisLabel: {
                            formatter: this.moneyarr[this.$store.state.lanfalg]
                        }
                    },
                    {
                        scale: true,
                        splitArea: {
                            show: true
                        },
                        show: false
                    }
                ],
                dataZoom: [
                   
                    {
                        type: "inside",
                        start: 20,
                        end: 100,
                        zoomOnMouseWheel:false
                    },
                    {
                        show: true,
                        type: "slider",
                        y: "83%",
                        start: 50,
                        end: 100,
                    }
                ],
                grid: {
                    left: "15%",
                    right: "10%",
                    bottom: "30%"
                },
                series: [
                    {
                        name: this.fontarr[0][this.$store.state.lanfalg],
                        type: "line",
                        data: this.marketarr,
                        smooth: true,
                        lineStyle: {
                            normal: { color: "#a376d4", width: 0.5 }
                        }
                    },
                    {
                        name: this.fontarr[1][this.$store.state.lanfalg],
                        type: "line",
                        data: this.pricearr,
                        smooth: true,
                        lineStyle: {
                            normal: { color: "#5fcfa6", width: 0.5 }
                        },
                        yAxisIndex: 1
                    },
                    {
                        name: this.fontarr[2][this.$store.state.lanfalg],
                        type: "line",
                        data: this.tradearr,
                        smooth: true,
                        lineStyle: {
                            normal: { color: "#ff6f88", width: 0.5 }
                        },
                        yAxisIndex: 2
                    }
                ]
            };
            myChart.setOption(option);
            setTimeout(function() {
                window.onresize = function() {
                    myChart.resize();
                };
            }, 200);
        }
    }
};
</script>

<style scoped>
#container {
    width: 100%;
    overflow: hidden;
    height: 6rem;
}
</style>
