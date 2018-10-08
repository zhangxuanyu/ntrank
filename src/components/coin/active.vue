<template>
    <div class="baseout">
        <div class="cont1">
            <p>Github</p>
            <div class="card_out">
                <div v-for="(item,index) in arr" class="card_in">
                    <div class="increase">
                        <img :src="picarr[index]" alt="">
                        <p>
                            <span>{{item.all[0]}}</span>
                            <span>{{item.all[1]}}</span>
                        </p>
                        <div class="info_out">
                            <div v-for="(iten,ind) in item.word" class="info_in">
                                <p>{{item.value[ind]?item.value[ind]:'--'}}</p>
                                <p>{{iten}}</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>

        <div class="cont1">
             <p>社交媒体</p>
             <div class="card_out">
                 <div v-for="(item,index) in socialarr" class="card_reddit">
                     <div class="reddit_info">
                         <p><img :src="picarr[index+3]" alt=""></p>
                         <div class="reddie_left">
                             <p v-for="iem in item.word">{{iem}}</p>
                         </div>
                         <div class="reddie_right">
                             <p v-for="iem in item.value">{{iem?addgap(iem):'--'}}</p>
                         </div>
                     </div>
                 </div>
             </div>
             <div v-for="(ite,ines) in arr1" class="chart_btn cur" :style="chart_select==ines?{backgroundColor:'#a376d4'}:{}" @click="toogle_chart(ines)" v-if="socialarr[ines].value[0]">{{ite}}</div>
             <div class="chart_out">
                 <!-- <span class="tips">【分析】</br>Twitter Followers较上周环比+26个关注；Tweets较上周环比+3次推文。 </span> -->
                <p style="line-height:20px;padding: 20px 0px;font-weight: 600;font-size:14px;font-weight:600;">{{chart_select==0?this.socialarr[1].word[0]:chart_select==1?this.socialarr[0].word[0]:chart_select==2?this.socialarr[2].word[0]:this.socialarr[3].word[0]}}</p>
                <div id="top_chart"></div>
                <p v-show="this.chart_select == 0 || this.chart_select == 1" style="line-height:20px;padding: 20px 0px;font-weight: 600;font-size:14px;font-weight:600;">{{chart_select==0?this.socialarr[1].word[1]:this.socialarr[0].word[1]}} </p>
                <div id="bottom_chart" v-show="this.chart_select == 0 || this.chart_select == 1"></div>
             </div>
        </div>

        <div class="twitter" v-show="chart_select == 0">
          <div>
              <span class="twitter_title">Twitter</span>
              <div class="twitter_content">
                  <div class="twitter-share-button" id="container"></div>
                        <a class="twitter-timeline" data-width="100%" :href="thelk">Tweets by {{cointype}}</a> 
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


