<template>
  <div class="profile">
    <h1 class="display-4">Profile Page</h1>
  </div>
</template>

<script>
import router from '../store/index.js'

export default {
    name: "Profile",
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
.profile {
    width: 100vw;
    height: calc(100vh - 65px);
    background-color:#E2E2E2;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>