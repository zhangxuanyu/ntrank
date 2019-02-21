<template>
    <div class="baseout">
        <div class="cont1">
            <p>Github</p>
            <div class="card_out">
                <div v-for="(item,index) in arr" class="card_in" :key="index">
                    <div class="increase">
                        <img :src="picarr[index]" alt="">
                        <p>
                            <span>{{addgap(item.all[0])}}</span>
                            <span>{{addgap(item.all[1])}}</span>
                        </p>
                        <div class="info_out">
                            <div v-for="(iten,ind) in item.word" class="info_in" :key="ind">
                                <p>{{item.value[ind]?addgap(item.value[ind]):'--'}}</p>
                                <p>{{iten}}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div>
               <hot-chart :list='hot_list'></hot-chart>
                 <!-- <area-chart></area-chart> -->
            </div>
        </div>

        <div class="cont1">
            <p>{{s_media[$store.state.lanfalg]}}</p>
            <div class="card_out">
                <div v-for="(item,index) in socialarr" class="card_reddit" :key="index">
                    <div class="reddit_info">
                        <p><img :src="picarr[index+3]" alt=""></p>
                        <div class="reddie_left">
                            <p v-for="(iem,idx) in item.word" :key="idx">{{iem}}</p>
                        </div>
                        <div class="reddie_right">
                            <p v-for="(iem,idx) in item.value" :key="idx">{{iem?addgap(iem):'--'}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-for="(ite,ines) in btn_arr" class="chart_btn cur" :key="ines" v-show="ite.show != 0" :style="btn_idx==ines?{backgroundColor:'#a376d4'}:{}" @click="toogle_chart(ines)">{{ite.name}}</div>
            <div class="chart_out">
                <!-- <span class="tips">【分析】</br>Twitter Followers较上周环比+26个关注；Tweets较上周环比+3次推文。 </span> -->
                <p style="line-height:20px;padding: 20px 0px;font-weight: 600;font-size:14px;font-weight:600;">{{chart_select==0?this.socialarr[0].word[0]:chart_select==1?this.socialarr[1].word[0]:chart_select==2?this.socialarr[2].word[0]:this.socialarr[3].word[0]}}</p>
                <div id="top_chart"></div>
                <p v-show="this.chart_select == 0 || this.chart_select == 1" style="line-height:20px;padding: 20px 0px;font-weight: 600;font-size:14px;font-weight:600;">{{chart_select==0?this.socialarr[0].word[1]:this.socialarr[1].word[1]}} </p>
                <div id="bottom_chart" v-show="this.chart_select == 0 || this.chart_select == 1"></div>
            </div>
        </div>

        <div class="twitter" v-show="chart_select == 0">
            <div>
                <span class="twitter_title">Twitter</span>
                <div class="twitter_content" id="twitter_content">
                    <a class="twitter-timeline" data-width="500" :href="thelk">Tweets by {{cointype}}</a>
                </div>
            </div>
        </div>
        <div class="reddit" v-show="chart_select == 1">
            <div>
                <span class="twitter_title">Reddit</span>
            </div>
            <div class="reddit_content">
                <div id="reddit"></div>
            </div>
        </div>

    </div>
</template>



<script>
import Highcharts from "highcharts/highstock";
import hotChart from "../data/hot_chart";
import areaChart from "../data/area_chart";
import axios from "axios";
import newfn from "../../../static/base/base.js";
export default {
    components: {
        hotChart,
        areaChart
    },
    data() {
        return {
            arr: [
                {
                    all: ["", "Commits"],
                    word: ["Branches", "Releases", "Contributors"],
                    value: []
                },
                {
                    all: ["--", "Code"],
                    word: ["Comment", "Blanks"],
                    value: ["", ""]
                },
                {
                    all: ["", "Star"],
                    word: ["Fork", "Watch"],
                    value: []
                }
            ],
            arr1: ["Reddit", "Twitter", "Facebook", "Telegram"],
            btn_arr: [
                { name: "Twitter", show: 0 },
                { name: "Reddit", show: 0 },
                { name: "Facebook", show: 0 },
                { name: "Telegram", show: 0 },
            ],
            btn_idx: 0,
            socialarr: [
                {
                    word: ["Twitter Followers", "Tweets"],
                    value: ["--", "--"]
                },
                {
                    word: ["Reddit Subscribers", "Reddit Online"],
                    value: ["--", "--"]
                },
                {
                    word: ["Facebook Followers"],
                    value: ["--"]
                },
                {
                    word: ["Telegram Members"],
                    value: ["--"]
                }
            ],

            chart_select: 0,
            picarr: [
                "../../../static/commits.png",
                "../../../static/code.png",
                "../../../static/star.png",
                "../../../static/twitter1.png",
                "../../../static/reddit1.png",
                "../../../static/face1.png",
                "../../../static/tel1.png"
            ],
            thelk: "",
            xarr_face_fl: [], //时间轴
            xarr_red_sub: [], //时间轴
            xarr_twsarr: [], //时间轴
            xarr_t_follow: [], //时间轴
            xarr_red_ol: [], //时间轴
            xarr_tele: [], //时间轴
            t_follow: [],
            twsarr: [],
            red_sub: [],
            red_ol: [],
            face_fl: [],
            tele_atten:[],
            cointype: "",
            hot_list:[]
        };
    },
    created() {
        this.s_media = alllanguage.coindetail.s_media;
    },
    mounted() {
        var code = newfn.getid();
        this.cointype = this.upfirst(code);
        var that = this;
        $.ajax({
            type: "get",
            url: "https://www.reddit.com/r/ethereum.embed",
            dataType: "jsonp",
            data: {
                limit: 15
            },
            success: function(res) {
                $("#reddit").append(res);
            },
            fail: function(err) {
                console.log(err);
                
            }
        });
        //获取twitter
        newfn.fornew('get','/tokenrank/V2/tokenInfo.json',{params:{"code": code}}).then((res)=>{
            let data = res.data.data;
             this.thelk = data.link.twitter;
                    this.twitter(document, "script", "twitter-wjs");
        })

        newfn.fornew('get','/tokenrank/V2/githubIndexNew.json',{params:{"code": code}}).then((res)=>{
            let data = res.data.data;
           let commit_his_list = [];
           commit_his_list = data.commit_his.map(item=>{
               return{
                   date:item.d,count:item.c
               }
           })
           this.hot_list = commit_his_list;
           this.arr[0].all[0] = data.commits;
            this.arr[0].value = [
                data.branches,
                data.releases,
                data.contributors
            ];
            this.arr[2].value = [
                data.fork,
                data.watch
            ];
            this.arr[2].all[0] = data.star;
        })



        //获取活跃度信息
        // newfn.fornew("get", "/tokenrank/V2/githubIndex.json", {
        //         params: { code: code }
        //     })
        //     .then(function(data) {
        //         console.log(data)
        //         that.arr[0].all[0] = data.data.data[0].commits;
        //         that.arr[0].value = [
        //             data.data.data[0].branches,
        //             data.data.data[0].releases,
        //             data.data.data[0].contributors
        //         ];
        //         that.arr[2].value = [
        //             data.data.data[0].fork,
        //             data.data.data[0].watch
        //         ];
        //         that.arr[2].all[0] = data.data.data[0].star;
        //     });

        newfn.fornew("get", "/tokenrank/V2/socialIndex.json", {
                params: { code: code, page_size: 30, page_num: 0 }
            })
            .then(data => {
                console.log(data.data.data);
                let list = data.data.data;
                this.t_follow = [];
                this.twsarr = [];
                this.red_sub = [];
                this.red_ol = [];
                this.face_fl = [];
                this.xarr_t_follow = [];
                this.xarr_twsarr = [];
                this.xarr_red_sub = [];
                this.xarr_red_ol = [];
                this.xarr_face_fl = [];
                this.socialarr[0].value = [
                    list[0].twitter_attention,
                    list[0].tweets
                ];
                this.socialarr[1].value = [
                    list[0].reddit_attention,
                    list[0].reddit_actives
                ];
                this.socialarr[2].value = [list[0].facebook_attention];
                this.socialarr[3].value = [list[0].telegram_attention];
                list.forEach(e => {
                    if (e.twitter_attention) {
                        this.t_follow.unshift(e.twitter_attention);
                        this.xarr_t_follow.unshift(e.data_time);
                    }
                    if (e.tweets) {
                        this.twsarr.unshift(e.tweets);
                        this.xarr_twsarr.unshift(e.data_time);
                    }
                    if (e.reddit_attention) {
                        this.red_sub.unshift(e.reddit_attention);
                        this.xarr_red_sub.unshift(e.data_time);
                    }
                    if (e.reddit_actives) {
                        this.red_ol.unshift(e.reddit_actives);
                        this.xarr_red_ol.unshift(e.data_time);
                    }
                    if (e.facebook_attention) {
                        this.face_fl.unshift(e.facebook_attention);
                        this.xarr_face_fl.unshift(e.data_time);
                    }
                    if (e.telegram_attention) {
                        this.tele_atten.unshift(e.telegram_attention);
                        this.xarr_tele.unshift(e.data_time);
                    }
                });
                if (this.tele_atten.length > 0) {
                    this.btn_arr[3].show = 1;
                    this.btn_idx = 3;
                }
                if (this.face_fl.length > 0) {
                    this.btn_arr[2].show = 1;
                    this.btn_idx = 2;
                }
                if (this.t_follow.length > 0 || this.twsarr.length > 0) {
                    this.btn_arr[1].show = 1;
                    this.btn_idx = 1;
                }
                if (this.red_sub.length > 0 || this.red_ol.length > 0) {
                    this.btn_arr[0].show = 1;
                    this.btn_idx = 0;
                }
                console.log(this.xarr_tele)
                this.toogle_chart(this.btn_idx);
            });
    },
    beforeDestroy() {
        $("#twitter_content").empty();
    },
    methods: {
        twitter(d, s, id) {
            let js,
                fjs = d.getElementsByTagName(s)[0],
                p = /^http:/.test(d.location) ? "http" : "https";
            // if (!d.getElementById(id)) {
            js = d.createElement(s);
            js.id = id;
            js.src = p + "://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);
            // }
        },
        //首字母大写
        upfirst(aa) {
            return aa.substring(0, 1).toUpperCase() + aa.substring(1);
        },
        toogle_chart(a) {
            this.chart_select = a;
            this.btn_idx = a;
            if (a == 0) {
                this.draw(this.xarr_t_follow, this.t_follow, 0);
                this.draw_teitter(this.xarr_twsarr, this.twsarr, 0);
            } else if (a == 1) {
                this.draw(this.xarr_red_sub, this.red_sub, 1);
                this.draw_teitter(this.xarr_red_ol, this.red_ol, 1);
            } else if (a == 2) {
                this.draw(this.xarr_face_fl, this.face_fl, 2);
            } else {
                this.draw(this.xarr_tele, this.tele_atten, 3);
            }
        },
        draw(xarr, yarr, string) {
            var chart = Highcharts.chart("top_chart", {
                chart: {
                    type: "spline"
                },
                title: {
                    text: ""
                },
                subtitle: {
                    text: ""
                },
                xAxis: {
                    categories: xarr
                },
                yAxis: {
                    title: {
                        text: ""
                    },
                    labels: {
                        formatter: function() {
                            return this.value / 1000 + "k";
                        }
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
                    spline: {
                        marker: {
                            radius: 4,
                            lineColor: "#666666",
                            lineWidth: 1
                        }
                    }
                },
                series: [
                    {
                        name: this.socialarr[string].word[0],
                        marker: {
                            symbol: "square"
                        },
                        data: yarr
                    }
                ]
            });
        },
        draw_teitter(xarr, yarr, string) {
            var chart = Highcharts.chart("bottom_chart", {
                chart: {
                    type: "spline"
                },
                title: {
                    text: ""
                },
                subtitle: {
                    text: ""
                },
                xAxis: {
                    categories: xarr
                },
                yAxis: {
                    title: {
                        text: ""
                    },
                    labels: {
                        formatter: function() {
                            return this.value / 1000 + "k";
                        }
                    }
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
                    area: {
                        marker: {
                            enabled: false,
                            symbol: "circle",
                            radius: 2,
                            states: {
                                hover: {
                                    enabled: true
                                }
                            }
                        }
                    }
                },
                series: [
                    {
                        name: this.socialarr[string].word[1],
                        data: yarr
                    }
                ]
            });
        },

        addgap(aa) {
            return newfn.conversion(aa);
        }
    }
};
</script>

<style scoped lang="scss">
.baseout {
    .cont1 {
        padding: 20px;
        background-color: #fff;
        margin-bottom: 20px;
        overflow: hidden;
        p {
            color: #333;
            font-size: 14px;
            font-weight: bold;
            text-align: left;
        }
        .card_out {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            .card_in {
                width: 33.33%;
                min-width: 388px;
                padding: 0 10px;
                .increase {
                    width: 100%;
                    height: 136px;
                    border: 1px solid #d8d7da;
                    padding: 20px 20px 20px 80px;
                    position: relative;
                    img {
                        position: absolute;
                        top: 45px;
                        left: 23px;
                        width: 46px;
                        height: 46px;
                    }
                    p {
                        // margin-top: 30px;
                        color: $basecolor;
                        text-align: center;
                        margin-bottom: 10px;
                        span:nth-of-type(1) {
                            font-size: 24px;
                        }
                        span:nth-of-type(2) {
                            font-size: 16px;
                        }
                    }
                    .info_out {
                        display: flex;
                        justify-content: space-between;
                        .info_in {
                            width: 33.33%;
                            line-height: 24px;
                            p {
                                margin: 0;
                                color: $subcolor;
                            }
                        }
                    }
                }
            }
            .card_in:nth-of-type(1) {
                padding-left: 0;
            }
            .card_in:last-of-type {
                padding-right: 0;
            }
            .card_reddit {
                width: 25%;
                padding: 0 10px;
                .reddit_info {
                    width: 100%;
                    height: 125px;
                    border: 1px solid #d8d7da;
                    padding: 20px;
                    p {
                        margin-bottom: 10px;
                        img {
                            width: 24px;
                        }
                    }
                    .reddie_left {
                        float: left;
                        line-height: 24px;
                        font-size: 14px;
                        p {
                            color: $subcolor;
                            margin: 0;
                        }
                    }
                    .reddie_right {
                        float: right;
                        line-height: 24px;
                        p {
                        text-align: right;
                            color: $basecolor;
                            font-weight: 600;
                            font-size: 24px;
                            margin: 0;
                        }
                    }
                }
            }
            .card_reddit:nth-of-type(1) {
                padding-left: 0;
            }
            .card_reddit:last-of-type {
                padding-right: 0;
            }
        }
        .chart_btn {
            width: 82px;
            height: 35px;
            background-color: #9fa4aa;
            border-radius: 5px;
            line-height: 35px;
            color: #fff;
            float: left;
            margin-top: 30px;
            margin-right: 6px;
        }
        .chart_out {
            width: 100%;
            padding-right: 260px;
            position: relative;
            margin-top: 70px;
            .tips {
                position: absolute;
                width: 212px;
                height: 132px;
                top: 140px;
                right: 0px;
                font-size: 16px;
                color: #666666;
                text-align: left;
                line-height: 30px;
            }
            #top_chart {
                width: 100%;
                height: 235px;
            }
            #bottom_chart {
                width: 100%;
                height: 235px;
            }
        }
    }
    .twitter,
    .reddit {
        width: 100%;
        margin-top: 20px;
        background: #fff;
    }
    .reddit {
        text-align: left;
    }
    .reddit_content {
        width: 100%;
        height: $reddith;
        overflow: scroll;
    }
    .reddit_content li {
        margin-bottom: 40px;
    }
    .reddit_word {
        font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
            "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun,
            sans-serif;
        font-size: 14px;
        color: #292929;
        line-height: 20px;
        margin-bottom: 11px;
    }
    .reddit_other {
        color: #8f8f8f;
        font-size: 14px;
        font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
            "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun,
            sans-serif;
    }
    ::-webkit-scrollbar {
        display: none;
    }
    .twitter_title {
        display: block;
        color: black;
        margin-left: 10px;
        font-size: 20px;
        margin-bottom: 42px;
        font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
            "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun,
            sans-serif;
            text-align: left;
    }
    .twitter_content {
        width: 500px;
        height: $reddith;
        overflow: scroll;
        position: relative;
        background: white;
    }
    .twitter_header {
        float: left;
        height: 100px;
        margin-left: 10px;
        margin-right: 10px;
    }
    .twitter_header img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
    }
    .twitter_word {
        float: left;
        width: 100%;
    }
    .twitter_people {
        margin-bottom: 10px;
    }
    .twitter_word .twitter_people span {
        font-size: 14px;
        color: #8f8f8f;
        font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
            "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun,
            sans-serif;
    }
    .twitter_word .twitter_people span:nth-of-type(1) {
        font-size: 14px;
        color: #292929;
        font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
            "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun,
            sans-serif;
        font-weight: 600;
    }
    .twitter_detail {
        font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
            "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun,
            sans-serif;
        font-size: 14px;
        line-height: 20px;
        color: #292929;
    }
    .twitter_word img {
        max-width: 450px;
    }
    .twitter_icon {
        margin-top: 20px;
        overflow: hidden;
        height: 18px;
        padding-bottom: 45px;
    }
    .twitter_icon div {
        float: left;
        margin-right: 53px;
        height: 16px;
        line-height: 16px;
    }
    .twitter_icon div img {
        width: 16px;
        height: 16px;
        vertical-align: middle;
        margin-right: 10px;
    }
    .twitter_icon div span {
        font-size: 12px;
        display: inline-block;
        height: 100%;
    }
}

</style>
