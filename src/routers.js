import HomePage from "./components/HomePage.vue";
import SignUp from "./components/SignUp.vue";
import LoginPage from "./components/LoginPage.vue";
import AddRes from "./components/AddRes.vue";
import UpdateRes from "./components/UpdateRes.vue";
import ShowProfile from "./components/ShowProfile.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "HomePage",
    component: HomePage,
    path: "/",
  },
  {
    name: "SignUp",
    component: SignUp,
    path: "/sign-up",
  },
  {
    name: "LoginPage",
    component: LoginPage,
    path: "/login",
  },
  {
    name: "Add",
    component: AddRes,
    path: "/add",
  },
  {
    name: "UpdateRes",
    component: UpdateRes,
    path: "/update/:id",
  },
  {
    name: "ShowProfile",
    component: ShowProfile,
    path: "/profile",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
