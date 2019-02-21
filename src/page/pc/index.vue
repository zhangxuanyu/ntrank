<template>
  <div>
      <pc-indexhead :child-msg="msg" @changelan="showlan" :lanfalg="lanfalg"></pc-indexhead>
      <router-view  @upup="change" :msg="msg"  :lanfalg="lanfalg"/>
      <pc-indexfoot  :lanfalg="lanfalg"></pc-indexfoot>
  </div>
</template>

<script>
import pcIndexhead from '../pc/components/indexhead'
import pcIndexfoot from '../pc/components/indexfoot'

export default {
  components:{
    pcIndexhead,pcIndexfoot
  },
  data(){
    return{
      msg:false,
      lanfalg:true
    }
  },
  methods:{
    change(msg){
      this.msg = msg
    },
    showlan(lanfalg){
      this.lanfalg = lanfalg
      console.log('子组件到父组件')
    }
  },
   mounted(){
        window.scrollTo(0,0)
    },
    created(){
        document.body.style.minWidth = 1080 + 'px'
    }
  
}
</script>

<style scoped>

</style>
