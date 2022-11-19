<template>
  <footer class="text-center pt-3 mt-3 font-weight-bold">
    <!-- <p>Copyright &copy; 2014-2021 <span class="blue--text">AdminLTE.io</span>. All rights reserved.</p> -->
    <p class="mb-0">الحقوق محفوظة للشركة <span class="blue--text">الهندسية</span> &copy; {{ currentYear }}.</p>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
  computed:{
    currentYear(){
      return new Date().getFullYear()
    }
  }
}
</script>

<style>

</style>