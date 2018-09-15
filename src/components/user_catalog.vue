<template>
  <ul ref="searchNode" class="users-catalog">
    <appSearch></appSearch>
    <li class="user__item general">
      <span class="user__item-number">#</span>
      <span class="user__item-avatar">АЯ</span>
      <span class="user__item-name">Имя</span>
      <span class="user__item-age">Возраст</span>
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
    <template v-if="!searchStatus">
      <appUser v-for="(user, index) in users" :key="'gamer_' + index" :user="user" ></appUser>
    </template>
    <template v-else>
      <appUser v-for="(searchUser, index) in searchUsers" :key="'search' + index" :user="searchUser"></appUser>
    </template>
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
          searchUsers() {
            return this.$store.getters.searchUsers;
          },
          searchStatus() {
            return this.$store.getters.searchStatus;
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
          if (currentTime - lastTime > 16 && !self.searchStatus) {
            let bottom =  self.$refs.searchNode.getBoundingClientRect().bottom;

            if (self.viewportHeight - bottom > 0) {
              self.$store.dispatch('getUsers');
            }
          }
          lastTime = currentTime;
        }, {passive: true});
      }
    }

</script>

<style>

</style>
