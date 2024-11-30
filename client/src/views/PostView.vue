<template>
  <div class="relative">
    <div class="absolute w-full lg:left-[20%] lg:w-3/5 flex flex-col gap-0 p-2">
      <div
        class="p-2 lg:p-4"
        v-if="post"
      >
        <!-- POST -->
        <div class="p-0 rounded-lg mb-6">
          <!-- POST HEADER -->
          <div class="flex items-start justify-between mb-4 lg:mb-2">
            <div class="flex gap-2 items-center">
              <!-- COLLEGE ICON -->
              <div
                class="h-8 w-8 rounded-full border-none"
                :style="`background-color: ${authorCollege.color}`"
                v-if="authorCollege"
              ></div>
              <!-- BREADCRUMBS & AUTHOR -->
              <div
                class="flex flex-col gap-0 text-neutral-900 dark:text-neutral-100"
              >
                <div class="text-sm flex items-center overflow-x-auto">
                  <!-- BREADCRUMBS -->
                  <template v-if="post.breadcrumbs">
                    <div
                      class="flex items-center flex-nowrap"
                      v-for="(breadcrumb, index) in post.breadcrumbs"
                    >
                      <ChevronRightIcon v-if="index > 0" />
                      <RouterLink
                        :to="breadcrumb.link"
                        class="active:text-blue-500 lg:hover:text-blue-500 text-nowrap font-semibold"
                        >{{ breadcrumb.title }}
                      </RouterLink>
                    </div>
                  </template>
                </div>
                <!-- AUTHOR -->
                <div class="text-xs">
                  {{ post.author && post.author.username }}
                </div>
              </div>
            </div>
            <!-- DATE POSTED -->
            <div
              class="text-sm line-clamp-1 text-neutral-700 dark:text-neutral-300"
            >
              {{ dayjs(post.dateCreated).fromNow() }}
            </div>
          </div>

          <div class="flex justify-between items-center gap-2 mb-4">
            <h2 class="text-xl font-semibold">{{ post.title }}</h2>
          </div>

          <div
            v-if="post.hasImage"
            class="max-h-96 flex justify-center mb-4 rounded-lg"
            :class="`image-container-${post.id}`"
          >
            <img
              :src="post.image"
              alt=""
              class="object-contain rounded-lg"
              :class="post.isBlurred ? 'blur-lg' : ''"
              crossOrigin="anonymous"
              @load="imageLoaded"
            />
            <div
              v-if="!isImageLoaded"
              class="bg-black opacity-30 rounded-lg h-96 w-full"
            ></div>
          </div>
          <p class="">{{ post.text }}</p>
        </div>

        <!-- POST BUTTONS -->
        <div class="flex gap-0 mb-4 text-sm font-semibold">
          <!-- LIKE -->
          <Like
            class="flex gap-1 items-center rounded-full pe-2 py-2"
            :likes-count="post.likesCount"
            @increment="likeClicked"
            @decrement="likeUnclicked"
          />
          <!-- SHARE -->
          <button
            class="flex gap-1 items-center lg:hover:bg-neutral-200 dark:lg:hover:bg-neutral-700 active:bg-neutral-200 dark:lg:active:bg-neutral-700 rounded-full px-2 py-2"
            @click="showShareModal"
          >
            <ShareIcon /> Share
          </button>

          <!-- REPORT -->
          <button
            class="flex gap-1 items-center lg:hover:bg-neutral-200 dark:lg:hover:bg-neutral-700 active:bg-neutral-200 dark:lg:active:bg-neutral-700 rounded-full px-2 py-2"
            @click="showReportModal"
          >
            <ReportIcon /> Report
          </button>
        </div>

        <hr class="hr-responsive" />
        <!-- COMMENTS SECTION -->
        <div class="mt-4">
          <!-- COMMENT INPUT -->
          <div class="flex flex-col lg:flex-row gap-2 p-2">
            <textarea
              class="text-sm rounded-lg border border-neutral-300 dark:border-neutral-600 w-full py-2 px-4 dark:bg-neutral-900 focus:h-36 lg:focus:h-auto"
              placeholder="Enter comment"
              rows="1"
              v-model="newComment"
            />

            <button
              class="bg-black text-white dark:bg-neutral-100 dark:text-black white font-medium text-sm rounded-lg lg:hover:bg-neutral-800 active:bg-neutral-800 dark:lg:hover:bg-neutral-200 dark:active:bg-neutral-200 px-4 py-2"
              v-if="newComment.trim() != ''"
              @click="submitComment"
            >
              Comment
            </button>
          </div>

          <!-- COMMENTS  -->
          <h3 class="text font-semibold my-4">Comments</h3>
          <Comment
            v-for="comment in post.comments"
            :key="comment.id"
            :comment="comment"
            :level="0"
          />

          <div
            class="text-sm mb-8"
            v-if="!postHasComments"
          >
            It's lonely out here. Post a comment to get the convo started!
          </div>
        </div>
      </div>
    </div>
    <!-- DESKTOP RIGHT SIDEPANE -->
    <div
      class="hidden fixed w-full lg:left-[80%] lg:w-1/5 lg:flex flex-col gap-8 px-2 py-8"
    >
      <!-- SUBTOPIC DESCRIPTION AND RULES -->
      <div class="px-2">
        <div
          class="rounded-lg border border-neutral-300 dark:border-neutral-600 px-4 py-4 flex flex-col gap-2"
          v-if="postSubtopic"
        >
          <div class="flex items-center gap-2">
            <img
              :src="postSubtopic.icon"
              alt=""
              class="h-6"
            />
            <span class="font-semibold">{{ postSubtopic.name }}</span>
          </div>
          <div>
            {{ postSubtopic.description }}
          </div>
          <div class="font-semibold">Rules</div>
          <ol class="">
            <li
              v-for="(rule, index) in postSubtopic.rules"
              :key="index"
              class="pb-2"
            >
              <button
                class="rounded-lg w-full text-left px-4 py-2 font-semibold bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                @click="toggleRule(index)"
              >
                {{ index + 1 }}. {{ rule.title }}
              </button>
              <div
                v-if="expandedRuleIndex === index"
                class="px-4 py-2"
              >
                {{ rule.description }}
              </div>
            </li>
          </ol>
        </div>
      </div>

      <!-- COURSE GROUP DESCRIPTION -->
      <div class="px-2">
        <div
          class="rounded-lg border border-neutral-300 dark:border-neutral-600 px-4 py-4"
          v-if="postCourseGroup"
        >
          <div class="flex items-center gap-2">
            <img
              :src="postCourseGroup.icon"
              alt=""
              class="h-6"
            />
            <span class="font-semibold">{{ postCourseGroup.name }}</span>
          </div>
          <div class="mt-2">{{ postCourseGroup.description }}</div>
        </div>
      </div>
    </div>
  </div>

  <ShareModal
    v-if="isShowShareModal"
    @close-modal="hideShareModal"
    :url="currUrl"
  />

  <ReportModal
    v-if="isShowReportModal"
    @close-modal="hideReportModal"
    :post="post"
  />
