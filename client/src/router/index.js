import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DiscoverView from "@/views/DiscoverView.vue";
import AboutView from "@/views/AboutView.vue";
import BulletinBoardsView from "@/views/BulletinBoardsView.vue";
import PostView from "@/views/PostView.vue";
import HomeRightPane from "@/components/rightpanes/HomeRightPane.vue";
import Page404View from "@/views/Page404View.vue";
import CollegeView from "@/views/CollegeView.vue";
import CollegeRightPane from "@/components/rightpanes/CollegeRightPane.vue";
import CourseGroupView from "@/views/CourseGroupView.vue";
import CourseGroupRightPane from "@/components/rightpanes/CourseGroupRightPane.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
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
      path: "/post/:id",
      name: "PostSingle",
      component: PostView,
      props: true,
    },
    {
      path: "/college/:id",
      name: "CollegeSingle",
      components: {
        rightPane: CollegeRightPane,
        default: CollegeView,
      },
      props: true,
    },
    {
      path: "/coursegroup/:id",
      name: "CourseGroupSingle",
      components: {
        rightPane: CourseGroupRightPane,
        default: CourseGroupView,
      },
      props: true,
    },
    { path: "/:pathMatch(.*)*", name: "notfound", component: Page404View },
  ],
});

export default router;
