<template>
  <div class="relative">
    <div class="absolute w-full lg:left-[20%] lg:w-3/5 flex flex-col gap-0 p-2">
      <div class="p-8">
        <!-- Post Section -->
        <div class="p-0 rounded-lg mb-6">
          <div class="flex justify-between items-center gap-2 mb-4">
            <h2 class="text-xl font-semibold">{{ post.title }}</h2>
            <div class="text-sm line-clamp-1">
              {{ dayjs(post.dateCreated).fromNow() }}
            </div>
          </div>
          <p class="">{{ post.content }}</p>
        </div>

        <hr class="hr-responsive" />
        <!-- Comments Section -->
        <div class="mt-6">
          <h3 class="text-lg font-semibold mb-4">Comments</h3>
          <Comment
            v-for="comment in post.comments"
            :key="comment.id"
            :comment="comment"
            :level="0" />
        </div>
      </div>
    </div>
    <div class="absolute w-full lg:left-[80%] lg:w-1/5 flex flex-col gap-0 p-2">
      Post right pane
    </div>
  </div>
</template>

<script setup>
  import Sidebar from "@/components/Sidebar.vue";
  import { post1 as post } from "@/tools/sampledata";
  import Comment from "@/components/Comment.vue";
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";
  dayjs.extend(relativeTime);

  const props = defineProps({
    id: String,
  });
</script>

<style lang="scss" scoped></style>
