<template>
  <!-- Modal Overlay -->
  <div
    @click.self="closeModal"
    class="modal-overlay"
  >
    <!-- Modal Container -->
    <div
      class="h-auto relative bg-white dark:bg-neutral-900 dark:text-white rounded-lg shadow-lg scrollable max-w-sm lg:max-w-xl"
    >
      <!-- Close Button -->
      <button
        @click="closeModal"
        class="modal-close-btn"
      >
        <CloseIcon />
      </button>
      <!-- CONTENT -->
      <div class="p-6 lg:p-6 flex flex-col gap-4 h-auto lg:max-w-xl">
        <h2 class="text-3xl font-bold">Share Post</h2>
        <div class="text-sm flex gap-2">
          <span
            class="rounded-lg px-4 py-2 truncate text-nowrap border border-neutral-200 w-full text-neutral-700 dark:text-neutral-300 dark:border-neutral-600 max-w-[250px] lg:max-w-full"
          >
            {{ url }}
          </span>
          <button
            class="rounded-lg bg-neutral-800 text-white px-4 py-2 lg:hover:bg-neutral-700"
            @click="copy(url)"
            v-if="isSupported"
          >
            <span v-if="!copied">Copy</span>
            <span v-else>Copied!</span>
          </button>
        </div>
        <div class="flex gap-4">
          <a
            :href="`https://www.facebook.com/sharer/sharer.php?u=${url}`"
            target="_blank"
            class="flex"
          >
            <FacebookIcon class="h-8 w-8" />
          </a>
          <a
            :href="`https://x.com/intent/tweet?text=${url}`"
            target="_blank"
            class="flex"
          >
            <XIcon class="h-8 w-8" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import CloseIcon from "./icons/CloseIcon.vue";
  import { useRouter } from "vue-router";
  import FacebookIcon from "./icons/FacebookIcon.vue";
  import { useClipboard } from "@vueuse/core";
  import XIcon from "./icons/XIcon.vue";

  const { text, copy, copied, isSupported } = useClipboard({});

  const router = useRouter();

  const emit = defineEmits(["closeModal"]);

  const props = defineProps({
    url: String,
  });

  const closeModal = () => {
    emit("closeModal");
  };
</script>

<style scoped>
  /* Tailwind handles styling */
</style>
