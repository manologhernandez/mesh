<template>
  <div class="">
    <Navbar />
    <div class="min-h-screen pt-16">
      <div class="relative">
        <div
          id="sidebar-container"
          class="hidden fixed bg-white dark:bg-neutral-900 w-full z-50 md:w-1/5 ps-4 md:block md:border-e dark:md:border-neutral-600 md:border-neutral-200"
        >
          <Sidebar />
        </div>

        <div class="">
          <RouterView
            class="absolute w-full md:left-[20%] md:w-3/5 flex flex-col gap-0 p-2"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import PostCard from "@/components/PostCard.vue";

import { posts } from "@/tools/sampledata.js";
</script>

<style lang="scss" scoped></style>
