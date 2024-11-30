<template>
  <!-- Modal Overlay -->
  <div
    @click.self="closeModal"
    class="modal-overlay"
  >
    <!-- Modal Container -->
    <div
      class="h-auto relative bg-white dark:bg-neutral-900 dark:text-white rounded-lg shadow-lg scrollable max-w-sm lg:max-w-lg"
    >
      <!-- Close Button -->
      <button
        @click="closeModal"
        class="modal-close-btn"
      >
        <CloseIcon />
      </button>
      <!-- CONTENT -->
      <div class="p-6 lg:p-6 flex flex-col gap-4 h-auto lg:max-w-lg">
        <h2 class="text-3xl font-bold">Report Post</h2>
        <div class="text-sm flex flex-col gap-2">
          <span class="">
            Thank you for your efforts in keeping Mesh a safe space. Please let
            us know what's wrong and we'll look into it.
          </span>

          <form
            @submit.prevent="submitReport"
            class=""
          >
            <label
              for="violation"
              class="block text-sm font-semibold mt-2"
            >
              <span class="text-red-500 font-bold">* </span>Violation
            </label>
            <select
              id="violation"
              v-model="violation"
              class="appearance-none bg-white mt-1 block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-neutral-900 border-neutral-300 dark:border-neutral-600 cursor-pointer lg:hover:bg-neutral-100 dark:lg:hover:bg-neutral-800 active:bg-neutral-100 dark:active:bg-neutral-800"
            >
              <option
                selected
                value=""
                disabled
              >
                Click to select a violation
              </option>
              <option value="harassment">Harassment</option>
              <option value="violence">Violence</option>
              <option value="hate">Hate</option>
              <option value="anonymity">Sharing Personal Information</option>
              <option value="impresonation">Impersonation</option>
              <option value="spam">Spam</option>
            </select>

            <label
              for="description"
              class="block text-sm font-semibold mt-4"
            >
              Description <span class="font-light">- Optional</span>
            </label>
            <textarea
              id="description"
              rows="8"
              class="mt-2 block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-neutral-900"
              v-model="description"
              placeholder="Let us know any additional details"
            ></textarea>

            <!-- Submit Code Button -->
            <button
              type="submit"
              class="w-full mt-4 p-4 bg-black text-white dark:bg-white dark:text-black font-medium text-sm rounded-md shadow-md lg:hover:bg-neutral-800 active:bg-neutral-800 dark:lg:hover:bg-neutral-200 dark:active:bg-neutral-200 disabled:bg-neutral-500 disabled:active:bg-neutral-500 disabled:lg:hover:bg-neutral-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import CloseIcon from "./icons/CloseIcon.vue";
  import { useRouter } from "vue-router";

  const router = useRouter();

  const violation = ref("");
  const description = ref("");

  const emit = defineEmits(["closeModal"]);

  const props = defineProps({
    post: Object,
  });

  function submitReport() {
    var report = {
      violation: violation.value,
      description: description.value,
      post: props.post,
    };

    alert("Submitting report: " + JSON.stringify(report, null, 2));

    closeModal();
  }

  const closeModal = () => {
    emit("closeModal");
  };
</script>

<style scoped>
  /* Tailwind handles styling */
</style>
