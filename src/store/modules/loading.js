export default {
    state: {
        loading: true
    },
    mutations: {
        setLoading(state, loading) { state.loading = loading }
    },
    getters: {
        getLoading(state) { return state.loading }
    }
}