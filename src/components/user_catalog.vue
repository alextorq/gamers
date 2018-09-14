<template>
  <ul ref="searchNode" class="users-catalog">
    <appSearch></appSearch>
    <li class="user__item general">
      <div class="user__item-number">#</div>
      <div class="user__item-avatar">АЯ</div>
      <p class="user__item-name">Имя</p>
      <p class="user__item-age">Возраст</p>
      <div class="user__item-rating sort-selector">
          Сортировка
        <div class="sort-direction-wrapper">
            <div class="button-group">
              <span>Возраст:</span>
              <button :class="{active: activeSortButton === 1}" @click="sortBy('age', 'ASC', 1)">по возрастанию</button>
              <button :class="{active: activeSortButton === 2}" @click="sortBy('age', 'DESC', 2)">по убыванию</button>
            </div>
            <div class="button-group">
               <span>Рейтинг:</span>
                <button :class="{active: activeSortButton === 3}" @click="sortBy('rating', 'ASC', 3)">по возрастанию</button>
                <button :class="{active: activeSortButton === 4}" @click="sortBy('rating', 'DESC', 4)">по убыванию</button>
            </div>
        </div>
      </div>
    </li>
    <!--<appUser v-for="(searchUser, index) in searchUsers" :key="index"-->
             <!--:user="searchUser" v-if="searchUser.length > 0"></appUser>-->
    <appUser v-for="(user, index) in users" :key="'gamer_' + index" :user="user"></appUser>
    <!--<li v-else>Пользователи отстутствуют</li>-->
    <!--<li>{{countUsers.current}} / {{countUsers.allUsers}} геймеров</li>-->
  </ul>
</template>


<script>
    import appUser from './user'
    import appSearch from './search'
    export default {
      name: "user_catalog",
      data() {
          return {
            viewportHeight: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
            activeSortButton : 4,
          }
      },
        computed: {
          users() {
            return this.$store.getters.users;
          },
          countUsers() {
            return this.$store.getters.countGamers;
          },
          searchUsers() {
            return this.$store.getters.searchUsers;
          }
        },
      methods: {
        sortBy(field, direction, index) {
          this.$store.commit('sortBy', {field, direction});
          this.activeSortButton = index;
        }
      },
        components: {
          appUser,
          appSearch
        },
      mounted() {
        //Обработчик на скрол для опредиления прокрутки до конца списка
        let self = this;
        let lastTime = performance.now();
        document.addEventListener('scroll', () => {
          let currentTime = performance.now();
          if (currentTime - lastTime > 16) {
            let bottom =  self.$refs.searchNode.getBoundingClientRect().bottom;

            if (self.viewportHeight - bottom > 0) {
              self.$store.dispatch('getUsers');
            }
          }
          lastTime = currentTime;
        });
      }
    }

</script>

<style>

</style>
