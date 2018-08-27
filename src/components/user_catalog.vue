<template>
  <div class="users-catalog">
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
        computed: {
          searchString() {
              return this.$store.state.query;
          },
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
        }
    }
</script>

<style>

</style>
