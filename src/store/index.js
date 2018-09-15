import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    users: [],
    allUsers: [],
    searchGamers: [],
    searchStatus: false,
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
    searchStatus(state) {
      return state.searchStatus;
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
      function sortDesc(a, b) {
        if (b[field] > a[field]){
          return 1
        } else if (b[field] < a[field]) {
          return -1;
        } else {
          return 0;
        }
      }
      let field = payload.field;
      let sortFunction = payload.direction === 'ASC' ? sortAsc : sortDesc;

      //Второй ваант просто реверс массива для того что бы не создавать вторую функцию
      // if (payload.direction === 'ASC') {
      //   state.users.sort(sortAsc);
      // } else {
      //   state.users.sort(sortAsc).reverse();
      // }

      state.users.sort(sortFunction);
      state.sortDirection = payload.direction;
      state.sortField = payload.field;
    },
    addGamers(state, payload) {
      state.users = state.users.concat(payload.users);
      state.page = payload.page;
    },
    search(state, payload) {
      state.searchGamers = [];
      if (!payload) {
        state.searchStatus = false;
        return
      }
     let searchQuery = payload.toUpperCase();
     let searchFilterArray = state.users.filter(
        (user) => {
          let userName = user.name.toUpperCase();
          let userSecondName = user.secondName.toUpperCase();
          let fullName = `${userName} ${userSecondName}`;
          let fullNameReverse = `${userSecondName} ${userName}`;
          let inForward = fullName.startsWith(searchQuery);
          let inReverse = fullNameReverse.startsWith(searchQuery);

          return inForward || inReverse;
        }
      );
     console.log(state.searchGamers, searchFilterArray);
      state.searchGamers = state.searchGamers.concat(searchFilterArray);

      if (state.searchGamers.length)  {
        state.searchStatus = true;
      }

    }
  }
});

export default store;
