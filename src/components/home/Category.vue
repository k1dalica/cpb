<template>
  <section class="category">
    <div class="header"><h1>{{ title }}</h1></div>
    <VuePerfectScrollbar
      v-if="data"
      class="scroll-area"
      :settings="settings">
      <div class="container">
        <div class="album" v-for="album in data" :key="album.id" @click="openAlbum(album)">
          <img :src="url + album.cover" class="img">
          <div v-if="false" class="info">
            <span>Album name: <font>{{ album.name }}</font></span>
            <span>Photos: <font>{{ album.images.length }}</font></span>
            <span v-if="album.photographer">Photographer: <font>{{ album.photographer }}</font></span>
            <span v-if="album.location">Location: <font>{{ album.location }}</font></span>
            <span v-if="album.cooperation">Cooperation: <font>{{ album.cooperation }}</font></span>
            <span v-if="album.equipment">Studio equipment: <font>{{ album.equipment }}</font></span>
            <span v-if="album.makeup">Makeup by: <font>{{ album.makeup }}</font></span>
            <span v-if="album.editorial">Editorial: <font>{{ album.editorial }}</font></span>
          </div>
        </div>
      </div>
    </VuePerfectScrollbar>
  </section>
</template>

<script>
import config from '@/config'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  name: 'Category',
  components: {
    VuePerfectScrollbar
  },
  props: ['title', 'data'],
  data: () => ({
    url: config.api,
    settings: {
    }
  }),

  created () {
  },

  methods: {
    openAlbum (album) {
      this.$emit('preview', album)
    },

    onScroll () {}
  }
}
</script>

<style scoped>
  .container { width: 100%; }

  .category { display: block; height: 100%; position: relative; }

  .header { height: 40px; line-height: 40px; text-align: center; background-color: #000; position: relative; top: 0; left: 0; width: 100%; }
  .header h1 { margin: 0; font-weight: normal; font-size: 13px; text-transform: uppercase; color: #fff; }

  .album { width: 100%; position: relative; overflow: hidden; }
  .album:hover { cursor: pointer; }
  .album img { width: 100%; display: block; transition: all ease-in-out .3s; }
  .album .info { opacity: 0; position: absolute; top: 0; left: 0; width: 100%; height: 100%; padding: 20px; background-color: rgba(0,0,0,0.7); font-size: 14px; overflow: hidden; transition: all ease-in-out .2s; }
  .album:hover img { transform: scale(1.2); }
  .album .info span { display: block; color: #fff; }
  .album .info span font { color: #0fabd0; }

  .container { padding: 0; }
</style>

<style lang="scss">
  .scroll-area {
    position: relative;
    margin: auto;
    height: calc(100% - 40px);
  }
</style>
