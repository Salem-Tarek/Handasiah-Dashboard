<template>
  <v-container class="my-4">
    <v-form class="login-form" ref="form" v-model="valid" @submit.prevent="submitForm()">
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <v-text-field
            v-model="logInForm.email"
            :rules="rules.email"
            label="إيميل"
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <v-text-field
            v-model="logInForm.password"
            :rules="rules.password"
            type="password"
            label="باسورد"
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn dark type="submit">submit</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Swal from 'sweetalert2'

export default {
  name: "LogIn",
  data(){
    return {
      logInForm: {
        email: '',
        password: '',
      },
      valid: false,
      rules:{
        email: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        password:[
          v => !!v || 'Password is Required',
          v => v.length >= 8 || 'Password Must be At least 8 Numbers'
        ]
      }
    }
  },
  methods:{
    ...mapActions(["LogIn"]),
    async submitForm(){
      if(this.$refs.form.validate()){
        const res = await this.LogIn(this.logInForm);
        console.log(res); 
        try {
          await this.LogIn(this.logInForm);
          this.$router.push("/");
        } catch (error) {
          // alert("Email or Password incorrect")
          this.alertMaker('Email or Password incorrect', 'البريد الالكترونى او كلمة المرور غير صحيحه');
        }
      }else{
        // alert('Please, Fill all Fields according to the rules');
        this.alertMaker('Please, Fill all Fields according to the rules', 'من فضلك قم بملئ جميع حقول الإدخال طبقا لقواعد كل حقل');
      }
    },
    alertMaker(titleEn, titleAr){
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: this.getLang === 'En' ? titleEn : titleAr,
        showConfirmButton: false,
        timer: 3000,
        // didDestroy: () => {
        //   location.reload();
        // }
      })
    }
  },
  computed: {
    ...mapGetters(['getLang'])
  }
};
</script>

<style>
.login-form .v-text-field{
  max-width: 400px !important;
}
</style>