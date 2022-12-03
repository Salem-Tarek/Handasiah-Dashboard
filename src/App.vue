<template>
  <v-app dir="rtl">
    <Navbar />
    <v-main>
      <router-view />
    </v-main>
    <TheFooter />
  </v-app>
</template>

<script>
import Navbar from './components/layout/Navbar.vue';
import TheFooter from './components/layout/TheFooter.vue';

export default {
  name: "App",
  components :{
    Navbar,
    TheFooter
  }
};
</script>
<style>
  body, body * {
    font-family: 'Cairo', sans-serif !important;
  }
</style>
