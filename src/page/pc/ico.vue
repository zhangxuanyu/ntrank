<template>
  <div>
      <div :style="!lanfalgz?aa:''">
        <div class="information_zh">
            <div class="information_title_zh">代币信息:</div>
                <ul class="dis_ul_name">
                    <li>
                        <span>简称<i></i></span><span>:</span>
                        <span>{{ico_info.short_name}}</span>
                    </li>
                    <li>
                        <span>名称<i></i></span><span>:</span>
                        <span>{{ico_info.name}}</span>
                    </li>
                    <li>
                        <span>是否增发<i></i></span> <span>:</span>
                        <span>{{ico_info.is_add?'是':'否'}}</span>
                    </li>
                    <li>
                        <span>法律形式<i></i></span> <span>:</span>
                        <span>{{ico_info.law}}</span>
                    </li>
                    <li>
                        <span>软顶<i></i></span><span>:</span>
                        <span>{{ico_info.soft_top?ico_info.soft_top:'暂无信息'}}</span>
                    </li>
                </ul>
                <ul class="dis_ul_pirce">
                    <li>
                        <span>众筹价格<i></i></span> <span>:</span>
                        <span>${{ico_info.crowd_funding_price}}</span>
                    </li>
                    <li>
                        <span>发行总量<i></i></span> <span>:</span>
                        <span>{{ico_info.release_amount}}BTM</span>
                    </li>
                    <li>
                        <span>类型<i></i></span><span>:</span>
                        <span>{{ico_info.type}}</span>
                    </li>
                    <li>
                        <span>众筹总量<i></i></span> <span>:</span>
                        <span>{{ico_info.funds_acount}}USD</span>
                    </li>
                    <li>
                        <span>硬顶<i></i></span><span>:</span>
                        <span>{{ico_info.hard_top?ico_info.hard_top:'暂无信息'}}</span>
                    </li>
                </ul>
                <ul class="dis_ul_area">
                    <li>
                        <span>平台<i></i></span><span>:</span>
                        <span>{{ico_info.flatform}}</span>
                    </li>
                    <li>
                        <span>国家<i></i></span><span>:</span>
                        <span>{{ico_info.country}}</span>
                    </li>
                    <li>
                        <span>众筹币种<i></i></span> <span>:</span>
                        <span><i v-for="(item,index) in ico_info.crowd_funding_coins" style="font-style: normal">{{item.coin_name}},</i></span>
                    </li>
                    <li>
                        <span>众筹金额<i></i></span> <span>:</span>
                        <span>{{ico_info.funds_amount}}USD</span>
                    </li>
                </ul>   
        </div>
        <div class="distribution_zh">
            <div class="distribution_title_zh">ICO分配</div>
            <div id="chart_ico"></div>
        </div>
      </div>
      <div :style="lanfalgz?aa:''">
          <div class="information_en">
              <div class="information_title_zh">Token Info:</div>
              <ul class="information_left">
                  <li>
                      <span>Symbol:</span>
                      <span>{{ico_info.short_name}}</span>
                  </li>
                  <li>
                      <span>Curency:</span>
                      <span>{{ico_info.name}}</span>
                  </li>
                  <li>
                      <span>Additional Issue :</span>
                      <span>{{ico_info.is_add?'YES':'NO'}}</span>
                  </li>
                  <li>
                      <span>Legal form :</span>
                      <span>{{ico_info.law}}</span>
                  </li>
                  <li>
                      <span>Soft Cap :</span>
                      <span>{{ico_info.soft_top?ico_info.soft_top:'no information'}}</span>
                  </li>
                  <li>
                      <span>Platform : </span>
                      <span>{{ico_info.flatform}}</span>
                  </li>
                  <li>
                      <span>Country : </span>
                      <span>{{ico_info.country}}</span>
                  </li>
              </ul>
              <ul class="information_right">
                  <li>
                      <span>ICO Price ：</span>
                      <span>${{ico_info.crowd_funding_price}}</span>
                  </li>
                  <li>
                      <span>Total Supply :</span>
                      <span>{{ico_info.release_amount}}BTM</span>
                  </li>
                  <li>
                      <span>Type : </span>
                      <span>{{ico_info.type}}</span>
                  </li>
                  <li>
                      <span>Raised Quantity : </span>
                      <span>{{ico_info.funds_acount}}USD</span>
                  </li>
                  <li>
                      <span>Hard Cap : </span>
                      <span>{{ico_info.hard_top?ico_info.hard_top:'no information'}}</span>
                  </li>
                  <li>
                      <span>Accepts </span>
                      <span><i v-for="(item,index) in ico_info.crowd_funding_coins.split(',')" style="font-style: normal">{{item.coin_name}},</i></span>
                  </li>
                  <li>
                      <span>Fundraising Goal : </span>
                      <span>{{ico_info.funds_amount}}USD</span>
                  </li>
              </ul>
          </div>
          <div class="distribution_zh">
            <div class="distribution_title_zh">Distribution</div>
            <div id="chart_icoen"></div>
        </div>
      </div>
  </div>
