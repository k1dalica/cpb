<template>
  <div id="gallery-slider">
    <div class="top-wrapper" :class="{ 'smallscreen': !smallscreen }">
      <transition name="slide-fade">
        <aside v-show="smallscreen">
          <div class="info">
            <h2>{{ album.name }}</h2>
            <div v-if="album.images && album.images[selected]">
              <span>{{ album.images[selected].desc || 'There is no description for this photo.' }}</span>
            </div>
          </div>
        </aside>
      </transition>
      <section>
        <div class="icon" id="smallscreen" :class="{ 'right': !smallscreen}" @click="changeFullscreen()"></div>
        <div class="icon" v-if="images.length > 1" id="prev" @click="prev"></div>
        <div class="icon" v-if="images.length > 1" id="next" @click="next"></div>
        <div class="icon" id="close" @click="$emit('close')"></div>
        <div class="image-wrapper">
          <img id="slider-image" :src="selectedImage">
        </div>
      </section>
    </div>
    <div class="slider" v-show="smallscreen">
      <div>
        <img
          v-for="(img, index) in images"
          :key="index"
          :class="{ 'active': index === selected }"
          :src="url + img"
          @click="preview(index)">
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config'

export default {
  props: ['album'],

  data: () => ({
    url: config.url,
    smallscreen: true,
    selected: 0
  }),

  created () {
    document.onkeydown = this.addListeners
    this.smallscreen = localStorage.getItem('fullscreen') !== 'false'
  },

  computed: {
    selectedImage () {
      return this.url + ((this.images.length > 0) ? this.images[this.selected] : this.album.cover)
    },

    images () {
      return this.album.images.map(item => item.path)
    }
  },

  methods: {
    changeFullscreen () {
      this.smallscreen = !this.smallscreen
      localStorage.setItem('fullscreen', this.smallscreen)
    },

    addListeners (e) {
      if (e.keyCode === 37) this.prev()
      if (e.keyCode === 39) this.next()
      if (e.keyCode === 0 || e.keyCode === 32) this.smallscreen = !this.smallscreen
      if (e.keyCode === 27) this.$emit('close')
    },

    preview (index) {
      this.selected = index
    },

    next () {
      this.selected = (this.selected === this.images.length - 1) ? 0 : this.selected + 1
    },

    prev () {
      this.selected = (this.selected === 0) ? this.images.length - 1 : this.selected - 1
    }
  },

  beforeDestroy () {
    document.removeEventListener('onkeydown', this.addListeners, false)
  }
}
</script>

<style lang="scss" scoped>
  #gallery-slider { position: fixed; width: 100%; height: 100%; top: 0; left: 0; background-color: #000; z-index: 10; }
  #gallery-slider .top-wrapper { width: 100%; height: calc(100% - 120px); display: flex; }
  #gallery-slider .top-wrapper aside { width: 100%; max-width: 20%; min-width: 200px; height: 100%; color: #fff; padding: 20px; overflow: hidden; }
  #gallery-slider .top-wrapper aside h2 { font-weight: normal; display: block; text-align: center; font-size: 18px; margin-bottom: 25px; color: #fff; }
  #gallery-slider .top-wrapper aside div { text-align: left; margin-top: 10px; font-weight: 100; font-size: 15px; color: #d2d2d2; }
  #gallery-slider .top-wrapper aside div span { display: block; margin-top: 5px; }
  #gallery-slider .top-wrapper aside div span b { font-weight: normal; color: #0fabd0; }

  #gallery-slider .top-wrapper section { flex-grow: 2; height: 100%; background-color: #121212; position: relative; }
  #gallery-slider .top-wrapper section .icon { opacity: 0.7; background-position: center; background-repeat: no-repeat; position: absolute; top: 0; bottom: 0; margin: auto 0;  width: 50px; height: 50px; }
  #gallery-slider .top-wrapper section .icon:hover { cursor: pointer; opacity: 1;}
  #gallery-slider .top-wrapper section #smallscreen { left: 0px; top: 10px; margin: 0; background-image: url(../../assets/images/left.png); background-color: #000; }
  #gallery-slider .top-wrapper section #smallscreen.right { background-image: url(../../assets/images/right.png); }
  #gallery-slider .top-wrapper section #prev { left: 10px; background-image: url(../../assets/images/prev.png); }
  #gallery-slider .top-wrapper section #next { right: 10px; background-image: url(../../assets/images/next.png); }
  #gallery-slider .top-wrapper section #close { right: 10px; top: 10px; margin: 0; background-image: url(../../assets/images/close.png); }
  #gallery-slider .top-wrapper section .image-wrapper { margin: auto; height: 100%; width: calc(100% - 100px); display: flex; justify-content: center; align-items: center; }
  #gallery-slider .top-wrapper section .image-wrapper img { max-width: 100%; max-height: 100%; }
  #gallery-slider .top-wrapper.smallscreen { height: 100%; }
  #gallery-slider .top-wrapper.smallscreen aside { max-width: 0; min-width: 0; padding: 0; overflow: hidden; }
  #gallery-slider .top-wrapper.smallscreen aside .info { display: none; }
  #gallery-slider .top-wrapper.smallscreen section { width: 100%; max-width: 100%; }
  #gallery-slider .top-wrapper.smallscreen section #smallscreen { left: 0px; top: 10px; margin: 0; background-image: url(../../assets/images/right.png); background-color: #000; }

  #gallery-slider .slider { width: 100%; height: 120px; overflow-x: auto; }
  #gallery-slider .slider div { height: 100%; width: auto; white-space: nowrap; padding: 5px; }
  #gallery-slider .slider div img { height: 100%; display: inline; vertical-align: top; margin-right: 5px; }
  #gallery-slider .slider div img:hover, #gallery-slider .slider div img.active { box-shadow: 0 0 0px 5px #0fabd0; cursor: pointer; }

  .slide-fade-enter-active {
    transition: all .4s ease;
  }
  .slide-fade-leave-active {
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(-10px);
    opacity: 0;
  }
</style>
