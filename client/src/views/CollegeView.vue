<template>
  <div class="relative">
    <div class="absolute w-full lg:left-[20%] lg:w-3/5 flex flex-col gap-0">
      <!-- Header -->
      <div
        class="p-4 flex gap-4 justify-around lg:justify-start items-center lg:items-end text-white dark:text-white"
        :style="`background-color: ${college.color}`"
      >
        <div class="text-4xl lg:text-6xl font-bold">
          {{ college.name }}
        </div>
        <!-- <div
          class="flex flex-wrap max-w-[220px] lg:max-w-full lg:flex-nowrap gap-x-4 gap-y-2 text-sm items-center"
        >
          <div class="max-w-1/2 lg:w-auto">
            Users: <span class="font-semibold">{{ college.meshers }}</span>
          </div>
          <div class="max-w-1/2 lg:w-auto">
            Followers:
            <span class="font-semibold">{{ college.followers }}</span>
          </div>
          <div
            class="bg-neutral-200 dark:bg-neutral-200 dark:text-neutral-800 text-neutral-800 px-4 py-1 rounded-md cursor-pointer font-semibold w-full lg:w-auto text-center"
          >
            Follow
          </div>
        </div> -->
      </div>

      <div class="p-2">
        <!-- Tabbed Menu -->
        <div
          class="text-sm font-medium text-center text-neutral-500 mb-2 border-b border-neutral-200 dark:text-neutral-400 dark:border-neutral-700"
        >
          <ul class="flex flex-wrap -mb-px">
            <li class="me-2">
              <div
                @click="showFeed"
                class="inline-block p-4 border-b-2 rounded-t-lg cursor-pointer"
                :class="
                  showingFeed
                    ? 'text-neutral-800 border-neutral-800 dark:text-neutral-200 dark:border-neutral-200'
                    : 'border-transparent lg:hover:text-neutral-800 lg:hover:border-neutral-800 dark:lg:hover:text-neutral-200 active:text-neutral-800 active:border-neutral-800 dark:active:text-neutral-200'
                "
              >
                Feed
              </div>
            </li>
            <li class="me-2">
              <div
                @click="showInfo"
                class="inline-block p-4 border-b-2 rounded-t-lg cursor-pointer"
                :class="
                  showingInfo
                    ? 'text-neutral-800 border-neutral-800 dark:text-neutral-200 dark:border-neutral-200'
                    : 'border-transparent lg:hover:text-neutral-800 lg:hover:border-neutral-800 dark:lg:hover:text-neutral-200 active:text-neutral-800 active:border-neutral-800 dark:active:text-neutral-200'
                "
              >
                Information
              </div>
            </li>
          </ul>
        </div>

        <!-- Feed -->
        <div v-show="showingFeed">
          <Feed :feed-options="{ collegeFilters: [props.id] }" />
        </div>

        <!-- Information -->
        <div
          v-show="showingInfo"
          class="p-4"
        >
          <div class="mb-4">
            <strong>Main Campus:</strong>
            {{ college.address }}
          </div>
          <div class="mb-4">
            {{ college.description }}
          </div>

          <div class="flex flex-col gap-0 lg:flex-row lg:gap-4">
            <div><strong>Telephone: </strong> {{ college.telephone }}</div>

            <div>
              <strong>Email: </strong
              ><a :href="`mailto:${college.email}`">{{ college.email }}</a>
            </div>
            <div>
              <strong>Website: </strong>
              <a
                :href="college.website"
                target="_blank"
                class="underline underline-offset-4"
                >{{ college.website }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute w-full lg:left-[80%] lg:w-1/5 flex flex-col gap-0 p-2">
      <CollegeRightPane />
    </div>
  </div>
</template>

<script setup>
  import Feed from "@/components/Feed.vue";
  import { ref, watch, inject } from "vue";
  import { useUserStore } from "@/stores/user";
  import CollegeRightPane from "@/components/rightpanes/CollegeRightPane.vue";
  import Loading from "vue-loading-overlay";
  import { useRouter } from "vue-router";

  const loading = inject("$loading");

  const showingFeed = ref(true);
  const showingInfo = ref(false);

  const userStore = useUserStore();
  const college = ref({});
  const router = useRouter();

  const props = defineProps({
    id: String,
  });

  // watch the params of the route to fetch the data again
  watch(
    () => props.id,
    (collegeId) => {
      getCollege(collegeId);
    },
    { immediate: true }
  );

  // fetch college
  function getCollege(id) {
    const request = new Request(
      `${import.meta.env.VITE_API_BASE_URL}/api/college?id=${id}`,
      {
        method: "GET",
        headers: {
          Authorization: userStore.token,
        },
      }
    );

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
            console.log("college not found..");
            router.push("/404");
          }
          // Handle other status codes
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json(); // Parse JSON if response is ok
      })
      .then((data) => {
        college.value = data.data;
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        loader.hide();
      });
  }

  function showFeed() {
    showingFeed.value = true;
    showingInfo.value = false;
  }
  function showInfo() {
    showingFeed.value = false;
    showingInfo.value = true;
  }
</script>

<style lang="scss" scoped></style>
