<template>
<section class="hero">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">{{ editMode ? 'Edit Album' : 'Create Album' }}</h1>
      <h2 class="subtitle is-link" @click="back">
        <span class="icon">
          <i class="fas fa-arrow-left" />
        </span>
        Back
      </h2>
      <div class="card">
        <div
          v-if="editMode"
          class="card-image">
          <figure
            v-if="form.img"
            class="image is-4by3" >
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
                class="button is-info
                is-large"
                @click="create">
                <span>{{ editMode ? 'Edit Album' : 'Create Album' }}</span>
              </button>
              <div class="mt-15" v-if="editMode">
                <span class="has-text-danger is-size-5 is-link" @click="del">Delete this album</span>
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
import config from '@/config'
import bus from '@/services/bus'
import { mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    url: config.url,
    editMode: false,
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
    },
    categories: [
      {
        id: 1,
        name: 'Studio Photography'
      },
      {
        id: 2,
        name: 'STILL LIFE PHOTOGRAPHY'
      },
      {
        id: 3,
        name: 'Art photography'
      },
      {
        id: 4,
        name: 'HEADSHOTS'
      },
      {
        id: 5,
        name: 'WEDDING PHOTOGRAPHY'
      },
      {
        id: 6,
        name: 'TRAVEL AND OTHER'
      }
    ]
  }),

  created () {
    if (this.$route.name === 'editAlbum') {
      this.editMode = true
      this.getAlbum(this.$route.params.id)
        .then(res => {
          this.setData(res)
        })
    }
  },

  methods: {
    ...mapActions(['createAlbum', 'updateAlbum', 'getAlbum', 'deleteAlbum']),
    setData (res) {
      this.form = res
      this.form.desc = res.desc.replace(/<br \/>/g, '')
      this.form.images = []
      this.form.img = res.cover
      this.form.cover = null
    },

    back () {
      this.$router.go(-1)
    },

    del () {
      this.$dialog.confirm({
        title: 'Deleting album',
        message: 'Are you sure you want to <b>delete</b> this album.',
        confirmText: 'Delete',
        type: 'is-danger',
        onConfirm: () => {
          this.deleteAlbum(this.album.id)
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

    create () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        bus.$emit('loader', true)
        let data = new FormData()
        Object.keys(this.form).forEach(key => data.append(key, this.form[key]))
        if (!this.editMode) {
          this.createAlbum(data)
            .then(res => {
              this.$router.push({ name: 'vievAlbum', params: { id: res.id } })
              bus.$emit('loader', false)
            })
        } else {
          this.updateAlbum({ id: this.form.id, data })
            .then(res => {
              this.images = []
              this.setData(res)
              bus.$emit('loader', false)
            })
        }
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
  .hero-body { background-color: #eee; }
  .container { padding: 50px; width: 100%; max-width: 600px; }
  .card {  margin: 0 auto; }
  .hero .hero-body .container .subtitle { cursor: pointer; }
  .mt-15 { margin-top: 15px; }

  @media all and (max-width: 600px) {
     .container { padding: 0px; }
}
</style>
