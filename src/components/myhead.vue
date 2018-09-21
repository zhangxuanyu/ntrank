<template>
  <div class="top">
      <div class="mdl">
            <div class="top_left cur">
                <img src="../../static/TokenRank.png">
            </div>

            <img :src="imgbox[language]||imgbox[0]" alt="" class="thepic cur" >
            <el-select v-model="language" placeholder="简体中文" @change="changeSelection" ref="select"  class="top_right cur" >
                
                <el-option
                    v-for="(item,index) in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value" class="cur">
                    <img :src="imgbox[index]" style="height:25px;margin-top: 3px;float:right"><span style="font-size:12px;vertical-align: 7px;float:left">{{item.label}}</span>
                </el-option>
            </el-select>
            

            <div class="alltype">
                <div v-for="(item,index) in headluaguage" class="type cur" @click="gotoother(index)" :style="index == black?{fontWeight:600,color:'#a376d4',borderBottom:'4px solid #a376d4'}:''">
                    {{item[0]}}
                </div>
            </div>
            
        </div>
  </div>
</template>

<script>
import newfn from '../../static/base/base.js'
export default {
  data(){
      return{
        headluaguage:'',
        //   显示变黑
        black:0,
        //语言
        language:'简体中文',
        imgbox:['../../static/icon-cn.png','../../static/icon-en.png']
      }
  },
computed: {
        
    },
    watch:{
       
    },
created(){
    this.headluaguage = alllanguage.head
    this.options = alllanguage.head_options
},

  methods:{
    gotoother(aa){
        this.black = aa
        if(aa == 0){
            this.$router.push({
                path: '/'
            })
        }else if(aa == 1){
            this.$router.push({
                path: '/data'
            })
        }else if(aa == 2){
            this.$router.push({
                path: '/exchange'
            })
        }
        
    },
    nnf(aa){
        return newfn.conversion(aa)
    },
    changeSelection(){
        console.log(this.language)
    }
  }
  
}
</script>

<style>
.mdl .el-input__inner{
    border: none;
    margin-top: 10px;
    width: 121px;
    background-color: rgba(0,0,0,0);
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
            top: 17px;
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
