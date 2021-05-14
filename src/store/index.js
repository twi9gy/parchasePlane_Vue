import Vue from 'vue'
import Vuex from 'vuex'

import page from "./modules/page";
import auth from "./modules/auth";
import user from "./modules/user"
import categories from "./modules/categories";
import saleFiles from "./modules/saleFiles";
import demandForecast from "./modules/demandForecasts";
import plans from "./modules/plans";
import loading from './modules/loading'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoggedIn: false,
        message: null
    },
    actions: {

    },
    mutations: {
        setMessage(state, message) {
            state.message = message;
        },
        clearMessage(state) {
            state.error = null;
        },
    },
    getters : {
        getMessage(state) {
            return state.message;
        }
    },
    modules: {
        page,
        auth,
        user,
        categories,
        saleFiles,
        demandForecast,
        plans,
        loading
    }
})
