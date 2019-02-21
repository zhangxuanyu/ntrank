<template>
    
  <div class="out" >
      <!-- 顶部广告位 -->
      <div class="top_advertis" v-if="top_advertising">
          <img :src="top_close" alt="" class="sst" @mouseenter="enter1()" @mouseleave='leave1()' @click="close1()">
          <img :src="top_advertising" alt="" @click="gotoTop_advertising">
      </div>
       <pc-loading v-show="$store.state.loadshow"></pc-loading>
      <div  v-show="!$store.state.loadshow" class="content">
          <!-- 翻页 -->
          <!-- <el-pagination
            background
            layout="prev, pager, next"
            :total="all" class="page_top" :page-size="thepage_size" :current-page.sync="thepage" @current-change="topchange">
            </el-pagination>
            <el-pagination
            background
            layout="prev, pager, next"
            :total="all" class="page_bottom" :page-size="thepage_size" :current-page.sync="thepage" @current-change="topchange">
            </el-pagination> -->
          <div class="content_top"  v-if="$store.state.lanfalg"> 
                    <!-- <span :class="{select:issocial}">社交指数 </span>
                    <span :class="{select:isgit}" @click="gotogit" >Github指数</span>   -->
          </div>
          <div class="content_top"  v-else>
              <!-- <span :class="{select:issocial}">The Social List  </span>
              <span :class="{select:isgit}" @click="gotogit" >The GitHub List</span> -->
          </div>
          <div class="top_tips">Top 100</div>
          <div class="content_middle">
              <!-- 中文表头 -->
              <div class="title" v-if="$store.state.lanfalg">
                  <ul>
                      <li class="first">#</li>
                      <li class="second">名称</li>
                      <li class="bk_one"></li>
                      <li class="read"  @click="redditseecl" :style="resb">
                    <!-- 转换汇率 -->
                      <div class="boxw">价格/<span v-if="$store.state.currency == 2">￥</span><span v-if="$store.state.currency == 1">$</span> <img :src="redditsee" alt="" :style="resi"></div>
                      <div class="tips price">
                          <img src="../../../static/black-block.png" alt="">
                          实时价格
                          
                      </div>
                      </li>
                      <li class="bk_two"></li>
                       <!-- 转换汇率 -->
                      <li class="marks" @click="markcl" :style="macb"><img :src="mark" alt="" :style="maci">市值/<span v-if="$store.state.currency == 2">￥</span><span v-if="$store.state.currency == 1">$</span>
                        <div class="tips mark">
                          <img src="../../../static/black-block.png" alt="">
                          由总供给量乘以价格得出
                      </div>
                      </li>
                      <li class="bk_thr"></li>
                      <li class="rread" @click="redditaccl" :style="reob"><img :src="redditac" alt="" :style="reoi"> 交易量(24h)
                        <div class="tips volum">
                          <img src="../../../static/black-block.png" alt="">
                          近24小时的总交易量
                        </div>
                      </li>
                      <li class="bk_fr"></li>
                      <li class="tfh" @click="telemancl" :style="tgpb"><img :src="teleman" alt="" :style="tgpi"> 24H
                        <div class="tips volum">
                          <img src="../../../static/black-block.png" alt="">
                         近24小时的价格跌涨情况
                        </div>
                      </li>
                      <li class="bk_fiv"></li>
                      <li class="tsee" @click="twitterseecl" :style="ttab"><div class="boxw"><img :src="twittersee" alt="" :style="ttai">开发者</div>
                        <div class="tips">
                          <img src="../../../static/black-block.png" alt="">
                          该币种的公共开发源代码库及GitHub社区活跃度概况，采集了Commits, Stars,Watchers等多个参数。
                      </div>
                      </li>
                      <li class="bk_sx"></li>
                      <li class="tart" @click="twitterupcl" :style="tttb"><img :src="twitterup" alt="" :style="ttti">社交媒体
                        <div class="tips">
                          <img src="../../../static/black-block.png" alt="">
                          该币种在社交媒体平台的关注人数，包括Twitter、Facebook、Reddit等平台。
                      </div>
                      </li>
                      <li class="bk_sv"></li>
                      <li class="fcsee" @click="faceseecl" :style="fbab"><img :src="facesee" alt="" :style="fbai">总分
                        <div class="tips">
                          <img src="../../../static/black-block.png" alt="">
                          总分 Total 该币种在市值、交易量、开发者及社交媒体等维度中的得分总和
                      </div>
                      </li>
                      <li class="bk_et"></li>
                      <li class="tman"> 价格图(7天)
                        <div class="tips pri">
                          <img src="../../../static/black-block.png" alt="">
                          近七日的价格变化情况
                        </div>
                      </li>
                  </ul>
              </div>
              <div class="title entitle" v-else>
                  <!-- 英文表头 -->
                  <ul>
                      <li class="first">#</li>
                      <li class="second">Name</li>
                      <li class="bk_one"></li>
                       <!-- 转换汇率 -->
                      <li class="enread"   @click="redditseecl"  :style="resb">Price/<span v-if="$store.state.currency == 2">￥</span><span v-if="$store.state.currency == 1">$</span> <img :src="redditsee" alt="" :style="resi">
                      <div class="tips price">
                          <img src="../../../static/black-block.png" alt="">
                          Current price
                          
                      </div>
                      </li>
                      <li class="bk_two"></li>
                       <!-- 转换汇率 -->
                      <li class="enmark" @click="markcl" :style="macb">Market Cap/<span v-if="$store.state.currency == 2">￥</span><span v-if="$store.state.currency == 1">$</span> <img :src="mark" alt="" :style="maci">
                        <div class="tips mark">
                          <img src="../../../static/black-block.png" alt="">
                          Total supply * price
                      </div>
                      </li>
                      <li class="bk_thr"></li>
                      <li class="enrread" @click="redditaccl" :style="reob">Volume(24h)<img :src="redditac" alt="" :style="reoi">
                        <div class="tips volum">
                          <img src="../../../static/black-block.png" alt="">
                          The total transaction value over the last 24h
                        </div>
                      </li>
                      <li class="bk_fr"></li>
                      <li class="entfh" @click="telemancl" :style="tgpb">24H<img :src="teleman" alt="" :style="tgpi"> 
                        <div class="tips volum">
                          <img src="../../../static/black-block.png" alt="">
                          Price change over the last 24h
                        </div>
                      </li>
                      <li class="bk_fiv"></li>
                      <li class="entsee" @click="twitterseecl" :style="ttab"><div class="boxwl">Developer</div><img :src="twittersee" alt="" :style="ttai">
                        <div class="tips">
                          <img src="../../../static/black-block.png" alt="">
                          An overview of development and GitHub activity for a coin. We are currently including Commits, Stars, Watchers, Forks, etc.
                       </div>
                      </li>
                      <li class="bk_sx"></li>
                      <li class="entart" @click="twitterupcl"  :style="tttb">Community<img :src="twitterup" alt="" :style="ttti">
                        <div class="tips">
                          <img src="../../../static/black-block.png" alt="">
                         Community size on social media（incl. Twitter, Facebook, Reddit, etc.)
                      </div>
                      </li>
                      <li class="bk_sv"></li>
                      <li class="enfcsee" @click="faceseecl"  :style="fbab">Total<img :src="facesee" alt=""  :style="fbai">
                        <div class="tips">
                          <img src="../../../static/black-block.png" alt="">
                         Total coin analysis score of MKT Cap, Vol, Developer, Social Media, etc. 
                      </div>
                      </li>
                      <li class="bk_et"></li>
                      <li class="entman">Price Graph (7d)
                        <div class="tips pri">
                          <img src="../../../static/black-block.png" alt="">
                          Price movement over the past 7 days
                        </div>
                      </li>
                  </ul>
              </div>
              <div class="data" v-for="(item,index) in arr">
                      <ul   v-if="$store.state.lanfalg ">
                          <!-- 中文数据 -->
                      <li class="first">{{index + 1 + (thepage - 1)*thepage_size}}</li>
                      <li @click="gotodetail(item.code)"  class="sec_first"> <img :src="item.icon" alt=""  class="pic"> </li>
                      <li @click="gotodetail(item.code)"  class="sec_sec"><p>{{item.symbol}}</p><span style="-webkit-box-orient: vertical">{{item.code}}</span> </li>
                      <!-- 转换汇率 -->
                      <li class="rg" v-if="$store.state.currency == 2"><p>{{item.price_cny}}</p> </li>
                      <li class="prs" v-if="$store.state.currency == 2">{{(item.zhmark)}}</li> 
                      <li class="rg"  v-if="$store.state.currency == 1"><p>{{item.price_usd}}</p> </li>
                      <li class="prs"  v-if="$store.state.currency == 1">{{(item.market_value)}}</li>
                      
                      <li class="rh">{{item.trade_volumes}}</li>
                      <li class="tg">
                           <span :style='parseFloat(item.change_quantity)>0?green:red'>{{item.change_quantity}}%</span>
                          </li>
                          <!-- 内容 -->
                      <li class="gitscore">{{item.github_score}}%
                          <div class="in_tips">
                              <img src="../../../static/white-block.png" alt="">
                              <div class="in_mdl">
                                   <div class="in_left">
                                       <p><svg class="octicon octicon-star" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true" fill="#8f8f8f"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path></svg>Star</p>
                                       <p><svg class="octicon octicon-repo-forked" viewBox="0 0 10 16" version="1.1" width="10" height="16" aria-hidden="true"  fill="#8f8f8f"><path fill-rule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>Fork</p>
                                       <p><svg class="octicon octicon-eye" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"  fill="#8f8f8f"><path fill-rule="evenodd" d="M8.06 2C3 2 0 8 0 8s3 6 8.06 6C13 14 16 8 16 8s-3-6-7.94-6zM8 12c-2.2 0-4-1.78-4-4 0-2.2 1.8-4 4-4 2.22 0 4 1.8 4 4 0 2.22-1.78 4-4 4zm2-4c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"></path></svg>Watch</p>
                                       <p><svg class="octicon octicon-history" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"  fill="#8f8f8f"><path fill-rule="evenodd" d="M8 13H6V6h5v2H8v5zM7 1C4.81 1 2.87 2.02 1.59 3.59L0 2v4h4L2.5 4.5C3.55 3.17 5.17 2.3 7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-.34.03-.67.09-1H.08C.03 7.33 0 7.66 0 8c0 3.86 3.14 7 7 7s7-3.14 7-7-3.14-7-7-7z"></path></svg>Commites</p>
                                       <p><svg class="octicon octicon-organization" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"  fill="#8f8f8f"><path fill-rule="evenodd" d="M16 12.999c0 .439-.45 1-1 1H7.995c-.539 0-.994-.447-.995-.999H1c-.54 0-1-.561-1-1 0-2.634 3-4 3-4s.229-.409 0-1c-.841-.621-1.058-.59-1-3 .058-2.419 1.367-3 2.5-3s2.442.58 2.5 3c.058 2.41-.159 2.379-1 3-.229.59 0 1 0 1s1.549.711 2.42 2.088C9.196 9.369 10 8.999 10 8.999s.229-.409 0-1c-.841-.62-1.058-.59-1-3 .058-2.419 1.367-3 2.5-3s2.437.581 2.495 3c.059 2.41-.158 2.38-1 3-.229.59 0 1 0 1s3.005 1.366 3.005 4"></path></svg>Contributors</p>
                                    </div>
                                    <div class="in_right">
                                        <p>{{item.github.star == -999 ? 0 : item.github.star}}</p>
                                        <p>{{item.github.fork == -999 ? 0 : item.github.fork}}</p>
                                        <p>{{item.github.watch == -999 ? 0 : item.github.watch}}</p>
                                        <p>{{item.github.commits == -999 ? 0 : item.github.commits}}</p>
                                        <p>{{item.github.contributors == -999 ? 0 : item.github.contributors}}</p>
                                    </div> 
                              </div>
                          </div>
                      </li>
                      <!-- <li class="gitscore">{{item.github_score}}</li> -->
                      
                      <li class="gitscore">{{item.society_score}}%
                          <div class="in_tips">
                              <img src="../../../static/white-block.png" alt="">
                              <div class="in_mdl">
                                   <div class="in_left">
                                        <p><img src="../../../static/media-reddit.png" alt="">Reddit</p>
                                        <p><img src="../../../static/media-twitter.png" alt="">Twitter</p>
                                        <p><img src="../../../static/media-telegram.png" alt="">Telegram</p>
                                        <p><img src="../../../static/media-facebook.png" alt="">Facebook</p>
                                   </div>
                                    <div class="in_right">
                                        <p>{{item.society.reddit_attention == -999 ? 0 : item.society.reddit_attention}}</p>
                                        <p>{{item.society.twitter_attention == -999 ? 0 : item.society.twitter_attention}}</p>
                                        <p>{{item.society.telegram_attention == -999 ? 0 : item.society.telegram_attention}}</p>
                                        <p>{{item.society.facebook_attention == -999 ? 0 : item.society.facebook_attention}}</p>
                                    </div> 
                              </div>
                              
                          </div>
                      </li>
                      <!-- <li class="gitscore">{{item.society_score}}</li> -->
                      <!-- <li class="ff">
                          99%
                      </li> -->
                      <!-- <li class="teg">{{item.total_score}}</li> -->
                      <li class="teg">{{item.total_score}}%</li>
                      <li class="tw">
                          <svg width="90" height="30" version="1.1"
                            xmlns="http://www.w3.org/2000/svg">

                        <polyline :points='item.seven_day_price'
                            style="fill:#A4D3EE;stroke:#3D5AFE;stroke-width:1"/>

                        </svg>
                      </li>
                  </ul>
                  <ul  v-if="!$store.state.lanfalg ">
                      <!-- 英文数据 -->
                      <li class="first">{{index + 1}}</li>
                      <li @click="gotodetail(item.code)"  class="sec_first"><img :src="item.icon" alt="" class="pic"></li>
                      <li @click="gotodetail(item.code)"  class="sec_sec"><p>{{item.symbol}}</p><span style="-webkit-box-orient: vertical">{{item.code}}</span> </li>
                      <!-- 汇率转换 -->
                      <li class="enrg" v-if="$store.state.currency == 1"><p>{{item.price_usd}}</p></li>
                      <li class="enprs" v-if="$store.state.currency == 1">{{item.market_value}}</li> 
                      <li class="enrg" v-if="$store.state.currency == 2"><p>{{item.price_cny}}</p></li>
                      <li class="enprs" v-if="$store.state.currency == 2">{{item.zhmark}}</li> 
                      <li class="enrh">{{item.trade_volumes}}</li>
                      <li class="entg">
                           <span :style='parseFloat(item.change_quantity)>0?green:red'>{{item.change_quantity}}%</span>
                          </li>
                     <li class="gitscore">{{item.github_score}}%
                          <div class="in_tips">
                              <img src="../../../static/white-block.png" alt="">
                              <div class="in_mdl">
                                   <div class="in_left">
                                       <p><svg class="octicon octicon-star" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true" fill="#8f8f8f"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path></svg>Star</p>
                                       <p><svg class="octicon octicon-repo-forked" viewBox="0 0 10 16" version="1.1" width="10" height="16" aria-hidden="true"  fill="#8f8f8f"><path fill-rule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>Fork</p>
                                       <p><svg class="octicon octicon-eye" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"  fill="#8f8f8f"><path fill-rule="evenodd" d="M8.06 2C3 2 0 8 0 8s3 6 8.06 6C13 14 16 8 16 8s-3-6-7.94-6zM8 12c-2.2 0-4-1.78-4-4 0-2.2 1.8-4 4-4 2.22 0 4 1.8 4 4 0 2.22-1.78 4-4 4zm2-4c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"></path></svg>Watch</p>
                                       <p><svg class="octicon octicon-history" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"  fill="#8f8f8f"><path fill-rule="evenodd" d="M8 13H6V6h5v2H8v5zM7 1C4.81 1 2.87 2.02 1.59 3.59L0 2v4h4L2.5 4.5C3.55 3.17 5.17 2.3 7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-.34.03-.67.09-1H.08C.03 7.33 0 7.66 0 8c0 3.86 3.14 7 7 7s7-3.14 7-7-3.14-7-7-7z"></path></svg>Commites</p>
                                       <p><svg class="octicon octicon-organization" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"  fill="#8f8f8f"><path fill-rule="evenodd" d="M16 12.999c0 .439-.45 1-1 1H7.995c-.539 0-.994-.447-.995-.999H1c-.54 0-1-.561-1-1 0-2.634 3-4 3-4s.229-.409 0-1c-.841-.621-1.058-.59-1-3 .058-2.419 1.367-3 2.5-3s2.442.58 2.5 3c.058 2.41-.159 2.379-1 3-.229.59 0 1 0 1s1.549.711 2.42 2.088C9.196 9.369 10 8.999 10 8.999s.229-.409 0-1c-.841-.62-1.058-.59-1-3 .058-2.419 1.367-3 2.5-3s2.437.581 2.495 3c.059 2.41-.158 2.38-1 3-.229.59 0 1 0 1s3.005 1.366 3.005 4"></path></svg>Contributors</p>
                                    </div>
                                    <div class="in_right">
                                        <p>{{item.github.star == -999 ? 0 : item.github.star}}</p>
                                        <p>{{item.github.fork == -999 ? 0 : item.github.fork}}</p>
                                        <p>{{item.github.watch == -999 ? 0 : item.github.watch}}</p>
                                        <p>{{item.github.commits == -999 ? 0 : item.github.commits}}</p>
                                        <p>{{item.github.contributors == -999 ? 0 : item.github.contributors}}</p>
                                    </div> 
                              </div>
                          </div>
                      </li>
                      <!-- <li class="gitscore">{{item.github_score}}</li> -->
                      
                       <li class="gitscore">{{item.society_score}}%
                          <div class="in_tips">
                              <img src="../../../static/white-block.png" alt="">
                              <div class="in_mdl">
                                   <div class="in_left">
                                        <p><img src="../../../static/media-reddit.png" alt="">Reddit</p>
                                        <p><img src="../../../static/media-twitter.png" alt="">Twitter</p>
                                        <p><img src="../../../static/media-telegram.png" alt="">Telegram</p>
                                        <p><img src="../../../static/media-facebook.png" alt="">Facebook</p>
                                   </div>
                                    <div class="in_right">
                                        <p>{{item.society.reddit_attention == -999 ? 0 : item.society.reddit_attention}}</p>
                                        <p>{{item.society.twitter_attention == -999 ? 0 : item.society.twitter_attention }}</p>
                                        <p>{{item.society.telegram_attention == -999 ? 0 : item.society.telegram_attention}}</p>
                                        <p>{{item.society.facebook_attention == -999 ? 0 : item.society.facebook_attention}}</p>
                                    </div> 
                              </div>
                              
                          </div>
                      </li>
                       <!-- <li class="gitscore">{{item.society_score}}</li> -->
                     
                      <li class="enteg">{{item.total_score}}%</li>
                      <!-- <li class="enteg">{{item.total_score}}</li> -->
                      <li class="entw">
                           <svg width="90" height="30" version="1.1"
                            xmlns="http://www.w3.org/2000/svg">

                        <polyline :points='item.seven_day_price'
                            style="fill:#A4D3EE;stroke:#3D5AFE;stroke-width:1"/>

                        </svg>
                      </li>
                  </ul>                 
              </div>
          </div>
      </div>
      <!-- 底部广告位 -->
      <div class="bot_advertis" v-if="bot_advertising">
          <img :src="bot_close" alt="" class="ssb" @mouseenter="enter2()" @mouseleave='leave2()' @click="close2()">
          <img :src="bot_advertising" alt="" @click="gotoBot_advertising">
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import pcLoading from './components/loading'
export default {
  components:{
    pcLoading
  },
  data(){
      return{
         
          //控制显示变化量颜色
          red:{
              color:"#F60016"
          },
          green:{
              color:'#57BD0D'
          },
          //底部广告位
          bot_advertising:'../../../static/ad-dolphin-03.png',
          bot_close:'../../../static/ads-close-01.svg',
          //顶部广告位
          top_close:'../../../static/ads-close-01.svg',
          top_advertising:'../../../static/ad-dolphin-03.png',
          //汇率
          used_cny:0,
          issocial:true,
          isgit:false,
          about:false,
          falg:true,
          //点击出底框
        //   第一个
          macb:{
              borderBottom: ''
            //   borderBottom:4 + 'px' + ' ' + 'solid' + ' ' + 'black'
          },
          maci:{
              display:''
          },
        //   第二个
          resb:{
              borderBottom: ''
          },
          resi:{
              display:''
          },
        //   第三个
          reob:{
              borderBottom: ''
          },
          reoi:{
              display:''
          },
        //   第四个
          ttab:{
              borderBottom: ''
          },
          ttai:{
              display:''
          },
        //   第五个
          tttb:{
              borderBottom: ''
          },
          ttti:{
              display:''
          },
        //   第六个
          fbab:{
              borderBottom: ''
          },
          fbai:{
              display:''
          },
        //   第七个
          tgpb:{
              borderBottom: ''
          },
          tgpi:{
              display:''
          },
          //请求参数
          thepage_size:100,
          thesort_param: "market_value,-1",
          all:0,
          //翻页
          thepage:1,
          //切换排序
          mark:'../../../static/icon-normal.png',
          redditsee:'../../../static/icon-normal.png',
          redditac:'../../../static/icon-normal.png',
          twittersee:'../../../static/icon-normal.png',
          twitterup:'../../../static/icon-normal.png',
          facesee:'../../../static/icon-normal.png',
          teleman:'../../../static/icon-normal.png',
          arr:[
           {
			"code": "",
                           "symbol": "",
                           '_score':[],
                        "price_cny": "",
                        "change_quantity": "",
                        "price_usd": "",
                        "market_value": "",
                        "trade_volumes": "",
		      "circulation_supply": "",
                         "price_chart": "",
                         "market_score": '',
                         "trade_volumes_score":'' ,
                         "society_score": '',
                         "github_score": '',
                         "total_score": '',
                         "seven_day_price":[],
                         "society":{"reddit_attention": "",
			"reddit_actives": "",
			"twitter_attention": "",
			"facebook_attention": "",
			"telegram_attention": "",
			"tweets": ""
                            
                           },
                         "github":{
                            "commits": "",
                            "branches": "",
			"releases": "",
			"contributors": "",
			"watch": "",
			"star": "",
			"fork": ""
                            
                         }

	},
            {
			"code": "",
                           "symbol": "",
                           '_score':[],
                        "price_cny": "",
                        "change_quantity": "",
                        "price_usd": "",
                        "market_value": "",
                        "trade_volumes": "",
		      "circulation_supply": "",
                         "price_chart": "",
                         "market_score": '',
                         "trade_volumes_score":'' ,
                         "society_score": '',
                         "github_score": '',
                         "total_score": '',
                         "seven_day_price":[],
                         "society":{"reddit_attention": "",
			"reddit_actives": "",
			"twitter_attention": "",
			"facebook_attention": "",
			"telegram_attention": "",
			"tweets": ""
                            
                           },
                         "github":{
                            "commits": "",
                            "branches": "",
			"releases": "",
			"contributors": "",
			"watch": "",
			"star": "",
			"fork": ""
                            
                         }

	},
           {
			"code": "",
                           "symbol": "",
                           '_score':[],
                        "price_cny": "",
                        "change_quantity": "",
                        "price_usd": "",
                        "market_value": "",
                        "trade_volumes": "",
		      "circulation_supply": "",
                         "price_chart": "",
                         "market_score": '',
                         "trade_volumes_score":'' ,
                         "society_score": '',
                         "github_score": '',
                         "total_score": '',
                         "seven_day_price":[],
                         "society":{"reddit_attention": "",
			"reddit_actives": "",
			"twitter_attention": "",
			"facebook_attention": "",
			"telegram_attention": "",
			"tweets": ""
                            
                           },
                         "github":{
                            "commits": "",
                            "branches": "",
			"releases": "",
			"contributors": "",
			"watch": "",
			"star": "",
			"fork": ""
                            
                         }

	}, {
			"code": "",
                           "symbol": "",
                           '_score':[],
                        "price_cny": "",
                        "change_quantity": "",
                        "price_usd": "",
                        "market_value": "",
                        "trade_volumes": "",
		      "circulation_supply": "",
                         "price_chart": "",
                         "market_score": '',
                         "trade_volumes_score":'' ,
                         "society_score": '',
                         "github_score": '',
                         "total_score": '',
                         "seven_day_price":[],
                         "society":{"reddit_attention": "",
			"reddit_actives": "",
			"twitter_attention": "",
			"facebook_attention": "",
			"telegram_attention": "",
			"tweets": ""
                            
                           },
                         "github":{
                            "commits": "",
                            "branches": "",
			"releases": "",
			"contributors": "",
			"watch": "",
			"star": "",
			"fork": ""
                            
                         }

	},
            {
			"code": "",
                           "symbol": "",
                           '_score':[],
                        "price_cny": "",
                        "change_quantity": "",
                        "price_usd": "",
                        "market_value": "",
                        "trade_volumes": "",
		      "circulation_supply": "",
                         "price_chart": "",
                         "market_score": '',
                         "trade_volumes_score":'' ,
                         "society_score": '',
                         "github_score": '',
                         "total_score": '',
                         "seven_day_price":[],
                         "society":{"reddit_attention": "",
			"reddit_actives": "",
			"twitter_attention": "",
			"facebook_attention": "",
			"telegram_attention": "",
			"tweets": ""
                            
                           },
                         "github":{
                            "commits": "",
                            "branches": "",
			"releases": "",
			"contributors": "",
			"watch": "",
			"star": "",
			"fork": ""
                            
                         }

	},
           {
			"code": "",
                           "symbol": "",
                           '_score':[],
                        "price_cny": "",
                        "change_quantity": "",
                        "price_usd": "",
                        "market_value": "",
                        "trade_volumes": "",
		      "circulation_supply": "",
                         "price_chart": "",
                         "market_score": '',
                         "trade_volumes_score":'' ,
                         "society_score": '',
                         "github_score": '',
                         "total_score": '',
                         "seven_day_price":[],
                         "society":{"reddit_attention": "",
			"reddit_actives": "",
			"twitter_attention": "",
			"facebook_attention": "",
			"telegram_attention": "",
			"tweets": ""
                            
                           },
                         "github":{
                            "commits": "",
                            "branches": "",
			"releases": "",
			"contributors": "",
			"watch": "",
			"star": "",
			"fork": ""
                            
                         }

	}
          ]
      }
  },
  props:{
      lanfalg:true
  },
  computed:{

  },
   beforeCreate(){
      console.log( (new Date()).valueOf())
      console.log(111111)
      console.log(this.arr)
  },
  created(){
    //   this.newcode(10,this.thepage_size)
    //   setTimeout(()=>{
    //       console.log(this.arr)
    //   },500)
      console.log( (new Date()).valueOf())
       axios.post('http://service.tokenrank.net/tokenrank/tokenTrade.json',{
            "page_num": this.thepage_num,
		    "page_size": 10,
            "sort_param": this.thesort_param 
        },{
            headers: {'Content-Type': "application/x-www-form-urlencoded"}
        }).then(response => {
            console.log(response)
            console.log( (new Date()).valueOf())
            console.log(response.data.usd_cny)
            response.data.info_list.forEach((element,index) => {
                //element['_score'] = this.score[index]['_score']
                var maxn = Math.max.apply(null, element['seven_day_price']);//最大值
                var minn = Math.min.apply(null, element['seven_day_price']);//最小值 
                var gap = maxn - minn//差值
                if(gap == 0){
                    element['seven_day_price'] = [[-1,30],[0,30],[90/7,30],[90/7*2,30],[90/7*3,30],[90/7*4,30],[90/7*5,30],[90/7*6,30],[90,30],[91,30],[92,30]]
                   
                }else{
                     element['seven_day_price'] = [[-1,30],[0,30-(element['seven_day_price'][0] - minn)/gap*30],[90/7,30-(element['seven_day_price'][0] - minn)/gap*30],[90/7*2,30-(element['seven_day_price'][1] - minn)/gap*30],[90/7*3,30-(element['seven_day_price'][2] - minn)/gap*30],[90/7*4,30-(element['seven_day_price'][3] - minn)/gap*30],[90/7*5,30-(element['seven_day_price'][4] - minn)/gap*30],[90/7*6,30-(element['seven_day_price'][5] - minn)/gap*30],[90,30-(element['seven_day_price'][6] - minn)/gap*30],[91,30-(element['seven_day_price'][6] - minn)/gap*30],[92,30]]
                }
                
                for (const key in element) {
                
                        if(typeof(element[key]) == 'number'){
                            if(key == 'market_value'){     
                                element['zhmark'] = parseFloat(element[key])*response.data.usd_cny
                                element['zhmark'] = this.conversion(element['zhmark'].toFixed(0)) 
                                element[key] = this.conversion(parseFloat(element[key]).toFixed(0))
                            }          
                            setTimeout(()=>{
                                
                                    element[key] = this.conversion(element[key].toString())
                                                             
                            },10)                                      
                        }
                    
                    
                }
            });
            // response.data.info_list
            setTimeout(()=>{
                this.used_cny = response.data.used_cny
                this.arr = response.data.info_list
                this.all =  response.data.total_count
                console.log(this.arr)
                console.log(this.$store.state.loadshow)
                this.$store.state.loadshow = false
                console.log( (new Date()).valueOf())
                 axios.post('http://service.tokenrank.net/tokenrank/tokenTrade.json',{
            "page_num": this.thepage_num,
		    "page_size": this.thepage_size,
            "sort_param": this.thesort_param 
        },{
            headers: {'Content-Type': "application/x-www-form-urlencoded"}
        }).then(res => {
             console.log(res)
            res.data.info_list.forEach((e,index) => {
                //e['_score'] = this.score[index]['_score']
               
                var maxnn = Math.max.apply(null, e['seven_day_price']);//最大值
                var minnn = Math.min.apply(null, e['seven_day_price']);//最小值 
                var gapn = maxnn - minnn//差值
                if(gapn == 0){
                    e['seven_day_price'] = [[-1,30],[0,30],[90/7,30],[90/7*2,30],[90/7*3,30],[90/7*4,30],[90/7*5,30],[90/7*6,30],[90,30],[91,30],[92,30]]
                   
                }else{
                     e['seven_day_price'] = [[-1,30],[0,30-(e['seven_day_price'][0] - minnn)/gapn*30],[90/7,30-(e['seven_day_price'][0] - minnn)/gapn*30],[90/7*2,30-(e['seven_day_price'][1] - minnn)/gapn*30],[90/7*3,30-(e['seven_day_price'][2] - minnn)/gapn*30],[90/7*4,30-(e['seven_day_price'][3] - minnn)/gapn*30],[90/7*5,30-(e['seven_day_price'][4] - minnn)/gapn*30],[90/7*6,30-(e['seven_day_price'][5] - minnn)/gapn*30],[90,30-(e['seven_day_price'][6] - minnn)/gapn*30],[91,30-(e['seven_day_price'][6] - minnn)/gapn*30],[92,30]]
                }
                
                for (const key in e) {
                
                        if(typeof(e[key]) == 'number'){
                            
                            if(key == 'market_value'){     
                                e['zhmark'] = parseFloat(e[key])*res.data.usd_cny
                                e['zhmark'] = this.conversion(e['zhmark'].toFixed(0)) 
                                e[key] = this.conversion(parseFloat(e[key]).toFixed(0))
                            }          
                            setTimeout(()=>{
                                
                                    e[key] = this.conversion(e[key].toString())
                                                             
                            },10)                                      
                        }
                    
                    
                }
            });
            setTimeout(()=>{
                this.used_cny = res.data.used_cny
                this.arr = res.data.info_list
                this.all =  res.data.total_count
            },20)
        })
            },20)
           
            // success callback
        }, response => {
            console.log('错误')
            // error callback
        })
       
  },
   mounted(){
          this.about = false
          this.$emit('upup',this.about);
          setTimeout(() => {
              window.scrollTo(0,0)
          }, 0);
          console.log(this.lanfalg)
          
      },
      destroyed(){
          this.$store.state.loadshow = true
      },
      watch:{
      thepage:{
          handler:function(val,oldval){  
                    this.thepage = val
                    console.log(val)  
                //    this.newcode(10,this.thepage_size)
                this.fornew()
                },  
                deep:true//对象内部的属性监听，也叫深度监听 
      }
  },
  methods:{
       //排序方法
        rank(num,string){
            if(1 == num ){
        //         //从小到大
                this.arr.sort(function(a,b){
	                return  parseFloat(a[string].replace(/,/g,""))*10-parseFloat(b[string].replace(/,/g,""))*10
                })
            }else{
        //         //从大到小
                 this.arr.sort(function(a,b){
	                return  parseFloat(b[string].replace(/,/g,""))*10-parseFloat(a[string].replace(/,/g,""))*10
                })
            }
              
        },
         rankdel(num,string,index){
            if(1 == num ){
                //从小到大
                this.arr.sort(function(a,b){
                    console.log(parseFloat(a[string][index]))
                    console.log(parseFloat(b[string][index]))
	                return  parseFloat(a[string][index])*10-parseFloat(b[string][index])*10
                })
            }else{
                //从大到小
                 this.arr.sort(function(a,b){
                     console.log(parseFloat(a[string][index]))
                    console.log(parseFloat(b[string][index]))
	                return  parseFloat(b[string][index])*10-parseFloat(a[string][index])*10
                })
            }
            this.arr = this.arr
            console.log(this.arr)
        },
      enter1(){
          this.top_close = '../../../static/ads-close-02.svg'
      },
      leave1(){
          this.top_close = '../../../static/ads-close-01.svg'
      },
    close1(){
        this.top_advertising = ''
    },
    enter2(){
          this.bot_close = '../../../static/ads-close-02.svg'
      },
      leave2(){
          this.bot_close = '../../../static/ads-close-01.svg'
      },
    close2(){
        this.bot_advertising = ''
    },
      //底部广告位跳转
      gotoBot_advertising(){
           window.open('http://cn.dolphin.com')
      },
      //顶部广告位跳转
      gotoTop_advertising(){
          window.open('http://cn.dolphin.com')
      },
            //数字字符串添加逗号
        conversion(str){
            if(/\./.test(str)){
                return str.replace(/\d(?=(\d{3})+\.)/g, "$&,").replace(/\d{3}(?![,.]|$)/g, "$&,");
            }else{
                return str.replace(/\d(?=(\d{3})+$)/g, "$&,");
            }
        },
      //清空点击底部边框
      empty(){
           //   第一个
          this.macb={
              borderBottom: ''
            //   borderBottom:4 + 'px' + ' ' + 'solid' + ' ' + 'black'
          }
          this.maci={
              display:''
          }
        //   第二个
          this.resb={
              borderBottom: ''
          }
          this.resi={
              display:''
          }
        //   第三个
          this.reob={
              borderBottom: ''
          }
          this.reoi={
              display:''
          }
        //   第四个
          this.ttab={
              borderBottom: ''
          }
          this.ttai={
              display:''
          }
        //   第五个
          this.tttb={
              borderBottom: ''
          }
          this.ttti={
              display:''
          }
        //   第六个
          this.fbab={
              borderBottom: ''
          }
          this.fbai={
              display:''
          }
        //   第七个
          this.tgpb={
              borderBottom: ''
          }
          this.tgpi={
              display:''
          }
      },
      gotogit:function(){
          this.$router.replace({
               path:'/pcgitrank',
               component:'Pcgitrank'
          })
      },
     gotodetail:function(e){
         console.log(e)
          this.$router.push({
                 path:'/pctoken' ,
                query:{
                    token:e
                    
                }
          })
     },
     //翻页
     topchange(e){
         console.log(111111)
         this.thepage = e
     },
     //优化请求数据
     newcode(onesize,pagesize){
         this.arr = []
         for(let i = 0;i<(pagesize/onesize);i++){
             axios.post('http://service.tokenrank.net/tokenrank/tokenTrade.json',{
            "page_num": (this.thepage - 1)*(pagesize/onesize) + i + 1,
		    "page_size": onesize,
            "sort_param": this.thesort_param 
        },{
            headers: {'Content-Type': "application/x-www-form-urlencoded"}
        }).then(response => {
            console.log(response)
            response.data.info_list.forEach((element,index) => {
               for (const key in element) {
                     element['_score'] = this.score[index]
                    if(element[key] == -999){
                        
                        element[key] = '-'
                    }else{
                        if(typeof(element[key]) == 'number'){
                            if(key == 'market_value'){     
                                element['zhmark'] = element[key]*response.data.usd_cny
                                element['zhmark'] = this.conversion(element['zhmark'].toFixed(2)) 
                            }          
                            setTimeout(()=>{
                                
                                    element[key] = this.conversion(element[key].toString())
                                                             
                            },100)                                      
                        }
                    }
                    
                }
            });
            this.used_cny = response.data.used_cny
            this.arr.push(...response.data.info_list)
            this.all =  response.data.total_count
            // success callback
        }, response => {
            console.log('错误')
            // error callback
        })
         }
     },
     //请求数据
     fornew(){  
         axios.post('http://service.tokenrank.net/tokenrank/tokenTrade.json',{
            "page_num": this.thepage - 1,
		    "page_size": this.thepage_size,
            "sort_param": this.thesort_param 
        },{
            headers: {'Content-Type': "application/x-www-form-urlencoded"}
        }).then(response => {
            console.log(response)
            response.data.info_list.forEach((element,index) => {
               for (const key in element) {
                     element['_score'] = this.score[index]
                    if(element[key] == -999){
                        
                        element[key] = '-'
                    }else{
                        if(typeof(element[key]) == 'number'){
                            if(key == 'market_value'){     
                                element['zhmark'] = element[key]*response.data.usd_cny
                                element['zhmark'] = this.conversion(element['zhmark'].toFixed(2)) 
                            }          
                            setTimeout(()=>{
                                
                                    element[key] = this.conversion(element[key].toString())
                                                             
                            },100)                                      
                        }
                    }
                    
                }
            });
            this.arr = response.data.info_list
            this.all =  response.data.total_count
            // success callback
        }, response => {
            console.log('错误')
            // error callback
        })
     },
     //切换排行
    markcl(){
        console.log(this.arr)
        this.empty()
        if(this.mark == '../../../static/icon-up.png' || this.mark == '../../../static/icon-normal.png'){
             this.mark = '../../../static/icon-down.png'
             this.thesort_param = "market_value,-1"
             this.rank(-1,'market_value')
         }else{ 
              this.mark = '../../../static/icon-up.png'
             this.thesort_param = "market_value,1"
             this.rank(1,'market_value')
            
         }
          this.thepage = 1
          this.teleman = '../../../static/icon-normal.png'
          this.redditsee = '../../../static/icon-normal.png'
          this.redditac='../../../static/icon-normal.png'
          this.twittersee='../../../static/icon-normal.png'
          this.twitterup='../../../static/icon-normal.png'
          this.facesee='../../../static/icon-normal.png'
          this.macb.borderBottom = 2 + 'px' + ' ' + 'solid' + ' ' + 'black'
          this.maci.display = 'inline-block'
        //   this.topchange(1)
        //  this.newcode(10,this.thepage_size)
        // this.fornew()
          
    },
    redditseecl(){
       
        this.empty()
        if(this.redditsee == '../../../static/icon-up.png' || this.redditsee == '../../../static/icon-normal.png'){
             this.redditsee = '../../../static/icon-down.png'
             this.thesort_param = "reddit_attention,-1"
              this.rank(-1,'price_usd')
         }else{
             this.redditsee = '../../../static/icon-up.png'
             this.thesort_param = "reddit_attention,1"
              this.rank(1,'price_usd')
             
         }
          this.thepage = 1
          this.mark='../../../static/icon-normal.png'
          this.redditac='../../../static/icon-normal.png'
          this.twittersee='../../../static/icon-normal.png'
          this.twitterup='../../../static/icon-normal.png'
          this.facesee='../../../static/icon-normal.png'
          this.teleman='../../../static/icon-normal.png'
          this.resb.borderBottom = 2 + 'px' + ' ' + 'solid' + ' ' + 'black'
          this.resi.display = 'inline-block'
        //   this.fornew()
       
         
    },
    redditaccl(){
        this.empty()
        if(this.redditac == '../../../static/icon-up.png' || this.redditac == '../../../static/icon-normal.png'){
            this.redditac = '../../../static/icon-down.png'
             this.thesort_param = "trade_volumes ,-1"
              this.rank(-1,'trade_volumes')
             
         }else{
             this.redditac = '../../../static/icon-up.png'
             this.thesort_param = "trade_volumes ,1"
              this.rank(1,'trade_volumes')
             
         }
          this.thepage = 1
         this.mark='../../../static/icon-normal.png'
         this.teleman = '../../../static/icon-normal.png'
          this.redditsee = '../../../static/icon-normal.png'
          this.twittersee='../../../static/icon-normal.png'
          this.twitterup='../../../static/icon-normal.png'
          this.facesee='../../../static/icon-normal.png'
          this.reob.borderBottom = 2 + 'px' + ' ' + 'solid' + ' ' + 'black'
          this.reoi.display = 'inline-block'
        //  this.newcode(10,this.thepage_size)
        // this.fornew()
          
    },
    twitterseecl(){
        this.empty()
        if(this.twittersee == '../../../static/icon-up.png' || this.twittersee == '../../../static/icon-normal.png'){
             this.twittersee = '../../../static/icon-down.png'
             this.thesort_param = "github_score ,-1"
              this.rank(-1,'github_score')
         }else{
             this.twittersee = '../../../static/icon-up.png'
             this.thesort_param = "github_score ,1"
             this.rank(1,'github_score')
             
         }
          this.thepage = 1
          this.mark='../../../static/icon-normal.png'
          this.teleman = '../../../static/icon-normal.png'
           this.redditsee = '../../../static/icon-normal.png'
          this.redditac='../../../static/icon-normal.png'
          this.twitterup='../../../static/icon-normal.png'
          this.facesee='../../../static/icon-normal.png'
          this.ttab.borderBottom = 2 + 'px' + ' ' + 'solid' + ' ' + 'black'
          this.ttai.display = 'inline-block'
        //   this.fornew()
          
    },
    twitterupcl(){
        this.empty()
        if(this.twitterup == '../../../static/icon-up.png' || this.twitterup == '../../../static/icon-normal.png'){
             this.twitterup = '../../../static/icon-down.png'
              this.thesort_param = "society_score ,-1"
              this.rank(-1,'society_score')
         }else{
             this.twitterup = '../../../static/icon-up.png'
              this.thesort_param = "society_score ,1"
             this.rank(1,'society_score')
             
         }
          this.thepage = 1
          this.mark='../../../static/icon-normal.png'
          this.teleman = '../../../static/icon-normal.png'
           this.redditsee = '../../../static/icon-normal.png'
          this.redditac='../../../static/icon-normal.png'
          this.twittersee='../../../static/icon-normal.png'
          this.facesee='../../../static/icon-normal.png'
          this.tttb.borderBottom = 2 + 'px' + ' ' + 'solid' + ' ' + 'black'
          this.ttti.display = 'inline-block'
        //   this.newcode(10,this.thepage_size)
        // this.fornew()
          
    },
    faceseecl(){
        this.empty()
        if(this.facesee == '../../../static/icon-up.png' || this.facesee == '../../../static/icon-normal.png'){
            this.facesee = '../../../static/icon-down.png'
             this.thesort_param = "total_score ,-1"
             this.rank(-1,'total_score')
         }else{
              this.facesee = '../../../static/icon-up.png'
             this.thesort_param = "total_score ,1"
             this.rank(1,'total_score')
         }
          this.thepage = 1
          this.mark='../../../static/icon-normal.png'
          this.teleman = '../../../static/icon-normal.png'
           this.redditsee = '../../../static/icon-normal.png'
          this.redditac='../../../static/icon-normal.png'
          this.twittersee='../../../static/icon-normal.png'
          this.twitterup='../../../static/icon-normal.png'
          this.fbab.borderBottom = 2 + 'px' + ' ' + 'solid' + ' ' + 'black'
          this.fbai.display = 'inline-block'
        //  this.newcode(10,this.thepage_size)
        //   this.fornew()
    },
    telemancl(){
        this.empty()
        if(this.teleman == '../../../static/icon-up.png' || this.teleman == '../../../static/icon-normal.png'){
             this.teleman = '../../../static/icon-down.png'
             this.thesort_param = "telegram_attention ,-1"
             this.rank(-1,'change_quantity')
         }else{
             this.teleman = '../../../static/icon-up.png'
             this.thesort_param = "telegram_attention ,1"
             this.rank(1,'change_quantity')
             
         }
          this.thepage = 1
         this.mark='../../../static/icon-normal.png'
          this.redditsee='../../../static/icon-normal.png'
          this.redditac='../../../static/icon-normal.png'
          this.twittersee='../../../static/icon-normal.png'
          this.twitterup='../../../static/icon-normal.png'
          this.facesee='../../../static/icon-normal.png'
          this.tgpb.borderBottom = 2 + 'px' + ' ' + 'solid' + ' ' + 'black'
          this.tgpi.display = 'inline-block'
        //   this.fornew()
          
    }


  }
}
</script>

