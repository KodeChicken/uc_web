import Vue from 'vue'
import VueRouter from 'vue-router'

import CommonLogin from "../components/CommonLogin";
import UserList from "../views/user/UserList";
import AclAdmin from "../views/user/AclAdmin";
import Index from "../views/Index";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: CommonLogin
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    // redirect: '/sys/users',
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(( to, from, next ) => {
  debugger;
  if (to.path == "/") {
      window.localStorage.setItem("token", "")
      return next()
  }
  let token = window.localStorage.getItem("token")

  if (!token) {
    return next("/")
  }
  return next()
})




export default router
