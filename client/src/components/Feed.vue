<template>
  <div>
    <!-- sort options -->
    <div class="flex justify-end items-center px-2 pt-1 pb-2">
      <!-- <div class="font-bold ps-2">My Feed</div> -->
      <!-- Sort by widget -->

      <form class="flex items-center gap-2">
        <label
          for="sortby"
          class="text-nowrap text-sm"
          >Sort by:</label
        >
        <select
          id="sortBy"
          class="bg-neutral-100 border-0 text-sm rounded-lg w-full p-2.5 focus:ring-0 cursor-pointer active:bg-neutral-200 lg:hover:bg-neutral-200 dark:bg-neutral-700 dark:placeholder-neutral-400 dark:active:bg-neutral-900 dark:lg:hover:bg-neutral-900">
          <option
            value="0"
            selected>
            Trending
          </option>
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
  </div>
</template>

<script setup>
  import PostCard from "@/components/PostCard.vue";

  const props = defineProps({
    posts: Array,
  });
</script>

<style lang="scss" scoped></style>
