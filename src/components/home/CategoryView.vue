<template>
  <div>
    <nav>
      <ul>
        <li
          v-for="category in categories"
          :key="category.id">
          <router-link :to="{ name: admin ? 'AdminHome' : 'CategoryView', params: { id: category.id } }">
            {{ category.name }}
          </router-link>
        </li>
      </ul>
    </nav>

    <album :albums="albums[categoryId]" :categories="categories" :admin="admin" />
  </div>
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'

import Album from '../AP/Album'

export default {
  async beforeRouteEnter (to, from, next) {
    await store.dispatch('getAlbums')
    next()
  },

  props: {
    admin: {
      type: Boolean,
      default: false
    }
  },

  components: {
    Album
  },

  computed: {
    ...mapGetters(['albums']),

    categories () {
      return this.$store.state.categories
    },

    categoryId () {
      return this.$route.params.id || 1
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  display: block;
  padding: 20px 20px 0 20px;
  ul {
    margin: 0;
    padding: 0;
    text-align: center;
    li {
      display: inline-block;
      margin: 0 10px;
      a {
        &:hover {
          color: #0fabd0;
        }
        &.router-link-exact-active {
          font-weight: bold;
          color: #0fabd0;
        }
      }
    }
  }
}
</style>
