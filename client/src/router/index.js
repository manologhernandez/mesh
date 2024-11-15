import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DiscoverView from "@/views/DiscoverView.vue";
import AboutView from "@/views/AboutView.vue";
import BulletinBoardsView from "@/views/BulletinBoardsView.vue";
import SignUpView from "@/views/SignUpView.vue";
import LoginView from "@/views/LoginView.vue";
import PostView from "@/views/PostView.vue";
import HomeRightPane from "@/components/HomeRightPane.vue";
import Page404View from "@/views/Page404View.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      components: {
        rightPane: HomeRightPane,
        default: HomeView,
      },
    },
    {
      path: "/discover",
      name: "Discover",
      component: DiscoverView,
    },
    {
      path: "/about",
      name: "About",
      component: AboutView,
    },
    {
      path: "/bulletin-boards",
      name: "BulletinBoards",
      component: BulletinBoardsView,
    },
    {
      path: "/signup",
      name: "Signup",
      component: SignUpView,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/post/:id",
      name: "PostSingle",
      component: PostView,
      props: true,
    },
    { path: "/:pathMatch(.*)*", name: "notfound", component: Page404View },
  ],
});

export default router;
