<template>
  <!-- Modal Overlay -->
  <div
    @click.self="closeModal"
    class="modal-overlay"
  >
    <!-- Modal Container -->
    <div class="modal-container">
      <!-- Close Button -->
      <button
        @click="closeModal"
        class="modal-close-btn"
      >
        <CloseIcon />
      </button>
      <!-- CONTENT -->
      <!-- Step 1: School Email -->
      <div
        class="p-6 lg:p-12 flex flex-col gap-4 h-screen lg:h-auto"
        v-if="currentSignupStep == 1"
      >
        <h2 class="text-3xl font-bold">Join Mesh</h2>
        <div class="text-sm flex flex-col gap-2">
          <span>
            Don't worry, we never store emails. All activity you do on Mesh will
            be anonymous.
            <RouterLink
              to="/about"
              class="font-semibold underline underline-offset-2"
              @click="closeModal"
            >
              Read how we protect our users.
            </RouterLink>
          </span>
        </div>
        <form
          @submit.prevent="handleEmailSignUp"
          class="flex flex-col gap-4"
        >
          <!-- Email -->
          <div>
            <label
              for="email"
              class="block text-sm font-semibold"
            >
              Please use your school email to get full access
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@university.edu.ph"
              v-model="email"
              :class="{
                'border-red-500': errors.email,
                'border-neutral-300 dark:border-neutral-600': !errors.email,
              }"
              class="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm dark:bg-neutral-900"
            />
            <p
              v-if="errors.email"
              class="mt-1 text-sm text-red-500"
            >
              {{ errors.email }}
            </p>
          </div>

          <span class="text-xs mt-4">
            By signing up, you agree to our
            <RouterLink
              to="/about"
              class="underline underline-offset-2"
              @click="closeModal"
              >Privacy Policy</RouterLink
            >
            and
            <RouterLink
              to="/about"
              class="underline underline-offset-2"
              @click="closeModal"
            >
              Terms of Agreement.
            </RouterLink>
          </span>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full p-4 bg-black text-white dark:bg-white dark:text-black font-medium text-sm rounded-md shadow-md lg:hover:bg-neutral-800 active:bg-neutral-800 dark:lg:hover:bg-neutral-200 dark:active:bg-neutral-200"
          >
            Continue
          </button>
        </form>
      </div>
      <!-- Step 2: Email Verification OTP -->
      <div
        class="p-6 lg:p-12 flex flex-col gap-4 h-screen lg:h-auto"
        v-else-if="currentSignupStep == 2"
      >
        <h2 class="text-3xl font-bold">Validate your email</h2>
        <div class="text-sm flex flex-col gap-2">
          <span>
            We sent a verfication code to
            <span class="font-semibold">{{ email }}</span
            >. Please check your inbox and enter it below to verify your email
            address.
          </span>
          <span>The code will expire in 5 minutes.</span>
        </div>
        <form
          @submit.prevent="handleCodeVerification"
          class="flex flex-col gap-4"
        >
          <!-- OTP -->
          <div class="flex justify-evenly">
            <input
              v-for="(code, index) in codes"
              :key="index"
              v-model="codes[index]"
              type="text"
              maxlength="1"
              class="w-12 h-12 text-center border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-neutral-900 dark:text-white"
              :ref="(el) => (inputs[index] = el)"
              @input="moveToNextCodeInput(index)"
              @keydown.backspace="moveToPreviousCodeInput(index, $event)"
            />
          </div>

          <!-- Submit Code Button -->
          <button
            type="submit"
            class="w-full mt-4 p-4 bg-black text-white dark:bg-white dark:text-black font-medium text-sm rounded-md shadow-md lg:hover:bg-neutral-800 active:bg-neutral-800 dark:lg:hover:bg-neutral-200 dark:active:bg-neutral-200 disabled:bg-neutral-500 disabled:active:bg-neutral-500 disabled:lg:hover:bg-neutral-500"
            :disabled="!isCodeComplete"
          >
            Continue
          </button>
        </form>
      </div>

      <!-- Step 3: User Details -->
      <div
        class="p-6 lg:p-12 flex flex-col gap-4 h-screen lg:h-auto"
        v-else-if="currentSignupStep == 3"
      >
        <h2 class="text-3xl font-bold">Create Account</h2>
        <div class="text-sm flex flex-col gap-2">
          <span>Let's finish setting up your account.</span>
        </div>
        <form
          @submit.prevent="handleAccountInfo"
          class="flex flex-col gap-4"
        >
          <div
            class="flex flex-col gap-4 max-h-[70vh] lg:max-h-[60vh] scrollable"
          >
            <!-- Username -->
            <div>
              <label
                for="username"
                class="block text-sm font-semibold"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                v-model="username"
                :class="{
                  'border-red-500': errors.username,
                  'border-neutral-300 dark:border-neutral-600':
                    !errors.username,
                }"
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-neutral-900"
              />
              <span
                v-if="errors.username"
                class="mt-1 text-sm text-red-500"
              >
                {{ errors.username }}
              </span>
            </div>

            <!-- Password -->
            <div>
              <label
                for="password"
                class="block text-sm font-semibold"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                v-model="password"
                :class="{
                  'border-red-500': errors.password,
                  'border-neutral-300 dark:border-neutral-600':
                    !errors.password,
                }"
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-neutral-900"
              />
              <span
                v-if="errors.password"
                class="mt-1 text-sm text-red-500"
              >
                {{ errors.password }}
              </span>
            </div>

            <!-- Confirm Password -->
            <div>
              <label
                for="passwordConfirm"
                class="block text-sm font-semibold"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="passwordConfirm"
                v-model="passwordConfirm"
                :class="{
                  'border-red-500': errors.passwordConfirm,
                  'border-neutral-300 dark:border-neutral-600':
                    !errors.passwordConfirm,
                }"
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-neutral-900"
              />
              <span
                v-if="errors.passwordConfirm"
                class="mt-1 text-sm text-red-500"
              >
                {{ errors.passwordConfirm }}
              </span>
            </div>

            <span class="text-sm"
              ><span class="font-semibold"
                >Please don't forget your password!</span
              >
              Since we don't store emails, there will be no way for you to
              recover or reset a forgotten password.
            </span>

            <hr class="hr-responsive" />

            <span class="text-sm">
              The following fields are all optional - but these would help us
              curate your feed!
            </span>

            <!-- Degree -->
            <div>
              <label
                for="degree"
                class="block text-sm font-semibold"
              >
                Degree
              </label>
              <select
                id="degree"
                v-model="degree"
                class="appearance-none mt-1 block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-neutral-900 border-neutral-300 dark:border-neutral-600"
              >
                <option
                  selected
                  disabled
                >
                  Please select a course group
                </option>
                <option>Architecture</option>
                <option>Business</option>
                <option>Computer Science</option>
                <option>Engineering</option>
                <option>Nursing</option>
                <option>Others</option>
              </select>
            </div>

            <!-- SUBTOPICS -->
            <div>
              <span class="block text-sm font-semibold mb-1"
                >Interests and Subtopics</span
              >
              <ul
                id="topics"
                class="grid w-full gap-4 grid-cols-2 lg:grid-cols-3"
              >
                <li v-for="subtopic in SUBTOPICS">
                  <input
                    type="checkbox"
                    :id="subtopic.id"
                    :value="subtopic.id"
                    class="hidden peer"
                    v-model="subtopics"
                  />
                  <label
                    :for="subtopic.id"
                    class="signup-checkbox-item"
                  >
                    <div class="flex w-full gap-1 items-center justify-center">
                      <img
                        :src="subtopic.icon"
                        class="h-5"
                        alt=""
                      />
                      <div class="font-semibold text-sm">
                        {{ subtopic.name }}
                      </div>
                    </div>
                  </label>
                </li>
              </ul>
            </div>
          </div>

          <!-- Submit Code Button -->
          <button
            type="submit"
            class="w-full mt-4 p-4 bg-black text-white dark:bg-white dark:text-black font-medium text-sm rounded-md shadow-md lg:hover:bg-neutral-800 active:bg-neutral-800 dark:lg:hover:bg-neutral-200 dark:active:bg-neutral-200 disabled:bg-neutral-500 disabled:active:bg-neutral-500 disabled:lg:hover:bg-neutral-500"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
  import CloseIcon from "./icons/CloseIcon.vue";
  import { SUBTOPICS } from "@/tools/sampledata";
  import { ref, computed } from "vue";
  import { useRouter } from "vue-router";

  const email = ref("");
  const errors = ref({});
  const currentSignupStep = ref(1);
  const codes = ref(Array(6).fill(""));
  const inputs = ref([]);
  const username = ref("");
  const password = ref("");
  const passwordConfirm = ref("");
  const degree = ref("");
  const subtopics = ref([]);
  const router = useRouter();

  const emit = defineEmits(["closeModal"]);

  const isCodeComplete = computed(() => {
    return codes.value.every((digit) => digit !== "");
  });

  // Move focus to the next input field
  const moveToNextCodeInput = (index) => {
    if (codes.value[index] && index < codes.value.length - 1) {
      inputs.value[index + 1]?.focus();
    }
  };

  // Move focus to the previous input field
  const moveToPreviousCodeInput = (index, event) => {
    if (!codes.value[index] && index > 0 && event.key === "Backspace") {
      inputs.value[index - 1]?.focus();
    }
  };

  const validateEmail = () => {
    errors.value = {};
    if (!email.value) {
      errors.value.email = "Email is required.";
    }
    return Object.keys(errors.value).length === 0;
  };

  const validateAccountInfo = () => {
    errors.value = {};
    if (!username.value) {
      errors.value.username = "Username is required.";
    }

    // add username unique check call
    if (false) {
      errors.value.username = "Username already taken.";
    }

    if (password.value != passwordConfirm.value) {
      errors.value.password = "Passwords do not match";
      errors.value.passwordConfirm = "Passwords do not match";
    }

    if (password.value.length < 6) {
      errors.value.password = "Password must be at least 6 characters";
    }

    return Object.keys(errors.value).length === 0;
  };

  const handleEmailSignUp = () => {
    if (validateEmail()) {
      alert("Received email address: " + email.value);
      // Add API call and logic here
      currentSignupStep.value += 1;
    }
  };

  const handleCodeVerification = () => {
    const verificationCode = codes.value.join("");
    alert(`Verification code submitted: ${verificationCode}`);
    // Add API call and logic here
    currentSignupStep.value += 1;
  };

  const handleAccountInfo = () => {
    if (validateAccountInfo()) {
      var accountInfo = {
        username: username.value,
        password: password.value,
        degree: degree.value,
        subtopics: subtopics.value,
      };
      alert("Received account info: " + JSON.stringify(accountInfo, null, 2));
      // Add API call and logic here

      localStorage.setItem("mesh_token", "myaccesstoken");
      closeModal(); // Close modal
      router.go(0);
    }
  };

  const closeModal = () => {
    emit("closeModal");
  };
</script>

<style scoped>
  /* Tailwind handles styling */
</style>
