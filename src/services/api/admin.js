import http from 'axios'
import { responseTransformer, errorHandler } from '@/services/http'

export function getCoaches () {
  return http
    .get(`coaches`)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function getTournamentCompetitors () {
  return http
    .get(`tournament/competitors`)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function getTournamentTeams () {
  return http
    .get(`tournament/teams`)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function getReferees () {
  return http
    .get(`referees`)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}

export function getOfficials () {
  return http
    .get(`officials`)
    .then(responseTransformer)
    .catch(error => errorHandler(error))
}
