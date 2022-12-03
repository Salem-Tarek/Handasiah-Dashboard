<template>
  <v-container>
    <h1 class="mb-4">محتوى صفحات الخدمات</h1>
    <template v-for="n in servicesCount">
      <Service ref="serviceComponent" :serviceNum="n" :key="n" />
    </template>
    <v-btn depressed class="AddService" @click="testing()">أضف خدمة</v-btn>
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
    testing(){
      this.servicesCount++;
      let currentComponent = this.$refs.serviceComponent.length - 1;
      let currentComponentData = this.$refs.serviceComponent[currentComponent]._data.serviceData;
      // console.log(currentComponentData);
      for(let val in currentComponentData){
        if(!currentComponentData[val].length){
          console.log("There Is Empty Here");
          return
        }else{
          this.services.push(currentComponentData)
          // Store this Array in both LocalStorage and Store of Vuex
          return
        }
      }
    },
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