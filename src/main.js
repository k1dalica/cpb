import Vue from 'vue'
import App from './App'
import router from './router'
import bus from '@/services/bus'
import Vuex from 'vuex'
import store from './store'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import { getFormattedDate } from '@/services/dateFormat'
import config from '@/config'

Vue.use(bus)
Vue.use(Vuex)
Vue.use(Buefy, {
  defaultIconPack: 'fa',
  defaultNoticeQueue: false,
  defaultFirstDayOfWeek: 1,
  defaultDateFormatter: date => {
    return getFormattedDate(date, config.date.displayDate)
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
