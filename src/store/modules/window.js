export default {
    state: {
        width: 0,
        height: 0
    },
    mutations: {
        setWidth(state, width) { state.width = width },
        setHeight(state, height) { state.height = height }
    },
    getters: {
        getWidth(state) { return state.width },
        getHeight(state) { return state.height }
    }
}