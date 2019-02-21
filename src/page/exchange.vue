<template>
  <div class="out">
      <!-- 顶部广告位 -->
      <div class="top_advertis" v-if="top_advertising">
          <img :src="top_close" alt="" class="sst" @mouseenter="enter1()" @mouseleave='leave1()' @click="close1()">
          <img :src="top_advertising" alt="" @click="gotoTop_advertising">
      </div>
      <!-- <pc-loading v-show="$store.state.loadshow"></pc-loading> -->
      <div class="content"  v-show="!$store.state.loadshow">
         
          <div class="content_top"  v-if="lanfalg == 0"> 
                   
          </div>
          <div class="content_top"  v-else>

          </div>
          <!-- <div class="top_tips">Top 10</div> -->
          <div class="content_middle">
              <!-- 中文表头 -->
              <div class="title" v-if="lanfalg == 0||lanfalg == 2||lanfalg == 4">
                  <ul>
                      <li class="first">#</li>
                      <li class="second">{{fontarr.name[lanfalg]}}</li>
                      <li class="bk_one"></li>
                      <li class="read"  @click="allTrade" :style="allTradeb"  v-if="lanfalg == 0">
                    
                      24H总交易量 <img :src="allTradee" alt="" :style="allTradei">
                      <!-- <div class="tips price">
                          <img src="../../../static/black-block.png" alt="">
                          交易
                          
                      </div> -->
                      </li>
                      <li class="read"  @click="allTrade" :style="allTradeb"  v-else>
                    
                      24H Total volume <img :src="allTradee" alt="" :style="allTradei">
                      <!-- <div class="tips price">
                          <img src="../../../static/black-block.png" alt="">
                          交易
                          
                      </div> -->
                      </li>
                      <li class="bk_two"></li>
                      <li class="marks">{{fontarr.pair[lanfalg]}}
                        <!-- <div class="tips mark">
                          <img src="../../../static/black-block.png" alt="">
                          由总供给量乘以价格得出
                      </div> -->
                      </li>
                      <li class="bk_thr"></li>
                      <li class="rread"> {{fontarr.price[lanfalg]}}
                        <!-- <div class="tips volum">
                          <img src="../../../static/black-block.png" alt="">
                          近24小时的总交易量
                        </div> -->
                      </li>
                      <li class="bk_fr"></li>
                      <li class="tfh">{{fontarr.v_d[lanfalg]}}
                        <!-- <div class="tips volum">
                          <img src="../../../static/black-block.png" alt="">
                         近24小时的价格跌涨情况
                        </div> -->
                      </li>
                      
                      <li class="tsee"><div class="boxw" v-if="lanfalg == 0">链接</div><div class="boxw" v-else>Link</div>
                        <!-- <div class="tips">
                          <img src="../../../static/black-block.png" alt="">
                          该币种的公共开发源代码库及GitHub社区活跃度概况，采集了Commits, Stars,Watchers等多个参数。
                      </div> -->
                      </li>
                    
                  </ul>
              </div>
              <div class="title entitle"  v-if="lanfalg == 1 ||lanfalg == 5">
                  <!-- 英文表头 -->
                  <ul>
                      <li class="first">#</li>
                      <li class="second">{{fontarr.name[lanfalg]}}</li>
                      <li class="bk_one"></li>
                      <li class="enread"   @click="allTrade"  :style="allTradeb">24H Total volume <img :src="allTradee" alt="" :style="allTradei">
                      <!-- <div class="tips price">
                          <img src="../../../static/black-block.png" alt="">
                          Current price
                          
                      </div> -->
                      </li>
                      <li class="bk_two"></li>
                      <li class="enmark">{{fontarr.pair[lanfalg]}}
                        <!-- <div class="tips mark">
                          <img src="../../../static/black-block.png" alt="">
                          Total supply * price
                      </div> -->
                      </li>
                      <li class="bk_thr"></li>
                      <li class="enrread">{{fontarr.price[lanfalg]}}
                        <!-- <div class="tips volum">
                          <img src="../../../static/black-block.png" alt="">
                          The total transaction value over the last 24h
                        </div> -->
                      </li>
                      <li class="bk_fr"></li>
                      <li class="entfh">{{fontarr.v_d[lanfalg]}} 
                        <!-- <div class="tips volum">
                          <img src="../../../static/black-block.png" alt="">
                          Price change over the last 24h
                        </div> -->
                      </li>
                      
                      <li class="entsee"><div class="boxwl">Link</div>
                        <!-- <div class="tips">
                          <img src="../../../static/black-block.png" alt="">
                          An overview of development and GitHub activity for a coin. We are currently including Commits, Stars, Watchers, Forks, etc.
                       </div> -->
                      </li>
                      
                  </ul>
              </div>
            <!-- 其他语言表头 -->
              <div class="title entitle"  v-if="lanfalg == 4">
                  <ul>
                      <li class="first">#</li>
                      <li class="second lgcg">{{fontarr.name[lanfalg]}}</li>
                      <li class="bk_one"></li>
                      <li class="enread lgcg butlg"   @click="allTrade"  :style="allTradeb">24H Total volume <img :src="allTradee" alt="" :style="allTradei">
                      <!-- <div class="tips price">
                          <img src="../../../static/black-block.png" alt="">
                          Current price
                          
                      </div> -->
                      </li>
                      <li class="bk_two"></li>
                      <li class="enmark lgcg">{{fontarr.pair[lanfalg]}}
                        <!-- <div class="tips mark">
                          <img src="../../../static/black-block.png" alt="">
                          Total supply * price
                      </div> -->
                      </li>
                      <li class="bk_thr"></li>
                      <li class="enrread lgcg">{{fontarr.price[lanfalg]}}
                        <!-- <div class="tips volum">
                          <img src="../../../static/black-block.png" alt="">
                          The total transaction value over the last 24h
                        </div> -->
                      </li>
                      <li class="bk_fr"></li>
                      <li class="entfh lgcg">{{fontarr.v_d[lanfalg]}} 
                        <!-- <div class="tips volum">
                          <img src="../../../static/black-block.png" alt="">
                          Price change over the last 24h
                        </div> -->
                      </li>
                      
                      <li class="entsee lgcg"><div class="boxwl">Link</div>
                        <!-- <div class="tips">
                          <img src="../../../static/black-block.png" alt="">
                          An overview of development and GitHub activity for a coin. We are currently including Commits, Stars, Watchers, Forks, etc.
                       </div> -->
                      </li>
                      
                  </ul>
              </div>
              <div class="data" v-for="(item,index) in arr" :key="index">
                      <ul>
                          <!-- 中文数据 -->
                      <li class="first">{{index + 1 + (thepage - 1)*thepage_size}}</li>
                      <li @click="gotodetail(item.exchange_name)"  class="sec_first"> <img :src="item.exchange_icon" alt=""  class="pic"> </li>
                      <li @click="gotodetail(item.exchange_name)"  class="sec_sec"><p>{{item.exchange_name}}</p><span style="-webkit-box-orient: vertical">{{item.country}}</span> </li>
                      <!-- <li class="bk_one"></li> -->
                      <li class="rg"><p>{{item.total_volume_24h_zh}}</p> </li>
                      <li class="bk_two"></li>
                      <li class="prs">
                          <p  v-for="index in 3" :key="index"><span>{{item.pair_new[2*(index-1)]}}</span>/{{item.pair_new[2*index-1]}}</p>
                      </li> 
                       <li class="bk_thr"></li>
                      <li class="rh">
                          <p v-for="index in 3" :key="index">{{money_sym[lanfalg]+item.price_list_zh[index]}}</p>
                      </li>
                      <li class="bk_fr"></li>
                      <li class="tg">
                           <p v-for="index in 3" :key="index">{{money_sym[lanfalg]+item.volume_24h_list_zh[index]}}</p>
                          </li>
                          <!-- 内容 -->
                      <li class="gitscore">
                          <div @click="gotohome(item.link_info.homepage)"></div>
                          <div @click="gototwitter(item.link_info.twitter_url)"></div>
                          <div @click="gotoface(item.link_info.facebook_url)"></div>
                         <!-- <img :src="ftpic" alt="">
                         <img :src="sdpic" alt="">
                         <img :src="trpic" alt=""> -->
                      </li>
                      <!-- <li class="gitscore">{{item.github_score}}</li> -->
                      
                     
                  </ul>              
              </div>
          </div>
      </div>
      <!-- 底部广告位 -->
      <div class="bot_advertis" v-if="bot_advertising">
          <img :src="bot_close" alt="" class="ssb" @mouseenter="enter2()" @mouseleave='leave2()' @click="close2()">
          <img :src="bot_advertising" alt="" @click="gotoBot_advertising">
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import {mapState} from 'Vuex'
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
              name:[
                  '名称',
                  'Name',
                  '名稱',
                  '名前',
                  '이름',
                  'Pangalan'
              ],
              volu_d:[
                  '24H总交易量',
                  '24H Total volume',
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
                  '24H交易量',
                  '24H Volume',
                  '24H交易量',
                  '24時間の取引高',
                  '24시간 총 거래량',
                  '24H Volume'
              ],
              link:[
                  '链接',
                  'Link',
                  
              ]


              
          },
          //汇率
          rate:6.295200,
          //图标
         
          //控制显示变化量颜色
          red:{
              color:"#F60016"
          },
          green:{
              color:'#57BD0D'
          },
          //底部广告位
          bot_advertising:'../../static/ad-dolphin-03.png',
          bot_close:'../../static/ads-close-01.svg',
          //顶部广告位
          top_close:'../../static/ads-close-01.svg',
          top_advertising:'../../static/ad-dolphin-03.png',
          //汇率
          used_cny:0,
          issocial:true,
          isgit:false,
          about:false,
          falg:true,
          //点击出底框
        //   第二个
          allTradeb:{
              borderBottom: '',
              paddingBottom:''
          },
          allTradei:{
              display:''
          },
        
          //请求参数
          thepage_size:100,
          thesort_param: "market_value,-1",
          all:0,
          //翻页
          thepage:1,
          //切换排序
          allTradee:'../../static/icon-normal.png',
          arr: [{
		"exchange_icon": "",
		"exchange_name": "",
		"country": "",
        "total_volume_24h": "",
        "total_volume_24h_zh":'',
		"pair_list": ['','',''],
        "pair_new": ['','','','','',''],
        "price_list": ['','',''],
        'price_list_zh':['','',''],
        "volume_24h_list": ['','',''],
        'volume_24h_list_zh':['','',''],
		"link_info": {
			"homepage": "https://www.binance.com/",
			"facebook_url": "https://www.facebook.com/binanceexchange",
			"twitter_url": "https://twitter.com/binance_2017"
		}
	}, {
		"exchange_icon": "",
		"exchange_name": "",
		"country": "",
        "total_volume_24h": "",
        "total_volume_24h_zh":'',
		"pair_list": ['','',''],
        "pair_new": ['','','','','',''],
        "price_list": ['','',''],
        'price_list_zh':['','',''],
        "volume_24h_list": ['','',''],
        'volume_24h_list_zh':['','',''],
		"link_info": {
			"homepage": "https://www.binance.com/",
			"facebook_url": "https://www.facebook.com/binanceexchange",
			"twitter_url": "https://twitter.com/binance_2017"
		}
	}],
      }
  },
  computed:mapState(['usd_cny','lanfalg','money_sym']),
