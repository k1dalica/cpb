<template>
  <div>
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
