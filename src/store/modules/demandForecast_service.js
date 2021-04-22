import axios from "axios";

const API_URL = "http://purchase_plan.local:81/api/v1/demand_forecast";

export default {
    state: {
        files: []
    },
    mutations: {
        setDemandForecastFiles(state, files) { state.files = files },
        clearDemandForecastFiles(state) { state.files = null },
        deleteDemandForecastFiles(state, index) {
            // Ищем файл с индексом = index
            let elem = state.files.filter(x => x.id === index);
            // Получаем индекс элмента в массиве
            let ind = state.files.indexOf(elem[0]);
            // Удаляем файл из массива файлов
            state.files.splice(ind, 1);
        }
    },
    actions: {
        // Получить все категории
        async getAllDemandForecastFiles({ commit }) {
            // Устанавливаем в заголовки Http токен JWT
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))
            // Запрос к API
            await axios.get(
                API_URL + '/',
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization' : token
                    }
                })
                .then(response => { commit('setDemandForecastFiles', response.data.files) })
                .catch(error => {
                    commit('setMessage', error.response.data.message)
                    throw error;
                });
        },
        async addDemandForecastFile({ commit }, {
            filename,
            method,
            objectAnalysis,
            category = null,
            file = null,
            interval,
            column,
            delimiter,
            period,
        }) {
            // Устанавливаем в заголовки Http токен JWT
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'));
            // Данные для создания новой категории
            const data = JSON.stringify({
                "filename": filename,
                "method": method,
                "object_analysis": objectAnalysis,
                "category": category,
                "file": file,
                "freq": interval,
                "column": column,
                "delimiter": delimiter,
                "period": period
            });
            // Запрос к API
            await axios.post(
                API_URL + '/new',
                data,
                {
                    headers: {
                        'Authorization' : token
                    }
                })
                .then(response => {
                    commit('setMessage', response.data.message);
                })
                .catch(error => {
                    commit('setMessage', error.response.data.message);
                    throw error;
                });
        },
        async delDemandForecastFile({ commit }, { file_id }) {
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
                    commit('deleteDemandForecastFiles', file_id);
                    commit('setMessage', response.data.message);
                })
                .catch(error => {
                    commit('setMessage', error.response.data.message);
                    throw error;
                });
        }
    },
    getters: {
        demandForecastFiles(state) { return state.files; }
    }
}