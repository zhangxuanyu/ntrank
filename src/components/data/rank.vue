<template>
    <div class="rank_box">
        <p class="alltitle">
            <span class="title_tips">{{top_title[showType].title[0]}}</span>  
            <span class="title_type">
                <span v-if="top_title[showType].select.length >= 1" v-for="(item,index) in top_title[showType].select">
                    <span class="cur" :style="index == selected?{color:'#a376d4'}:{}" @click="change_select(index)">{{item[0]}}</span>
                    <span v-if="index != top_title[showType].select.length - 1" class="gap">|</span>
                </span>
            </span>
            
        </p>
        <table  width="100%" cellspacing='0' style="text-align: center;">
            <!-- 有分类 -->
                <tr class="top" v-if="top_title[showType].select">
                    <th  v-for="(item,index) in titlearr[showType]" class="title all" v-if="index != titlearr[showType].length - 1">{{item[0]}}</th>
                    <th  v-for="(item,index) in titlearr[showType]" class="title all" v-if="index == titlearr[showType].length - 1">{{item[selected][0]}}</th>
                </tr>
            <!-- 无分类 -->
                <tr class="top" v-else>
                    <th  v-for="(item,index) in titlearr[showType]" class="title all" >{{item[0]}}</th>
                </tr>
                <tr class="top pd" v-for="(item,index) in arr">
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{item}}</td>
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{item}}</td>
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{item}}</td>
                </tr>
        </table>
    </div>
</template>

<script>
import newfn from '../../../static/base/base.js'
export default {
    data(){
        return{
            top_title:[{
                title:['涨跌幅',''],
                type:0,
                select:[['涨幅榜',''],['跌幅榜','']]
            },{
                title:['交易量(24H)','']
            }],
            titlearr:[
                [['排名',''],['名称',''],['价格',''],[['涨幅',''],['跌幅','']]],
                [['排名',''],['名称',''],['交易量','']]
            ],
            arr:[11111,'namedd','5413165131'],
            subarr:[],
            // 选中标题
            selected:0,
            requestarr:['/tokenrank/tokenTrade.json','/tokenrank/tokenTrade.json'],
            requestdata:[
                {
                 "page_size":100,
                "sort_param":"market_value,-1"
                },{
                    "page_size":100,
                    "sort_param":"market_value,-1"
                }]
        }
    },
    props: ['showType'],
    created(){
            console.log(this.showType)
            this.request(this.requestarr[this.showType],this.requestdata[this.showType])
    },
    methods:{
        change_select(aa){
            this.selected = aa
        },
        request(url,argument){
            newfn.fornew(url,argument).then(function(data){
               console.log(data)
            })
        }
    }

}
</script>

<style scoped lang="scss">
table {
     table-layout:fixed;
     }
table td{
    white-space:nowrap;
    overflow:hidden; 
    text-overflow:ellipsis;
    } 
th{
    font-weight: 400;
}
.rank_box{
    
    padding: 0 20px 20px 20px;
    background-color: #fff;
    margin: 0 10px;
    border-radius: 5px;
    .alltitle{
        height: 55px;
        line-height: 55px;
        border-bottom: 1px solid #f0edf3;
        margin-bottom: 20px;
        .title_tips{
            float: left;
            font-size: 16px;
            color: $basecolor;
        }
        .title_type{
            float: right;
            font-size: 14px;
            color: $subcolor;
            .gap{
                padding: 0 11px;
                color: #e2e4ed;
            }
        }
    }
    
}
</style>

