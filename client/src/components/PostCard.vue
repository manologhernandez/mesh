<template>
  <div
    class="rounded-lg active:bg-neutral-100 dark:active:bg-neutral-800 lg:hover:bg-neutral-100 dark:lg:hover:bg-neutral-800 p-4 flex flex-col gap-2 w-full"
  >
    <!-- breadcrumbs and date -->
    <div class="flex justify-between text-neutral-700 dark:text-neutral-300">
      <div class="text-sm flex items-center max-w-[70%] overflow-x-auto">
        <!-- BREADCRUMBS -->
        <template v-if="post.college || post.subtopic || post.courseGroup">
          <div class="flex items-center flex-nowrap">
            <!-- College link -->
            <RouterLink
              :to="`/college/${post.college.id}`"
              class="active:text-blue-500 lg:hover:text-blue-500 text-nowrap font-semibold"
              >{{ post.college.short_name }}
            </RouterLink>
            <!-- Subtopic link -->
            <div
              class="flex items-center"
              v-if="post.subtopic"
            >
              <ChevronRightIcon />
              <RouterLink
                :to="`/subtopic/${post.subtopic.id}`"
                class="active:text-blue-500 lg:hover:text-blue-500 text-nowrap font-semibold"
                >{{ post.subtopic.name }}
              </RouterLink>
            </div>
            <!-- Course Group link -->
            <div
              class="flex items-center"
              v-if="post.course_group"
            >
              <ChevronRightIcon />
              <RouterLink
                :to="`/coursegroup/${post.course_group.id}`"
                class="active:text-blue-500 lg:hover:text-blue-500 text-nowrap font-semibold"
                >{{ post.course_group.name }}
              </RouterLink>
            </div>
          </div>
        </template>
      </div>
      <div class="text-sm line-clamp-1">
        {{ dayjs(post.created_at).fromNow() }}
      </div>
    </div>

    <RouterLink
      :to="`/post/${post.uuid}`"
      class="cursor-pointer"
    >
      <!-- post title -->
      <div class="text-xl font-bold line-clamp-1">{{ post.title }}</div>

      <!-- post body -->
      <div class="relative">
        <div :class="blurPost ? 'blur' : ''">
          <!-- IMAGE -->
          <div
            v-if="post.attachment"
            class="flex justify-center max-h-96 rounded-lg mt-2"
            :class="`image-container-${post.uuid}`"
          >
            <img
              :src="post.attachment"
              alt=""
              class="object-contain rounded-lg"
              :class="blurPost ? 'blur-lg' : ''"
              crossOrigin="anonymous"
              @load="imageLoaded"
              loading="lazy"
            />
            <div
              v-if="!isImageLoaded"
              class="bg-black opacity-30 rounded-lg h-96 w-full"
            ></div>
          </div>
          <!-- TEXT -->
          <div
            v-else
            class="line-clamp-5 text-neutral-700 dark:text-neutral-300"
          >
            {{ post.text }}
          </div>
        </div>
        <!-- BLUR WARNING -->
        <div
          class="absolute inset-0 flex justify-center items-center"
          v-if="blurPost"
          @click.prevent="unblurPost"
        >
          <span
            class="mx-4 text-sm font-semibold bg-white/30 dark:bg-black/50 rounded-lg p-2 backdrop-blur-sm"
          >
            This post may contain spoilers and/or sensitive content. Click to
            view.
          </span>
        </div>
      </div>
    </RouterLink>

    <!-- like and comment count -->
    <div
      class="flex gap-4 justify-center text-sm items-center align-middle text-neutral-700 dark:text-neutral-300 pt-2"
    >
      <Like
        :likesCount="post.likesCount"
        @increment="postLiked()"
        @decrement="postUnliked()"
      />

      <RouterLink
        :to="`/post/${post.uuid}`"
        class="flex gap-1 items-center lg:hover:text-red-500 active:text-red-500"
      >
        <CommentIcon />
        <span>{{ post.commentsCount }}</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
  import CommentIcon from "./icons/CommentIcon.vue";
  import ChevronRightIcon from "./icons/ChevronRightIcon.vue";
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";
  import { computed, onMounted, ref } from "vue";
  import { FastAverageColor } from "fast-average-color";
  import Like from "./Like.vue";

  dayjs.extend(relativeTime);

  const props = defineProps({
    post: Object,
  });

  const isImageLoaded = ref(false);
  const isUnblurPost = ref(false);

  function imageLoaded() {
    isImageLoaded.value = true;
  }

  function postLiked() {
    alert(`Post liked`);
  }
  function postUnliked() {
    alert(`Post unliked`);
  }

  function unblurPost() {
    isUnblurPost.value = true;
  }

  const blurPost = computed(() => {
    return !isUnblurPost.value && props.post.is_censored;
  });

  onMounted(() => {
    const fac = new FastAverageColor();
    const container = document.querySelector(
      `.image-container-${props.post.uuid}`
    );

    if (container && props.post.attachment) {
      fac
        .getColorAsync(container.querySelector("img"))
        .then((color) => {
          container.style.backgroundColor = color.rgba;
          container.style.color = color.isDark ? "#fff" : "#000";
        })
        .catch((e) => {
          console.log(e);
        });
    }
  });
</script>

<style lang="scss" scoped></style>
