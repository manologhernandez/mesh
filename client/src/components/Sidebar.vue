<template>
  <div class="scrollable z-50 max-h-[92vh] pb-20 md:pb-4">
    <div class="me-4">
      <div class="flex flex-col justify-start items-start mt-4 gap-2">
        <SidebarButton route="/"> <HomeIcon /> Feed </SidebarButton>
        <SidebarButton route="/discover"> <MapIcon /> Discover </SidebarButton>
        <SidebarButton route="/bulletin-boards">
          <DiscoverIcon /> Bulletin Boards
        </SidebarButton>
        <SidebarButton route="/about">
          <QuestionIcon /> What is Mesh?
        </SidebarButton>
      </div>
      <hr class="h-px my-4 bg-neutral-300 border-0 dark:bg-neutral-700" />
      <div class="flex flex-col justify-start items-start mt-4 gap-0">
        <div class="flex gap-2 font-bold text-lg items-center mb-2">
          <BuildingIcon /> COLLEGES
        </div>
        <SidebarButton v-for="college in collegesList">
          {{ college }}
        </SidebarButton>

        <SidebarButton @click="showAllColleges()" v-if="!isShowFullCollegeList">
          <ChevronDownIcon />Show more
        </SidebarButton>

        <SidebarButton @click="showLessColleges()" v-if="isShowFullCollegeList">
          <ChevronUpIcon />Show less
        </SidebarButton>
      </div>
      <hr class="h-px my-4 bg-neutral-300 border-0 dark:bg-neutral-700" />
      <div class="flex flex-col justify-start items-start mt-4 gap-0">
        <div class="flex gap-2 font-bold text-lg items-center mb-2">
          <AcademicIcon /> COURSE GROUPS
        </div>

        <SidebarButton v-for="courseGroup in courseGroupList">
          {{ courseGroup }}
        </SidebarButton>

        <SidebarButton
          @click="showAllCourseGroups()"
          v-if="!isShowFullCourseGroupList"
        >
          <ChevronDownIcon />Show more
        </SidebarButton>

        <SidebarButton
          @click="showLessCourseGroups()"
          v-if="isShowFullCourseGroupList"
        >
          <ChevronUpIcon />Show less
        </SidebarButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import HomeIcon from "./icons/HomeIcon.vue";
import DiscoverIcon from "./icons/DiscoverIcon.vue";
import QuestionIcon from "./icons/QuestionIcon.vue";
import AcademicIcon from "./icons/AcademicIcon.vue";
import BuildingIcon from "./icons/BuildingIcon.vue";
import ChevronDownIcon from "./icons/ChevronDownIcon.vue";
import ChevronUpIcon from "./icons/ChevronUpIcon.vue";
import SidebarButton from "./SidebarButton.vue";
import { ref, computed } from "vue";
import { COURSE_GROUPS, COLLEGES } from "@/tools/sampledata";
import MapIcon from "./icons/MapIcon.vue";

const isShowFullCourseGroupList = ref(false);
const isShowFullCollegeList = ref(false);

function showAllCourseGroups() {
  isShowFullCourseGroupList.value = true;
}

function showLessCourseGroups() {
  isShowFullCourseGroupList.value = false;
}

function showAllColleges() {
  isShowFullCollegeList.value = true;
}

function showLessColleges() {
  isShowFullCollegeList.value = false;
}

const courseGroupList = computed(() => {
  if (isShowFullCourseGroupList.value) {
    return COURSE_GROUPS;
  }
  return COURSE_GROUPS.slice(0, 5);
});

const collegesList = computed(() => {
  if (isShowFullCollegeList.value) {
    return COLLEGES;
  }
  return COLLEGES.slice(0, 4);
});
</script>

<style lang="scss" scoped></style>
