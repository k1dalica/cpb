<template>
  <div class="wrapper">
    <!-- <navigation /> -->

    <router-view />
  </div>
</template>

<script>
import Navigation from './common/Navigation'

export default {
  components: { Navigation }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    background-color: #eee;
    width: 100%;
    min-height: 100%;
  }
</style>
