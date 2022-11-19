<template>
  <nav>
    <v-navigation-drawer
    v-model="drawer"
    app
    dark
    right
    v-if="isLogged"
    >
        <v-list class="pb-0">
            <v-list-item top class="py-1">
                <v-list-item-avatar>
                    <v-img src="../../assets/handasiah.png"></v-img>
                </v-list-item-avatar>
                <h3>الهندسيــة</h3>
            </v-list-item>
            <v-divider></v-divider>
        </v-list>
        <v-list class="pt-0 navigation">
            <v-subheader>الصفحات</v-subheader>
            <!-- <v-list-item-group v-model="selected"> -->
                <v-list-item v-for="(page, i) in pagesList" :key="i" class="px-0">
                    <router-link :to="page.link" class="d-flex px-4">
                        <v-list-item-icon>
                            <v-icon v-text="page.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="page.title"></v-list-item-title>
                        </v-list-item-content>
                    </router-link>
                </v-list-item>
            <!-- </v-list-item-group> -->
        </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
        <h1>الهندسيــة</h1>
        <v-spacer></v-spacer>
        <span class="group">
            <v-menu offset-y v-if="isLogged">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon plain dense class="ma-2" v-bind="attrs" v-on="on">mdi-account-circle</v-icon>
                </template>
                <v-list class="text-center">
                    <v-list-item class="px-0">
                        <v-list-item-title>
                            <v-btn class="black--text" to="/profile">
                                <v-icon left>mdi-account</v-icon>
                                الصفحة الشخصية
                            </v-btn>
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item class="px-0 justify-center">
                        <v-btn class="black--text elevation-0" @click="LogOut()">
                            <v-icon left>mdi-exit-to-app</v-icon>
                            تسجيل الخروج
                        </v-btn>
                    </v-list-item>
                </v-list>
            </v-menu>
        </span>
        <v-app-bar-nav-icon @click="drawer = !drawer" v-if="isLogged"></v-app-bar-nav-icon>
    </v-app-bar>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: "Navbar",
    data(){
        return {
            notifications:[
                {title: "4 new messages", icon: "mdi-email"},
                {title: "8 friend requests", icon: "mdi-account-group"},
                {title: "3 New Reports", icon: "mdi-file"},
            ],
            drawer: true,
            fav1:true,
            fav2:false,
            fav3:true,
            dialog:false,
            searchTxt: "",
            pagesList: [
                {title: "الرئيسية", icon: "mdi-home", link: "/home-content"},
                {title: "عننا", icon: "mdi-information", link: "/about-content"},
                {title: "الخدمات", icon: "mdi-tools", link: "/services-content"},
            ],
            selected: 0,
            emailRules:{
                email:[
                    value => !!value || 'Email is Required'
                ],
                password:[
                    value => !!value || 'Password is Required'
                ]
            },
            logInUsers:[
                {
                    name: "Salem Tarek",
                    email:"salem@gmail.com",
                    password:"123456789",
                    token:"tstststs123"
                },
                {
                    name: "Ahmed Zizo",
                    email:"zizo@gmail.com",
                    password:"135791113",
                    token:"tstststs456"
                },
                {
                    name: "Sayed",
                    email:"sayed@gmail.com",
                    password:"2468101214",
                    token:"tstststs789"
                },

            ],
            email:"",
            password:""
        }
    },
    computed: mapGetters(['isLogged']),
    methods:{
        ...mapActions(['userLogIn', 'userLogOut']),
        LogOut(){
            this.userLogOut();
            localStorage.removeItem('userToken')
            this.$router.push('/login');
        },
        logInFunc(){
            if (this.$refs.form.validate()){
                for(let logInUser of this.logInUsers){
                    if(this.email === logInUser.email && this.password === logInUser.password){
                        let theToken = logInUser.token;
                        this.userLogIn()
                        this.dialog = false;
                        this.$router.push('/dashboard-theme1')
                        this.email = "";
                        this.password = "";
                        console.log(theToken);
                        return true
                    }else{
                        alert("Email or Password in inCorrect !!")
                        return false
                    }
                }
            }
        }
    }
}
</script>

<style>
a{
    text-decoration: none;
    color: #fff !important;
    width: 100% !important;
    transition: 0.5s;
}
.navigation .v-list-item a:hover, 
.navigation .v-list-item .router-link-exact-active {
    background-color: rgba(238, 238, 238, 0.4);
}

.v-badge span.v-badge__badge.red {
    inset: auto auto calc(100% - 12px) calc(100% - 14px) !important;
}
.v-badge span.v-badge__badge.yellow {
    inset: auto auto calc(100% - 12px) calc(100% - 18px) !important;
}
</style>