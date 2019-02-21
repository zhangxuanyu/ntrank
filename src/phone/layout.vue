<template>
    <div>
        <Header></Header>
        <router-view style="margin-top:0.88rem;"></router-view>
        <Footer></Footer>
    </div>
</template>
<script>
import Header from '../phcom/header'
import Footer from '../phcom/footer'
export default {
    components:{
        Header,Footer
    }
}
</script>
<style lang="scss" scoped>

</style>
