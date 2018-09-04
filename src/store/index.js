import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './user'
import clubModule from './club'
import tournamentsModule from './tournaments'
import adminModule from './admin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userModule,
    clubModule,
    tournamentsModule,
    adminModule
  }
})
