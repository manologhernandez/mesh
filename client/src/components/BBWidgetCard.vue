<template>
  <div
    class="relative group w-full aspect-square rounded-md cursor-pointer hover:scale-105 transition"
  >
    <div class="absolute inset-0 bg-black opacity-30 rounded-md"></div>
    <div
      class="absolute inset-0 z-10 bg-cover bg-center transition-all duration-300 rounded-md group-hover:blur-sm"
      :style="`background-image: url(${post.imageSrc}); -webkit-mask-image: linear-gradient(to right, #fff, #fff);`"
    ></div>

    <div
      class="absolute inset-0 z-20 flex justify-center items-center text-white p-2 font-semibold opacity-0 transition-all duration-300 group-hover:opacity-100 line-clamp-2 text-center self-center"
    >
      {{ post.text }}
    </div>

    <div
      class="absolute inset-0 z-10 bg-black opacity-0 transition-all duration-300 group-hover:opacity-35 rounded-md group-hover:blur"
    ></div>
  </div>
</template>

<script setup>
  const props = defineProps({
    post: Object,
  });
</script>

<style lang="scss" scoped></style>
