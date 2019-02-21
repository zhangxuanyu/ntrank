<template>
        <div id="header-box" class="clearfix">
            <img src="../../static/image/menu.png" alt="" class="menu" @click="shownav">
            <img src="../../static/image/logo.png" class="logo" @click="goto_index" alt="">
            <div class="nav-box" v-if="show_nav" @touchmove.prevent @click="shownav">
                <ul class="nav-ul" :style="navTrans">
                    <li v-for="(item,index) in headluaguage" :key="index" @click="nav_click(index)"><span>{{item[lanfalg]}}</span></li>
                
                    <li @click.stop="change_lan"><span>{{options[lanfalg].label}}</span></li>
                </ul>
            </div>
        </div>
</template>
<script>
import {mapState} from 'Vuex'
export default {
    data(){
        return{
            show_nav:false,
            navTrans: { transform: "translateX(0)" },
            headluaguage:'',
            options:'',
        }
    },
    created(){
        this.headluaguage = alllanguage.head;
        this.headluaguage = [["币种", "Coin"], ['趋势','Tendency']]
        this.options = alllanguage.head_options
        console.log(this.headluaguage)
    },
    methods:{
        change_lan(){
            if(this.$store.state.lanfalg === 1){
                this.$store.commit('changelang',0)
            }else{
                this.$store.commit('changelang',1)
            }
        },
        nav_click(index){
            switch(index){
                case 0:
                    this.$router.push({
                        path: '/'
                    })
                    break;
                // case 1:
                //     this.$router.push({
                //         path: '/data'
                //     })
                //     break;
                // case 2:
                //     this.$router.push({
                //         path: '/exchange'
                //     })
                //     break;
                default:
                    this.$router.push({
                        path: '/trend'
                    })
                
            }
        },
        goto_index(){
            this.$router.push({path:'/'});
        },
        shownav(){
            if(this.show_nav){
                this.navTrans.transform = "translateX(0)";
                setTimeout(() => {
                    this.show_nav = !this.show_nav;
                }, 200);
            }else{
                this.show_nav = !this.show_nav;
                setTimeout(() => {
                    this.navTrans.transform = "translateX(3rem)";
                },200)
            }
        }
    },
    computed:{
        ...mapState(['lanfalg',])
    }
}
</script>
<style lang="scss" scoped>
#header-box{
    height: 0.88rem;
	background-color: #fff;
    width: 100%;
    font-size:0.28rem;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    .menu{
        width: 0.4rem;
	    height: 0.4rem;
        margin-top: 0.21rem;
        float: left;
        margin-left: 0.24rem;
    }
    .logo{
        width: 2.59rem;
	    height: 0.44rem;
        margin-top: 0.22rem;
    }
    .nav-box{
        width: 100%;
        height: calc(100vh - 0.88rem);
        position: absolute;
        top: 0.88rem;
        left: 0;
        background: rgba($color: #000000, $alpha: 0.2);
        .nav-ul{
            position: absolute;
            top: 0;
            width: 3rem;
            background-color: #ffffff;
            height: 100%;
            left: -3rem;
            transition: all 0.5s;
            li{
                height: 1.01rem;
                box-sizing: border-box;
                padding-left: 0.5rem;
                border-bottom: 0.01rem solid #f2f2f2;
                text-align: left;
                font-size: 0.28rem;
                line-height: 1rem;
                color: #333;
                font-weight: 600;
                span{
                    display: inline-block;
                    width: 100%;
                }
            }
            li:last-of-type{
                color: $color;
                span{
                    background: url('../../static/image/exchange.png') no-repeat 1.12rem 0.4rem;
                    background-size: 0.2rem 0.2rem;
                }
            }
        }
    }
}
</style>

