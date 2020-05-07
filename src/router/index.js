import Vue from 'vue'
import VueRouter from 'vue-router'

import CommonLogin from "../components/CommonLogin";
import UserList from "../views/user/UserList";
import AclAdmin from "../views/user/AclAdmin";
import Index from "../views/Index";
import CommonNetWorkErr from "../components/CommonNetWorkErr";

Vue.use(VueRouter)
let _this = Vue.prototype
const routes = [
  {
    path: '/login',
    name: 'login',
    component: CommonLogin
  },
  {
    path: '/',
    name: 'index',
    component: Index,
    redirect: '/sys/users',
    children: [
      {
        path: '/sys/users',
        name: 'userList',
        component: UserList,
      },
      {
        path: '/aclAdmin',
        name: 'aclAdmin',
        component: AclAdmin
      }
    ]
  },
  {
    path: '/networkErr',
    name: 'networkErr',
    component: CommonNetWorkErr
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(( to, from, next ) => {
  debugger
  let token = localStorage.getItem("Authorization")
  if (to.path == "/login") {
    localStorage.removeItem("Authorization")
    return next()
  }
  if (!token) {
    return next("/login")
  }
  return next()
})




export default router
