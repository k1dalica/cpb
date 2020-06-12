<template>
  <div>
    <template v-if="albums && albums.length > 0">
    <article v-for="album in albums" :key="album.id" class="album">
      <router-link :to="{ name: 'vievAlbum', params: { id: album.id } }">
        <div class="size">
          <img :src="url + album.cover" class="img">
          <div class="overflow">
            <h3>{{ album.name }}</h3>
            <span>{{ categories[album.category - 1] }}</span>
          </div>
        </div>
      </router-link>
    </article>
    </template>
    <template v-else>
      <b-notification :closable="false">
        There is no albums in this category yet.
      </b-notification>
    </template>
  </div>
</template>

<script>
import config from '@/config'

export default {
  props: ['albums', 'categories'],

  data: () => ({
    url: config.api
  })
}
</script>

<style lang="scss" scoped>
  article.album { width: 300px; height: 250px; background-color: #fff; display: inline-block; margin: 15px; border-radius: 3px; overflow: hidden; }
  article.album .size { width: 100%; position: relative; }
  article.album .size img { width: 300px; height: 250px; object-fit: cover; }
  article.album .size .overflow { position: absolute; bottom: 0; left: 0; width: 100%; background-color: rgba(0,0,0,0.5); color: #fff; padding: 10px; transition: all ease-out .15s; }
  article.album .size .overflow h3 { font-size: 15px; font-weight: bold; line-height: 1.3; }
  article.album .size .overflow span { font-size: 12px; font-weight: 200; color: #ddd; }
  article.album .size:hover .overflow { cursor: pointer; width: 100%; height: 100%; transition: all ease-out .15s; display: flex; flex-direction: column; justify-content: center; align-items: center; line-height: 1.5; background-color: rgba(0,0,0,0.7) }

</style>
