<template>
  <div id="app">
    <div class="container">
      <h1>Рейтинг игроков</h1>
      <appUserCatalog></appUserCatalog>
    </div>
  </div>
</template>

<script>
  import appUserCatalog from './components/user_catalog'

export default {
  name: 'app',
  components: {
    appUserCatalog
  },
  created() {
    this.$store.dispatch('firstDownloadUsers');
  }
}
</script>

<style lang="sass">
  @import './sass/main.sass'
</style>
