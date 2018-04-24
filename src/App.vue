<template>
  <div id="app">
    <Loader v-if="loader" />

    <MenuNav />
    <router-view/>
  </div>
</template>

<script>
import Loader from './components/Loader'
import MenuNav from './components/MenuNav'

export default {
  name: 'App',
  data () {
    return {
      loader: false
    }
  },
  components: {
    MenuNav,
    Loader
  }
}
</script>

<style>
  @font-face {
    font-family: Blacksword;
    src: url(./assets/fonts/Blacksword.otf);
  }
  @font-face {
    font-family: ChopinScript;
    src: url(./assets/fonts/ChopinScript.otf);
  }

  body, html { width: 100%; height: 100%; min-height: 100%; margin: 0px; padding: 0px; font-family: 'Open Sans', sans-serif; font-weight: normal; background-color: #000; color: #fff; }

  #app { width: 100%; height: 100%; }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  a { text-decoration: none; color: inherit; }
  img { outline: none; border: none; }
  .width-100 { width: 100%; }
  .width { width: 1000px; }
</style>
