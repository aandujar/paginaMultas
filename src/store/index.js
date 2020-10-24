import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './authModule'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth: authModule
    }
})

export default store;
