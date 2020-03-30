import Vue from 'vue'
import VueRouter from 'vue-router'

import UserList from "../views/user/UserList";
import AclAdmin from "../views/user/AclAdmin";
import Index from "../views/Index";


import PageThree from "../views/PageThree";
import PageFour from "../views/PageFour";
import PageFive from "../views/PageFive";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '用户管理',
    component: Index,
    redirect: '/userList',
    children: [
      {
        path: '/userList',
        name: '用户列表',
        component: UserList,
      },
      {
        path: '/aclAdmin',
        name: '权限管理',
        component: AclAdmin
      }
    ]
  },
  {
    path: '/navigation1',
    name: '导航1',
    component: Index,
    children: [
      {
        path: '/pageThree',
        name: '页面3',
        component: PageThree
      },
      {
        path: '/pageFour',
        name: '页面4',
        component: PageFour
      }
    ]
  },
  {
    path: '/navigation2',
    name: '导航2',
    component: Index,
    children: [
      {
        path: '/pageFive',
        name: '页面5',
        component: PageFive
      }

    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