<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<script>
import Highcharts from 'highcharts/highstock';
import axios from 'axios';
import newfn from '../../../static/base/base.js'
export default {
    data(){
        return{
            arr:[{
                all:['','Commits'],
                word:['Branches','Releases','Contributors'],
                value:[]
            },{
                all:['--','Code'],
                word:['Comment','Blanks'],
                value:['','']
            },{
                all:['','Star'],
                word:['Fork','Watch'],
                value:[]
            }],
            arr1:['Twitter','Reddit','Facebook','Telegram'],
            socialarr:[
                {
                    word:['Reddit Subscribers','Reddit Online'],
                    value:[12,33]
                },
                {
                    word:['Twitter Followers','Tweets'],
                    value:[12,33]
                },
                {
                    word:['Facebook Followers'],
                    value:[12]
                },
                {
                    word:['Telegram Members'],
                    value:['']
                }
            ],
            chart_select:0,
            picarr:['../../../static/commits.png','../../../static/code.png','../../../static/star.png','../../../static/reddit1.png','../../../static/twitter1.png','../../../static/face1.png','../../../static/tel1.png'],
            thelk:'',
            xarr:[],
            t_follow:[],
            twsarr:[],
            red_sub:[],
            red_ol:[],
            face_fl:[],
            cointype:''
        }
    },
    mounted(){
        var code = newfn.getid()
        this.cointype = code
        var that = this
        $.ajax({
            type:'get',
            url:'https://www.reddit.com/r/ethereum.embed',
            dataType: 'jsonp',
            data:{
                limit:15
            },
            success:function(res){
                $('#reddit').append(res)

            },
            fail:function(err){
                console.log(err)
            }
        })

        //获取twitter
        axios.post('http://service.tokenrank.net'+'/tokenrank/twitter.json',{
            "code": this.upfirst(code)
        },{
            headers: {'Content-Type': "application/x-www-form-urlencoded"}
        }).then(res =>{
            console.log(typeof(res.data.info.twitter))
           console.log('请求成功')
           this.thelk = res.data.info.twitter
           this.twitter(document,"script","twitter-wjs")
           setTimeout(()=>{
               console.log($('.timeline-Widget'))
           },2000)
        },
        err =>{
            
        })

        //获取活跃度信息
        newfn.fornew('get','/tokenrank/V2/githubIndex.json',{params:{"code":code}}).then(function(data){
            that.arr[0].all[0] = data.data.data[0].commits
            that.arr[0].value = [data.data.data[0].branches,data.data.data[0].releases,data.data.data[0].contributors]
            that.arr[2].value = [data.data.data[0].fork,data.data.data[0].watch]
            that.arr[2].all[0] = data.data.data[0].star
        })

        newfn.fornew('get','/tokenrank/V2/socialIndex.json',{params:{"code":code,"page_size":30,"page_num":0}}).then((data)=>{
            console.log(data)
            this.xarr=[]
            this.t_follow=[]
            this.twsarr=[]
            this.red_sub=[]
            this.red_ol=[]
            this.face_fl=[]
            this.socialarr[0].value = [data.data.data[0].reddit_attention,data.data.data[0].reddit_actives]
            this.socialarr[1].value = [data.data.data[0].twitter_attention,data.data.data[0].tweets]
            this.socialarr[2].value = [data.data.data[0].facebook_attention]
            data.data.data.forEach(e => {
                this.xarr.unshift(e.data_time)
                this.t_follow.unshift(e.twitter_attention)
                this.twsarr.unshift(e.tweets)
                this.red_sub.unshift(e.reddit_attention)
                this.red_ol.unshift(e.reddit_actives)
                this.face_fl.unshift(e.facebook_attention)
            });
            this.draw(this.xarr,this.t_follow,1)
            this.draw_teitter(this.xarr,this.twsarr,1)
        })
      
    },
    methods:{
        //首字母大写
        upfirst(aa){
            // console.log('bit'.toUpperCase())
            return aa.substring(0,1).toUpperCase()+aa.substring(1)
        },
        toogle_chart(a){
            this.chart_select = a
            if(a == 0){
                this.draw(this.xarr,this.t_follow,1)
                this.draw_teitter(this.xarr,this.twsarr,1)
            }else if(a == 1){
                this.draw(this.xarr,this.red_sub,0)
                this.draw_teitter(this.xarr,this.red_ol,0)
            }else if(a == 2){
                this.draw(this.xarr,this.face_fl,2)
                this.draw_teitter()
            }else{
                this.draw(this.xarr,this.t_follow,1)
                this.draw_teitter(this.xarr,this.twsarr,1)
            }
            
        },
        draw(xarr,yarr,string){
            var chart = Highcharts.chart('top_chart', {
                chart: {
                    type: 'spline'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories: xarr
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    labels: {
                        formatter: function () {
                            return this.value/1000 + 'k' ;
                        }
                    }
                },
                tooltip: {
                    crosshairs: true,
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
                    spline: {
                        marker: {
                            radius: 4,
                            lineColor: '#666666',
                            lineWidth: 1
                        }
                    }
                },
                series: [{
                    name: this.socialarr[string].word[0],
                    marker: {
                        symbol: 'square'
                    },
                    data: yarr
                }]
            });
        },
        draw_teitter(xarr,yarr,string){
            var chart = Highcharts.chart('bottom_chart',{
                chart: {
                    type: 'spline'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories: xarr
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    labels: {
                        formatter: function () {
                            return this.value/1000 +'k'  ;
                        }
                    }
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
                    area: {
                        marker: {
                            enabled: false,
                            symbol: 'circle',
                            radius: 2,
                            states: {
                                hover: {
                                    enabled: true
                                }
                            }
                        }
                    }
                },
                series: [{
                    name: this.socialarr[string].word[1],
                    data: yarr
                }]
            });
        },
        twitter(d,s,id){
          console.log('twitter')
          var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs)}
      },
      addgap(aa){
            return newfn.conversion(aa)
        },
    }
}
</script>

