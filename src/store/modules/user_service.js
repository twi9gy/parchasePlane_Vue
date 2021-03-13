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
        async currentUser({ commit }) {
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
                .catch(error => {
                    console.log(error);}
                    //commit('setMessage', error.message) }
                );
        },
    },
    getters: {
        getUser(state) { return state.userInfo }
    }
}