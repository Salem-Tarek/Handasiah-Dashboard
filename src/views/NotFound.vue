<template>
  <div class="notFound">
    <v-container>
      <h1>Not Found</h1>
      <p>
        Oops, We couldn't find that page. Go To 
        <router-link to="/">HOME</router-link>
      </p>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "NotFound"
}
</script>

<style>
/* .notFound {
    width: 100vw;
    height: calc(100vh - 65px);
    background-color:#E2E2E2;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
} */
</style>