<template>
  <div class="users-catalog">
    <div class="user__item general">
      <div class="user__item-avatar">АЯ</div>
      <p class="user__item-name">Имя</p>
      <p class="user__item-age">
        <button @click="sortInc('age')">+</button>
        <button @click="sortDecr('age')">-</button>
      </p>
      <p class="user__item-rating">
        <button @click="sortInc('rating')">+</button>
        <button @click="sortDecr('rating')">-</button>
      </p>
    </div>

    <appUser v-for="(user, index) in users" :id="index" :key="index" :user="user"></appUser>
  </div>
</template>

<script>
    import appUser from './user'
    export default {
        name: "user_catalog",
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
          appUser
        }
    }
</script>

<style>

</style>
