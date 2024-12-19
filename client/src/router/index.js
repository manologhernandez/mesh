import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DiscoverView from "@/views/DiscoverView.vue";
import BulletinBoardsView from "@/views/BulletinBoardsView.vue";
import PostView from "@/views/PostView.vue";
import Page404View from "@/views/Page404View.vue";
import CollegeView from "@/views/CollegeView.vue";
import CourseGroupView from "@/views/CourseGroupView.vue";
import LandingView from "@/views/LandingView.vue";
import CreatePostView from "@/views/CreatePostView.vue";
import SubtopicView from "@/views/SubtopicView.vue";
import ProfileView from "@/views/ProfileView.vue";
import SettingsView from "@/views/SettingsView.vue";
import PremiumView from "@/views/PremiumView.vue";
import SearchView from "@/views/SearchView.vue";

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
    {
      path: "/subtopic/:id",
      name: "SubtopicSingle",
      component: SubtopicView,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/create",
      name: "CreatePost",
      component: CreatePostView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/profile",
      name: "Profile",
      component: ProfileView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/settings",
      name: "Settings",
      component: SettingsView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/premium",
      name: "Premium",
      component: PremiumView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/search",
      name: "Search",
      component: SearchView,
      props: (route) => ({ query: route.query.q }),
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
