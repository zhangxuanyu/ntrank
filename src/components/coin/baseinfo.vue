<template>
    <div class="baseout">
        <div class="cont1">
            <p class="top">
                {{basearr}}
            </p>
            <div class="info">
                <div class="incont">
                    <div class="modl" v-for="(item,index) in baseinfo" :key="index">
                        <div class="left">
                            <p v-for="(itt,idx) in item.title" :key="idx">{{itt[$store.state.lanfalg]}}</p>
                        </div>
                        <div class="right">
                            <p v-for="(itt,idx) in item.value" :key="idx">{{itt?itt:'--'}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="basebox">
            <div class="box">
                <div class="box_detail">
                    <p class="title">
                        {{baseblock[0][$store.state.lanfalg]}}
                    </p>
                    <div class="middlecont">
                        <div class="detail_left">
                            <div class="most_left">
                                <p v-for="(item,index) in media[0]" :key="index">{{item[$store.state.lanfalg]}}</p>
                            </div>
                            <div class="most_right">
                                <p v-for="(item,index) in media[0]" :key="index"><a :href="socialarr[0][index]?socialarr[0][index]:'javascript:;'" target="_blank"><img :src="socialpic[index][0]" alt="" v-if="socialarr[0][index]"><img :src="socialpic[index][1]" alt="" v-else></a></p>
                            </div>
                        </div>
                        <div class="detail_right">
                            <div class="most_left">
                                <p v-for="(item,index) in media[1]" :key="index">{{item[$store.state.lanfalg]}}</p>
                            </div>
                            <div class="most_right">
                                <p v-for="(item,index) in media[1]" :key="index">
                                    <span v-if="index!=3">
                                        <a :href="socialarr[1][index]?socialarr[1][index]:'javascript:;'" target="_blank">
                                            <img :src="socialpic[index+5][0]" alt="" v-if="socialarr[1][index]">
                                            <img :src="socialpic[index+5][1]" alt="" v-else>
                                        </a>
                                    </span>
                                    <span v-else>
                                        <span v-for="(it,idx) in explorer_url" :key="idx" class="most_right_explorer">
                                            <a :href="it.url?it.url:'javascript:;'" target="_blank">
                                                <img :src="socialpic[index+5][0]" alt="" v-if="it.url">
                                                <img :src="socialpic[index+5][1]" alt="" v-else>
                                            </a>
                                        </span>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="box">
                <div class="box_detail">
                    <p class="title">
                        {{baseblock[1][$store.state.lanfalg]}}
                    </p>
                    <div style="overflow:hidden;">
                        <div class="tego_left">
                            <p v-for="(item,index) in together" :key="index">{{item[$store.state.lanfalg]}}</p>
                        </div>
                        <div class="tego_left">
                            <p v-for="(item,index) in togetherarr" :key="index">{{item==''?'--':item}}</p>
                        </div>
                    </div>

                    <p class="pictitle">{{tgchartfont[$store.state.lanfalg]}} <span v-show="tgfontarr.length==0" style="color:#333;">&nbsp; --</span> </p>
                    <div class="outbasechart">
                        <div id="basechart">

                        </div>
                    </div>
                    <div class="chartdata" v-show="tgfontarr.length>0">
                        <p v-for="(item,index) in chartfont" :key="index">{{item[$store.state.lanfalg]}}:{{tgfontarr[index]?tgfontarr[index].value?tgfontarr[index].value:'--':'--'}}</p>
                    </div>

                </div>
            </div>

            <div class="box">
                <div class="box_detail">
                    <p class="title">
                        {{baseblock[2][$store.state.lanfalg]}}
                    </p>
                    <div class="showtime">
                        <div class="alltime">
                            <div class="line"></div>
                            <div class="timecont" v-for="(item,index) in linearr" v-show="linearr[0]!=''" :key="index">
                                <p>{{item.news_time}}</p>
                                <p>{{item.title}}</p>
                                <div class="point"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import newfn from "../../../static/base/base.js";
export default {
    data() {
        return {
            baseinfo: "",
            baseblock: "",
            media: "",
            together: "",
            //基本信息
            basearr: "",
            //社交信息 Social Media
            socialarr: [[], []],
            //众筹信息  Crowdfunding
            togetherarr: [],
            //路线图
            linearr: [],
            //众筹图片
            tgchartfont: ["代币分配", "Token distribution"],
            tgfontarr: [],
            chartfont: [
                ["基金会", "Foundation"],
                ["众筹", "Crowdfunding"],
                ["社区", "Social"],
                ["团队", "Team"],
                ["其他", "Others"]
            ],
            socialpic: [
                ["../../../static/home1.png", "../../../static/home2.png"],
                ["../../../static/face1.png", "../../../static/face2.png"],
                ["../../../static/twitter1.png","../../../static/twitter2.png"],
                ["../../../static/reddit1.png", "../../../static/reddit2.png"],
                ["../../../static/white1.png", "../../../static/white2.png"],
                ["../../../static/git1.png", "../../../static/git2.png"],
                ["../../../static/tel1.png", "../../../static/tel2.png"],
                ["../../../static/slack1.png", "../../../static/slack2.png"],
                ["../../../static/block1.png", "../../../static/block2.png"]
            ],
            explorer_url:[]
        };
    },
    created() {
        var bbc = alllanguage.base.baseinfo;
        var code = newfn.getid();
        this.baseblock = alllanguage.base.basetype;
        this.media = alllanguage.base.socialmed;
        this.together = alllanguage.base.together_info;
        this.baseinfo = [
            {
                title: [bbc[0], bbc[1]],
                value: [1221, 342]
            },
            {
                title: [bbc[2], bbc[3]],
                value: [1221, 342]
            },
            {
                title: [bbc[4], bbc[5]],
                value: [1221, 342]
            }
        ];
        var that = this;
        //基本信息
        newfn
            .fornew("get", "/tokenrank/V2/tokenInfo.json", {
                params: { code: code }
            })
            .then(res => {
                let data = res.data.data;
                console.log(data);
                that.basearr = data.base_info.coin_intro;

                that.baseinfo[0].value = [
                    newfn.conversion(data.base_info.release_amount)+' '+data.base_info.short_name,
                    data.base_info.publish_time
                ];
                that.baseinfo[1].value = [
                    data.base_info.stock_exchange,
                    data.base_info.block_time
                ];
                that.baseinfo[2].value = [
                    data.base_info.core_algorithm,
                    data.base_info.developer
                ];

                setTimeout(() => {
                    this.assignment(this.linearr, data.btc_news);
                }, 3000);

                this.assignment(this.socialarr[0], [
                    data.link.website,
                    data.link.facebook,
                    data.link.twitter,
                    data.link.reddit,
                    data.link.white_paper
                ]);
                this.assignment(this.socialarr[1], [
                    data.link.github,
                    data.link.telegram,
                    "",
                    data.link.block_station
                ]);
                this.explorer_url = this.socialarr[1][3]
                console.log(this.explorer_url);

                this.togetherarr = [
                    "",
                    data.ico_info.crowd_funding_price,
                    data.ico_info.funds_amount
                ];
                if (
                    !data.ico_info.foundation &&
                    !data.ico_info.crowd_funding &&
                    !data.ico_info.community &&
                    !data.ico_info.team &&
                    !data.ico_info.other
                ) {
                    this.tgfontarr = [];
                } else {
                    this.tgfontarr = [
                        { value: data.ico_info.foundation, name: "基金会" },
                        { value: data.ico_info.crowd_funding, name: "众筹" },
                        { value: data.ico_info.community, name: "社区" },
                        { value: data.ico_info.team, name: "团队" },
                        { value: data.ico_info.other, name: "其他" }
                    ];
                }

                setTimeout(() => {
                    this.draw();
                }, 5000);
            });

        //路线图
        // newfn.fornew('post','/tokenrank/newsList.json',{"code": code}).then(function(data){
        //      that.linearr = data.data.info_list
        // })
    },
    mounted() {},
    methods: {
        draw() {
            var echarts = require("echarts");
            var myChart = echarts.init(document.getElementById("basechart"));
            var option = {
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },

                series: [
                    {
                        name: "访问来源",
                        type: "pie",
                        radius: ["50%", "70%"],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center"
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: "30",
                                    fontWeight: "bold"
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: this.tgfontarr
                    }
                ]
            };
            myChart.setOption(option);
        },
        //赋值方法
        assignment(arr, argument) {
            for (let i = 0; i <= argument.length - 1; i++) {
                if (argument[i]) {
                    arr.push(argument[i]);
                } else {
                    arr.push("");
                }
            }
        }
    }
};
</script>

