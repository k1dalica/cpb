<template>
  <header>
    <div class="title">
      <router-link
        v-if="back"
        :to="back"
        class="back">
        <button class="button is-default">
          <span class="icon">
            <i class="fas fa-arrow-left" />
          </span>
          <span>Back</span>
        </button>
      </router-link>

      <h1>
        {{ title }}
      </h1>
    </div>

    <div class="buttons button-group">
      <slot />
    </div>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },

    back: {
      type: [Object, String],
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
  header {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    .back {
      display: block;
      margin-right: 20px;
    }
    .title {
      display: flex;
      align-items: center;
      h1 {
        font-size: 25px;
        margin: 0;
        padding: 0;
      }
    }

    .buttons {
      justify-self: flex-end;
    }
  }

  @media all and (max-width: 768px) {
    header {
      .title {
        h1 {
          font-size: 18px;
        }
      }
    }
  }
</style>
