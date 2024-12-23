<template>
  <div class="relative">
    <div class="absolute w-full lg:left-[20%] lg:w-3/5 flex flex-col gap-0 p-2">
      <div class="flex flex-col items-center pt-10">
        <h1 class="text-6xl font-bold">WIP...</h1>
        <p class="text-xl mt-2">
          This page is still under construction. Pleae try coming again another
          time.
        </p>
        <RouterLink
          to="/"
          class="mt-6"
        >
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded-lg lg:hover:bg-blue-600 active:bg-blue-600 focus:outline-none"
          >
            Go back to Home
          </button>
        </RouterLink>
      </div>
    </div>
    <div
      class="hidden absolute w-full lg:left-[80%] lg:w-1/5 lg:flex flex-col gap-0 p-2"
    ></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
