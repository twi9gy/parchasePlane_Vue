import axios from "axios";

const API_URL = 'http://purchase_plan.local:81/api/v1/user/';

export default {
    state: {
        userInfo: { }
    },
    mutations: {
        setUserInfo(state, userInfo) { state.userInfo = userInfo },
        clearUserInfo(state) { state.userInfo = {} }
    },
    actions: {
        // Метод для получения пользователя по Jwt token
        async currentUser({ dispatch, commit }) {
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))
            // Запрос к API
            await axios.get(
                API_URL + 'current',
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
        async changePassword({ commit }, { new_password }) {
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))
            let data = JSON.stringify({
                'password': new_password
            })
            // Запрос к API
            await axios.put(
                API_URL + 'changePass',
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