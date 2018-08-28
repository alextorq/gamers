<template>
  <div ref="searchNode" class="users-catalog">
    <appSearch></appSearch>
    <div class="user__item general">
      <div class="user__item-number">#</div>
      <div class="user__item-avatar">АЯ</div>
      <p class="user__item-name">Имя</p>
      <p class="user__item-age">
        <button @click="sortAsc('age')">+</button>
        Возраст
        <button @click="sortDesc('age')">-</button>
      </p>
      <p class="user__item-rating">
        <button @click="sortAsc('rating')">+</button>
        Рейтинг
        <button @click="sortDesc('rating')">-</button>
      </p>
    </div>
    <appUser v-for="(user, index) in users" :key="index" :user="user"></appUser>
  </div>
</template>


<script>
    import appUser from './user'
    import appSearch from './search'
    export default {
        name: "user_catalog",
      data() {
          return {
            viewportHeight: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
          }
      },
        computed: {
          users() {
            return this.$store.state.users;
          }
        },
      methods: {
        sortAsc(field) {
          this.$store.commit('sortAsc', field);
        },
        sortDesc(field){
          this.$store.commit('sortDesc', field);
        }
      },
        components: {
          appUser,
          appSearch
        },
      mounted() {
        let self = this;
        document.addEventListener('scroll', function() {
          let bottom =  self.$refs.searchNode.getBoundingClientRect().bottom;
          if (self.viewportHeight - bottom > 0) {
            self.$store.dispatch('getUsers');
          }
        });
      }
    }
    /**
      @todo Сделать активную кнопку сортировки
     **/

</script>

<style>

</style>
