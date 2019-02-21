<template>
    <div id="pro-box">
        <p class="title">以下是第一个基于 Steem 的博客平台应用Steemit的产品数据表现趋势。</p>
        <ul class="chart-box">
            <li>
                <div class="name">新用户</div>
                <div id="new-user-chart" class="chart"></div>
                <p>这份图表显示了在 Steemit 新注册的用户并且有多少用户是活跃的。可以看到有很多的帐号被创建了，但是从来没有被使用过。</p>
            </li>
            <li>
                 <div class="name">活跃人数</div>
                <div id="active-user-chart"  class="chart"></div>
                <p>这份图表显示了在 Steemit 这些数据表显示了最近30天内用户随着时间的活动情况；活跃用户指得是用户至少发表一篇帖子、评论一次或者点赞一次。</p>
            </li>
            <li>
                 <div class="name">总用户</div>
                <div id="all-user-chart"  class="chart"></div>
                <p>在这份图表里，橙色的线显示了注册帐号的总数。绿色显示了至少活跃一次的用户数。这些用户即使在后面不再使用帐号也会被统计进去。</p>
            </li>
            <li>
                 <div class="name">帖子和评论</div>
                <div id="comment-chart"  class="chart"></div>
                <p>图表显示了过去30天内整个区块链上的帖子和评论的演变情况。</p>
            </li>
            <li>
                <div class="name">点赞</div>
                <div id="praise-chart"  class="chart"></div>
                <p>图表显示了过去30天内整个区块链上助力（点赞）的发展情况。</p>
            </li>
            <li>
                 <div class="name">交易次数</div>
                <div id="deal-chart"  class="chart"></div>
                <p>图表显示了每天的交易数。我们可以了解到整个区块链上的活动。</p>
            </li>
            <li>
                 <div class="name">分类占比</div>
                <div id="class-chart"  class="chart"></div>
                <p>图表显示了一直以来在区块链上被使用最多次的标签。</p>
            </li>
        </ul>
         <!-- <p class="title">以下是 Steem 平台上 SP 总估值及持有分布情况。</p>
         <ul class="chart-box">
            <li style="height: 300px">
                <div id="total-chart" class="chart"></div>
            </li>
            <li style="height: 300px">
                <div id="area-chart" class="chart"></div>
            </li>
         </ul> -->
    </div>
