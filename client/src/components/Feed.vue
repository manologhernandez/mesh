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
          class="appearance-none bg-neutral-100 border-0 text-sm rounded-lg w-full p-2.5 focus:ring-0 cursor-pointer active:bg-neutral-200 lg:hover:bg-neutral-200 dark:bg-neutral-700 dark:placeholder-neutral-400 dark:active:bg-neutral-900 dark:lg:hover:bg-neutral-900"
          v-model="sortBy"
          @change="handleSortChange"
        >
          <option
            value="desc"
            selected
          >
            Latest
          </option>
          <option value="">Top</option>
          <option value="asc">Oldest</option>
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
  import { ref } from "vue";

  const sortBy = ref("desc");
  const props = defineProps({
    posts: Array,
  });
  const emit = defineEmits(["sort"]);

  function handleSortChange() {
    emit("sort", sortBy.value);
  }
</script>

<style lang="scss" scoped></style>
