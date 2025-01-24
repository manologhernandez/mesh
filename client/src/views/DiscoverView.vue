<template>
  <div class="relative">
    <div class="absolute w-full lg:left-[20%] lg:w-3/5 flex flex-col gap-0 p-2">
      <div class="font-bold text-xl mb-4 mt-2">Top posts this week</div>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <RouterLink
          :to="`/post/${post.uuid}`"
          class="h-48 rounded border border-neutral-200 dark:border-neutral-700 shadow hover:scale-105 transition-all"
          v-for="post in topPosts"
        >
          <div
            class="h-20 rounded-t bg-cover bg-center"
            :style="
              post.attachment
                ? `background-image: url(${post.attachment}); -webkit-mask-image: linear-gradient(to right, #fff, #fff);`
                : `background-color: ${post.college.color};`
            "
          ></div>
          <div class="font-semibold px-2 my-2 line-clamp-2">
            {{ post.title }}
          </div>
          <div class="px-2 text-sm truncate">
            {{ post.text }}
          </div>
        </RouterLink>
      </div>
      <hr class="hr-responsive my-4" />
      <div class="font-bold text-xl mb-4">Colleges on Mesh</div>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <RouterLink
          :to="`/college/${college.id}`"
          class="h-30 rounded border border-neutral-200 dark:border-neutral-700 shadow hover:scale-105 transition-all"
          v-for="college in colleges"
        >
          <div
            class="h-4 rounded-t"
            :style="`background-color: ${college.color}`"
          ></div>
          <div class="font-semibold px-2 my-2 line-clamp-2">
            {{ college.name }}
          </div>
        </RouterLink>
      </div>
    </div>
    <div
      class="hidden absolute w-full lg:left-[80%] lg:w-1/5 lg:flex flex-col gap-0 p-2"
    >
      <DiscoverRightPane />
    </div>
  </div>
</template>

<script setup>
  import DiscoverRightPane from "@/components/rightpanes/DiscoverRightPane.vue";
  import { onMounted, ref, inject } from "vue";
  import { useUserStore } from "@/stores/user";

  const userStore = useUserStore();
  const loading = inject("$loading");
  const colleges = ref([]);
  const topPosts = ref([]);

  onMounted(() => {
    getColleges();
    getTopPosts();
  });

  // fetch colleges
  function getColleges() {
    const request = new Request(
      `${import.meta.env.VITE_API_BASE_URL}/api/colleges`,
      {
        method: "GET",
        headers: {
          Authorization: userStore.token,
        },
      }
    );
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
        colleges.value = data.data;
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {});
  }

  // fetch top posts
  function getTopPosts() {
    topPosts.value = [];

    var today = new Date();
    var lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    var url = `${
      import.meta.env.VITE_API_BASE_URL
    }/api/posts?limit=8&offset=0&sortBy=top&startDate=${lastWeek.valueOf()}`;

    const request = new Request(url, {
      method: "GET",
      headers: { Authorization: userStore.token },
    });

    const loader = loading.show();
    fetch(request)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
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
        topPosts.value = data.data;
      })
      .catch((e) => {})
      .finally(() => {
        loader.hide();
      });
  }
</script>

<style lang="scss" scoped></style>
