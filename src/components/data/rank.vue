<template>
    <div class="rank_box">
        <p class="alltitle">
            <span class="title_tips">{{top_title[showType].title[$store.state.lanfalg]}}</span>  
            
            <span class="title_type">
                <span v-if="top_title[showType].select.length >= 1" v-for="(item,index) in top_title[showType].select" :key="index">
                    <span class="cur" :style="index == selected?{color:'#a376d4'}:{}" @click="change_select(index)">{{item[$store.state.lanfalg]}}</span>
                    <span v-if="index != top_title[showType].select.length - 1" class="gap">|</span>
                </span>
            </span>
            
        </p>
        <p class="title_line"></p>
        <table  width="100%" cellspacing='0' style="text-align: center;">
            <!-- 有分类 -->
                <tr class="top title_cls" v-if="top_title[showType].select">
                    <th  v-for="(item,index) in titlearr[showType]" class="title all" :key="index" v-if="index != titlearr[showType].length - 1" :style="index == titlearr[showType].length - 2?{textAlign:'right'}:{}">{{item[$store.state.lanfalg]}}</th>
                    <th  v-for="(item,index) in titlearr[showType]" class="title all" :key="index" v-if="index == titlearr[showType].length - 1" style="text-align:right">{{item[selected][$store.state.lanfalg]}}</th>
                </tr>
            <!-- 无分类 -->
                <tr class="top title_cls" v-else>
                    <th  v-for="(item,index) in titlearr[showType]" :key="index" class="title all" :style="index == titlearr[showType].length - 1?{textAlign:'right'}:{}">{{item[$store.state.lanfalg]}}</th>
                </tr>
                <!-- 有分类 -->
                <tr class="top pd" v-for="(item,index) in arr" :key="index" v-if="showType == 0">
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{index+1}}</td>
                    <td class="title all cur" style="textAlign:left;padding-left: 10%;" @click="gotodetail(item.code)">{{item.short_name}}</td>
                    <td class="title all" style="textAlign:right">{{item.price_usd?(item.price_usd>1?(item.price_usd*usd_cny[lanfalg]).toFixed(2):(item.price_usd*usd_cny[lanfalg]).toFixed(6)):'--'}}</td>
                    <td class="title all" :style="item.change_quantity >= 0 ?{border:'none',textAlign:'right',color:'#2f9e84'}:{textAlign:'right',color:'#fd2e40'}">{{isNaN(item.change_quantity)?'--':(100*item.change_quantity).toFixed(2)+'%'}}</td>
                </tr>
                <tr class="top pd" v-for="(item,index) in arr" :key="index" v-if="showType == 1">
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{index+1}}</td>
                    <td class="title all cur" style="textAlign:left;padding-left: 10%;" @click="gotodetail(item.code)" v-if="item['name_list']">{{item.short_name+"-"+item['name_list'][$store.state.lanfalg]}}</td>
                    <td class="title all" style="textAlign:right"  v-if="!isNaN(item.volume_usd)">{{addgap((item.volume_usd*usd_cny[lanfalg]).toFixed(0))}}</td>
                </tr>
        </table>
    </div>
</template>

<script>
import newfn from '../../../static/base/base.js'
import {mapState} from 'Vuex'
export default {
    data(){
        return{
            top_title:[{
                title:['涨跌幅(24H)','Change(24H)'],
                select:[['涨幅榜','Increase'],['跌幅榜','Decline']]
            },{
                title:['交易量(24H)','Volume(24H)']
            }],
            titlearr:[
                [['#','#'],['名称','Name'],['价格/￥','Price/$'],[['涨幅','Increase'],['跌幅','Reduce']]],
                [['#','#'],['名称','Name'],['交易量/￥','Volume/$']]
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
                    let list =  data.data.data;
                    list.forEach(element => {
                        element['name_list']=[element.name,element.en_name];
                    });
                     this.arr = list; 
                     console.log(list)
                })
            }
        },
        addgap(aa){
            return newfn.conversion(aa)
        },
        gotodetail(aa){
            this.$router.push({path:'/coindetail?id='+aa});
        },
    },
    computed:mapState(['usd_cny','lanfalg'])

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
    color: #999;
}
.rank_box{
    min-height: 360px;
    padding: 0 20px 10px 20px;
    background-color: #fff;
    border-radius: 5px;
    .alltitle{
        height: 54px;
        line-height: 54px;
        .title_tips{
            float: left;
            font-size: 14px;
            color: $basecolor;
            font-weight: 600;
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
        .title_line{
            height: 1px;
            width: 100%;
            background: #f2f2f2;
            margin-bottom: 10px;
        }
    
}
.title{
    line-height: 30px;
    font-size: 14px;
}
.top .title:nth-of-type(1){
    width: 35px;
    text-align: center;
    padding-right: 5px;
}
.pd .all:nth-of-type(1){
    color: #999;
}
.title_cls th:nth-of-type(2){
    padding-left: 10%;
    text-align: left
}

</style>

