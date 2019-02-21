<template >
    <div class="aaa">
  <div class="box">
      <!-- 顶部广告位 -->
      <div class="top_advertis" v-if="top_advertising">
          <img :src="top_close" alt="" class="sst" @mouseenter="enter1()" @mouseleave='leave1()' @click="close1()">
          <img :src="top_advertising" alt="" @click="gotoTop_advertising">
      </div>
      <!-- 左边广告位 -->
      <div class="left_advertis" v-if="left_advertising">
          
          <img :src="left_advertising" alt="" @click="gotoTop_advertising">
      </div>
      <pc-loading v-show="$store.state.loadshow"></pc-loading>
      <div class="top"  v-show="!$store.state.loadshow">
          <div class="top_left">
              <div class="intro">
                  <img :src="theicon" alt="" class="intro_logo">
                  <div class="intro_content">
                        <span class="intro_name" v-if="$store.state.lanfalg">{{info.name}}({{info.short_name}}) </span>
                        <span class="intro_name" v-if="!$store.state.lanfalg">{{info.en_name}}({{info.short_name}})</span>
                        <div class="other">
                            <span v-if="$store.state.lanfalg" @click="website">官方网站</span>
                            <span v-if="!$store.state.lanfalg" @click="website">Website</span>
                            <span v-if="$store.state.lanfalg" @click="source_code">源代码</span>
                            <span v-if="!$store.state.lanfalg" @click="source_code">Source Code</span>
                            <span v-if="$store.state.lanfalg" v-for="(item,index) in info.block_station" @click="block(index)">区块站{{index+1}}</span>
                            <span v-if="!$store.state.lanfalg" v-for="(item,index) in info.block_station" @click="block(index)">Blockchain{{index+1}}</span>
                        </div>
                        <div class="book">
                            <span  v-if="$store.state.lanfalg" @click="whitepaper">白皮书</span>
                            <span  v-if="!$store.state.lanfalg" @click="whitepaper">Whitepaper</span>
                        </div>
                        <div class="price">
                            <!-- 汇率结算 -->
                            <span v-if="$store.state.currency == 2">￥{{money_list.price_cny.toFixed(2)}}</span>
                            <span v-if="$store.state.currency == 1">${{money_list.price_usd}}</span>
                            <span v-if="money_list.change_quantity<0" style="color:#f53131">{{money_list.change_quantity}}%</span>
                            <span v-if="money_list.change_quantity>=0" style="color:#00992e">{{money_list.change_quantity}}%</span>
                            <span  v-if="$store.state.currency == 2">${{money_list.price_usd}}</span>
                            <span  v-if="$store.state.currency == 1">￥{{money_list.price_cny.toFixed(2)}}</span>
                        </div>
                        <div class="word">
                            <div>
                                <span v-if="$store.state.lanfalg">市值</span>
                                <span v-if="!$store.state.lanfalg">Market Cap</span>
                                 <!-- 汇率结算 -->
                                <span class="word_num"  v-if="$store.state.currency == 1">${{money_list.market_value}}</span>
                                <span class="word_num" v-if="$store.state.currency == 2">￥{{money_list.mark_zh}}</span>
                            </div>
                            <div>
                                <span v-if="$store.state.lanfalg">流通供给量</span>
                                <span v-if="!$store.state.lanfalg">Circulating Supply</span>
                                 <!-- 汇率结算 -->
                                <span class="word_num"  v-if="$store.state.currency == 1">${{money_list.circulation_supply}}</span>
                                <span class="word_num"  v-if="$store.state.currency == 2">￥{{money_list.circulation_zh}}</span>
                            </div>
                            <div>
                                <span v-if="$store.state.lanfalg">交易量(24小时)</span>
                                <span v-if="!$store.state.lanfalg">Volume(24h)</span>
                                <span class="word_num">{{money_list.trade_volumes}}{{info.short_name}}</span>
                            </div>
                        </div>
                  </div>
              </div>
              <div class="middle_ad" v-if="text" @click="gotoTop_advertising">
                   <img :src="middle_close" alt="" class="ssm" @mouseenter="enter3()" @mouseleave='leave3()' @click="close3()">
                  <p class="big">Bitcoin 香港 - 免费 $10000 联系账户</p>
                  <p>每周7天，全天候交易 iqoption.com/Bitcoin</p>
              </div>
              <div class="chart">
                  <div class="chart_name" v-if="$store.state.lanfalg">价格趋势</div>
                  <div class="chart_name" v-else>Price Chart</div>
                  <div id="chart_content"></div>
              </div>
          </div>
          <div class="top_right">
              <div class="type">
                  <div class="top_right_name">
                      
                    <div class="type_icon"> <img :src="info.icon" alt="" style="width:24px;height:24px;"> </div>
                    <div class="type_name"  v-if="$store.state.lanfalg">社交指数</div>
                    <div class="type_name"  v-if="!$store.state.lanfalg">Social</div>
                  </div>
                  <ul>
                      <li>
                          <span  v-if="$store.state.lanfalg">Reddit订阅</span>
                          <span  v-if="!$store.state.lanfalg">Reddit Subscribers</span>
                          <span v-if="socialarr.reddit_attention != -999">{{socialarr.reddit_attention}}</span>
                      </li>
                      <li>
                          <span  v-if="$store.state.lanfalg">Reddit活跃</span>
                          <span  v-if="!$store.state.lanfalg">Currently Online</span>
                          <span v-if="socialarr.reddit_actives != -999">{{socialarr.reddit_actives}}</span>
                      </li>
                      <li>
                          <span  v-if="$store.state.lanfalg">Twitter关注</span>
                          <span  v-if="!$store.state.lanfalg">Twitter Followers</span>
                          <span v-if="socialarr.twitter_attention != -999">{{socialarr.twitter_attention}}</span>
                      </li>
                      <li>
                          <span  v-if="$store.state.lanfalg">Twitter推文</span>
                          <span  v-if="!$store.state.lanfalg">Tweets </span>
                          <span v-if="socialarr.tweets != -999">{{socialarr.tweets}}</span>
                      </li>
                      <li>
                          <span  v-if="$store.state.lanfalg">Facebook关注</span>
                          <span  v-if="!$store.state.lanfalg">Facebook Followers</span>
                          <span v-if="socialarr.reddit_actives != -999">{{socialarr.reddit_actives}}</span>
                      </li>
                      <li>
                          <span  v-if="$store.state.lanfalg">telegram成员</span>
                          <span  v-if="!$store.state.lanfalg">Telegram Members</span>
                          <span v-if="socialarr.telegram_attention != -999">{{socialarr.telegram_attention}}</span>
                      </li>
                  </ul>
                  
              </div>
              <div class="right_adv"  v-if="right_ad">
                  <img :src="right_close" alt="" class="ssr" @mouseenter="enter2()" @mouseleave='leave2()' @click="close2()">
                      <img :src="right_ad" alt="" @click="gotoTop_advertising">
                  </div>
              <div class="type typebut">
                  <div class="top_right_name">
                      
                    <div class="type_icon"> <img :src="info.icon" alt="" style="width:24px;height:24px;"> </div>
                    <div class="type_name"  v-if="$store.state.lanfalg">GitHub指数</div>
                    <div class="type_name"  v-if="!$store.state.lanfalg">GitHub</div>
                  </div>
                  <ul>
                      <li>
                          <span>Commits</span>
                          <span v-if="gitarr.commits != -999">{{gitarr.commits}}</span>
                      </li>
                      <li>
                          <span>Contributors</span>
                          <span v-if="gitarr.contributors != -999">{{gitarr.contributors}}</span>
                      </li>
                      <li>
                          <span>Fork</span>
                          <span v-if="gitarr.fork != -999">{{gitarr.fork}}</span>
                      </li>
                      <li>
                          <span>Branches</span>
                          <span v-if="gitarr.branches != -999">{{gitarr.branches}}</span>
                      </li>
                      <li>
                          <span>Watch</span>
                          <span v-if="gitarr.watch != -999">{{gitarr.watch}}</span>
                      </li>
                      <li>
                          <span>Releases</span>
                          <span v-if="gitarr.releases != -999">{{gitarr.releases}}</span>
                      </li>
                      <li>
                          <span>Star</span>
                          <span v-if="gitarr.star != -999">{{gitarr.star}}</span>
                      </li>
                  </ul>
                  
              </div>
              <div class="time">
                  <div class="top_right_name">
                        <div class="type_icon"><img :src="theicon" alt=""  style="width:24px;height:24px;"></div>
                        <div class="time_name"  v-if="$store.state.lanfalg">路线图</div>
                        <div class="time_name"  v-if="!$store.state.lanfalg">Roadmap</div>
                  </div>
                  <div class="route_content">
                      <ul :style="routemg" id="routeul">
                        <li class="time_li" v-for="(item,index) in time_list">
                            <img src="../../../assets/icon-btc.png" alt="">
                            <span>{{item.news_time}}</span>
                            <span>{{item.title}}</span>
                        </li>
                    </ul>
                  </div>  
              </div>
          </div>
      </div>
      <div class="bottom"  v-show="!$store.state.loadshow">
          <div class="bottom_title" >
              <div @click="change(index)" v-if="$store.state.lanfalg"  v-for="(item,index) in zh_change_list" :class="active_num == index?'active':'' "> {{item.name}}</div>
              <div @click="change(index)" v-if="!$store.state.lanfalg" v-for="(item,index) in en_change_list" :class="active_num == index?'active':'' "> {{item.name}}</div>
          </div>
          <router-view></router-view>
          <div class="onrtv">
              <div class="ontitle"  v-if="$store.state.lanfalg">币种信息</div>
              <div class="ontitle" v-if="!$store.state.lanfalg">About</div>
              <div class="onctent">
                  <div>
                      <p v-if="$store.state.lanfalg">发行总量</p>
                      <p v-if="!$store.state.lanfalg">Total Supply</p>
                      <p  v-if="$store.state.lanfalg">上架交易所</p>
                      <p v-if="!$store.state.lanfalg">Exchange</p>
                      <p  v-if="$store.state.lanfalg">发行时间</p>
                      <p v-if="!$store.state.lanfalg">Start Date</p>
                  </div>
                  <div>
                      <p>{{info.release_amount}}</p>
                      <p>{{info.stock_exchange}}</p>
                       <p>{{info.publish_time}}</p>
                  </div>
                  <div>
                      <p v-if="$store.state.lanfalg">区块时间</p>
                      <p v-if="!$store.state.lanfalg">Block Time</p>
                      <p v-if="$store.state.lanfalg">核心算法</p>
                      <p v-if="!$store.state.lanfalg">Algorithm</p>
                      <p v-if="$store.state.lanfalg">开发者</p>
                      <p v-if="!$store.state.lanfalg">Developer</p>
                  </div>
                  <div>
                      <p>{{info.block_time}}</p>
                      <p>{{info.core_algorithm}}</p>
                      <p>{{info.developer}}</p>
                  </div>
                  <div>
                      <p> {{info.coin_intro}}</p>
                  </div>
              </div>
          </div>
      </div>
  </div>
  </div>
