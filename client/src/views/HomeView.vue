<template>
  <div>
    <div class="relative">
      <div
        class="absolute w-full lg:left-[20%] lg:w-3/5 flex flex-col gap-0 p-2"
      >
        <ThreadlineWidget :threadlines="threadlines" />
        <Feed :feed-options="{ collegeFilters: [] }" />
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
  import ThreadlineWidget from "@/components/ThreadlineWidget.vue";
  import { onMounted, ref, inject } from "vue";
  import { useUserStore } from "@/stores/user";

  const loading = inject("$loading");

  const userStore = useUserStore();
  const threadlines = ref([]);

  onMounted(() => {
    fetchThreadlines();
  });

  function fetchThreadlines() {
    threadlines.value = [];

    var url = `${import.meta.env.VITE_API_BASE_URL}/api/threadlines`;

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
        threadlines.value = data.data;
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        loader.hide();
      });
  }
</script>

<style lang="scss" scoped></style>
