<template>
  <main>
    <v-container>
      <h1 class="blue--text">Orders</h1>
      <Orders />  
    </v-container>
  </main>
</template>

<script>
import Orders from '../components/Orders.vue'
import router from '../store/index.js'
export default {
  name: "OrdersPage",
  components:{
    Orders
  },
  beforeRouteEnter(to, from, next){
    if(router.getters.isLogged){
      next()
    }else{
      next("/login")
      alert("You Have To LogIn First")
    }
  },
}
</script>

<style>

</style>