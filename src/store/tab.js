export default {
    state: {
        menu: [],
        currentMenu: {}
    },
    mutations: {
        selectMenu(state, val) {
            state.currentMenu = val
        }
    },
    actions: []
}