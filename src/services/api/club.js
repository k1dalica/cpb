import http from 'axios'
import { responseTransformer, errorHandler } from '@/services/http'

export function editClub (params) {
  return http
    .post(`club/edit`, params, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function getUsersClub () {
  return http
    .get(`user-club`)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function getCompetitors () {
  return http
    .get(`club/competitors`)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function getClubs () {
  return http
    .get(`clubs`)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function addCompetitor (params) {
  return http
    .post(`club/competitor`, params, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function editCompetitor (id, params) {
  return http
    .post(`club/competitor/${id}`, params, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function deleteCompetitor (id) {
  return http
    .delete(`club/competitor/${id}`)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}
