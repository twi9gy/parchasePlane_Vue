import axios from "axios";

const API_URL = "/demand_forecast";

export default {
    state: {
        files: [],
        demandForecast: [],
        uri: process.env.VUE_APP_GATEWAY_API + API_URL
    },
    mutations: {
        setDemandForecastFiles(state, files) {
            files.forEach((item) => {
                item.accuracy = String(Math.floor(item.accuracy * 100)) + ' %';
                item.rmse = Math.floor(item.rmse * 100) / 100;
            });
            state.files = files
        },
        clearDemandForecastFiles(state) {
            state.files = null;
            state.demandForecast = null
        },
        setDemandForecast(state, demandForecast) {
            let column = null;
            if (demandForecast.column) {
                column = demandForecast.column;
            }

            if (demandForecast.prediction) {
                demandForecast.prediction = Object.entries(demandForecast.prediction);
                demandForecast.prediction = demandForecast.prediction.map((item) => {
                    return {
                        'Date': new Date(item[0]).toLocaleDateString(),
                        [column]: Math.round(item[1])
                    }
                });
            }

            if (demandForecast.origin_data) {
                demandForecast.origin_data = Object.entries(demandForecast.origin_data);
                demandForecast.origin_data = demandForecast.origin_data.map((item) => {
                    return {
                        'Date': new Date(item[0]).toLocaleDateString(),
                        [column]: Math.floor(item[1] * 100) / 100
                    }
                });
            }

            if (demandForecast.percentage_accuracy) {
                demandForecast.percentage_accuracy = Math.floor(demandForecast.percentage_accuracy * 100) 
            }

            state.demandForecast = demandForecast
        },
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
        async getAllDemandForecastFiles({ dispatch, commit, state }) {
            // Устанавливаем в заголовки Http токен JWT
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))
            // Запрос к API
            await axios.get(
                state.uri + '/',
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization' : token
                    }
                })
                .then(response => { commit('setDemandForecastFiles', response.data.files) })
                .catch(error => {
                    if (error.response.data.code === 401) {
                        dispatch('refreshUser')
                    } else {
                        commit('setMessage', error.response.data.message)
                        throw error;
                    }
                });
        },
        async getDemandForecastByID({ dispatch, commit, state }, { id }) {
            // Устанавливаем в заголовки Http токен JWT
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))
            // Запрос к API
            await axios.get(
                state.uri + '/' + id,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization' : token
                    }
                })
                .then(response => { commit('setDemandForecast', response.data) })
                .catch(error => {
                    if (error.response.data.code === 401) {
                        dispatch('refreshUser')
                    } else {
                        commit('setMessage', error.response.data.message)
                        throw error;
                    }
                });
        },
        async addDemandForecastFile({ dispatch, commit, state }, formData ) {
            // Устанавливаем в заголовки Http токен JWT
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'));
            // Данные для создания новой категории
            const data = JSON.stringify(formData);
            // Запрос к API
            await axios.post(
                state.uri + '/new',
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
                    if (error.response.data.code === 401) {
                        dispatch('refreshUser')
                    } else {
                        commit('setMessage', error.response.data.message);
                        throw error;
                    }
                });
        },
        async delDemandForecastFile({ dispatch, commit, state }, { file_id }) {
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
                    commit('deleteDemandForecastFiles', file_id);
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
        demandForecastFiles(state) { return state.files; },
        demandForecast(state) { return state.demandForecast }
    }
}