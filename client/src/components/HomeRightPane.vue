<template>
  <div
    class="hidden md:fixed md:left-[80%] md:w-1/5 md:p-2 md:pb-10 md:border-s md:top-16 md:right-0 border-responsive md:max-h-[92vh] scrollable md:flex md:flex-col md:gap-4"
  >
    <!-- ad space -->
    <AdSquare />
    <!-- bulletin board widget -->
    <BBWidget :BBPosts="BBPosts" />
  </div>
</template>

<script setup>
import { BBPosts } from "@/tools/sampledata";
import BBWidget from "./BBWidget.vue";
import AdSquare from "./AdSquare.vue";
</script>

<style lang="scss" scoped></style>
