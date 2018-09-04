import axios from 'axios'
import bus from '@/services/bus'
import config from '@/config'
import store from '@/store'

let token = localStorage.getItem('token')

axios.defaults.baseURL = config.api
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded'
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

export function responseTransformer (response) {
  return response ? response.data : null
}

export function errorHandler (error, { showMessage = false } = {}) {
  const errorMessage = error.response ? error.response.data : error
  const statusCode = error.response.status

  if (statusCode === 408 && store.getters.user) {
    bus.$emit('tokenExpiredModal', true)
  }
  if (showMessage && statusCode !== 401) {
    this.$toast.open({ message: errorMessage.error, type: 'is-danger' })
  }

  throw errorMessage
}
