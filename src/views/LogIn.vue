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
import { mapActions } from 'vuex'
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
        try {
          await this.LogIn(this.logInForm);
          this.$router.push("/");
        } catch (error) {
          alert("Email or Password incorrect")
        }
      }else{
        alert('Please, Fill all Fields according to the rules')
      }
    }
  }
};
</script>

<style>
.login-form .v-text-field{
  max-width: 400px !important;
}
</style>