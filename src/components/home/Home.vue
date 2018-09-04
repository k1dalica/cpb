<template>
  <div
    v-if="data"
    class="gallery">
    <Category
      v-for="(category, index) in categories"
      :key="index"
      class="category"
      :title="category"
      :data="index" />
  </div>
</template>

<script>
import Category from './Category'
// import axios from 'axios'

export default {
  name: 'Home',

  components: {
    Category
  },

  data: () => ({
    data: null,
    categories: [
      'Studio Photography',
      'STILL LIFE PHOTOGRAPHY',
      'B&W photography',
      'HEADSHOTS',
      'WEDDING PHOTOGRAPHY',
      'TRAVEL AND OTHER'
    ]
  }),

  created () {
    // let self = this
    // axios.get('http://dev.local/api/albums', { responseType: 'json' }).then(function (res) {
    //   self.data = res.data
    // }).catch(function (error) {
    //   console.log(error)
    // })
  },

  methods: {}
}
</script>

<style scoped>
  .gallery { width: 100%; height: calc(100% - 70px); }
  .category { float: left; width: calc(100% / 6); vertical-align: top; }
</style>
