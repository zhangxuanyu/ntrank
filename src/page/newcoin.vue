<template>
  <div class="out">
       <!-- 顶部广告位 -->
      <div class="top_advertis" v-if="top_advertising">
          <img :src="top_close" alt="" class="sst" @mouseenter="enter1()" @mouseleave='leave1()' @click="close1()">
          <img :src="top_advertising" alt="" @click="gotoTop_advertising">
      </div>
       <!-- <pc-loading v-show="$store.state.loadshow"></pc-loading> -->
      <div class="excot" v-show="!$store.state.loadshow" v-if="outarr.total_volume_24h != '11'">
          <!-- 顶部介绍 -->
        <div class="extop">
            <!-- 左边介绍 -->
         <div class="extop_left">
             <div class="exnameout">
                 <div class="exname">
                    <img :src="outarr.exchange_icon" alt=""  class="imgbox">
                
                <div class="exfont">
                    <span>{{outarr.exchange_name}}</span>
                    <p>{{outarr.country}}</p>
                    <div @click="gotohome(outarr.link_info.homepage)"></div>
                    <div @click="gototwitter(outarr.link_info.twitter_url)"></div>
                    <div @click="gotoface(outarr.link_info.facebook_url)"></div>
                </div>
            </div>
             <div class="extrade">
                    
                    <p v-if="$store.state.lanfalg == 1">24H总交易量</p>
                    <p v-else-if="$store.state.lanfalg == 3">24H總交易量</p>
                    <p v-else>24H Total Volume</p>
                    <span v-if="$store.state.currency ==1">${{outarr.total_volume_24h}}</span>
                     <span v-if="$store.state.currency ==2">￥{{outarr.total_volume_24h_zh}}</span>
             </div>
             </div>
            
            
             <div class="exdetail">
                 {{outarr.exchange_intro}}
             </div>
           </div>
           <!-- 右边图表 -->
          <div id="extop_right">
              <div id="tradechart" style="width: 380px;height:230px;"></div>
          </div>
        </div>
        <!-- 中间货币详情 -->
         <div class="exmdl" v-if="$store.state.lanfalg == 1">
              <div class="mdl_top">
                  服务费说明
              </div>
              <div class="trade">
                  <div class="tdname">
                      交易费率
                  </div>
                  <div class="tdde">
                      <p>{{outarr.fees[0]}}</p>
                      <span>{{outarr.fees[1]}}</span>
                  </div>
              </div>
              <div class="deposit">
                  <div class="dsname">
                    充值费率
                  </div>
                  <div class="dsde">
                      {{outarr.deposit}}
                  </div>
              </div>
              <div class="rate">
                  <div class="rtname">
                      提现费率
                  </div>
                  <div class="rtde">
                      <span  v-for="(item,index) in outarr.withdrawal" v-if="index < maxwith"> <span> {{item}} </span><span v-if="index < maxwith - 1 && outarr.withdrawal.length >= maxwith" class="sl">&nbsp; | &nbsp;</span><span v-if="index == maxwith - 1 && showflag">&nbsp;...&nbsp;&nbsp;</span></span><span v-if="showflag  && outarr.withdrawal.length >= maxwith" @click="show" class="sf">显示更多</span>
                  </div>
              </div>
          </div>
          <div class="exmdl" v-else>
              <div class="mdl_top">
                  About Fees
              </div>
              <div class="trade">
                  <div class="tdname">
                      Trading
                  </div>
                  <div class="tdde">
                      <p>{{outarr.fees[0]}}</p>
                      <span>{{outarr.fees[1]}}</span>
                  </div>
              </div>
              <div class="deposit">
                  <div class="dsname">
                    Deposit
                  </div>
                  <div class="dsde">
                      {{outarr.deposit}}
                  </div>
              </div>
              <div class="rate">
                  <div class="rtname">
                      Withdrawal
                  </div>
                  <div class="rtde">
                      <span  v-for="(item,index) in outarr.withdrawal" v-if="index < maxwith"> <span> {{item}} </span><span v-if="index < maxwith - 1 && outarr.withdrawal.length >= maxwith" class="sl">&nbsp; | &nbsp;</span><span v-if="index == maxwith - 1 && showflag">&nbsp;...&nbsp;&nbsp;</span></span><span v-if="showflag && outarr.withdrawal.length >= maxwith" @click="show" class="ensf">Show more</span>
                  </div>
              </div>
          </div>
  
          <!-- 底部表格 -->
          <div class="bt_table">
              <!-- //中文表头 -->
              <div class="title" v-if="$store.state.lanfalg == 1||$store.state.lanfalg == 3||$store.state.lanfalg == 5">
                  <ul>
                      <li class="first">#</li>
                      <li class="second">{{fontarr.pair[$store.state.lanfalg -1]}}</li>
                      <li class="bk_one"></li>
                      <li class="read"  @click="pris" :style="prisb">
                    
                      {{fontarr.price[$store.state.lanfalg -1]}} <img :src="prise" alt="" :style="prisi">
                      <!-- <div class="tips price">
                          <img src="../../../static/black-block.png" alt="">
                          交易
                          
                      </div> -->
                      </li>
                      <li class="bk_two"></li>
                      <li class="marks" @click="hvlo" :style="hvlob">{{fontarr.v_d[$store.state.lanfalg -1]}} <img :src="hvloe" alt="" :style="hvloi">
                        <!-- <div class="tips mark">
                          <img src="../../../static/black-block.png" alt="">
                          由总供给量乘以价格得出
                      </div> -->
                      </li>
                      <li class="bk_thr"></li>
                      <li class="rread" @click="vlop" :style="vlopb"> {{fontarr.tz[$store.state.lanfalg -1]}} <img :src="vlope" alt="" :style="vlopi">
                        <!-- <div class="tips volum">
                          <img src="../../../static/black-block.png" alt="">
                          近24小时的总交易量
                        </div> -->
                      </li>
                      <li class="bk_fr"></li>
                      
                    
                  </ul>
              </div>
              <div class="title entitle"  v-if="$store.state.lanfalg == 2||$store.state.lanfalg == 6">
                  <!-- 英文表头 -->
                  <ul>
                      <li class="first">#</li>
                      <li class="second">{{fontarr.pair[$store.state.lanfalg -1]}}</li>
                      <li class="bk_one"></li>
                      <li class="enread"   @click="pris"  :style="prisb">{{fontarr.price[$store.state.lanfalg -1]}} <img :src="prise" alt="" :style="prisi">
                      <!-- <div class="tips price">
                          <img src="../../../static/black-block.png" alt="">
                          Current price
                          
                      </div> -->
                      </li>
                      <li class="bk_two"></li>
                      <li class="enmark">{{fontarr.v_d[$store.state.lanfalg -1]}} <img :src="prise" alt="" :style="prisi">
                        <!-- <div class="tips mark">
                          <img src="../../../static/black-block.png" alt="">
                          Total supply * price
                      </div> -->
                      </li>
                      <li class="bk_thr"></li>
                      <li class="enrread">{{fontarr.tz[$store.state.lanfalg -1]}} <img :src="prise" alt="" :style="prisi">
                        <!-- <div class="tips volum">
                          <img src="../../../static/black-block.png" alt="">
                          The total transaction value over the last 24h
                        </div> -->
                      </li>
                      <li class="bk_fr"></li>
                   
                      
                  </ul>
              </div>
              <!-- 其他语言表头 -->
              <div class="title entitle"  v-if="$store.state.lanfalg == 4">
                  <ul>
                      <li class="first">#</li>
                      <li class="second lgcg">{{fontarr.pair[$store.state.lanfalg -1]}}</li>
                      <li class="bk_one"></li>
                      <li class="enread lgcg"   @click="pris"  :style="prisb">{{fontarr.price[$store.state.lanfalg -1]}} <img :src="prise" alt="" :style="prisi">
                      <!-- <div class="tips price">
                          <img src="../../../static/black-block.png" alt="">
                          Current price
                          
                      </div> -->
                      </li>
                      <li class="bk_two"></li>
                      <li class="enmark lgcg">{{fontarr.v_d[$store.state.lanfalg -1]}} <img :src="prise" alt="" :style="prisi">
                        <!-- <div class="tips mark">
                          <img src="../../../static/black-block.png" alt="">
                          Total supply * price
                      </div> -->
                      </li>
                      <li class="bk_thr"></li>
                      <li class="enrread lgcg">{{fontarr.tz[$store.state.lanfalg -1]}} <img :src="prise" alt="" :style="prisi">
                        <!-- <div class="tips volum">
                          <img src="../../../static/black-block.png" alt="">
                          The total transaction value over the last 24h
                        </div> -->
                      </li>
                      <li class="bk_fr"></li>
                   
                      
                  </ul>
              </div>
              
              <div class="data" v-for="(item,index) in arr">
                      <ul   v-if="$store.state.currency == 2 && index<=100">
                          <!-- 中文数据 -->
                      <li class="first">{{index + 1 }}</li>
                      <li @click="gotodetail(item.code)"  class="sec_sec"><p>{{item.pair}}</p><span style="-webkit-box-orient: vertical">{{item.update_info}}</span> </li>
                      
                      <li class="rg">
                          <p>￥{{item.price_list_zh}}</p>
                            <span>{{item.price_list[1]}}</span>
                       </li>
    
                      <li class="prs">
                          <p>￥{{item.volume_24h_list_zh}}</p>
                        <span>{{item.volume_24h_list[1]}}</span>           
                      </li> 
                      
                      <li class="rh">
                          <p>{{item.volume_percent}}</p>
                      </li>
                      
                      
                  </ul>
                  <ul  v-if="$store.state.currency == 1 && index<=100">
                      <!-- 英文数据 -->
                      <li class="first">{{index + 1}}</li>
                      <li @click="gotodetail(item.code)"  class="sec_sec"><p>{{item.pair}}</p><span style="-webkit-box-orient: vertical">{{item.update_info}}</span> </li>
                      
                      <li class="enrg"><p>${{item.price_list[0]}}</p>
                            <span>{{item.price_list[1]}}</span></li>
                      
                      <li class="enprs">
                          <p>${{item.volume_24h_list[0]}}</p>
                        <span>{{item.volume_24h_list[1]}}</span>    
                      </li> 
                       
                      <li class="enrh">
                          <p>{{item.volume_percent}}</p>
                          
                      </li>
                      
                     
                     
                  </ul>                 
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import Highcharts from 'highcharts'
// import pcLoading from './components/loading'
export default {
    components:{
    // pcLoading
  },
  data(){
      return{
          // 文字翻译
            // 顺序：1,中文2英文3繁体4日语5韩语6菲律宾
            fontarr:{
                fees:[
                    ''
                ],
                pair:[
                  '交易对',
                  'Pair',
                  '交易對',
                  'ペア',
                  '쌍',
                  'Magkapares'
              ],
              price:[
                  '价格',
                  'Price',
                  '價格',
                  '価格',
                  '시세',
                  'Presyo'
              ],
              v_d:[
                  '24H成交量',
                  '24H Volume',
                  '24H成交量',
                  '24時間の取引高',
                  '24시간 총 거래량',
                  '24H Volume'
              ],
              tz:[
                    '交易占比%',
                    'Volume%',
                    '交易占比%',
                    'ボリューム(%)',
                    '거래량(%)',
                    'Volume%'
              ]
            },
          //画图数据
          drawarr:[],
          //widthdraw显示
          showflag:true,
          maxwith:4,
          //汇率
          rate:6.295200,
          //数组
          arr:[{
		"pair": "11",
		"update_info": "11",
        "price_list": ['11','11'],
        'price_list_zh':'11',
        "volume_24h_list": ['11','11'],
        'volume_24h_list_zh':'11',
		"volume_percent": "11"
	}],
          outarr:{
        "exchange_icon": "11",
        "exchange_name": "11",
        "country": "11",
        "total_volume_24h": "11",
        "total_volume_24h_zh":'11',
        "link_info": {
			"homepage": "11",
			"facebook_url": "11",
			"twitter_url": "11"
	},
	"exchange_intro": "11",
	"fees": ['11','11'],
	"deposit": "11",
	"withdrawal": ['11','11','11'],
	"pair_list": [{
		"pair": "11",
		"update_info": "11",
        "price_list": ['11','11'],
        'price_list_zh':'11',
        "volume_24h_list": ['11','11'],
        'volume_24h_list_zh':'11',
		"volume_percent": "11"
	}],
},
          prise:'../../static/icon-normal.png',
            hvloe:'../../static/icon-normal.png',
             vlope:'../../static/icon-normal.png',
             //点击出底框
        //   第二个
          prisb:{
              borderBottom: ''
          },
          prisi:{
              display:''
          },
          hvlob:{
              borderBottom: ''
          },
          hvloi:{
              display:''
          },
          vlopb:{
              borderBottom: ''
          },
          vlopi:{
              display:''
          },
          arr:[{},{},{}],
           //顶部广告位
          top_close:'../../static/ads-close-01.svg',
          top_advertising:'../../static/ad-dolphin-03.png',
      }
  },
  created(){
      this.$store.state.topshow = 2
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
      axios.post(this.$store.state.requrl+'/exchange/exchangeDetail.json',{
           "exchange_name": num1
      },{
            headers: {'Content-Type': "application/x-www-form-urlencoded"}
        }).then(response => {
           console.log(response)
           response.data.info_list.fees = response.data.info_list.fees.split(/\n/)
           response.data.info_list.withdrawal = response.data.info_list.withdrawal.split(',')
           response.data.info_list['total_volume_24h_zh'] = this.conversion((parseInt(response.data.info_list.total_volume_24h.replace(/,/g,''))*this.rate).toFixed(0).toString())
           response.data.info_list.pair_list.forEach(e => {
               
               e['volume_24h_list_zh'] = this.conversion((parseInt(e.volume_24h_list[0].replace(/,/g,''))*this.rate).toFixed(0).toString())
               var aa = e.price_list[0]
               aa = aa.replace(/,/g,'')
               var eea = aa
               var aae = 0
               if(eea.split('.')[1]){
                    aae = eea.split('.')[1].length
               }else{
                   aae = 0
               }
               
               e['price_list_zh'] =  this.conversion((parseFloat(aa)*this.rate).toFixed(aae).toString())
           });

           this.outarr = response.data.info_list,
           this.arr = response.data.info_list.pair_list
           this.$store.state.loadshow = false
           console.log(response)
           console.log(this.outarr)
           console.log(this.top_advertising)
        }, response => {
            console.log('错误')
            // error callback
        })

         axios.post(this.$store.state.requrl+'/exchange/kline.json',{
           "exchange_name": num1,
           "length": "-1"
      },{
            headers: {'Content-Type': "application/x-www-form-urlencoded"}
        }).then(response => {
            response.data.data.trade_volume_array.forEach((e,id)=>{
                e[0] = parseInt(e[0])
                e[1] = parseInt(e[1])
                if(id%6 == 0){
                    this.drawarr.push(e)
                }
            })
           console.log(this.drawarr)
          setTimeout(()=>{
                this.draw()
            },500)
        }, response => {
            console.log('错误')
            // error callback
        })

  },
  mounted(){
      window.scrollTo(0,0)
      
       
  },
  destroyed(){
          this.$store.state.loadshow = true
      },
  methods:{
      //图表函数
      draw(){
          var Highcharts = require('highcharts');

// 在 Highcharts 加载之后加载功能模块
require('highcharts/modules/exporting')(Highcharts);
Highcharts.setOptions({
    lang:{
        thousandsSep:','
    }
})
// // 创建图表
// this.chart = new Highcharts.Chart('tradeChart', {
var options = { 
      /*Highcharts 配置*/
       chart: {
        renderTo: 'tradechart',
        type: 'line'
    },
    title: {
        text: null
    },
    xAxis: {
        type: 'datetime',
        maxZoom:24 * 3600 * 1000,
        dateTimeLabelFormats: {
            hour: '%H:%M',
        },
        minTickInterval: 1800*1000,
        title: {
            text: null
        },
    },
    yAxis: {
        labels: {
            align: 'left',
            x: 3,
            y: -2,
            format: '{value:.,0f}'
        },
        title: {
            text: null
        },
        showFirstLabel: false
    },
    tooltip: {
        shared: true,
        crosshairs: true,
        // 时间格式化字符
        // 默认会根据当前的数据点间隔取对应的值
        // 当前图表中数据点间隔为 1天，所以配置 day 值即可
    },
    plotOptions: {
        series: {
            cursor: 'pointer',
            point: {
            },
            marker: {
                lineWidth: 1
            }
        }
    },
    credits: {  
          enabled:false  
}, 
exporting:{  
enabled:false //用来设置是否显示‘打印’,'导出'等功能按钮，不设置时默认为显示  
},  
    series: [{
        name: 'Trade Volume',
        data: this.drawarr,
    }]
};
      var chart = Highcharts.chart('tradechart', options);   
        
      },
         //数字字符串添加逗号
        conversion(str){
            if(/\./.test(str)){
                return str.replace(/\d(?=(\d{3})+\.)/g, "$&,").replace(/\d{3}(?![,.]|$)/g, "$&,");
            }else{
                return str.replace(/\d(?=(\d{3})+$)/g, "$&,");
            }
        },
      //排序方法
        rank(num,string,id){ 
            if(id == 0){
                if(1 == num ){
        //         //从小到大
                this.arr.sort(function(a,b){
	                return  parseFloat(a[string][0].replace(/,/g,""))-parseFloat(b[string][0].replace(/,/g,""))
                })
            }else{
        //         //从大到小
                 this.arr.sort(function(a,b){
	                return  parseFloat(b[string][0].replace(/,/g,""))-parseFloat(a[string][0].replace(/,/g,""))
                })
            }
            }else{
                if(1 == num ){
        //         //从小到大
                this.arr.sort(function(a,b){
	                return  parseFloat(a[string].replace(/%/g,""))-parseFloat(b[string].replace(/%/g,""))
                })
            }else{
        //         //从大到小
                 this.arr.sort(function(a,b){
	                return  parseFloat(b[string].replace(/%/g,""))-parseFloat(a[string].replace(/%/g,""))
                })
            }
            }  
            
           
            
            // this.arr = this.arr
            // console.log(this.arr)
        },
      //跳转
      gotohome(e){
          window.open(e)
      },
      gototwitter(e){
          window.open(e)
      },
      gotoface(e){
          window.open(e)
      },
      //widthdraw显示
      show(){
          this.showflag = false
          this.maxwith = this.outarr.withdrawal.length
      },
      block(){
          this.prisb={
              borderBottom: ''
          }
          this.prisi={
              display:''
          }
          this.hvlob={
              borderBottom: ''
          }
          this.hvloi={
              display:''
          }
          this.vlopb={
              borderBottom: ''
          }
          this.vlopi={
              display:''
          }
      },
      pris(){
          this.block()
          if(this.prise == '../../static/icon-up.png' || this.prise == '../../static/icon-normal.png'){
             this.prise = '../../static/icon-down.png'
             this.rank(-1,'price_list',0)
         }else{ 
             this.prise = '../../static/icon-up.png'
             this.rank(1,'price_list',0)
         }
          this.hvloe='../../static/icon-normal.png'
          this.vlope='../../static/icon-normal.png'
          this.prisb.borderBottom = 2 + 'px' + ' ' + 'solid' + ' ' + 'black'
          this.prisi.display = 'inline-block'
      },
       hvlo(){
           this.block()
          if(this.hvloe == '../../static/icon-up.png' || this.hvloe == '../../static/icon-normal.png'){
             this.hvloe = '../../static/icon-down.png'
             this.rank(-1,'volume_24h_list',0)
         }else{ 
             this.hvloe = '../../static/icon-up.png'
             this.rank(1,'volume_24h_list',0)
             
         }
          this.prise='../../static/icon-normal.png'
          this.vlope='../../static/icon-normal.png'
          this.hvlob.borderBottom = 2 + 'px' + ' ' + 'solid' + ' ' + 'black'
          this.hvloi.display = 'inline-block'
      },
       vlop(){
           this.block()
          if(this.vlope == '../../static/icon-up.png' || this.vlope == '../../static/icon-normal.png'){
             this.vlope = '../../static/icon-down.png'
             this.rank(-1,'volume_percent',1)
         }else{ 
             this.vlope = '../../static/icon-up.png'
             this.rank(1,'volume_percent',1)
             
         }
          this.prise='../../static/icon-normal.png'
          this.hvloe='../../static/icon-normal.png'
          this.vlopb.borderBottom = 2 + 'px' + ' ' + 'solid' + ' ' + 'black'
          this.vlopi.display = 'inline-block'
      },
      //顶部广告位跳转
      gotoTop_advertising(){
          window.open('http://cn.dolphin.com')
      },
       enter1(){
          this.top_close = '../../static/ads-close-02.svg'
      },
      leave1(){
          this.top_close = '../../static/ads-close-01.svg'
      },
    close1(){
        this.top_advertising = ''
    },
  }
}
</script>

