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
          <span>{{ college.short_name }} </span>
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
            loading="lazy"
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
            loading="lazy"
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
  import ChevronDownIcon from "./icons/ChevronDownIcon.vue";
  import ChevronUpIcon from "./icons/ChevronUpIcon.vue";
  import SidebarButton from "./SidebarButton.vue";
  import { ref, computed, onMounted } from "vue";
  import MapIcon from "./icons/MapIcon.vue";
  import { useUserStore } from "@/stores/user";

  const userStore = useUserStore();

  const emit = defineEmits(["close-sidebar"]);

  const isShowFullCourseGroupList = ref(false);
  const isShowFullCollegeList = ref(false);
  const isShowFullSubtopicList = ref(false);

  const MAX_SHOWN_COLLEGES = 4;
  const MAX_SHOWN_COURSE_GROUPS = 4;
  const MAX_SHOWN_SUBTOPICS = 6;

  const SUBTOPICS = ref([]);
  const COURSE_GROUPS = ref([]);
  const COLLEGES = ref([]);

  onMounted(() => {
    getSubtopics();
    getCourseGroups();
    getColleges();
  });

  // fetch suptopics
  function getSubtopics() {
    const request = new Request("/api/subtopics", {
      method: "GET",
      headers: {
        Authorization: userStore.token,
      },
    });
    fetch(request)
      .then((response) => {
        if (!response.ok) {
          // Check for a 400 error
          if (response.status === 400) {
            return response.json().then((errorData) => {
              throw new Error(`${errorData.message || "Bad Request"}`);
            });
          }

          if (response.status === 401 || response.status === 403) {
            userStore.clearUser();
            router.go(0);
          }
          // Handle other status codes
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json(); // Parse JSON if response is ok
      })
      .then((data) => {
        SUBTOPICS.value = data.data;
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {});
  }

  // fetch course groups
  function getCourseGroups() {
    const request = new Request("/api/course_groups", {
      method: "GET",
      headers: {
        Authorization: userStore.token,
      },
    });
    fetch(request)
      .then((response) => {
        if (!response.ok) {
          // Check for a 400 error
          if (response.status === 400) {
            return response.json().then((errorData) => {
              throw new Error(`${errorData.message || "Bad Request"}`);
            });
          }
          if (response.status === 401 || response.status === 403) {
            userStore.clearUser();
            router.go(0);
          }
          // Handle other status codes
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json(); // Parse JSON if response is ok
      })
      .then((data) => {
        COURSE_GROUPS.value = data.data;
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {});
  }

  // fetch colleges
  function getColleges() {
    const request = new Request("/api/colleges", {
      method: "GET",
      headers: {
        Authorization: userStore.token,
      },
    });
    fetch(request)
      .then((response) => {
        if (!response.ok) {
          // Check for a 400 error
          if (response.status === 400) {
            return response.json().then((errorData) => {
              throw new Error(`${errorData.message || "Bad Request"}`);
            });
          }
          if (response.status === 401 || response.status === 403) {
            userStore.clearUser();
            router.go(0);
          }
          // Handle other status codes
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json(); // Parse JSON if response is ok
      })
      .then((data) => {
        COLLEGES.value = data.data;
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {});
  }

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
      return COURSE_GROUPS.value;
    }
    return COURSE_GROUPS.value.slice(0, MAX_SHOWN_COURSE_GROUPS);
  });

  const collegesList = computed(() => {
    if (isShowFullCollegeList.value) {
      return COLLEGES.value;
    }
    return COLLEGES.value.slice(0, MAX_SHOWN_COLLEGES);
  });

  const subtopicList = computed(() => {
    if (isShowFullSubtopicList.value) {
      return SUBTOPICS.value;
    }
    return SUBTOPICS.value.slice(0, MAX_SHOWN_SUBTOPICS);
  });
</script>

<style lang="scss" scoped></style>
