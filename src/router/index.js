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

Vue.use(Router)

export default new Router({
  routes: [
    { 
      path: '*', 
      component: Pcnotfond,
      meta:{
        title:'DappData'
      }
    },
    {
      path: '/',
      name: 'layout',
      component: layout,
      redirect:'/',
      children:[
        {
          path: '/',
          component: coin,
          meta:{
            title:'TokenRank'
          }
        },
        {
          path: '/coindetail',
          component: coindetail,
          meta:{
            title:'TokenRank'
          }
        },
        {
          path: '/data',
          component: data,
          meta:{
            title:'TokenRank'
          }
        },
        {
          path: '/datadetail',
          component: datadetail,
          meta:{
            title:'TokenRank'
          }
        },
        {
          path: '/exchange',
          component: exchange,
          meta:{
            title:'TokenRank'
          }
        },
        {
          path: '/newcoin',
          component: newcoin,
          meta:{
            title:'TokenRank'
          }
        }
      ]
    }
  ]
})
