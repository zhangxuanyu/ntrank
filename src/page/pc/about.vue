<template>
  <div class="outab">
      <div class="contentab">
          <div class="logoimg" v-if="lanfalg">关于我们</div>
          <div class="logoimg" v-if="!lanfalg">ABOUT US</div>
          <p v-if="lanfalg">Token Rank专注于区块链数据挖掘与分析，旨在打造全球领先的项目评级平台。我们通过采集全球近1500种代币的实时价格、发行量、市值、项目详情、客观指标等相关数据，进行专业分析评估，实现用户检索体验的全面提升，为区块链爱好者提供客观科学、专业及时的内容信息服务，让您第一时间获取最具前瞻视野的行业观察与前沿资讯。欢迎您持续关注！</p> 
          <!-- <p>我们希望您能在此收获更多的优质糖果！</p> -->
            <p v-else>At TokenRank we're providing real-time coin prices, historical charts, token market cap and other objective indexes for
                almost than 1500 coins globally. We aim to build a large token of data integration platform which corresponding rank 
                servicer that are dedicated to comprehensively enhance the user block search experience. With a growing crypto community 
                and the authoritative, timely blockchian newsservices, token rank is the obvious choice for every Blockchain enthusiast.Stay tuned! </p>
      </div>
  </div>
</template>

<script>
export default {
  data(){
      return{
          about:true
      }
  },
  props:{
      lanfalg:true
  },
  created(){
      this.$emit('upup',this.about);
  },
   mounted(){
        setTimeout(() => {
              window.scrollTo(0,0)
          }, 0);
    },
  
}
</script>

<style scoped>
.outab{
    width: 100%;
    padding-bottom: 150px;
    padding-top: 80px;
    background-color: #fafafa;
}
.contentab{
    width: 840px;
    height: 400px;
    background-color: #fff;
    margin: 0 auto;
    padding-top: 28px;
    padding-left: 72px;
    padding-right: 72px;
}
.contentab p{
    margin-top: 30px;
    line-height: 32px;
    color: #8f8f8f;
    font-size: 14px;
}
.logoab{
    width: 100%;
    height: 60px;
    background-color: dodgerblue;
    line-height: 60px;
    color: white;
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 20px;
}
.logocen{
    width: 1000px;
    margin: 0 auto;
}
.logoimg{
    height: 61px;
    line-height: 61px;
    text-align: left;
    font-size: 24px;
    color: #000;
    border-bottom: 1px solid #e4e4e4;
}
.font{
    float: left;
}
.img{
    float: right;
}
.contentab p{
    margin-top: 20px;
}
</style>
