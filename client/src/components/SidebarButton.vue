<template>
  <RouterLink
    :to="props.route"
    class="w-full"
    activeClass="active"
    v-if="props.route"
    @click="handleClick"
  >
    <button
      class="sidebar-btn py-3 w-full rounded-lg active:bg-neutral-300 dark:active:bg-neutral-800 lg:hover:bg-neutral-300 lg:dark:hover:bg-neutral-800 font-medium text-start ps-4 transition-all"
    >
      <span class="flex gap-3 items-center justify-start">
        <slot></slot>
      </span>
    </button>
  </RouterLink>
  <button
    class="sidebar-btn py-3 w-full rounded-lg active:bg-neutral-300 dark:active:bg-neutral-800 lg:hover:bg-neutral-300 lg:dark:hover:bg-neutral-800 font-medium text-start ps-4 transition-all"
    @click="handleClick"
    v-else
  >
    <span class="flex gap-2 items-center justify-start">
      <slot></slot>
    </span>
  </button>
</template>

<script setup>
  const emit = defineEmits(["clicked"]);

  const props = defineProps({
    route: { type: String },
  });

  function handleClick() {
    emit("clicked");
  }
</script>

<style scoped>
  .active > .sidebar-btn {
    background-color: rgb(64 64 64);
    color: white;
  }
</style>
