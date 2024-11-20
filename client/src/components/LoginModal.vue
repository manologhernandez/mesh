<template>
  <!-- Modal Overlay -->
  <div
    @click.self="closeModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black dark:bg-white dark:bg-opacity-10 bg-opacity-30 backdrop-blur-sm">
    <!-- Modal Container -->
    <div
      class="h-full lg:h-auto lg:max-h-[88vh] relative bg-white dark:bg-neutral-900 dark:text-white lg:rounded-lg shadow-lg scrollable w-full max-w-md lg:max-w-lg">
      <!-- Close Button -->
      <button
        @click="closeModal"
        class="absolute top-2 right-2 text-neutral-500 lg:hover:text-neutral-900 active:text-neutral-900 dark:lg:hover:text-neutral-700 dark:active:text-neutral-700">
        <CloseIcon />
      </button>

      <!-- Login Content -->
      <div class="p-6 lg:p-12 flex flex-col gap-4 h-screen lg:h-auto">
        <h2 class="text-3xl font-bold">Log In</h2>
        <form
          @submit.prevent="handleLogin"
          class="flex flex-col gap-4">
          <!-- Username -->
          <div>
            <label
              for="username"
              class="block text-sm font-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              v-model="username"
              :class="{
                'border-red-500': errors.username,
                'border-neutral-300 dark:border-neutral-600': !errors.username,
              }"
              class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-neutral-900" />
            <span
              v-if="errors.username"
              class="mt-1 text-sm text-red-500">
              {{ errors.username }}
            </span>
          </div>

          <!-- Password -->
          <div>
            <label
              for="password"
              class="block text-sm font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              v-model="password"
              :class="{
                'border-red-500': errors.password,
                'border-neutral-300 dark:border-neutral-600': !errors.password,
              }"
              class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-neutral-900" />
            <span
              v-if="errors.password"
              class="mt-1 text-sm text-red-500">
              {{ errors.password }}
            </span>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full mt-4 p-4 bg-black text-white dark:bg-white dark:text-black font-medium text-sm rounded-md shadow-md lg:hover:bg-neutral-800 active:bg-neutral-800 dark:lg:hover:bg-neutral-200 dark:active:bg-neutral-200">
            Login
          </button>
        </form>
        <div class="flex gap-1 justify-center text-nowrap">
          <span>New to Mesh?</span>
          <span
            @click="openSignupModal"
            class="text-blue-600 cursor-pointer font-semibold"
            >Create an account
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import CloseIcon from "./icons/CloseIcon.vue";

  const username = ref("");
  const password = ref("");
  const errors = ref({});

  const emit = defineEmits(["closeModal", "openSignup"]);

  const validateForm = () => {
    errors.value = {};
    if (!username.value) {
      errors.value.username = "Username is required.";
    }
    if (!password.value) {
      errors.value.password = "Password is required.";
    }
    return Object.keys(errors.value).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
      console.log("Logging in with:", {
        username: username.value,
        password: password.value,
      });
      alert("Login successful!");
      closeModal(); // Close modal
    }
  };

  const closeModal = () => {
    emit("closeModal");
  };

  const openSignupModal = () => {
    emit("openSignup");
  };
</script>

<style scoped>
  /* Tailwind handles styling */
</style>
