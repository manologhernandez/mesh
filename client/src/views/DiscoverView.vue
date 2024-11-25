<template>
  <div class="relative">
    <Sidebar
      id="sidebar-container"
      class="sidebar-responsive" />

    <div class="absolute w-full lg:left-[20%] lg:w-3/5 flex flex-col gap-0 p-2">
      Discover page
    </div>
    <div class="absolute w-full lg:left-[80%] lg:w-1/5 flex flex-col gap-0 p-2">
      Right pane
    </div>
  </div>
</template>

<script setup>
  import Sidebar from "@/components/Sidebar.vue";
</script>

<style lang="scss" scoped></style>
