<template>
  <div ref="searchNode" class="users-catalog">
    <appSearch></appSearch>
    <div class="user__item general">
      <div class="user__item-number">#</div>
      <div class="user__item-avatar">АЯ</div>
      <p class="user__item-name">Имя</p>
      <p class="user__item-age">
        <button @click="sortInc('age')">+</button>
        Возраст
        <button @click="sortDecr('age')">-</button>
      </p>
      <p class="user__item-rating">
        <button @click="sortInc('rating')">+</button>
        Рейтинг
        <button @click="sortDecr('rating')">-</button>
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
        sortInc(field) {
          this.$store.commit('sortInc', field);
        },
        sortDecr(field){
          this.$store.commit('sortDecr', field);
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
