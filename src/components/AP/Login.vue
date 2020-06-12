<template>
  <div class="warpper">
    <div class="card">
      <header class="card-header">
        <h2>Login</h2>
      </header>
      <div class="card-content">
        <div class="content">
          <b-field label="Password"
            :type="error ? 'is-danger' : ''">
            <b-input
            type="password"
              v-model="password"
              password-reveal
              :message="error"
              v-on:keyup.enter="login"
              :disabled="loading"
              :loading="loading">
            </b-input>
          </b-field>
          <p class="help is-danger" v-show="error">{{ error }}</p>
        </div>
      </div>
      <footer class="card-footer">
        <button
          :disabled="loading || password === ''"
          class="button is-primary"
          @click="login">Login</button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { login } from '@/services/auth.js'

export default {
  data: () => ({
    error: null,
    loading: false,
    password: ''
  }),

  methods: {
    login () {
      this.error = null
      if (this.password !== '') {
        this.loading = true
        axios.post('md5', { data: this.password })
          .then(res => {
            this.loading = false
            if (login(res.data.data)) {
              this.$router.push({ name: 'AdminHome' })
            } else {
              this.error = 'Wrong password !'
            }
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    border-radius: 3px;
    min-width: 350px;
    max-width: 100%;
    .card-header {
      padding: 20px;
      h2 {
        font-size: 30px;
        font-weight: bold;
      }
    }
    .card-footer {
      padding: 15px 20px;
    }
  }
  .warpper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
