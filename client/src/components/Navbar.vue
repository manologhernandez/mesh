<template>
  <nav
    class="bg-white dark:bg-neutral-900 fixed h-16 w-full z-50 top-0 start-0 border-b border-neutral-200 dark:border-neutral-600"
  >
    <div
      class="max-w-full flex flex-wrap items-center justify-between mx-4 h-full md:mx-16"
    >
      <div class="flex gap-2">
        <button
          data-collapse-toggle="sidebar-container"
          type="button"
          class="cursor-pointer inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-neutral-500 rounded-lg md:hidden active:bg-neutral-100 md:hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:text-neutral-400 dark:active:bg-neutral-700 dark:md:hover:bg-neutral-700 dark:focus:ring-neutral-600"
          aria-controls="sidebar-container"
          aria-expanded="false"
          id="hamburger"
          @click="empty"
        >
          <span class="sr-only">Open sidebar</span>
          <HamburgerIcon />
        </button>
        <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/logo.png" class="h-8 dark:invert" alt="Mesh Logo" />
          <span
            class="hidden md:inline-flex self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >Mesh</span
          >
        </a>
      </div>
      <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button
          type="button"
          class="text-black focus:outline-none font-medium px-4 py-2 text-center rounded-lg dark:text-white"
        >
          Log In
        </button>
        <button
          type="button"
          class="text-white bg-neutral-700 active:bg-neutral-900 md:hover:bg-neutral-900 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg px-4 py-2 text-center dark:bg-neutral-600 dark:active:bg-neutral-800 dark:md:hover:bg-neutral-800 dark:focus:ring-neutral-800"
        >
          Sign Up
        </button>
        <button
          data-collapse-toggle="search-container"
          type="button"
          class="cursor-pointer inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-neutral-500 rounded-lg md:hidden active:bg-neutral-100 md:hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:text-neutral-400 dark:active:bg-neutral-700 dark:md:hover:bg-neutral-700 dark:focus:ring-neutral-600"
          aria-controls="search-container"
          aria-expanded="false"
          id="searchIcon"
          @click="empty"
        >
          <span class="sr-only">Open searchbar</span>
          <SearchIcon />
        </button>
      </div>
      <div
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="search-container"
      >
        <div
          class="flex px-4 rounded-full border border-neutral-200 active:border-neutral-600 md:hover:border-neutral-600 dark:border-neutral-600 dark:active:border-neutral-200 md:dark:hover:border-neutral-200 overflow-hidden mt-4 md:mt-0 items-center"
        >
          <input
            type="email"
            placeholder="Search..."
            class="w-full outline-none border-none bg-transparent focus:outline-none focus:ring-0 dark:text-neutral-100 text-md"
          />
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

// as per https://stackoverflow.com/questions/33074160/bootstrap-collapse-half-working-on-iphone
// assign empty onclick handler for iphone collapse support
const empty = () => {};
</script>

<style lang="scss" scoped></style>
