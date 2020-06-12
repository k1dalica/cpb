import axios from 'axios'
import { responseTransformer, errorHandler } from '@/services/http'

export function getAlbums () {
  return axios.get(`albums`)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function createAlbum (data) {
  return axios.post(`album`, data)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function updateAlbum (id, data) {
  return axios.post(`album/${id}/edit`, data)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function getAlbum (id) {
  return axios.get(`album/${id}`)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function deleteAlbum (id) {
  return axios.delete(`album/${id}`)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function uploadImages (id, data) {
  return axios.post(`album/${id}/images`, data)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function saveImages (id, data) {
  return axios.put(`album/${id}/images`, { images: data })
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}
