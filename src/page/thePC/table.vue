<template>
<div>
    <ul>
        <li class="table_header">
            <div>#</div>
            <div  v-if="$store.state.lanfalg" v-for="(item,index) in market_header" @click="sorting(index)" :data-flag='item.flag' @mouseenter="enter(index)" @mouseleave="leave(index)"  :style="item.span_style">
                <span>{{item.zh_name}}</span>           
                <img :src="arr[item.flag-1]" alt="" :style="item.img_style">
            </div>
            <div  v-if="!$store.state.lanfalg" v-for="(it,idx) in market_header" @click="sorting(idx)"  :data-flag='it.flag' @mouseenter="enter(idx)" @mouseleave="leave(idx)"  :style="it.span_style">
                <span>{{it.en_name}}</span>           
                <img :src="arr[it.flag-1]" alt=""  :style="it.img_style">
            </div>
        </li>
        <li class="table_li" v-for="(item,index) in list" v-if="index <= contrl && $store.state.currency == 2">
            <div>{{index+1}}</div>
            <div>
                <img :src="item.header" alt="">    
           </div>
            <div>{{item.trade_market}}</div>
            <div>{{item.trade_usd}}</div>
            <div>¥{{item.trade_zh}}</div>
            <div>¥{{item.price_zh}}</div>
            <div>{{item.trade_percentage}}</div>
            <div>{{item.update_time}}</div>
        </li>
        <li class="table_li" v-for="(item,index) in list" v-if="index <= contrl && $store.state.currency == 1">
            <div>{{index+1}}</div>
            <div>
                <img :src="item.header" alt="">    
           </div>
            <div>{{item.trade_market}}</div>
            <div>{{item.trade_usd}}</div>
            <div>${{item.trade_volumes}}</div>
            <div>${{item.price}}</div>
            <div>{{item.trade_percentage}}</div>
            <div>{{item.update_time == '最近' ? 'Recent' : (item.update_time.replace(/([^\u0000-\u00FF])+/g,'h later'))}}</div>
        </li>
    </ul>
    <div class="checkall" v-if="list.length > 20" @click="showall">
        <span v-if="$store.state.lanfalg && show">查看全部</span>
        <span v-if="!$store.state.lanfalg && show">View All</span>
    </div>
