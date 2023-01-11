import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import Swal from 'sweetalert2'

Vue.use(Vuex);

function alertMaker(titleEn, titleAr){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: this.getLang === 'En' ? titleEn : titleAr,
    showConfirmButton: false,
    timer: 3000,
    // didDestroy: () => {
    //   location.reload();
    // }
  })
}

export default new Vuex.Store({
  state: {
    user: localStorage.getItem('userToken') || null,
    lang: "en",
  },
  getters:{
    isLogged(state){
      if(state.user !== '' && state.user !== null){
        return true
      }else{
        return false
      }
    } 
  },
  mutations: {
    toggleLang: state => {
      if(state.lang === "en"){
        state.lang = "ar"
      }else{
        state.lang = "en"
      }
    },
    setUser(state, token){
      state.user = token;
    },
    logOut(state){
      state.user = null;
      localStorage.removeItem('userToken');
      // alert('Logged Out');
      alertMaker('Logged Out Successfully', 'تم تسجيل الخروج بنجاح');
    },
  },
  actions: {
    toggleLang({commit}){
      commit('toggleLang')
    },
    userLogIn({commit}){
      commit("userLogIn")
    },
    userLogOut({commit}){
      commit("logOut")
    },
    async LogIn(context, user) {
      const res = await axios.post('/dashboard/login', user);
      if(res.status === 200){
        await context.commit('setUser', res.data.data.accessToken);
        localStorage.setItem('userToken', res.data.data.accessToken);
        // alert('Logged in Successfully')
        alertMaker('Logged in Successfully', 'تم تسجيل الدخول بنجاح');
        
      }else{
        // alert("Email or Password incorrect");
        alertMaker('Email or Password incorrect', 'البريد الالكترونى او كلمة المرور غير صحيحه');
      }
    },
  },
});
