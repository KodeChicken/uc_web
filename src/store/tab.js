export default {
    state: {
        menu: [],
        currentMenu: null,
        tabsList: [
            {
                path: '/',
                label: '首页',
                name: 'home',
                icon: 'menu',
                children: [
                    {
                        path: '/userList',
                        name: 'userList',
                        label: '用户列表',
                        icon: 'user'
                    },
                    {
                        path: '/aclAdmin',
                        name: 'aclAdmin',
                        label: '权限管理',
                        icon: 's-operation'
                    }
                ]
            }
        ]
    },
    mutations: {
        selectMenu(state, val) {
            if (val.name !== 'home') {
                state.currentMenu = val
                let result = state.tabsList.findIndex(item => item.name === val.name)
                result === -1 ? state.tabsList.push(val) : ''
            } else {
                state.currentMenu = null

            }
        },
        closeTab(state, val) {
            let result = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(result, 1)
        },

    },
    actions: []
}