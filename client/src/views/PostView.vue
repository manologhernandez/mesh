<template>
  <div class="relative">
    <div class="absolute w-full lg:left-[20%] lg:w-3/5 flex flex-col gap-0 p-2">
      <span
        v-if="errors.post"
        class="mt-2 text-sm font-semibold bg-red-700 text-white py-4 px-4 rounded"
      >
        {{ errors.post }}
      </span>
      <div
        class="p-2 lg:p-4"
        v-if="post"
      >
        <!-- POST -->
        <div class="relative p-0 rounded-lg mb-6">
          <!-- POST HEADER -->
          <div class="flex items-start justify-between mb-4 lg:mb-2">
            <div class="flex gap-2 items-center">
              <!-- COLLEGE ICON -->
              <div
                class="h-8 w-8 rounded-full border-none"
                :style="`background-color: ${post.college.color}`"
                v-if="post.college"
              ></div>
              <!-- BREADCRUMBS & AUTHOR -->
              <div
                class="flex flex-col gap-0 text-neutral-900 dark:text-neutral-100"
              >
                <div class="text-sm flex items-center overflow-x-auto">
                  <!-- BREADCRUMBS -->
                  <template
                    v-if="post.college || post.subtopic || post.courseGroup"
                  >
                    <div class="flex items-center flex-nowrap">
                      <!-- College link -->
                      <RouterLink
                        :to="`/college/${post.college.id}`"
                        class="active:text-blue-500 lg:hover:text-blue-500 text-nowrap font-semibold"
                        >{{ post.college.short_name }}
                      </RouterLink>
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
                    </div>
                  </template>
                </div>
                <!-- AUTHOR -->
                <div class="text-xs">
                  {{ post.author_username }}
                </div>
              </div>
            </div>
            <!-- DATE POSTED -->
            <div
              class="text-sm line-clamp-1 text-neutral-700 dark:text-neutral-300"
            >
              {{ dayjs(post.created_at).fromNow() }}
            </div>
          </div>
          <!-- POST BODY -->
          <div class="flex justify-between items-center gap-2 mb-4">
            <h2 class="text-xl font-semibold">{{ post.title }}</h2>
          </div>

          <div :class="blurPost ? 'blur-lg' : ''">
            <div
              v-if="post.attachment"
              class="max-h-96 flex justify-center mb-4 rounded-lg"
              :class="`image-container-${post.uuid}`"
            >
              <img
                :src="post.attachment"
                alt=""
                class="object-contain rounded-lg"
                crossOrigin="anonymous"
                loading="lazy"
                @load="imageLoaded"
              />
              <div
                v-if="!isImageLoaded"
                class="bg-black opacity-30 rounded-lg h-96 w-full"
              ></div>
            </div>
            <p class="">{{ post.text }}</p>
          </div>
          <!-- BLUR WARNING -->
          <div
            class="absolute inset-0 flex justify-center items-center"
            v-if="blurPost"
            @click.prevent="unblurPost"
          >
            <span
              class="mx-4 text-sm font-semibold bg-white/30 dark:bg-black/50 rounded-lg p-2 backdrop-blur-sm cursor-pointer"
            >
              This post may contain spoilers and/or sensitive content. Click to
              view.
            </span>
          </div>
        </div>

        <!-- POST BUTTONS -->
        <div class="flex gap-0 mb-4 text-sm font-semibold">
          <!-- LIKE -->
          <Like
            class="flex gap-1 items-center rounded-full pe-2 py-2"
            :likes-count="postLikeCount"
            :liked="hasLikedPost"
            @increment="likePost"
            @decrement="unlikePost"
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
          <h3 class="text font-semibold my-4">
            Comments ({{ postCommentsCount }})
          </h3>
          <Comment
            v-for="comment in postComments"
            :key="comment.id"
            :comment="comment"
            :level="0"
            @reply="getComments(id)"
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
              loading="lazy"
            />
            <span class="font-semibold">{{ postSubtopic.name }}</span>
          </div>
          <div>
            {{ postSubtopic.description }}
          </div>
          <div class="font-semibold">Rules</div>
          <ol class="">
            <li
              v-for="(rule, index) in postSubtopic.subtopic_rule"
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
              loading="lazy"
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
  import Comment from "@/components/Comment.vue";
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";
  import { computed, ref, onMounted, watch, inject } from "vue";
  import ChevronRightIcon from "@/components/icons/ChevronRightIcon.vue";
  import Like from "@/components/Like.vue";
  import ShareIcon from "@/components/icons/ShareIcon.vue";
  import ReportIcon from "@/components/icons/ReportIcon.vue";
  import { FastAverageColor } from "fast-average-color";
  import { useRouter } from "vue-router";
  import ShareModal from "@/components/ShareModal.vue";
  import ReportModal from "@/components/ReportModal.vue";
  import { useUserStore } from "@/stores/user";

  dayjs.extend(relativeTime);

  const loading = inject("$loading");

  const props = defineProps({
    id: String,
  });

  const router = useRouter();

  const newComment = ref("");
  const expandedRuleIndex = ref(null);
  const isImageLoaded = ref(false);
  const isShowShareModal = ref(false);
  const isShowReportModal = ref(false);
  const isUnblurPost = ref(false);
  const userStore = useUserStore();

  const errors = ref({});

  const post = ref(null);
  const postComments = ref([]);
  const postCommentsCount = ref(0);
  const hasLikedPost = ref(false);
  const incrementLikeCount = ref(false);
  const decrementLikeCount = ref(false);

  onMounted(() => {
    setupFac();
  });

  // watch the params of the route to fetch the data again
  watch(
    () => props.id,
    (newVal) => {
      getPost(newVal);
      getComments(newVal);
    },
    { immediate: true }
  );

  // fetch post
  function getPost(id) {
    const request = new Request(`/api/post?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: userStore.token,
      },
    });

    const loader = loading.show();
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
          if (response.status === 404) {
            router.push("/404");
          }
          // Handle other status codes
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json(); // Parse JSON if response is ok
      })
      .then((data) => {
        post.value = data.data;
        hasLikedPost.value = post.value.user_has_reacted.length > 0;
      })
      .catch((e) => {
        errors.value.post = e.message;
      })
      .finally(() => {
        loader.hide();
      });
  }

  // fetch comments
  function getComments(postUuid) {
    const request = new Request(`/api/comment?postUuid=${postUuid}`, {
      method: "GET",
      headers: {
        Authorization: userStore.token,
      },
    });

    const loader = loading.show();
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
        postComments.value = data.data;
        postCommentsCount.value = data.count;
      })
      .catch((e) => {
        errors.value.post = e.message;
      })
      .finally(() => {
        loader.hide();
      });
  }

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

  function unblurPost() {
    isUnblurPost.value = true;
  }

  const blurPost = computed(() => {
    return !isUnblurPost.value && post.value.is_censored;
  });

  const currUrl = computed(() => {
    const route = router.resolve({});
    const absoluteURL = new URL(
      route.href,
      window.location.origin + window.location.pathname
    ).href;
    return absoluteURL;
  });

  const postSubtopic = computed(() => {
    if (post && post.value && post.value.subtopic) {
      return post.value.subtopic;
    }
    return null;
  });

  const postCourseGroup = computed(() => {
    if (post && post.value && post.value.course_group) {
      return post.value.course_group;
    }
    return null;
  });

  const postHasComments = computed(() => {
    return postComments.value && postComments.value.length > 0;
  });

  const postLikeCount = computed(() => {
    if (incrementLikeCount.value) {
      return Number(post.value.total_reactions[0]["count"]) + 1;
    }
    if (decrementLikeCount.value) {
      return Number(post.value.total_reactions[0]["count"]) - 1;
    }
    return Number(post.value.total_reactions[0]["count"]);
  });

  function submitComment() {
    var reqBody = {
      text: newComment.value,
      postUuid: post.value.uuid,
    };

    const request = new Request(`/api/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: userStore.token,
      },
      body: JSON.stringify(reqBody),
    });

    const loader = loading.show();
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
        newComment.value = "";
        getComments(post.value.uuid);
      })
      .catch((e) => {
        errors.value.post = e.message;
      })
      .finally(() => {
        loader.hide();
      });
  }

  function likePost() {
    const reqBody = {
      postUuid: post.value.uuid,
      reaction: "like",
    };

    const request = new Request("/api/react_post", {
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
        hasLikedPost.value = true;
        incrementLikeCount.value = true;
        decrementLikeCount.value = false;
      })
      .catch((e) => {
        errors.value.post = e.message;
      })
      .finally(() => {});
  }

  function unlikePost() {
    const reqBody = {
      postUuid: post.value.uuid,
    };

    const request = new Request("/api/react_post", {
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
        hasLikedPost.value = false;
        incrementLikeCount.value = false;
        decrementLikeCount.value = true;
      })
      .catch((e) => {
        errors.value.post = e.message;
      })
      .finally(() => {});
  }

  function toggleRule(index) {
    expandedRuleIndex.value = expandedRuleIndex.value === index ? null : index;
  }

  function setupFac() {
    if (post && post.value) {
      const fac = new FastAverageColor();
      const container = document.querySelector(
        `.image-container-${post.value.uuid}`
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
</script>

<style lang="scss" scoped></style>
