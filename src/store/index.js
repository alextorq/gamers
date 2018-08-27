import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    users: [],
    usersСache: [],
    allUsers: [],
    query: '',
    countUser: 7
  },
  actions: {
    getUsers() {

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
      state.usersСache.filter(
        (user) => user.name.startsWith(payload))
        .forEach((user) => {state.users.push(user)});
    }
  }
});

export default store;