</div>
</template>
<script>
import axios from 'axios';
import $ from 'jquery'
export default {
    data(){
        return{
            //点击后按钮隐藏
            show:true,
            arr:[
                '../../../static/icon-normal.png','../../../static/icon-up.png','../../../static/icon-down.png'
            ],
           
            market_header:[
                {},
                {zh_name:'交易市场',en_name:'Markets',flag:1,span_style:{borderBottom:'0'}},
                {zh_name:'交易对(USD)',en_name:'Pair',flag:1,span_style:{borderBottom:'0'}},
                {zh_name:'交易量(24小时)',en_name:'Volume(24h)',flag:1,img_style:{display:'none'},span_style:{borderBottom:'0'}},
                {zh_name:'价格',en_name:'Price',flag:1,img_style:{display:'none'},span_style:{borderBottom:'0'}},
                {zh_name:'交易量(%)',en_name:'Volume(%)',flag:1,img_style:{display:'none'},span_style:{borderBottom:'0'}},
                {zh_name:'更新时间',en_name:'Updated',flag:1,img_style:{display:'none'},span_style:{borderBottom:'0'}},
            ],
            list: [{
                'header':'../../../static/22.png',
			    "trade_market": "BTC",
                "trade_usd": "	BTC/USD",
                "trade_volumes": "1938344047",
                "price": "57047.51",
                "trade_percentage": "0.0629",
			    "update_time": "1522628587"
	            },{
                'header':'../../../static/22.png',
			    "trade_market": "OKEx",
                "trade_usd": "	BTC/USDT",
                "trade_volumes": "1672858680",
                "price": "4996064",
                "trade_percentage": "0.0543",
			    "update_time": "1522200036"
            }],
            //控制显示数量
            contrl:19,
            //请求传值
            name:'',
            reverse:0
        }
    },
    props:{
      lanfalgz:true
  },
    created(){
        this.list.forEach(item=>{
            item.trade_volumes = this.conversion(item.trade_volumes);
            item.price = this.conversion(item.price);
            item.trade_percentage = item.trade_percentage*1000000000/10000000+'%';
            item.update_time =this.changetime(item.update_time*1)
        })

        let href = window.location.href;
        if(href.indexOf('?')>-1){
            console.log(window.location.href.split('?')[1].split('='||'&'))
            var code = window.location.href.split('?')[1].split('=')[0];
            var num = window.location.href.split('?')[1].split('=')[1];
            var num1 = num.replace(/(%[0-9]+)/, ' ')
            var num2 =  num.replace(/(%[0-9]+)/, '-')

            //请求数据
        // axios.post('https://blockchain.ldzldq.com/tokenrank/tokenMarket.json',{
        //     code: "Bitcoin"
        // },{
        //     headers: {'Content-Type': "application/x-www-form-urlencoded"}
        // }).then(res =>{
        //     console.log(res)
        //     if(0 == res.data.ret){
        //        this.list = res.data.info_list;
        //     }
        // },
        // err =>{
            
        // })
        var aa = {
            code:num2
        }
        aa = JSON.stringify(aa)
        $.ajax({
        type:'post',
        url:'http://service.tokenrank.net/tokenrank/tokenMarket.json',
        dataType: 'json',
        data:aa,
        success:(res) => {
            
            res.list.forEach(item=>{
            item.trade_zh =  this.conversion((Number(item.trade_volumes)*res.usd_cny).toFixed(2).toString())
            item.trade_volumes =  this.conversion(Number(item.trade_volumes).toFixed(2))
            item.price_zh =  this.conversion((Number(item.price)*res.usd_cny).toFixed(2))
            item.price =  this.conversion(Number(item.price).toFixed(2))
            item.trade_percentage = Number(item.trade_percentage).toFixed(2);
            item.update_time_h = -(item.update_time_h + item.rank*0.001)
        })
            this.list = res.list;
        },
        fail:(err) => {
            console.log(err)
        }
    })

        }
        
        
    },
    mounted(){
        console.log(this.lanfalgz)
    },
    methods:{
        //请求数据
        fornew(index){
            
            console.log(index)
        },
        //显示全部
        showall(){
            this.contrl = this.list.length - 1
            this.show = false
        },
        leave(index){
           
                if(index > 0){
                     if(this.market_header[index].flag == 1){
                         if(index>2){
                            this.market_header[index].img_style.display='none'
                        }
                        this.market_header[index].span_style.borderBottom = 'none'
                    }
            }
            
        },
        enter(index){
            if(index>0){
                if(index>2){
                    this.market_header[index].img_style.display='inline-block'
                }
                
                this.market_header[index].span_style.borderBottom =  2 + 'px' + ' ' + 'solid' + ' ' + '#3D5AFE'
            }
            
        },
        //排序方法
        rank(num,index){
            if(index == 3){
                var string = 'trade_volumes'
            }else if( index == 4){
                var string = 'price'
            }else if( index == 5){
                var string = 'trade_percentage'
            }else if( index == 6){
                var string = 'update_time_h'
            }
            if(1 == num ){
                //从小到大
                this.list.sort(function(a,b){
	                return  parseFloat(a[string].replace(/,/g,""))-parseFloat(b[string].replace(/,/g,""))
                })
            }else{
                //从大到小
                 this.list.sort(function(a,b){
	                return  parseFloat(b[string].replace(/,/g,""))-parseFloat(a[string].replace(/,/g,""))
                })
            }
            this.list = this.list
            console.log(this.list)
        },
        //点击排序
        sorting(index){
            let flag =  this.market_header[index].flag;
            this.market_header[3].flag = 1;
            this.market_header[4].flag = 1;
            this.market_header[5].flag = 1;
            this.market_header[6].flag = 1;
            this.market_header[1].span_style.borderBottom = 'none'
            this.market_header[2].span_style.borderBottom = 'none'
            this.market_header[3].span_style.borderBottom = 'none'
            this.market_header[4].span_style.borderBottom = 'none'
            this.market_header[5].span_style.borderBottom = 'none'
            this.market_header[6].span_style.borderBottom = 'none'
            this.market_header[3].img_style.display='none'
            this.market_header[4].img_style.display='none'
            this.market_header[5].img_style.display='none'
            this.market_header[6].img_style.display='none'
            this.market_header[index].img_style.display='inline-block'
            this.market_header[index].span_style.borderBottom =  2 + 'px' + ' ' + 'solid' + ' ' + 'black'
            switch(flag){
            /**
             * 1：无
             * 2：升序
             * 3：降序
             */
                case 1:
                    this.market_header[index].flag = 3;
                    // 做index的判断来确定传入的值
                    this.rank(-1,index)
                    break;
                case 2:
                    this.market_header[index].flag = 3;
                    this.rank(-1,index)
                    break;
                case 3:
                    this.market_header[index].flag = 2;
                    this.rank(1,index)
                    break;
            }
            //trade_volumes	交易量(24小时)
            //price	价格
            //trade_percentage	交易量(%)
            //update_time	更新时间

        },
        //数字字符串添加逗号
        conversion(str){
            if(/\./.test(str)){
                return str.replace(/\d(?=(\d{3})+\.)/g, "$&,").replace(/\d{3}(?![,.]|$)/g, "$&,");
            }else{
                return str.replace(/\d(?=(\d{3})+$)/g, "$&,");
            }
        },
        //时间戳转换成日期格式
        changetime(timestamp) {
        var timenow = new Date().getTime();
        if(timenow - timestamp<= 3600000){
            var min = Math.ceil((timenow - timestamp)/1000/60) + '分钟前';
            return min;
            //分钟
        }else if(timenow - timestamp<= 86400000){
            var hour = Math.ceil((timenow - timestamp)/1000/60/60) + '小时前';
            return hour;
            //小时
        }else{
            var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() + ' ';
            if(D<10){
                return Y+M+'0'+D;
            }else{
                return Y+M+D;
                
            }
        }
    }
    },
  
}
</script>
<style scoped>
ul{
    float: left;
    padding-bottom: 10px;
    margin-top: 29px;
    width: 1000px
}
    .table_header{
        width: 100%;
        float: left;
        height: 48px;
    }
    .table_header div{
        position: relative;
    }
    .table_header img{
        position: absolute;
        top: 17px;
        left: 9px;
    }
    .table_header div,.table_li div{
        float: left;
        height: 48px;
        text-align: right;
        line-height: 48px;
        font-size: 14px;
        font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
        color: #292929;
    }
    .table_header div:nth-of-type(5) img{
        left:17px;
    }
    .table_header div:nth-of-type(6) img{
        top: 18px;
        left:52px;
    }
    .table_header div:nth-of-type(8) img{
        left:12px;
    }
    .table_header div:nth-of-type(1),.table_li div:nth-of-type(1){
        width: 50px;
        text-align: center;
    }
    .table_header div:nth-of-type(2),.table_li div:nth-of-type(2){
        width:48px;
    }
    .table_li div img{
        width:20px;
        height: 20px;
        border-radius: 50%;
        margin: 14px;
    }
    .table_header div:nth-of-type(5),.table_header div:nth-of-type(6),.table_header div:nth-of-type(7),.table_header div:nth-of-type(8){
        cursor: pointer;
    }
    .table_header div:nth-of-type(3),.table_li div:nth-of-type(3){
        width:150px;
        text-align: left
    }
    .table_header div:nth-of-type(4),.table_li div:nth-of-type(4){
        width:101px;
    }
    .table_header div:nth-of-type(5),.table_li div:nth-of-type(5){
        width:131px;
        margin-left: 69px;
        margin-right: 52px;
    }
    .table_header div:nth-of-type(6),.table_li div:nth-of-type(6){
        width:100px;
    }
    .table_header div:nth-of-type(7),.table_li div:nth-of-type(7){
        width:92px;
        margin-left: 40px;
        margin-right: 59px;
    }
    .table_header div:nth-of-type(8),.table_li div:nth-of-type(8){
        width:88px;
    }
    .table_li{
        float: left;
        height: 59px;
    }
    .table_header div span{
        vertical-align: middle;
    }
    .table_header div img{
        vertical-align: middle;
        display: none
    }
    .checkall{
        width: 100%;
        height: 46px;
        text-align: center;
        line-height: 46px;
        font-size: 14px;
        color: rgb(54, 126, 201);
        float: left;
        cursor: pointer;
    }
    @media screen and (min-width: 1200px){
        ul{
            width: 1200px;
        }
        .table_header div:nth-of-type(1),.table_li div:nth-of-type(1){
        width: 70px;
        text-align: center;
    }
    .table_header div:nth-of-type(2),.table_li div:nth-of-type(2){
        width:68px;
    }
    .table_li div img{
        width:20px;
        height: 20px;
        border-radius: 50%;
        margin: 14px;
    }
    .table_header div:nth-of-type(4),.table_header div:nth-of-type(5),.table_header div:nth-of-type(6),.table_header div:nth-of-type(7){
        cursor: pointer;
        margin-left: 35px;
        margin-right: 45px;
    }
    .table_header div:nth-of-type(8){
         margin-left: 45px;
        margin-right: 35px;
    }
    .table_li div:nth-of-type(4),.table_li div:nth-of-type(5),.table_li div:nth-of-type(6),.table_li div:nth-of-type(7){
        margin-left: 35px;
        margin-right: 45px;
    }
    .table_li div:nth-of-type(8){
         margin-left: 45px;
        margin-right: 35px;
    }
    }
</style>

