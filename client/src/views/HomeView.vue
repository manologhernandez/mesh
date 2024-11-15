<template>
  <div>
    <ThreadlineWidget :threadlines="THREADLINES" />

    <HomeFeed :posts="posts" />
  </div>
</template>

<script setup>
import HomeFeed from "@/components/HomeFeed.vue";

import ThreadlineWidget from "@/components/ThreadlineWidget.vue";
import { posts, THREADLINES, BBPosts } from "@/tools/sampledata.js";
</script>

<style lang="scss" scoped></style>
