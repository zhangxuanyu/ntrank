<template>
  <div class="social_box">
    <div class="twitter">
          <div>
              <span class="twitter_title">Twitter</span>
              <iframe src="https://tokenfly.io/ddd.html" frameborder="0" class="iframe" scrolling='yes'></iframe>
              <div>
                  <div class="twitter-share-button" id="container"></div>
                  
              </div>
          </div>
      </div>
      <div class="reddit">
          <div>
              <span class="twitter_title">Reddit</span>   
          </div>
          <div class="reddit_content">
              <div id="reddit"></div>
          </div>
      </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  created(){
       $.ajax({
        type:'get',
        url:'https://www.reddit.com/r/ethereum.embed',
        dataType: 'jsonp',
        data:{
            limit:15
        },
        success:function(res){
            $('#reddit').append(res)
        },
        fail:function(err){
            console.log(err)
        }
    })
  }
}
</script>
<style scoped>
.social_box{
    width: 1000px;
    overflow: hidden;
    height:814px;
}
.twitter,.reddit{
    width: 520px;
    margin-top: 40px;
    float: left;
}
.reddit{
    width: 440px;
}
.twitter{
    margin-right: 40px;
}
.reddit_content{
    width: 440px;
    height: 706px;
    overflow: scroll;
}
.reddit_content li{
    margin-bottom: 40px;
}
.reddit_word{
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
    font-size: 14px;
    color: #292929;
    line-height: 20px;
    margin-bottom: 11px;
}
.reddit_other{
    color: #8f8f8f;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;

}
::-webkit-scrollbar {display:none}
.twitter_title{
    display: block;
    color: black;
    margin-left: 10px;
    font-size: 20px;
    margin-bottom: 42px;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
}
.twitter_content{
    width: 520px;
    height: 706px;
    overflow: scroll;
}
.twitter_header{
    float: left;
    height: 100px;
    margin-left: 10px;
    margin-right: 10px;
}
.twitter_header img{
    width: 48px;
    height: 48px;
    border-radius: 50%;
}
.twitter_word{
    float: left;
    width: 450px;
}
.twitter_people{
    margin-bottom: 10px;
}
.twitter_word .twitter_people span{
    font-size: 14px;
    color: #8f8f8f;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
}
.twitter_word .twitter_people span:nth-of-type(1){
    font-size: 14px;
    color: #292929;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
    font-weight: 600;
}
.twitter_detail{
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: #292929;
}
.twitter_word img{
    max-width: 450px
}
.twitter_icon{
    margin-top: 20px;
    overflow: hidden;
    height: 18px;
    padding-bottom: 45px;
}
.twitter_icon div{
    float: left;
    margin-right: 53px;
    height: 16px;
    line-height: 16px;
}
.twitter_icon div img{
    width: 16px;
    height: 16px;
    vertical-align:middle;
    margin-right: 10px;
}
.twitter_icon div span{
    font-size: 12px;
    display: inline-block;
    height: 100%;
}
.iframe{
    width: 520px;
    height: 774px;
}
</style>