<style scoped>
/* 顶部广告位 */
    .top_advertis{
    position: relative;
    width: 970px;
    height: 90px;
    margin: 0 auto;
    text-align: center;
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

.out{
    width: 100%;
    padding-top: 10px;
    padding-bottom: 150px;
    background-color: #fff;
}
.excot{
    width: 1000px;
    padding-top: 30px;
    margin: 0 auto;
    overflow: hidden;
}
/* 顶部介绍 */
.extop{
    margin: 0px 0 40px 0;
    overflow: hidden;
}
.excot .extop_left{
    float: left;
    width: 600px;
    overflow: hidden;
}
.exname{
    float: left;
    overflow: hidden;
}
.imgbox{
    width: 100px;
    height: 100px;
    padding: 8px;
    border: 1px solid #E4E4E4;
    border-radius: 3px;
    float: left;
    box-sizing: border-box;
    display: block;
}
.exfont{
    float: left;
    margin-left: 20px;
    color: #333;
}
.exfont span{
    font-size: 26px;
}
.exfont p{
    font-size: 14px;
}
.exfont div:nth-of-type(1),.exfont div:nth-of-type(2),.exfont div:nth-of-type(3){
    display: inline-block;
    background-size:cover;
    width: 20px;
    height: 20px;
    margin-top: 36px;
    margin-right: 15px;
}
.exfont div:nth-of-type(1){
    background-image: url('../../static/exhcnages-home-0.png');
}
.exfont div:nth-of-type(2){
    background-image: url('../../static/exhcnages-twitter-0.png');
}
.exfont div:nth-of-type(3){
    background-image: url('../../static/exhcnages-facebook-0.png');
    margin-right: 0px;
}
.exfont div:nth-of-type(1):hover{
    background-image: url('../../static/exhcnages-home-1.png');
}
.exfont div:nth-of-type(2):hover{
    background-image: url('../../static/exhcnages-twitter-1.png');
}
.exfont div:nth-of-type(3):hover{
    background-image: url('../../static/exhcnages-facebook-1.png');
}
.extrade{
    float: right;
}
.extrade p{
    font-size: 18px;
    color: #000;
}
.extrade span{
    font-size: 28px;
    display: block;
    color: #333333;
}
.exnameout{
    overflow: hidden;
}
.exdetail{
    width: 580px;
    margin: 0 auto;
    margin-top: 20px;
    font-size: 12px;
    line-height: 22px;
    color: #888888;
}
.excot #extop_right{
    float: right;
    width: 380px;
    height: 180px;
    background-color: #ccc;
    overflow: hidden;
}
.excot .exmdl{
    width: 980px;
    border: 1px solid #979797;
    margin-left: 10px;
    margin-bottom: 40px;
     word-wrap: break-word;
     box-sizing: border-box;
}
 .mdl_top,.trade,.deposit,.rate{
    margin-top: 20px;
    margin-left: 20px;
    width: 940px;
    overflow: hidden;
    margin-bottom: 20px;
    font-size: 14px;
}
.mdl_top{
    overflow: visible;
}
.rate .sf{
    color: #405CFE;
    margin-top: -2px;
    cursor: pointer;
}
.rate .ensf{
    color: #405CFE;
    cursor: pointer;
}
.rate .sl{
    margin-top: -1px;
}
.exmdl .mdl_top{
    width: 95px;
    height: 25px;
    padding: 0 10px 0 10px;
    border-bottom: 2px solid #000;
    line-height: 25px;
    font-size: 18px;
    text-align: justify;
}
.tdname,.dsname,.rtname{
    float: left;
    width: 97px;
    text-align: right
}
.tdde,.dsde,.rtde{
    float: left;
    width: 790px;
    text-align: left;
    margin-left: 30px;
    overflow: hidden;
}
.rtde span{
    display: block;
    float: left;
}
.title{
    height: 60px;
}
.title li{
    float: left;
    height: 60px;
    width: 115px;
    line-height: 60px;
    text-align: right;
    color: #292929;
    font-weight: 400;
    box-sizing: border-box;
    cursor:pointer;
    font-size: 14px;
    background-color: #f4f4f4;
    position: relative;
    font-weight: 600;
    
}
.title .bk_one{
    height: 60px;
    width: 150px;
    padding: 0;
    margin: 0;
}
.title .bk_two{
    height: 60px;
    width: 130px;
    padding: 0;
    margin: 0;
}
.title .bk_thr{
    height: 60px;
    width: 120px;
    padding: 0;
    margin: 0;
}
.title .bk_fr{
    height: 60px;
    width: 60px;
    padding: 0;
    margin: 0;
}

