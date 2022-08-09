import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
let existInLocalStorage = localStorage.getItem('loggedInForDashboard');
export default new Vuex.Store({
  state: {
    loggedIn: (existInLocalStorage === "true") || false
  },
  getters: {
    isLogged : state => state.loggedIn
  },
  mutations: {
    userLogIn: state => {
      state.loggedIn = true;
      localStorage.setItem('loggedInForDashboard', state.loggedIn)
    },
    userLogOut: state => {
      state.loggedIn = false
      localStorage.removeItem('loggedInForDashboard')
    },
  },
  actions: {
    userLogIn({commit}){
      commit("userLogIn")
    },
    userLogOut({commit}){
      commit("userLogOut")
    }
  },
});
