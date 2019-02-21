<template>
  <div class="top">
      <div class="ableft" @click="goback">
          〈
      </div>
      <div class="top_left">
          logo
      </div>
      <div class="top_right" @click="language">
          <span v-bind:class="{cn:iscn}"> CN/</span><span v-bind:class="{cn:isen}">EN</span>
      </div>
  </div>
</template>

<script>
export default {
  data(){
      return{
          iscn:true,
          isen:false
      }
  },
  methods:{
      language:function(){
          this.iscn = !this.iscn;
          this.isen = !this.isen;
      },
      goback:function(){
          this.$router.go(-1)
      }
  }
}
</script>

<style scoped>
.top{
    width: 100%;
    height: 80px;
    background-color: #fff;
    text-align: center;
    cursor:pointer;
    border-bottom: 2px solid #ccc;
}
.top_left{
    float: left;
    width: 200px;
    height: 80px;
    line-height: 80px;
}
.top_right{
    float: right;
    width: 200px;
    height: 80px;
    line-height: 80px;
    font-size: 24px;
    font-weight: 600;
}
.cn{
    color: skyblue;
}
</style>