<style scoped>
.out{
    width: 100%;
    padding-top: 10px;
    padding-bottom: 150px;
    background-color: #fff;
}
/* 底部广告位 */
.bot_advertis{
    position: relative;
    width: 970px;
    height: 90px;
    margin: 0 auto;
    text-align: center;
}

.bot_advertis .ssb{
    position: absolute;
    top: 0;
    right: 0;
    width: 9px;
    height: 9px;
    z-index: 99;
    background-color: #ccc;
}
/* 顶部广告位 */
.top_advertis{
    position: relative;
    width: 970px;
    height: 90px;
    margin: 0 auto;
    text-align: center;
}
.top_advertis .sst{
    position: absolute;
    top: 0;
    right: 0;
    width: 9px;
    height: 9px;
    z-index: 99;
     background-color: #ccc;
}
.content{
    width: 1000px;
    background-color: #fff;
    margin: 0 auto;
    position: relative;
    padding-bottom: 100px;
}
/* 翻页 */
.content .page_top{
    position: absolute;
    top: 20px;
    right: 20px;
}
.content .page_bottom{
    position: absolute;
    bottom: 20px;
    right: 20px;
}
.content .content_top{
    width: 430px; 
    font-size: 24px;   
    color: #8f8f8f;
    cursor:pointer;
}
.top_left{
    float: left;
}
.content_top span{
    padding: 0 20px;
    border-bottom: 1px solid #8f8f8f;
    padding-bottom: 11px;
}
.content .select{
    color: black;
    border-bottom: 4px solid black;
    font-weight: 600;
}

