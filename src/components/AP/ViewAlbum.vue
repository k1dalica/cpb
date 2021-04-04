<template>
 <main v-if="album">
    <header class="clearfix">
      <h1>
        <router-link :to="{ name: 'AdminHome' }">
          <button class="button is-default">
            <span class="icon">
              <i class="fas fa-arrow-left" />
            </span>
            <span>Back</span>
          </button>
        </router-link>
        {{ album.name }}</h1>
      <div class="buttons button-group">
        <b-field class="file">
          <b-upload
            v-model="files"
            :multiple="true"
            :disabled="uploading"
            :class="{ 'is-loading': uploading }"
            accept="image/*">
              <a class="button is-info">
                <span class="icon">
                  <i class="fa fa-plus" />
                </span>
                <span>Add images to album</span>
              </a>
          </b-upload>
        </b-field>
        <router-link :to="{ name: 'editAlbum', params: { id: album.id } }">
          <button class="button is-success">
            <span class="icon">
              <i class="fas fa-edit" />
            </span>
            <span>Edit album</span>
          </button>
        </router-link>
      </div>
    </header>

    <section>
      <div v-if="images.length">
        <div>
          <draggable
            v-model="images"
            handle=".handle">
            <transition-group class="columns is-multiline">
              <div
                v-for="image in images"
                :key="image.id"
                class="column is-3">
                <div class="card">
                  <div class="card-image">
                    <div class="buttons">
                      <button
                        class="button is-small"
                        :class="{ 'is-danger': image.delete }"
                        @click="image.delete = !image.delete; $forceUpdate()">
                        {{ image.delete ? 'Deleted - Undo' : 'Delete' }}
                      </button>
                      <button
                        class="button is-small">
                        <b-icon
                          pack="fas"
                          class="handle"
                          icon=" fa-arrows-alt"
                          size="is-small" />
                      </button>
                    </div>
                    <figure class="image is-4by3">
                      <img :src="url + image.path">
                    </figure>
                  </div>
                  <div class="card-content">
                    <b-input type="textarea" v-model="image.desc" />
                  </div>
                </div>
              </div>
            </transition-group>
          </draggable>
        </div>
        <div class="mt-20">
          <button
            class="button is-large is-info centered"
            :disabled="saving"
            :class="{ 'is-loading': saving }"
            @click="save">
            <span>Save changes</span>
          </button>
        </div>
      </div><div v-else>
        <div class="columns">
          <div class="column">
            <b-notification :closable="false">
              There is no images in this album.
            </b-notification>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import config from '@/config'
import { mapGetters, mapActions } from 'vuex'

import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },

  data: () => ({
    images: [],
    url: config.url,
    files: [],
    uploading: false,
    saving: false
  }),

  watch: {
    files (images) {
      if (images.length > 0) {
        this.upload(images)
      }
    }
  },

  computed: {
    ...mapGetters(['album'])
  },

  async created () {
    await this.getAlbum(this.$route.params.id)
    this.setImages()
  },

  methods: {
    ...mapActions(['getAlbum', 'uploadImages', 'saveImages']),

    setImages () {
      this.images = this.album ? this.album.images.map(item => ({
        ...item,
        delete: false
      })) : []
    },

    upload (images) {
      this.uploading = true
      let data = new FormData()
      images.forEach(item => data.append('images[]', item, item.name))
      this.uploadImages({ id: this.album.id, data })
        .then(res => this.setImages())
    },

    save () {
      this.saving = true
      this.saveImages({ id: this.album.id, data: this.images }).then(() => {
        this.saving = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .centered { display: block; margin: 0 auto; text-align: center; }
  .clearfix::after { content: ""; clear: both; display: table; }

  .card .card-content { padding: 5px; }

  main { color: #000; padding: 25px 50px; width: 100%; }
  main header { font-size: 40px; width: 100%; margin-bottom: 30px; }
  main header h1 { font-size: 40px; float: left; }
  main header .buttons { float: right; }
  main header .buttons .button { float: right; margin-right: 10px; }
  main header .buttons .field { margin-bottom: 0; }

  .image img { object-fit: cover; }

  .card-image { position: relative; }
  .card-image .buttons { width: auto; height: auto; position: absolute; top: 5px; right: 5px; z-index: 5; }
  .card-image:hover .buttons { display: block; }
</style>

<style lang="scss">
  #app .textarea { resize: none; }
</style>