</template>

<script setup>
  import {
    posts,
    SUBTOPICS,
    COLLEGES,
    COURSE_GROUPS,
  } from "@/tools/sampledata";
  import Comment from "@/components/Comment.vue";
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";
  import { computed, ref, onMounted } from "vue";
  import ChevronRightIcon from "@/components/icons/ChevronRightIcon.vue";
  import Like from "@/components/Like.vue";
  import ShareIcon from "@/components/icons/ShareIcon.vue";
  import ReportIcon from "@/components/icons/ReportIcon.vue";
  import { FastAverageColor } from "fast-average-color";
  import { useRouter } from "vue-router";
  import ShareModal from "@/components/ShareModal.vue";
  import ReportModal from "@/components/ReportModal.vue";

  dayjs.extend(relativeTime);

  const props = defineProps({
    id: String,
  });

  const router = useRouter();

  const newComment = ref("");
  const expandedRuleIndex = ref(null);
  const isImageLoaded = ref(false);
  const isShowShareModal = ref(false);
  const isShowReportModal = ref(false);

  function showShareModal() {
    isShowShareModal.value = true;
  }

  function hideShareModal() {
    isShowShareModal.value = false;
  }

  function showReportModal() {
    isShowReportModal.value = true;
  }

  function hideReportModal() {
    isShowReportModal.value = false;
  }

  function imageLoaded() {
    isImageLoaded.value = true;
  }

  const currUrl = computed(() => {
    const route = router.resolve({});
    const absoluteURL = new URL(
      route.href,
      window.location.origin + window.location.pathname
    ).href;
    return absoluteURL;
  });

  const post = computed(() => {
    var myPost = posts.filter((post) => post.id == props.id)[0];

    if (myPost) {
      return myPost;
    } else {
      router.push("/404");
    }
  });

  const postSubtopic = computed(() => {
    if (post && post.value && post.value.subtopic && post.value.subtopic.id) {
      return SUBTOPICS.filter(
        (subtopic) => subtopic.id === post.value.subtopic.id
      )[0];
    }
    return null;
  });

  const postCourseGroup = computed(() => {
    if (
      post &&
      post.value &&
      post.value.courseGroup &&
      post.value.courseGroup.id
    ) {
      return COURSE_GROUPS.filter(
        (courseGroup) => courseGroup.id === post.value.courseGroup.id
      )[0];
    }
    return null;
  });

  const authorCollege = computed(() => {
    if (
      post &&
      post.value &&
      post.value.author &&
      post.value.author.college &&
      post.value.author.college.id
    ) {
      return COLLEGES.filter(
        (college) => college.id == post.value.author.college.id
      )[0];
    }
    return null;
  });

  const postHasComments = computed(() => {
    return (
      post &&
      post.value &&
      post.value.comments &&
      post.value.comments.length > 0
    );
  });

  function submitComment() {
    var comment = {
      value: newComment.value,
    };

    alert("sending comment: " + JSON.stringify(comment, null, 2));
  }

  function likeClicked() {
    alert("Like clicked");
  }

  function likeUnclicked() {
    alert("Like unclicked");
  }

  function toggleRule(index) {
    expandedRuleIndex.value = expandedRuleIndex.value === index ? null : index;
  }

  function setupFac() {
    if (post && post.value) {
      const fac = new FastAverageColor();
      const container = document.querySelector(
        `.image-container-${post.value.id}`
      );

      if (container && post.value.hasImage) {
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
    }
  }

  onMounted(() => {
    setupFac();
  });
</script>

<style lang="scss" scoped></style>
