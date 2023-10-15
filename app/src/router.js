import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue"
import { isLogged } from "./utils";

const routes = [
  { path: "/", component: Home },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router