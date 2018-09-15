<template>
  <li class="user__item search">
    <div class="user__item-number">{{user.rang}}</div>
    <div :class="firstTree" class="user__item-avatar">
      <img v-if="this.user.avatar !== undefined" :src="user.avatar">
      <p v-else>{{logo}}</p>
    </div>
    <p class="user__item-name">{{user.name}} {{user.secondName}}</p>
    <p class="user__item-age">{{user.age}} лет</p>
    <p class="user__item-rating">{{user.rating}} баллов</p>
  </li>
</template>

<script>
  export default {
    name: "search_gamers",
    props: {
      user: {},
      number: ''
    },
    computed: {
      logo: function () {
        //если у пользователя есть картинка то загружаем ее, иначе инициалы
        return `${this.user.name.substring(0, 1)}${this.user.secondName.substring(0, 1)}`
      }
    },

  }
</script>

<style>

</style>
