<template>
    <div class="rank_box">
        <p class="alltitle">
            <span class="title_tips">{{top_title[showType].title[$store.state.lanfalg-1]}}</span>  
            <span class="title_type">
                <span v-if="top_title[showType].select.length >= 1" v-for="(item,index) in top_title[showType].select">
                    <span class="cur" :style="index == selected?{color:'#a376d4'}:{}" @click="change_select(index)">{{item[$store.state.lanfalg-1]}}</span>
                    <span v-if="index != top_title[showType].select.length - 1" class="gap">|</span>
                </span>
            </span>
            
        </p>
        <table  width="100%" cellspacing='0' style="text-align: center;">
            <!-- 有分类 -->
                <tr class="top" v-if="top_title[showType].select">
                    <th  v-for="(item,index) in titlearr[showType]" class="title all" v-if="index != titlearr[showType].length - 1" :style="index == titlearr[showType].length - 2?{textAlign:'right'}:{}">{{item[$store.state.lanfalg-1]}}</th>
                    <th  v-for="(item,index) in titlearr[showType]" class="title all" v-if="index == titlearr[showType].length - 1" style="text-align:right">{{item[selected][$store.state.lanfalg-1]}}</th>
                </tr>
            <!-- 无分类 -->
                <tr class="top" v-else>
                    <th  v-for="(item,index) in titlearr[showType]" class="title all" :style="index == titlearr[showType].length - 1?{textAlign:'right'}:{}">{{item[$store.state.lanfalg-1]}}</th>
                </tr>
                <!-- 有分类 -->
                <tr class="top pd" v-for="(item,index) in arr" v-if="showType == 0">
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{index+1}}</td>
                    <td class="title all cur" style="textAlign:left;padding-left: 10%;" @click="gotodetail(item.code)">{{item.code}}</td>
                    <td class="title all" style="textAlign:right">{{$store.state.currency==2?(item.price_usd*$store.state.usd_cny).toFixed(6):item.price_usd.toFixed(6)}}</td>
                    <td class="title all" :style="item.change_quantity >= 0 ?{border:'none',textAlign:'right',color:'#2f9e84'}:{textAlign:'right',color:'#fd2e40'}">{{item.change_quantity.toFixed(2)}}%</td>
                </tr>
                <tr class="top pd" v-for="(item,index) in arr" v-if="showType == 1">
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{index+1}}</td>
                    <td class="title all cur" style="textAlign:left;padding-left: 10%;" @click="gotodetail(item.code)">{{item.short_name}}-{{item.code}}</td>
                    <td class="title all" style="textAlign:right">{{$store.state.currency==2?(item.volume_usd*$store.state.usd_cny).toFixed(0):item.volume_usd.toFixed(0)}}</td>
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
                title:['涨跌幅','applies'],
                select:[['涨幅榜','increase rank'],['跌幅榜','reduce rank']]
            },{
                title:['交易量(24H)','Volume(24H)']
            }],
            titlearr:[
                [['排名','rank'],['名称','name'],['价格','price'],[['涨幅','increase'],['跌幅','reduce']]],
                [['排名','rank'],['名称','name'],['交易量','volume']]
            ],
            arr:[11111,'namedd','5413165131'],
            subarr:[],
            // 选中标题
            selected:0,
            //涨跌幅排序模式
            type:-1,
            requestarr:['/tokenrank/V2/tokenTrade.json','/tokenrank/V2/tokenTrade.json'],
            requestdata:[
                {
                    "page_num":0,
                    "page_size":8,
                    "sort_field":"change_quantity",
                    "sort_type":-1,
                    "trade_list":0
                },{
                    "page_num":0,
                    "page_size":8,
                    "sort_field":"volume_usd",
                    "sort_type":-1,
                    "trade_list":0
                }]
        }
    },
    props: ['showType'],
    created(){
            console.log(this.showType)
            this.request()
    },
    methods:{
        change_select(aa){
            this.selected = aa
            this.request()
        },
        request(){
            if(this.showType == 0||this.showType == 1){
                if(this.selected == 0){
                    this.requestdata[0].sort_type = -1
                }else{
                    this.requestdata[0].sort_type = 1
                }
                newfn.fornew('get','/tokenrank/V2/tokenTrade.json',{params:this.requestdata[this.showType]}).then((data)=>{
                        console.log(data)
                        this.arr = data.data.data
                })
            }
        },
        gotodetail(aa){
            this.$router.push({path:'/coindetail?id='+aa});
        },
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
    min-height: 396px;
    padding: 0 20px 20px 20px;
    background-color: #fff;
    margin: 0 10px;
    border-radius: 5px;
    .alltitle{
        height: 55px;
        line-height: 55px;
        border-bottom: 1px solid #f0edf3;
        margin-bottom: 15px;
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
.title{
    line-height: 32px;
    font-size: 14px;
}
.top .title:nth-of-type(1){
    width: 35px;
    text-align: left;
    padding-right: 5px;
}
.pd .all:nth-of-type(1){
    color: #999;
}
</style>

