export default {
    state: {
        header: 'Главная',
        hint: '',
        title: 'Планирование закупок'
    },
    mutations: {
        setHeader(state, page) { state.header = page },
        setHint(state, hint) { state.hint = hint },
        setTitle(state, title) { state.title = title }
    },
    getters: {
        Page(state) { return state }
    }
}
