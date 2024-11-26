<template>
  <div class="relative">
    <div class="absolute w-full lg:left-[20%] lg:w-3/5 flex flex-col gap-0">
      <div class="px-8 pt-4 pb-12">
        <div class="font-bold text-2xl mb-2 p-2">Create Post</div>
        <form
          @submit.prevent="handlePostSubmit"
          class="flex flex-col gap-4"
        >
          <div class="flex flex-col gap-4 p-2">
            <!-- COLLEGE -->
            <div>
              <label
                for="college"
                class="block text-sm font-semibold"
              >
                <span class="text-red-500 font-bold">* </span>College
              </label>
              <input
                type="text"
                id="college"
                v-model="college"
                disabled
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-neutral-800 dark:border-neutral-600"
              />
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
                <select
                  id="subtopic"
                  v-model="subtopic"
                  class="appearance-none mt-1 block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-neutral-900 border-neutral-300 dark:border-neutral-600 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800"
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
                    :value="interest.id"
                    v-for="interest in interestsChoices"
                  >
                    {{ interest.text }}
                  </option>
                </select>
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
                  Course Group
                </label>
                <select
                  id="courseGroup"
                  v-model="courseGroup"
                  class="appearance-none mt-1 block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-neutral-900 border-neutral-300 dark:border-neutral-600 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <option
                    selected
                    value=""
                    disabled
                  >
                    Click to select a relevant course group
                  </option>
                  <option>Architecture</option>
                  <option>Business</option>
                  <option>Computer Science</option>
                  <option>Engineering</option>
                  <option>Nursing</option>
                  <option>Others</option>
                </select>
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
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-neutral-900"
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
                    or drag and drop here
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

    <div
      class="hidden absolute w-full lg:left-[80%] lg:w-1/5 lg:flex flex-col gap-0 p-2"
    >
      Right pane
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { interestsChoices } from "@/tools/sampledata";
  import CloseIcon from "@/components/icons/CloseIcon.vue";

  const errors = ref([]);
  const college = ref("University of the Philippines");
  const subtopic = ref("");
  const courseGroup = ref("");
  const title = ref("");
  const post = ref("");
  // State Management
  const selectedFile = ref(null);
  const imagePreview = ref(null);

  // Handle File Selection
  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      selectedFile.value = file;

      // Create preview URL
      imagePreview.value = URL.createObjectURL(file);
    }
  }

  function clearImageAttachment() {
    selectedFile.value = null;
    imagePreview.value = null;
    errors.value.file = null;
  }

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

  function handlePostSubmit() {
    if (validatePostInputs()) {
      var postDetails = {
        college: college.value,
        title: title.value,
        subtopic: subtopic.value,
        courseGroup: courseGroup.value,
        post: post.value,
        attachment: imagePreview.value,
      };
      alert("Received post details: " + JSON.stringify(postDetails, null, 2));

      // Add API post call and logic here
    }
  }
</script>

<style lang="scss" scoped></style>
