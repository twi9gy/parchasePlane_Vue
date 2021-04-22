import axios from "axios";

const API_URL = "http://purchase_plan.local:81/api/v1/file/purchase_plan";

export default {
    state: {
        files: []
    },
    mutations: {
        setPlans(state, files) { state.files = files },
        clearPlans(state) { state.files = null },
        deletePlan(state, index) {
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
        async getPurchasePlans({ commit }) {
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
                .then(response => { commit('setPlans', response.data.files) })
                .catch(error => {
                    commit('setMessage', error.response.data.message)
                    throw error;
                });
        },
        async addPurchasePlan({ commit }, {
            filename,
            storage_costs,
            forecastFile,
            shipping_costs,
            deficit_costs,
            time_shipping,
            insurance_reserve
        }) {
            // Устанавливаем в заголовки Http токен JWT
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'));
            // Данные для создания новой категории
            const data = JSON.stringify({
                "filename": filename,
                "storage_costs": storage_costs,
                "forecast_file": forecastFile,
                "shipping_costs": shipping_costs,
                "deficit_costs": deficit_costs,
                "time_shipping": time_shipping,
                "insurance_reserve": insurance_reserve
            });
            // Запрос к API
            await axios.post(
                API_URL + '/new',
                data,
                {
                    headers: { 'Authorization' : token }
                })
                .then(response => {
                    commit('setMessage', response.data.message);
                })
                .catch(error => {
                    commit('setMessage', error.response.data.message);
                    throw error;
                });
        },
        async delPurchasePlan({ commit }, { file_id }) {
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
                    commit('deletePlan', file_id);
                    commit('setMessage', response.data.message);
                })
                .catch(error => {
                    commit('setMessage', error.response.data.message);
                    throw error;
                });
        }
    },
    getters: {
        plans(state) { return state.files; }
    }
}
