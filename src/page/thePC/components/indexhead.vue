<template>
  <div class="top">
      <div class="mdl">
            <div class="top_left" @click="gotoindex">
        <img src="../../../../static/TokenRank.png">
      </div>
      <div @click="gotoco" class="coins" v-if="$store.state.lanfalg" :style="co">
          币种
      </div>
      <div @click="gotoco" class="coins" v-else  :style="co">
          COINS
      </div>
      <div @click="gotoex" class="exchange" v-if="$store.state.lanfalg" :style="ex">
          交易所
      </div> 
      <div @click="gotoex" class="exchange" v-else :style="ex">
          EXCHANGES
      </div>
     
      <div class="top_right" @click="$store.commit('changelang')">
          <img src="../../../../static/icon-cn.png" alt="" v-if="$store.state.lanfalg">
          <img src="../../../../static/icon-en.png" alt="" v-else>
      </div>
       <div class="curdel" @click="$store.commit('changecur',2)" :style="$store.state.currency == 2?select:unselect">
          ￥ - CNY
      </div>
      <div class="curdel"  @click="$store.commit('changecur',1)" :style="$store.state.currency == 1?select:unselect">
          $ - USD
      </div>
      </div>
      
  </div>
</template>

<script>
export default {
  data(){
      return{
          co:{
              borderBottom:2 + 'px' + ' ' + 'solid' + ' ' + '#000'
          },
        ex:{
            borderBottom:'none'
        },
         unselect:{
              border:1 + 'px' + ' ' + 'solid' + '#ddd',
              
          },
          select:{
              border:1 + 'px' + ' ' + 'solid' + '#000',
              color:'#000'
          }
      }
  },
created(){
    console.log(this.$route.path)
    if(this.$route.path == '/' || this.$route.path == '/pctoken/pctokentrade'){
         this.ex={
              borderBottom:'none'
          }
        this.co={
            borderBottom:2 + 'px' + ' ' + 'solid' + ' ' + '#000'
        }
    }else if(this.$route.path == '/pcexchange' || this.$route.path == '/pcexchange/pcexdetail'){
        this.co={
              borderBottom:'none'
          }
        this.ex={
            borderBottom:2 + 'px' + ' ' + 'solid' + ' ' + '#000'
        }
    }
},
  methods:{
      gotoindex:function(){
          this.$router.push({
            path:'/',
            component:'Pcsocial'
          })
      },
      gotoex(){
        
        this.co={
              borderBottom:'none'
          }
        this.ex={
            borderBottom:2 + 'px' + ' ' + 'solid' + ' ' + '#000'
        }
        
        this.$router.push({
             path: '/pcexchange',
          })
       
      },
      gotoco(){
          this.ex={
              borderBottom:'none'
          }
        this.co={
            borderBottom:2 + 'px' + ' ' + 'solid' + ' ' + '#000'
        }
        
      
         this.$router.push({
             path: '/',
          })
      }
  }
}
</script>

<style scoped>
.top{
    width: 100%;
    height: 94px;
    background-color: #fff;
    text-align: center;
    cursor:pointer;
    padding: 0 21px;
    border-bottom: 1px solid #e6e6e6;
    box-sizing: border-box;
}
.top_left{
    float: left;
    width: 237px;
    height: 94px;
}
.top_left img{
    margin-top: 28px;
    width: 205px;
    height: 33px;
}
.ableft{
    float: left;
    width: 50px;
    height: 136px;
    text-align: left;
    line-height: 178px;
    
}
.top_right{
    float: right;
    width: 60px;
    height: 94px;
    font-size: 24px;
    font-weight: 600;
}
.top_right img{
    margin-top: 40px;
    width: 24px;
    height: 24px;
}
.cn{
    color: skyblue;
}
.mdl{
    width: 1000px;
    margin: 0 auto;
     height: 94px;
}
.coins{
    float: left;
    margin-left: 130px;
    font-size: 16px;
    height: 25px;
    font-weight: 600;
    padding: 0 10px;
    margin-top: 35px;
}
.exchange{
    float: left;
    margin-left: 50px;
    font-size: 16px;
    height: 25px;
    font-weight: 600;
    padding: 0 10px;
    margin-top: 35px;
}
.curdel{
        text-align: center;
        float: right;
        margin-left: 10px;
        width: 80px;
        height: 34px;
        border: 1px solid #ddd;
        font-size: 14px;
        color: #999;
        line-height: 34px;
        cursor: pointer;
        margin-top: 35px;
    }
    .curdel:hover{
        color: #000;
    }
    @media screen and (min-width: 1200px){
        .mdl{
        width: 1200px;
        margin: 0 auto;
    }
}
</style>
