export default {
    state: {
        permissions: [],
    },
    mutations: {
        setPermissions(state, val) {
            state.permissions = val;
        },
    },
    getters: {
        getPermits(state) {
           return state.permissions;
        },
    },
    actions: []
}