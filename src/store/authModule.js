import * as service from '../service/authService.js'

export default {
    namespaced: true,
    state: {
        status: '',
        userProfile: {}
    },
    getters: {
        getUserProfile: (state) => {
            return state.userProfile;
        },
        isAuthenticated: (state) => {
            return true// state.userProfile.hasOwnProperty("id");
        },
        getUserRole: (state) => {
            return ""
            //falta meter el atributo del rol
           // return state.userProfile.;
        },
    },
    mutations: {
        ['SET_STATUS_LOADING']: (state) => {
            state.status = "loading"
        },
        ['SET_STATUS_SUCCESS']: (state) => {
            state.status = "success"
        },
        ['SET_STATUS_ERROR']: (state) => {
            state.status = "error"
        },
        ['SET_USER_PROFILE']: (state, userProfile) => {
            state.userProfile = userProfile;
        }
    },
    actions: {
        login({ commit }, data) {
            return new Promise((resolve, reject) => {
                commit('SET_STATUS_LOADING');
                service.login(data)
                    .then((resp) => {
                        commit('SET_USER_PROFILE', /*  meter aqui el user, propiedad que venga dentro del resp  */)
                        commit('SET_STATUS_SUCCESS')
                        resolve(resp.data)
                    })
                    .catch((err) => {
                        commit('SET_STATUS_ERROR');
                        reject(err)
                    })
            })
        },
    }

}