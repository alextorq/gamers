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
    maxPage: 1
  },
  actions: {
    getUsers(context) {
      setTimeout(() => {
        context.state.allUsers.splice(
          context.state.countUser * context.state.page, context.state.countUser * (++context.state.page)
        ).forEach(user => {context.state.users.push(user)});
        context.state.page = Math.min(context.state.maxPage, context.state.page++);
      }, 100)
      //эмулируем зарузку с сервера
    }
  },
  mutations: {
    sortInc(state, payload){
      function sortUsers(a, b) {
        return a[payload] - b[payload]
      }
      state.users.sort(sortUsers)
    },
    sortDecr(state, payload){
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
      state.users.sort(sortUsers)
    },
    search(state, payload) {
      if (state.usersСache.length === 0) {
        state.usersСache = state.users;
      }
      state.users = [];
      let countWord =  payload.split(' ').length;
        //Смотрим сколько слов в запросе
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
              let userSecondNameFliter = user.secondName.toUpperCase().startsWith(payload.split(' ')[1].toUpperCase());
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