.title li img{
    position: absolute;
    top: 23px;
    left: 5px;
}

.title li:hover img{
    display: inline-block;
}
.title li:hover .tips{
    display: block;
}
.title li img{
    display: none;
    width: 14px;
    height: 15px;
    vertical-align: -2px;
}

.title .first{
    width: 60px;
    text-align: center;
    line-height: 60px;
}

.title .second{
    width: 100px;
    text-align: left;
    line-height: 60px;
    padding-left: 10px;
    cursor: auto;
}
.title .second:hover{
    border-bottom: 2px solid #3D5AFE;
}
.title .marks{
    width: 150px;
    text-align: left;
    line-height: 60px;
    padding-left: 24px;
}
.title .marks:hover{
    border-bottom: 2px solid #3D5AFE;
}
.title .enmark:hover{
    border-bottom: 2px solid #3D5AFE;
}
.title .read{
    width: 100px;
    padding-left: 24px;
    text-align: left;
}
.title .read:hover{
    border-bottom: 2px solid #3D5AFE;
}
.title .enread:hover{
    border-bottom: 2px solid #3D5AFE;
}
.title .rread{
    width: 130px;
    text-align: left;
    padding-left: 20px;
}
.title .rread:hover{
    border-bottom: 2px solid #3D5AFE;
}
.title .enrread:hover{
    border-bottom: 2px solid #3D5AFE;
}
.title .read img{
    left: 6px;
}
.title .rread img{
    left: 3px;
}

