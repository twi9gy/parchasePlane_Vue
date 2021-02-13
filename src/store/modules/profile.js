export default {
    state: {
        profile: {
            email: '',
            password: '',
            phone: '',
        }
    },
    mutations: {
    },
    actions: {
    },
    getters: {
        getProfile(state) {
            return state.profile;
        }
    }
}
