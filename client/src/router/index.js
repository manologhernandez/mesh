import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DiscoverView from "@/views/DiscoverView.vue";
import AboutView from "@/views/AboutView.vue";
import BulletinBoardsView from "@/views/BulletinBoardsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/discover",
      name: "discover",
      component: DiscoverView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/bulletin-boards",
      name: "bulletinboards",
      component: BulletinBoardsView,
    },
  ],
});

export default router;