.title .enmark{
    width: 150px;
    text-align: left;
    line-height: 60px;
    padding-left: 24px;
}

.title .enread{
    width: 100px;
    padding-left: 24px;
    text-align: left;
}
.title .enread img{
    left: 3px;
}
.title .enrread{
    width: 110px;
    text-align: center;
}

.title .lgcg{
    /* padding-left: 20px; */
    padding-bottom: 2px;
    text-align: left;
    line-height: 14px;
    display: flex;
    /* justify-content: center;实现水平居中 */
    align-items:center; /*实现垂直居中*/
    box-sizing: border-box;
}
.title .lgcg:hover{
    padding-bottom: 0px;
}
.title .lgcg img{
    left: 0px;
}
.data{
    width: 100%;
    height: 70px;
    border-bottom: 1px solid #e4e4e4;
}
.data li{
    float: left;
    width: 110px;
    height: 70px;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    color: black;
    box-sizing: border-box;
}

.data .first{
    width: 60px;
    line-height: 70px;
}
.data .prs{
    width: 272px;
    text-align: left;
    color: #333;
    line-height: 22px;
    padding-top: 14px;
}
.data .prs p{
    font-size: 16px;
    margin-left: -4px;
}

.data .rg{
    width: 230px;
    padding-top: 14px;
    text-align: left;
    line-height: 20px;
}
.data .rg p{
    color: #333;
    font-size: 16px;
    margin-left: -4px;
}

