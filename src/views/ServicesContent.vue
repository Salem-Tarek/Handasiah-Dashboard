<template>
  <v-container>
    <h1 class="mb-4">محتوى صفحات الخدمات</h1>
    <template v-for="n in servicesCount">
      <Service @serviceDataChanged="getServicesData()" ref="serviceComponent" :serviceNum="n" :key="n" />
    </template>
    <v-btn depressed class="AddService" @click="servicesCount++">أضف خدمة</v-btn>
  </v-container>
</template>

<script>
import Service from '../components/Service.vue'
export default {
  name: "ServicesContent",
  components: {
    Service,
  },
  data(){
    return {
      services: [],
      servicesCount: 1,
    }
  },
  methods:{
    getServicesData(){
      this.services = this.$refs.serviceComponent.map((comp) => comp.$data.serviceData);
    }
  }
}
</script>

<style>
.AddService{
  background-color: #0057a8 !important;
  color: #FFF !important;
  letter-spacing: 0 !important;
  font-weight: bold;
}
</style>