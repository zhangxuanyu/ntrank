<template>
    <div >
        <my-head class="all"></my-head>
        <router-view class="cont"/>
        
        <my-foot class="all"></my-foot>
    </div>
</template>

<script>
import myFoot from './myfoot'
import myHead from './myhead'
export default {
    components:{
                myFoot,
                myHead
            },
    data(){
        return{
            theleft:''
        }
    }
         
}
</script>

<style scoped  lang="scss">
.all{
    padding: 0 50px;
}
.cont{
    padding: 0 40px;
    overflow: hidden;
    background-color:$bg;
    padding-bottom: 100px;
}
</style>

