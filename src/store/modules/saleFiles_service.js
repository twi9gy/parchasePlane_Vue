import axios from "axios";

const API_URL = "http://purchase_plan.local:81/api/v1/sales_file";

export default {
    state: {
        files : []
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
                loaded: false
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
        async getAllSaleFiles({ commit }) {
            // Устанавливаем в заголовки Http токен JWT
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))
            // Запрос к API
            await axios.get(
                API_URL,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization' : token
                    }
                })
                .then(response => { commit('setSaleFiles', response.data.files) })
                .catch(error => {
                    commit('setMessage', error.response.data.message)
                    throw error;
                });
        },
        // Получить файлы по id категории
        async getSaleFilesByCategoryId({ commit, getters }) {
            // Устанавливаем в заголовки Http токен JWT
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))
            // Запрос к API
            await axios.get(
                API_URL + '?category_id=' + getters.getCategory.id,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization' : token
                    }
                })
                .then(response => { commit('setSaleFiles', response.data.files) })
                .catch(error => {
                    commit('setMessage', error.response.data.message)
                    throw error;
                });
        },
        async addSaleFile({ commit }, { formData, file }) {
            // Устанавливаем в заголовки Http токен JWT
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'));
            // Запрос к API
            await axios.post(
                API_URL + '/new',
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
                    commit('setMessage', error.response.data.message);
                    throw error;
                });
        },
        async editSaleFile({ commit }, { file_id, filename }) {
            // Устанавливаем в заголовки Http токен JWT
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'));
            // Данные для создания новой категории
            const data = JSON.stringify({
                "filename" : filename
            });
            // Запрос к API
            await axios.post(
                API_URL + '/' + file_id + '/edit',
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
        async delSaleFile({ commit }, { file_id }) {
            // Устанавливаем в заголовки Http токен JWT
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'));
            // Запрос к API
            await axios.delete(
                API_URL + '/' + file_id,
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
                    commit('setMessage', error.response.data.message);
                    throw error;
                });
        }
    },
    getters: {
        saleFiles(state) { return state.files }
    }
}