.content_middle .title{
    width: 100%;
    height: 60px;
    margin-top: 36px;
    line-height: 51px;
}
.content .content_middle .entitle{
    font-size: 14px;
}
.content .content_middle{
    margin-top: -25px;
}
.top_tips{
    font-size: 18px;
    width: 88px;
    height: 25px;
    text-align: center;
    border-bottom: 2px solid #000;
    margin-top: 30px;
}
.title li{
    float: left;
    height: 60px;
    width: 115px;
    line-height: 60px;
    text-align: right;
    color: #292929;
    font-weight: 400;
    box-sizing: border-box;
    cursor:pointer;
    font-size: 14px;
    background-color: #f4f4f4;
    position: relative;
    font-weight: 600;
    
}
.title .bk_one{
    height: 60px;
    width: 0;
    padding: 0;
    margin: 0;
}
.title .bk_two{
    height: 60px;
    width: 0;
    padding: 0;
    margin: 0;
}
.title .bk_thr{
    height: 60px;
    width: 0;
    padding: 0;
    margin: 0;
}
.title .bk_fr{
    height: 60px;
    width: 0;
    padding: 0;
    margin: 0;
}
.title .bk_fiv{
    height: 60px;
    width: 0;
    padding: 0;
    margin: 0;
}
.title .bk_sx{
    height: 60px;
    width: 0;
    padding: 0;
    margin: 0;
}
.title .bk_sv{
    height: 60px;
    width: 0;
    padding: 0;
    margin: 0;
}
.title .bk_et{
    height: 60px;
    width: 0;
    padding: 0;
    margin: 0;
}
.title li img{
    position: absolute;
    top: 23px;
    left: 5px;
}
.title li:hover{
    border-bottom: 2px solid #3D5AFE;
}
.title li:hover img{
    display: inline-block;
}
.title li:hover .tips{
    display: block;
}
.title li img{
    display: none;
    width: 14px;
    height: 15px;
    vertical-align: -2px;
}
/* 提示框 */
.title li .tips{
    position: relative;
    display: none;
    width: 160px;
    left: 50%;
    top: 8px;
    margin-left: -80px;
    text-align: left;
    word-wrap: break-word;
    border-radius: 4px;
    color:#fff;
    z-index: 2;
    line-height: 20px;
    font-size: 12px;
    background-color: #000;
    padding: 10px;
    box-sizing: border-box;
    font-weight: 400;
}
.title li .tips p{
    margin-bottom: 15px;
}
.title li .tips img{
    width: 12px;
    height: 12px;
    position: absolute;
    top: -5px;
    left: 50%;
    margin-left: -6px;
}
.title li .price{
    margin-left: -85px;
}
.title li .mark{
     margin-left: -85px;
}
.title li .volum{
     margin-left: -85px;
}
.title li .pri{
    top: 8px;
}
.title .first{
    width: 40px;
    text-align: center;
    border:0!important;
    line-height: 60px;
    cursor: auto;
}
.title .sec_first{
    width: 48px;
    border:0!important;
}
.title .second{
    width: 100px;
    text-align: left;
    line-height: 60px;
    padding-left: 40px;
    cursor: auto;
}
.title .marks{
    width: 143px;
    padding-left: 10px;
    text-align: center;
    line-height: 60px;
}
.title .marks img{
    left:37px;
}
.title .read{
    width: 98px;
    padding-left: 10px;
    text-align: center;
}
.title .read img{
    left: 15px;
}
.title .rread{
    width: 132px;
    padding-left: 10px;
     text-align: center;
}
.title .rread img{
    left: 14px;
}
.title .tfh{
    width: 80px;
    padding-left: 6px;
    text-align: center;
}
.title .tfh img{
    left: 11px;
}
.title .tsee{
    width: 100px;
     text-align: center;
}
.title .tsee img{
    left: 9px;
}
.title .tart{
    width: 100px;
    text-align: center;
}
.title .tart img{
    left: 2px;
}
.title .fcsee{
     width: 90px;
     text-align: center;
}
.title .fcsee img{
    left: 10px;
}
.title .tman{
    width: 116px;
     text-align: center;
     cursor: auto;
}
.title .enmark{
       width: 143px;
       padding-left: 10px;
     text-align: center;
    line-height: 60px;
}
.title .enmark img{
    vertical-align: -2px;
    left: 13px;
}
.title .enread{
    width: 98px;
    padding-left: 10px;
     text-align: center;
}
.title .enread img{
    left: 12px;
}
.title .enrread img{
    left: 9px;
}
.title .enrread{
     width: 132px;
     padding-left: 10px;
     text-align: center;
}
.title .entfh{
    width: 80px;
    padding-left: 6px;
     text-align: center;
}
.title .entfh img{
    left: 10px;
}
.title .entsee{
    width: 100px;
    text-align: center;
}
.title .entsee img{
    left: -3px;
}
.title .entart{
    width: 100px;
     text-align: center;
}
.title .entart img{
    left: -7px;
}
.title .entart img{
    vertical-align: -2px;
}
.title .enfcsee{
     width: 90px;
     text-align: center;
}
.title .enfcsee img{
    left: 9px;
}
.title .entman{
    width: 116px;
     text-align: center;
    cursor: auto;
}
.title .entman img{
    vertical-align: 15px;
}
.data{
    width: 100%;
    height: 70px;
    border-bottom: 1px solid #e4e4e4;
}
.data li{
    float: left;
    width: 110px;
    height: 70px;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    color: black;
    box-sizing: border-box;
}
.data .first{
    width: 40px;
    line-height: 70px;
}
.data .sec_first{
    width: 35px;
    padding-top: 18px;
}
.data .prs{
    width: 143px;
    text-align: right;
    padding-right: 10px;
    color: #333;
    line-height: 70px;
}
.data .rg{
    width: 98px;
    padding-right: 10px;
    text-align: right;
    line-height: 70px;
}
.data .rg p{
    color: #333;
}

