<template>
  <div class="gallery" v-if="data">
    <Category class="category" title="Studio Photography" :data="data[1]" />
    <Category class="category" title="STILL LIFE PHOTOGRAPHY" :data="data[2]" />
    <Category class="category" title="B&W photography" :data="data[3]" />
    <Category class="category" title="HEADSHOTS" :data="data[4]" />
    <Category class="category" title="WEDDING PHOTOGRAPHY" :data="data[5]" />
    <Category class="category" title="TRAVEL AND OTHER" :data="data[6]" />
  </div>
</template>

<script>
import Category from './Category'
import axios from 'axios'

export default {
  name: 'Home',
  data () {
    return {
      data: null
    }
  },
  created () {
    let self = this
    axios.get('http://dev.local/api/albums', { responseType: 'json' }).then(function (res) {
      self.data = res.data
    }).catch(function (error) {
      console.log(error)
    })
  },
  methods: {

  },
  components: {
    Category
  }
}
</script>

<style scoped>
  .gallery { width: 100%; height: calc(100% - 70px); }
  .category { float: left; width: calc(100% / 6); vertical-align: top; }
</style>
