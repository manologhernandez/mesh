<template>
  <div class="">
    <div>
      <ThreadlineWidget :threadlines="THREADLINES" />
    </div>
    <div class="flex justify-between items-center px-2 pt-1 pb-2">
      <div class="font-bold ps-2">My Feed</div>
      <!-- Sort by widget -->

      <form class="flex items-center gap-2">
        <label for="sortby" class="text-nowrap text-sm">Sort by:</label>
        <select
          id="sortBy"
          class="bg-neutral-100 border-0 text-sm rounded-lg w-full p-2.5 focus:ring-0 cursor-pointer active:bg-neutral-200 md:hover:bg-neutral-200 dark:bg-neutral-700 dark:placeholder-neutral-400 dark:active:bg-neutral-900 dark:md:hover:bg-neutral-900"
        >
          <option value="0" selected>Trending</option>
          <option value="1">Top</option>
          <option value="2">Latest</option>
        </select>
      </form>
    </div>
    <hr class="my-0 hr-responsive" />
    <!-- feed -->
    <div v-for="post in posts">
      <PostCard :post="post" />
      <hr class="my-0 hr-responsive" />
    </div>

    <!-- right pane -->
    <div
      class="hidden md:fixed md:left-[80%] md:w-1/5 md:p-2 md:pb-10 md:border-s md:top-16 md:right-0 border-responsive md:max-h-[92vh] scrollable md:flex md:flex-col md:gap-4"
    >
      <!-- ad space -->
      <div class="flex flex-col gap-2">
        <span class="font-bold">Sponsored</span>
        <div
          class="rounded-lg bg-cover bg-center aspect-square w-full flex justify-center items-center cursor-pointer"
          :style="`background-image: url(https://d2ygwlcxd4dd5s.cloudfront.net/P88_signup_bonus_EN_mobile_new_design_6c9eabca99.jpg)`"
        ></div>
      </div>
      <!-- bulletin board widget -->
      <BBWidget />
    </div>
  </div>
</template>

<script setup>
import BBWidget from "@/components/BBWidget.vue";
import PostCard from "@/components/PostCard.vue";
import ThreadlineWidget from "@/components/ThreadlineWidget.vue";
import { posts, THREADLINES } from "@/tools/sampledata.js";
</script>

<style lang="scss" scoped></style>
