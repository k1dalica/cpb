<template>
  <div v-if="albums" class="gallery">
    <transition name="fade">
      <Preview
        v-if="previewAlbum"
        :album="previewAlbum"
        @close="previewAlbum = null" />
    </transition>

    <category
      v-for="(category, index) in categories"
      :key="index"
      class="category"
      :title="category"
      :data="albums[index + 1]"
      @preview="previewAlbum = $event" />
  </div>
</template>

<script>
import bus from '@/services/bus'
import { mapActions, mapGetters } from 'vuex'

import Preview from './Preview'
import Category from './Category'

export default {
  name: 'Home',

  components: {
    Preview,
    Category
  },

  data: () => ({
    data: null,
    previewAlbum: null,
    categories: [
      'Studio Photography',
      'STILL LIFE PHOTOGRAPHY',
      'Art photography',
      'HEADSHOTS',
      'WEDDING PHOTOGRAPHY',
      'TRAVEL AND OTHER'
    ]
  }),

  created () {
    bus.$emit('loader', true)
    this.getAlbums()
      .then(() => bus.$emit('loader', false))
  },

  computed: {
    ...mapGetters(['albums'])
  },

  methods: {
    ...mapActions(['getAlbums'])
  }
}
</script>

<style scoped>
  .gallery { width: 100%; height: calc(100% - 70px); }
  .category { float: left; width: calc(100% / 6); vertical-align: top; }

  .fade-enter-active, .fade-leave-active { transition: opacity .5s; }
  .fade-enter, .fade-leave-to { opacity: 0; }
</style>
