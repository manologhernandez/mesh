<template>
  <div
    class="flex gap-1 items-center lg:hover:text-yellow-400 active:text-yellow-400 cursor-pointer"
    @click="likeClicked"
  >
    <StarIcon v-if="!props.liked" />
    <StarIconFilled
      v-else
      class="text-yellow-400"
    />
    <span>{{ likesCount }}</span>
  </div>
</template>

<script setup>
  import StarIcon from "./icons/StarIcon.vue";
  import { ref } from "vue";
  import StarIconFilled from "./icons/StarIconFilled.vue";

  const props = defineProps({
    likesCount: {
      type: Number,
      default: 0,
    },
    liked: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(["increment", "decrement"]);

  function likeClicked() {
    if (!props.liked) {
      emit("increment");
    } else {
      emit("decrement");
    }
  }
</script>

<style lang="scss" scoped></style>
