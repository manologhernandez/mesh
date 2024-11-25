<template>
  <div
    class="w-full min-h-screen bg-cover bg-center flex flex-col gap-8 items-center pt-32 lg:pt-36"
    :style="true ? `background-image: url(/landing_bg.svg)` : ''">
    <div
      class="backdrop-blur-sm bg-white/60 shadow-[rgba(0,0,0,0.3)_0px_0px_15px_6px] p-10 rounded-lg w-sm lg:w-md">
      <!-- Text Content -->
      <div class="flex flex-col gap-4 justify-center items-center">
        <div class="flex gap-4 items-center">
          <img
            src="/logo.png"
            alt="Mesh Logo"
            class="aspect-square h-16 lg:h-20 dark:invert" />
          <span
            class="text-6xl lg:text-7xl font-extrabold text-neutral-900 dark:text-white">
            Mesh
          </span>
        </div>
        <div>
          <span class="lg:text-lg text-nowrap"
            >an anonymous college social network</span
          >
        </div>
      </div>

      <!-- Login-->
      <div class="flex flex-col gap-8 w-full lg:px-0 mt-4">
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
    <SignupModal
      v-if="showSignupModal"
      @close-modal="hideSignupModal" />
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import SignupModal from "@/components/SignupModal.vue";
  import { useRouter } from "vue-router";

  const router = useRouter();

  const username = ref("");
  const password = ref("");

  const errors = ref([]);
  const showSignupModal = ref(false);

  function openSignupModal() {
    showSignupModal.value = true;
  }

  function hideSignupModal() {
    showSignupModal.value = false;
  }

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
      localStorage.setItem("mesh_token", "myaccesstoken");

      router.go(0);
    }
  };
</script>

<style scoped>
  /* Add any specific styles if needed */
</style>
