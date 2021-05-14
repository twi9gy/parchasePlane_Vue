import axios from "axios";

const API_URL = "http://purchase_plan.local:81/api/v1/purchase_plan";

export default {
    state: {
        files: [],
        plan: []
    },
    mutations: {
        setPlans(state, files) { state.files = files },
        setPlan(state, plan) {
            
            if (plan.demand) {
                plan.demand = Object.entries(plan.demand);
                plan.demand = plan.demand.map((item) => {
                    return {
                        'Date': new Date(item[0]).toLocaleDateString(),
                        'Count': Math.round(item[1])
                    }
                });
            }

            if (plan.orders_origin) {
                plan.orders_origin = plan.orders_origin.map((item) => {
                    return new Date(item).toLocaleDateString()
                });
            }

            if (plan.orders) {
                plan.orders = Object.entries(plan.orders);
                plan.orders = plan.orders.map((item) => {
                    return {
                        'Date': new Date(item[0]).toLocaleDateString(),
                        'Count': Math.round(item[1])
                    }
                });
            }

            if (plan.product_count) {
                plan.product_count = Object.entries(plan.product_count);
                plan.product_count = plan.product_count.map((item) => {
                    return {
                        'Date': new Date(item[0]).toLocaleDateString(),
                        'Count': Math.round(item[1])
                    }
                });
            }
            
            state.plan = plan
        },
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
        async getPurchasePlans({ dispatch, commit }) {
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
                    if (error.response.data.code === 401) {
                        dispatch('refreshUser')
                    } else {
                        commit('setMessage', error.response.data.message)
                        throw error;
                    }
                });
        },
        async getPurchasePlanByID({ dispatch, commit }, { id }) {
            // Устанавливаем в заголовки Http токен JWT
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))
            // Запрос к API
            await axios.get(
                API_URL + '/' + id,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization' : token
                    }
                })
                .then(response => { commit('setPlan', response.data) })
                .catch(error => {
                    if (error.response.data.code === 401) {
                        dispatch('refreshUser')
                    } else {
                        commit('setMessage', error.response.data.message)
                        throw error;
                    }
                });
        },
        async addPurchasePlan({ dispatch, commit }, formData) {
            // Устанавливаем в заголовки Http токен JWT
            const token = 'Bearer ' + JSON.parse(localStorage.getItem('userToken'));
            // Данные для создания новой категории
            const data = JSON.stringify(formData);
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
                    if (error.response.data.code === 401) {
                        dispatch('refreshUser')
                    } else {
                        commit('setMessage', error.response.data.message);
                        throw error;
                    }
                });
        },
        async delPurchasePlan({ dispatch, commit }, { file_id }) {
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
        plans(state) { return state.files },
        plan(state) { return state.plan }
    }
}