</template>
<script>
import echarts from "echarts";
import axios from 'axios';
export default {
    data(){
        return{
            //样式
            aa:{
                width:0,
                height:0,
                overflow:'hidden'
            },
            Foundation:'基金会',
            Crowdfunding:'众筹',
            Team:'团队',
            Community:'社区',
            Other:'其他',
            //监听中英文改变
            data_lanfalgz:true,
            ico_info: {
                "foundation": "0.20",
                "crowd_funding": "0.30",
                "team": "0.07",
                "community": "0.33",
                "other": "0.10",
                "short_name": "BTM",
                "crowd_funding_price": "0.0380",
                "crowd_funding_times": "11.57",
                "flatform": "New Blockchain",
                "name": "BYTOM",
                "release_amount": "2100000000",
                "country": "中国",
                "is_add": "1",
                "type": "New Blockchain",
                "crowd_funding_coins": "BTC,ETH",
                "law": "基金会",
                "funds_acount": "2290000",
                "funds_amount": "2290000",
                "soft_top": "",
                "hard_top": ""
            },
            // pai_list:[
            //         {value:0.20, name:'基金会   30%'},
            //         {value:0.30, name:'众筹    30%'},
            //         {value:0.07, name:'团队    7%'},
            //         {value:0.33, name:'社区    33%'},
            //         {value:0.10, name:'其他    10%'}
            //     ],
            // enpai_list:[
            //         {value:0.20, name:'Foundation   30%'},
            //         {value:0.30, name:'Crowdfunding    30%'},
            //         {value:0.07, name:'Team    7%'},
            //         {value:0.33, name:'Community    33%'},
            //         {value:0.10, name:'Other    10%'}
            // ],
        cutover:'zh'//中英文切换
        }
        
    },
    props:{
      lanfalgz:true
    },
    watch:{
      lanfalgz:{
            handler:function(val,oldval){  
           
            this.data_lanfalgz = val
            },  
            deep:true//对象内部的属性监听，也叫深度监听 
      }
  },
  methods:{
    drawico(seriesdata){
          console.log('切换执行canvas')
          console.log(this.pai_list)
         console.log(document.getElementById('chart_ico'))
             // 基于准备好的dom，初始化echarts实例
             
        var chart_ico = echarts.init(document.getElementById('chart_ico'))
        console.log(chart_ico)
        
        // 绘制图表
       
        var option={
           title : {
           x:'center'
        },
        //是否显示提示框组件
        tooltip : {
            trigger: 'item',
            formatter: "{b}"
        },
        //图例组件
        legend: {
        orient: 'vertical',//图例列表的布局朝向。
        left:0,//居左距离
        top:0,//居上距离
        // data: legenddata
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                label: {
                    normal: {
                        show: false,
                
                    },
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                center: [220, 65],//圆心的坐标
                data:seriesdata
            }
        ]
       }
       chart_ico.setOption(option);//true重绘
    },

    drawicoen(seriesdata){
          console.log('切换执行canvas')
          console.log(this.pai_list)
         console.log(document.getElementById('chart_icoen'))
             // 基于准备好的dom，初始化echarts实例
             
        var chart_icoen = echarts.init(document.getElementById('chart_icoen'))
        console.log(chart_icoen)
        
        // 绘制图表
       
        var option={
           title : {
           x:'center'
        },
        //是否显示提示框组件
        tooltip : {
            trigger: 'item',
            formatter: "{b}"
        },
        //图例组件
        legend: {
        orient: 'vertical',//图例列表的布局朝向。
        left:0,//居左距离
        top:0,//居上距离
        // data: legenddata
        },
        series: [
            {
                name:'访问',
                type:'pie',
                label: {
                    normal: {
                        show: false,
                
                    },
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                center: [220, 65],//圆心的坐标
                data:seriesdata
            }
        ]
       }
       chart_icoen.setOption(option);//true重绘
    },
   
  },
  mounted(){
       
        //获取ICO信息
        console.log('created')
        let href = window.location.href;
        if(href.indexOf('?')>-1){
            console.log(window.location.href.split('?')[1].split('='||'&'))
            var code = window.location.href.split('?')[1].split('=')[0];
            var num = window.location.href.split('?')[1].split('=')[1];
            var num1 = num.replace(/(%[0-9]+)/, ' ')
            var num2 =  num.replace(/(%[0-9]+)/, '-')
            console.log(num1)
            axios.post('https://blockchain.ldzldq.com/tokenrank/icoInfo.json',{
            "code": num1
            }).then(res =>{
                console.log(res)
            if(0 == res.data.ret){
                console.log(res)
                this.ico_info = res.data.info;
                // // this.pai_list = res.data.info.
                // this.pai_list.forEach(item => {
                //     item.name = item.name +'    '+item.value*1000000000/10000000 +'%'
                // })
                console.log(res.data.info.crowd_funding)

                this.pai_list = [
                    {value:parseInt(res.data.info.foundation)/100, name: this.Foundation +'   '+(res.data.info.foundation ?res.data.info.foundation:'--')},
                    {value:parseInt(res.data.info.crowd_funding)/100, name:this.Crowdfunding + '    '+(res.data.info.crowd_funding ?res.data.info.crowd_funding:'--')},
                    {value:parseInt(res.data.info.team)/100, name:this.Team +'    '+(res.data.info.team ?res.data.info.team:'--')},
                    {value:parseInt(res.data.info.community)/100, name:this.Community + '    '+(res.data.info.community ?res.data.info.community:'--')},
                    {value:parseInt(res.data.info.other)/100, name: this.Other +'   '+(res.data.info.other ?res.data.info.other:'--')}
                ]

                 this.enpai_list = [
                    {value:parseInt(res.data.info.foundation)/100, name: 'Foundation' +'   '+(res.data.info.foundation ?res.data.info.foundation:'--')},
                    {value:parseInt(res.data.info.crowd_funding)/100, name:'Crowdfunding' + '    '+(res.data.info.crowd_funding ?res.data.info.crowd_funding:'--')},
                    {value:parseInt(res.data.info.team)/100, name:'Team' +'    '+(res.data.info.team ?res.data.info.team:'--')},
                    {value:parseInt(res.data.info.community)/100, name:'Community' + '    '+(res.data.info.community ?res.data.info.community:'--')},
                    {value:parseInt(res.data.info.other)/100, name: 'Other' +'   '+(res.data.info.other ?res.data.info.other:'--')}
                ]
               
                this.drawico(this.pai_list)

                this.drawicoen(this.enpai_list)
                
            }else{
                 this.ico_info= {
                "foundation": "--",
                "crowd_funding": "--",
                "team": "--",
                "community": "--",
                "other": "--",
                "short_name": "--",
                "crowd_funding_price": "--",
                "crowd_funding_times": "--",
                "flatform": "--",
                "name": "--",
                "release_amount": "--",
                "country": "--",
                "is_add": "--",
                "type": "--",
                "crowd_funding_coins": "--,--",
                "law": "--",
                "funds_acount": "--",
                "funds_amount": "--",
                "soft_top": "",
                "hard_top": ""
            },
            this.pai_list=[
                    {value:'--', name: '基金会' +'   --'},
                    {value:'--', name: '众筹' + '    --'},
                    {value:'--', name: '团队'+'    --'},
                    {value:'--', name: '社区'+'    --'},
                    {value:'--', name: '其他'+'    --'}
                ]
            
            this.enpai_list=[
                    {value:'--', name: 'Foundation' +'   --'},
                    {value:'--', name: 'Crowdfunding' + '    --'},
                    {value:'--', name: 'Team'+'    --'},
                    {value:'--', name: 'Community'+'    --'},
                    {value:'--', name: 'Other'+'    --'}
                ]
                
        this.drawico(this.pai_list)

        this.drawicoen(this.enpai_list)
                
            }
        },
        err =>{
            console.log('错误')
        })

        }
        
        
  }
  
  
}
</script>
<style scoped>

.information_zh{
    width: 670px;
    height: 400px;
    float: left;
    background: #fff;
    box-sizing: border-box;
    margin-top: 40px;
    box-sizing:border-box;
    padding-left: 20px;
    
}
.information_title_zh{
    margin-bottom: 33px;
    font-size: 20px;
    color: black;
}
.information_zh ul{
    float: left;
}
.information_zh ul li span:nth-of-type(1){
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
    font-size: 14px;
    color: #8f8f8f;
    line-height: 32px;
    display: inline-block;
    width:70px;
    text-align: justify;
    height: 32px;
    float: left;
}
.information_zh ul li span:nth-of-type(2){
    color: #8f8f8f;
}
.information_zh ul li span:nth-of-type(1) i{
     display:inline-block;
  /*padding-left: 100%;*/
  width:100%;
}
.information_zh  .dis_ul_name  li span:nth-of-type(3){
    width: 114px;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
    font-size: 14px;
    color: #5c5c5c;
    line-height: 32px;
    display: inline-block
}
.information_zh .dis_ul_pirce  li span:nth-of-type(3){
    width: 142px;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
    font-size: 14px;
    color: #5c5c5c;
    line-height: 32px;
    display: inline-block
}
.information_zh  .dis_ul_area  li span:nth-of-type(3){
    width: 136px;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
    font-size: 14px;
    color: #5c5c5c;
    line-height: 32px;
    display: inline-block
}










.distribution_zh{
    width: 330px;
    float: left;
    margin-top: 40px;
}

.distribution_title_zh{
    font-size: 20px;
    color: black;
    width: 330px;
    margin-bottom: 33px;
}
.distribution{
    width: 100%;
    height: 150px;
    float: left;
    background: #fff;
    box-sizing: border-box;
    padding-left: 100px;
    padding-right: 100px;
    margin-top: 40px;
}

#chart_ico{
    height: 150px;
    width:100%;
    float: right
}
#chart_icoen{
    height: 150px;
    width:100%;
    float: right
}



.information_en{
    width: 670px;
    height: 400px;
    float: left;
    background: #fff;
    box-sizing: border-box;
    margin-top: 40px;
    box-sizing:border-box;
    padding-left: 20px;
}
.information_left{
    width: 320px;
    float: left;
    
}
.information_left li span:nth-of-type(1){
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
    font-size: 14px;
    color: #8f8f8f;
    line-height: 32px;

}
.information_left li span:nth-of-type(2){
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
    font-size: 14px;
    color: #5c5c5c;
    line-height: 32px;

}
.information_right{
    width: 330px;
    float: left;
    
}
.information_right li span:nth-of-type(1){
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
    font-size: 14px;
    color: #8f8f8f;
    line-height: 32px;

}
.information_right li span:nth-of-type(2){
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
    font-size: 14px;
    color: #5c5c5c;
    line-height: 32px;

}

</style>
