import Vue from 'vue'
import Vuex from 'vuex'
import albumsModule from './albums'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [
      {
        id: 1,
        name: 'Animals and Macro Photography'
      },
      {
        id: 2,
        name: 'Still life and Street Photography'
      },
      {
        id: 3,
        name: 'Art Photography'
      },
      {
        id: 4,
        name: 'Headshots'
      },
      {
        id: 5,
        name: 'Wedding Photography'
      },
      {
        id: 6,
        name: 'Travel and Landscape Photography'
      }
    ]
  },

  getters: {
    categoriesName: (state) => state.categories.map(category => category.name)
  },

  modules: {
    albumsModule
  }
})
