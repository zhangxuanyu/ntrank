<template>
    <div id="base-box">
        <div class="word">{{coin_intro}}</div>
        <ul class="info-box">
            <li class="clearfix" v-for="(item,index) in basearr" :key="index">
                <span>{{item.name[lanfalg]}}</span>
                <span>{{item.value}}</span>
            </li>
        </ul>
        <div class="media-box">
            <p class="title">{{basetype[0][lanfalg]}}</p>
            <ul>
                <li v-for="(item,index) in media_list" :key="index">
                    <div v-if="index != 7" >
                        <span>{{item.name[lanfalg]}}</span>
                        <img :src="item.imgsrc[0]" alt="" v-if="item.value"  @click="opennew(index)">
                        <img :src="item.imgsrc[1]" alt="" v-else>
                    </div>
                    <div v-if="index === 7">
                        <span>{{item.name[lanfalg]}}</span>
                        <i v-for="(it,idx) in item.value" :key="idx">
                            <img :src="item.imgsrc[0]" alt="" v-if="it"  @click="opennew(index,idx)">
                            <img :src="item.imgsrc[1]" alt="" v-else>
                        </i>
                    </div>
                </li>
            </ul>
        </div>
        <div class="ico-box">
             <p class="title">{{basetype[1][lanfalg]}}</p>  
             <ul>
                <li v-for="(item,index) in together_info" :key="index">
                    <span>{{item.name[lanfalg]}}</span>
                    <span>{{item.value}}</span>
                </li>
            </ul>
            <div class="distrebution-box clearfix">
                <span>{{tgchartfont[lanfalg]}}</span>
                <span  style=" color: #333333" v-if="!show_chart">--</span>
                <div id="basechart" v-if="show_chart"></div>
                <div class="dis-name-box" v-if="show_chart"> 
                    <div v-for="(item,index) in chartfont" :key="index">
                        <i></i>
                        {{item.name[lanfalg]+' '+item.value+'%'}}
                    </div>
                </div>
            </div> 
        </div>
        <div class="road-box">
            <div class="title">{{basetype[2][lanfalg]}}</div>
            <div class="road-con">
                <div class="acon">
                    <div class="line"></div>
                    <div class="con" v-for="(item,index) in btc_news" :key="index">
                        <div class="circle"></div>
                        <span>{{item.news_time}}</span>
                        <span>{{item.title}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import newfn from "../../static/base/base.js";
import {mapState} from 'Vuex'
export default {
    data(){
        return{
            tgchartfont: ["代币分配", "Token distribution"],
            basetype:[],
            chartfont:[
                {name:["基金会", "Foundation"],value:''},
                {name:["众筹", "Crowdfunding"],value:''},
                {name:["社区", "Social"],value:''},
                {name:["团队", "Team"],value:''},
                {name:["其他", "Others"],value:''},
            ],
            basearr:[
                {name:[],value:''},
                {name:[],value:''},
                {name:[],value:''},
                {name:[],value:''},
                {name:[],value:''},
                {name:[],value:''},
            ],
            media_list:[
                // {name:['官网','Website'],value:'',imgsrc:["../../static/home1.png", "../../static/home2.png"],},
                // {name:['GitHub','GitHub'],value:'',imgsrc: ["../../static/git1.png", "../../static/git2.png"],},
                {name: ['FaceBook','FaceBook'],value:'',imgsrc: ["../../static/face1.png", "../../static/face2.png"]},
                {name:['Telegram','Telegram'],value:'',imgsrc:["../../static/tel1.png", "../../static/tel2.png"],},
                {name:['Twitter','Twitter'],value:'',imgsrc:["../../static/twitter1.png","../../static/twitter2.png"],},
                {name:['Slack','Slack'],value:'',imgsrc:["../../static/slack1.png", "../../static/slack2.png"],},
                {name:['Reddit','Reddit'],value:'',imgsrc:["../../static/reddit1.png", "../../static/reddit2.png"],},
                // {name:['浏览器', 'Explorer'],value:'',imgsrc: ["../../static/block1.png", "../../static/block2.png"]},
                // {name:['白皮书','Whitepaper'],value:'',imgsrc:["../../static/white1.png", "../../static/white2.png"],}   
            ],
            together_info:[
                {value:'--',name:''},
                {value:'--',name:''},
                {value:'--',name:''},
            ],
            btc_news:[],
            coin_intro:'',
            base_option:[],
            show_chart:true,
        }
    },
    created(){
        var code = newfn.getid();
        var bbc = alllanguage.base.baseinfo;
        var together_info = alllanguage.base.together_info;
        this.basetype = alllanguage.base.basetype;
        this.basearr = bbc.map(item=>{
            return{
                name:item,value:''
            }
        })
        this.together_info = together_info.map(item=>{
            return{
                name:item,value:''
            }
        })
        this.$ajax.get(this.host+'/tokenrank/V2/tokenInfo.json',{
                params: { code: code }
        })
        .then(res=>{
            let data =res.data.data;
            console.log(data)
            this.coin_intro = data.base_info.coin_intro;
            let base_info = data.base_info;
            let link = data.link;
            let ico_info = data.ico_info;
            this.basearr[0].value = newfn.conversion(base_info.release_amount)+' '+base_info.short_name||'--';
            this.basearr[1].value = base_info.publish_time||'--';
            this.basearr[2].value = base_info.stock_exchange||'--';
            this.basearr[3].value = base_info.developer||'--';
            this.basearr[4].value = base_info.core_algorithm||'--';
            this.basearr[5].value = base_info.block_time||'--';


            
   
            this.media_list[0].value = link.facebook||'';
            this.media_list[1].value = link.telegram||'';
            this.media_list[2].value = link.twitter||'';
            this.media_list[3].value = '';
            this.media_list[4].value = link.reddit||'';

  
            

            this.together_info[0].value = '--';
            this.together_info[1].value = ico_info.crowd_funding_price||'--';
            this.together_info[2].value = ico_info.funds_amount||'--';

            if(ico_info.foundation||ico_info.crowd_funding||ico_info.community||ico_info.team||ico_info.other){
            // if(true){
                this.show_chart = true;
                let a,b,c,d,e;
                if(ico_info.foundation){
                    a = ico_info.foundation.replace(/%/, "")*1;
                }else{
                    a = 0
                }
                if(ico_info.crowd_funding){
                    b = ico_info.crowd_funding.replace(/%/, "")*1;
                }else{
                    b = 0
                }
                if(ico_info.community){
                    c = ico_info.community.replace(/%/, "")*1;
                }else{
                    c = 0
                }
                if(ico_info.team){
                    d = ico_info.team.replace(/%/, "")*1;
                }else{
                    d = 0
                }
                if(ico_info.other){
                    e = ico_info.other.replace(/%/, "")*1;
                }else{
                    e = 0
                }
                this.chartfont=[
                    {name:["基金会", "Foundation"],value:a},
                    {name:["众筹", "Crowdfunding"],value:b},
                    {name:["社区", "Social"],value:c},
                    {name:["团队", "Team"],value:d},
                    {name:["其他", "Others"],value:e},
                ];
                // this.chartfont=[
                //     {name:["基金会", "Foundation"],value:10},
                //     {name:["众筹", "Crowdfunding"],value:10},
                //     {name:["社区", "Social"],value:30},
                //     {name:["团队", "Team"],value:40.9},
                //     {name:["其他", "Others"],value:59.9},
                // ];
                this.draw()
            }else{
                this.show_chart = false
            }
            this.btc_news = data.btc_news;   
        })
    },
    mounted(){
        
    },
    methods:{
        opennew(index,idx){
            let web = '';
            if(index === 7){
                web = this.media_list[index].value[idx].url;
                window.open(web)
            }else{
                web = this.media_list[index].value;
                window.open(web)
            }
        },
        draw(){
            let option = {   
                    
                color:['#fddb6c','#fca5c5','#85c098','#9de6f4','#f86a65'],      
                series: [
                    {
                        hoverAnimation:false,
                        legendHoverLink:false,
                        name:'访问来源',
                        type:'pie',
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'left'
                            },
                        },
                        radius: ['50%', '70%'],
                        center: ['35%', '35%'],
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:this.chartfont
                    //     data:[
                    //          {name:["基金会", "Foundation"],value:10},
                    // {name:["众筹", "Crowdfunding"],value:10},
                    // {name:["社区", "Social"],value:30},
                    // {name:["团队", "Team"],value:40},
                    // {name:["其他", "Others"],value:59},
                    //     ]
                    }
                ]
            };
            var echarts = require("echarts");
            var myChart = echarts.init(document.getElementById("basechart"));
            myChart.setOption(option);
            setTimeout(function() {
                window.onresize = function() {
                    myChart.resize();
                };
            }, 200);
        }
    },
    computed: mapState(["lanfalg", "usd_cny", "money_sym"])
}
</script>
<style lang="scss" scoped>
#base-box{
    background: #fff;
    box-sizing: border-box;
    padding-left: 0.26rem;
    padding-right: 0.26rem;
    width: 100%;
    .word{
        color: #999999; 
        font-size: 0.28rem;
        line-height: 0.42rem;
        padding-top: 0.2rem;
    }
    .info-box{
        padding-bottom: 0.4rem;
        margin-top: 0.6rem;
        border-bottom: 0.01rem solid #e5e5e5;
        li{
            margin-bottom: 0.13rem;
            height:  0.42rem;
            span{
                float: left;
                width: 2.77rem;
                text-align: left;
                line-height: 0.42rem;
                font-size: 0.28rem;
                color: #999
            }
            span:nth-of-type(2){
                color: #333;
            }
        }
    }
    .media-box{
        border-bottom: 0.01rem solid #e5e5e5;
        .title{
            color: #333;
            font-size: 0.28rem;   
            text-align: left;
            margin-top: 0.24rem;
            margin-bottom: 0.21rem;
        }
        ul{
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            padding-bottom: 0.2rem;
            li{
                margin-right: 1.4rem;
                line-height: 0.9rem;
                height: 0.9rem;
                color: #999999;
                font-size: 0.28rem;
                width: 2.18rem;
                span{
                    float: left;
                }
                img{
                    float: right;
                    width: 0.5rem;
	                height: 0.5rem;
                    margin-top: 0.2rem;
                }
            }
            li:nth-of-type(2n){
                margin-right: 0;
            }
            li:nth-of-type(8){
                width: auto;
                span{
                    margin-right: 0.7rem;
                }
                i{
                    display: inline-block;
                    margin-right: 0.06rem;
                }
                i:last-of-type{
                    margin-right: 0;
                }
            }
        }
    }
     .ico-box{
        padding-bottom: 0.4rem;
        border-bottom: 0.01rem solid #e5e5e5;
        .title{
            color: #333;
            font-size: 0.28rem;   
            text-align: left;
            margin-top: 0.24rem;
            margin-bottom: 0.21rem;
        }
        ul{
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            li{
                margin-right: 1.4rem;
                line-height: 0.33rem;
                color: #999999;
                font-size: 0.28rem;
                width: 100%;
                margin-bottom: 0.14rem;
                span{
                    float: left;
                    width: 2.5rem;
                }
                span:nth-of-type(2){
                    color: #333333;
                    width: auto;
                }
            }
            li:nth-of-type(2n){
                margin-right: 0;
            }
        }
        .distrebution-box{
            margin-right: 1.4rem;
            line-height: 0.33rem;
            color: #999999;
            font-size: 0.28rem;
            width: 100%;
            position: relative;
            span{
                float: left;
                width: 2.5rem;
            }
            #basechart{
                float: left;
                height: 4rem;
                width:calc(100% - 4rem)
            }
            .dis-name-box{
                width: 100%;
                position: absolute;
                left: 0;
                bottom: 0.2rem;
                text-align: left;
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                i{
                    display: inline-block;
                    height: 0.2rem;
                    width: 0.2rem;
                }
                div:nth-of-type(1){
                    width: 2.4rem;
                    i{
                        background: #fddb6c;
                    }
                }
                div:nth-of-type(2){
                    width: 3rem;
                    i{
                        background: #fca5c5;
                    }
                }
                div:nth-of-type(3){
                    width: 2.4rem;
                    i{
                        background: #85c098;
                    }
                }
                div:nth-of-type(4){
                    width: 2.5rem;
                    i{
                        background: #9de6f4;
                    }
                }
                div:nth-of-type(5){
                    width: 2rem;
                    i{
                        background: #f86a65;
                    }
                }
            }
        }
     }
    .road-box{
        padding-bottom: .65rem;
        .title{
            color: #333;
            font-size: 0.28rem;   
            text-align: left;
            margin-top: 0.24rem;
            margin-bottom: 0.21rem;
        }
        .road-con::-webkit-scrollbar {
            width: 0; /* 滚动条宽度为0 */
            height: 0; /* 滚动条高度为0 */
            display: none; /* 滚动条隐藏 */
        }
        .road-con{
            // height: 5rem;
            width: 100%;
            overflow: scroll;

            .acon{
                .line{
                    position: absolute;
                    left: 0.1rem;
                    background: url('../../static/dashed.png');
                    width: 4px;
                    height: 100%;
                    top: 0.12rem
                }
                    position: relative;
                .con{
                    position: relative;
                    box-sizing: border-box;
                    padding-left: 0.6rem;
                    letter-spacing: 0.01rem;
                    color: #333333;
                    font-size: 0.28rem;
                    line-height: 0.4rem;
                    padding-bottom: 0.35rem;
                    span:nth-of-type(1){
                        display: block;
                        color: #999999;
                        line-height: 0.44rem;
                    }
                    .circle{
                        width: 0.22rem;
                        height: 0.22rem;
                        background-color: #a376d4;
                        border-radius: 50%;
                        position: absolute;
                        left: 0.02rem;
                        top: 0.12rem
                    }
                }

            }

        }
    }
}
</style>
