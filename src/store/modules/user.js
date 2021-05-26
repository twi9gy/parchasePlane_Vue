import axios from "axios";

const API_URL = '/user/';

export default {
    state: {
        userInfo: { },
        uri: process.env.VUE_APP_GATEWAY_API + API_URL
    },
    mutations: {
        setUserInfo(state, userInfo) { state.userInfo = userInfo },
        clearUserInfo(state) { state.userInfo = {} }
    },
    actions: {
        // Метод для получения пользователя по Jwt token
        async currentUser({ dispatch, commit, state }) {
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))
            // Запрос к API
            await axios.get(
                state.uri + 'current',
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization' : token
                    }
                })
                .then(response => {
                    // Устанавливаем текущего пользователя в хранилище
                    commit('setUserInfo', response.data);
                } )
                .catch(() => {
                    dispatch('refreshUser')
                });
        },
        async changePassword({ commit, state }, { new_password }) {
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))
            let data = JSON.stringify({
                'password': new_password
            })
            // Запрос к API
            await axios.put(
                state.uri + 'changePass',
                data,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization' : token
                    }
                })
                .then(response => {
                    // Устанавливаем текущего пользователя в хранилище
                    commit('setMessage', response.data.message);
                } )
                .catch(error => {
                    commit('setMessage', error.response.data.message);
                    throw error
                });
        },
    },
    getters: {
        getUser(state) { return state.userInfo }
    }
}