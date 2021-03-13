import axios from "axios";

const API_URL = "http://purchase_plan.local:81/api/v1/category/";

export default {
    state: {
        categories: []
    },
    mutations: {
        setCategories(state, categories) {
            categories.forEach(function(item) {
                item.is_new = false;
                item.editMode = false;
            });
            state.categories = categories;
        },
        clearCategories(state) { state.categories = [] },
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
        async getAllCategories({ commit }) {
            // Устанавливаем в заголовки Http токен JWT
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))
            // Запрос к API
            await axios.get(
                API_URL + 'all',
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization' : token
                    }
                })
                .then(response => {
                    commit('setCategories', response.data.categories);
                    commit('setTotalCountPage', response.data.totalCount);
                })
                .catch(error => {
                    commit('setMessage', error.response.data.message)
                    throw error;
                });
        },
        async addCategory({ commit }, { name, category }) {
            // Устанавливаем в заголовки Http токен JWT
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'));
            // Данные для создания новой категории
            const data = JSON.stringify({
                "name" : name,
            });
            // Запрос к API
            await axios.post(
                API_URL + 'new',
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
                    commit('setMessage', error.response.data.message);
                    throw error;
                });
        },
        async editCategory({ commit }, { name, id }) {
            // Устанавливаем в заголовки Http токен JWT
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'));
            // Данные для создания новой категории
            const data = JSON.stringify({
                "name" : name
            });
            // Запрос к API
            await axios.post(
                API_URL + id + '/edit',
                data,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization' : token
                    }
                })
                .then(response => { commit('setMessage', response.data.message) })
                .catch(error => {
                    commit('setMessage', error.response.data.message);
                    throw error;
                });
        },
        async delCategory({ commit }, { id }) {
            // Устанавливаем в заголовки Http токен JWT
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'));
            // Запрос к API
            await axios.delete(
                API_URL + id,
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
                    commit('setMessage', error.response.data.message);
                    throw error;
                });
        }
    },
    getters: {
        allCategories(state) {
            return state.categories;
        }
    }
}
