<template>
    <div class="cont">
        <div class="card_flex">
            <div v-for="(item,index) in showarr" class="card_in">
                <my-rank :show-type='item.value' v-if="item.type == 'rank'"></my-rank>
                <my-chart :show-type='item.value' v-if="item.type == 'chart'"></my-chart>
            </div>
        </div>
        
        <div class="table_out">
            <p>TOP100</p>
            <table  width="100%" cellspacing='0' style="text-align: center;">
                <!-- 无分类 -->
                    <tr class="top">
                        <th  v-for="(item,index) in titlearr" class="title cur all" >{{item.name[0]}}</th>
                    </tr>
                    <tr class="top pd" v-for="(item,index) in arr">
                        <td class=" all">
                            {{item}}
                        </td>
                        <td class=" all cur" @click="gotodetail(index)">
                            <img src="../../static/icon-cn.png" alt="">
                            {{item}}
                        </td>
                        <td class=" all">{{addgap('111111111')}}</td>
                        <td class=" all">{{item}}</td>
                        <td class=" all">{{item}}</td>
                        <td class=" all" :style="item>0?{color:'#2f9e84'}:item==0?{}:{color:'#fd2e40'}">{{item}}</td>
                        <td class=" all">{{item}}</td>
                        <td class=" all">{{item}}</td>
                        <td class=" all" style="color:#fd2e40">{{item}}</td>
                        <td class=" all">{{item}}</td>
                    </tr>
            </table>
            <div class="outpage">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage3"
                    :page-size="100"
                    background
                    layout="prev, pager, next, jumper"
                    :total="1000" style="float: right;margin-top: 16px;margin-right:20px;">
                </el-pagination>

            </div>
        </div>
    </div>
</template>

<script>
import newfn from '../../static/base/base.js'
import myRank from '../components/data/rank.vue'
import myChart from '../components/data/chart.vue'
export default {
    components:{
                myRank,
                myChart
            },
    data(){
        return{
            date:'',
            // rank 和 chart 显示数组
            showarr:[{
                type:'rank',
                value:0
            },{
                type:'chart',
                value:0
            },{
                type:'rank',
                value:1
            }],
            arr:[11111,111,223,4444,4545,6574,324,53453,23424],
            titlearr:[
                {
                    name:['#','#'],
                    pic:['../../static/icon-normal.png','../../static/icon-down.png','../../static/icon-up.png']
                },{
                    name:['名称','name'],
                    pic:['../../static/icon-normal.png','../../static/icon-down.png','../../static/icon-up.png']
                },{
                    name:['价格/￥','price/$'],
                    pic:['../../static/icon-normal.png','../../static/icon-down.png','../../static/icon-up.png']
                },{
                    name:['市值/￥','market/$'],
                    pic:['../../static/icon-normal.png','../../static/icon-down.png','../../static/icon-up.png']
                },{
                    name:['交易量(24H)',''],
                    pic:['../../static/icon-normal.png','../../static/icon-down.png','../../static/icon-up.png']
                },{
                    name:['24H',''],
                    pic:['../../static/icon-normal.png','../../static/icon-down.png','../../static/icon-up.png']
                },{
                    name:['开发者',''],
                    pic:['../../static/icon-normal.png','../../static/icon-down.png','../../static/icon-up.png']
                },{
                    name:['社交媒体',''],
                    pic:['../../static/icon-normal.png','../../static/icon-down.png','../../static/icon-up.png']
                },{
                    name:['总分',''],
                    pic:['../../static/icon-normal.png','../../static/icon-down.png','../../static/icon-up.png']
                },{
                    name:['价格图(7D)',''],
                    pic:['../../static/icon-normal.png','../../static/icon-down.png','../../static/icon-up.png']
                }
            ],
            currentPage3:1
        }
    },
    created(){
        this.my('/tokenrank/tokenTrade.json',
            {
                "page_size":100,
                "sort_param":"market_value,-1"
            })
    },
    methods:{
        my(url,argument){
            newfn.fornew(url,argument).then(function(data){
                console.log(data)
            })
        },
        addgap(aa){
            return newfn.conversion(aa)
        },
        handleCurrentChange(){
            console.log(`当前页: ${this.currentPage3}`);
        },
        gotodetail(aa){
            this.$router.push({path:'/coindetail?id='+aa});
        }
    }
}
</script>


<style>
.el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: #775f9f;
}
.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
    background-color: #fff;
    border: 1px solid #dddee1;
}

</style>

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
    padding: 0;
}
.cont{
    padding-top: $alladtop;
    .card_flex{
        display: flex;
        justify-content:space-between;
        .card_in{
            width: 33.33%;
            min-width: 387px;
        }
    }
    .table_out{
        background-color: #fff;
        margin-top: 38px;
        p{
            text-align: left;
            padding-left: 20px;
            font-size: 14px;
            color: $basecolor;
            height: 47px;
            line-height: 47px;
            font-weight: 600;
        }
        .top{
            height: 56px;
            background-color: $bg;
            line-height: 56px;
            color: $color;
            .all:nth-of-type(1){
                width: 55px;
            }
            .all:nth-of-type(2){
                padding-left: 10px;
                text-align: left;
            }
            .all:nth-of-type(4),.all:nth-of-type(5),.all:nth-of-type(6),.all:nth-of-type(7),.all:nth-of-type(8){
                text-align: right;
                padding-right: 10px;
            }
        }
        .pd{
            height:$tableheight;
            line-height: $tableheight;
            color: $basecolor;
            background-color: #fff;
            border-bottom: 1px solid #e4e3e3;
            &:hover{
                background-color: $bg;
            }
            img{
                width: 25px;
                vertical-align: -6px;
            }
            
        }
        .outpage{
            height: 66px;
        }
    }
}
</style>