.data .rh{
    width: 132px;
    padding-right: 10px;
    text-align: right;
   line-height: 70px;
}
.data .gitscore{
    width: 100px;
    text-align: center;
    font-size: 16px;
    line-height: 33px;
    color: #000;
    line-height: 70px;
}
/* 内容提示 */
.gitscore .in_tips{
    position: relative;
    display: none;
    width: 170px;
    left: 50%;
    top: 8px;
    margin-left: -80px;
    border-radius: 4px;
    color:#000;
    z-index: 2;
    line-height: 20px;
    font-size: 12px;
    background-color: #fff;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #000;
    /* overflow: hidden; */
}
.gitscore .in_mdl{
    width: 150px;
    overflow: hidden;
}
.gitscore .in_tips img{
    width: 12px;
    height: 12px;
    position: absolute;
    top: -6px;
    left: 50%;
    margin-left: -6px;
}
.gitscore:hover .in_tips{
    display: block;
}
.gitscore .in_tips .in_left{
    float: left;
    width: 93px;
    text-align: left;
}
.gitscore .in_tips .in_right{
    float: right;
    width: 53px;
    text-align: right;
}
.gitscore .in_tips p{
    margin-top: 7px;
}
.gitscore .in_tips p img{
    width: 16px;
    height: 16px;
    position: static;
    vertical-align: -3px;
    margin-right: 4px;
    margin-left: 0;
}
.gitscore .in_tips p svg{
    width: 16px;
    height: 16px;
    vertical-align: -3px;
    margin-right: 4px;
    color: #8f8f8f;
}
.data .tg{
    width: 80px;
    text-align: center;
    padding-left: 10px;
    font-size: 14px;
    line-height: 17px;
    line-height: 70px;
    color: #8f8f80;
}
.data .tg p{
    margin-top: 7px;
}
.data .tg svg{
    width: 16px;
    height: 16px;
    vertical-align: -3px;
    margin-right: 4px;
    color: #8f8f8f;
}
.data .ff{
    width: 92px;
    text-align: left;
    padding-left: 10px;
    font-size: 12px;
    line-height: 17px;
    padding-top: 5px;
    color: #8f8f80;
}
.data .ff p{
    margin-top: 7px;
}
.data .ff img{
    width: 16px;
    height: 16px;
    vertical-align: -3px;
    margin-right: 4px;
}
.data .teg{
    width: 90px;
    text-align: center;
    font-size: 16px;
    color: #E44150 ;
    line-height: 70px;
}
.data .tw{
    width: 116px;
    height: 40px;
    text-align: center;
    line-height: 88px;
}
.data .tw img{
    width: 90px;
    height: 30px;
}
.data .enprs{
    width: 143px;
    text-align: right;
    padding-right: 10px;
    color: #333;
    line-height: 70px;
}
.data .enrg{
     width: 98px;
    padding-right: 10px;
    text-align: right;
    line-height: 70px;
}
.data .enrg p{
    color: #333;
}

