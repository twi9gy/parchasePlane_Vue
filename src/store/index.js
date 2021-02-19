import Vue from 'vue'
import Vuex from 'vuex'
import categories from "./modules/categories";
import files from "./modules/files";
import profile from "./modules/profile";
import createReport from "./modules/createReport";
import pageLayout from "./modules/pageLayout";
import plan from "./modules/plan";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

  },
  actions: {

  },
  mutations: {

  },
  getters : {

  },
  modules: {
    categories,
    profile,
    files,
    createReport,
    pageLayout,
    plan
  }
})
