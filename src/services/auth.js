import store from '@/store'

const loggedIn = () => {
  const state = store.getters
  const token = localStorage.getItem('token')
  if (token === null) {
    return false
  } else if (!state.loggedIn && token) {
    return store.dispatch('checkToken')
      .then(res => {
        return token
      })
  } else {
    return true
  }
}

export const isAdmin = () => {
  if (loggedIn()) {
    if (store.getters.user && store.getters.user.admin) {
      let isAdmin = store.getters.user.admin
      return Number(isAdmin) > 0 ? Number(isAdmin) : false
    } else {
      return store.dispatch('checkToken')
        .then(res => {
          let isAdmin = Number(res.data.admin)
          return isAdmin > 0 ? isAdmin : false
        })
    }
  }
  return false
}

// function getToken () {
//   let token = JSON.parse(window.localStorage.getItem(JWT_TOKEN_NAME))
//   if (token === null) {
//     return false
//   } else if (!store.state.userModule.user && token !== null) {
//     store.dispatch('getUser')
//     return token
//   } else {
//     return token
//   }
// }

export default loggedIn
