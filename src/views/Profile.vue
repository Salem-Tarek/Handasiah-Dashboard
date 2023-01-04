<template>
  <v-container>
    <h3 class="mb-4">بروفايل الأدمن</h3>
    <v-card class="mx-auto" max-width="374">

      <!-- <v-img height="250" :src="dataShow.image || '../assets/default.jpg'"></v-img> -->
      <v-img height="250" src="../assets/default.jpg"></v-img>

      <v-card-title class="noLetterSpace">{{ dataShow && dataShow.name }}</v-card-title>

      <v-card-text> <v-icon class="ml-2">mdi-email</v-icon> {{ dataShow && dataShow.email }}</v-card-text>
      <v-card-actions>
        <v-btn depressed color="info" @click="dialog = true"><v-icon>mdi-account-edit</v-icon> تعديل بيانات الأدمن</v-btn>
      </v-card-actions>
    </v-card>
    <!-- Make Edit Data Btn -->
    <v-dialog v-model="dialog" max-width="350">
      <v-card class="pt-5">
        <v-form ref="priceFormAr" class="mt-4">
          <v-container>
              <v-row>
                  <v-col cols="12" class="py-0">
                      <v-file-input
                        @change="handleImg"
                        outlined
                        label="الصورة الشخصية"
                        append-icon="mdi-camera"
                      ></v-file-input>
                  </v-col>
                  <v-col cols="12" v-if="userImg" class="mb-3">
                    <div class="preview" :style="{ 'background-image': `url(${userImg || dataShow.image})` }"></div>
                  </v-col>
                  <v-col cols="12" class="py-0">
                      <v-text-field
                        autocomplete="new-password"
                        @change="submitBtn = false"
                        v-model="userData.name"
                        outlined
                        label="الاسم"
                        prepend-inner-icon="mdi-cellphone"
                      ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="py-0">
                      <v-text-field
                        autocomplete="new-password"
                        @change="submitBtn = false"
                        v-model="userData.password"
                        type="password"
                        outlined
                        label="الباسورد"
                        prepend-inner-icon="mdi-cellphone"
                      ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" class="pt-0">
                      <v-btn type="submit" class="submitBtn noLetterSpace font-weight-bold mb-5" dark block @click.prevent="submitData" :disabled="submitBtn">حفظ التعديلات</v-btn>
                  </v-col>
              </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import router from '../store/index.js';
import axios from 'axios';
export default {
    name: "Profile",
    data(){
      return {
        dialog: false,
        submitBtn: true,
        userImg: '',
        dataShow: null,
        userData: {
          name: "",
          password: "",
          image: null,
        }
      }
    },
    beforeRouteEnter(to, from, next){
      if(router.getters.isLogged){
        next()
      }else{
        next("/login")
        alert("You Have To LogIn First")
      }
    },
    methods: {
      async submitData(){
        let fd = new FormData();
        for(let key in this.userData){
          if(this.userData[key]){
            fd.append(key, this.userData[key])
          }
        }
        const res = await axios.post('/dashboard/profile/update', fd);
        console.log(res);
        if(res.status === 200){
          alert('تم تعديل البيانات بنجاح')
        }
      },
      handleImg(e){
        if(e){
          this.userData.image = e;
          this.submitBtn = false;
          const reader = new FileReader();
          reader.addEventListener('load', () => {
            this.userImg = reader.result;
            // Store This Array below in both localStorage and Store
            localStorage.setItem('userImg', this.userImg)
            localStorage.setItem('userImgFile', JSON.stringify(e))
          })
          reader.readAsDataURL(e);
        }
      },
      async getProfileData(){
        const res = await axios.get('/dashboard/profile');
        console.log(res);
        if(res.status === 200){
          this.dataShow = res.data.data;
          console.log(this.dataShow.image);
          this.userData.name = res.data.data.name;
          this.userData.image = res.data.data.image;
        }
      }
    },
    async mounted(){
      this.userImg = localStorage.getItem('userImg');
      this.getProfileData();
    }
}
</script>

<style>
.noLetterSpace {
  letter-spacing: 0 !important;
}
.profile {
  width: 100vw;
  height: calc(100vh - 65px);
  background-color:#E2E2E2;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview{
  width: 100px;
  height: 100px;
  background-size: contain;
}
</style>