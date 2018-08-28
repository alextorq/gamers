<template>
    <div class="user__item">
      <div class="user__item-number">{{user.rang}}</div>
      <div :class="firstTree" class="user__item-avatar" v-html="logo"></div>
      <p class="user__item-name">{{user.name}} {{user.secondName}}</p>
      <p class="user__item-age">{{user.age}} лет</p>
      <p class="user__item-rating">{{user.rating}} баллов</p>
    </div>
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
              //если у пользователя есть картинка то загружаем ее иначе инициалы
              let avatar = '';

               if (this.user.avatar) {
                 avatar = `<img src="${this.user.avatar}">`;
               }

               else {
                 avatar = `<p> ${this.user.name.substring(0, 1)}${this.user.secondName.substring(0, 1)}</p>`;
               }

               return avatar;
            },
            firstTree(){
              if (this.user.rang === 1) {
                return {'first': true }
              }
              else if (this.user.rang === 2) {
                return {'second': true }
              }
              else if (this.user.rang === 3) {
                return {'third': true }
              }
            }
        },

    }
</script>

<style>

</style>
