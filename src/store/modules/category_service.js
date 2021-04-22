import axios from "axios";

const API_URL = "http://purchase_plan.local:81/api/v1/categories/";

export default {
    state: {
        category : {
            id: '',
            name : '',
            files : []
        }
    },
    mutations: {
        setCategory(state, category) {
            state.category.name = category.name;
            state.category.id = category.id;
        }
    },
    actions: {
        async getCategoryById({ commit }, { id }) {
            // Устанавливаем в заголовки Http токен JWT
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))
            // Запрос к API
            await axios.get(
                API_URL + id,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization' : token
                    }
                })
                .then(response => { commit('setCategory', response.data) })
                .catch(error => {
                    commit('setMessage', error.response.data.message)
                    throw error;
                });
        }
    },
    getters: {
        getCategory(state) { return state.category }
    }
}
