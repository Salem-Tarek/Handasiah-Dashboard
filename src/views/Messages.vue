<template>
    <v-container fluid>
        <h1>Messages</h1>
    </v-container>
</template>

<script>
import router from '../store/index.js';
// import axios from 'axios';

export default {
    name: "Messages",
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