<template>
  <div>
      <pc-indexhead></pc-indexhead>
      <router-view/>
      <pc-indexfoot></pc-indexfoot>
  </div>
</template>

<script>
import pcIndexhead from '../components/indexhead'
import pcIndexfoot from '../components/indexfoot'


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
