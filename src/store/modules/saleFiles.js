import axios from "axios";

const API_URL = "/sales_file";

export default {
    state: {
        files : [],
        uri: process.env.VUE_APP_GATEWAY_API + API_URL
    },
    mutations: {
        setSaleFiles(state, files) {
            state.files = files;
            state.files.forEach(function(item) {
                item.new = false;
                item.edit = false;
                item.loaded = true;
            });
        },
        clearSaleFiles(state) { state.files = [] },
        createSaleFile(state) {
            state.files.push({
                id: Date.now() + ' new',
                filename: '',
                edit: false,
                new: true,
                loaded: false,
                separator: ','
            });
        },
        deleteSaleFile(state, index) {
            // Ищем файл с индексом = index
            let elem = state.files.filter(x => x.id === index);
            // Получаем индекс элмента в массиве
            let ind = state.files.indexOf(elem[0]);
            // Удаляем файл из массива файлов
            state.files.splice(ind, 1);
        }
    },
    actions: {
        async getAllSaleFiles({ dispatch, commit, state }) {
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
                .then(response => { commit('setSaleFiles', response.data.files) })
                .catch(error => {
                    if (error.response.data.code === 401) {
                        dispatch('refreshUser')
                    } else {
                        commit('setMessage', error.response.data.message);
                        throw error;
                    }
                });
        },
        // Получить файлы по id категории
        async getSaleFilesByCategoryId({ dispatch, commit, getters, state }) {
            // Устанавливаем в заголовки Http токен JWT
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))
            // Запрос к API
            await axios.get(
                state.uri + '?category_id=' + getters.getCategory.id,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization' : token
                    }
                })
                .then(response => { commit('setSaleFiles', response.data.files) })
                .catch(error => {
                    if (error.response.data.code === 401) {
                        dispatch('refreshUser')
                    } else {
                        commit('setMessage', error.response.data.message);
                        throw error;
                    }
                });
        },
        async addSaleFile({ dispatch, commit, state }, { formData, file }) {
            // Устанавливаем в заголовки Http токен JWT
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'));
            // Запрос к API
            await axios.post(
                state.uri + '/new',
                formData,
                {
                    headers: {
                        'Authorization' : token
                    }
                })
                .then(response => {
                    commit('setMessage', response.data.message);
                    file.id = response.data.file_id;
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
        async editSaleFile({ dispatch, commit, state }, { file_id, filename }) {
            // Устанавливаем в заголовки Http токен JWT
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'));
            // Данные для создания новой категории
            const data = JSON.stringify({
                "filename" : filename
            });
            // Запрос к API
            await axios.post(
                state.uri + '/' + file_id + '/edit',
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
        async delSaleFile({ dispatch, commit, state }, { file_id }) {
            // Устанавливаем в заголовки Http токен JWT
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'));
            // Запрос к API
            await axios.delete(
                state.uri + '/' + file_id,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization' : token
                    }
                })
                .then(response => {
                    commit('deleteSaleFile', file_id);
                    commit('setMessage', response.data.message);
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
        saleFiles(state) { return state.files }
    }
}