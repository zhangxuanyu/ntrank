<template>
  <div class="out">
      <!-- 顶部广告位 -->
      <div class="top_advertis" v-if="top_advertising">
          <img :src="top_close" alt="" class="sst" @mouseenter="enter1()" @mouseleave='leave1()' @click="close1()">
          <img :src="top_advertising" alt="" @click="gotoTop_advertising">
      </div>
      <div class="content">
          <!-- 翻页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="all" class="page_top" :page-size="thepage_size" :current-page.sync="thepage" @current-change="topchange">
            </el-pagination>
            <el-pagination
            background
            layout="prev, pager, next"
            :total="all" class="page_bottom" :page-size="thepage_size" :current-page.sync="thepage" @current-change="topchange">
            </el-pagination>
          <div class="content_top"  v-if="lanfalg"> 
                    <span :class="{select:issocial}">社交指数 </span>
                    <span :class="{select:isgit}" @click="gotogit" >Github指数</span>  
          </div>
          <div class="content_top"  v-else>
              <span :class="{select:issocial}">The Social List  </span>
              <span :class="{select:isgit}" @click="gotogit" >The GitHub List</span>
          </div>
          <div class="content_middle">
              <div class="title" v-if="lanfalg">
                  <ul>
                      <li class="first">#</li>
                      <li class="sec_first"></li>
                      <li class="second">名称</li>
                      <li class="marks" @click="markcl" :style="macb">市值/￥<img :src="mark" alt="" :style="maci"></li>
                      <li class="read" @click="redditseecl" :style="resb"><div class="boxw">Reddit订阅</div><img :src="redditsee" alt=""  :style="resi"> </li>
                      <li class="rread" @click="redditaccl" :style="reob"><div class="boxw">Reddit活跃</div><img :src="redditac" alt="" :style="reoi"> </li>
                      <li class="tsee" @click="twitterseecl" :style="ttab"><div class="boxw">Twitter关注</div><img :src="twittersee" alt="" :style="ttai"></li>
                      <li class="tart" @click="twitterupcl" :style="tttb"><div class="boxw">Twitter推文</div><img :src="twitterup" alt="" :style="ttti"></li>
                      <li class="fcsee" @click="faceseecl" :style="fbab"><div class="boxwl">Facebook关注</div><img :src="facesee" alt="" :style="fbai"></li>
                      <li class="tman" @click="telemancl" :style="tgpb"><div class="boxwl">telegram成员</div><img :src="teleman" alt="" :style="tgpi"></li>
                  </ul>
              </div>
              <div class="title entitle" v-else>
                  <ul>
                      <li class="first">#</li>
                      <li class="sec_first"></li>
                      <li class="second">Name</li>
                      <li class="enmark" @click="markcl" :style="macb">Market Cap/$ <img :src="mark" alt="" :style="maci"></li>
                      <li class="enread" @click="redditseecl" :style="resb"><div class="boxwl">Reddit Subscribers</div><img :src="redditsee" alt="" :style="resi"></li>
                      <li class="enrread" @click="redditaccl" :style="reob"><div class="boxw">Reddit Online</div><img :src="redditac" alt="" :style="reoi"></li>
                      <li class="entsee" @click="twitterseecl" :style="ttab"><div class="boxwl"> Twitter Followers</div><img :src="twittersee" alt="" :style="ttai"></li>
                      <li class="entart" @click="twitterupcl"  :style="tttb">Tweets<img :src="twitterup" alt="" :style="ttti"></li>
                      <li class="enfcsee" @click="faceseecl"  :style="fbab"><div class="boxwl">Facebook Followers</div><img :src="facesee" alt=""  :style="fbai"></li>
                      <li class="entman" @click="telemancl" :style="tgpb"><div class="boxwl"> Telegram Members</div><img :src="teleman" alt="" :style="tgpi"></li>
                  </ul>
              </div>
              <div class="data" v-for="(item,index) in arr">
                      <ul   v-if="lanfalg">
                      <li class="first">{{index + 1 + (thepage - 1)*thepage_size}}</li>
                      <li @click="gotodetail(item.code)"  class="sec_first"> <img :src="item.icon" alt=""  class="pic"> </li>
                      <li @click="gotodetail(item.code)"  class="sec_sec">{{item.code}}</li>
                      <li class="prs">{{(item.zhmark)}}</li> 
                      <li class="rg">{{item.reddit_attention}}</li>
                      <li class="rh">{{item.reddit_actives}}</li>
                      <li class="tg">{{item.twitter_attention}}</li>
                      <li class="ff">{{item.tweets}}</li>
                      <li class="teg">{{item.facebook_attention}}</li>
                      <li class="tw">{{item.telegram_attention}}</li>
                  </ul>
                  <ul  v-else>
                      <li class="first">{{index + 1}}</li>
                      <li @click="gotodetail(item.code)"  class="sec_first"><img :src="item.icon" alt="" class="pic"></li>
                      <li @click="gotodetail(item.code)"  class="sec_sec">{{item.code}}</li>
                      <li class="enprs">{{item.market_value}}</li> 
                      <li class="enrg">{{item.reddit_attention}}</li>
                      <li class="enrh">{{item.reddit_actives}}</li>
                      <li class="entg">{{item.twitter_attention}}</li>
                      <li class="enff">{{item.tweets}}</li>
                      <li class="enteg">{{item.facebook_attention}}</li>
                      <li class="entw">{{item.telegram_attention}}</li>
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
import $ from 'jquery'
export default {
  data(){
      return{
          //底部广告位
          bot_advertising:'../../../static/ad-dolphin-03.png',
          bot_close:'../../../static/ads-close-01.svg',
          //顶部广告位
          top_close:'../../../static/ads-close-01.svg',
          top_advertising:'../../../static/ad-dolphin-03.png',
          //汇率
          used_cny:0,
          issocial:true,
          isgit:false,
          about:false,
          falg:true,
          //点击出底框
        //   第一个
          macb:{
              borderBottom: ''
            //   borderBottom:4 + 'px' + ' ' + 'solid' + ' ' + 'black'
          },
          maci:{
              display:''
          },
        //   第二个
          resb:{
              borderBottom: ''
          },
          resi:{
              display:''
          },
        //   第三个
          reob:{
              borderBottom: ''
          },
          reoi:{
              display:''
          },
        //   第四个
          ttab:{
              borderBottom: ''
          },
          ttai:{
              display:''
          },
        //   第五个
          tttb:{
              borderBottom: ''
          },
          ttti:{
              display:''
          },
        //   第六个
          fbab:{
              borderBottom: ''
          },
          fbai:{
              display:''
          },
        //   第七个
          tgpb:{
              borderBottom: ''
          },
          tgpi:{
              display:''
          },
          //请求参数
          thepage_size:50,
          thesort_param: "market_value,-1",
          all:0,
          //翻页
          thepage:1,
          //切换排序
          mark:'../../../static/icon-normal.png',
          redditsee:'../../../static/icon-normal.png',
          redditac:'../../../static/icon-normal.png',
          twittersee:'../../../static/icon-normal.png',
          twitterup:'../../../static/icon-normal.png',
          facesee:'../../../static/icon-normal.png',
          teleman:'../../../static/icon-normal.png',
          arr:[
           {rank:1,name:'aaa',price:'111',reddit_attention:'111',reddit_actives:'111',twitter_attention:'111',facebook_attention:'111',telegram_attention:'111',tweets:'111'},
           {rank:1,name:'aaa',price:'111',reddit_attention:'111',reddit_actives:'111',twitter_attention:'111',facebook_attention:'111',telegram_attention:'111',tweets:'111'},
           {rank:1,name:'aaa',price:'111',reddit_attention:'111',reddit_actives:'111',twitter_attention:'111',facebook_attention:'111',telegram_attention:'111',tweets:'111'},
           {rank:1,name:'aaa',price:'111',reddit_attention:'111',reddit_actives:'111',twitter_attention:'111',facebook_attention:'111',telegram_attention:'111',tweets:'111'},
           {rank:1,name:'aaa',price:'111',reddit_attention:'111',reddit_actives:'111',twitter_attention:'111',facebook_attention:'111',telegram_attention:'111',tweets:'111'},
           {rank:1,name:'aaa',price:'111',reddit_attention:'111',reddit_actives:'111',twitter_attention:'111',facebook_attention:'111',telegram_attention:'111',tweets:'111'},
           {rank:1,name:'aaa',price:'111',reddit_attention:'111',reddit_actives:'111',twitter_attention:'111',facebook_attention:'111',telegram_attention:'111',tweets:'111'},
           {rank:1,name:'aaa',price:'111',reddit_attention:'111',reddit_actives:'111',twitter_attention:'111',facebook_attention:'111',telegram_attention:'111',tweets:'111'},
            {rank:1,name:'aaa',price:'111',reddit_attention:'111',reddit_actives:'111',twitter_attention:'111',facebook_attention:'111',telegram_attention:'111',tweets:'111'},
           {rank:1,name:'aaa',price:'111',reddit_attention:'111',reddit_actives:'111',twitter_attention:'111',facebook_attention:'111',telegram_attention:'111',tweets:'111'},
          ]
      }
  },
  props:{
      lanfalg:true
  },
  computed:{

  },
  created(){
      var aa = {
          "page_num":0,
          'page_size': this.thepage_size,
          'sort_param': this.thesort_param 
      }
      aa = JSON.stringify(aa)
       $.ajax({
        type:'post',
        url:'http://service.tokenrank.net/tokenrank/socialIndex.json',
        dataType: 'json',
        data:aa,
        success:(response)=>{
            console.log(response)
            console.log(response.usd_cny)
            response.info_list.forEach(element => {
                for (const key in element) {
                    
                    if(element[key] == -999){
                        
                        element[key] = '-'
                    }else{
                        if(typeof(element[key]) == 'number'){
                            if(key == 'market_value'){     
                                element['zhmark'] = element[key]*response.usd_cny
                                element['zhmark'] = this.conversion(element['zhmark'].toFixed(2)) 
                            }          
                            setTimeout(()=>{
                                
                                    element[key] = this.conversion(element[key].toString())
                                                             
                            },100)                                      
                        }
                    }
                    
                }
            });
            // response.data.info_list
            this.used_cny = response.usd_cny
            this.arr = response.info_list
            this.all =  response.total_count
            // success callback
        },
        fail:function(err){
            console.log(err)
        }
    })
   
  },
   mounted(){
          this.about = false
          this.$emit('upup',this.about);
          setTimeout(() => {
              window.scrollTo(0,0)
          }, 0);
          console.log(this.lanfalg)
      },
      watch:{
      thepage:{
          handler:function(val,oldval){  
                    this.thepage = val
                    console.log(val)  
                    this.fornew()
                },  
                deep:true//对象内部的属性监听，也叫深度监听 
      }
  },
  methods:{
      enter1(){
          this.top_close = '../../../static/ads-close-02.svg'
      },
      leave1(){
          this.top_close = '../../../static/ads-close-01.svg'
      },
    close1(){
        this.top_advertising = ''
    },
    enter2(){
          this.bot_close = '../../../static/ads-close-02.svg'
      },
      leave2(){
          this.bot_close = '../../../static/ads-close-01.svg'
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
      //清空点击底部边框
      empty(){
           //   第一个
          this.macb={
              borderBottom: ''
            //   borderBottom:4 + 'px' + ' ' + 'solid' + ' ' + 'black'
          }
          this.maci={
              display:''
          }
        //   第二个
          this.resb={
              borderBottom: ''
          }
          this.resi={
              display:''
          }
        //   第三个
          this.reob={
              borderBottom: ''
          }
          this.reoi={
              display:''
          }
        //   第四个
          this.ttab={
              borderBottom: ''
          }
          this.ttai={
              display:''
          }
        //   第五个
          this.tttb={
              borderBottom: ''
          }
          this.ttti={
              display:''
          }
        //   第六个
          this.fbab={
              borderBottom: ''
          }
          this.fbai={
              display:''
          }
        //   第七个
          this.tgpb={
              borderBottom: ''
          }
          this.tgpi={
              display:''
          }
      },
      gotogit:function(){
          this.$router.replace({
               path:'/pcgitrank',
               component:'Pcgitrank'
          })
      },
     gotodetail:function(e){
         console.log(e)
       
          this.$router.push({
                 path:'/pctable' ,
                 component:'Pctable',
                query:{
                    code:e
                    
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
         var aa = {
          "page_num": this.thepage - 1,
          'page_size': this.thepage_size,
          'sort_param': this.thesort_param 
      }
      aa = JSON.stringify(aa)
       $.ajax({
        type:'post',
        url:'http://service.tokenrank.net/tokenrank/socialIndex.json',
        dataType: 'json',
        data:aa,
        success:(response)=>{
            console.log(response)
            response.info_list.forEach(element => {
                for (const key in element) {
                    if(element[key] == -999){
                         console.log(1111111)
                        element[key] = '-'
                    }else{
                        if(typeof(element[key]) == 'number'){
                            element[key] = this.conversion(element[key].toString())
                        }
                    }
                    
                }
            });
            this.arr = response.info_list
            this.all =  response.total_count
            // success callback
        },
        fail:function(err){
            console.log(err)
        }
    })
        //  axios.post('http://service.tokenrank.net/tokenrank/socialIndex.json',{
            
		//     "page_size": this.thepage_size,
        //     "sort_param": this.thesort_param 
        // }).then(response => {
        //     console.log(response)
        //     response.data.info_list.forEach(element => {
        //         for (const key in element) {
        //             if(element[key] == -999){
        //                  console.log(1111111)
        //                 element[key] = '-'
        //             }else{
        //                 if(typeof(element[key]) == 'number'){
        //                     element[key] = this.conversion(element[key].toString())
        //                 }
        //             }
                    
        //         }
        //     });
        //     this.arr = response.data.info_list
        //     this.all =  response.data.total_count
        //     // success callback
        // }, response => {
        //     console.log('错误')
        //     // error callback
        // })
     },
     //切换排行
    markcl(){
        this.empty()
        if(this.mark == '../../../static/icon-up.png' || this.mark == '../../../static/icon-normal.png'){
             this.mark = '../../../static/icon-down.png'
             this.thesort_param = "market_value,1"
         }else{
             this.mark = '../../../static/icon-up.png'
             this.thesort_param = "market_value,-1"
         }
          this.thepage = 1
          this.redditsee='../../../static/icon-normal.png'
          this.redditac='../../../static/icon-normal.png'
          this.twittersee='../../../static/icon-normal.png'
          this.twitterup='../../../static/icon-normal.png'
          this.facesee='../../../static/icon-normal.png'
          this.teleman='../../../static/icon-normal.png'
          this.macb.borderBottom = 2 + 'px' + ' ' + 'solid' + ' ' + 'black'
          this.maci.display = 'inline-block'
        //   this.topchange(1)
          this.fornew()
          
    },
    redditseecl(){
        this.empty()
        if(this.redditsee == '../../../static/icon-up.png' || this.redditsee == '../../../static/icon-normal.png'){
             this.redditsee = '../../../static/icon-down.png'
             this.thesort_param = "reddit_attention,1"
         }else{
             this.redditsee = '../../../static/icon-up.png'
             this.thesort_param = "reddit_attention,-1"
         }
          this.thepage = 1
         this.mark='../../../static/icon-normal.png'
          this.redditac='../../../static/icon-normal.png'
          this.twittersee='../../../static/icon-normal.png'
          this.twitterup='../../../static/icon-normal.png'
          this.facesee='../../../static/icon-normal.png'
          this.teleman='../../../static/icon-normal.png'
          this.resb.borderBottom = 2 + 'px' + ' ' + 'solid' + ' ' + 'black'
          this.resi.display = 'inline-block'
          this.fornew()
         
    },
    redditaccl(){
        this.empty()
        if(this.redditac == '../../../static/icon-up.png' || this.redditac == '../../../static/icon-normal.png'){
             this.redditac = '../../../static/icon-down.png'
             this.thesort_param = "reddit_actives ,1"
         }else{
             this.redditac = '../../../static/icon-up.png'
             this.thesort_param = "reddit_actives ,-1"
         }
          this.thepage = 1
         this.mark='../../../static/icon-normal.png'
          this.redditsee='../../../static/icon-normal.png'
          this.twittersee='../../../static/icon-normal.png'
          this.twitterup='../../../static/icon-normal.png'
          this.facesee='../../../static/icon-normal.png'
          this.teleman='../../../static/icon-normal.png'
          this.reob.borderBottom = 2 + 'px' + ' ' + 'solid' + ' ' + 'black'
          this.reoi.display = 'inline-block'
          this.fornew()
          
    },
    twitterseecl(){
        this.empty()
        if(this.twittersee == '../../../static/icon-up.png' || this.twittersee == '../../../static/icon-normal.png'){
             this.twittersee = '../../../static/icon-down.png'
             this.thesort_param = "twitter_attention ,1"
         }else{
             this.twittersee = '../../../static/icon-up.png'
             this.thesort_param = "twitter_attention ,-1"
         }
          this.thepage = 1
          this.mark='../../../static/icon-normal.png'
          this.redditsee='../../../static/icon-normal.png'
          this.redditac='../../../static/icon-normal.png'
          this.twitterup='../../../static/icon-normal.png'
          this.facesee='../../../static/icon-normal.png'
          this.teleman='../../../static/icon-normal.png'
          this.ttab.borderBottom = 2 + 'px' + ' ' + 'solid' + ' ' + 'black'
          this.ttai.display = 'inline-block'
          this.fornew()
          
    },
    twitterupcl(){
        this.empty()
        if(this.twitterup == '../../../static/icon-up.png' || this.twitterup == '../../../static/icon-normal.png'){
             this.twitterup = '../../../static/icon-down.png'
              this.thesort_param = "tweets ,1"
             
         }else{
             this.twitterup = '../../../static/icon-up.png'
              this.thesort_param = "tweets ,-1"
         }
          this.thepage = 1
          this.mark='../../../static/icon-normal.png'
          this.redditsee='../../../static/icon-normal.png'
          this.redditac='../../../static/icon-normal.png'
          this.twittersee='../../../static/icon-normal.png'
          this.facesee='../../../static/icon-normal.png'
          this.teleman='../../../static/icon-normal.png'
          this.tttb.borderBottom = 2 + 'px' + ' ' + 'solid' + ' ' + 'black'
          this.ttti.display = 'inline-block'
          this.fornew()
          
    },
    faceseecl(){
        this.empty()
        if(this.facesee == '../../../static/icon-up.png' || this.facesee == '../../../static/icon-normal.png'){
             this.facesee = '../../../static/icon-down.png'
             this.thesort_param = "facebook_attention ,1"
         }else{
             this.facesee = '../../../static/icon-up.png'
             this.thesort_param = "facebook_attention ,-1"
         }
          this.thepage = 1
          this.mark='../../../static/icon-normal.png'
          this.redditsee='../../../static/icon-normal.png'
          this.redditac='../../../static/icon-normal.png'
          this.twittersee='../../../static/icon-normal.png'
          this.twitterup='../../../static/icon-normal.png'
          this.teleman='../../../static/icon-normal.png'
          this.fbab.borderBottom = 2 + 'px' + ' ' + 'solid' + ' ' + 'black'
          this.fbai.display = 'inline-block'
          this.fornew()
          
    },
    telemancl(){
        this.empty()
        if(this.teleman == '../../../static/icon-up.png' || this.teleman == '../../../static/icon-normal.png'){
             this.teleman = '../../../static/icon-down.png'
             this.thesort_param = "telegram_attention ,1"
         }else{
             this.teleman = '../../../static/icon-up.png'
             this.thesort_param = "telegram_attention ,-1"
         }
          this.thepage = 1
         this.mark='../../../static/icon-normal.png'
          this.redditsee='../../../static/icon-normal.png'
          this.redditac='../../../static/icon-normal.png'
          this.twittersee='../../../static/icon-normal.png'
          this.twitterup='../../../static/icon-normal.png'
          this.facesee='../../../static/icon-normal.png'
          this.tgpb.borderBottom = 2 + 'px' + ' ' + 'solid' + ' ' + 'black'
          this.tgpi.display = 'inline-block'
          this.fornew()
          
    }


  }
}
</script>

<style scoped>
.out{
    width: 100%;
    padding-top: 50px;
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
    padding-top: 29px;
    position: relative;
    padding-bottom: 100px;
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
    height: 51px;
    margin-top: 36px;
    line-height: 51px;
    border-bottom: 1px solid #ccc;
}
.content .content_middle .entitle{
    font-size: 14px;
}
.title li{
    float: left;
    height: 51px;
    width: 115px;
    line-height: 45px;
    text-align: right;
    color: #292929;
    font-weight: 400;
    box-sizing: border-box;
    cursor:pointer;
    font-size: 14px;
    padding-top: 5px;
}
.title li:hover{
    border-bottom: 2px solid black;
}
.title li:hover img{
    display: inline-block;
}
.title li img{
    display: none;
    width: 14px;
    height: 15px;
    vertical-align: 7px;
}
.title .first{
    width: 50px;
    text-align: center;
    border:0!important;
    line-height: 40px;
}
.title .sec_first{
    width: 48px;
    border:0!important;
}
.title .second{
    width: 139px;
    text-align: left;
    border:0!important;
    line-height: 40px;
}
.title .marks{
    width: 110px;
    text-align: right;
    line-height: 40px;
    margin-right: 26px;
}
.title .marks img{
    vertical-align: -2px;
}
.title .read{
    width: 82px;
    text-align: right;
    margin-right: 25px;
}
.title .rread{
    width: 80px;
    text-align: right;
    margin-right: 24px;
}
.title .tsee{
    width: 80px;
    text-align: right;
    margin-right: 25px;
}
.title .tart{
    width: 80px;
    text-align: right;
    margin-right: 21px;
}
.title .fcsee{
     width: 84px;
    text-align: right;
    margin-right: 22px;
}
.title .tman{
    width: 84px;
    text-align: right;
}
.title .enmark{
    width: 111px;
    text-align: right;
    line-height: 40px;
    margin-right: 25px;
}
.title .enmark img{
    vertical-align: -2px;
}
.title .enread{
    width: 94px;
    text-align: right;
    margin-right: 20px;
}
.title .enrread{
    width: 80px;
    text-align: right;
    margin-right: 15px;
}
.title .entsee{
    width: 84px;
    text-align: right;
    margin-right: 20px;
}
.title .entart{
    width: 84px;
    text-align: right;
    margin-right: 17px;
    line-height: 40px;
}
.title .entart img{
    vertical-align: -2px;
}
.title .enfcsee{
    width: 84px;
    text-align: right;
    margin-right: 17px;
    /* margin-right: 17px; */
}
.title .entman{
    width: 84px;
    text-align: right;
}
.data{
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #e4e4e4;
}
.data li{
    float: left;
    height: 50px;
    width: 110px;
    font-size: 14px;
    line-height: 50px;
    text-align: center;
    color: black;
}
.data .first{
    width: 50px;
}
.data .sec_first{
    width: 48px;
}
.data .prs{
    width: 110px;
    text-align: right;
    margin-right: 26px;
}
.data .rg{
    width: 82px;
    margin-right: 25px;
    text-align: right;
}
.data .rh{
     width: 80px;
     margin-right: 24px;
    text-align: right;
}
.data .tg{
    width: 80px;
    margin-right: 25px;
    text-align: right;
}
.data .ff{
    width: 80px;
    margin-right: 21px;
    text-align: right;
}
.data .teg{
    width: 84px;
    text-align: right;
    margin-right: 22px;
}
.data .tw{
    width: 84px;
    text-align: right;
}
.data .enprs{
    width: 111px;
    text-align: right;
    margin-right: 25px;
}
.data .enrg{
    width: 94px;
    text-align: right;
    margin-right: 20px;
}
.data .enrh{
    width: 80px;
    text-align: right;
    margin-right:15px;
}
.data .entg{
    width: 84px;
    text-align: right;
    margin-right: 20px;
}
.data .enff{
    width: 84px;
    text-align: right;
    margin-right: 17px;
}
.data .enteg{
    width: 84px;
    text-align: right;
    margin-right: 17px;
}
.data .entw{
    width: 84px;
    text-align: right;
}
.data .sec_sec{
    width: 139px;
    text-align: left;
    cursor: pointer;
}
.data .sec_sec:hover{
    color: blue;
    text-decoration: underline;
}
.pic{
    width: 20px;
    height: 20px;
    background-color: #ccc;
    border-radius: 50%;
    margin-top: 15px;
    margin-left: 20px;
}
.pic img{
    width: 20px;
    height: 20px;
}
.boxw{
    width: 50px;
    text-align: right;
    display: inline-block;
    line-height: 18px;
}
.boxwl{
    width: 70px;
    text-align: right;
    display: inline-block;
    line-height: 18px;
}
.midd{
    width: 70px;
    margin: 0 auto;
    overflow: hidden;
}
</style>
