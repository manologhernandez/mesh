<template>
  <RouterLink :to="`/post/${threadline.uuid}`">
    <div class="story-card cursor-pointer group">
      <div
        class="relative bg-cover bg-center p-4 h-32 rounded-lg flex justify-center items-end"
        :style="
          threadline.attachment
            ? `background-image: url(${threadline.attachment}); -webkit-mask-image: linear-gradient(to right, #fff, #fff);`
            : `background-color: ${threadline.college.color};`
        "
      >
        <div
          class="absolute left-0 right-0 bottom-0 font-semibold text-white z-10 p-2"
        >
          <span
            class="line-clamp-2 group-active:underline lg:group-hover:underline"
          >
            {{ threadline.title }}
          </span>
        </div>

        <div
          class="absolute inset-0 bg-black/50 rounded-lg"
          :class="threadline.is_censored ? 'backdrop-blur-md' : ''"
        ></div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
  const props = defineProps({
    threadline: Object,
  });
</script>

<style scoped>
  .story-card {
    flex: 0 0 auto; /* Prevent the cards from shrinking */
    width: 200px; /* Adjust the width as needed */
  }
</style>
