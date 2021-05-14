export default {
    state: {
        header: 'Главная',
        hint: ''
    },
    mutations: {
        setHeader(state, page) { state.header = page },
        setHint(state, hint) { state.hint = hint }
    },
    getters: {
        Page(state) { return state }
    }
}
