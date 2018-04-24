<template>
  <div id="loader">
    <img src="./../assets/images/logobig.png">
  </div>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style scoped>
  #loader { width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; background-color: #fff; z-index: 99; }
  #loader img { animation-name: spin; animation-duration: 5s; animation-iteration-count: infinite; position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; width: 600px; }

  @keyframes spin {
    0% { transform: rotate3d(0,1,0, 0deg); }
    100% { transform: rotate3d(0,1,0, 360deg); }
  }
</style>