.data .enrh{
    width: 132px;
    padding-right: 10px;
    text-align: right;
   line-height: 70px;
}
.data .entg{
     width: 80px;
    text-align: center;
    padding-left: 10px;
    font-size: 14px;
    line-height: 17px;
    line-height: 70px;
    color: #8f8f80;
}
.data .entg p{
    margin-top: 7px;
}
.data .entg svg{
    width: 16px;
    height: 16px;
    vertical-align: -3px;
    margin-right: 4px;
    color: #8f8f8f;
}
.data .enff{
     width: 92px;
    text-align: left;
    padding-left: 10px;
    font-size: 12px;
    line-height: 17px;
    padding-top: 5px;
    color: #8f8f80;
}
.data .enff p{
    margin-top: 7px;
}
.data .enff img{
    width: 16px;
    height: 16px;
    vertical-align: -3px;
    margin-right: 4px;
}
.data .enteg{
    width: 90px;
    text-align: center;
    font-size: 16px;
    color: #E44150 ;
    line-height: 70px;
}
.data .entw{
     width: 116px;
    height: 40px;
    text-align: center;
    line-height: 88px;
}
.data .entw img{
    width: 90px;
    height: 30px;
}
.data .sec_sec{
    width: 65px;
    padding-top: 18px;
    text-align: left;
    cursor: pointer;
}
.data .sec_sec p{
    font-size: 14px;
}
.data .sec_sec span{
    font-size: 10px;
    overflow:hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}
