<template>
  <nav>
    <v-navigation-drawer
    v-model="drawer"
    app
    dark
    v-if="isLogged"
    >
        <v-list class="pb-0">
            <v-list-item top class="py-1">
                <v-list-item-avatar>
                    <v-img src="../../assets/AdminLTELogo.png"></v-img>
                </v-list-item-avatar>
                <v-list-item-title class="headline">AdminLTE3</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item class="py-1">
                <v-list-item-avatar>
                    <v-img src="../../assets/person.jpg"></v-img>
                </v-list-item-avatar>
                <v-list-item-title>Alexander Pierce</v-list-item-title>
            </v-list-item>
            <v-list-item>
                <v-form>
                    <v-text-field class="pa-0" label="Search" v-model="searchTxt" dense single-line outlined clearable append-icon="mdi-magnify" @click:append="searchSettingFunc"></v-text-field>
                </v-form>
            </v-list-item>
        </v-list>
        <v-list class="pt-0">
            <v-list-item-group v-model="selected">
                <v-list-item
                v-for="(settingItem, i) in settingList1"
                :key="i"
                >
                    <v-list-item-icon>
                        <v-icon v-text="settingItem.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="settingItem.title"></v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
        <v-list class="pt-0">
            <v-subheader>Examples</v-subheader>
            <v-list-item-group>
                <v-list-item
                v-for="(settingItem, i) in settingList2"
                :key="i"
                >
                    <v-list-item-icon>
                        <v-icon v-text="settingItem.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="settingItem.title"></v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer" v-if="isLogged"></v-app-bar-nav-icon>
        <v-toolbar-title v-if="isLogged">
            <v-btn-toggle color="primary" dense group text class="d-none d-sm-flex">
                <v-btn depressed to="/dashboard-theme1">Dashoboard</v-btn>
                <v-btn depressed to="/orders">Orders</v-btn>
            </v-btn-toggle>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <span class="group">
            <v-icon plain dense v-if="isLogged" class="ma-2" @click="searchFunc()">mdi-magnify</v-icon>
            <v-menu offset-y v-if="isLogged">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon plain dense class="ma-2" v-bind="attrs" v-on="on">mdi-account-circle</v-icon>
                </template>
                <v-list class="text-center">
                    <v-list-item>
                        <v-list-item-title>
                            <v-btn to="/profile">
                                <v-icon left>mdi-account</v-icon>
                                Profile
                            </v-btn>
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>
                            <v-btn @click="LogOut()">
                                <v-icon left>mdi-exit-to-app</v-icon>
                                <span>LogOut</span>
                            </v-btn>
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            
            <v-dialog v-model="dialog" v-if="!isLogged" max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="ma-2" v-bind="attrs" v-on="on">mdi-account</v-icon>
                </template>
                <v-card>
                    <v-card-title>
                    <span class="text-h5">LogIn</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-form ref="form">
                                <v-row>
                                    <v-col cols="12" sm="12">
                                        <v-text-field
                                        label="Email"
                                        required
                                        validate-on-blur
                                        :rules="emailRules.email"
                                        v-model="email"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12">
                                        <v-text-field
                                        label="Password"
                                        type="password"
                                        required
                                        validate-on-blur
                                        v-model="password"
                                        :rules="emailRules.email"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="logInFunc"
                        >
                            LogIn
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-menu offset-y left v-if="isLogged">
                <template v-slot:activator="{ on, attrs }">
                    <v-badge content="3" color="red darken-2" overlap>
                        <v-icon plain dense class="ma-2" v-bind="attrs" v-on="on">
                            mdi-forum
                        </v-icon>
                    </v-badge>
                </template>
                <v-list class="pb-0">
                    <v-list-item>
                        <v-list-item-avatar>
                            <img
                                src="https://cdn.vuetifyjs.com/images/john.jpg"
                                alt="John"
                            >
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>John Leider</v-list-item-title>
                                <v-list-item-subtitle>I Called You twice yesterday</v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-btn
                                    :class="fav1 ? 'red--text' : ''"
                                    icon
                                    @click.stop="fav1 = !fav1"
                                >
                                <v-icon>mdi-star</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-avatar>
                            <img
                                src="../../assets/person.jpg"
                                alt="Salem"
                            >
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>John Leider</v-list-item-title>
                                <v-list-item-subtitle>I Called You twice yesterday</v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-btn
                                    :class="fav2 ? 'red--text' : ''"
                                    icon
                                    @click.stop="fav2 = !fav2"
                                >
                                <v-icon>mdi-star</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-avatar>
                            <img
                                src="https://cdn.vuetifyjs.com/images/john.jpg"
                                alt="John"
                            >
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>John Leider</v-list-item-title>
                                <v-list-item-subtitle>I Called You twice yesterday</v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-btn
                                    :class="fav3 ? 'red--text' : ''"
                                    icon
                                    @click.stop="fav3 = !fav3"
                                >
                                <v-icon>mdi-star</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item class="justify-center">
                        <v-btn class="subtitle-2 text-capitalize" plain to="/messages">
                            See All Messages
                        </v-btn>
                    </v-list-item>
                </v-list>
                
            </v-menu>
            <v-menu offset-y style="overflow-y: auto" height="300px" v-if="isLogged">
                <template v-slot:activator="{ on, attrs }">
                    <v-badge content="15" color="yellow darken-2" overlap>
                        <v-icon plain dense class="ma-2" v-bind="attrs" v-on="on">
                            mdi-bell
                        </v-icon>
                    </v-badge>
                </template>
                <v-list min-width="250" class="pb-0">
                    <p class="subtitle-2 mb-2 text-center">15 Notifications</p>
                    <v-divider></v-divider>
                    <v-list-item
                    v-for="(item, index) in notifications"
                    :key="index"
                    class="px-2 font-weight-medium"
                    >
                        <v-list-item-title>
                            <v-icon left dense>{{ item.icon }}</v-icon>
                            {{ item.title }}
                        </v-list-item-title>
                        <v-divider></v-divider>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item class="justify-center">
                        <v-btn class="subtitle-2 text-capitalize" plain to="/notifications">
                            See All Notifications
                        </v-btn>
                    </v-list-item>
                </v-list>
            </v-menu>
        </span>
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
            drawer: false,
            fav1:true,
            fav2:false,
            fav3:true,
            dialog:false,
            searchTxt: "",
            settingList1: [
                {title: "Dashoboard", icon: "mdi-gauge"},
                {title: "Widgets", icon: "mdi-grid"},
                {title: "Layout Options", icon: "mdi-content-copy"},
                {title: "Charts", icon: "mdi-chart-pie"},
                {title: "Ui Elements", icon: "mdi-pine-tree"},
                {title: "Forms", icon: "mdi-square-edit-outline"},
                {title: "Tables", icon: "mdi-table-settings"},
            ],
            settingList2: [
                {title: "Calender", icon: "mdi-calendar-month"},
                {title: "Gallery", icon: "mdi-image"},
                {title: "Kanban Board", icon: "mdi-view-column"},
                {title: "Mailbox", icon: "mdi-email"},
                {title: "Pages", icon: "mdi-note-multiple"},
                {title: "Extras", icon: "mdi-plus-box-outline"},
                {title: "Search", icon: "mdi-magnify"},
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
        searchSettingFunc(){
            alert(`You Want To Search For ${this.searchTxt ? this.searchTxt : 'NoThing'} `)
        },
        searchFunc(){
            console.log('Clicked To Search !!!')
        },
        LogOut(){
            this.userLogOut();
            this.$router.push('/');
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
.v-badge span.v-badge__badge.red {
    inset: auto auto calc(100% - 12px) calc(100% - 14px) !important;
}
.v-badge span.v-badge__badge.yellow {
    inset: auto auto calc(100% - 12px) calc(100% - 18px) !important;
}
</style>