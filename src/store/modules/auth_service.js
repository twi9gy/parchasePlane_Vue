import axios from "axios";

const API_URL = 'http://purchase_plan.local:81/api/v1/auth/';

export default {
    state: { },
    actions: {
        async login ({ dispatch, commit }, { username, password }) {
            // Запрос к API
            const data = JSON.stringify({
                "username" : username,
                "password" : password
            });
            // Запрос к API
            await axios.post(
                API_URL + 'signin',
                data ,
                {
                    headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                    }
                }).then(response => {
                    localStorage.setItem('userToken', JSON.stringify(response.data.token));
                    // Получаем информацию о пользователе
                    dispatch('currentUser');
                    // Оповещаем пользователя
                    commit('setMessage', 'Вы успешно авторизовались.');
                })
                .catch(error => {
                    commit('setMessage', 'Пользователь с таким email и паролем не найден.');
                    throw error;
                });
        },
        async register({ dispatch, commit }, { email, password, companyName }) {
            // Запрос к API
            const data = JSON.stringify({
                "email" : email,
                "password" : password,
                "companyName" : companyName
            });
            // Запрос к API
            await axios.post(
                API_URL + 'signup',
                data ,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                }).then(response => {
                    // Получаем информацию о пользователе
                    dispatch('currentUser');
                    // Выводим сообщение от сервера
                    commit('setMessage', response.data.message);
                })
                .catch(error => {
                    commit('setMessage', error.response.data.message);
                    throw error
                });
        },
        logout({ commit }) {
            // Очищаем данные пользователя
            commit('clearMessage');
            commit('clearUserInfo');
            commit('clearCategories');
            commit('clearFiles');
            // Удаляем jwt token
            localStorage.removeItem('userToken');
        }
    }
}