.data .sec_sec:hover{
    cursor: pointer;
}
.pic{
    width: 24px;
    height: 24px;
    background-color: #ccc;
    border-radius: 50%;
    margin-top: 3px;
}
.pic img{
    width: 20px;
    height: 20px;
}
.boxw{
    width: 50px;
    text-align: right;
    display: inline-block;
    line-height: 18px;
    margin: 0 auto;
    text-align: center;
}
.boxwl{
    width: 70px;
    text-align: right;
    display: inline-block;
    line-height: 18px;
    margin: 0 auto;
    text-align: center;
}
.boxwle{
    width: 80px;
    height: 40px;
    text-align: right;
    display: inline-block;
    line-height: 20px;
    margin: 0 auto;
    text-align: center;
}
.boxwla{
    width: 50px;
    height: 40px;
    text-align: right;
    display: inline-block;
    line-height: 20px;
    margin: 0 auto;
    text-align: center;
}
.midd{
    width: 70px;
    margin: 0 auto;
    overflow: hidden;
}
@media screen and (min-width: 1200px){
   .out{
    width: 100%;
    padding-top: 10px;
    padding-bottom: 150px;
    background-color: #fff;
}
/* 底部广告位 */
.bot_advertis{
    position: relative;
    width: 970px;
    height: 90px;
    margin: 0 auto;
    text-align: center;
}

.bot_advertis .ssb{
    position: absolute;
    top: 0;
    right: 0;
    width: 9px;
    height: 9px;
    z-index: 99;
    background-color: #ccc;
}
/* 顶部广告位 */
.top_advertis{
    position: relative;
    width: 970px;
    height: 90px;
    margin: 0 auto;
    text-align: center;
}
.top_advertis .sst{
    position: absolute;
    top: 0;
    right: 0;
    width: 9px;
    height: 9px;
    z-index: 99;
     background-color: #ccc;
}
.content{
    width: 1200px;
    background-color: #fff;
    margin: 0 auto;
    position: relative;
    padding-bottom: 100px;
}
/* 翻页 */
.content .page_top{
    position: absolute;
    top: 20px;
    right: 20px;
}
.content .page_bottom{
    position: absolute;
    bottom: 20px;
    right: 20px;
}
.content .content_top{
    width: 430px; 
    font-size: 24px;   
    color: #8f8f8f;
    cursor:pointer;
}
.top_left{
    float: left;
}
.content_top span{
    padding: 0 20px;
    border-bottom: 1px solid #8f8f8f;
    padding-bottom: 11px;
}
.content .select{
    color: black;
    border-bottom: 4px solid black;
    font-weight: 600;
}
.content_middle .title{
    width: 100%;
    height: 60px;
    margin-top: 36px;
    line-height: 51px;
}
.content .content_middle .entitle{
    font-size: 14px;
}
.title li{
    float: left;
    height: 60px;
    width: 115px;
    line-height: 60px;
    text-align: right;
    color: #292929;
    font-weight: 400;
    box-sizing: border-box;
    cursor:pointer;
    font-size: 14px;
    background-color: #f4f4f4;
    position: relative;
    padding-left: 10px;
    font-weight: 600;
}
.title .bk_one{
    height: 60px;
    width: 22px;
    padding: 0;
    margin: 0;
    border: none!important;
}
.title .bk_two{
    height: 60px;
    width: 27px;
    padding: 0;
    margin: 0;
    border: none!important;
}
.title .bk_thr{
    height: 60px;
    width: 38px;
    padding: 0;
    margin: 0;
    border: none!important;
}
.title .bk_fr{
    height: 60px;
    width: 10px;
    padding: 0;
    margin: 0;
    border: none!important;
}
.title .bk_fiv{
    height: 60px;
    width: 10px;
    padding: 0;
    margin: 0;
    border: none!important;
}
.title .bk_sx{
    height: 60px;
    width: 10px;
    padding: 0;
    margin: 0;
    border: none!important;
}
.title .bk_sv{
    height: 60px;
    width: 10px;
    padding: 0;
    margin: 0;
    border: none!important;
}
.title .bk_et{
    height: 60px;
    width: 10px;
    padding: 0;
    margin: 0;
    border: none!important;
}
.title li img{
    position: absolute;
    top: 23px;
    left: 12px;
}
.title li:hover{
    border-bottom: 2px solid #3D5AFE ;
}
.title li:hover img{
    display: inline-block;
}
.title li:hover .tips{
    display: block;
}
.title li img{
    display: none;
    width: 14px;
    height: 15px;
    vertical-align: -2px;
}
/* 提示框 */
.title li .tips{
    position: relative;
    display: none;
    width: 160px;
    left: 50%;
    top: 8px;
    margin-left: -80px;
    text-align: left;
    word-wrap: break-word;
    border-radius: 4px;
    color:#fff;
    z-index: 2;
    line-height: 20px;
    font-size: 12px;
    background-color: #000;
    padding: 10px;
    box-sizing: border-box;
}
.title li .tips p{
    margin-bottom: 15px;
}
.title li .tips img{
    width: 12px;
    height: 12px;
    position: absolute;
    top: -5px;
    left: 50%;
    margin-left: -6px;
}
.title li .price{
   margin-left: -85px;
}
.title li .mark{
    margin-left: -85px;
}
.title li .volum{
    margin-left: -85px;
}
.title li .pri{
    top: 8px;
}
.title .first{
    width: 50px;
    text-align: center;
    border:0!important;
    line-height: 60px;
}
.title .sec_first{
    width: 48px;
    border:0!important;
}
.title .second{
    width: 110px;
    text-align: left;
    line-height: 60px;
    padding-left: 40px;
}
.title .marks{
    width: 143px;
    text-align: center;
    line-height: 60px;
}
.title .marks img{
    left:37px;
}
.title .read{
    width: 98px;
    text-align: center;
}
.title .rread{
    width: 132px;
     text-align: center;
}
.title .rread img{
    left: 14px;
}
.title .tfh{
    width: 100px;
    text-align: center;
}
.title .tfh img{
    left: 23px;
}
.title .tsee{
    width: 100px;
     text-align: center;
}
.title .tsee img{
    left: 15px;
}
.title .tart{
    width: 100px;
    text-align: center;
}
.title .tart img{
    left: 9px;
}
.title .fcsee{
     width: 100px;
     text-align: center;
}
.title .fcsee img{
    left: 22px;
}
.title .tman{
    width: 130px;
     text-align: center;
    
}
.title .enmark{
     width: 143px;
    text-align: center;
    line-height: 60px;
}
.title .enmark img{
    vertical-align: -2px;
}
.title .enread{
    width: 98px;
    text-align: center;
}
.title .enrread img{
    left: 9px;
}
.title .enrread{
    width: 132px;
     text-align: center;
}
.title .entfh{
    width: 100px;
     text-align: center;
}
.title .entfh img{
    left: 22px;
}
.title .entsee{
    width: 100px;
    text-align: center;
}
.title .entsee img{
    left: 2px;
}
.title .entart{
    width: 100px;
     text-align: center;
}
.title .entart img{
    left: -3px;
}
.title .entart img{
    vertical-align: -2px;
}
.title .enfcsee{
     width: 100px;
     text-align: center;
}
.title .enfcsee img{
    left: 21px;
}
.title .entman{
    width: 130px;
     text-align: center;
    
}
.title .entman img{
    vertical-align: 15px;
}
.data{
    width: 100%;
    height: 70px;
    border-bottom: 1px solid #e4e4e4;
}
.data li{
    float: left;
    width: 110px;
    height: 70px;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    color: black;
    box-sizing: border-box;
}
.data .first{
    width: 50px;
    line-height: 70px;
}
.data .sec_first{
    width: 45px;
    padding-top: 18px;
}
.data .prs{
    width: 170px;
    text-align: right;
    padding-right: 10px;
    color: #333;
    line-height: 70px;
}
.data .rg{
    width: 120px;
    padding-right: 10px;
    text-align: right;
    line-height: 70px;
}
.data .rg p{
    color: #333;
}

.data .rh{
    width: 170px;
    padding-right: 10px;
    text-align: right;
   line-height: 70px;
}
.data .gitscore{
    width: 110px;
    text-align: center;
    font-size: 16px;
    line-height: 33px;
    color: #000;
    line-height: 70px;
}

.data .tg{
    width: 120px;
    text-align: center;
    padding-left: 10px;
    font-size: 14px;
    line-height: 17px;
    line-height: 70px;
    color: #8f8f80;
}
.data .tg p{
    margin-top: 7px;
}
.data .tg svg{
    width: 16px;
    height: 16px;
    vertical-align: -3px;
    margin-right: 4px;
    color: #8f8f8f;
}
.data .ff{
    width: 92px;
    text-align: left;
    padding-left: 10px;
    font-size: 12px;
    line-height: 17px;
    padding-top: 5px;
    color: #8f8f80;
}
.data .ff p{
    margin-top: 7px;
}
.data .ff img{
    width: 16px;
    height: 16px;
    vertical-align: -3px;
    margin-right: 4px;
}
.data .teg{
    width: 110px;
    text-align: center;
    font-size: 16px;
    color: #E44150 ;
    line-height: 70px;
}
.data .tw{
    width: 130px;
    height: 40px;
    text-align: center;
    line-height: 88px;
}
.data .tw svg{
    width: 90px;
    height: 30px;
}
.data .enprs{
    width: 170px;
    text-align: right;
    padding-right: 10px;
    color: #333;
    line-height: 70px;
}
.data .enrg{
    width: 120px;
    padding-right: 10px;
    text-align: right;
    line-height: 70px;
}
.data .enrg p{
    color: #333;
}

.data .enrh{
   width: 170px;
    padding-right: 10px;
    text-align: right;
   line-height: 70px;
}
.data .entg{
     width: 120px;
    text-align: center;
    padding-left: 10px;
    font-size: 14px;
    line-height: 17px;
    line-height: 70px;
    color: #8f8f80;
}
.data .entg p{
    margin-top: 7px;
}
.data .entg svg{
    width: 16px;
    height: 16px;
    vertical-align: -3px;
    margin-right: 4px;
    color: #8f8f8f;
}
.data .enff{
     width: 92px;
    text-align: left;
    padding-left: 10px;
    font-size: 12px;
    line-height: 17px;
    padding-top: 5px;
    color: #8f8f80;
}
.data .enff p{
    margin-top: 7px;
}
.data .enff img{
    width: 16px;
    height: 16px;
    vertical-align: -3px;
    margin-right: 4px;
}
.data .enteg{
    width: 110px;
    text-align: center;
    font-size: 16px;
    color: #E44150 ;
    line-height: 70px;
}
.data .entw{
    width: 130px;
    height: 40px;
    text-align: center;
    line-height: 88px;
}
.data .entw svg{
    width: 90px;
    height: 30px;
}
.data .sec_sec{
    width: 65px;
    padding-top: 18px;
    text-align: left;
    cursor: pointer;
}
.data .sec_sec p{
    font-size: 14px;
}
.data .sec_sec span{
    font-size: 10px;
    overflow:hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}
.data .sec_sec:hover{
    cursor: pointer;
}
.pic{
    width: 24px;
    height: 24px;
    background-color: #ccc;
    border-radius: 50%;
    margin-top: 3px;
}
.pic img{
    width: 20px;
    height: 20px;
}
.boxw{
    width: 50px;
    text-align: right;
    display: inline-block;
    line-height: 18px;
    margin: 0 auto;
    text-align: center;
}
.boxwl{
    width: 70px;
    text-align: right;
    display: inline-block;
    line-height: 18px;
    margin: 0 auto;
    text-align: center;
}
.boxwle{
    width: 80px;
    height: 40px;
    text-align: right;
    display: inline-block;
    line-height: 20px;
    margin: 0 auto;
    text-align: center;
}
.boxwla{
    width: 50px;
    height: 40px;
    text-align: right;
    display: inline-block;
    line-height: 20px;
    margin: 0 auto;
    text-align: center;
}
.midd{
    width: 70px;
    margin: 0 auto;
    overflow: hidden;
}

}

</style>
