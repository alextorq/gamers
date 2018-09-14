import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    users: [],
    usersСache: [],
    allUsers: [],
    searchGamers: [],
    countUser: Math.ceil((Math.max(document.documentElement.clientHeight, window.innerHeight || 0) -300 ) / 60) || 7,
    //расчитываем количество игроков для подгрузки в зависимости от viewport height
    //300 и 60 расчитаны опытным путем
    page: 1,
    maxPage: 1,
    sortDirection: 'DESC',
    sortField: 'rating'
  },
  getters: {
    users(state) {
        return state.users;
    },
    countGamers(state) {
      return {
        current: state.users.length,
        allUsers: state.allUsers.length
      }
    },
    searchUsers(state) {
      return state.searchGamers;
    }
  },
  actions: {
    getUsers(context) {
      setTimeout(() => {
        let nextPage = context.state.page + 1;
        if (nextPage > context.state.maxPage) {
          return
        }
        let users =  context.state.allUsers.slice(
          context.state.countUser * context.state.page, context.state.countUser * (nextPage)
        );
        //нарезаем новых пользователей
        let currentPage =  Math.min(context.state.maxPage, nextPage);
        // вычисляем текущей страницы
        context.commit('addGamers', {users, page: currentPage});
        //добавляем пользователей
        context.commit('sortBy', {field: context.state.sortField, direction: context.state.sortDirection});
        //Смотрим сортировку и обновляем
      }, 100)
      //эмулируем зарузку с сервера
    },
    firstDownloadUsers(context) {
      Vue.http.get('http://localhost:3000/users').then(response => {
        function sortUsers(a, b) {
          if (b.rating > a.rating) {
            return 1
          } else if (b.rating < a.rating) {
            return -1;
          } else {
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
        let users = array.splice(0, this.state.countUser);
        context.commit('addGamers', {users, page: 1})
      }, response => {
        console.error(response)
      });
    }
  },
  mutations: {
    sortBy(state, payload) {
      function sortAsc(a, b) {
        return a[field] - b[field]
      }
      let field = payload.field;

      if (payload.direction === 'ASC'){
        state.users.sort(sortAsc);
      } else {
        state.users.sort(sortAsc).reverse();
      }

      state.sortDirection = payload.direction;
      state.sortField = payload.field;
    },
    addGamers(state, payload) {
      state.users = state.users.concat(payload.users);
      state.page = payload.page;
    },
    search(state, payload) {
      state.searchGamers = [];
      let countWord =  payload.split(' ').length;
        //Смотрим количество слов в запросе

        if (countWord === 1) {
          //если только одно слово
          state.users.filter(
            (user) => {
              let userNameFliter = user.name.toUpperCase().startsWith(payload.toUpperCase());
              let userSecondNameFliter = user.secondName.toUpperCase().startsWith(payload.toUpperCase());
              return userNameFliter || userSecondNameFliter;
            }
          ).forEach((user) => {state.searchGamers.push(user)});
        } else {
          state.users.filter(
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
          ).forEach((user) => {state.searchGamers.push(user)});
        }
    }
  }
});

export default store;