<style scoped lang="scss">
.baseout{
    .cont1{
        padding: 20px;
        background-color: #fff;
        margin-bottom: 20px;
        overflow: hidden;
        p{
            color: #666;
            text-align: left;
        }
        .card_out{
            margin-top: 20px;
            display: flex;
            justify-content:space-between;
            .card_in{
                width: 33.33%;
                min-width: 388px;
                padding: 0 10px;
                .increase{
                    width: 100%;
                    height: 136px;
                    border: 1px solid #d8d7da;
                    padding:20px 20px 20px 80px;
                    position: relative;
                    img{
                        position: absolute;
                        top: 45px;
                        left: 23px;
                        width: 46px;
                        height: 46px;
                    }
                    p{
                        // margin-top: 30px;
                        color: $basecolor;
                        text-align: center;
                        margin-bottom: 10px;
                        span:nth-of-type(1){
                            font-size: 24px;
                        }
                         span:nth-of-type(2){
                            font-size: 16px;
                        }
                    }
                    .info_out{
                        display: flex;
                        justify-content:space-between;
                        .info_in{
                            width: 33.33%;
                            line-height: 24px;
                            p{
                                margin: 0;
                                color: $subcolor;
                            }
                        }
                    }
                }
            }
            .card_reddit{
                width: 25%;
                min-width: 295px;
                padding: 0 10px;
                .reddit_info{
                    width: 100%;
                    height: 125px;
                    border: 1px solid #d8d7da;
                    padding: 20px;
                    p{
                        margin-bottom: 10px;
                        img{
                            width: 24px;
                        }
                    }
                    .reddie_left{
                        float: left;
                        line-height: 24px;
                        p{
                            color: $subcolor;
                            margin: 0;
                        }
                    }
                    .reddie_right{
                        float: right;
                        line-height: 24px;
                        p{
                            color: $basecolor;
                            font-weight: 600;
                            font-size: 24px;
                            margin: 0;
                        }
                    }
                }
            }
        }
        .chart_btn{
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
        .chart_out{
            width: 100%;
            padding-right: 260px;
            position: relative;
            margin-top: 70px;
            .tips{
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
            #top_chart{
                width: 100%;
                height: 235px;
            }
            #bottom_chart{
                width: 100%;
                height: 235px;
            }
        }
    }
    .twitter,.reddit{
        width: 100%;
        margin-top: 20px;
    }
    .reddit{
        text-align: left;
    }
    .reddit_content{
    width: 100%;
    height: $reddith;
    overflow: scroll;
}
.reddit_content li{
    margin-bottom: 40px;
}
.reddit_word{
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
    font-size: 14px;
    color: #292929;
    line-height: 20px;
    margin-bottom: 11px;
}
.reddit_other{
    color: #8f8f8f;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;

}
::-webkit-scrollbar {display:none}
.twitter_title{
    display: block;
    color: black;
    margin-left: 10px;
    font-size: 20px;
    margin-bottom: 42px;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
}
.twitter_content{
    width: 100%;
    height: $reddith;
    overflow: scroll;
}
.twitter_header{
    float: left;
    height: 100px;
    margin-left: 10px;
    margin-right: 10px;
}
.twitter_header img{
    width: 48px;
    height: 48px;
    border-radius: 50%;
}
.twitter_word{
    float: left;
    width: 100%;
}
.twitter_people{
    margin-bottom: 10px;
}
.twitter_word .twitter_people span{
    font-size: 14px;
    color: #8f8f8f;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
}
.twitter_word .twitter_people span:nth-of-type(1){
    font-size: 14px;
    color: #292929;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
    font-weight: 600;
}
.twitter_detail{
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: #292929;
}
.twitter_word img{
    max-width: 450px
}
.twitter_icon{
    margin-top: 20px;
    overflow: hidden;
    height: 18px;
    padding-bottom: 45px;
}
.twitter_icon div{
    float: left;
    margin-right: 53px;
    height: 16px;
    line-height: 16px;
}
.twitter_icon div img{
    width: 16px;
    height: 16px;
    vertical-align:middle;
    margin-right: 10px;
}
.twitter_icon div span{
    font-size: 12px;
    display: inline-block;
    height: 100%;
}

}

</style>

