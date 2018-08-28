<template>
  <div ref="searchNode" class="users-catalog">
    <appSearch></appSearch>
    <div class="user__item general">
      <div class="user__item-number">#</div>
      <div class="user__item-avatar">АЯ</div>
      <p class="user__item-name">Имя</p>
      <p class="user__item-age">Возраст</p>
      <div class="user__item-rating sort-selector">
          Сортировка
        <div class="sort-direction-wrapper">
            <div class="button-group">
              <span>Возраст:</span>
              <button @click="sortAsc('age', $event)">по возрастанию</button>
              <button @click="sortDesc('age', $event)">по убыванию</button>
            </div>
            <div class="button-group">
               <span>Рейтинг:</span>
                <button @click="sortAsc('rating', $event)">по возрастанию</button>
               <button @click="sortDesc('rating', $event)">по убыванию</button>
            </div>
        </div>
      </div>
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
            viewportHeight: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
            activeSortButton : ''
          }
      },
        computed: {
          users() {
            return this.$store.state.users;
          }
        },
      methods: {
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
        sortAsc(field, event) {
          this.$store.commit('sortAsc', field);
          this.switchActiveSort(event);
        },
        sortDesc(field, event){
          this.$store.commit('sortDesc', field);
          this.switchActiveSort(event);
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

</script>

<style>

</style>
