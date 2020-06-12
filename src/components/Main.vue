<template>
  <div class="main">
    <MenuNav />

    <router-view/>
  </div>
</template>

<script>
import MenuNav from './common/MenuNav'

export default {
  components: {
    MenuNav
  }
}
</script>

<style lang="scss" scoped>
  .main { height: 100%; }
</style>
