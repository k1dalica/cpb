<template>
  <div id="app">
    <Loader v-if="loader" />

    <transition name="slide-fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import Loader from './components/common/Loader'
import bus from './services/bus'

export default {
  name: 'App',

  components: {
    Loader
  },

  data: () => ({
    loader: false
  }),

  created () {
    bus.$on('loader', this.toggleLoader)
  },

  methods: {
    toggleLoader (bool) {
      this.loader = bool
    }
  }
}
</script>

<style lang="scss">
  @import 'src/assets/style/reset.scss';
  @import 'src/assets/style/main.scss';
</style>