</template>
<script>
import echarts from "echarts";
import Pcsocialz from '../socialz'
import Pctable from '../table'
import Pcico from '../ico'
import axios from 'axios';
import pcIndexhead from '../components/indexhead'
import pcIndexfoot from '../components/indexfoot'
import pcLoading from '../components/loading'
export default {
    components:{
    pcIndexhead,pcIndexfoot,pcLoading
        },
    data(){
        return{
            //社交参数
            socialarr:{},
            //开发参数
            gitarr:{},
             //顶部广告位
            top_advertising:'../../../../static/ad-dolphin-03.png',
            left_advertising:'../../../../static/ad-dolphin-01.png',
            right_ad:'../../../../static/ad-dolphin-02.png',
            text:'bitcoin',
            top_close:'../../../../static/ads-close-01.svg',
            right_close:'../../../../static/ads-close-01.svg',
            middle_close:'../../../../static/ads-close-01.svg',
            //路线图样式
            //路线图样式
            routemg:{
                marginTop:0 + 'px'
            },
            active_num:0,
            theicon:'',
            zh_change_list:[{name:'交易市场'},{name:'社交信息'},{name:'ICO信息'}],
            en_change_list:[{name:'Markets'},{name:'Comments'},{name:'ICO'}],
            time_list:[
                {news_time:'2017-12-03',content:'比特币支付在印度大爆发，印度音乐节BTC付款占比1%'},
                {news_time:'2017-11-24',content:'在BCD上线之际再聊IFO'},
                {news_time:'2017-11-23',content:'BCD分叉倒计时'},
                {news_time:'2017-10-24',content:'比特币黄金（BTG）的硬分叉 代表了数字货币即将迎来分叉热潮'},
                {news_time:'2017-09-25',content:'跨链交易完成 比特币与莱特币实现跨链原子交易'},
                {news_time:'2017-07-29',content:'比特币投资者不必害怕8月1日比特币分叉'},
                {news_time:'2011-11-23',content:'2011年比特币成长历程'},
                {news_time:'2011-11-20',content:'2011年比特币成长历程'},
                {news_time:'2011-10-30',content:'2011年比特币成长历程'},
                {news_time:'2009-01-03',content:'特币区块链诞生'},
            ],
            info:{
                name:'比特币',//名称
                icon:'',//图标
                en_name: "Bitcoin",//	英文名称
                short_name:'BTC',//简称
                developer:'Satoshi',//开发者
                core_algorithm:'SHA-256',//核心算法
                block_time: "10",//区块时间(单位：分钟)
                publish_time: "2009-01-09 00:00:00",//	发行时间
                release_amount: "21000000",//	发行总量
			    coin_intro: "由中本聪在2009年提出，据其思路设计发布的开源软件以及建构其上的P2P网络。比特币依据特定算法，通过大量的计算产生，不依靠特定货币机构发行，其使用整个P2P网络中众多节点构成的分布式数据库来确认并记录所有的交易行为，并使用密码学设计确保货币流通各个环节安全性，可确保无法通过大量制造比特币来人为操控币值。基于密码学的设计可以使比特币只能被真实的拥有者转移或支付及兑现。同样确保了货币所有权与流通交易的匿名性。比特币总数有限，其总数量将被限制在2100万个。",//币种简介
                stock_exchange: "31",//	上架交易所数量
                white_paper: "https://github.com/AntShares/AntShares/wiki/Whitepaper-1.1",//白皮书
                website: "https://neo.org/",//官方网站
                source_code: "https://github.com/neo-project",//	源代码
                block_station: [{//区块站
                    "url": "https://neotracker.io/"
                    }, {
                    "url": "http://antcha.in/"
                    }, {
                    "url": "https://neoexplorer.co/"
                }]
            },
            money_list: {
			    price_cny:0
            },
            timeArray:[],
            
            change_quantity:2,
            //市值价格数组
            market_value:[],
            price:[],
            volume:[],
            //图表的中英文切换数据
            y_left:'$ {value} B',
            y_right:'$ {value}',
            y_left_title:'    Market Cap/Volume M($)',
            y_right_title:'价格',
            mc_c:'市值',
            price_c:'价格',
            volume_c:'24h成交量',
            //路由跳转参数
            code:''
        }
    },
    computed: {
        getUserIcons() {
            return this.$store.state.lanfalg;
        },
        getcurrency(){
            return this.$store.state.currency
        }
    },
    watch:{
        getUserIcons() {
            this.drawChart()
        },
        getcurrency(){
           
        }
    },
    created(){
        
        //加载完后触发路线图函数
        
        let href = window.location.href;
        if(href.indexOf('?')>-1){
            console.log(window.location.href.split('?')[1].split('='||'&'))
            var code = window.location.href.split('?')[1].split('=')[0];
            var num = window.location.href.split('?')[1].split('=')[1];
            this.code = num
            var num1 = num.replace(/(%[0-9]+)/, ' ')
            var num2 =  num.replace(/(%[0-9]+)/, '-')
            console.log(num2)
        }
           //获取开发信息
        axios.post('http://service.tokenrank.net/tokenrank/githubIndex.json',{
            "code": num1
        },{
            headers: {'Content-Type': "application/x-www-form-urlencoded"}
        }).then(res =>{
            console.log(res)
           this.gitarr = res.data.info
        },
        err =>{
            
        })
          //获取社交信息
        axios.post('http://service.tokenrank.net/tokenrank/socialIndex.json',{
            "code": num1
        },{
            headers: {'Content-Type': "application/x-www-form-urlencoded"}
        }).then(res =>{
            console.log(res)
           this.socialarr = res.data.info
        },
        err =>{
            
        })
        //获取币种基本信息
        axios.post('http://service.tokenrank.net/tokenrank/tokenBaseInfo.json',{
            "code": num1
        },{
            headers: {'Content-Type': "application/x-www-form-urlencoded"}
        }).then(res =>{
            console.log(res)
            if(0 == res.data.ret){
                this.theicon = res.data.info.icon
               this.info = res.data.info;
            }
        },
        err =>{
            
        })

        //获取token交易数据
        axios.post('http://service.tokenrank.net/tokenrank/tokenTradeDetail.json',{
            "code": num1
        },{
            headers: {'Content-Type': "application/x-www-form-urlencoded"}
        }).then(res =>{
            // console.log(typeof(res.data.info.change_quantity))
            if(0 == res.data.ret){
                console.log(typeof(res.data.info.market_value))
                this.money_list = res.data.info;
                this.money_list.mark_zh = this.conversion((this.money_list.market_value*this.money_list.usd_cny).toFixed(2).toString())
                this.money_list.market_value = this.conversion(this.money_list.market_value.toString())
                this.money_list.trade_volumes = this.conversion(this.money_list.trade_volumes.toString())
                 this.money_list.circulation_zh = this.conversion((this.money_list.circulation_supply*this.money_list.usd_cny).toFixed(2).toString())
                this.money_list.circulation_supply = this.conversion(this.money_list.circulation_supply.toString())
            }
        },
        err =>{
            
        })

        //获取大事件路线图
        axios.post('http://service.tokenrank.net/tokenrank/newsList.json',{
            "code": num1
            
        },{
            headers: {'Content-Type': "application/x-www-form-urlencoded"}
        }).then(res =>{
            console.log(res)
            if(0 == res.data.ret){
               this.time_list = res.data.info_list;
            }
            this.$store.state.loadshow = false
        },
        err =>{
            
        })

        // 获取K线图信息
        axios.post('http://service.tokenrank.net/tokenrank/kLine.json',{
            "code": num1,
            "days": '30'
        },{
            headers: {'Content-Type': "application/x-www-form-urlencoded"}
        }).then(res =>{
            if(0 == res.data.ret){
                console.log(res)
               this.timeArray = res.data.info.time_array;
               this.price = res.data.info.price_array;
                res.data.info.market_value_array.forEach(element => {
                   element = element/1000000000
                   this.market_value.push(element)
               });
               this.market_value = this.market_value
               res.data.info.volume_24h_array.forEach(element => {
                   element = element/1000000
                   this.volume.push(element)
               });
               this.volume = this.volume
               setTimeout(
                   this.drawChart()
               ,100)
               
            }
        },
        err =>{
            console.log('错误')
        })
        this.change(3)
    },
  mounted(){
      window.scrollTo(0,0)
      setTimeout(() => {
            this.route_row()
        }, 2000);
      var theWidth = document.body.clientWidth
      //低于1550左边广告
      if(theWidth <= 1750){
          this.left_advertising = false
      }
  },
  destroyed(){
          this.$store.state.loadshow = true
      },
  methods:{
       enter1(){
          this.top_close = '../../../../static/ads-close-02.svg'
      },
      leave1(){
          this.top_close = '../../../../static/ads-close-01.svg'
      },
    close1(){
        this.top_advertising = ''
    },
    enter2(){
          this.right_close = '../../../../static/ads-close-02.svg'
      },
      leave2(){
          this.right_close = '../../../../static/ads-close-01.svg'
      },
    close2(){
        this.right_ad = ''
    },
    enter3(){
          this.middle_close = '../../../../static/ads-close-02.svg'
      },
    leave3(){
          this.middle_close = '../../../../static/ads-close-01.svg'
    },
    close3(){
        this.text = ''
    },
      //顶部广告位跳转
      gotoTop_advertising(){
          window.open('http://cn.dolphin.com')
      },
      //路线图滚动函数
      route_row(){
          var height = document.getElementById('routeul').offsetHeight
          console.log( document.getElementById('routeul').offsetHeight)
          setInterval(() => {
              if(height > -parseInt(this.routemg.marginTop) + 277){
                  this.routemg.marginTop = parseInt(this.routemg.marginTop) - 1 + 'px' 
              }else{
                  this.routemg.marginTop = 0 + 'px'
              }
              
          },40)
      },
      //点击进入白皮书
      whitepaper(){
          window.open(this.info.white_paper)
      },
      //点击进入官方网站
      block(index){
          window.open(this.info.block_station[index].url)
      },
      //点击进入官方网站
      website(){
          window.open(this.info.website)
      },
      //点击进入源代码网站
      source_code(){
          window.open(this.info.source_code)
      },
      //数字字符串添加逗号
        conversion(str){
            if(/\./.test(str)){
                return str.replace(/\d(?=(\d{3})+\.)/g, "$&,").replace(/\d{3}(?![,.]|$)/g, "$&,");
            }else{
                return str.replace(/\d(?=(\d{3})+$)/g, "$&,");
            }
        },
        //点击切换自路由
      change(index){
        this.active_num = index;
        switch(index){
            case 0:
                this.$router.replace({
                    path:'/pctoken/pctokentrade',
                    query:{
                        token:this.code
                    }
                })
                break;
            case 1:
                this.$router.replace({
                    path:"/pctoken/pctokensocial",
                    query:{
                        token:this.code
                    }
                })
                break;
            case 2:
                this.$router.replace({
                    path:"/pctoken/pctokenico",
                    query:{
                        token:this.code
                    }
                })
                break;
            case 3:
                this.$router.push({
                    path:'/pctoken/pctokentrade',
                    query:{
                        token:this.code
                    }
                })
                break;
        }
      },
      drawChart(){
          if(this.$store.state.lanfalg){
              this.y_left='$ {value} B',
              this.y_right='$ {value}',
              this.y_left_title='    市值/成交量 M($)',
              this.y_right_title='价格',
              this.mc_c='市值',
              this.price_c='价格',
              this.volume_c='24h成交量'
          }else{
              this.y_left='$ {value} B',
              this.y_right='$ {value}',
              this.y_left_title='    Market Cap/Volume M($)',
              this.y_right_title='Price',
              this.mc_c='Market Cap',
              this.price_c='Price',
              this.volume_c='24h Vol'
          }
        // 基于准备好的dom，初始化echarts实例
        // this.timeArray= []
        console.log("开始渲染图")
        console.log(this.market_value)
        let myChart = echarts.init(document.getElementById('chart_content'))
        // 绘制图表
        var base = +new Date(1968, 9, 3);
        var oneDay = 24 * 3600 * 1000;
        var date = [];
        var data = [Math.random() * 300];
        for (var i = 1; i < 20000; i++) {
            var now = new Date(base += oneDay);
            date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
            data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
        }
            // console.log(date)
        myChart.setOption({
             tooltip: {
        trigger: 'axis',
        position: function (pt) {
            return [pt[0], '10%'];
        }
    },
    title: {
        left: 'center',
        text: '',
    },
    tooltip: {
        trigger: 'axis',
         "formatter":  (params) => {  
            params[0].value = this.conversion( (params[0].value*1000000000).toFixed(2).toString() )
            params[1].value = this.conversion( (params[1].value).toFixed(2).toString() )
            params[2].value = this.conversion( (params[2].value*1000000).toFixed(2).toString() )
            var str = "<ur style='text-align:left'>";
            for (var i = 0; i < params.length;i++) {
                if(i == 0){
                    str = str + "<li>" + this.mc_c + ":" + params[0].value + "</li>";
                }else if(i == 1){
                    str = str + "<li>" + this.price_c + ":" + params[1].value + "</li>";
                }else if(i == 2){
                    str = str + "<li>" + this.volume_c + ":" + params[2].value + "</li>";
                }
                
            }
            str = str + "</ul>";
            return str
        },
        axisPointer: {
            animation: false
        },
        // extraCssText:'width:160px;height:40px;'
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.timeArray//时间
    },
    yAxis: [{
        type: 'value',
        boundaryGap: [0, 1],//表示刻度最小为100
        name: this.y_left_title,
        axisLabel: {
            formatter: this.y_left
        }
    },{
        type: 'value',
        boundaryGap: [0, 1],//表示刻度最小为100
        name: this.y_right_title,
        axisLabel: {
            formatter: this.y_right
        }
    }],
    //时间轴 用于区域缩放
    // dataZoom: [{
    //     type: 'inside',
    //     start: 0,
    //     end: 10
    // //此对象用于区域缩放
    // }, {
    // //此对象用于区域样式
    //     start: 0,
    //     end: 10,handleSize: '80%',
    //     handleStyle: {
    //         color: '#fff',
    //         shadowBlur: 3,
    //         shadowColor: 'rgba(0, 0, 0, 0.6)',
    //         shadowOffsetX: 2,
    //         shadowOffsetY: 2
    //     }
    // }],
    legend: {
        data:[this.mc_c,this.price_c,this.volume_c],
        bottom: 10,
        left: 'center',
    },
    series: [
        {
            name:this.mc_c,
            type:'line',
            // yAxisIndex: 0,
            smooth:false,//是否平滑曲线显示
            symbol: 'none',//标记的图形
            sampling: 'average',//折线图在数据量远大于像素点时候的降采样策略，开启后可以有效的优化图表的绘制效率 average取过滤点的平均值
            itemStyle: {//图形的颜色
                normal: {
                    color: '#FFA282'
                }
            },
            data: this.market_value//数据
        },{
            name:this.price_c,
            type:'line',
            yAxisIndex: 1,
            smooth:false,//是否平滑曲线显示
            symbol: 'none',//标记的图形
            sampling: 'average',//折线图在数据量远大于像素点时候的降采样策略，开启后可以有效的优化图表的绘制效率 average取过滤点的平均值
            itemStyle: {//图形的颜色
                normal: {
                    color: '#37A2DA'
                }
            },
            data: this.price//数据
        
        },{
            name:this.volume_c,
            type:'line',
            smooth:false,//是否平滑曲线显示
            symbol: 'none',//标记的图形
            sampling: 'average',//折线图在数据量远大于像素点时候的降采样策略，开启后可以有效的优化图表的绘制效率 average取过滤点的平均值
            itemStyle: {//图形的颜色
                normal: {
                    color: '#6BE1E3'
                }
            },
            data: this.volume//数据
        }
    ]
        })
    }
  }
}
</script>
<style scoped>
.aaa{
    width: 100%;
    height: auto;
    overflow: hidden;
}
.box{
    width: 1000px;
    margin: 0 auto;
    background: white;
    overflow: hidden;
}
/* 顶部广告位 */
.top_advertis{
    position: relative;
    width: 970px;
    height: 90px;
    margin: 0 auto;
    text-align: center;
    margin-top: 10px;
}
.top_advertis .sst{
    position: absolute;
    top: 0;
    right: 0;
    width: 9px;
    height: 9px;
    z-index: 99;
   background-color: #ccc;
}
.left_advertis{
    position: fixed;
    top: 350px;
    left: 0px;
    z-index: 999;
} 
.right_adv{
    position: relative;

}
.right_adv .ssr{
    position: absolute;
    top: 0;
    right: 0;
    width: 9px;
    height: 9px;
    z-index: 99;
     background-color: #ccc;
}
.middle_ad{
     position: relative;
     font-size: 16px;
     color: #333333;
     widows: 571px;
     height: 90px;
     padding-left: 21px;
     border: 1px solid #999999;
     line-height: 45px;
}
.middle_ad .ssm{
    position: absolute;
    top: 0;
    right: 0;
    width: 9px;
    height: 9px;
    z-index: 99;
     background-color: #ccc;
}
.middle_ad .big{
    font-size: 24px;
}
.top{
    float: left;
    padding-top: 30px;
}
.top_left{
    width: 700px;
    float: left;
    padding-right: 20px;
    box-sizing: border-box;
}
.intro{
    width: 700px;
    height: 475px;
    /* border-bottom: 1px solid rgba(38, 38, 38, 0.1) */
}
.intro_logo{
    width: 60px;
    height: 60px;
    float: left;
    margin: 0px 30px 0 10px;
    border-radius: 50%;
}
.intro_content{
    float: left;
    width: 600px;
    height: 475px;
    box-sizing: border-box;
    position: relative;
}
.intro_name{
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
    white-space: nowrap;
    text-align: left;
    font-size: 24px;
    font-weight: bold;
    font-style: normal;
    text-decoration: none;
    color: rgb(0, 0, 0);
    display: block
}
.other{
    margin-top: 12px;
    margin-bottom: 85px;
}
.other span{
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
    font-size: 14px;
    color: #8f8f8f;
    margin-right: 22px;
    text-decoration: underline;
    cursor: pointer;
}
.price span{
    white-space: nowrap;
    text-align: left;
    font-style: normal;
    text-decoration: none;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
    display: inline-block;
}
.price span:nth-of-type(1){
    font-size: 56px;
    font-weight: 500;
    color: rgb(0, 0, 0);
    margin-right: 18px;
}
.price span:nth-of-type(2){
    font-size: 24px;
    font-weight: 400;
    color: #f51131;
}
.price span:nth-of-type(3){
    font-size: 24px;
    font-weight: 400;
    color: #5c5c5c;
    display: block;
    margin-top: 19px;
}
.word {
    margin-top: 80px;
}
.word div{
    float: left;
    min-width: 121px;
    margin-right: 41px;
}
.word div span{
    display: block;
    color: #8f8f8f;
    font-size: 14px;
}
.word div .word_num{
    margin-top: 13px;
    color: #5c5c5c;  
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
}










