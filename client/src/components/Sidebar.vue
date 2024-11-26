<template>
  <div class="scrollable max-h-[92vh] pb-20 lg:pb-4">
    <div class="me-4">
      <!-- MAIN PAGES -->
      <div class="flex flex-col justify-start items-start mt-4 gap-0">
        <SidebarButton
          route="/feed"
          @clicked="handleButtonClicked">
          <HomeIcon /> Feed
        </SidebarButton>
        <SidebarButton
          route="/discover"
          @clicked="handleButtonClicked">
          <MapIcon /> Discover
        </SidebarButton>
        <SidebarButton
          route="/bulletin-boards"
          @clicked="handleButtonClicked">
          <DiscoverIcon /> Bulletin Boards
        </SidebarButton>
      </div>
      <hr class="my-4 hr-responsive" />
      <!-- COLLEGES -->
      <div class="flex flex-col justify-start items-start mt-4 gap-0">
        <div class="flex gap-2 font-bold items-center mb-2">
          <BuildingIcon /> COLLEGES
        </div>
        <SidebarButton
          :route="`/college/${college.id}`"
          @clicked="handleButtonClicked"
          v-for="college in collegesList">
          {{ college.name }}
        </SidebarButton>

        <template v-if="COLLEGES.length > MAX_SHOWN_COLLEGES">
          <SidebarButton
            @click="showAllColleges()"
            v-if="!isShowFullCollegeList">
            <ChevronDownIcon />Show more
          </SidebarButton>

          <SidebarButton
            @click="showLessColleges()"
            v-if="isShowFullCollegeList">
            <ChevronUpIcon />Show less
          </SidebarButton>
        </template>
      </div>
      <hr class="my-4 hr-responsive" />
      <!-- COURSES -->
      <div class="flex flex-col justify-start items-start mt-4 gap-0">
        <div class="flex gap-2 font-bold items-center mb-2">
          <AcademicIcon /> COURSE GROUPS
        </div>

        <SidebarButton
          :route="`/coursegroup/${courseGroup.id}`"
          @clicked="handleButtonClicked"
          v-for="courseGroup in courseGroupList">
          {{ courseGroup.name }}
        </SidebarButton>

        <template v-if="COURSE_GROUPS.length > MAX_SHOWN_COURSE_GROUPS">
          <SidebarButton
            @click="showAllCourseGroups()"
            v-if="!isShowFullCourseGroupList">
            <ChevronDownIcon />Show more
          </SidebarButton>

          <SidebarButton
            @click="showLessCourseGroups()"
            v-if="isShowFullCourseGroupList">
            <ChevronUpIcon />Show less
          </SidebarButton>
        </template>
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

  const emit = defineEmits(["close-sidebar"]);

  const isShowFullCourseGroupList = ref(false);
  const isShowFullCollegeList = ref(false);

  const MAX_SHOWN_COLLEGES = 4;
  const MAX_SHOWN_COURSE_GROUPS = 4;

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

  function handleButtonClicked() {
    emit("close-sidebar");
  }

  const courseGroupList = computed(() => {
    if (isShowFullCourseGroupList.value) {
      return COURSE_GROUPS;
    }
    return COURSE_GROUPS.slice(0, MAX_SHOWN_COURSE_GROUPS);
  });

  const collegesList = computed(() => {
    if (isShowFullCollegeList.value) {
      return COLLEGES;
    }
    return COLLEGES.slice(0, MAX_SHOWN_COLLEGES);
  });
</script>

<style lang="scss" scoped></style>
