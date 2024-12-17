<template>
  <div
    class="hidden lg:fixed lg:left-[80%] lg:w-1/5 lg:p-2 lg:pb-10 lg:border-s lg:top-16 lg:right-0 border-responsive lg:max-h-[92vh] lg:min-h-[92vh] scrollable lg:flex lg:flex-col lg:gap-4"
  >
    <!-- ad space -->
    <AdSquare />
    <!-- bulletin board widget -->
    <BBWidget />
  </div>
</template>

<script setup>
  import BBWidget from "../BBWidget.vue";
  import AdSquare from "../AdSquare.vue";
</script>

<style lang="scss" scoped></style>