//   beforecreated
  created(){
      this.$store.state.topshow = 2
      console.log(this.$store.state.lanfalg)
    axios.post(this.$store.state.requrl+'/exchange/exchangeList.json',{},{
            headers: {'Content-Type': "application/x-www-form-urlencoded"}
        }).then(response => {
            console.log(response)
            response.data.info_list.forEach((e)=>{
                e['total_volume_24h_zh'] = e['total_volume_24h'].replace(/,/g,'')
                e['total_volume_24h_zh'] = this.conversion((parseInt(e['total_volume_24h_zh'])*this.rate).toFixed(0).toString())
                e['pair_new'] = []
                e.pair_list.forEach((a)=>{
                    e['pair_new'].push(...a.split('/'))
                }) 
                e['price_list_zh'] = []
                e.price_list.forEach((a)=>{
                   var a = a.replace(/,/g,'')
                   var ae = a
                   if(ae.split('.')[1]){
                       ae = ae.split('.')[1].length
                   }else{
                       ae = 0
                   }
                   
                    e['price_list_zh'].push(this.conversion((parseFloat(a)*this.rate).toFixed(ae).toString()))
                })
                e['volume_24h_list_zh'] = []
                e.volume_24h_list.forEach((a)=>{
                    a = a.replace(/,/g,'')
                    e['volume_24h_list_zh'].push(this.conversion((parseFloat(a)*this.rate).toFixed(0).toString()))
                })
            })
             console.log(response)
            this.arr = response.data.info_list
             this.$store.state.loadshow = false
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
      watch:{
      
  },
  methods:{
        
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
       //排序方法
        rank(num,string){
               
                var list = this.arr
        setTimeout(()=>{
             
            if(-1 == num ){
        //         //从小到大
                list.sort(function(a,b){
	                return  parseFloat(a[string].replace(/,/g,""))-parseFloat(b[string].replace(/,/g,""))
                })
            }else{
        //         //从大到小
                 list.sort(function(a,b){
	                return  parseFloat(b[string].replace(/,/g,""))-parseFloat(a[string].replace(/,/g,""))
                })
            }
                },500)
       
           console.log(this.arr)
            
            // this.arr = this.arr
            // console.log(this.arr)
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
    enter2(){
          this.bot_close = '../../static/ads-close-02.svg'
      },
      leave2(){
          this.bot_close = '../../static/ads-close-01.svg'
      },
    close2(){
        this.bot_advertising = ''
    },
      //底部广告位跳转
      gotoBot_advertising(){
           window.open('http://cn.dolphin.com')
      },
      //顶部广告位跳转
      gotoTop_advertising(){
          window.open('http://cn.dolphin.com')
      },
            //数字字符串添加逗号
        conversion(str){
            if(/\./.test(str)){
                return str.replace(/\d(?=(\d{3})+\.)/g, "$&,").replace(/\d{3}(?![,.]|$)/g, "$&,");
            }else{
                return str.replace(/\d(?=(\d{3})+$)/g, "$&,");
            }
        },
     
     gotodetail:function(e){
         console.log(e)
          this.$router.push({
                 path:'/newcoin' ,
                query:{
                    token:e
                }
          })
     },
     //翻页
     topchange(e){
         console.log(111111)
         this.thepage = e
     },
   
     //请求数据
     fornew(){  
        
     },
      //排序方法
        rank(num,string){
               
            if(1 == num ){
        //         //从小到大
                this.arr.sort(function(a,b){
	                return  parseFloat(a[string].replace(/,/g,""))-parseFloat(b[string].replace(/,/g,""))
                })
            }else{
        //         //从大到小
                 this.arr.sort(function(a,b){
	                return  parseFloat(b[string].replace(/,/g,""))-parseFloat(a[string].replace(/,/g,""))
                })
            }
                
       
           console.log(this.arr)
            
            // this.arr = this.arr
            // console.log(this.arr)
        },
     //切换排行
    allTrade(){
        if(this.allTradee == '../../static/icon-up.png' || this.allTradee == '../../static/icon-normal.png'){
              this.allTradee = '../../static/icon-down.png'
             this.rank(-1,'total_volume_24h')
         }else{ 
             this.allTradee = '../../static/icon-up.png'
             this.rank(1,'total_volume_24h')
            
         }
          this.allTradei.display = 'inline-block'
         this.allTradeb.borderBottom = 2 + 'px' + ' ' + 'solid' + ' ' + 'black'
          this.allTradeb.paddingBottom = 0 + 'px'
    }
   

  }
}
</script>

<style scoped>
.out{
    width: 100%;
    padding-top: 10px;
    padding-bottom: 150px;
    background-color: #fff;
}
/* 底部广告位 */
.bot_advertis{
    position: relative;
    width: 970px;
    height: 90px;
    margin: 0 auto;
    text-align: center;
}

.bot_advertis .ssb{
    position: absolute;
    top: 0;
    right: 0;
    width: 9px;
    height: 9px;
    z-index: 99;
    background-color: #ccc;
}
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
.content{
    width: 1000px;
    background-color: #fff;
    margin: 0 auto;
    position: relative;
    padding-bottom: 100px;
    padding-top: 30px;
}
/* 翻页 */
.content .page_top{
    position: absolute;
    top: 20px;
    right: 20px;
}
.content .page_bottom{
    position: absolute;
    bottom: 20px;
    right: 20px;
}
.content .content_top{
    width: 430px; 
    font-size: 24px;   
    color: #8f8f8f;
    cursor:pointer;
}
.top_left{
    float: left;
}
.content_top span{
    padding: 0 20px;
    border-bottom: 1px solid #8f8f8f;
    padding-bottom: 11px;
}
.content .select{
    color: black;
    border-bottom: 4px solid black;
    font-weight: 600;
}

.content_middle .title{
    width: 100%;
    height: 60px;
    margin-top: 36px;
    line-height: 51px;
}
.content .content_middle .entitle{
    font-size: 14px;
}
.content .content_middle{
    margin-top: -25px;
}
.top_tips{
    font-size: 18px;
    width: 88px;
    height: 25px;
    text-align: center;
    border-bottom: 2px solid #000;
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
    width: 20px;
    padding: 0;
    margin: 0;
}
.title .bk_two{
    height: 60px;
    width: 20px;
    padding: 0;
    margin: 0;
}
.title .bk_thr{
    height: 60px;
    width: 40px;
    padding: 0;
    margin: 0;
}
.title .bk_fr{
    height: 60px;
    width: 40px;
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
/* 提示框 */
.title li .tips{
    position: relative;
    display: none;
    width: 160px;
    left: 50%;
    top: 8px;
    margin-left: -80px;
    text-align: left;
    word-wrap: break-word;
    border-radius: 4px;
    color:#fff;
    z-index: 2;
    line-height: 20px;
    font-size: 12px;
    background-color: #000;
    padding: 10px;
    box-sizing: border-box;
}
.title li .tips p{
    margin-bottom: 15px;
}
.title li .tips img{
    width: 12px;
    height: 12px;
    position: absolute;
    top: -5px;
    left: 50%;
    margin-left: -6px;
}
.title li .price{
    margin-left: -85px;
}
.title li .mark{
     margin-left: -85px;
}
.title li .volum{
     margin-left: -85px;
}
.title li .pri{
    top: 8px;
}
.title .first{
    width: 50px;
    text-align: center;
    line-height: 60px;
    cursor: auto;
}
.title .sec_first{
    width: 48px;
}
.title .second{
    width: 160px;
    text-align: center;
    line-height: 60px;
    cursor: auto;
}
.title .marks{
    width: 100px;
    text-align: left;
    line-height: 60px;
}

.title .read{
    width: 220px;
    padding-left: 20px;
    text-align: left;
}
.title .second:hover,.title .read:hover,.title .marks:hover,.title .rread:hover,.title .tfh:hover,.title .tsee:hover,.title .enread:hover,.title .enmark:hover,.title .enrread:hover,.title .entfh:hover,.title .entsee:hover{
    border-bottom: 2px solid #3D5AFE;
}
.title .rread{
    width: 90px;
    text-align: left;
}
.title .read img{
    left: 1px;
}
.title .tfh{
    width: 140px;
    text-align: left;
}

.title .tsee{
    width: 120px;
     text-align: center;
}

.title .enmark{
    width: 100px;
    text-align: left;
    line-height: 60px;
}

.title .enread{
    width: 220px;
    padding-left: 20px;
    text-align: left;
}
.title .enread img{
    left: 1px;
}
.title .enrread{
    width: 90px;
    text-align: left;
}
.title .entfh{
    width: 140px;
    text-align: left;
}

.title .entsee{
    width: 120px;
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
.title .lgcg>span{
    display: block;
}
.title .lgcg img{
    left: 0px;
}
.title .butlg{
    padding-left: 20px;
}
.data{
    width: 100%;
    height: 90px;
    border-bottom: 1px solid #e4e4e4;
}
.data li{
    float: left;
    width: 110px;
    height: 90px;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    color: black;
    box-sizing: border-box;
}
.data .bk_one{
    height: 90px;
    width: 20px;
    padding: 0;
    margin: 0;
}
.data .bk_two{
    height: 90px;
    width: 20px;
    padding: 0;
    margin: 0;
}
.data .bk_thr{
    height: 90px;
    width: 40px;
    padding: 0;
    margin: 0;
}
.data .bk_fr{
    height: 90px;
    width: 40px;
    padding: 0;
    margin: 0;
}
.data .first{
    width: 50px;
    line-height: 90px;
}
.data .sec_first{
    width: 86px;
    padding-top: 18px;
}
.data .sec_first .img{
    width: 56px;
    width: 56px;
    margin: 10px 0 0 10px;
}
.data .prs{
    width: 100px;
    text-align: left;
    color: #333;
    line-height: 22px;
    padding-top: 13px;
}
.data .prs span{
    color: #3D5AFE;
}
.data .rg{
    width: 220px;
    padding-left: 18px;
    text-align: left;
    line-height: 90px;
}
.data .rg p{
    color: #333;
    font-size: 18px;
}

.data .rh{
    width: 90px;
    text-align: left;
   line-height: 22px;
    padding-top: 13px;
}
.data .gitscore{
    width: 120px;
    text-align: right;
    line-height: 70px;
    padding-left: 19px;
}
.gitscore div{
    width: 18px;
    height: 18px;
    margin-top: 37px;
    margin-right: 14px;
    float: left;
    background-size:cover;
}
.gitscore div:nth-of-type(1){
    background-image: url('../../static/exhcnages-home-0.png');
}
.gitscore div:nth-of-type(2){
    background-image: url('../../static/exhcnages-twitter-0.png');
}
.gitscore div:nth-of-type(3){
    background-image: url('../../static/exhcnages-facebook-0.png');
}
.gitscore div:nth-of-type(1):hover{
    background-image: url('../../static/exhcnages-home-1.png');
}
.gitscore div:nth-of-type(2):hover{
    background-image: url('../../static/exhcnages-twitter-1.png');
}
.gitscore div:nth-of-type(3):hover{
    background-image: url('../../static/exhcnages-facebook-1.png');
}
/* 内容提示 */
.gitscore .in_tips{
    position: relative;
    display: none;
    width: 170px;
    left: 50%;
    top: 8px;
    margin-left: -80px;
    border-radius: 4px;
    color:#000;
    z-index: 2;
    line-height: 20px;
    font-size: 12px;
    background-color: #fff;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #000;
    /* overflow: hidden; */
}
.gitscore .in_mdl{
    width: 150px;
    overflow: hidden;
}
.gitscore .in_tips img{
    width: 12px;
    height: 12px;
    position: absolute;
    top: -6px;
    left: 50%;
    margin-left: -6px;
}
.gitscore:hover .in_tips{
    display: block;
}
.gitscore .in_tips .in_left{
    float: left;
    width: 93px;
    text-align: left;
}
.gitscore .in_tips .in_right{
    float: right;
    width: 53px;
    text-align: right;
}
.gitscore .in_tips p{
    margin-top: 7px;
}
.gitscore .in_tips p img{
    width: 16px;
    height: 16px;
    position: static;
    vertical-align: -3px;
    margin-right: 4px;
    margin-left: 0;
}
.gitscore .in_tips p svg{
    width: 16px;
    height: 16px;
    vertical-align: -3px;
    margin-right: 4px;
    color: #8f8f8f;
}
.data .tg{
    width: 140px;
    text-align: left;
    line-height: 22px;
    padding-top: 13px;
}
.data .enprs{
    width: 100px;
    text-align: left;
    color: #333;
    line-height: 22px;
    padding-top: 13px;
}
.data .enprs span{
    color: #3D5AFE
}
.data .enrg{
    width: 220px;
    padding-left: 18px;
    text-align: left;
    line-height: 90px;
}
.data .enrg p{
    color: #333;
    font-size: 18px;
}

.data .enrh{
    width: 90px;
    text-align: left;
   line-height: 22px;
    padding-top: 13px;
}
.data .entg{
    width: 140px;
    text-align: left;
    line-height: 22px;
    padding-top: 13px;
}

.data .sec_sec{
     /* width: 74px; */
     width: 94px;
    padding-top: 18px;
    text-align: left;
    cursor: pointer;
}
.data .sec_sec p{
    font-size: 18px;
    margin-top: 13px;
}
.data .sec_sec span{
    font-size: 14px;
    overflow:hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}
.data .sec_sec:hover{
    cursor: pointer;
}
.pic{
    width: 66px;
    height: 66px;
    padding: 5px;
    border-radius: 2px;
    box-sizing: border-box;
    border: 1px solid #E4E4E4;
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
   .out{
    width: 100%;
    padding-top: 10px;
    padding-bottom: 150px;
    background-color: #fff;
}
/* 底部广告位 */
.bot_advertis{
    position: relative;
    width: 970px;
    height: 90px;
    margin: 0 auto;
    text-align: center;
}

.bot_advertis .ssb{
    position: absolute;
    top: 0;
    right: 0;
    width: 9px;
    height: 9px;
    z-index: 99;
    background-color: #ccc;
}
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
.content{
    width: 1200px;
    background-color: #fff;
    margin: 0 auto;
    position: relative;
    padding-bottom: 100px;
    padding-top: 30px;
}
/* 翻页 */
.content .page_top{
    position: absolute;
    top: 20px;
    right: 20px;
}
.content .page_bottom{
    position: absolute;
    bottom: 20px;
    right: 20px;
}
.content .content_top{
    width: 430px; 
    font-size: 24px;   
    color: #8f8f8f;
    cursor:pointer;
}
.top_left{
    float: left;
}
.content_top span{
    padding: 0 20px;
    border-bottom: 1px solid #8f8f8f;
    padding-bottom: 11px;
}
.content .select{
    color: black;
    border-bottom: 4px solid black;
    font-weight: 600;
}

.content_middle .title{
    width: 100%;
    height: 60px;
    margin-top: 36px;
    line-height: 51px;
}
.content .content_middle .entitle{
    font-size: 14px;
}
.content .content_middle{
    margin-top: -25px;
}
.top_tips{
    font-size: 18px;
    width: 88px;
    height: 25px;
    text-align: center;
    border-bottom: 2px solid #000;
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
    width: 60px;
    padding: 0;
    margin: 0;
}
.title .bk_two{
    height: 60px;
    width: 60px;
    padding: 0;
    margin: 0;
}
.title .bk_thr{
    height: 60px;
    width: 70px;
    padding: 0;
    margin: 0;
}
.title .bk_fr{
    height: 60px;
    width: 80px;
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
/* 提示框 */
.title li .tips{
    position: relative;
    display: none;
    width: 160px;
    left: 50%;
    top: 8px;
    margin-left: -80px;
    text-align: left;
    word-wrap: break-word;
    border-radius: 4px;
    color:#fff;
    z-index: 2;
    line-height: 20px;
    font-size: 12px;
    background-color: #000;
    padding: 10px;
    box-sizing: border-box;
}
.title li .tips p{
    margin-bottom: 15px;
}
.title li .tips img{
    width: 12px;
    height: 12px;
    position: absolute;
    top: -5px;
    left: 50%;
    margin-left: -6px;
}
.title li .price{
    margin-left: -85px;
}
.title li .mark{
     margin-left: -85px;
}
.title li .volum{
     margin-left: -85px;
}
.title li .pri{
    top: 8px;
}
.title .first{
    width: 60px;
    text-align: center;
    line-height: 60px;
}
.title .sec_first{
    width: 48px;
}
.title .second{
    width: 160px;
    text-align: center;
    line-height: 60px;
}
.title .marks{
    width: 100px;
    text-align: left;
    line-height: 60px;
}

.title .read{
    width: 220px;
    padding-left: 20px;
    text-align: left;
}
.title .rread{
    width: 90px;
    text-align: left;
}
.title .read img{
    left: 1px;
}
.title .tfh{
    width: 170px;
    text-align: left;
}

.title .tsee{
    width: 130px;
     text-align: center;
}

.title .enmark{
    width: 100px;
    text-align: left;
    line-height: 60px;
}

.title .enread{
    width: 220px;
    padding-left: 20px;
    text-align: left;
}
.title .enrread img{
    left: 3px;
}
.title .enrread{
    width: 90px;
    text-align: left;
}
.title .entfh{
    width: 170px;
    text-align: left;
}

.title .entsee{
    width: 130px;
    text-align: center;
}

.data{
    width: 100%;
    height: 90px;
    border-bottom: 1px solid #e4e4e4;
}
.data li{
    float: left;
    width: 110px;
    height: 90px;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    color: black;
    box-sizing: border-box;
}
.data .bk_one{
    height: 90px;
    width: 60px;
    padding: 0;
    margin: 0;
}
.data .bk_two{
    height: 90px;
    width: 60px;
    padding: 0;
    margin: 0;
}
.data .bk_thr{
    height: 90px;
    width: 70px;
    padding: 0;
    margin: 0;
}
.data .bk_fr{
    height: 90px;
    width: 80px;
    padding: 0;
    margin: 0;
}
.data .first{
    width: 60px;
    line-height: 90px;
}
.data .sec_first{
    width: 86px;
    padding-top: 18px;
}
.data .prs{
    width: 100px;
    text-align: left;
    color: #333;
    line-height: 22px;
}
.data .rg{
    width: 220px;
    padding-left: 21px;
    text-align: left;
    line-height: 90px;
}
.data .rg p{
    color: #333;
}

.data .rh{
    width: 90px;
    text-align: left;
   line-height: 22px;
    padding-top: 13px;
}
.data .gitscore{
    width: 130px;
    text-align: right;
    font-size: 16px;
    line-height: 33px;
    color: #000;
    line-height: 22px;
    padding-top: 13px;
    padding-left: 24px;
    padding-right: 10px;
}
.gitscore div {
    width: 18px;
    height: 18px;
    margin-top: 24px;
    margin-right: 14px;
    float: left;
    background-size:cover;
}

.gitscore div:nth-of-type(1){
    background-image: url('../../static/exhcnages-home-0.png');
}
.gitscore div:nth-of-type(2){
    background-image: url('../../static/exhcnages-twitter-0.png');
}
.gitscore div:nth-of-type(3){
    background-image: url('../../static/exhcnages-facebook-0.png');
}
.gitscore div:nth-of-type(1):hover{
    background-image: url('../../static/exhcnages-home-1.png');
}
.gitscore div:nth-of-type(2):hover{
    background-image: url('../../static/exhcnages-twitter-1.png');
}
.gitscore div:nth-of-type(3):hover{
    background-image: url('../../static/exhcnages-facebook-1.png');
}
/* 内容提示 */
.gitscore .in_tips{
    position: relative;
    display: none;
    width: 170px;
    left: 50%;
    top: 8px;
    margin-left: -80px;
    border-radius: 4px;
    color:#000;
    z-index: 2;
    line-height: 20px;
    font-size: 12px;
    background-color: #fff;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #000;
    /* overflow: hidden; */
}
.gitscore .in_mdl{
    width: 150px;
    overflow: hidden;
}
.gitscore .in_tips img{
    width: 12px;
    height: 12px;
    position: absolute;
    top: -6px;
    left: 50%;
    margin-left: -6px;
}
.gitscore:hover .in_tips{
    display: block;
}
.gitscore .in_tips .in_left{
    float: left;
    width: 93px;
    text-align: left;
}
.gitscore .in_tips .in_right{
    float: right;
    width: 53px;
    text-align: right;
}
.gitscore .in_tips p{
    margin-top: 7px;
}
.gitscore .in_tips p img{
    width: 16px;
    height: 16px;
    position: static;
    vertical-align: -3px;
    margin-right: 4px;
    margin-left: 0;
}
.gitscore .in_tips p svg{
    width: 16px;
    height: 16px;
    vertical-align: -3px;
    margin-right: 4px;
    color: #8f8f8f;
}
.data .tg{
    width: 170px;
    text-align: left;
    line-height: 22px;
    padding-top: 13px;
}
.data .enprs{
   width: 100px;
    text-align: left;
    color: #333;
    line-height: 22px;
    padding-top: 13px;
}
.data .enprs span{
    color: #3D5AFE;
}
.data .enrg{
    width: 220px;
    padding-left: 21px;
    text-align: left;
    line-height: 90px;
}
.data .enrg p{
    color: #333;
}

.data .enrh{
    width: 90px;
    text-align: left;
   line-height: 22px;
    padding-top: 13px;
}
.data .entg{
    width: 170px;
    text-align: left;
    line-height: 22px;
    padding-top: 13px;
}

.data .sec_sec{
    /* width: 74px; */
     width: 134px;
    padding-top: 18px;
    text-align: left;
    cursor: pointer;
}
.data .sec_sec p{
    font-size: 14px;
}
.data .sec_sec span{
    font-size: 10px;
    overflow:hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}
.data .sec_sec:hover{
    cursor: pointer;
}
.pic{
    width: 66px;
    height: 66px;
    padding: 5px;
    border-radius: 2px;
    box-sizing: border-box;
    border: 1px solid #E4E4E4;
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

}

</style>
