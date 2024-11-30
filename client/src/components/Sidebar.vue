<template>
  <div class="scrollable h-full pb-36">
    <div class="me-4">
      <!-- MAIN PAGES -->
      <div class="flex flex-col justify-start items-start mt-4 gap-0">
        <SidebarButton
          route="/feed"
          @clicked="handleButtonClicked"
        >
          <HomeIcon /> Feed
        </SidebarButton>
        <SidebarButton
          route="/discover"
          @clicked="handleButtonClicked"
        >
          <MapIcon /> Discover
        </SidebarButton>
        <SidebarButton
          route="/bulletin-boards"
          @clicked="handleButtonClicked"
        >
          <DiscoverIcon /> Bulletin Boards
        </SidebarButton>
      </div>
      <hr class="my-4 hr-responsive" />
      <!-- COLLEGES -->
      <div class="flex flex-col justify-start items-start mt-4 gap-0">
        <div class="flex gap-2 font-bold items-center mb-2 ms-2">COLLEGES</div>
        <SidebarButton
          :route="`/college/${college.id}`"
          @clicked="handleButtonClicked"
          v-for="college in collegesList"
        >
          <div
            class="rounded-full w-6 h-6"
            :style="`background-color: ${college.color}`"
          ></div>
          <span>{{ college.name }} </span>
        </SidebarButton>

        <template v-if="COLLEGES.length > MAX_SHOWN_COLLEGES">
          <SidebarButton
            @click="showAllColleges()"
            v-if="!isShowFullCollegeList"
          >
            <ChevronDownIcon />Show more
          </SidebarButton>

          <SidebarButton
            @click="showLessColleges()"
            v-if="isShowFullCollegeList"
          >
            <ChevronUpIcon />Show less
          </SidebarButton>
        </template>
      </div>
      <hr class="my-4 hr-responsive" />
      <!-- COURSES -->
      <div class="flex flex-col justify-start items-start mt-4 gap-0">
        <div class="flex gap-2 font-bold items-center mb-2 ms-2">
          COURSE GROUPS
        </div>

        <SidebarButton
          :route="`/coursegroup/${courseGroup.id}`"
          @clicked="handleButtonClicked"
          v-for="courseGroup in courseGroupList"
        >
          <img
            src="https://em-content.zobj.net/source/apple/391/closed-book_1f4d5.png"
            alt=""
            class="h-6 w-6"
          />
          <span>{{ courseGroup.name }}</span>
        </SidebarButton>

        <template v-if="COURSE_GROUPS.length > MAX_SHOWN_COURSE_GROUPS">
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
        </template>
      </div>

      <!-- SUBTOPICS -->
      <div class="flex flex-col justify-start items-start mt-4 gap-0">
        <div class="flex gap-2 font-bold items-center mb-2 ms-2">SUBTOPICS</div>

        <SidebarButton
          :route="`/subtopic/${subtopic.id}`"
          @clicked="handleButtonClicked"
          v-for="subtopic in subtopicList"
        >
          <img
            :src="subtopic.icon"
            alt=""
            class="h-6 w-6"
          />
          <span>{{ subtopic.name }}</span>
        </SidebarButton>

        <template v-if="SUBTOPICS.length > MAX_SHOWN_SUBTOPICS">
          <SidebarButton
            @click="showAllSubtopics()"
            v-if="!isShowFullSubtopicList"
          >
            <ChevronDownIcon />Show more
          </SidebarButton>

          <SidebarButton
            @click="showLessSubtopics()"
            v-if="isShowFullSubtopicList"
          >
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
  import { COURSE_GROUPS, COLLEGES, SUBTOPICS } from "@/tools/sampledata";
  import MapIcon from "./icons/MapIcon.vue";

  const emit = defineEmits(["close-sidebar"]);

  const isShowFullCourseGroupList = ref(false);
  const isShowFullCollegeList = ref(false);
  const isShowFullSubtopicList = ref(false);

  const MAX_SHOWN_COLLEGES = 4;
  const MAX_SHOWN_COURSE_GROUPS = 4;
  const MAX_SHOWN_SUBTOPICS = 6;

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

  function showAllSubtopics() {
    isShowFullSubtopicList.value = true;
  }

  function showLessSubtopics() {
    isShowFullSubtopicList.value = false;
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

  const subtopicList = computed(() => {
    if (isShowFullSubtopicList.value) {
      return SUBTOPICS;
    }
    return SUBTOPICS.slice(0, MAX_SHOWN_SUBTOPICS);
  });
</script>

<style lang="scss" scoped></style>
