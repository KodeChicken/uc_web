import Vue from 'vue'
import VueRouter from 'vue-router'

import CommonLogin from "../components/CommonLogin";
import CommonNetWorkErr from "../components/CommonNetWorkErr";

import Index from "../views/Index";
import UserList from "../views/user/UserList";
import Profile from "../views/user/Profile";
import ResourceList from "../views/user/ResourceList";
import OrgList from "../views/user/OrgList";
import RoleList from "../views/user/RoleList";
import DictList from "../views/user/DictList";
import ServerList from "../views/user/ServerList";
import ScheduleList from "../views/user/ScheduleList";


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
        redirect: '/profile',
        children: [
            {
                path: '/sys/users',
                name: 'userList',
                component: UserList,
            },
            {
                path: '/sys/resources',
                name: 'resourceList',
                component: ResourceList
            },
            {
                path: '/sys/orgs',
                name: 'orgList',
                component: OrgList
            },
            {
                path: '/sys/roles',
                name: 'roleList',
                component: RoleList
            },
            {
                path: '/sys/dicts',
                name: 'dictList',
                component: DictList
            },
            {
                path: '/sys/servers',
                name: 'serverList',
                component: ServerList
            },
            {
                path: '/schedules',
                name: 'scheduleList',
                component: ScheduleList
            },
            {
                path: '/profile',
                name: 'profile',
                component: Profile
            },
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

router.beforeEach((to, from, next) => {
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
