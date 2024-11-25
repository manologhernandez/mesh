<template>
  <div>
    <div class="relative">
      <Sidebar
        id="sidebar-container"
        class="sidebar-responsive" />

      <div
        class="absolute w-full lg:left-[20%] lg:w-3/5 flex flex-col gap-0 p-2">
        <ThreadlineWidget :threadlines="THREADLINES" />
        <Feed :posts="posts" />
      </div>
      <div
        class="absolute w-full lg:left-[80%] lg:w-1/5 flex flex-col gap-0 p-2">
        <HomeRightPane />
      </div>
    </div>
  </div>
</template>

<script setup>
  import Feed from "@/components/Feed.vue";
  import HomeRightPane from "@/components/rightpanes/HomeRightPane.vue";
  import Sidebar from "@/components/Sidebar.vue";

  import ThreadlineWidget from "@/components/ThreadlineWidget.vue";
  import { posts, THREADLINES, BBPosts } from "@/tools/sampledata.js";
</script>

<style lang="scss" scoped></style>
