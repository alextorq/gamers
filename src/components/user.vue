<template>
    <li class="user__item">
      <div class="user__item-number">{{user.rang}}</div>
      <div :class="firstTree" class="user__item-avatar">
        <img v-if="this.user.avatar !== undefined" :src="user.avatar">
        <p v-else>{{logo}}</p>
      </div>
      <span class="user__item-name">{{user.name}} {{user.secondName}}</span>
      <span class="user__item-age">{{user.age}} лет</span>
      <span class="user__item-rating">{{user.rating}} баллов</span>
    </li>
</template>

<script>
    export default {
        name: "user",
        props: {
          user: {},
          number: ''
        },
        computed: {
            logo: function () {
              //если у пользователя есть картинка то загружаем ее, иначе инициалы
               return `${this.user.name.substring(0, 1)}${this.user.secondName.substring(0, 1)}`
            },
            firstTree(){
              //Выделяем классами первые три игрока
              switch(this.user.rang) {
                case 1:
                  return {'first': true };
                case 2:
                  return {'second': true };
                case 3:
                  return {'third': true };
              }
            }
        },

    }
</script>

<style>

</style>
