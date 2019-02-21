<template>
  <div class="out">
      <!-- 顶部广告位 -->
      <div class="top_advertis"  v-if="top_advertising">
          <img :src="top_close" alt="" class="sst" @mouseenter="enter1()" @mouseleave='leave1()' @click="close1()">
          <img :src="top_advertising" alt="" @click="gotoTop_advertising">
      </div>
      <div class="content" >
          <!-- 翻页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="all" class="page_top" :page-size="thepage_size" :current-page.sync="thepage" @current-change="topchange_git">
            </el-pagination>
            <el-pagination
            background
            layout="prev, pager, next"
            :total="all" class="page_bottom" :page-size="thepage_size" :current-page.sync="thepage" @current-change="topchange_git">
            </el-pagination>
          <div class="content_top" v-if="lanfalg">
              <span :class="{select:issocial}" @click="gotosocial" >社交指数 </span>
              <span :class="{select:isgit}" >GitHub指数</span>
          </div>
          <div class="content_top" v-else>
              <span :class="{select:issocial}" @click="gotosocial" >The Social List   </span>
              <span :class="{select:isgit}">The GitHub List</span>
          </div>
          <div class="content_middle">
              <div class="title">
                  <ul>
                      <li class="first">#</li>
                      <li class="sec_first"></li>
                      <li class="second" v-if="lanfalg">名称</li>
                       <li class="second" v-else>name</li>
                      <li class="Commits" @click="Commits" :style="comb">Commits <img :src="Commitsimg" alt="" :style='comi'></li>
                      <li class="Branches" @click="Branches" :style="brab">Branches <img :src="Branchesimg" alt="" :style="brai"></li>
                      <li class="Releases"  @click="Releases" :style="relb">Releases <img :src="Releasesimg" alt="" :style="reli"></li>
                      <li class="Contributors" @click="Contributors" :style="ctbb">Contributors <img :src="Contributorsimg" alt="" :style="ctbi"></li>
                      <li class="Watch"  @click="Watch" :style="watb">Watch <img :src="Watchimg" alt="" :style="wati"></li>
                      <li class="Star"  @click="Star" :style="strb">Star <img :src="Starimg" alt="" :style="stri"></li>
                      <li class="Fork" @click="Fork" :style="fokb">Fork <img :src="Forkimg" alt="" :style="foki"></li>
                  </ul>
              </div>
              <div class="data" v-for="(item,index) in arr" >
                  <ul>
                      <li class="first">{{index + 1 + (thepage - 1)*thepage_size}}</li>
                      <li @click="gotodetail(item.code)" class="sec_first"><img :src="item.icon" alt=""  class="pic"></li>
                      <li @click="gotodetail(item.code)" class="sec_sec">{{item.code}}</li>
                      <li class="com" >{{item.commits}}</li>
                      <li class="bra">{{item.branches}}</li>
                      <li class="rel">{{item.releases}}</li>
                      <li class="ctbt">{{item.contributors}}</li>
                      <li class="wat">{{item.watch}}</li>
                      <li class="star">{{item.star}}</li>
                      <li class="fork">{{item.fork}}</li>
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
export default {
  data(){
      return{
           //底部广告位
          bot_advertising:'../../../static/ad-dolphin-03.png',
          bot_close:'../../../static/ads-close-01.svg',
          //顶部广告位
          top_close:'../../../static/ads-close-01.svg',
          top_advertising:'../../../static/ad-dolphin-03.png',
          issocial:false,
          isgit:true,
          about:false,
          //底部边框
          //1
          comb:{
              borderBottom: ''
          },
          comi:{
              display:''
          },
          //2
            brab:{
              borderBottom: ''
          },
          brai:{
              display:''
          },
          //3
            relb:{
              borderBottom: ''
          },
          reli:{
              display:''
          },
          //4
            ctbb:{
              borderBottom: ''
          },
          ctbi:{
              display:''
          },
          //5
             watb:{
              borderBottom: ''
          },
          wati:{
              display:''
          },
          //6
             strb:{
              borderBottom: ''
          },
          stri:{
              display:''
          },
          //7
          fokb:{
              borderBottom: ''
          },
          foki:{
              display:''
          },
          //请求参数
          thepage_size:50,
          thesort_param: "commits,-1",
          all:0,
           //翻页
          thepage:1,
        //   切换排序图片
          Commitsimg:'../../../static/icon-normal.png',
          Branchesimg:'../../../static/icon-normal.png',
          Releasesimg:'../../../static/icon-normal.png',
          Contributorsimg:'../../../static/icon-normal.png',
          Watchimg:'../../../static/icon-normal.png',
          Starimg:'../../../static/icon-normal.png',
          Forkimg:'../../../static/icon-normal.png',
          arr:[
          {rank:2,name:'aaa',commits:'111',branches:'111',releases:'111',contributors:'111',watch:'111',star:'111',fork:'111'},
          {rank:2,name:'aaa',commits:'111',branches:'111',releases:'111',contributors:'111',watch:'111',star:'111',fork:'111'},
          {rank:2,name:'aaa',commits:'111',branches:'111',releases:'111',contributors:'111',watch:'111',star:'111',fork:'111'},
          {rank:2,name:'aaa',commits:'111',branches:'111',releases:'111',contributors:'111',watch:'111',star:'111',fork:'111'},
          {rank:2,name:'aaa',commits:'111',branches:'111',releases:'111',contributors:'111',watch:'111',star:'111',fork:'111'},
          {rank:2,name:'aaa',commits:'111',branches:'111',releases:'111',contributors:'111',watch:'111',star:'111',fork:'111'},
          {rank:2,name:'aaa',commits:'111',branches:'111',releases:'111',contributors:'111',watch:'111',star:'111',fork:'111'},
          {rank:2,name:'aaa',commits:'111',branches:'111',releases:'111',contributors:'111',watch:'111',star:'111',fork:'111'},
          {rank:2,name:'aaa',commits:'111',branches:'111',releases:'111',contributors:'111',watch:'111',star:'111',fork:'111'},
          {rank:2,name:'aaa',commits:'111',branches:'111',releases:'111',contributors:'111',watch:'111',star:'111',fork:'111'},
          ]
      }
  },
   props:{
      lanfalg:true
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
   mounted(){
          this.about = false
          this.$emit('upup',this.about);
          setTimeout(() => {
              window.scrollTo(0,0)
          }, 0);
          console.log('置顶')
      },
      created(){
           axios.post('https://blockchain.ldzldq.com/tokenrank/githubIndex.json',{
            "page_num": this.thepage - 1,
		    "page_size": this.thepage_size,
            "sort_param": this.thesort_param 
        }).then(response => {
            console.log(response)
            response.data.info_list.forEach(element => {
                for (const key in element) {
                    if(element[key] == -999 ){
                        element[key] = '-'
                    }else{
                        if(typeof(element[key]) == 'number'){
                            element[key] = this.conversion(element[key].toString())
                        }
                    }
                }
            });
            this.arr = response.data.info_list
            this.all =  response.data.total_count
            // success callback
        }, response => {
            console.log('错误')
            // error callback
        })
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
      // 清空底部
      empty(){
           //1
          this.comb={
              borderBottom: ''
          }
          this.comi={
              display:''
          }
          //2
            this.brab={
              borderBottom: ''
          }
          this.brai={
              display:''
          }
          //3
            this.relb={
              borderBottom: ''
          }
          this.reli={
              display:''
          }
          //4
            this.ctbb={
              borderBottom: ''
          }
          this.ctbi={
              display:''
          }
          //5
            this.watb={
              borderBottom: ''
          }
          this.wati={
              display:''
          }
          //6
             this.strb={
              borderBottom: ''
          }
          this.stri={
              display:''
          }
          //7
          this.fokb={
              borderBottom: ''
          }
          this.foki={
              display:''
          }
      },
       //请求数据
     fornew(){
         axios.post('https://blockchain.ldzldq.com/tokenrank/githubIndex.json',{
            "page_num": this.thepage - 1,
		    "page_size": this.thepage_size,
            "sort_param": this.thesort_param 
        }).then(response => {
            console.log(response)
            response.data.info_list.forEach(element => {
                for (const key in element) {
                    if(element[key] == -999){
                        element[key] = '-'
                    }else{
                        if(typeof(element[key]) == 'number'){
                            element[key] = this.conversion(element[key].toString())
                        }
                    }
                }
                
            });
            this.arr = response.data.info_list
            this.all =  response.data.total_count
            // success callback
        }, response => {
            console.log('错误')
            // error callback
        })
     },
      gotosocial:function(){
          this.$router.replace({
                path:'/pcsocial',
                component:'Pcsocial'
          })
      },
     gotodetail:function(e){
        
        this.$router.push({
                 path:'/pctable',
                 component:'Pctable',
                 query:{
                     code:e   
                 }
          })
     },
      //翻页
     topchange_git(e){
         console.log(111111)
         this.thepage = e 
     },
     //切换排序
     Commits:function(){
         console.log(222222)
         console.log(this.thepage)
         this.empty()
         if(this.Commitsimg == '../../../static/icon-up.png' || this.Commitsimg == '../../../static/icon-normal.png'){
             this.Commitsimg = '../../../static/icon-down.png'
             this.thesort_param = "commits,1"
         }else{
             this.Commitsimg = '../../../static/icon-up.png'
             this.thesort_param = "commits,-1"
         }
         this.thepage = 1
        //  this.topchange_git(1)
          this.Branchesimg='../../../static/icon-normal.png'
          this.Releasesimg='../../../static/icon-normal.png'
          this.Contributorsimg='../../../static/icon-normal.png'
          this.Watchimg='../../../static/icon-normal.png'
          this.Starimg='../../../static/icon-normal.png'
          this.Forkimg='../../../static/icon-normal.png'
          this.comb.borderBottom = 2 + 'px' + ' ' + 'solid' + ' ' + 'black'
          this.comi.display = 'inline-block'
          this.fornew()
          
          
     },
     Branches:function(){
         this.empty()
         if(this.Branchesimg == '../../../static/icon-up.png' || this.Branchesimg == '../../../static/icon-normal.png'){
             this.Branchesimg = '../../../static/icon-down.png'
             this.thesort_param = "branches,1"
         }else{
             this.Branchesimg = '../../../static/icon-up.png'
             this.thesort_param = "branches,-1"
         }
          this.thepage = 1
        //   this.topchange_git(1)
          this.Commitsimg='../../../static/icon-normal.png'
          this.Releasesimg='../../../static/icon-normal.png'
          this.Contributorsimg='../../../static/icon-normal.png'
          this.Watchimg='../../../static/icon-normal.png'
          this.Starimg='../../../static/icon-normal.png'
          this.Forkimg='../../../static/icon-normal.png'
          this.brab.borderBottom = 2 + 'px' + ' ' + 'solid' + ' ' + 'black'
          this.brai.display = 'inline-block'
          this.fornew()
     },
     Releases:function(){
         this.empty()
        if(this.Releasesimg == '../../../static/icon-up.png' || this.Releasesimg == '../../../static/icon-normal.png'){
             this.Releasesimg = '../../../static/icon-down.png'
             this.thesort_param = "releases,1"
         }else{
             this.Releasesimg = '../../../static/icon-up.png'
             this.thesort_param = "releases,-1"
         }
          this.thepage = 1
          this.Commitsimg='../../../static/icon-normal.png'
          this.Branchesimg='../../../static/icon-normal.png'
          this.Contributorsimg='../../../static/icon-normal.png'
          this.Watchimg='../../../static/icon-normal.png'
          this.Starimg='../../../static/icon-normal.png'
          this.Forkimg='../../../static/icon-normal.png'
          this.relb.borderBottom = 2 + 'px' + ' ' + 'solid' + ' ' + 'black'
          this.reli.display = 'inline-block'
        //   this.topchange_git(1)
          this.fornew()
     },
     Contributors:function(){
         this.empty()
         if(this.Contributorsimg == '../../../static/icon-up.png' || this.Contributorsimg == '../../../static/icon-normal.png'){
             this.Contributorsimg = '../../../static/icon-down.png'
             this.thesort_param = "contributors,1"
         }else{
             this.Contributorsimg = '../../../static/icon-up.png'
             this.thesort_param = "contributors,-1"
         }
          this.thepage = 1
          this.Commitsimg='../../../static/icon-normal.png'
          this.Branchesimg='../../../static/icon-normal.png'
          this.Releasesimg='../../../static/icon-normal.png'
          this.Watchimg='../../../static/icon-normal.png'
          this.Starimg='../../../static/icon-normal.png'
          this.Forkimg='../../../static/icon-normal.png'
          this.ctbb.borderBottom = 2 + 'px' + ' ' + 'solid' + ' ' + 'black'
          this.ctbi.display = 'inline-block'
        //   this.topchange_git(1)
          this.fornew()
     },
    Watch:function(){
        this.empty()
        if(this.Watchimg == '../../../static/icon-up.png' || this.Watchimg == '../../../static/icon-normal.png'){
             this.Watchimg = '../../../static/icon-down.png'
             this.thesort_param = "watch,1"
         }else{
             this.Watchimg = '../../../static/icon-up.png'
             this.thesort_param = "watch,-1"
         }
          this.thepage = 1
          this.Commitsimg='../../../static/icon-normal.png'
          this.Branchesimg='../../../static/icon-normal.png'
          this.Releasesimg='../../../static/icon-normal.png'
          this.Contributorsimg='../../../static/icon-normal.png'
          this.Starimg='../../../static/icon-normal.png'
          this.Forkimg='../../../static/icon-normal.png'
          this.watb.borderBottom = 2 + 'px' + ' ' + 'solid' + ' ' + 'black'
          this.wati.display = 'inline-block'
        //   this.topchange_git(1)
          this.fornew()
    },
    Star:function(){
        this.empty()
        if(this.Starimg == '../../../static/icon-up.png' || this.Starimg == '../../../static/icon-normal.png'){
             this.Starimg = '../../../static/icon-down.png'
             this.thesort_param = "star,1"
         }else{
             this.Starimg = '../../../static/icon-up.png'
             this.thesort_param = "star,-1"
         }
          this.thepage = 1
          this.Commitsimg='../../../static/icon-normal.png'
          this.Branchesimg='../../../static/icon-normal.png'
          this.Releasesimg='../../../static/icon-normal.png'
          this.Contributorsimg='../../../static/icon-normal.png'
          this.Watchimg='../../../static/icon-normal.png'
          this.Forkimg='../../../static/icon-normal.png'
          this.strb.borderBottom = 2 + 'px' + ' ' + 'solid' + ' ' + 'black'
          this.stri.display = 'inline-block'
        //   this.topchange_git(1)
          this.fornew()
    },
    Fork(){
        this.empty()
        if(this.Forkimg == '../../../static/icon-up.png' || this.Forkimg == '../../../static/icon-normal.png'){
             this.Forkimg = '../../../static/icon-down.png'
             this.thesort_param = "fork,1"
         }else{
             this.Forkimg = '../../../static/icon-up.png'
             this.thesort_param = "fork,-1"
         }
          this.thepage = 1
          this.Commitsimg='../../../static/icon-normal.png'
          this.Branchesimg='../../../static/icon-normal.png'
          this.Releasesimg='../../../static/icon-normal.png'
          this.Contributorsimg='../../../static/icon-normal.png'
          this.Watchimg='../../../static/icon-normal.png'
          this.Starimg='../../../static/icon-normal.png'
          this.fokb.borderBottom = 2 + 'px' + ' ' + 'solid' + ' ' + 'black'
          this.foki.display = 'inline-block'
        //   this.topchange_git(1)
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
.content_top span{
    border-bottom: 1px solid #8f8f8f;
    padding: 0 20px;
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
.title li{
    float: left;
    height: 51px;
    width: 110px;
    font-size: 14px;
    line-height: 51px;
    text-align: center;
    color: #292929;
    box-sizing: border-box;
    cursor:pointer;
}
.title li:hover{
    border-bottom: 2px solid black;
}
.title li:hover img{
    display: inline-block;
}
.title .first{
    width: 50px;
    text-align: center;
    border:0!important;
}
.title .sec_first{
    width: 48px;
    border:0!important;
}
.title .second{
    width: 149px;
    text-align: left;
    border:0!important;
}
.title .Commits{
    width: 80px;
    text-align: right;
    margin-right: 25px;
}
.title li img{
    display: none;
    width: 14px;
    height: 15px;
}
.title .Branches{
    width: 82px;
    text-align: right;
    margin-right: 26px;
}
.title .Releases{
    width: 80px;
    text-align: right;
    margin-right: 18px;
}
.title .Contributors{
    width: 103px;
    text-align: right;
    margin-right: 23px;
}
.title .Watch{
     width: 80px;
    text-align: right;
    margin-right: 27px;
}
.title .Star{
     width: 80px;
    text-align: right;
    margin-right: 27px;
}
.title .Fork{
    width: 80px;
    text-align: right;
}
.data{
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #ccc;
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
.data .sec_sec{
    width: 149px;
    text-align: left;
    cursor: pointer;
}
.data .sec_sec:hover{
     color: blue;
    text-decoration: underline;
}
.data .com{
    width: 80px;
    text-align: right;
    margin-right: 25px;
}
.data .bra{
    width: 82px;
    text-align: right;
    margin-right: 26px;
}
.data .rel{
    width: 80px;
    text-align: right;
    margin-right: 18px;
}
.data .ctbt{
    width: 103px;
    text-align: right;
    margin-right: 23px;
}
.data .wat{
    width: 80px;
    text-align: right;
    margin-right: 27px;
}
.data .star{
     width: 80px;
    text-align: right;
    margin-right: 27px;
}
.data .fork{
     width: 80px;
    text-align: right;
}
.pic{
    width: 20px;
    height: 20px;
    background-color: #ccc;
    border-radius: 50%;
    margin-top: 17px;
    margin-left: 20px;
}
</style>
