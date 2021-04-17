<template>
  <div>
    <template v-if="albums && albums.length > 0">
      <draggable
        v-if="admin"
        v-model="reordelableAlbums"
        handle=".handle"
        class="draggable"
        @change="saveReorder()">
        <transition-group class="albums">
          <div
            v-for="album in reordelableAlbums"
            :key="album.id"
            class="wrapper">
            <router-link :to="{ name: 'ViewAlbum', params: { id: album.id } }">
              <article
                class="album"
                :style="{ 'background-image': `url(${url + album.cover})` }">
                <button class="button handle is-small">
                  <b-icon
                    pack="fas"
                    icon=" fa-arrows-alt"
                    size="is-small" />
                </button>
                <div class="overflow">
                  <h3>{{ album.name }}</h3>
                </div>
              </article>
            </router-link>
          </div>
        </transition-group>
      </draggable>

      <div v-else class="albums padding">
        <div
          v-for="album in reordelableAlbums"
          :key="album.id"
          class="wrapper">
          <article
            class="album"
            :style="{ 'background-image': `url(${url + album.cover})` }"
            @click="previewAlbum = album">
            <div class="overflow">
              <h3>{{ album.name }}</h3>
            </div>
          </article>
        </div>
      </div>
    </template>

    <template v-else>
      <b-notification :closable="false">
        There is no albums in this category yet.
      </b-notification>
    </template>
    <transition name="fade">
      <Preview
        v-if="previewAlbum"
        :album="previewAlbum"
        @close="previewAlbum = null" />
    </transition>
  </div>
</template>

<script>
import config from '@/config'
import { mapActions } from 'vuex'
import draggable from 'vuedraggable'

import Preview from '../home/Preview'

export default {
  props: {
    albums: {
      type: Array,
      required: true
    },

    admin: {
      type: Boolean,
      default: false
    }
  },

  components: {
    Preview,
    draggable
  },

  data: () => ({
    reordelableAlbums: [],
    url: config.api,
    previewAlbum: null
  }),

  watch: {
    albums: {
      handler (albums) {
        this.reordelableAlbums = albums ? [...albums] : []
      },
      immediate: true
    }
  },

  methods: {
    ...mapActions(['reorderAlbums']),

    saveReorder () {
      this.reorderAlbums(this.reordelableAlbums.map(album => album.id))
    }
  }
}
</script>

<style lang="scss" scoped>
  .draggable {
    width: 100%;
  }

  .albums {
    display: flex;
    flex-wrap: wrap;
    &.padding {
      padding: 10px;
    }
    .wrapper {
      width: calc(100% / 4);
      padding: 20px;
    }
  }

  .album {
    width: 100%;
    padding-bottom: 67%;
    position: relative;
    background-size: cover;
    background-position: center;
    border-radius: 5px;
    overflow: hidden;
    .overflow {
      position: absolute;
      bottom: 0; left: 0;
      width: 100%;
      background-color: rgba(0,0,0,0.5);
      color: #fff;
      padding: 10px;
      transition: all ease-out .15s;
      cursor: pointer;
    }
    .handle {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 5;
    }
    &:hover {
      cursor: pointer;
      .overflow {
        background-color: rgba(0,0,0,0.9);
        padding: 15px;
        font-size: 17px;
      }
    }
  }

  @media all and (max-width: 1600px) {
    .albums {
      .wrapper {
        width: calc(100% / 3);
      }
    }
  }

  @media all and (max-width: 1100px) {
    .albums {
      .wrapper {
        width: 50%;
      }
    }
  }

  @media all and (max-width: 650px) {
    .albums {
      .wrapper {
        width: 100%;
      }
    }
  }
</style>
