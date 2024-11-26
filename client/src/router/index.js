import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DiscoverView from "@/views/DiscoverView.vue";
import BulletinBoardsView from "@/views/BulletinBoardsView.vue";
import PostView from "@/views/PostView.vue";
import Page404View from "@/views/Page404View.vue";
import CollegeView from "@/views/CollegeView.vue";
import CourseGroupView from "@/views/CourseGroupView.vue";
import LandingView from "@/views/LandingView.vue";

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
      name: "Landing",
      component: LandingView,
    },
    {
      path: "/feed",
      name: "Home",
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/discover",
      name: "Discover",
      component: DiscoverView,
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: "/bulletin-boards",
      name: "BulletinBoards",
      component: BulletinBoardsView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/post/:id",
      name: "PostSingle",
      component: PostView,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/college/:id",
      name: "CollegeSingle",
      component: CollegeView,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/coursegroup/:id",
      name: "CourseGroupSingle",
      component: CourseGroupView,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
    { path: "/:pathMatch(.*)*", name: "notfound", component: Page404View },
  ],
});

// Auth route protection
router.beforeEach((to, from, next) => {
  if (to.path == "/") {
    if (userIsLoggedIn()) {
      next("/feed");
    } else {
      next();
    }
  } else {
    if (to.meta.requiresAuth) {
      if (userIsLoggedIn()) {
        next();
      } else {
        // User is not authenticated, redirect to login
        next("/");
      }
    } else {
      // Non-protected route, allow access
      next();
    }
  }
});

function userIsLoggedIn() {
  const token = localStorage.getItem("mesh_token");
  //TODO: verify if token is valid here
  return token && token != "";
}

export default router;
