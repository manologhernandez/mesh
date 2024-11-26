<template>
  <div class="">
    <Navbar
      v-if="userIsLoggedIn"
      @toggle-sidebar="toggleSidebar"
    />

    <div
      class="relative min-h-screen"
      :class="userIsLoggedIn ? 'mt-16' : ''"
    >
      <Sidebar
        id="sidebar-container"
        class="fixed bg-responsive w-full z-40 lg:w-1/5 ps-4 lg:block lg:border-e lg:border-responsive"
        :class="!showSidebarMobile ? 'hidden' : ''"
        @close-sidebar="closeSidebar"
        v-if="userIsLoggedIn"
      />
      <div>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
  import Sidebar from "./components/Sidebar.vue";
  import Navbar from "@/components/Navbar.vue";
  import { ref, computed } from "vue";

  const showSidebarMobile = ref(false);

  const userIsLoggedIn = computed(() => {
    const token = localStorage.getItem("mesh_token");
    //TODO: verify if token is valid here
    return token && token != "";
  });

  function toggleSidebar() {
    showSidebarMobile.value = !showSidebarMobile.value;
  }

  function closeSidebar() {
    showSidebarMobile.value = false;
  }
</script>

<style lang="scss" scoped></style>