.chart{
    
}
.chart_name{
    width: 135px;
    white-space: nowrap;
    text-align: left;
    font-size: 24px;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
    text-align: center;
    height: 48px;
    line-height: 48px;
    border-bottom: 4px solid black;
    padding-left: 20px;
    padding-right: 20px;
}
#chart_content{
    width: 680px;
    height: 565px;
}








.top_right{
    width: 300px;
    float: right;
}
.type{
    width: 100%;
    height: 285px;
    box-sizing: border-box;
}
.typebut{
    height: 320px;
}
.top_right_name{
    height: 40px;
    width: 100%;
    border-bottom: 1px solid rgba(38, 38, 38, 0.1);
    margin-bottom: 25px;
}
.top_right_name div{
    float: left;
    
}
.type_icon{
    width: 24px;
    height: 24px;
    background: rgba(38, 38, 38, 0.1);
    margin-top: 8px;
    margin-right: 7px;
}
.type_name,.synopsis_name,.time_name{
    white-space: nowrap;
    text-align: left;
    font-size: 20px;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    line-height: 40px;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
    color: black;
}
.type ul{
    padding-right: 35px;
}
.type li{
    line-height: 32px;
    font-size: 14px;
    color: #5c5c5c;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;

}
.type li span:nth-of-type(1){
    display: inline-block;
    width: 150px;
}
.type li span:nth-of-type(2){
    color: #8f8f8f
}
.book{
    height: 40px;
    width: 120px;
    position: absolute;
    top: 20px;
    right: 30px;
}
.book span{
    display: inline-block;
    box-sizing: border-box;
    border: 1px solid #5c5c5c;
    width: 120px;
    background: white;
    text-align: center;
    line-height: 40px;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
    cursor: pointer;
}
.synopsis{
    width: 100%;
    margin-bottom: 80px;
}
.synopsis span{
    white-space: normal;
    text-align: left;
    color: #5c5c5c;
    font-size: 14px;
    height: 248px;
    overflow: scroll;
    display: inline-block;
    line-height: 32px;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
}

