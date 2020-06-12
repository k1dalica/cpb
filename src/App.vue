<template>
  <div id="app">
    <loader v-if="loader" />

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
    document.addEventListener('contextmenu', event => event.preventDefault())
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

  body, html {
    width: 100%;
    height: 100%;
    min-height: 100%;
    margin: 0px;
    padding: 0px;
    font-family: 'Open Sans', sans-serif;
    font-weight: normal;
    background-color: #000;
    color: #fff;
    overflow: auto;
  }

  #app {
    width: 100%;
    height: 100%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
</style>