.data .rh{
    width: 144px;
    text-align: left;
    line-height: 70px;
    font-size: 16px;
}


.data .tg{
    width: 140px;
    text-align: left;
    line-height: 22px;
    padding-top: 13px;
}
.data .tg p{
    
}

.data .enprs{
    width: 272px;
    text-align: left;
    color: #333;
    line-height: 22px;
    padding-top: 14px;
}
.data .enprs p{
    font-size: 16px;
}
.data .enrg{
    width: 230px;
    padding-top: 14px;
    text-align: left;
    line-height: 20px;
}
.data .enrg p{
    color: #333;
    font-size: 16px;
}

.data .enrh{
    width: 144px;
    text-align: left;
    line-height: 70px;
    font-size: 16px;
}
.data .entg{
    width: 140px;
    text-align: left;
    line-height: 22px;
    padding-top: 13px;
}

.data .sec_sec{
    width: 274px;
    padding-top: 5px;
    padding-left: 10px;
    text-align: left;
    /* cursor: pointer; */
}
.data .sec_sec p{
    font-size: 18px;
    margin-top: 13px;
    color: #3D5AFE;
}
.data .sec_sec span{
    font-size: 14px;
    overflow:hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}
/* .data .sec_sec:hover{
    cursor: pointer;
} */
.pic{
    width: 66px;
    height: 66px;
    background-color: #ccc;
    margin-top: -5px;
}
.pic img{
    width: 56px;
    height: 56px;
}
.boxw{
    width: 50px;
    text-align: right;
    display: inline-block;
    line-height: 18px;
    margin: 0 auto;
    text-align: center;
}
.boxwl{
    width: 70px;
    text-align: right;
    display: inline-block;
    line-height: 18px;
    margin: 0 auto;
    text-align: center;
}
.boxwle{
    width: 80px;
    height: 40px;
    text-align: right;
    display: inline-block;
    line-height: 20px;
    margin: 0 auto;
    text-align: center;
}
.boxwla{
    width: 50px;
    height: 40px;
    text-align: right;
    display: inline-block;
    line-height: 20px;
    margin: 0 auto;
    text-align: center;
}
.midd{
    width: 70px;
    margin: 0 auto;
    overflow: hidden;
}
@media screen and (min-width: 1200px){
    .excot{
        width: 1200px;
    }
    .excot .extop_left {
        width: 800px;
    }
    .exdetail{
        width: 780px;
    }
    .excot .exmdl{
        width: 1160px;
    }
    .mdl_top, .trade, .deposit, .rate {  
        width: 1140px;
    }
    .tdde, .dsde, .rtde{
        width: 990px;
    }
    .title .bk_one{
        width: 200px;
    }
    .title .bk_two{
        width: 170px;
    }
    .title .bk_thr{
        width: 160px;
    }
    .title .bk_fr{
        width: 110px;
    }
    .title .rread{
        width: 147px;
        padding-left: 25px;
        text-align: left;
    }
    .title .enrread{
        width: 147px;
        padding-left: 20px;
        text-align: left;
    }
    .data .sec_sec{
        width: 324px;
    }
    .data .rg {
        width: 270px;
    }
    .data .prs{
        width: 312px;
    }
    .data .rh{
        width: 194px;
    }
    .data .enrg {
        width: 270px;
    }
    .data .enprs{
        width: 312px;
    }
    .data .enrh{
        width: 194px;
    }
}
</style>
