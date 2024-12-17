<template>
  <div>
    <div class="relative">
      <div
        class="absolute w-full lg:left-[20%] lg:w-3/5 flex flex-col gap-0 p-2"
      >
        <Loading
          :active="loading"
          :can-cancel="false"
          loader="dots"
          :is-full-page="true"
        />
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
  import { onMounted, ref } from "vue";
  import { useUserStore } from "@/stores/user";

  import Loading from "vue-loading-overlay";

  const userStore = useUserStore();
  const threadlines = ref([]);
  const loading = ref(false);

  onMounted(() => {
    fetchThreadlines();
  });

  function fetchThreadlines() {
    threadlines.value = [];

    var url = `/api/threadlines`;

    const request = new Request(url, {
      method: "GET",
      headers: { Authorization: userStore.token },
    });

    loading.value = true;
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
        loading.value = false;
      });
  }
</script>

<style lang="scss" scoped></style>
