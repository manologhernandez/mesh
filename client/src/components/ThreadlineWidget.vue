<template>
  <div
    ref="scrollableDiv"
    :class="{
      'h-28': isScrolledDown,
      'h-44': !isScrolledDown,
      'overflow-x-scroll': !isScrolledDown,
      'overflow-hidden': isScrolledDown,
    }"
    class="transition-all ease-in-out duration-300 flex gap-4 items-center px-4 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-neutral-300 scrollbar-track-neutral-50 dark:scrollbar-thumb-neutral-600 dark:scrollbar-track-neutral-900"
  >
    <div
      v-for="(threadline, index) in threadlines"
      :key="index"
    >
      <ThreadlineCard :threadline="threadline" />
    </div>

    <!-- News Ticker when minimized -->
    <div
      v-if="isScrolledDown"
      class="fixed z-10 top-16 left-0 lg:left-[20%] w-full lg:w-3/5 text-center py-2 bg-responsive border-0 border-b border-responsive"
    >
      <div class="w-full overflow-hidden">
        <div class="flex animate-marquee shrink-0">
          <span class="mr-4 font-semibold text-nowrap"
            >Today's Threadlines:
          </span>
          <RouterLink
            :to="`/post/${threadline.uuid}`"
            class="whitespace-nowrap flex"
            v-for="(threadline, index) in threadlines"
            :key="'1-' + index"
          >
            <div
              class="mr-4 lg:mr-8 w-[180px] lg:w-[360px] truncate cursor-pointer active:underline lg:hover:underline"
            >
              {{ threadline.title }}
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from "vue";
  import ThreadlineCard from "./ThreadlineCard.vue";

  const props = defineProps({
    threadlines: Array,
  });

  const scrollableDiv = ref(null);
  const isScrolledDown = ref(false);

  const handleScroll = () => {
    if (scrollableDiv.value) {
      isScrolledDown.value = window.scrollY > 60; // Threshold to minimize component
    }
  };

  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
</script>

<style scoped>
  /* Tailwind CSS does most of the work, but you can add extra styles here */

  @keyframes marqueedesktop {
    0% {
      transform: translateX(60vw);
    }
    100% {
      transform: translateX(-2100px);
    }
  }
  @keyframes marqueemobile {
    0% {
      transform: translateX(100vw);
    }
    100% {
      transform: translateX(-800px) translateX(-100%);
    }
  }
  @media only screen and (min-width: 768px) {
    .animate-marquee {
      animation: marqueedesktop 25s linear infinite;
    }
  }

  @media only screen and (max-width: 768px) {
    .animate-marquee {
      animation: marqueemobile 20s linear infinite;
    }
  }
</style>
