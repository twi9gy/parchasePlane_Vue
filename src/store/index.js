import Vue from 'vue'
import Vuex from 'vuex'

import page_service from "./modules/page_service";
import auth_service from "../store/modules/auth_service";
import user_service from "../store/modules/user_service"
import categories_service from "../store/modules/categories_service";
import category_service from "../store/modules/category_service";
import files_service from "./modules/files_service";

import createReport from "./modules/createReport";

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
        createReport,
        page_service,
        auth_service,
        user_service,
        categories_service,
        category_service,
        files_service
    }
})
