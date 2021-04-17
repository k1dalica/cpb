<template>
  <main>
    <navigation title="Albums">
      <router-link :to="{ name: 'createAlbum', params: { id: categoryId } }">
        <button class="button is-info">
          <span class="icon">
            <i class="fa fa-plus" />
          </span>
          <span>Create album</span>
        </button>
      </router-link>
    </navigation>

    <section>
      <category-view admin />
    </section>
  </main>
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'

import Album from './Album'
import Navigation from './common/Navigation'
import CategoryView from '../home/CategoryView'

export default {
  async beforeRouteEnter (to, from, next) {
    await store.dispatch('getAlbums')
    next()
  },

  components: {
    Album,
    Navigation,
    CategoryView
  },

  data: () => ({
    activeTab: 0
  }),

  computed: {
    ...mapGetters(['albums']),

    categoryId () {
      return this.$route.params.id
    },

    categories () {
      return this.$store.getters['categoriesName']
    }
  }
}
</script>

<style lang="scss" scoped>
  .clearfix::after { content: ""; clear: both; display: table; }
  // main { color: #000; padding: 25px 50px; width: 100%; }
  main header { font-size: 40px; width: 100%; margin-bottom: 30px; }
  main header h1 { font-size: 40px; float: left; }
  main header .buttons { float: right; }

  main section { text-align: center; }
  main section article { width: 300px; height: 250px; background-color: #fff; display: inline-block; margin: 15px; border-radius: 3px; overflow: hidden; }
  main section article .size { width: 100%; position: relative; }
  main section article .size img { width: 300px; height: 250px; object-fit: cover; }
  main section article .size .overflow { position: absolute; bottom: 0; left: 0; width: 100%; background-color: rgba(0,0,0,0.5); color: #fff; padding: 10px; transition: all ease-out .15s; }
  main section article .size .overflow h3 { font-size: 15px; font-weight: bold; line-height: 1.3; }
  main section article .size .overflow span { font-size: 12px; font-weight: 200; color: #ddd; }
  main section article .size:hover .overflow { cursor: pointer; width: 100%; height: 100%; transition: all ease-out .15s; display: flex; flex-direction: column; justify-content: center; align-items: center; line-height: 1.5; background-color: rgba(0,0,0,0.7) }

  // .loading { animation-name: spin; animation-duration: 5s; animation-iteration-count: infinite; width: 100%; height: 400px; background-image: url('./../../assets/images/cpb-photography-logo.png'); background-repeat: no-repeat; background-position: center; }

  @keyframes spin {
    0% { transform: rotate3d(0,1,0, 0deg); }
    100% { transform: rotate3d(0,1,0, 360deg); }
  }
</style>
