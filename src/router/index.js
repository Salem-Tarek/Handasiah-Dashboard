import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Theme1 from "../views/Theme1.vue";
import OrdersPage from "../views/OrdersPage.vue";
import Profile from "../views/Profile.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard-theme1",
    name: "Theme1",
    component: Theme1,
  },
  {
    path: "/orders",
    name: "OrdersPage",
    component: OrdersPage
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
