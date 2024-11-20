<template>
  <nav
    class="bg-responsive fixed h-16 w-full z-40 top-0 start-0 border-b border-responsive">
    <div
      class="max-w-full flex flex-wrap items-center justify-between mx-4 h-full lg:mx-16">
      <div class="flex gap-2">
        <button
          data-collapse-toggle="sidebar-container"
          type="button"
          class="cursor-pointer inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-neutral-500 rounded-lg lg:hidden active:bg-neutral-100 lg:hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:text-neutral-400 dark:active:bg-neutral-700 dark:lg:hover:bg-neutral-700 dark:focus:ring-neutral-600"
          aria-controls="sidebar-container"
          aria-expanded="false"
          id="hamburger"
          @click="empty">
          <span class="sr-only">Open sidebar</span>
          <HamburgerIcon />
        </button>
        <RouterLink
          to="/"
          class="flex items-center space-x-3 rtl:space-x-reverse w-full text-nowrap">
          <img
            src="/logo.png"
            class="h-8 dark:invert"
            alt="Mesh Logo" />
          <span
            class="hidden lg:inline-flex self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >Mesh</span
          >
        </RouterLink>
      </div>
      <div class="flex lg:order-2 space-x-3 lg:space-x-0 rtl:space-x-reverse">
        <div
          @click="openLoginModal"
          class="w-full text-nowrap">
          <button
            type="button"
            class="text-black focus:outline-none font-medium px-4 py-2 text-center rounded-lg dark:text-white">
            Log In
          </button>
        </div>
        <div
          @click="openSignupModal"
          class="w-full text-nowrap">
          <button
            type="button"
            class="text-white bg-neutral-900 active:bg-neutral-800 lg:hover:bg-neutral-800 font-medium rounded-lg px-4 py-2 text-center dark:bg-neutral-700 dark:active:bg-neutral-800 dark:lg:hover:bg-neutral-800">
            Sign Up
          </button>
        </div>
        <button
          data-collapse-toggle="search-container"
          type="button"
          class="cursor-pointer inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-neutral-500 rounded-lg lg:hidden active:bg-neutral-100 lg:hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:text-neutral-400 dark:active:bg-neutral-700 dark:lg:hover:bg-neutral-700 dark:focus:ring-neutral-600"
          aria-controls="search-container"
          aria-expanded="false"
          id="searchIcon"
          @click="empty">
          <span class="sr-only">Open searchbar</span>
          <SearchIcon />
        </button>
      </div>
      <div
        class="absolute z-10 top-16 left-0 right-0 lg:relative lg:top-0 items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1 bg-responsive p-2 lg:p-0 border-b border-responsive lg:border-0"
        id="search-container">
        <div
          class="flex px-4 rounded-full border border-responsive active:border-neutral-600 lg:hover:border-neutral-600 dark:active:border-neutral-200 lg:dark:hover:border-neutral-200 overflow-hidden lg:mt-0 items-center">
          <input
            type="text"
            placeholder="Search..."
            id="search"
            class="w-full outline-none border-none bg-transparent focus:outline-none focus:ring-0 dark:text-neutral-100 text-md" />
          <SearchIcon />
        </div>
      </div>
    </div>
  </nav>
  <LoginModal
    v-if="showLoginModal"
    @close-modal="hideLoginModal"
    @open-signup="openSignupModal" />
  <SignupModal
    v-if="showSignupModal"
    @close-modal="hideSignupModal"
    @open-login="openLoginModal" />
</template>

<script setup>
  import { Collapse } from "flowbite";
  import SearchIcon from "./icons/SearchIcon.vue";
  import LoginModal from "./LoginModal.vue";
  import HamburgerIcon from "./icons/HamburgerIcon.vue";
  import { ref } from "vue";
  import SignupModal from "./SignupModal.vue";

  // as per https://stackoverflow.com/questions/33074160/bootstrap-collapse-half-working-on-iphone
  // assign empty onclick handler for iphone collapse support
  const empty = () => {};
  const showLoginModal = ref(false);
  const showSignupModal = ref(false);

  function openLoginModal() {
    showSignupModal.value = false;
    showLoginModal.value = true;
  }

  function openSignupModal() {
    showLoginModal.value = false;
    showSignupModal.value = true;
  }

  function hideLoginModal() {
    showLoginModal.value = false;
  }

  function hideSignupModal() {
    showSignupModal.value = false;
  }
</script>

<style lang="scss" scoped></style>
