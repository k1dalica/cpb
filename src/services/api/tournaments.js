import http from 'axios'
import { responseTransformer, errorHandler } from '@/services/http'

export function getActiveTournament () {
  return http
    .get(`tournament`)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function getPastTournaments () {
  return http
    .get(`tournaments`)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function createTournament (params) {
  return http
    .post(`tournament`, params)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function getDisciplines () {
  return http
    .get(`disciplines`)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function getTournamentDisciplines () {
  return http
    .get(`tournament/disciplines`)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function getCategories () {
  return http
    .get(`categories`)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function createCategory (params) {
  return http
    .post(`category`, params)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function deleteCategory (id) {
  return http
    .delete(`category/${id}`)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function createDiscipline (payload) {
  return http
    .post(`discipline`, payload)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function getFederations () {
  return http
    .get(`tournament/federations`)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function registerTournamentCompetitor (payload) {
  return http
    .post(`register/competitor`, payload)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function registerTournamentTeam (payload) {
  return http
    .post(`register/team`, payload)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function getMyCompetitors () {
  return http
    .get(`tournament/my/competitors`)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function getMyTeams () {
  return http
    .get(`tournament/my/teams`)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function deleteMyCompetitor (id) {
  return http
    .delete(`tournament/my/competitor/${id}`)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function deleteMyTeam (id) {
  return http
    .delete(`tournament/my/team/${id}`)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}
