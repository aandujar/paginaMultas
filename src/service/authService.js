import conn from "./connection"

export function login(data) {
    return conn.$axios({
      url: 'aqui habria que meter el resto del endpoint',
      method: 'aqui el metodo, get, post, etc',
     // params: data
     // data: data
    })
  }