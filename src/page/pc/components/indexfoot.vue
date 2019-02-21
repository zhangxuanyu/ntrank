<template>
  <div class="footout">
      <div class="footcontent"  v-if="lanfalg">
          <div class="about" @click="aboutus">关于我们</div>
          <div class="contact">
              联系我们
          </div>
      </div>
      <div class="footcontent"  v-else>
          <div class="about" @click="aboutus">ABOUT US</div>
          <div class="contact">
              CONTACT US
          </div>
      </div>
      <div class="copyright">
          Copyright © 2018-2028 tokenRank.net 版权所有
      </div>
      
  </div>
</template>

<script>
export default {
  methods:{
      aboutus:function(){
          this.$router.push({
                path:'/Pcabout',
                component:'Pcabout'
          })
      }
  },
  props:{
      lanfalg:true
  },
}
</script>

<style scoped>
.footout{
    width: 100%;
    background-color: #fff;
    text-align: center;
}
.footcontent{
    width: 1000px;
    margin: 0 auto;
    height: 150px;
    margin-top: 30px;
}
.footcontent .about{
    float: left;
    cursor: pointer;
}
.footcontent .contact{
    float: right;
}
.copyright{
    font-size: 14px;
    width: 1000px;
    height: 100px;
    line-height: 100px;
    margin: 0 auto;
}
</style>
