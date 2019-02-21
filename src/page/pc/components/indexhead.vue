<template>
  <div class="top">
      <div class="top_left" @click="gotoindex">
        <img src="../../../../static/TokenRank.png">
      </div>
      <div class="top_right" @click="language">
          <img src="../../../../static/icon-cn.png" alt="" v-if="cnen_change">
          <img src="../../../../static/icon-en.png" alt="" v-else>
      </div>
  </div>
</template>

<script>
export default {
  data(){
      return{
          aboutflag:false,
          lan:true,
          cnen_change:true,
      }
  },
  props:{
      childMsg:''
  },
  methods:{
      language:function(){
          this.lan = !this.lan
          this.$emit('changelan',this.lan);
          console.log('子组件');
          this.cnen_change = !this.cnen_change 
      },
      goback:function(){
          this.$router.go(-1)
      },
      gotoindex:function(){
          this.$router.push({
            path:'/Pcsocial',
            component:'Pcsocial'
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
    width: 299px;
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
    width: 100px;
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
</style>
