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
              <button @click="sortBy('age', 'ASC',$event)">по возрастанию</button>
              <button @click="sortBy('age', 'DESC', $event)">по убыванию</button>
            </div>
            <div class="button-group">
               <span>Рейтинг:</span>
                <button @click="sortBy('rating', 'ASC',$event)">по возрастанию</button>
               <button @click="sortBy('rating', 'DESC', $event)">по убыванию</button>
            </div>
        </div>
      </div>
    </li>
    <appUser v-for="(user, index) in users" :key="index" :user="user" v-if="users.length > 0"></appUser>
    <li v-else>Пользователи отстутствуют</li>
    <li>{{countUsers.current}} / {{countUsers.allUsers}} геймеров</li>
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
            activeSortButton : ''
          }
      },
        computed: {
          users() {
            return this.$store.getters.users;
          },
          countUsers() {
            return this.$store.getters.countGamers;
          }
        },
      methods: {
        /**
        * @description Выделение активной кнопки сортировки
        **/
        switchActiveSort(event) {
          let target = event.target;

          if (!this.activeSortButton) {
            target.classList.add('active');
            this.activeSortButton = target;
          } else {
            this.activeSortButton.classList.remove('active');
            target.classList.add('active');
            this.activeSortButton = target;
          }
        },
        sortBy(field, direction, event) {
          this.$store.commit('sortBy', {field, direction});
          this.switchActiveSort(event);
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
