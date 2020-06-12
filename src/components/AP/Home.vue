<template>
  <main>
    <header class="clearfix">
      <h1>Albums</h1>
      <div class="buttons">
        <router-link :to="{ name: 'createAlbum' }">
          <button class="button is-info is-medium">
            <span class="icon">
              <i class="fa fa-plus" />
            </span>
            <span>Create album</span>
          </button>
        </router-link>
      </div>
    </header>
    <section>
    <b-tabs v-model="activeTab">
      <b-tab-item v-for="(cat, index) in categories" :key="cat" :label="cat">
        <album :albums="albums[index + 1]" :categories="categories" />
      </b-tab-item>
    </b-tabs>
    </section>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Album from './Album'

export default {
  components: {
    Album
  },

  data: () => ({
    categories: [
      'Studio Photography',
      'STILL LIFE PHOTOGRAPHY',
      'Art photography',
      'HEADSHOTS',
      'WEDDING PHOTOGRAPHY',
      'TRAVEL AND OTHER'
    ],
    activeTab: 0
  }),

  created () {
    this.getAlbums()
  },

  computed: {
    ...mapGetters(['albums'])
  },

  methods: {
    ...mapActions(['getAlbums'])
  }
}
</script>

<style lang="scss" scoped>
  .clearfix::after { content: ""; clear: both; display: table; }
  main { color: #000; padding: 25px 50px; width: 100%; }
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