<style scoped  lang="scss">
::-webkit-scrollbar {
    display: none;
}
.baseout {
    .cont1 {
        padding: 20px;
        background-color: #fff;
        .top {
            width: 100%;
            border-bottom: 1px solid $border;
            text-align: left;
            padding-bottom: 20px;
            font-size: 14px;
        }
        .info {
            width: 100%;
            margin-top: 20px;
            .incont {
                display: flex;
                justify-content: space-between;
                overflow: hidden;
                .modl {
                    text-align: left;
                    min-width: 390px;
                    font-size: 12px;
                    .left {
                        float: left;
                        margin-right: 30px;
                        color: #999;
                        font-size: 14px;
                        p:nth-of-type(2) {
                            margin-top: 20px;
                        }
                    }
                    .right {
                        float: left;
                        color: #666;
                        font-size: 14px;
                        // margin-top: 2px;
                        p{
                            line-height: 18px;
                        }
                        p:nth-of-type(2) {
                            margin-top: 22px;
                        }
                    }
                }
            }
        }
    }
    .basebox {
        display: flex;
        justify-content: space-between;

        .box {
            width: 33.33%;
            min-width: 387px;
            .box_detail {
                height: 400px;
                padding: 20px 20px 20px 20px;
                background-color: #fff;
                margin: 12px 6px;
                border-radius: 5px;
                text-align: left;
                overflow: hidden;
                position: relative;
                p {
                    font-size: 16px;
                    border-bottom: 1px solid $border;
                    padding-bottom: 17px;
                    margin-bottom: 13px;
                }
                .title {
                    font-size: 14px;
                    font-weight: bold;
                }
                .detail_left {
                    float: left;
                    min-width: 120px;
                    overflow: hidden;
                    .most_left {
                        float: left;
                        margin-top: 4px;
                        p {
                            @include fontwave;
                            color: $subcolor;
                            font-size: 14px;
                        }
                    }
                    .most_right {
                        float: left;
                        margin-left: 15px;
                        p {
                            border: none;
                            margin-top: 5px;
                            margin-bottom: 2px;
                            font-size: 14px;
                            img {
                                width: 25px;
                            }
                        }
                    }
                }
                .detail_right {
                    float: left;
                    margin-left: 20%;
                    min-width: 120px;
                    overflow: hidden;
                    .most_left {
                        float: left;
                        margin-top: 4px;
                        p {
                            color: $subcolor;
                            font-size: 14px;
                            @include fontwave;
                        }
                    }
                    .most_right {
                        float: left;
                        margin-left: 15px;
                        p {
                            border: none;
                            font-size: 14px;
                            margin-top: 4px;
                            margin-bottom: 2px;
                            img {
                                width: 25px;
                            }
                        }
                        .most_right_explorer:nth-of-type(2){
                            margin-left: 5px;
                            margin-right: 5px;
                        }
                    }
                }
                .tego_left {
                    float: left;
                    height: 124px;
                    margin-right: 20px;

                    p {
                        @include fontwave;
                        font-size: 14px;
                    }
                }
                .tego_left:nth-of-type(1) {
                    color: $subcolor;
                }
                .pictitle {
                    border: 0;
                    color: $subcolor;
                    margin-top: 30px;
                }
                .outbasechart {
                    position: absolute;
                    width: 300px;
                    height: 170px;
                    bottom: 20px;
                    left: 80px;

                    #basechart {
                        width: 350px;
                        height: 200px;
                        margin-top: -20px;
                    }
                }
                .chartdata {
                    position: absolute;
                    bottom: 20px;
                    left: 80px;
                    width: 100px;
                    p {
                        padding: 0;
                        margin: 0;
                        line-height: 24px;
                        border: 0;
                        font-size: 12px;
                    }
                }
                .showtime {
                    width: 100%;
                    height: 312px;
                    overflow: scroll;
                    .alltime {
                        width: 100%;
                        position: relative;
                        padding-left: 15px;
                        .line {
                            position: absolute;
                            width: 4px;
                            height: 100%;
                            top: 0px;
                            left: 7px;
                            background-image: url(../../../static/dashed.png);
                        }
                        .timecont {
                            width: 100%;
                            position: relative;
                            padding-left: 33px;
                            padding-bottom: 40px;
                            p {
                                text-align: left;
                                font-size: 14px;
                                border: 0;
                                padding: 0;
                                margin: 0;
                            }
                            p:nth-of-type(1) {
                                color: $subcolor;
                                margin-bottom: 10px;
                            }
                            p:nth-of-type(2) {
                                color: $basecolor;
                            }
                            .point {
                                position: absolute;
                                width: 11px;
                                height: 11px;
                                top: 2px;
                                left: -11px;
                                border-radius: 50%;
                                background-color: $color;
                            }
                        }
                    }
                }
            }
        }
        .box:nth-of-type(1) .box_detail {
            margin-left: 0px;
        }
        .box:nth-of-type(3) .box_detail {
            margin-right: 0px;
        }
    }
}
</style>
