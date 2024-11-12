<template>
  <div class="">
    <Navbar />
    <div class="min-h-screen pt-16">
      <div class="relative">
        <div
          id="sidebar-container"
          class="hidden fixed bg-responsive w-full z-50 md:w-1/5 ps-4 md:block md:border-e md:border-responsive"
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
</script>

<style lang="scss" scoped></style>
