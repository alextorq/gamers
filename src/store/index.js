import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    users: [],
    usersСache: [],
    allUsers: [],
    countUser: Math.ceil((Math.max(document.documentElement.clientHeight, window.innerHeight || 0) -300 ) / 60) || 7,
    //расчитываем количество игроков для подгрузки в зависимости от viewport height
    //300 и 60 расчитаны опытным путем
    page: 1,
    maxPage: 1,
    sortDirection: 'sortDesc',
    sortField: 'rating'
  },
  actions: {
    getUsers(context) {
      setTimeout(() => {
        context.state.allUsers.splice(
          context.state.countUser * context.state.page, context.state.countUser * (++context.state.page)
        ).forEach(user => {context.state.users.push(user)});
        //нарезаем новых пользователей
        context.state.page = Math.min(context.state.maxPage, context.state.page++);
        // обновляем номер текущей страницы
        context.commit(`${context.state.sortDirection}`, `${context.state.sortField}`);
        //Смотрим сортировку и обновляем
      }, 100)
      //эмулируем зарузку с сервера
    },
    firstDownloadUsers(context, payload) {
      payload.$http.get('http://localhost:3000/users').then(response => {
        function sortUsers(a, b) {

          if (b.rating > a.rating){
            return 1
          }

          else if (b.rating < a.rating) {
            return -1;
          }

          else {
            return 0;
          }
        }
        let array = response.body.sort(sortUsers);
        this.state.maxPage = Math.ceil(array.length / this.state.countUser);
        array.forEach((user, index) => {
          user.rang = index + 1;
          this.state.allUsers.push(user)
        });
        //Добавляем позицию в рейтинге
        array.splice(0, this.state.countUser).forEach(user => {this.state.users.push(user)});
      }, response => {
        console.error(response)
      });
    }
  },
  mutations: {
    sortAsc(state, payload){
      function sortUsers(a, b) {
        return a[payload] - b[payload]
      }
      state.users.sort(sortUsers);
      state.sortDirection = 'sortAsc';
      state.sortField = payload;
    },
    sortDesc(state, payload){
      function sortUsers(a, b) {

        if (b[payload] > a[payload]){
          return 1
        }

        else if (b[payload] < a[payload]) {
          return -1;
        }

        else {
          return 0;
        }
      }
      state.users.sort(sortUsers);
      state.sortDirection = 'sortDesc';
      state.sortField = payload;
    },
    search(state, payload) {
      if (state.usersСache.length === 0) {
        state.usersСache = state.users;
      }

      state.users = [];
      let countWord =  payload.split(' ').length;
      console.log(payload.split(' '));
        //Смотрим количество слов в запросе

        if (countWord === 1) {
          //если только одно слово
          state.usersСache.filter(
            (user) => {
              let userNameFliter = user.name.toUpperCase().startsWith(payload.toUpperCase());
              let userSecondNameFliter = user.secondName.toUpperCase().startsWith(payload.toUpperCase());
              return userNameFliter || userSecondNameFliter;
            }
          ).forEach((user) => {state.users.push(user)});
        }

        else {
          state.usersСache.filter(
            (user) => {
              let userNameFliter = user.name.toUpperCase().startsWith(payload.split(' ')[0].toUpperCase());

              if (!userNameFliter) {
                userNameFliter = user.name.toUpperCase().startsWith(payload.split(' ')[1].toUpperCase());
              }

              let userSecondNameFliter;

              userSecondNameFliter = user.secondName.toUpperCase().startsWith(payload.split(' ')[1].toUpperCase());

              if (!userSecondNameFliter) {
                userSecondNameFliter = user.secondName.toUpperCase().startsWith(payload.split(' ')[0].toUpperCase());
              }


              return userNameFliter && userSecondNameFliter;
            }
          ).forEach((user) => {state.users.push(user)});
        }
    }
  }
});

export default store;
