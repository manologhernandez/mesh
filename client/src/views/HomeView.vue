<template>
  <div>
    <div class="relative">
      <div
        class="absolute w-full lg:left-[20%] lg:w-3/5 flex flex-col gap-0 p-2"
      >
        <ThreadlineWidget :threadlines="THREADLINES" />
        <Feed :feed-options="{ collegeFilters: [1, 2, 3, 4] }" />
      </div>
      <div
        class="absolute w-full lg:left-[80%] lg:w-1/5 flex flex-col gap-0 p-2"
      >
        <HomeRightPane />
      </div>
    </div>
  </div>
</template>

<script setup>
  import Feed from "@/components/Feed.vue";
  import HomeRightPane from "@/components/rightpanes/HomeRightPane.vue";
  import ThreadlineWidget from "@/components/ThreadlineWidget.vue";
  import { THREADLINES, BBPosts } from "@/tools/sampledata.js";
  import { onMounted, onUnmounted, ref } from "vue";
</script>

<style lang="scss" scoped></style>
