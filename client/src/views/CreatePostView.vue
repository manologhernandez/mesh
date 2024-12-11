<template>
  <div class="relative">
    <div class="absolute w-full lg:left-[20%] lg:w-3/5 flex flex-col gap-0">
      <div class="px-4 lg:px-8 pt-4 pb-12">
        <Loading
          :active.sync="loading"
          :can-cancel="false"
          loader="dots"
        />
        <div class="font-bold text-2xl mb-2 p-2">Create Post</div>
        <form
          @submit.prevent="handlePostSubmit"
          class="flex flex-col gap-4"
        >
          <span
            v-if="errors.createPost"
            class="mt-2 text-sm font-semibold bg-red-700 text-white py-4 px-4 rounded"
          >
            {{ errors.createPost }}
          </span>
          <div class="flex flex-col gap-4 p-2">
            <!-- COLLEGE -->
            <div>
              <label
                for="college"
                class="block text-sm font-semibold"
              >
                <span class="text-red-500 font-bold">* </span>College
              </label>
              <div
                class="rounded-lg p-3 mt-2 bg-neutral-100 dark:bg-neutral-600 font-semibold flex gap-2 items-center mb-2"
              >
                <div
                  class="rounded-full w-6 h-6"
                  :style="`background-color: ${
                    userStore.college ? userStore.college.color : '#FFF'
                  }`"
                ></div>
                <span>{{
                  userStore.college
                    ? userStore.college.name
                    : "No college found"
                }}</span>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <!-- SUBTOPIC -->
              <div>
                <label
                  for="subtopic"
                  class="block text-sm font-semibold"
                >
                  <span class="text-red-500 font-bold">* </span>Subtopic
                </label>
                <div class="flex gap-4 items-center">
                  <select
                    id="subtopic"
                    v-model="subtopic"
                    class="appearance-none bg-white mt-1 block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-neutral-900 border-neutral-300 dark:border-neutral-600 cursor-pointer lg:hover:bg-neutral-100 dark:lg:hover:bg-neutral-800 active:bg-neutral-100 dark:active:bg-neutral-800"
                    :class="{
                      'border-red-500': errors.subtopic,
                      'border-neutral-300 dark:border-neutral-600':
                        !errors.subtopic,
                    }"
                  >
                    <option
                      selected
                      value=""
                      disabled
                    >
                      Click to select a subtopic
                    </option>
                    <option
                      :value="subtopic.id"
                      v-for="subtopic in SUBTOPICS"
                    >
                      {{ subtopic.name }}
                    </option>
                  </select>
                  <InfoIcon
                    v-if="chosenSubtopic"
                    class="lg:hidden"
                    @click="showSubtopicModal"
                  />
                </div>
                <span
                  v-if="errors.subtopic"
                  class="mt-1 text-sm text-red-500"
                >
                  {{ errors.subtopic }}
                </span>
              </div>

              <!-- COURSE GROUP -->
              <div>
                <label
                  for="courseGroup"
                  class="block text-sm font-semibold"
                >
                  Course Group <span class="font-normal">- Optional</span>
                </label>
                <div class="flex gap-4 items-center">
                  <select
                    id="courseGroup"
                    v-model="courseGroup"
                    class="appearance-none mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-600 cursor-pointer lg:hover:bg-neutral-100 dark:lg:hover:bg-neutral-800 active:bg-neutral-100 dark:active:bg-neutral-800"
                  >
                    <option
                      selected
                      value=""
                      disabled
                    >
                      Click to select a relevant course group
                    </option>
                    <option
                      v-for="course in COURSE_GROUPS"
                      :value="course.id"
                    >
                      {{ course.name }}
                    </option>
                  </select>

                  <CloseIcon
                    v-if="chosenCourseGroup"
                    @click="clearCourseGroup"
                    class="cursor-pointer"
                  />
                  <InfoIcon
                    v-if="chosenCourseGroup"
                    class="lg:hidden"
                    @click="showCourseGroupModal"
                  />
                </div>
              </div>
            </div>
            <!-- TITLE -->
            <div>
              <label
                for="title"
                class="block text-sm font-semibold"
              >
                <span class="text-red-500 font-bold">* </span>Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Title"
                v-model="title"
                :class="{
                  'border-red-500': errors.title,
                  'border-neutral-300 dark:border-neutral-600': !errors.title,
                }"
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-neutral-900"
              />
              <span
                v-if="errors.title"
                class="mt-1 text-sm text-red-500"
              >
                {{ errors.title }}
              </span>
            </div>

            <div class="grid lg:grid-cols-2 gap-4">
              <!-- CENSOR POST TOGGLE -->
              <div class="flex flex-col gap-2">
                <label class="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    class="sr-only peer"
                    :checked="isCensorPost || isPostNsfw"
                    @change="toggleCensorPostToggle"
                    :disabled="isPostNsfw"
                  />
                  <span class="me-4 font-semibold text-sm">Blur post</span>
                  <div
                    class="relative w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-blue-600"
                  ></div>
                </label>
                <span
                  class="text-xs font-light text-neutral-700 dark:text-neutral-300"
                  >Blur posts that may contain spoilers or sensitive content.
                  NSFW posts are automatically blurred.</span
                >
              </div>

              <!-- PROMOTE POST TOGGLE -->
              <div class="flex flex-col gap-2">
                <label class="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    class="sr-only peer"
                    :checked="isPromotePost"
                    @change="togglePromotePost"
                  />
                  <span class="me-4 font-semibold text-sm">Promote post</span>
                  <div
                    class="relative w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-blue-600"
                  ></div>
                </label>
                <span
                  class="text-xs font-light text-neutral-700 dark:text-neutral-300"
                >
                  Promoted posts appear more often on people's feeds. Promoting
                  a post will use up one MeshCredit.
                </span>
              </div>
            </div>

            <!-- POST -->
            <div>
              <label
                for="post"
                class="block text-sm font-semibold"
              >
                <span class="text-red-500 font-bold">* </span>Body
              </label>
              <textarea
                id="post"
                rows="8"
                class="mt-2 block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-neutral-900"
                v-model="post"
                :class="{
                  'border-red-500': errors.post,
                  'border-neutral-300 dark:border-neutral-600': !errors.post,
                }"
                placeholder="Body"
              ></textarea>
              <span
                v-if="errors.post"
                class="mt-1 text-sm text-red-500"
              >
                {{ errors.post }}
              </span>
            </div>

            <!-- IMAGE PREVIEW AND UPLOAD -->

            <!-- Image Preview -->
            <div v-if="imagePreview">
              <div class="text-sm font-semibold">Image Attachment</div>
              <div
                class="relative flex justify-center mt-2 rounded-lg p-4 border"
                :class="{
                  'border-red-500': errors.file,
                  'border-neutral-300 dark:border-neutral-600': !errors.file,
                }"
              >
                <img
                  :src="imagePreview"
                  alt="Preview"
                  class="max-h-48 max-w-72"
                />
                <CloseIcon
                  @click="clearImageAttachment"
                  class="cursor-pointer z-10 absolute top-2 right-2"
                />
              </div>
              <span
                v-if="errors.file"
                class="mt-1 text-sm text-red-500"
              >
                {{ errors.file }}
              </span>
            </div>

            <!-- Image Upload -->
            <div
              class="flex items-center justify-center w-full"
              v-else
            >
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-32 border-2 border-neutral-300 border-dashed rounded-lg cursor-pointer bg-neutral-50 dark:bg-neutral-700 hover:bg-neutral-100 dark:border-neutral-600 dark:hover:border-neutral-500 dark:hover:bg-neutral-600"
              >
                <div class="flex flex-col items-center justify-center py-2">
                  <svg
                    class="w-8 h-8 mb-4 text-neutral-500 dark:text-neutral-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p
                    class="mb-2 text-sm text-neutral-500 dark:text-neutral-400"
                  >
                    <span class="font-semibold">Click to upload an image</span>
                  </p>
                  <p class="text-xs text-neutral-500 dark:text-neutral-400">
                    Maximum file size: 5MB
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  accept="image/*"
                  @change="handleFileChange"
                  class="hidden"
                />
              </label>
            </div>
          </div>

          <!-- Submit Code Button -->
          <button
            type="submit"
            class="w-full mt-4 p-4 bg-black text-white dark:bg-white dark:text-black font-medium text-sm rounded-md shadow-md lg:hover:bg-neutral-800 active:bg-neutral-800 dark:lg:hover:bg-neutral-200 dark:active:bg-neutral-200 disabled:bg-neutral-500 disabled:active:bg-neutral-500 disabled:lg:hover:bg-neutral-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>

    <!-- DESKTOP RIGHT SIDEPANE -->
    <div
      class="hidden fixed scrollable lg:max-h-[92vh] lg:min-h-[92vh] w-full lg:left-[80%] lg:w-1/5 lg:flex flex-col gap-8 px-2 py-8"
    >
      <!-- SUBTOPIC DESCRIPTION AND RULES -->
      <div class="px-2">
        <div
          class="rounded-lg border border-neutral-300 dark:border-neutral-600 px-4 py-4 flex flex-col gap-2"
          v-if="chosenSubtopic"
        >
          <div class="flex items-center gap-2">
            <img
              :src="chosenSubtopic.icon"
              alt=""
              class="h-6"
            />
            <span class="font-semibold">{{ chosenSubtopic.name }}</span>
          </div>
          <div>
            {{ chosenSubtopic.description }}
          </div>
          <div class="font-semibold">Rules</div>
          <ol class="">
            <li
              v-for="(rule, index) in chosenSubtopic.subtopic_rules"
              :key="index"
              class="pb-2"
            >
              <button
                class="rounded-lg w-full text-left px-4 py-2 font-semibold bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                @click="toggleRule(index)"
              >
                {{ index + 1 }}. {{ rule.title }}
              </button>
              <div
                v-if="expandedRuleIndex === index"
                class="px-4 py-2"
              >
                {{ rule.description }}
              </div>
            </li>
          </ol>
        </div>
      </div>

      <!-- COURSE GROUP DESCRIPTION -->
      <div class="px-2">
        <div
          class="rounded-lg border border-neutral-300 dark:border-neutral-600 px-4 py-4"
          v-if="chosenCourseGroup"
        >
          <div class="flex items-center gap-2">
            <img
              :src="chosenCourseGroup.icon"
              alt=""
              class="h-6"
            />
            <span class="font-semibold">{{ chosenCourseGroup.name }}</span>
          </div>
          <div class="mt-2">{{ chosenCourseGroup.description }}</div>
        </div>
      </div>
    </div>

    <!-- MOBILE SUBTOPIC INFO MODAL -->
    <div
      class="modal-container"
      v-if="isShowSubtopicModal"
    >
      <CloseIcon
        @click="hideSubtopicModal"
        class="absolute top-4 right-4"
      />
      <div class="h-screen mt-4 px-6 py-4">
        <div class="flex items-center gap-2">
          <img
            :src="chosenSubtopic.icon"
            alt=""
            class="h-6"
          />
          <span class="text-xl font-semibold">{{ chosenSubtopic.name }}</span>
        </div>
        <div class="pt-4">
          {{ chosenSubtopic.description }}
        </div>
        <div class="font-semibold py-4">Rules</div>
        <ol class="">
          <li
            v-for="(rule, index) in chosenSubtopic.subtopic_rules"
            :key="index"
            class="pb-4"
          >
            <button
              class="rounded-lg w-full text-left px-4 py-2 font-semibold bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
              @click="toggleRule(index)"
            >
              {{ index + 1 }}. {{ rule.title }}
            </button>
            <div
              v-if="expandedRuleIndex === index"
              class="px-4 py-2"
            >
              {{ rule.description }}
            </div>
          </li>
        </ol>
      </div>
    </div>

    <!-- MOBILE COURSE GROUP INFO MODAL -->
    <div
      class="modal-container"
      v-if="isShowCourseGroupModal"
    >
      <CloseIcon
        @click="hideCourseGroupModal"
        class="absolute top-4 right-4"
      />
      <div class="h-screen mt-4 px-6 py-4">
        <div class="flex items-center gap-2">
          <img
            src="https://em-content.zobj.net/source/apple/391/gear_2699-fe0f.png"
            alt=""
            class="h-6"
          />
          <span class="text-xl font-semibold">{{
            chosenCourseGroup.name
          }}</span>
        </div>
        <div class="mt-4">{{ chosenCourseGroup.description }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, ref, onMounted } from "vue";
  import CloseIcon from "@/components/icons/CloseIcon.vue";
  import InfoIcon from "@/components/icons/InfoIcon.vue";
  import Loading from "vue-loading-overlay";
  import { useUserStore } from "@/stores/user";
  import { useRouter } from "vue-router";

  const errors = ref({});
  const router = useRouter();
  const userStore = useUserStore();
  const subtopic = ref("");
  const courseGroup = ref("");
  const title = ref("");
  const post = ref("");
  const expandedRuleIndex = ref(null);
  const isShowSubtopicModal = ref(false);
  const isShowCourseGroupModal = ref(false);
  const selectedFile = ref(null);
  const imagePreview = ref(null);
  const isCensorPost = ref(false);
  const isPromotePost = ref(false);
  const loading = ref(false);

  const SUBTOPICS = ref(null);
  const COURSE_GROUPS = ref(null);

  onMounted(() => {
    getSubtopics();
    getCourseGroups();
  });

  // fetch suptopics
  function getSubtopics() {
    const request = new Request("/api/subtopics", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    loading.value = true;
    fetch(request)
      .then((response) => {
        if (!response.ok) {
          // Check for a 400 error
          if (response.status === 400) {
            return response.json().then((errorData) => {
              throw new Error(`${errorData.message || "Bad Request"}`);
            });
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
        errors.value.createPost = e.message;
      })
      .finally(() => {
        loading.value = false;
      });
  }

  // fetch course groups
  function getCourseGroups() {
    const request = new Request("/api/course_groups", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    loading.value = true;
    fetch(request)
      .then((response) => {
        if (!response.ok) {
          // Check for a 400 error
          if (response.status === 400) {
            return response.json().then((errorData) => {
              throw new Error(`${errorData.message || "Bad Request"}`);
            });
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
        errors.value.createPost = e.message;
      })
      .finally(() => {
        loading.value = false;
      });
  }

  // check if post is tagged NSFW
  const isPostNsfw = computed(() => {
    if (chosenSubtopic.value) {
      return chosenSubtopic.value.name == "NSFW";
    }
    return false;
  });

  // Toggle censor post boolean
  function toggleCensorPostToggle() {
    isCensorPost.value = !isCensorPost.value;
  }

  // Toggle promote post boolean
  function togglePromotePost() {
    isPromotePost.value = !isPromotePost.value;
  }

  // Handle File Selection
  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      selectedFile.value = file;

      // Create preview URL
      imagePreview.value = URL.createObjectURL(file);
    }
  }

  // Clear course group value
  function clearCourseGroup() {
    courseGroup.value = "";
  }

  // Clear image attachment values
  function clearImageAttachment() {
    selectedFile.value = null;
    imagePreview.value = null;
    errors.value.file = null;
  }

  // Validation helper function to validate post values
  const validatePostInputs = () => {
    errors.value = {};

    if (!title.value) {
      errors.value.title = "Title is required.";
    }
    if (!post.value) {
      errors.value.post = "Post cannot be empty";
    }
    if (!subtopic.value) {
      errors.value.subtopic = "A subtopic is required.";
    }

    if (selectedFile.value) {
      const fileSize = selectedFile.value.size / 1024 / 1024; // in MiB
      if (fileSize > 5) {
        errors.value.file = "Filesize exceeds 5 MB";
      }
    }

    return Object.keys(errors.value).length === 0;
  };

  // Handler to create a post
  function handlePostSubmit() {
    if (validatePostInputs()) {
      // if user attaches a file, upload file first before creating post
      if (selectedFile.value) {
        try {
          const formData = new FormData();
          formData.append("file", selectedFile.value);

          const request = new Request("/api/upload", {
            method: "POST",
            headers: {},
            body: formData,
          });
          loading.value = true;
          fetch(request)
            .then((response) => {
              if (!response.ok) {
                if (response.status === 400) {
                  return response.json().then((errorData) => {
                    throw new Error(`${errorData.message || "Bad Request"}`);
                  });
                }
                throw new Error(
                  `Error ${response.status}: ${response.statusText}`
                );
              }
              return response.json();
            })
            .then((data) => {
              const attachmentUrl = data.url;

              const reqBody = {
                college: userStore.college ? userStore.college.id : null,
                courseGroup: courseGroup.value,
                subtopic: subtopic.value,
                title: title.value,
                isCensorPost: isCensorPost.value || isPostNsfw.value,
                isPromotePost: isPromotePost.value,
                post: post.value,
                attachment: attachmentUrl,
                author: userStore.username,
              };

              const request = new Request("/api/create_post", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(reqBody),
              });

              fetch(request)
                .then((response) => {
                  if (!response.ok) {
                    if (response.status === 400) {
                      return response.json().then((errorData) => {
                        throw new Error(
                          `${errorData.message || "Bad Request"}`
                        );
                      });
                    }
                    throw new Error(
                      `Error ${response.status}: ${response.statusText}`
                    );
                  }
                  return response.json();
                })
                .then((data) => {
                  router.push(`/post/${data.id}`);
                })
                .catch((e) => {
                  errors.value.createPost = e.message;
                })
                .finally(() => {
                  loading.value = false;
                });
            })
            .catch((e) => {
              errors.value.createPost = e.message;
            })
            .finally(() => {
              loading.value = false;
            });
        } catch (error) {
          console.error("Error uploading file:", error);
          alert("Error uploading file. Please try again.");
        }
      } else {
        const reqBody = {
          college: userStore.college ? userStore.college.id : null,
          courseGroup: courseGroup.value,
          subtopic: subtopic.value,
          title: title.value,
          isCensorPost: isCensorPost.value || isPostNsfw.value,
          isPromotePost: isPromotePost.value,
          post: post.value,
          attachment: null,
          author: userStore.username,
        };

        const request = new Request("/api/create_post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        });

        loading.value = true;
        fetch(request)
          .then((response) => {
            if (!response.ok) {
              // Check for a 400 error
              if (response.status === 400) {
                return response.json().then((errorData) => {
                  throw new Error(`${errorData.message || "Bad Request"}`);
                });
              }
              // Handle other status codes
              throw new Error(
                `Error ${response.status}: ${response.statusText}`
              );
            }
            return response.json(); // Parse JSON if response is ok
          })
          .then((data) => {
            router.push(`/post/${data.id}`);
          })
          .catch((e) => {
            errors.value.createPost = e.message;
          })
          .finally(() => {
            loading.value = false;
          });
      }
    }
  }

  // Toggle expanded subtopic rule
  function toggleRule(index) {
    expandedRuleIndex.value = expandedRuleIndex.value === index ? null : index;
  }

  // Hide subtopic modal
  function hideSubtopicModal() {
    isShowSubtopicModal.value = false;
  }

  // Show subtopic modal
  function showSubtopicModal() {
    isShowSubtopicModal.value = true;
  }

  // Hide course group modal
  function hideCourseGroupModal() {
    isShowCourseGroupModal.value = false;
  }

  // Show course group modal
  function showCourseGroupModal() {
    isShowCourseGroupModal.value = true;
  }

  // retrieve the user's chosen subtopic based on what was selected on the dropdown
  const chosenSubtopic = computed(() => {
    if (subtopic.value) {
      return SUBTOPICS.value.filter((topic) => topic.id === subtopic.value)[0];
    }
    return null;
  });

  // retrieve the user's chosen course group based on what was selected on the dropdown
  const chosenCourseGroup = computed(() => {
    if (courseGroup.value) {
      return COURSE_GROUPS.value.filter(
        (course) => course.id === courseGroup.value
      )[0];
    }
    return null;
  });
</script>

<style lang="scss" scoped></style>
