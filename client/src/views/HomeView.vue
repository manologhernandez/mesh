<template>
  <div>
    <div class="relative">
      <div
        class="absolute w-full lg:left-[20%] lg:w-3/5 flex flex-col gap-0 p-2"
        ref="scrollComponent"
      >
        <Loading
          :active.sync="loading"
          :can-cancel="false"
          loader="dots"
          :is-full-page="true"
        />
        <ThreadlineWidget :threadlines="THREADLINES" />
        <Feed
          :posts="posts"
          @sort="handleSortChange"
        />
        <div class="relative h-10 my-4">
          <Loading
            :active="fetchingMorePosts"
            :can-cancel="false"
            loader="dots"
            :is-full-page="false"
          />
          <div
            class="text-center pt-4 pb-8"
            v-if="maxPostsReached"
          >
            You've reached the end of the feed.
          </div>
        </div>
      </div>
      <div
        class="absolute w-full lg:left-[80%] lg:w-1/5 flex flex-col gap-0 p-2"
      >
        <HomeRightPane />
      </div>
    </div>
  </div>
</template>

<script setup>
  import Feed from "@/components/Feed.vue";
  import HomeRightPane from "@/components/rightpanes/HomeRightPane.vue";
  import Loading from "vue-loading-overlay";
  import ThreadlineWidget from "@/components/ThreadlineWidget.vue";
  import { THREADLINES, BBPosts } from "@/tools/sampledata.js";
  import { onMounted, onUnmounted, ref } from "vue";

  const posts = ref([]);
  const loading = ref(false);
  const errors = ref([]);
  const scrollComponent = ref(null);

  const POST_COUNT = 5;
  const postOffset = ref(0);
  const fetchingMorePosts = ref(false);
  const maxPostsReached = ref(false);
  const sortBy = ref("desc");

  onMounted(() => {
    getPosts();
    window.addEventListener("scroll", handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = (e) => {
    let element = scrollComponent.value;
    if (
      element &&
      element.getBoundingClientRect().bottom - 400 < window.innerHeight &&
      !loading.value &&
      !fetchingMorePosts.value &&
      !maxPostsReached.value
    ) {
      loadMorePosts();
    }
  };

  function handleSortChange(sort) {
    sortBy.value = sort;
    postOffset.value = 0;
    maxPostsReached.value = false;
    getPosts();
  }

  function getPosts() {
    const request = new Request(
      `/api/posts?limit=${POST_COUNT}&offset=${postOffset.value}&sortBy=${sortBy.value}`,
      {
        method: "GET",
        headers: {},
      }
    );

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
        loading.value = false;
      });
  }

  function loadMorePosts() {
    const request = new Request(
      `/api/posts?limit=${POST_COUNT}&offset=${postOffset.value}&sortBy=${sortBy.value}`,
      {
        method: "GET",
        headers: {},
      }
    );

    fetchingMorePosts.value = true;
    fetch(request)
      .then((response) => {
        if (!response.ok) {
          // Check for a 404 error
          if (response.status === 404) {
            maxPostsReached.value = true;
            return;
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
        fetchingMorePosts.value = false;
      });
  }
</script>

<style lang="scss" scoped></style>
