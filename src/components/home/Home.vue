<template>
  <div class="gallery">
    <div class="main-view">
      <transition name="fade">
        <Preview
          v-if="previewAlbum"
          :album="previewAlbum"
          @close="previewAlbum = null" />
      </transition>

      <category
        v-for="category in categories"
        :key="category.id"
        class="category"
        :category="category"
        :data="albums[category.id]"
        @preview="previewAlbum = $event" />
    </div>

    <category-view class="category-view" />
  </div>
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'

import Preview from './Preview'
import Category from './Category'
import CategoryView from './CategoryView'

export default {
  name: 'Home',

  async beforeRouteEnter (to, from, next) {
    await store.dispatch('getAlbums')
    next()
  },

  components: {
    Preview,
    Category,
    CategoryView
  },

  data: () => ({
    data: null,
    previewAlbum: null
  }),

  computed: {
    ...mapGetters(['albums']),

    categories () {
      return this.$store.state.categories
    }
  }
}
</script>

<style scoped>
  .category-view { display: none; }
  .gallery { width: 100%; height: calc(100% - 70px); }
  .main-view { display: block; width: 100%; height: 100%; display: flex; flex-wrap: wrap; }
  .category { width: calc(100% / 6); }

  .fade-enter-active, .fade-leave-active { transition: opacity .5s; }
  .fade-enter, .fade-leave-to { opacity: 0; }

  @media all and (max-width: 1280px) {
    .category { width: calc(100% / 3); height: 50% !important; }
  }

  @media all and (max-width: 768px) {
    .gallery { height: auto; }
    .category-view { display: block; }
    .main-view { display: none; }
  }
</style>
