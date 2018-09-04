import http from 'axios'
import { responseTransformer, errorHandler } from '@/services/http'
import store from '@/store'

export function deleteUser (id) {
  return http
    .delete(`user/${id}`)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function loginUser (params) {
  return http
    .post(`login`, params)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function forgotPassword (params) {
  return http
    .post(`forgot-password`, params)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function resetCheck (params) {
  return http
    .post(`reset-check`, params)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function resetPassword (params) {
  return http
    .post(`reset-password/${params.id}`, params)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function registerUser (params) {
  return http
    .post(`register`, params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function registerDataCheck (params) {
  return http
    .post(`register-check`, params)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function checkToken () {
  return http
    .get(`check-token`)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function getUserByName (name) {
  return http
    .get(`users?username=${name}`)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function getUsers () {
  return http
    .get(`users`)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function getCountries () {
  return http
    .get(`countries`)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function isAdmin () {
  let userInfo = store.getters.isAdmin
  return Number(userInfo) === 1
}
