<template>
  <div class="footout">
      <!-- <div class="footcontent"  v-if="lanfalg"> -->
          <!-- <div class="about" @click="aboutus">关于我们</div>
          <div class="contact">
              联系我们
          </div> -->
      <!-- </div> -->
      <!-- <div class="footcontent"  v-else> -->
          <!-- <div class="about" @click="aboutus">ABOUT US</div>
          <div class="contact">
              CONTACT US
          </div> -->
      <!-- </div> -->
      <div class="copyright">
          Copyright © 2018 TokenRank.net
      </div>
      
  </div>
</template>

<script>
export default {
  methods:{
      aboutus:function(){
          this.$router.push({
                path:'/pctokenabout',
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
    background-color: #f5f6fa;
    text-align: center;
    color: #999;
    
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
    font-size: 12px;
    width: 1000px;
    height: 100px;
    line-height: 100px;
    margin: 0 auto;
}
</style>
