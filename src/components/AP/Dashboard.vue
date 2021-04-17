<template>
  <div class="wrapper">
    <router-view />
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .wrapper {
    background-color: #eee;
    width: 100%;
    min-height: 100%;
    color: #000;
    padding: 25px 50px;
  }

  @media all and (max-width: 768px) {
    .wrapper {
      padding: 25px;
    }
  }
</style>
