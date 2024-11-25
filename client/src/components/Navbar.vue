<template>
  <nav
    class="bg-responsive fixed h-16 w-full z-40 top-0 start-0 border-b border-responsive">
    <div
      class="max-w-full flex flex-wrap items-center justify-between mx-4 h-full lg:mx-16">
      <div class="flex gap-2">
        <!-- SIDEBAR HAMBURGER -->
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
        <!-- LOGO -->
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
      <!-- NAVBAR BUTTONS -->
      <div
        class="flex items-center h-full lg:order-2 space-x-0 lg:space-x-0 rtl:space-x-reverse">
        <!-- SEARCH BUTTON -->
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

        <!-- CREATE POST BUTTON -->
        <div
          @click="openCreatePostModal"
          class="text-nowrap">
          <button
            type="button"
            class="flex gap-2 lg:hover:bg-neutral-200 font-medium rounded-full px-2 lg:px-4 py-2 text-center dark:lg:hover:bg-neutral-800">
            <PlusIcon /> {{ isMobile ? "" : "Post" }}
          </button>
        </div>

        <!-- USER DROPDOWN BUTTON -->
        <button
          id="dropdownUserAvatarButton"
          data-dropdown-toggle="dropdownAvatar"
          class="h-full text-sm rounded-full ms-0 p-2"
          type="button"
          @click="empty">
          <span class="sr-only">Open user menu</span>
          <img
            class="h-10 rounded-full"
            src="https://picsum.photos/200/200"
            alt="user photo" />
        </button>

        <!-- USER DROPDOWN MENU -->
        <div
          id="dropdownAvatar"
          class="z-10 hidden bg-white divide-y divide-neutral-100 rounded-lg shadow-xl w-44 dark:bg-neutral-700 dark:divide-neutral-600">
          <div class="px-4 py-3 text-sm text-neutral-900 dark:text-white">
            <div>Mesh User</div>
            <div class="font-medium truncate">user@email.edu.ph</div>
          </div>
          <ul
            class="py-2 text-sm text-neutral-700 dark:text-neutral-200"
            aria-labelledby="dropdownUserAvatarButton">
            <li>
              <a
                href="#"
                class="block px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-white"
                >Profile</a
              >
            </li>
            <li>
              <a
                href="#"
                class="block px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-white"
                >Settings</a
              >
            </li>
            <li>
              <a
                href="#"
                class="block px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-white"
                >Premium</a
              >
            </li>
          </ul>
          <div
            class="py-2 cursor-pointer"
            @click="signOutUser">
            <span
              class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 dark:text-neutral-200 dark:hover:text-white"
              >Sign out</span
            >
          </div>
        </div>
      </div>

      <!-- SEARCH INPUT -->
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
</template>

<script setup>
  import { Collapse } from "flowbite";
  import SearchIcon from "./icons/SearchIcon.vue";
  import HamburgerIcon from "./icons/HamburgerIcon.vue";
  import { ref, computed } from "vue";
  import { useRouter } from "vue-router";
  import PlusIcon from "./icons/PlusIcon.vue";

  // as per https://stackoverflow.com/questions/33074160/bootstrap-collapse-half-working-on-iphone
  // assign empty onclick handler for iphone collapse support
  const empty = () => {};
  const router = useRouter();

  const isMobile = computed(() => {
    return screen.width <= 1024;
  });

  function signOutUser() {
    localStorage.removeItem("mesh_token");
    router.go(0);
  }
</script>

<style lang="scss" scoped></style>
