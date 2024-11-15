<template>
  <div class="flex flex-col items-center pt-10 min-h-[92vh] overflow-hidden">
    <h1 class="text-6xl font-bold">404</h1>
    <p class="text-xl mt-2">Oops! Page not found.</p>
    <RouterLink to="/" class="mt-6">
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
      >
        Go back to Home
      </button>
    </RouterLink>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
