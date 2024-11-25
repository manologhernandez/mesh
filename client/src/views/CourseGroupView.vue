<template>
  <div class="relative">
    <Sidebar
      id="sidebar-container"
      class="sidebar-responsive" />

    <div class="absolute w-full lg:left-[20%] lg:w-3/5 flex flex-col gap-0 p-2">
      <div>
        <!-- Header -->
        <div class="p-4 flex gap-4 items-center">
          <div
            class="rounded-full h-24 lg:h-32 aspect-square bg-transparent overflow-hidden">
            <img
              :src="course1.imgSrc"
              class="object-cover" />
          </div>
          <div class="flex flex-col gap-2">
            <div class="text-xl lg:text-2xl font-bold">
              {{ course1.name }}
            </div>
            <div class="flex gap-4 text-sm items-center">
              <div>Meshers: {{ course1.meshers }}</div>
              <div>Followers: {{ course1.followers }}</div>
              <div
                class="bg-neutral-200 dark:bg-neutral-700 px-4 py-1 rounded-md cursor-pointer font-semibold">
                Follow
              </div>
            </div>
          </div>
        </div>

        <!-- Tabbed Menu -->
        <div
          class="text-sm font-medium text-center text-neutral-500 mb-2 border-b border-neutral-200 dark:text-neutral-400 dark:border-neutral-700">
          <ul class="flex flex-wrap -mb-px">
            <li class="me-2">
              <div
                @click="showFeed"
                class="inline-block p-4 border-b-2 rounded-t-lg cursor-pointer"
                :class="
                  showingFeed
                    ? 'text-neutral-800 border-neutral-800 dark:text-neutral-200 dark:border-neutral-200'
                    : 'border-transparent lg:hover:text-neutral-800 lg:hover:border-neutral-800 dark:lg:hover:text-neutral-200 active:text-neutral-800 active:border-neutral-800 dark:active:text-neutral-200'
                ">
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
                ">
                Information
              </div>
            </li>
          </ul>
        </div>

        <!-- Feed -->
        <div v-show="showingFeed">
          <Feed :posts="posts" />
        </div>
        <div
          v-show="showingInfo"
          class="p-4">
          Course info..
        </div>
      </div>
    </div>
    <div class="absolute w-full lg:left-[80%] lg:w-1/5 flex flex-col gap-0 p-2">
      <CourseGroupRightPane />
    </div>
  </div>
</template>

<script setup>
  import Sidebar from "@/components/Sidebar.vue";
  import Feed from "@/components/Feed.vue";
  import { ref } from "vue";

  import { posts, course1 } from "@/tools/sampledata";
  import CourseGroupRightPane from "@/components/rightpanes/CourseGroupRightPane.vue";

  const showingFeed = ref(true);
  const showingInfo = ref(false);

  const props = defineProps({
    id: String,
  });

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
