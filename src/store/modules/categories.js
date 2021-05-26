import axios from "axios";

const API_URL = "/categories/";

export default {
    state: {
        categories: [],
        category: [],
        uri: process.env.VUE_APP_GATEWAY_API + API_URL
    },
    mutations: {
        setCategories(state, categories) {
            categories.forEach(function(item) {
                item.is_new = false;
                item.editMode = false;
            });
            state.categories = categories;
        },
        setCategory(state, category) { state.category = category },
        clearCategories(state) {
            state.categories = [];
            state.category = []
        },
        createCategory(state) {
            state.categories.push({
                id: Date.now() + ' new',
                name: '',
                editMode: true,
                is_new: true
            });
        },
        deleteCategory(state, index) {
            // Ищем категорию с индексом = index
            let elem = state.categories.filter(x => x.id === index);
            // Получаем индекс элмента в массиве
            let ind = state.categories.indexOf(elem[0]);
            // Удаляем категорию из массива категорий
            state.categories.splice(ind, 1);
        }
    },
    actions: {
        // Получить все категории
        async getAllCategories({ dispatch, commit, state }) {
            // Устанавливаем в заголовки Http токен JWT
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))
            // Запрос к API
            await axios.get(
                state.uri,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization' : token
                    }
                })
                .then(response => {
                    commit('setCategories', response.data.categories);
                })
                .catch(error => {
                    if (error.response.data.code === 401) {
                        dispatch('refreshUser')
                    } else {
                        commit('setMessage', error.response.data.message)
                        throw error;
                    }
                });
        },
        async getCategoryById({ dispatch, commit, state }, { id }) {
            // Устанавливаем в заголовки Http токен JWT
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))
            // Запрос к API
            await axios.get(
                state.uri + id,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization' : token
                    }
                })
                .then(response => { commit('setCategory', response.data) })
                .catch(error => {
                    if (error.response.data.code === 401) {
                        dispatch('refreshUser')
                    } else {
                        commit('setMessage', error.response.data.message)
                        throw error;
                    }
                });
        },
        async addCategory({ dispatch, commit, state }, { name, category }) {
            // Устанавливаем в заголовки Http токен JWT
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'));
            // Данные для создания новой категории
            const data = JSON.stringify({
                "name" : name,
            });
            // Запрос к API
            await axios.post(
                state.uri + 'new',
                    data,
                    {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization' : token
                    }
                })
                .then(response => {
                    commit('setMessage',response.data.message);
                    category.id = response.data.id;
                })
                .catch(error => {
                    if (error.response.data.code === 401) {
                        dispatch('refreshUser')
                    } else {
                        commit('setMessage', error.response.data.message);
                        throw error;
                    }
                });
        },
        async editCategory({ dispatch, commit, state }, { name, id }) {
            // Устанавливаем в заголовки Http токен JWT
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'));
            // Данные для создания новой категории
            const data = JSON.stringify({
                "name" : name
            });
            // Запрос к API
            await axios.post(
                state.uri + id + '/edit',
                data,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization' : token
                    }
                })
                .then(response => { commit('setMessage', response.data.message) })
                .catch(error => {
                    if (error.response.data.code === 401) {
                        dispatch('refreshUser')
                    } else {
                        commit('setMessage', error.response.data.message);
                        throw error;
                    }
                });
        },
        async delCategory({ dispatch, commit, state }, { id }) {
            // Устанавливаем в заголовки Http токен JWT
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'));
            // Запрос к API
            await axios.delete(
                state.uri + id,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization' : token
                    }
                })
                .then(response => {
                    commit('setMessage', response.data.message);
                    commit('deleteCategory', id);
                })
                .catch(error => {
                    if (error.response.data.code === 401) {
                        dispatch('refreshUser')
                    } else {
                        commit('setMessage', error.response.data.message);
                        throw error;
                    }
                });
        }
    },
    getters: {
        allCategories(state) { return state.categories },
        getCategory(state) { return state.category }
    }
}
