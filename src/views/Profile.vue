<template>
  <v-container>
    <h3 class="mb-4">بروفايل الأدمن</h3>
    <v-card class="mx-auto" max-width="374">

      <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
      ></v-img>

      <v-card-title class="noLetterSpace">سالم طارق</v-card-title>

      <v-card-text> <v-icon class="ml-2">mdi-email</v-icon> salemtarek224@gmail.com</v-card-text>
      
      <v-dialog v-model="dialog" max-width="350">
        <v-card class="pt-5">
          <v-form ref="priceFormAr" class="mt-4">
            <v-container>
                <v-row>
                    <v-col cols="12" class="py-0">
                        <v-file-input
                          v-model="userData.image"
                          outlined
                          label="الصورة الشخصية"
                          append-icon="mdi-camera"
                        ></v-file-input>
                    </v-col>
                    <v-col cols="12" md="6" class="py-0">
                        <v-text-field
                          v-model="userData.name"
                          outlined
                          label="الاسم"
                          prepend-inner-icon="mdi-cellphone"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="py-0">
                        <v-text-field
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

      <!-- <v-card-actions>
      <v-btn
          color="deep-purple lighten-2"
          text
          @click="reserve"
      >
          Reserve
      </v-btn>
      </v-card-actions> -->
    </v-card>
  </v-container>
</template>

<script>
import router from '../store/index.js'

export default {
    name: "Profile",
    data(){
      return {
        dialog: true,
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
      submitData(){
        console.log(this.userData);
      }
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
</style>