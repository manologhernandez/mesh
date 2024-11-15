<template>
  <div class="h-max rounded-lg w-full flex flex-col justify-start">
    <h4 class="font-bold text-lg py-2">Bulletin Board</h4>
    <div class="rounded-lg p-0 text-sm grid grid-cols-2 gap-2">
      <div v-for="post in BBPosts">
        <BBWidgetCard :post="post" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { BBPosts } from "@/tools/sampledata";
import BBWidgetCard from "./BBWidgetCard.vue";

const props = defineProps({
  BBPosts: Array,
});
</script>

<style lang="scss" scoped></style>
