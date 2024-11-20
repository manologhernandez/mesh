<template>
  <div
    class="flex gap-1 items-center lg:hover:text-yellow-400 active:text-yellow-400 cursor-pointer"
    @click="likeClicked">
    <StarIcon v-if="!liked" />
    <StarIconFilled
      v-else
      class="text-yellow-400" />
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
  });

  const emit = defineEmits(["increment", "decrement"]);

  const liked = ref(false);

  function likeClicked() {
    if (!liked.value) {
      emit("increment");
      liked.value = true;
    } else {
      emit("decrement");
      liked.value = false;
    }
  }
</script>

<style lang="scss" scoped></style>
