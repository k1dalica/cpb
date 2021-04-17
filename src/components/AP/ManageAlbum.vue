<template>
<section class="hero">
  <div class="hero-body">
    <div class="container">
      <navigation
        :title="editMode ? 'Edit Album' : 'Create Album'"
        :back="back" />

      <div class="card">
        <div
          v-if="editMode"
          class="card-image">
          <figure
            v-if="form.img"
            class="image" >
            <img :src="url + form.img">
          </figure>
        </div>
        <div class="card-content">
          <div class="content">
            <b-field label="Category">
              <b-select placeholder="Select a category" :expanded="true" v-model="form.category">
                <option
                  v-for="option in categories"
                  :value="option.id"
                  :key="option.id">
                  {{ option.name }}
                </option>
              </b-select>
            </b-field>

            <b-field
              label="Name"
              :type="$v.form.name.$error ? 'is-danger' : ''"
              :message="$v.form.name.$error ? 'This field is required' : ''">
              <b-input v-model="form.name"></b-input>
            </b-field>

            <b-field label="Description">
              <b-input maxlength="300" type="textarea" v-model="form.desc"></b-input>
            </b-field>

            <b-field label="Photographer">
              <b-input v-model="form.photographer"></b-input>
            </b-field>

            <b-field label="Location">
              <b-input v-model="form.location"></b-input>
            </b-field>

            <b-field label="Cooperation">
              <b-input v-model="form.cooperation"></b-input>
            </b-field>

            <b-field label="Makeup by">
              <b-input v-model="form.makeup"></b-input>
            </b-field>

            <b-field label="Equipment">
              <b-input v-model="form.equipment"></b-input>
            </b-field>

            <b-field label="Editorial">
              <b-input v-model="form.editorial"></b-input>
            </b-field>

            <b-field class="file">
              <b-upload v-model="images">
                <a class="button" :class="!editMode && $v.images.$error ? 'is-danger' : 'is-default'">
                  <span>Click to upload</span>
                </a>
              </b-upload>
              <span class="file-name"
                v-if="images && images.length">
                {{ images[0].name }}
              </span>
            </b-field>

            <div class="has-text-centered">
              <button
                class="button is-info"
                @click="create">
                <span>{{ editMode ? 'Edit Album' : 'Create Album' }}</span>
              </button>
              <div class="mt-15" v-if="editMode">
                <span class="has-text-danger is-size-6 is-link" @click="del">Delete this album</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import store from '@/store'
import config from '@/config'
import bus from '@/services/bus'
import { mapState, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import Navigation from './common/Navigation'

const beforeRoute = async (to, from, next) => {
  const promise = to.name === 'EditAlbum' ? store.dispatch('getAlbum', to.params.id) : Promise.resolve()
  await promise
  next()
}

export default {
  beforeRouteEnter: beforeRoute,
  beforeRouteUpdate: beforeRoute,

  components: { Navigation },

  data: () => ({
    url: config.url,
    images: [],
    form: {
      name: '',
      desc: '',
      photographer: '',
      location: '',
      cooperation: '',
      makeup: '',
      equipment: '',
      editorial: '',
      category: 1,
      images: [],
      cover: null
    }
  }),

  computed: {
    ...mapState(['categories']),

    back () {
      return {
        name: this.editMode ? 'ViewAlbum' : 'AdminHome',
        params: {
          id: this.$route.params.id
        }
      }
    },

    editMode () {
      return this.$route.name === 'EditAlbum'
    },

    album () {
      return this.$store.state.albumsModule.album
    }
  },

  created () {
    this.form.category = this.$route.params.id
    if (this.editMode) {
      this.setData()
    }
  },

  methods: {
    ...mapActions(['createAlbum', 'updateAlbum', 'deleteAlbum']),

    setData () {
      this.form = this.album
      this.form.desc = this.album.desc.replace(/<br \/>/g, '')
      this.form.images = []
      this.form.img = this.album.cover
      this.form.cover = null
    },

    del () {
      this.$dialog.confirm({
        title: 'Deleting album',
        message: 'Are you sure you want to <b>delete</b> this album?',
        confirmText: 'Delete',
        type: 'is-danger',
        onConfirm: () => {
          this.deleteAlbum(this.form.id)
            .then(res => {
              this.$router.push({ name: 'AdminHome' })
              this.$toast.open({
                message: `Album successfully deleted !`,
                type: 'is-success'
              })
            })
        }
      })
    },

    async create () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        bus.$emit('loader', true)
        let data = new FormData()
        Object.keys(this.form).forEach(key => data.append(key, this.form[key]))

        const promise = this.editMode ? this.updateAlbum({ id: this.form.id, data }) : this.createAlbum(data)
        const res = await promise
        this.$router.push({ name: 'ViewAlbum', params: { id: res.id } })
        bus.$emit('loader', false)
      }
    }
  },

  watch: {
    images (images) {
      this.form.cover = images[0]
    }
  },

  validations () {
    let data = {
      form: {
        name: { required }
      }
    }
    if (!this.editMode) {
      data.images = { required }
    }
    return data
  }
}
</script>

<style lang="scss" scoped>
  .is-link { cursor: pointer; }
  .center { margin: 0 auto; }
  .hero-body { background-color: #eee; padding: 0; }
  .container { width: 100%; max-width: 600px; }
  .card {  margin: 0 auto; }
  .hero .hero-body .container .subtitle { cursor: pointer; }
  .mt-15 { margin-top: 15px; }
</style>
