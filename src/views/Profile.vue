<template>
  <v-container>
    <v-btn color="info" @click="addUserProcess">
      <v-icon left>mdi-account-plus</v-icon>
      إضافة مشرف
    </v-btn>
    <!-- User Details Edit and Add -->
    <v-dialog v-model="editDialog" max-width="500px">
    <v-card class="mx-auto" max-width="500px">
      <v-card-title>
        <span class="text-h5">بيانات المشرف</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-file-input
                @change="handleUserImg"
                outlined
                hide-details
                label="صورة المشرف"
              ></v-file-input>
            </v-col>
            <v-col cols="12">
              <v-text-field
                @change="disabled = false"
                outlined
                hide-details
                v-model="editOrAddUserData.name"
                label="الاسم"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                @change="disabled = false"
                outlined
                hide-details
                v-model="editOrAddUserData.email"
                label="الايميل"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                @change="disabled = false"
                outlined
                hide-details
                v-model="editOrAddUserData.password"
                label="الباسورد"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="mode === 'create'" depressed color="info" @click="createUser"><v-icon>mdi-account-plus</v-icon> إنشاء مشرف</v-btn>
        <v-btn v-else depressed color="info" @click="saveUserChanges()"><v-icon>mdi-content-save</v-icon> حفظ التعديلات</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
    <div class="users" v-if="users.length">
      <template>
        <v-data-table
          :headers="headers"
          :items="users"
          class="elevation-1"
          hide-default-footer
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title class="font-weight-bold blue--text">
                <h2>قائمة المشرفين</h2>
              </v-toolbar-title>
              <v-divider
              class="mx-4"
              inset
              vertical
              ></v-divider>
              <v-spacer></v-spacer>

              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="noLetterSpace">هل تريد حذف هذاالمشرف ؟</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="closeDeleteDialog">إغلاق</v-btn>
                    <v-btn color="error" @click="deleteItemConfirm">حذف</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon large class="title ml-3" @click="editUser(item)">
              mdi-account-edit
            </v-icon>
            <v-icon class="title" @click="deleteUser(item.id)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </template>
    </div>
    <h3 class="my-4">بروفايل الأدمن</h3>
    <v-card class="mx-auto" max-width="374">
      <!-- <v-img height="250" :src="dataShow.image || '../assets/default.jpg'"></v-img> -->
      <v-img height="250" src="../assets/default.jpg"></v-img>

      <v-card-title class="noLetterSpace">{{ dataShow && dataShow.name }}</v-card-title>

      <v-card-text> <v-icon class="ml-2">mdi-email</v-icon> {{ dataShow && dataShow.email }}</v-card-text>
      <v-card-actions>
        <v-btn depressed color="info" @click="editUser(dataShow)"><v-icon>mdi-account-edit</v-icon> تعديل بيانات الأدمن</v-btn>
      </v-card-actions>
    </v-card>
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
        editDialog: false,
        submitBtn: true,
        userImg: '',
        dataShow: null,
        userData: {
          name: "",
          password: "",
          image: null,
        },
        disabled: true,
        users: [],
        headers: [
          { text: 'الاسم', value: 'name' },
          { text: 'الايميل', value: 'email' },
          { text: 'الصورة', value: 'image' },
          { text: 'حذف و تعديل', value: 'actions' },
        ],
        dialogDelete: false,
        editedUser: {},
        mode: '',
        newUser: {
          name: '',
          email: '',
          image: null,
          password: '',
        },
        userDeletedId: null,
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
      },
      async getUsers(){
        const res = await axios.get('/dashboard/users');
        console.log(res);
        if(res.status === 200){
          this.users = res.data.data.users;
          console.log(this.users);
        }
      },
      async deleteItemConfirm(){
        console.log(this.userDeletedId);
        if(this.userDeletedId){
          const res = await axios.post('/dashboard/users/delete', {id: this.userDeletedId});
          console.log(res);
          if(res.status){
            alert('تم حذف المستخدم بنجاح')
          }
        }
      },
      closeDeleteDialog(){
        this.dialogDelete = false;
        this.userDeletedId = null;
      },
      editUser(item){
        this.editDialog = true;
        this.editedUser = item;
        this.mode = 'edit';
      },
      deleteUser(id){
        if(id !== this.dataShow.id){
          this.dialogDelete = true;
          this.userDeletedId = id;
        }else{
          alert('عفوا, لا يمكن حذف المشرف المسجل فى الموقع الان')
        }
      },
      handleUserImg(e){
        console.log(e);
        this.disabled = false;
        if(this.mode === 'create'){
          this.newUser.image = e;
        }else{
          this.editedUser.image = e;
        }
      },
      saveUserChanges(){
        console.log(this.editedUser);
        this.editedUser = {};
      },
      async createUser(){
        const res = await axios.post('/dashboard/users/create', this.newUser);
        console.log(res);
      },
      addUserProcess(){
        this.mode = 'create';
        this.editDialog = true;
      }
    },
    async mounted(){
      this.userImg = localStorage.getItem('userImg');
      this.getProfileData();
      this.getUsers();
    },
    watch: {
      editDialog(newVal){
        if(!newVal){
          this.getUsers();
        }
      }
    },
    computed: {
      editOrAddUserData(){
        return this.mode === 'create' ? this.newUser : this.editedUser;
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

.preview{
  width: 100px;
  height: 100px;
  background-size: contain;
}
</style>