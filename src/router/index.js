import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './routes'
import { loggedIn } from '@/services/auth.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (loggedIn()) {
      next()
    } else {
      next({ name: 'Login' })
    }
  }
  next()
})

export default router
