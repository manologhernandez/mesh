<template>
  <div>
    <ThreadlineWidget :threadlines="THREADLINES" />

    <Feed :posts="posts" />
  </div>
</template>

<script setup>
import Feed from "@/components/Feed.vue";

import ThreadlineWidget from "@/components/ThreadlineWidget.vue";
import { posts, THREADLINES, BBPosts } from "@/tools/sampledata.js";
</script>

<style lang="scss" scoped></style>
