import * as types from './types'

import { getCoaches, getReferees, getOfficials, getTournamentCompetitors, getTournamentTeams } from '@/services/api/admin'

const state = {
  coaches: null,
  referees: [],
  officials: []
}

const getters = {
  coaches: state => state.coaches,
  referees: state => state.referees,
  officials: state => state.officials
}

const actions = {
  getTournamentCompetitors (data) {
    return getTournamentCompetitors()
      .then(res => res.data)
  },
  getTournamentTeams (data) {
    return getTournamentTeams()
      .then(res => res.data)
  },
  getCoaches ({ commit }) {
    return getCoaches()
      .then(res => {
        commit(types.SET_COACHES, res.data)
      })
  },
  getReferees ({ commit }) {
    return getReferees()
      .then(res => {
        commit(types.SET_REFEREES, res.data)
      })
  },
  getOfficials ({ commit }) {
    return getOfficials()
      .then(res => {
        commit(types.SET_OFFICIALS, res.data)
      })
  }
}

const mutations = {
  [ types.SET_COACHES ] (state, data) {
    state.coaches = data
  },
  [ types.SET_REFEREES ] (state, data) {
    state.referees = data
  },
  [ types.SET_OFFICIALS ] (state, data) {
    state.officials = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