</template>
<script>
import newfn from "../../static/base/base.js";
export default {
    data() {
        return {
            grid: {
                left: "0",
                right: "10",
                bottom: "30",
                top:'10',
                containLabel: true
            },
            active_data:{
                title: {
                    text: ''
                },
                grid: {
                    left: "0",
                    right: "10",
                    bottom: "45",
                    top:'10',
                    containLabel: true
                },
                color:['#f86a61','#7ad4e5','#8cc79f'],
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['活跃的策展人','活跃的作者','活跃的唯一用户'],
                    y:'bottom'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周ddd日'],
                },
                yAxis: {
                    type: 'value'
                },
                series:[
                    {
                        name:'活跃的策展人',
                        type:'line',
                        data:[120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230,210,120, 132, 101, 134, 90, 230,210]
                    },
                    {
                        name:'活跃的作者',
                        type:'line',
                        data:[220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name:'活跃的唯一用户',
                        type:'line',
                        data:[220, 182, 191, 234, 290, 330, 310]
                    }
                ]
            },
            all_user_data:{
                   title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                color:['#7ad4e5','#f86a61'],
                legend: {
                    data:['注册用户数','活跃用户(至少一次)'],
                    y:'bottom'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周ddd日'],
                },
                yAxis: {
                    type: 'value'
                },
                series:[
                    {
                        name:'注册用户数',
                        type:'line',
                        data:[120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230,210,120, 132, 101, 134, 90, 230,210]
                    },
                    {
                        name:'活跃用户(至少一次)',
                        type:'line',
                        data:[220, 182, 191, 234, 290, 330, 310]
                    }
                ]
            },
            praise_data:{
                   title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                color:['#7ad4e5'],
                legend: {
                    data:['点赞'],
                    y:'bottom'
                },
                grid: this.grid,
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周ddd日'],
                },
                yAxis: {
                    type: 'value'
                },
                series:[
                    {
                        name:'点赞',
                        type:'line',
                        data:[120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230,210,120, 132, 101, 134, 90, 230,210]
                    }
                ]
            },
            comment_data:{
                   title: {
                    text: ''
                },
                 color:['#7ad4e5','#f86a61'],

                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['文章','评论'],
                    y:'bottom'
                },
                grid: this.grid,
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周ddd日'],
                },
                yAxis: {
                    type: 'value'
                },
                series:[
                    {
                        name:'文章',
                        type:'line',
                        data:[120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230,210,120, 132, 101, 134, 90, 230,210]
                    },
                    {
                        name:'评论',
                        type:'line',
                        data:[220, 182, 191, 234, 290, 330, 310]
                    }
                ]
            },
            deal_data:{
                   title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                color:['#7ad4e5'],
                legend: {
                    data:['交易次数'],
                    y:'bottom'
                },
                grid: this.grid,
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周ddd日'],
                },
                yAxis: {
                    type: 'value'
                },
                series:[
                    {
                        name:'交易次数',
                        type:'line',
                        data:[120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230,210,120, 132, 101, 134, 90, 230,210]
                    }
                ]
            },
            total_data:{
                title: {
                    text: ''
                },
                color:['#7ad4e5'],
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['邮件营销'],
                    y:'bottom'
                },
                grid: this.grid,
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周ddd日'],
                },
                yAxis: {
                    type: 'value'
                },
                series:[
                    {
                        name:'邮件营销',
                        type:'line',
                        smooth: false,
                        areaStyle: {},
                        itemStyle: {                          
                            normal: {
                             
                                borderColor:'#5698D4',
                                // backgroundColor:'#A2CEE5'
                        }},
                        data:[120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230,210,120, 132, 101, 134, 90, 230,210]
                    },
                ]
            },
            area_data:{
                title : {
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'horizontal',
                    left: 'center',
                    top:30,
                    data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:335, name:'直接访问'},
                            {value:310, name:'邮件营销'},
                            {value:234, name:'联盟广告'},
                            {value:135, name:'视频广告'},
                            {value:1548, name:'搜索引擎'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
            class_data:{
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar'
                }]
            }

        };
    }, 
    mounted() {
         this.$ajax.get(this.host+'/tokenrank/V2/tendencyDataDay.json',{
                params: { size: 30 }
        })
        .then(res=>{
            console.log(res.data.data)
            let data = res.data.data;
            let  user_new_active_list = [];
            let  user_no_active_list = [];
            let  user_vote_list = [];
            let  user_pc_list = [];
            let  user_new_all_list = [];
            let  user_active_all_list = [];
            let  post_list = []; 
            let  comment_list = []; 
            let  vote_list = []; 
            this.$store.state.user_active_list=[];
            this.$store.state.transaction_list=[];
            this.$store.state.user_new_list=[];
            this.$store.state.data_time_list=[];
            data.forEach(item=>{
                //时间轴
                let y = item.data_time.slice(0,4)
                let m = item.data_time.slice(4,6)
                let d = item.data_time.slice(6,8)
                this.$store.state.data_time_list.unshift(m+'-'+d);
                //新用户  活跃用户 cnt_user_new_active  不活跃用户 cnt_user_new-cnt_user_new_active 
                let no_active_list  = item.cnt_user_new-item.cnt_user_new_active || 0;
                 this.$store.state.user_new_list.unshift(item.cnt_user_new);
                user_new_active_list.unshift(item.cnt_user_new_active);
                user_no_active_list.unshift(no_active_list);
                //活跃人数  活跃的策展人 cnt_user_vote   活跃的唯一用户 cnt_user_active   活跃的作者  cnt_user_pc
                user_vote_list.unshift(item.cnt_user_vote);
                this.$store.state.user_active_list.unshift(item.cnt_user_active);
                user_pc_list.unshift(item.cnt_user_pc);
                //总用户   到当天累积的总注册用户数 cnt_user_new_all  活跃用户数  cnt_user_active_all
                user_new_all_list.unshift(item.cnt_user_new_all);
                user_active_all_list.unshift(item.cnt_user_active_all);
                //帖子和评论   发帖的个数 cnt_post    评论的个数  cnt_comment
                post_list.unshift(item.cnt_post);
                comment_list.unshift(item.cnt_comment);
                //点赞  cnt_vote
                vote_list.unshift(item.cnt_vote);
                //交易次数  cnt_transaction
                this.$store.state.transaction_list.unshift(item.cnt_transaction);
            })
                this.active_data.xAxis.data = this.$store.state.data_time_list;
                this.active_data.series[0].data = user_vote_list;
                this.active_data.series[1].data = user_pc_list;
                this.active_data.series[2].data = this.$store.state.user_active_list;

                this.all_user_data.xAxis.data = this.$store.state.data_time_list;
                this.all_user_data.series[0].data = user_new_all_list;
                this.all_user_data.series[1].data = user_active_all_list;

                this.comment_data.xAxis.data = this.$store.state.data_time_list;
                this.comment_data.series[0].data = post_list;
                this.comment_data.series[1].data = comment_list;

                this.praise_data.xAxis.data = this.$store.state.data_time_list;
                this.praise_data.series[0].data = vote_list;

                this.deal_data.xAxis.data = this.$store.state.data_time_list;
                this.deal_data.series[0].data = this.$store.state.transaction_list;
                setTimeout(()=>{
                    this.all_user_data.grid = this.grid;
                    this.comment_data.grid = this.grid;
                    this.praise_data.grid = this.grid;
                    this.deal_data.grid = this.grid;
                    this.area_data.grid = this.grid;
                    this.draw_new_user(this.$store.state.data_time_list,user_new_active_list,user_no_active_list);
                    this.draw_user("active-user-chart",this.active_data);
                    this.draw_user("all-user-chart",this.all_user_data);  
                    this.draw_user("comment-chart",this.comment_data);
                    this.draw_user("praise-chart",this.praise_data);
                    this.draw_user("deal-chart",this.deal_data);
                    this.draw_user("area-chart",this.area_data);
                    this.draw_class()
                },1000)
        })

        this.$ajax.get(this.host+'/tokenrank/V2/tendencyCateTop.json',{
                params: { size: 100 }
        })
        .then(res=>{
                console.log(res.data.data)
                let data = res.data.data;
                let time = [];
                let list = [];

                data.forEach(item=>{
                    time.push(item.category)
                    list.push(item.cnt_post)
                })
                setTimeout(()=>{
                    this.draw_class(time,list)
                },1000)
        })
         newfn.fornew("get", "/tokenrank/V2/tokenKline.json", {
                    params: {
                        code: 'bitcoin',
                        days: 30,
                        dim: 1
                    }
                })
                .then(res => {
                    let d = res.data.data;
                    console.log(d)
                    let list =d.price_usd;
                    var time_list=[];
                    d.data_time.forEach(ele => {
                        let t = newfn.timeuse(ele / 1000, 1, [
                            "-",
                            "-",
                            " ",
                            ":",
                            ":"
                        ]);

                        time_list.push(t);
                    });
                    this.total_data.xAxis.data = time_list;
                    this.total_data.series[0].data = list;
                    console.log(this.total_data)
                    this.draw_user("total-chart",this.total_data);   
                })
    
    },
    methods: {
        draw_class(time,list){
            let echarts = require("echarts");
            
            let myChart = echarts.init(document.getElementById("class-chart"));
            let option = {
                color:['#7ad4e5'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                xAxis: {
                    type: 'category',
                    data: time
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: list,
                    type: 'bar'
                }],
                grid: {
                    left: "0",
                    right: "40",
                    bottom: "30",
                    top:'10',
                    containLabel: true
                },
            }
             myChart.setOption(option);
             setTimeout(function() {
              window.addEventListener("resize", function() {
                myChart.resize();
                }); 
            }, 200);

        },
        draw_new_user(time,new_active,no_active) {
            let echarts = require("echarts");
            
            let myChart = echarts.init(document.getElementById("new-user-chart"));
            let option = {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                color:['#f86a61','#7ad4e5'],
                legend: {
                    data: [
                        "不活跃用户",
                        "活跃用户",
                    ],
                     y: "bottom"
                },
                 grid: {
                    left: "0",
                    right: "40",
                    bottom: "30",
                    top:'10',
                    containLabel: true
                },
                xAxis: {
                    type: "category",
                    data: time
                },
                yAxis: {
                    type: "value"
                },
                series: [
                    {
                        name: "不活跃用户",
                        type: "bar",
                        stack: "总量",
                        label: {
                            normal: {
                                show: false,
                                position: "inside"
                            }
                        },
                        data: no_active
                    },
                    {
                        name: "活跃用户",
                        type: "bar",
                        stack: "总量",
                        label: {
                            normal: {
                                show: false,
                                position: "inside"
                            }
                        },
                        data: new_active
                    },
                ]
            };
            myChart.setOption(option);
             setTimeout(function() {
              window.addEventListener("resize", function() {
                myChart.resize();
                }); 
            }, 200);
        },
        draw_user(id,option){
            let echarts = require("echarts");
            let chartId = document.getElementById(id);
            let myChart = echarts.init(chartId);
            myChart.setOption(option);
            setTimeout(function() {
              window.addEventListener("resize", function() {
                myChart.resize();
                }); 
            }, 200);
        },
    },
}
</script>
<style lang="scss" scoped>
#pro-box {
    width: 100%;
    padding-left: 0.24rem;
    padding-right: 0.24rem;
    background: #fff;
    .title{
        color: $color;
        font-size: 0.24rem;
        line-height: 0.36rem;
        border-bottom: solid 1px #e5e5e5;
        text-align: left;
        letter-spacing: 0.01rem;
        padding-bottom: 0.2rem;
        padding-top: 0.2rem;
    }
    .chart-box{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li{
            text-align: left;
            width: 100%;
            .name{
                line-height: 0.76rem;
                font-weight: bolder;
                color: #303030;
                font-size: 0.28rem;
            }
            .chart{
                width: 100%;
                height: 3.6rem;
            }
            p{
                min-height: 0.64rem;
                background-color: #f2f2f2;
	            border-radius: 0.05rem;
                color: #999999;
                font-size: 0.16rem;
                box-sizing: border-box;
                padding: 0.12rem 0.24rem;
            }
        }
    }
}
</style>
