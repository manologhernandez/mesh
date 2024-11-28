<template>
  <nav
    class="bg-responsive fixed h-16 w-full z-40 top-0 start-0 border-b border-responsive"
  >
    <div
      class="max-w-full flex flex-wrap items-center justify-between mx-4 h-full lg:mx-16"
    >
      <div class="flex gap-2">
        <!-- SIDEBAR HAMBURGER -->
        <button
          type="button"
          class="cursor-pointer inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-neutral-500 rounded-lg lg:hidden active:bg-neutral-100 lg:hover:bg-neutral-100 dark:text-neutral-400 dark:active:bg-neutral-700 dark:lg:hover:bg-neutral-700"
          id="hamburger"
          @click="toggleSidebar"
        >
          <span class="sr-only">Open sidebar</span>
          <HamburgerIcon />
        </button>
        <!-- LOGO -->
        <RouterLink
          to="/"
          class="flex items-center space-x-3 rtl:space-x-reverse w-full text-nowrap"
        >
          <img
            src="/logo.png"
            class="h-8 dark:invert"
            alt="Mesh Logo"
          />
          <span
            class="hidden lg:inline-flex self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >Mesh</span
          >
        </RouterLink>
      </div>
      <!-- NAVBAR BUTTONS -->
      <div
        class="flex items-center h-full lg:order-2 space-x-0 lg:space-x-0 rtl:space-x-reverse"
      >
        <!-- SEARCH BUTTON -->
        <button
          type="button"
          class="cursor-pointer inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-neutral-500 rounded-lg lg:hidden active:bg-neutral-100 lg:hover:bg-neutral-100 dark:text-neutral-400 dark:active:bg-neutral-700 dark:lg:hover:bg-neutral-700"
          id="searchIcon"
          @click="toggleSearch"
        >
          <span class="sr-only">Open searchbar</span>
          <SearchIcon v-if="!showSearchbar" />
          <CloseIcon v-else />
        </button>

        <!-- CREATE POST BUTTON -->
        <RouterLink
          to="/create"
          class="text-nowrap"
        >
          <button
            type="button"
            class="flex gap-2 lg:hover:bg-neutral-200 font-medium rounded-full px-2 lg:px-4 py-2 text-center dark:lg:hover:bg-neutral-800"
          >
            <PlusIcon /> {{ isMobile ? "" : "Post" }}
          </button>
        </RouterLink>

        <!-- USER DROPDOWN BUTTON -->
        <button
          id="dropdownUserAvatarButton"
          class="h-full text-sm rounded-full ms-0 p-2"
          type="button"
          @click="toggleDropdownAvatar"
        >
          <span class="sr-only">Open user menu</span>
          <img
            class="h-10 rounded-full"
            src="https://picsum.photos/200/200"
            alt="user photo"
          />
        </button>

        <!-- USER DROPDOWN MENU -->
        <div
          id="dropdownAvatar"
          class="z-10 bg-white divide-y divide-neutral-100 rounded-lg shadow-[rgba(0,0,0,0.2)_0px_0px_15px_6px] w-44 dark:bg-neutral-700 dark:divide-neutral-600"
          :class="!showDropdownAvatar ? 'hidden' : 'absolute top-16 right-4'"
        >
          <div class="px-4 py-3 text-sm text-neutral-900 dark:text-white">
            <div>Mesh User</div>
            <div class="font-medium truncate">user@email.edu.ph</div>
          </div>
          <ul
            class="py-2 text-sm text-neutral-700 dark:text-neutral-200"
            aria-labelledby="dropdownUserAvatarButton"
          >
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
            <li>
              <label class="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  class="sr-only peer"
                  :checked="isDark"
                  @change="toggleDark()"
                />
                <span class="px-4 py-2">Toggle Dark</span>
                <div
                  class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                ></div>
              </label>
            </li>
          </ul>
          <div
            class="py-2 cursor-pointer"
            @click="signOutUser"
          >
            <span
              class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 dark:text-neutral-200 dark:hover:text-white"
              >Sign out</span
            >
          </div>
        </div>
      </div>

      <!-- SEARCH INPUT -->
      <div
        class="absolute z-10 top-16 left-0 right-0 lg:relative lg:top-0 items-center justify-between w-full lg:flex lg:w-auto lg:order-1 bg-responsive p-2 lg:p-0 border-b border-responsive lg:border-0"
        :class="!showSearchbar ? 'hidden' : ''"
        id="search-container"
      >
        <div
          class="flex px-4 rounded-full border border-responsive active:border-neutral-600 lg:hover:border-neutral-600 dark:active:border-neutral-200 lg:dark:hover:border-neutral-200 overflow-hidden lg:mt-0 items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            id="search"
            class="w-full outline-none border-none bg-transparent focus:outline-none focus:ring-0 dark:text-neutral-100 text-sm py-2"
          />
          <SearchIcon />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
  import SearchIcon from "./icons/SearchIcon.vue";
  import CloseIcon from "./icons/CloseIcon.vue";
  import PlusIcon from "./icons/PlusIcon.vue";
  import HamburgerIcon from "./icons/HamburgerIcon.vue";
  import { ref, computed } from "vue";
  import { useRouter } from "vue-router";
  import { useDark, useToggle } from "@vueuse/core";

  const isDark = useDark();
  const toggleDark = useToggle(isDark);

  const emit = defineEmits(["toggle-sidebar"]);
  const router = useRouter();

  const showSearchbar = ref(false);
  const showDropdownAvatar = ref(false);

  const isMobile = computed(() => {
    return screen.width <= 1024;
  });

  function signOutUser() {
    localStorage.removeItem("mesh_token");
    router.go(0);
  }

  function toggleSidebar() {
    emit("toggle-sidebar");
  }

  function toggleSearch() {
    showSearchbar.value = !showSearchbar.value;
  }

  function toggleDropdownAvatar() {
    showDropdownAvatar.value = !showDropdownAvatar.value;
  }
</script>

<style lang="scss" scoped></style>
