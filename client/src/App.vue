<template>
  <div class="">
    <Navbar />
    <div class="min-h-screen pt-16">
      <div class="relative">
        <div
          id="sidebar-container"
          class="hidden fixed bg-responsive w-full z-40 lg:w-1/5 ps-4 lg:block lg:border-e lg:border-responsive">
          <Sidebar />
        </div>

        <div>
          <RouterView
            class="absolute w-full lg:left-[20%] lg:w-3/5 flex flex-col gap-0 p-2" />
        </div>
        <div>
          <RouterView
            name="rightPane"
            class="absolute w-full lg:left-[80%] lg:w-1/5 flex flex-col gap-0 p-2" />
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
