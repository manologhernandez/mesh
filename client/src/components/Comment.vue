<template>
  <div :class="['border-l-2 pl-4 mb-4 border-responsive', nestedCommentClass]">
    <!-- Comment Content -->
    <div class="p-1 lg:p-2 rounded-lg flex flex-col gap-2">
      <div class="flex items-center gap-2">
        <div class="text-sm font-semibold">{{ comment.author }}</div>
        <div class="text-xs line-clamp-1">
          {{ dayjs(comment.dateCreated).fromNow() }}
        </div>
      </div>
      <p class="text-sm">{{ comment.content }}</p>

      <!-- Action Buttons -->
      <div class="flex items-center gap-4 mt-0 text-sm">
        <Like
          :likesCount="likes"
          @increment="likeComment"
          @decrement="unlikeComment"
          class="text-xs font-semibold"
        />

        <button
          v-if="isRootComment"
          @click="replyToComment"
          class="flex gap-2 items-center text-xs font-semibold"
        >
          <CommentIcon /> Reply
        </button>
      </div>
    </div>

    <!-- Replies (if within allowed nesting level) -->
    <div
      v-if="isRootComment && comment.replies.length"
      class="mt-2"
    >
      <Comment
        v-for="(reply, index) in visibleReplies"
        :key="reply.id"
        :comment="reply"
        :level="level + 1"
        :maxDepth="maxDepth"
      />
    </div>

    <!-- Show More Button (if hidden replies) -->
    <button
      v-if="
        isRootComment &&
        comment.replies.length > MAX_SHOWN_REPLIES &&
        !showAllReplies
      "
      @click="toggleShowMore"
      class="text-blue-500 text-sm mt-2"
    >
      Show all
    </button>

    <!-- Show Less Button -->
    <button
      v-if="showAllReplies && comment.replies.length > MAX_SHOWN_REPLIES"
      @click="toggleShowMore"
      class="text-blue-500 text-sm mt-2"
    >
      Show less
    </button>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import Like from "./Like.vue";
  import CommentIcon from "./icons/CommentIcon.vue";
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";
  dayjs.extend(relativeTime);

  // Props
  const props = defineProps({
    comment: Object,
    level: Number,
    maxDepth: {
      type: Number,
      default: 1, // Limit nesting to 1 level only
    },
  });

  // Local state
  const showAllReplies = ref(false);
  const likes = ref(props.comment.likes || 0);

  const MAX_SHOWN_REPLIES = 2;

  // Computed properties
  const isRootComment = computed(() => props.level === 0);
  const nestedCommentClass = computed(() =>
    props.level > 0 ? `ml-${props.level * 4}` : ""
  );

  // Visible replies based on "Show More" state
  const visibleReplies = computed(() => {
    return showAllReplies.value
      ? props.comment.replies
      : props.comment.replies.slice(0, MAX_SHOWN_REPLIES);
  });

  // Methods
  function toggleShowMore() {
    showAllReplies.value = !showAllReplies.value;
  }

  function likeComment() {
    likes.value += 1; // Increment likes count
  }
  function unlikeComment() {
    likes.value -= 1; // Increment likes count
  }

  function replyToComment() {
    // Trigger reply action, which can be handled in the parent component
    alert(`Reply to comment by ${props.comment.author}`);
  }
</script>

<style scoped>
  /* Additional styling if needed */
</style>
