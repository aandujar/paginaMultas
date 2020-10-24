import axios from 'axios'

const $axios = axios.create({
  baseURL: 'http://aqui iria el endpoint base del api'
})

export default {
    $axios: $axios
};