import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    users: [],
    usersСache: [],
    allUsers: [],
    countUser: 7,
    page: 1,
    maxPage: 1
  },
  actions: {
    getUsers(context) {
      setTimeout(() => {
        context.state.allUsers.splice(context.state.countUser * context.state.page, context.state.countUser * (++context.state.page))
          .forEach(user => {context.state.users.push(user)});
        context.state.page = Math.min(context.state.maxPage, context.state.page++);
      }, 100)
    }
  },
  getters: {

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
         query: '', state.usersСache.filter(
        (user) => user.name.toUpperCase().startsWith(payload.toUpperCase())
      )
        .forEach((user) => {state.users.push(user)});
    }
  }
});

export default store;
