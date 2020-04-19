import Vue from 'vue'
import VueRouter from 'vue-router'

import CommonLogin from "../components/CommonLogin";
import UserList from "../views/user/UserList";
import AclAdmin from "../views/user/AclAdmin";
import Index from "../views/Index";

Vue.use(VueRouter)

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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(( to, from, next ) => {
  if (to.path == "/login") {
      window.localStorage.setItem("Authorization", "")
      return next()
  }
  let token = window.localStorage.getItem("Authorization")

  if (!token) {
    return next("/login")
  }
  return next()
})




export default router
