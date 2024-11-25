<template>
  <div class="">
    <Navbar v-if="userIsLoggedIn" />
    <div
      class="min-h-screen"
      :class="userIsLoggedIn ? 'pt-16' : ''">
      <div>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
  import Navbar from "@/components/Navbar.vue";
  import { computed } from "vue";

  const userIsLoggedIn = computed(() => {
    const token = localStorage.getItem("mesh_token");
    //TODO: verify if token is valid here
    return token && token != "";
  });
</script>

<style lang="scss" scoped></style>
