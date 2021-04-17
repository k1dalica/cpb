import * as types from './types.js'

import { getAlbums, createAlbum, updateAlbum, getAlbum, deleteAlbum, uploadImages, saveImages, reorderAlbums } from '@/services/api/albums'

const state = {
  albums: [],
  album: null
}

const getters = {
  albums: state => state.albums,
  album: state => state.album
}

const actions = {
  createAlbum ({ commit }, data) {
    return createAlbum(data)
      .then(res => {
        return res.data
      })
  },

  updateAlbum ({ commit }, { id, data }) {
    return updateAlbum(id, data)
      .then(res => {
        commit(types.SET_ALBUM, res.data)
        return res.data
      })
  },

  getAlbums ({ commit }) {
    return getAlbums()
      .then(res => {
        commit(types.SET_ALBUMS, res.data)
        return res.data
      })
  },

  reorderAlbums ({ commit }, data) {
    return reorderAlbums(data).then(res => {
      commit(types.SET_ALBUMS, res.data)
      return res.data
    })
  },

  getAlbum ({ commit }, id) {
    return getAlbum(id)
      .then(res => {
        commit(types.SET_ALBUM, res.data)
        return res.data
      })
  },

  deleteAlbum ({ commit }, id) {
    return deleteAlbum(id)
  },

  uploadImages ({ commit }, { id, data }) {
    return uploadImages(id, data)
      .then(res => {
        commit(types.SET_ALBUM, res.data)
        return res.data
      })
  },

  saveImages ({ commit }, { id, data }) {
    return saveImages(id, data)
      .then(res => {
        commit(types.SET_ALBUM, res.data)
        return res.data
      })
  }
}

const mutations = {
  [ types.SET_ALBUMS ] (state, data) {
    state.albums = data
  },
  [ types.SET_ALBUM ] (state, data) {
    state.album = data
  },
  [ types.ADD_IMAGES_TO_ALBUM ] (state, data) {
    state.album.images.cancat(data)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
