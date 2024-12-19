<template>
  <div class="relative">
    <div class="absolute w-full lg:left-[20%] lg:w-3/5 flex flex-col gap-0 p-2">
      <div>
        <Feed
          :feed-options="{
            search: props.query.trim(),
          }"
        />
      </div>
    </div>
    <div
      class="hidden absolute w-full lg:left-[80%] lg:w-1/5 lg:flex flex-col gap-0 p-2"
    >
      <SearchRightPane />
    </div>
  </div>
</template>

<script setup>
  import Feed from "@/components/Feed.vue";
  import SearchRightPane from "@/components/rightpanes/SearchRightPane.vue";
  const props = defineProps({
    query: String,
  });
</script>

<style lang="scss" scoped></style>
