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
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    appUserCatalog
  },
  created() {
    this.$http.get('http://localhost:3000/users').then(response => {
      function sortUsers(a, b) {
        if (b.rating > a.rating){
          return 1
        }
        else if (b.rating < a.rating) {
          return -1;
        }
        else {
          return 0;
        }
      }
      let array = response.body.sort(sortUsers);
      array.forEach(user => {this.$store.state.allUsers.push(user)});
      array.splice(0, 6).forEach(user => {this.$store.state.users.push(user)});
    }, response => {
      console.log(response)
    });
  }
}
</script>

<style lang="sass">
  @import './sass/main.sass'
</style>
