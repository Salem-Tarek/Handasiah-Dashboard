<template>
  <v-container>
    <h1 class="mb-4">محتوى صفحات الخدمات</h1>

    <!-- If There is Services -->
    <template v-if="getServices.length">
      <template v-for="(service, index) in getServices">
        <Service @servicePropChanged="serviceBtn = false" @imgDeleted="getServicesPage" :serviceData="service" @serviceDataChanged="getServicesData()" ref="serviceComponent" :serviceNum="index+1" :key="`getService${service.id}`" />
        <div class="deleteService d-flex align-center justify-space-between makeGap" :key="service.id">
          <div class="divider"></div>
          <v-btn depressed color="error" class="noLetterSpace" @click="deleteService(service.id)">حذف الخدمة</v-btn>
        </div>
      </template>
    </template>

    <!-- If There is No Services -->
    <template>
      <template v-for="n in servicesCount">
        <Service :serviceData="null" @serviceDataChanged="getServicesData()" ref="serviceComponent" :serviceNum="n + getServices.length" :key="`service-${n}`" />
        <div class="divider w-100" :key="n"></div>
      </template>
    </template>

    
    <div class="mt-3 d-flex makeGap">
      <v-btn depressed class="AddService" @click="servicesCount++">أضف خدمة</v-btn>
      <v-btn color="success" @click="submitServices()" :disabled="serviceBtn">حفظ الخدمات</v-btn>
    </div>
  </v-container>
</template>

<script>
import Service from '../components/Service.vue'
import axios from 'axios'

export default {
  name: "ServicesContent",
  components: {
    Service,
  },
  data(){
    return {
      services: [],
      servicesCount: 1,
      uploadedImgs: [],
      getServices: [],
      serviceBtn: true,
    }
  },
  methods:{
    getServicesData(){
      this.services = this.$refs.serviceComponent.map((comp) => !comp._props.serviceData ? comp.$data.servicesData : comp._props.serviceData);
      
      for(let i = 0; i < this.$refs.serviceComponent.length; i++){
        this.services[i].images = this.$refs.serviceComponent[i].$data.uploadedImgs
      }

      this.serviceBtn = false;
    },
    async submitServices(){
      console.log(this.services);
      this.getServicesData();
      
      // Remove the Last Element Which is the current Service Component
      // this.services.pop();

      for(let service of this.services){
        for(let key in service){
          // console.log(service[key]);
          if(service[key] === "" || service[key] === null){
            alert('يجب ملئ كل حقول الادخال')
            return;
          }
        }
      }

      let fd = new FormData();
      for(let i = 0; i < this.services.length; i++){
        for(let key in this.services[i]){
          if(key === 'images'){
            if(key.length){
              for(let j = 0; j < this.services[i][key].length; j++){
                // console.log(this.services[i][key][j]);
                fd.append(`Items[${i}][Images][${j}][image]`, this.services[i][key][j].image || this.services[i][key][j])
              }
            }
          }else{
            fd.append( `Items[${i}][${key}]`, this.services[i][key]);
          }
        }
      }

      console.log(...fd);

      const res = await axios.post('/dashboard/servicesPage/Items/save', fd)
      console.log(res);
    },
    async getServicesPage(){
      const res = await axios.get('/dashboard/servicesPage')
      console.log(res);
      this.getServices = res.data.data.sort((a, b) => a.id - b.id);
      console.log(this.getServices)
    },
    async deleteService(id){
      const res = await axios.post('/dashboard/servicesPage/Items/delete', {id: id});
      console.log(res);
      if(res.status === 200){
        alert('تم حذف الخدمة بنجاح')
        this.getServicesPage();
      }
    }
  },
  mounted(){
    this.getServicesPage();
  }
}
</script>

<style lang="scss">
.divider {
  height:2px;
  width:90%;
  background-color: #333;
  &.w-100 {
    width: 100% !important;
  }
}
.makeGap {
  gap :20px
}
.AddService{
  background-color: #0057a8 !important;
  color: #FFF !important;
  letter-spacing: 0 !important;
  font-weight: bold;
}
</style>