::-webkit-scrollbar {display:none}
.time_li{
    width: 100%;
    box-sizing: border-box;
    padding-left: 35px;
    position: relative;
    margin-bottom: 30px;
}
.time_li img{
    position: absolute;
    height: 9px;
    width: 9px;
    top: 5px;
    left: 9px;
}
.time_li ul{
    height: auto;
}
.time_li span{
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
    display: block;
    line-height: 20px;
    color: #5c5c5c;
    font-size: 14px;
}
.time_li span:nth-of-type(1){
    margin-bottom: 10px;
    font-size: 12px;
    color: #8f8f8f
}





.bottom{
    width: 1000px;
    margin-top: 94px;
    background: gainsboro;
    float: left;
    background: white;

}
.bottom_title{
    height: 36px;
    width: 513px;   
    border-bottom: 1px solid #8f8f8f;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
}
.bottom_title div{
    height: 36px;
    min-width: 131px;
    text-align: center;
    line-height: 36px;
    font-size: 24px;
    float: left;
    cursor: pointer;
    padding: 0 20px 0 20px;
    color: #8f8f8f;
}
.bottom_title .active{
    font-weight: 600;
    border-bottom: 4px solid rgb(0,0,0);
    color: black;
}

.route_content{
    width: 300px;
    height: 277px;
    overflow: hidden;
}
.onrtv{
   
}
.ontitle{
     width:fit-content;
    width:-webkit-fit-content;
    width:-moz-fit-content;
     padding: 0 20px 11px 20px;
    border-bottom: 2px solid black;
    font-size: 24px;
    font-weight: 600;

}
.onctent{
    overflow: hidden;
     padding-top: 30px;
    padding-left: 20px;
}
.onctent div{
    float: left;
    height: 200px;
}
.onctent div:nth-of-type(1),.onctent div:nth-of-type(3){
    margin-right: 20px;
}
.onctent div:nth-of-type(2){
    margin-right: 30px;
}
.onctent div:nth-of-type(4){
    margin-right: 40px;
}
.onctent div:nth-of-type(5){
    width: 550px;
}
.onctent div:nth-of-type(5) p{
     line-height: 22px;
     color: #8f8f8f;
}
.onctent div p{
    line-height: 32px;
    font-size: 14px;
    color: #5c5c5c;
}
@media screen and (min-width: 1200px){
    .box{
        width: 1200px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .top_left{
        padding-right: 40px;
        width: 880px;
    }
    .top_right{
        width: 300px;
        margin-left: 20px;
    }
    .middle_ad{
        margin-left: 100px;
    }
    .chart{
        margin-top: 60px;
    }
    #chart_content{
        width: 840px!important;
    }
    /* #chart_content div{
        width: 800px!important;
    } */
   .book span{
      
   }
   .bottom{
       width: 1200px;
   }
   .book{
    height: 40px;
    width: 120px;
    position: absolute;
    top: 20px;
    right: -125px;
    }
    .onctent div:nth-of-type(5){
        width: 650px;
    }
    .onctent div:nth-of-type(1),.onctent div:nth-of-type(3){
    margin-right: 40px;
}
.onctent div:nth-of-type(2){
    margin-right: 50px;
}
.onctent div:nth-of-type(4){
    margin-right: 60px;
}
}
</style>
