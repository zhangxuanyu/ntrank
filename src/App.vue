<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Highcharts from 'highcharts/highstock';
import newfn from '../static/base/base.js'
export default {
  name: 'App',
  beforeCreate(){
    
    newfn.fornew('get','/tokenrank/V2/currencyRate.json',{}).then((res)=>{
      let rate_list = res.data.data;
      this.$store.state.usd_cny[0] = rate_list[0].rate;
    })
  },
  created(){}
}
</script>

<style>

#app {
  	font-family: /* 西文 */ 'Gotham-Book', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", Helvetica, Arial, /* 中文 */ "PingFang SC", "Hiragino Sans GB", "Microsoft Yahei UI", "Microsoft Yahei", "Source Han Sans CN", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
