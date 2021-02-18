export default {
    state: {
        page: 'Главная',
        hint: '',
    },
    mutations: {
        setHeader(state, page) {
            state.page = page;
        },
        setHint(state, hint) {
            state.hint = hint;
        },
    },
    actions: {
    },
    getters: {
        getPage(state) {
            return state.page;
        },
        getHint(state) {
            return state.hint;
        }
    }
}
