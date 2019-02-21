import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/components/layout'
import coin from '@/page/coin'
import coindetail from '@/page/coindetail'
import data from '@/page/data'
import datadetail from '@/page/datadetail'
import exchange from '@/page/exchange'
import newcoin from '@/page/newcoin'
import Pcnotfond from '../page/notfound'
import Trend from '../page/trend'
import Trenddetail from '../page/trenddetail'



import ph_index from '../phone/index'
import ph_trend from '../phone/trend'
import ph_trenddetail from '../phone/trenddetail'
import ph_layout from '../phone/layout'
import ph_coin_detail from '../phone/coin_detail'
Vue.use(Router)

var router_list_web = [

  {
    path: '/',
    name: 'layout',
    component: layout,
    redirect: '/',
    children: [{
        path: '/',
        component: coin,
        name:'coin',
        meta: {
          title: 'TokenRank'
        }
      },
      {
        path: '/coindetail',
        component: coindetail,
        name:'coindetail',
        meta: {
          title: 'TokenRank'
        }
      },
      {
        path: '/data',
        component: data,
        name:'data',
        meta: {
          title: 'TokenRank'
        }
      },
      {
        path: '/datadetail',
        component: datadetail,
        name:'datadetail',
        meta: {
          title: 'TokenRank'
        }
      },
      {
        path: '/exchange',
        component: exchange,
        name:'exchange',
        meta: {
          title: 'TokenRank'
        }
      },
      {
        path: '/newcoin',
        component: newcoin,
        name:'newcoin',
        meta: {
          title: 'TokenRank'
        }
      },
      {
        path: '/trend',
        component: Trend,
        name:'trend',
      },
      {
        path: '/trenddetail',
        component: Trenddetail,
        name: 'trenddetail',
      },

    ]
  },
  {
    path: '*',
    component: Pcnotfond,
    meta: {
      title: 'DappData'
    }
  },
]

var router_list_ph = [
  {
    path: '/',
    name: 'layout',
    component: ph_layout,
    redirect: '/',
    children:[
      {
        path: '/',
        name: 'ph_index',
        component: ph_index,
      },
      {
        path: '/coindetail',
        name: 'ph_coin_detail',
        component: ph_coin_detail,
      },
      {
        path: '/trend',
        name: 'ph_trend',
        component: ph_trend,
      },
      {
        path: '/trend',
        name: 'ph_trend',
        component: ph_trend,
      },
      {
        path: '/trenddetail',
        name: 'ph_trenddetail',
        component: ph_trenddetail,
      },
    ]
  }
  
]
var router_list = [];

if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
  /*window.location.href="你的手机版地址";*/
   document.documentElement.style.fontSize = `${(document.documentElement.clientWidth /750) * 100}px`;
    console.log("移动端");
    $('body,html').css('backgroundColor', '#F5F6FA')
   router_list = router_list_ph;
} else {
  /*window.location.href="你的电脑版地址";    */
  document.documentElement.style.fontSize = "16px";
  $('body,html').css('min-width','1280px')
  console.log("pc端");
  router_list = router_list_web;
}

const router = new Router({
  // mode: 'history',
  routes: router_list

})


//导航守卫
router.beforeEach((to, from, next) => {
  //这里能够跟踪路径的变化
  window.scrollTo(0, 0)
  //最后通过钩子继续页面的跳转
  next();
});


export default router;
