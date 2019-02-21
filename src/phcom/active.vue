<template>
    <div id="ac-box">
        <div class="git-box">
            <p class="title">{{title_name_list[0][lanfalg]}}</p>
            <div class="con-box clearfix" v-for="(item,index) in gethup_list" :key="index">
                <img :src="item.imgsrc" alt="">
                <div class="mid clearfix">
                    <p>{{addgap(item.value)}}</p>
                    <span>{{item.unit}}</span>
                </div>
                <div class="info-box">
                    <p>
                        <span v-for="(it,idx) in item.content" :key="idx">{{it.n}}</span>

                    </p>
                    <p>
                        <span v-for="(it,idx) in item.content" :key="idx">{{addgap(it.v)}}</span>
                    </p>
                </div>
            </div>
            
            <hot-chart :chart_list='chart_list'></hot-chart>
            
        </div>
        <div class="social-box">
            <p class="title">{{title_name_list[1][lanfalg]}}</p>
            <ul class="social-con">
                <li class="clearfix" v-for="(item,index) in socialarr" :key="index">
                    <img :src="item.imgsrc" alt="">
                    <div class="name">
                        <p  v-for="(it,idx) in item.word" :key="idx">{{addgap(it)}}</p>
                    </div>
                    <div class="num">
                        <p  v-for="(it,idx) in item.value" :key="idx">{{addgap(it)||'--'}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="table-box">
            <ul>
              <li v-for="(ite,ines) in btn_arr" :key="ines" v-show="ite.show != 0" :style="btn_idx==ines?{color:'#a376d4'}:{}" @click="toogle_chart(ines)">{{ite.name}}</li>
            </ul>
            <div class="table">
                <p>{{chart_select==0?this.socialarr[0].word[0]:chart_select==1?this.socialarr[1].word[0]:chart_select==2?this.socialarr[2].word[0]:this.socialarr[3].word[0]}}</p>
                <div id="top-chart"></div>
            </div>
            <div class="table"  v-show="this.chart_select == 0 || this.chart_select == 1">
                <p>{{chart_select==0?this.socialarr[0].word[1]:this.socialarr[1].word[1]}}</p>
                <div id="bottom-chart"></div>
            </div>
        </div>
        <div id="twitter-new"  v-show="chart_select == 0">
            <span  class="name">Twitter</span>
            <div class="twitter_content" id="twitter_content">
                <a class="twitter-timeline" :data-width="w" :href="thelk">Tweets by {{cointype}}</a>
            </div>
        </div>   
        <div id="reddit-new"  v-show="chart_select == 1">
            <span class="name">Reddit</span>
            <div id="reddit"></div>
        </div>   
    </div>
</template>
<script>
import Highcharts from "highcharts/highstock";
import newfn from "../../static/base/base.js";
import hotChart from '../phcom/hot_chart';
import { mapState } from "Vuex";
export default {
    components: {
        hotChart
    },
    data(){
        return{
            cointype:'',
            thelk:'',
            title_name_list:[
                ['Github','Github'],
                ['社交媒体','Social Media'],
            ],
            gethup_list:[
                {
                    imgsrc:'../../static/commits.png',
                    value:'--',
                    unit:'Commits',

                    content:[
                        {n:'Branches',v:'--'},
                        {n:'Releases',v:'--'},
                        {n:'Contributors',v:'--'},
                    ]
                },
                {
                    imgsrc:'../../static/code.png',
                    value:'--',
                    unit:'Code',
                    content:[
                        {n:'Comment',v:'--'},
                        {n:'Blanks',v:'--'},
                    ]
                },
                {
                    imgsrc:'../../static/star.png',
                    value:'--',
                    unit:'Star',
                    content:[
                        {n:'Fork',v:'--'},
                        {n:'Watch',v:'--'},
                    ]
                },
            ],
            value_list:[],
            time_list:[],
            socialarr: [
                {
                    imgsrc:'../../static/twitter1.png',
                    word: ["Twitter Followers", "Tweets"],
                    value: ["--", "--"]
                },
                {
                    imgsrc:'../../static/reddit1.png',
                    word: ["Reddit Subscribers", "Reddit Online"],
                    value: ["--", "--"]
                },
                {
                    imgsrc:'../../static/face1.png',
                    word: ["Facebook Followers"],
                    value: ["--"]
                },
                {
                    imgsrc:'../../static/tel1.png',
                    word: ["Telegram Members"],
                    value: ["--"]
                }
            ],
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
             btn_arr: [
                { name: "Twitter", show: 0 },
                { name: "Reddit", show: 0 },
                { name: "Facebook", show: 0 },
                { name: "Telegram", show: 0 },
            ],
            btn_idx: 0,
            chart_select:0,
            chart_list:[],
            w:'',

        }
    },
    created(){
         this.w =  window.screen.width
        var code = newfn.getid();
        this.cointype = this.upfirst(code);
        this.$ajax.get(this.host+'/tokenrank/V2/githubIndexNew.json',{params:{"code": code}}).then((res)=>{
            let data = res.data.data;
            console.log(data)
            let arr = data.commit_his.reverse().slice(0,30);
            arr.forEach(item=>{
                let d = item.d
                this.time_list.push(item.d);
                this.value_list.push(item.c);
            })
            let chart_list = [];
            chart_list = arr.map(item=>{
                return{
                    name:item.d,y:item.c,
                }
            })   
            this.chart_list = chart_list.reverse();  
            // console.log(this.chart_list)
            this.gethup_list[0].value = data.commits||'--';
            this.gethup_list[0].content[0].v = data.branches||'--';
            this.gethup_list[0].content[1].v = data.releases||'--';
            this.gethup_list[0].content[2].v = data.contributors||'--';
            this.gethup_list[1].value = data.codes||'--';
            this.gethup_list[1].content[0].v = data.comment||'--';
            this.gethup_list[1].content[1].v = data.blanks||'--';
            this.gethup_list[2].value = data.star||'--';
            this.gethup_list[2].content[0].v = data.fork||'--';
            this.gethup_list[2].content[1].v = data.watch||'--';
        })

        this.$ajax.get(this.host+'/tokenrank/V2/socialIndex.json', {
                params: { code: code, page_size: 30, page_num: 0 }
            })
        .then(res=>{
            let data = res.data.data;
            console.log(data[0].telegram_attention)
            this.socialarr[0].value = [
                data[0].twitter_attention,
                data[0].tweets
            ];
            this.socialarr[1].value = [
                data[0].reddit_attention,
                data[0].reddit_actives
            ];
            this.socialarr[2].value = [data[0].facebook_attention];
            this.socialarr[3].value = [data[0].telegram_attention];

            data.forEach(e=>{
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
                
            })
           
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
             this.toogle_chart(this.btn_idx);
        })
         //获取twitter
        newfn.fornew('get','/tokenrank/V2/tokenInfo.json',{params:{"code": code}}).then((res)=>{
            let data = res.data.data;
            this.thelk = data.link.twitter;
            this.twitter(document, "script", "twitter-wjs");
        })
         $.ajax({
            type: "get",
            url: "https://www.reddit.com/r/ethereum.embed",
            dataType: "jsonp",
            data: {
                limit: 30
            },
            success: function(res) {
                $("#reddit").append(res);
            },
            fail: function(err) {
                console.log(err);
                
            }
        });
    },
    mounted(){
       
    },
    methods:{
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
        addgap(num){
            return newfn.conversion(num)
        },
          //首字母大写
        upfirst(name) {
            return name.substring(0, 1).toUpperCase() + name.substring(1);
        },
        draw(xarr, yarr, string) {
            if(xarr[0].length>5){//避免再次触发
                for(let i=0,l=xarr.length;i<l;i++){
                    xarr[i] = xarr[i].substring(5,xarr[i].length);
                }
            }           
            var chart = Highcharts.chart("top-chart", {
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
                    // spline: {
                    //     marker: {
                    //         radius: 2,
                    //         lineColor: "#a376d4",
                    //         lineWidth: 1,
                    //         fillColor:'#a376d4'
                    //     }
                    // },
                    series:{
                        color: "#a376d4",
                        marker: {
                            radius:2
                        }
                    }
                },
                    series: [
                    {
                        name: this.socialarr[string].word[0],
                        data: yarr
                    }
                ]
                // series: [
                //     {
                //         name: this.socialarr[string].word[0],
                //         marker: {
                //             symbol: "square"
                //         },
                //         data: yarr
                //     }
                // ]
            });
        },
        draw_teitter(xarr, yarr, string) {
            if(xarr[0].length>5){//避免再次触发
                for(let i=0,l=xarr.length;i<l;i++){
                    xarr[i] = xarr[i].substring(5,xarr[i].length);
                } 
            }
            var chart = Highcharts.chart("bottom-chart", {
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
                    series: {
                        marker: {
                            radius:2
                        }
                    }
                    // area: {
                    //     marker: {
                    //         enabled: false,
                    //         symbol: "circle",
                    //         radius: 1,
                    //         states: {
                    //             hover: {
                    //                 enabled: true
                    //             }
                    //         }
                    //     }
                    // }
                },
                series: [
                    {
                        name: this.socialarr[string].word[1],
                        data: yarr
                    }
                ]
            });
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
    },
    computed: mapState(["lanfalg", "usd_cny", "money_sym"])
}
</script>
<style lang="scss" scoped>
#ac-box{
    background: #fff;
    width: 100%;
    box-sizing: border-box;
    padding-left: 0.24rem;
    padding-right: 0.24rem;
    .git-box{
        overflow: hidden;
        border-bottom: .01rem solid  #e5e5e5;
        .title{
            font-size: 0.28rem;
            margin-top: 0.24rem;
            margin-bottom: 0.4rem;
        }
        .con-box:nth-of-type(2){
            margin-top: 0.2rem;
            margin-bottom: 0.2rem;
        }
        .con-box{
            width: 100%;
            height: 1.7rem;
            border: solid 0.01rem #e5e5e5;
            box-sizing: border-box;
            padding-left: 0.4rem;
            padding-right: 0.4rem;
            img{
                width: 0.88rem;
	            height: 0.88rem;
                float: left;
                margin-top: .41rem;
                margin-right: 0.4rem;
            }
            .mid{
                margin-top: .5rem;
                font-size: 0.32rem;
                letter-spacing: 0.02rem;
	            color: #333333;
                float: left;
                width: 1.5rem;
                p{
                    width: 100%;
                    float: left;
                }
                span{
                     width: 100%;
                     float: left;
                    letter-spacing: 0.01rem;
	                color: #999999;
                    font-size: 0.2rem;
                }

            }
            .info-box{
                float: right;
                height: 100%;
                display: flex;
                justify-content: space-between;
                align-items:center;
                p{
                    span{
                        color: #999999;
                        font-size: 0.28rem;
                        display: block;
                    }
                }
                p:nth-of-type(1){
                    float: left;
                    width: 1.7rem;
                    // margin-right: 0.3rem;
                }
                p:nth-of-type(2){
                    float: left;
                    width: 0.94rem;
                    span{
                        text-align: right
                    }
                }
            }
        }
    }
    .social-box{
        overflow: hidden;
        .title{
            font-size: 0.28rem;
            margin-top: 0.24rem;
            margin-bottom: 0.4rem;
        }
        .social-con{
            li{
               height: 1rem;
               width: 100%;
               position: relative;
               img{
                    width: 0.5rem;
	                height: 0.5rem;
                    float: left;
                    margin-top: 0.25rem;
               } 
               .name{
                   float: left;
                //    display: flex;
                //     align-items:center;
                position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #999999;
                    font-size: 0.28rem;
                    margin-left: 1.5rem;
               }
               .num{
                   float: right;
                    //  display: flex;
                    // align-items:center;
                    position: absolute;
                    width: 2rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #333333;
                    font-size: 0.28rem;
                    right: 1.06rem;
                    text-align: right;
               }
            }
        }
    }
    .table-box{
        margin-top: 0.4rem;
        ul{
            display: flex;
            flex-wrap: nowrap;
            justify-content: flex-start;
            li{
                margin-right: 0.4rem;
                color: #999999;
                font-size: 0.28rem;
                font-weight: 500;
            }
            li:last-of-type{
                margin-right: 0;
            }
            .table-active{
                color:$color;
            }
        }
        .table{
            p{
                font-size: 0.2rem;
                color: #999999;
                margin-top: .2rem;
                margin-bottom: .2rem;
            }
            #top-chart,#bottom-chart{
                height: 4rem;
            }
        }
    }
    #twitter-new{
        margin-top: 0.2rem;
        font-size: 0.28rem;
        
    }
    #reddit-new{
        margin-top: 0.2rem;
        font-size: 0.28rem;
        
    }
}
</style>
