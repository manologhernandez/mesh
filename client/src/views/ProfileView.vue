<template>
  <div class="relative">
    <div class="absolute w-full lg:left-[20%] lg:w-3/5 flex flex-col gap-0 p-2">
      <!-- HEADER -->
      <div class="flex gap-4 items-center p-4">
        <div
          class="rounded-full w-16 h-16"
          :style="`background-color: ${USER.college.color}`"
        ></div>
        <div class="flex flex-col">
          <div class="text-3xl font-bold">{{ USER.username }}</div>
          <div class="text-sm">
            {{ USER.college.name }}. Joined
            {{ dayjs(USER.dateCreated).fromNow() }}
          </div>
        </div>
      </div>

      <div class="p-2">
        <!-- Tabbed Menu -->
        <div
          class="text-sm font-medium text-center text-neutral-500 mb-2 border-b border-neutral-200 dark:text-neutral-400 dark:border-neutral-700"
        >
          <ul class="flex flex-wrap -mb-px">
            <li class="me-2">
              <div
                @click="showPosts"
                class="inline-block p-4 border-b-2 rounded-t-lg cursor-pointer"
                :class="
                  showingPosts
                    ? 'text-neutral-800 border-neutral-800 dark:text-neutral-200 dark:border-neutral-200'
                    : 'border-transparent lg:hover:text-neutral-800 lg:hover:border-neutral-800 dark:lg:hover:text-neutral-200 active:text-neutral-800 active:border-neutral-800 dark:active:text-neutral-200'
                "
              >
                My Posts
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
        <div v-show="showingPosts">
          <Feed :posts="USER.posts" />
        </div>

        <div
          v-show="showingInfo"
          class="p-4"
        >
          More info here maybe ..
        </div>
      </div>
    </div>
    <div
      class="hidden absolute w-full lg:left-[80%] lg:w-1/5 lg:flex flex-col gap-0 p-2"
    >
      <AdSquare />
    </div>
  </div>
</template>

<script setup>
  import { USER } from "@/tools/sampledata";
  import { ref } from "vue";
  import Feed from "@/components/Feed.vue";
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";
  import AdSquare from "@/components/AdSquare.vue";

  dayjs.extend(relativeTime);

  const showingPosts = ref(true);
  const showingInfo = ref(false);

  function showPosts() {
    showingPosts.value = true;
    showingInfo.value = false;
  }

  function showInfo() {
    showingInfo.value = true;
    showingPosts.value = false;
  }
</script>

<style lang="scss" scoped></style>
