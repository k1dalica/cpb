<template>
  <section class="category">
    <div class="header"><h1>{{ title }}</h1></div>
    <div class="container">
      <div class="album" v-for="album in data" :key="album.id" @click="openAlbum(album.id)">
        <img :src="'http://cpbphotography.com/adminpanel' + album.cover" class="img">
        <div class="info">
          <span>Album name: <font>{{ album.ime }}</font></span>
          <span v-if="!!album.count">Broj fotografija: <font>{{ album.count }}</font></span>
          <span v-if="!!album.fotograf">Photographer: <font>{{ album.fotograf }}</font></span>
          <span v-if="!!album.lokacija">Location: <font>{{ album.lokacija }}</font></span>
          <span v-if="!!album.saradnja">Cooperation: <font>{{ album.saradnja }}</font></span>
          <span v-if="!!album.oprema">Studio equipment: <font>{{ album.oprema }}</font></span>
          <span v-if="!!album.makeup">Makeup by: <font>{{ album.makeup }}</font></span>
          <span v-if="!!album.editorijal">Editorial: <font>{{ album.editorijal }}</font></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Category',
  props: ['title', 'data'],
  data () {
    return {
    }
  },
  created () {
    console.log(this.data)
  },
  methods: {
    openAlbum (aid) {
      console.log(aid)
    }
  }
}
</script>

<style scoped>
  .category { vertical-align: top; display: block; height: 100%; position: relative; }

  .header { height: 40px; line-height: 40px; text-align: center; background-color: #000; position: absolute; top: 0; left: 0; width: 100%; }
  .header h1 { margin: 0; font-weight: normal; font-size: 13px; text-transform: uppercase; }

  .album { width: 100%; position: relative; }
  .album img { width: 100%; display: block; }
  .album .info { opacity: 0; position: absolute; top: 0; left: 0; width: 100%; height: 100%; padding: 20px; background-color: rgba(0,0,0,0.7); font-size: 14px; overflow: hidden; transition: all ease-in-out .2s; }
  .album:hover .info { opacity: 1; }
  .album .info span { display: block; }
  .album .info span font { color: #0fabd0; }

  .container { padding: 40px 0; }
</style>
