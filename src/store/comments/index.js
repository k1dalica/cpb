import * as types from './types'
import { errorHandler } from '@/services/http'

import { getComments, addComment, deleteComment, deleteTaskComments, editComment } from '@/services/api/comments'

const state = {
  comments: []
}

const getters = {
  comments: state => state.comments
}

const actions = {
  editComment ({ commit }, params) {
    return editComment(params)
      .then(() => {
        return commit(types.EDIT_COMMENT, params)
      })
      .catch(err => errorHandler(err))
  },
  deleteComment ({ commit }, id) {
    return deleteComment(id)
      .then(() => {
        return commit(types.REMOVE_COMMENT, id)
      })
      .catch(err => errorHandler(err))
  },
  addComment ({ commit }, params) {
    return addComment(params)
      .then(comment => {
        return commit(types.ADD_COMMENT, comment)
      })
      .catch(err => errorHandler(err))
  },
  deleteTaskComments ({ commit }, id) {
    let params = new URLSearchParams()
    params.append('taskId', id)
    return deleteTaskComments(params)
      .then(() => {
        return commit(types.REMOVE_COMMENT, id)
      })
      .catch(err => errorHandler(err))
  },
  getComments ({ commit, dispatch }, id) {
    let params = new URLSearchParams()
    params.append('taskId', id)
    params.append('_sort', 'id')
    params.append('_order', 'desc')
    return getComments(params)
      .then(res => {
        return commit(types.SET_COMMENTS, res)
      })
      .catch(err => errorHandler(err))
  }
}

const mutations = {
  [ types.SET_COMMENTS ] (state, comments) {
    state.comments = comments
  },
  [ types.REMOVE_COMMENT ] (state, id) {
    let list = []
    state.comments.forEach(comment => {
      if (comment.id !== id) {
        list.push(comment)
      }
    })
    state.comments = list
  },
  [ types.EDIT_COMMENT ] (state, comment) {
    let list = state.comments.map(c => {
      return (c.id === comment.id) ? comment : c
    })
    state.comments = list
  },
  [ types.ADD_COMMENT ] (state, comment) {
    state.comments.unshift(comment)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
