<template>
  <div class="top">
      <div class="mdl">
            <div class="top_left cur" @click="gotodetail()">
                <img src="../../static/TokenRank.png">
            </div>

            <img :src="imgbox[language]||imgbox[$store.state.lanfalg]" alt="" class="thepic cur" >
            <el-select v-model="language" placeholder="English" @change="changeSelection" ref="select"  class="top_right cur" >                
                <el-option
                    v-for="(item,index) in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value" class="cur">
                    <img :src="imgbox[index]" style="height:25px;margin-top: 3px;float:right"><span style="font-size:12px;vertical-align: 7px;float:left">{{item.label}}</span>
                </el-option>
            </el-select>
            

            <div class="alltype">
                <div v-for="(item,index) in headluaguage" :key="index" class="type cur" @click="gotoother(index)" :style="index == black?{fontWeight:600,color:'#a376d4',borderBottom:'4px solid #a376d4'}:''">
                    {{item[$store.state.lanfalg]}}
                </div>
            </div>
            
        </div>
  </div>
</template>

<script>
import newfn from '../../static/base/base.js'
import {mapState} from 'Vuex';
export default {
  data(){
      return{
        headluaguage:'',
        //   显示变黑
        black:0,
        //语言
        language:'English',
        imgbox:['../../static/icon-cn.png','../../static/icon-en.png']
      }
  },
computed: {
        
    },
    watch:{
       language(n,o){
           this.$store.commit('changelang',n)
       },
       '$route'(to,from){
           let path = to.name;
           if(path.indexOf('coin') > -1){
                this.black = 0
           }else if(path.indexOf('data') > -1){
                this.black = 1
           }else if(path.indexOf('exchange') > -1){
               this.black = 1
           }else{
               this.black = 2
           }
       }
    },
created(){
    this.headluaguage = alllanguage.head
    this.options = alllanguage.head_options;
    console.log(this.$route)
     let path = this.$route.name;
    if(path.indexOf('coin') > -1){
        this.black = 0
    }else if(path.indexOf('data') > -1){
        this.black = 1
    }else if(path.indexOf('exchange') > -1){
        this.black = 1
    }else{
        this.black = 2
    }
},

  methods:{
    gotoother(aa){
     
        this.black = aa;
        switch(aa){
            case 0:
                this.$router.push({
                    path: '/'
                })
                break;
            case 1:
                this.$router.push({
                    path: '/exchange'
                })
                break;
            // case 2:
            //     break;
            default:
                this.$router.push({
                    path: '/trend'
                })
        }
        // else if(aa == 1){
        //     this.$router.push({
        //         path: '/data'
               
        //     })
        // }
        
    },
    nnf(aa){
        return newfn.conversion(aa)
    },
    changeSelection(){
        console.log(this.language)
    },
    gotodetail(){
        this.$router.push({path:'/'});
    },
  },
  
}
</script>

<style>
.mdl .el-input__inner{
    border: none;
    margin-top: 10px;
    width: 121px;
    background-color: rgba(0,0,0,0);
    opacity: 0;
}
.el-select-dropdown{
    top: 38px !important;
    border-radius: 5px !important;
}
.mdl .el-select-dropdown__list{
    background-color: #f5f6fa;
    
}
.mdl .el-icon-arrow-up:before{
    content:'';
}
.mdl .el-select .el-input .el-select__caret{
    color: #fff;
}
.el-select-dropdown  .popper__arrow{
    left: 100px !important;
}
</style>

<style scoped  lang="scss">
.top{
    width: 100%;
    height: 60px;
    background-color: #fff;
    text-align: center;
    padding: 0 50px;
    box-sizing: border-box;
    .mdl{
        margin: 0 auto;
        height: 60px;
        position: relative;
        .thepic{
            position: absolute;
            top: calc((60px - 25px) / 2);
            right: 0px;
            width: 25px;
            
        }
        .curdel{
            text-align: center;
            float: right;
            margin-left: 10px;
            width: 80px;
            height: 34px;
            border: 1px solid #ddd;
            font-size: 14px;
            color: #999;
            line-height: 34px;
            margin-top: 35px;
            &:hover{
                color: #000;
            }
        }
        .alltype{
            float: right;
            .type{
                float: left;
                margin: 0 20px;
                margin-top: 21px;
                font-size: 16px;
                color: $basecolor;
                @include headchange(138px,38px);
            }
        }
        .top_left{
            float: left;
            width: 237px;
            height: 60px;
            img{
                margin-top: 11px;
                width: 205px;
                height: 33px;
            }
        }
        .top_right{
            float: right;
            height: 25px;
            line-height: 25px;
            font-size: 12px;
        
        }
    }
    
}

</style>
