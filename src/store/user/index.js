import * as types from './types'
import Vue from 'vue'
import axios from 'axios'

import {
  loginUser,
  checkToken,
  registerUser,
  registerDataCheck,
  getUsers,
  getCountries,
  forgotPassword,
  resetCheck,
  resetPassword,
  deleteUser
} from '@/services/api/user'

const state = {
  loggedIn: false,
  user: null,
  isAdmin: null,
  users: [],
  reloadPage: ''
}

const getters = {
  loggedIn: state => state.loggedIn,
  user: state => state.user,
  isAdmin: state => state.isAdmin,
  users: state => state.users,
  reloadPage: state => state.reloadPage
}

const actions = {
  setReloadPage ({ commit }, page) {
    commit(types.SET_RELOAD_PAGE, page)
  },
  setUserDataAfterLogin ({ commit, dispatch }, user) {
    dispatch('rememberUser', user.data.token)
      .then(() => {
        if (parseInt(user.data.admin) < 2) {
          dispatch('getUsersClub')
          dispatch('getActiveTournament')
        }
      })
    commit(types.SET_USER, user.data)
    commit(types.SET_ADMIN, user.data)
  },
  loginUser ({ dispatch }, params) {
    return loginUser(params)
      .then(user => dispatch('setUserDataAfterLogin', user))
  },
  deleteUser ({ commit }, id) {
    return deleteUser(id)
      .then(users => commit(types.SET_USERS, users.data))
  },
  resetPassword ({ dispatch }, params) {
    return resetPassword(params)
      .then(user => dispatch('setUserDataAfterLogin', user))
  },
  resetCheck (payload, params) {
    return resetCheck(params)
      .then(res => res.data)
  },
  forgotPassword (payload, params) {
    return forgotPassword(params)
  },
  registerUser ({ dispatch }, params) {
    return registerUser(params)
      .then(user => {
        dispatch('setUserDataAfterLogin', user)
      })
  },
  registerDataCheck ({ commit }, params) {
    return registerDataCheck(params)
      .then(() => {})
  },
  checkToken ({ commit, dispatch }) {
    return checkToken()
      .then(user => {
        commit(types.SET_USER, user.data)
        commit(types.SET_ADMIN, user.data)
        if (parseInt(user.data.admin) < 2) {
          dispatch('getUsersClub')
        }
        dispatch('getActiveTournament')
        return user
      })
      .catch(() => {
        dispatch('logoutUser')
        return false
      })
  },
  rememberUser ({ commit }, token) {
    axios.defaults.headers.common['Authorization'] = token
    localStorage.setItem('token', token)
  },
  logoutUser ({ commit }) {
    localStorage.removeItem('token')
    Vue.router.push({ name: 'Login' })
    return commit(types.SET_USER, null)
  },
  getUsers ({ commit }) {
    return getUsers()
      .then(users => {
        commit(types.SET_USERS, users.data)
      })
  },
  getCountries ({ commit }) {
    return getCountries()
      .then(c => {
        return c.data
      })
  }
}

const mutations = {
  [ types.SET_USER ] (state, user) {
    state.user = user
    state.loggedIn = (user !== null)
  },
  [ types.SET_ADMIN ] (state, user) {
    state.isAdmin = user.admin
  },
  [ types.SET_RELOAD_PAGE ] (state, page) {
    state.reloadPage = page
  },
  [ types.SET_USERS ] (state, users) {
    state.users = users
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
