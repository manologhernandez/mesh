<template>
  <div class="relative">
    <div class="absolute w-full lg:left-[20%] lg:w-3/5 flex flex-col gap-0 p-2">
      <div>
        <!-- Header -->
        <div class="p-4 flex gap-4 items-center">
          <div class="rounded-full h-24 lg:h-32 aspect-square bg-transparent">
            <img
              :src="college1.imgSrc"
              class="object-cover" />
          </div>
          <div class="flex flex-col gap-2">
            <div class="text-xl lg:text-2xl font-bold">
              {{ college1.name }}
            </div>
            <div class="flex gap-4 text-sm items-center">
              <div>Meshers: {{ college1.meshers }}</div>
              <div>Followers: {{ college1.followers }}</div>
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
          <div class="mb-4">
            <strong>Main Campus:</strong>
            {{ college1.mainCampus }}
          </div>
          <div class="mb-4">
            {{ college1.aboutText }}
          </div>

          <div
            class="flex flex-col gap-0 lg:flex-row lg:gap-4 lg:justify-center">
            <div><strong>Telephone: </strong> {{ college1.telephone }}</div>

            <div>
              <strong>Email: </strong
              ><a :href="`mailto:${college1.email}`">{{ college1.email }}</a>
            </div>
            <div>
              <strong>Website: </strong>
              <a
                :href="college1.website"
                target="_blank"
                class="underline underline-offset-4"
                >{{ college1.website }}</a
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
  import Sidebar from "@/components/Sidebar.vue";
  import { ref } from "vue";

  import { posts, college1 } from "@/tools/sampledata";
  import CollegeRightPane from "@/components/rightpanes/CollegeRightPane.vue";

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
