<template>
  <div>
    <h2 class="mt-2 mr-2">الإعدادات العامة</h2>
    <v-form ref="priceFormAr" class="mt-4">
      <v-container>
          <v-row>
              <v-col cols="12" class="py-0">
                  <v-file-input
                    v-model="settings.favicon"
                    outlined
                    label="Fav Icon"
                    append-icon="mdi-camera"
                  ></v-file-input>
              </v-col>
              <v-col cols="12" md="6" class="py-0">
                  <v-text-field
                    v-model="settings.mobile1"
                    outlined
                    label="رقم الموبايل 1"
                    prepend-inner-icon="mdi-cellphone"
                  ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="py-0">
                  <v-text-field
                    v-model="settings.mobile2"
                    outlined
                    label="رقم الموبايل 2"
                    prepend-inner-icon="mdi-cellphone"
                  ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="py-0">
                  <v-text-field
                    v-model="settings.addressEn"
                    outlined
                    label="العنوان بالانجليزى"
                    prepend-inner-icon="mdi-map-marker"
                  ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="py-0">
                  <v-text-field
                    v-model="settings.addressAr"
                    outlined
                    label="العنوان بالعربى"
                    prepend-inner-icon="mdi-map-marker"
                  ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="py-0">
                  <v-text-field
                    v-model="settings.linkedIn"
                    outlined
                    label="لينكدان"
                    prepend-inner-icon="mdi-linkedin"
                  ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="py-0">
                  <v-text-field
                    v-model="settings.whatsapp"
                    outlined
                    label="واتس اب"
                    prepend-inner-icon="mdi-whatsapp"
                  ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="py-0">
                  <v-text-field
                    v-model="settings.facebook"
                    outlined
                    label="فيس بوك"
                    prepend-inner-icon="mdi-facebook"
                  ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="py-0">
                  <v-text-field
                    v-model="settings.gmail"
                    outlined
                    label="البريد الالكترونى"
                    prepend-inner-icon="mdi-gmail"
                  ></v-text-field>
              </v-col>
              <v-col cols="12" md="12" class="pt-0">
                  <v-btn type="submit" class="submitBtn noLetterSpace font-weight-bold mb-5" dark block @click.prevent="submitSetting" :disabled="submitBtn">إرســـال</v-btn>
              </v-col>
          </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Setting",
  data(){
    return {
      settings: {
        // icon: '', // The Logo
        favicon: null,
        mobile1: '',
        mobile2: '',
        addressEn: '',
        addressAr: '',
        linkedIn: '',
        whatsapp: '',
        facebook: '',
        gmail: '',
        serverMail: '',
      },
      submitBtn: true,
    }
  },
  methods: {
    async submitSetting(){
      let fd = new FormData();
      for(let key in this.settings){
        fd.append(key, this.settings[key])
      }
      // console.log(...fd);

      const res = await axios.post('/dashboard/setting/save', fd);
      console.log(res);
      if(res.status === 200){
        alert('تم حفظ البيانات بنجاح')
      }

    },
    async getSettingsData(){
      const res = await axios.get('/dashboard/setting');
      console.log(res);
      if(res.status === 200){
        // this.settings = res.data.data;
      }
    }
  },
  mounted(){
    this.getSettingsData();
  },
  watch: {
    settings: {
      handler(){
        this.submitBtn = false
      },
      deep: true
    }
  }
}
</script>

<style>
.noLetterSpace {
  letter-spacing: 0 !important;
}
.submitBtn{
  background-color: #0057a8 !important;
}
.theme--dark.v-btn.v-btn--disabled.v-btn--has-bg {
  background-color: rgba(0, 0, 0, 0.3) !important;
  color: #FFF !important;
  user-select: none !important;
}
</style>