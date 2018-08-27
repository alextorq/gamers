<template>
    <div class="user__item">
      <div class="user__item-number">{{user.rang}}</div>
      <div class="user__item-avatar" v-html="logo"></div>
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
              let avat = '';
               if (this.user.avatar) {
                 avat = `<img src="${this.user.avatar}">`;
               }
               else {
                 avat = `<p> ${this.user.name.substring(0, 1)}${this.user.secondName.substring(0, 1)}</p>`;
               }
               return avat;
            }
        }
    }
</script>

<style>

</style>
