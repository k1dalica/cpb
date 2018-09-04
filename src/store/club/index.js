import * as types from './types'

import {
  editClub,
  getUsersClub,
  getClubs,
  getCompetitors,
  addCompetitor,
  deleteCompetitor,
  editCompetitor
} from '@/services/api/club'

const state = {
  club: null,
  clubs: [],
  competitors: []
}

const getters = {
  club: state => state.club,
  clubs: state => state.clubs,
  competitors: state => state.competitors
}

const actions = {
  getUsersClub ({ commit }) {
    return getUsersClub()
      .then(club => {
        commit(types.SET_CLUB, club.data)
      })
  },
  editClub ({ commit }, params) {
    return editClub(params)
      .then(club => {
        return commit(types.SET_CLUB, club.data)
      })
  },
  getClubs ({commit}) {
    return getClubs()
      .then((clubs) => {
        commit(types.SET_CLUBS, clubs.data)
      })
  },
  getCompetitors ({ commit }) {
    return getCompetitors()
      .then(competitors => {
        commit(types.SET_COMPETITORS, competitors.data)
        return competitors.data
      })
  },
  deleteCompetitor ({ commit }, id) {
    return deleteCompetitor(id)
      .then(competitors => {
        commit(types.SET_COMPETITORS, competitors.data)
      })
  },
  addCompetitor ({ commit }, params) {
    return addCompetitor(params)
      .then(competitors => {
        commit(types.SET_COMPETITORS, competitors.data)
      })
  },
  editCompetitor ({ commit }, { id, params }) {
    return editCompetitor(id, params)
      .then(competitors => {
        commit(types.SET_COMPETITORS, competitors.data)
      })
  }
}

const mutations = {
  [ types.SET_CLUB ] (state, club) {
    state.club = club
  },
  [ types.SET_CLUBS ] (state, clubs) {
    state.clubs = clubs
  },
  [ types.SET_COMPETITORS ] (state, competitors) {
    state.competitors = competitors
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
