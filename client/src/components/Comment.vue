<template>
  <div :class="['border-l-2 pl-4 mb-4 border-responsive', nestedCommentClass]">
    <!-- Comment Content -->
    <div class="p-1 lg:p-2 rounded-lg flex flex-col gap-1">
      <div class="flex items-center gap-2">
        <div
          class="h-4 w-4 rounded-full border-none"
          :style="`background-color: ${comment.college.color}`"
          v-if="comment.college"
        ></div>
        <div class="text-sm font-semibold">{{ comment.author }}</div>
        <div class="text-xs line-clamp-1">
          {{ dayjs(comment.created_at).fromNow() }}
        </div>
      </div>
      <p class="text-sm">{{ comment.text }}</p>

      <!-- Action Buttons -->
      <div class="flex items-center gap-4 mt-1 text-sm">
        <Like
          :likesCount="commentLikeCount"
          :liked="hasLikedComment"
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
      <!-- COMMENT INPUT -->
      <div
        class="relative flex flex-col lg:flex-row gap-2 mt-2"
        v-if="showReplyCommentInput"
      >
        <textarea
          class="text-sm rounded-lg border border-neutral-300 dark:border-neutral-600 w-full py-2 px-4 dark:bg-neutral-900 focus:h-36 lg:focus:h-auto"
          placeholder="Enter reply"
          rows="1"
          v-model="replyComment"
        />

        <button
          class="bg-black text-white dark:bg-neutral-100 dark:text-black white font-medium text-sm rounded-lg lg:hover:bg-neutral-800 active:bg-neutral-800 dark:lg:hover:bg-neutral-200 dark:active:bg-neutral-200 px-4 py-2"
          v-if="replyComment.trim() != ''"
          @click="submitCommentReply"
        >
          Comment
        </button>
        <Loading
          :active.sync="loading"
          :can-cancel="false"
          loader="dots"
          :is-full-page="false"
        />
      </div>
    </div>

    <!-- Replies (if within allowed nesting level) -->
    <div
      v-if="isRootComment && comment.replies && comment.replies.length"
      class="mt-2"
    >
      <Comment
        v-for="(reply, index) in visibleReplies"
        :key="reply.id"
        :comment="reply"
        :level="level + 1"
        :maxDepth="maxDepth"
        @reply="emit('reply')"
      />
    </div>

    <!-- Show More Button (if hidden replies) -->
    <button
      v-if="
        isRootComment &&
        comment.replies &&
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
      v-if="
        showAllReplies &&
        comment.replies &&
        comment.replies.length > MAX_SHOWN_REPLIES
      "
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
  import Loading from "vue-loading-overlay";
  import { useUserStore } from "@/stores/user";
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

  // Emits
  const emit = defineEmits(["reply"]);

  // Local state
  const showAllReplies = ref(false);
  const replyComment = ref("");
  const showReplyCommentInput = ref(false);
  const loading = ref(false);
  const userStore = useUserStore();
  const hasLikedComment = ref(props.comment.user_has_reacted.length > 0);

  const incrementLikeCount = ref(false);
  const decrementLikeCount = ref(false);

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

  function replyToComment() {
    // Trigger reply action, which can be handled in the parent component
    showReplyCommentInput.value = true;
  }

  function submitCommentReply() {
    var reqBody = {
      text: replyComment.value,
      postUuid: props.comment.post_uuid,
      replyTo: props.comment.id,
    };

    const request = new Request(`/api/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: userStore.token,
      },
      body: JSON.stringify(reqBody),
    });

    loading.value = true;
    fetch(request)
      .then((response) => {
        if (!response.ok) {
          // Check for a 400 error
          if (response.status === 400) {
            return response.json().then((errorData) => {
              throw new Error(`${errorData.message || "Bad Request"}`);
            });
          }
          if (response.status === 401 || response.status === 403) {
            userStore.clearUser();
            router.go(0);
          }
          // Handle other status codes
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json(); // Parse JSON if response is ok
      })
      .then((data) => {
        replyComment.value = "";
        showReplyCommentInput.value = false;
        emit("reply");
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        loading.value = false;
      });
  }

  function likeComment() {
    const reqBody = {
      reaction: "like",
      commentId: props.comment.id,
    };

    const request = new Request("/api/react_comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: userStore.token,
      },
      body: JSON.stringify(reqBody),
    });

    fetch(request)
      .then((response) => {
        if (!response.ok) {
          // Check for a 400 error
          if (response.status === 400) {
            return response.json().then((errorData) => {
              throw new Error(`${errorData.message || "Bad Request"}`);
            });
          }
          if (response.status === 401 || response.status === 403) {
            userStore.clearUser();
            router.go(0);
          }
          // Handle other status codes
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json(); // Parse JSON if response is ok
      })
      .then((data) => {
        hasLikedComment.value = true;
        incrementLikeCount.value = true;
        decrementLikeCount.value = false;
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {});
  }

  function unlikeComment() {
    const reqBody = {
      commentId: props.comment.id,
    };

    const request = new Request("/api/react_comment", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: userStore.token,
      },
      body: JSON.stringify(reqBody),
    });

    fetch(request)
      .then((response) => {
        if (!response.ok) {
          // Check for a 400 error
          if (response.status === 400) {
            return response.json().then((errorData) => {
              throw new Error(`${errorData.message || "Bad Request"}`);
            });
          }
          if (response.status === 401 || response.status === 403) {
            userStore.clearUser();
            router.go(0);
          }
          // Handle other status codes
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json(); // Parse JSON if response is ok
      })
      .then((data) => {
        hasLikedComment.value = false;
        incrementLikeCount.value = false;
        decrementLikeCount.value = true;
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {});
  }

  const commentLikeCount = computed(() => {
    if (incrementLikeCount.value) {
      return Number(props.comment.total_reactions[0]["count"]) + 1;
    }
    if (decrementLikeCount.value) {
      return Number(props.comment.total_reactions[0]["count"]) - 1;
    }
    return Number(props.comment.total_reactions[0]["count"]);
  });
</script>

<style scoped>
  /* Additional styling if needed */
</style>
