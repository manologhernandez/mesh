<template>
  <div ref="scrollComponent">
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
          id="sortby"
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
          <option value="top">Top</option>
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
    <div
      class="relative h-10 my-4"
      ref="bottomFeedContainer"
    >
      <div
        class="text-center pt-4 pb-8"
        v-if="maxPostsReached"
      >
        You've reached the end of the feed.
      </div>
    </div>
  </div>
</template>

<script setup>
  import PostCard from "@/components/PostCard.vue";
  import { ref, onMounted, onUnmounted, watch, inject } from "vue";
  import { useUserStore } from "@/stores/user";
  import { useRouter } from "vue-router";

  const loading = inject("$loading");

  const sortBy = ref("desc");
  const userStore = useUserStore();
  const router = useRouter();

  const POST_COUNT = 5;
  const postOffset = ref(0);

  const errors = ref([]);

  const isLoading = ref(false);
  const maxPostsReached = ref(false);
  const bottomFeedContainer = ref();

  const posts = ref([]);

  const scrollComponent = ref(null);

  const props = defineProps({
    feedOptions: {
      type: Object,
    },
  });

  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
    getPosts();
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  watch(
    () => props.feedOptions,
    (newVal, oldVal) => {
      // console.log("watch called, ", oldVal, newVal);

      // if feedOptions changed, reset and get new posts
      if (JSON.stringify(oldVal) != JSON.stringify(newVal)) {
        maxPostsReached.value = false;
        postOffset.value = 0;
        getPosts();
      }
    }
  );

  function handleSortChange() {
    postOffset.value = 0;
    maxPostsReached.value = false;
    getPosts();
  }

  function getPosts() {
    posts.value = [];

    const url = generateRequestUrl();

    const request = new Request(url, {
      method: "GET",
      headers: { Authorization: userStore.token },
    });

    const loader = loading.show();
    isLoading.value = true;
    fetch(request)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            maxPostsReached.value = true;
            return;
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
        posts.value = data.data;
        postOffset.value = postOffset.value + 1;
      })
      .catch((e) => {
        errors.value.feed = e.message;
      })
      .finally(() => {
        loader.hide();
        isLoading.value = false;
      });
  }

  function loadMorePosts() {
    const url = generateRequestUrl();
    const request = new Request(url, {
      method: "GET",
      headers: { Authorization: userStore.token },
    });

    isLoading.value = true;
    const loader = loading.show({
      container: bottomFeedContainer.value,
      opacity: 0,
    });
    fetch(request)
      .then((response) => {
        if (!response.ok) {
          // Check for a 404 error
          if (response.status === 404) {
            maxPostsReached.value = true;
            return;
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
        posts.value.push(...data.data);
        postOffset.value = postOffset.value + 1;
      })
      .catch((e) => {
        errors.value.feed = e.message;
      })
      .finally(() => {
        isLoading.value = false;
        loader.hide();
      });
  }

  function generateRequestUrl() {
    var baseUrl = `/api/posts?limit=${POST_COUNT}&offset=${postOffset.value}&sortBy=${sortBy.value}`;

    if (
      props.feedOptions &&
      props.feedOptions.collegeFilters &&
      props.feedOptions.collegeFilters.length > 0
    ) {
      baseUrl += `&college=${props.feedOptions.collegeFilters.join(",")}`;
    }
    if (
      props.feedOptions &&
      props.feedOptions.subtopicFilters &&
      props.feedOptions.subtopicFilters.length > 0
    ) {
      baseUrl += `&subtopic=${props.feedOptions.subtopicFilters.join(",")}`;
    }
    if (
      props.feedOptions &&
      props.feedOptions.courseGroupFilters &&
      props.feedOptions.courseGroupFilters.length > 0
    ) {
      baseUrl += `&courseGroup=${props.feedOptions.courseGroupFilters.join(
        ","
      )}`;
    }
    if (
      props.feedOptions &&
      props.feedOptions.userFilters &&
      props.feedOptions.userFilters.length > 0
    ) {
      baseUrl += `&user=${props.feedOptions.userFilters.join(",")}`;
    }

    return baseUrl;
  }

  const handleScroll = (e) => {
    let element = scrollComponent.value;
    if (
      element &&
      element.getBoundingClientRect().bottom - 400 < window.innerHeight &&
      !isLoading.value &&
      !maxPostsReached.value
    ) {
      loadMorePosts();
    }
  };
</script>

<style lang="scss" scoped></style>
