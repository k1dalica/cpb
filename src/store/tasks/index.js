import * as types from './types'
import Vue from 'vue'
import { errorHandler } from '@/services/http'

import { getTasks, getTask, createTask, editTask, deleteTask } from '@/services/api/tasks'

const state = {
  tasks: [],
  task: null
}

const getters = {
  tasks: state => state.tasks,
  task: state => state.task
}

const actions = {
  editTask ({ commit }, params) {
    return editTask(params)
      .then(res => {
        commit(types.SET_TASK, res)
      })
      .catch(err => errorHandler(err))
  },
  createTask ({ commit }, params) {
    return createTask(params)
      .then(res => res)
      .catch(err => errorHandler(err))
  },
  deleteTask ({ commit }, id) {
    return deleteTask(id)
      .then(res => res)
  },
  getTasks ({ commit }, { username, param }) {
    let params = new URLSearchParams()
    params.append(param, username)
    params.append('_sort', 'id')
    params.append('_order', 'desc')
    return getTasks(params)
      .then(res => {
        commit(types.SET_TASKS, res)
        return res
      })
      .catch(err => errorHandler(err))
  },
  getTask ({ commit }, id) {
    return getTask(id)
      .then(res => {
        if (res) {
          commit(types.SET_TASK, res)
          return res
        } else {
          Vue.router.push({ name: 'Tasks' })
        }
      })
      .catch(err => errorHandler(err))
  }
}

const mutations = {
  [ types.SET_TASKS ] (state, tasks) {
    state.tasks = tasks
  },
  [ types.SET_TASK ] (state, task) {
    state.task = task
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
