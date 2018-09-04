import * as types from './types'

import {
  getActiveTournament,
  getDisciplines,
  createDiscipline,
  createTournament,
  getPastTournaments,
  getCategories,
  createCategory,
  deleteCategory,
  getFederations,
  registerTournamentCompetitor,
  registerTournamentTeam,
  getTournamentDisciplines,
  getMyCompetitors,
  getMyTeams,
  deleteMyCompetitor,
  deleteMyTeam
} from '@/services/api/tournaments'

const state = {
  tournaments: [],
  tournament: null,
  disciplines: null,
  categories: null,
  federations: null,
  myCompetitors: null,
  myTeams: null
}

const getters = {
  tournaments: state => state.tournaments,
  activeTournament: state => state.tournament,
  disciplines: state => state.disciplines,
  categories: state => state.categories,
  federations: state => state.federations,
  myCompetitors: state => state.myCompetitors,
  myTeams: state => state.myTeams
}

const actions = {
  /* TOURNAMENTS */
  createTournament ({ commit }, params) {
    return createTournament(params)
      .then(res => commit(types.SET_ACTIVE_TOURNAMENT, res.data))
  },
  getPastTournaments ({ commit }) {
    return getPastTournaments()
      .then(res => commit(types.SET_TOURNAMENTS, res.data))
  },
  getActiveTournament ({ commit }) {
    return getActiveTournament()
      .then(res => commit(types.SET_ACTIVE_TOURNAMENT, res.data))
  },
  /* DISCIPLINES */
  getDisciplines ({ commit }) {
    return getDisciplines()
      .then(res => commit(types.SET_DISCIPLINES, res.data))
  },
  getTournamentDisciplines ({ commit }) {
    return getTournamentDisciplines()
      .then(res => commit(types.SET_DISCIPLINES, res.data))
  },
  addDiscipline ({ commit }, params) {
    return createDiscipline(params)
      .then(res => commit(types.SET_DISCIPLINES, res.data))
  },
  /* CATEGORIES */
  getCategories ({ commit }) {
    return getCategories()
      .then(res => commit(types.SET_CATEGORIES, res.data))
  },
  createCategory ({ commit }, params) {
    return createCategory(params)
      .then(res => commit(types.SET_CATEGORIES, res.data))
  },
  deleteCategory ({ commit }, id) {
    return deleteCategory(id)
      .then(res => commit(types.SET_CATEGORIES, res.data))
  },
  /* FEDERATIONS */
  getFederations ({ commit }) {
    return getFederations()
      .then(res => commit(types.SET_FEDERATIONS, res.data))
  },
  /* REGISTRATIONS */
  registerTournamentCompetitor ({commit}, payload) {
    return registerTournamentCompetitor(payload)
      .then(res => commit(types.SET_MY_COMPETITORS, res.data))
  },
  registerTournamentTeam ({ commit }, payload) {
    return registerTournamentTeam(payload)
      .then(res => commit(types.SET_MY_TEAMS, res.data))
  },
  /* MY COMPETITORS */
  getMyCompetitors ({ commit }) {
    return getMyCompetitors()
      .then(res => commit(types.SET_MY_COMPETITORS, res.data))
  },
  getMyTeams ({ commit }) {
    return getMyTeams()
      .then(res => commit(types.SET_MY_TEAMS, res.data))
  },
  deleteMyCompetitor ({ commit }, payload) {
    return deleteMyCompetitor(payload)
      .then(res => commit(types.SET_MY_COMPETITORS, res.data))
  },
  deleteMyTeam ({ commit }, payload) {
    return deleteMyTeam(payload)
      .then(res => commit(types.SET_MY_TEAMS, res.data))
  }
}

const mutations = {
  [ types.SET_TOURNAMENTS ] (state, tournaments) {
    state.tournaments = tournaments
  },
  [ types.SET_ACTIVE_TOURNAMENT ] (state, tournament) {
    state.tournament = tournament
  },
  [ types.SET_DISCIPLINES ] (state, disciplines) {
    state.disciplines = disciplines
  },
  [ types.SET_CATEGORIES ] (state, categories) {
    state.categories = categories
  },
  [ types.SET_FEDERATIONS ] (state, federations) {
    state.federations = federations
  },
  [ types.SET_MY_COMPETITORS ] (state, competitors) {
    state.myCompetitors = competitors
  },
  [ types.SET_MY_TEAMS ] (state, teams) {
    state.myTeams = teams
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
