<template>
  <div class="max-h-svh overflow-y-scroll snap-y">
    <!-- LOG IN AND SIGNUP -->
    <div
      class="snap-start w-full bg-white min-h-svh bg-cover bg-center flex flex-col gap-8 justify-center items-center bg-[url('/landing_bg.svg')]"
    >
      <div
        class="backdrop-blur-sm bg-white/60 shadow-[rgba(0,0,0,0.3)_0px_0px_15px_6px] p-10 rounded-lg mx-4 max-w-full text-black dark:text-black"
      >
        <div
          class="lg:w-[450px]"
          v-if="!showSignupModal"
        >
          <!-- Text Content -->
          <div class="flex flex-col gap-4 justify-center items-center">
            <div class="flex gap-4 items-center">
              <img
                src="/logo.png"
                alt="Mesh Logo"
                class="aspect-square h-16 lg:h-20"
              />
              <span class="text-6xl lg:text-7xl font-extrabold"> Mesh </span>
            </div>
            <div>
              <span class="lg:text-lg text-nowrap"
                >an anonymous college social network</span
              >
            </div>
          </div>

          <!-- LOGIN -->
          <div class="flex flex-col gap-8 w-full lg:px-0 mt-4">
            <form
              @submit.prevent="handleLogin"
              class="flex flex-col gap-4"
            >
              <span
                v-if="errors.login"
                class="mt-4 text-sm font-semibold bg-red-700 text-white py-4 px-4 rounded"
              >
                {{ errors.login }}
              </span>
              <!-- USERNAME -->
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
                  v-model="loginData.username"
                  :class="{
                    'border-red-500': errors.username,
                    'border-neutral-300 ': !errors.username,
                  }"
                  class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
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
                  v-model="loginData.password"
                  :class="{
                    'border-red-500': errors.password,
                    'border-neutral-300': !errors.password,
                  }"
                  class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                />
                <span
                  v-if="errors.password"
                  class="mt-1 text-sm text-red-500"
                >
                  {{ errors.password }}
                </span>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                class="w-full mt-4 p-4 bg-black text-white font-medium text-sm rounded-md shadow-md lg:hover:bg-neutral-800 active:bg-neutral-800"
              >
                Login
              </button>
            </form>
            <div class="flex gap-1 justify-center text-nowrap">
              <span>New to Mesh?</span>
              <span
                @click="openSignupModal"
                class="text-blue-600 cursor-pointer font-semibold"
                >Create an account
              </span>
            </div>
          </div>
        </div>

        <!-- SIGNUP -->
        <div v-if="showSignupModal">
          <!-- Step 1: School Email -->
          <div
            class="flex flex-col gap-4 lg:max-w-[450px]"
            v-if="signupData.currentSignupStep == 1"
          >
            <h2 class="text-3xl font-bold">Join Mesh</h2>
            <div class="text-sm flex flex-col gap-2">
              <span>
                Don't worry, we never store emails. All activity you do on Mesh
                will be anonymous.
                <RouterLink
                  to="/about"
                  class="font-semibold underline underline-offset-2"
                >
                  Read how we protect our users.
                </RouterLink>
              </span>
            </div>
            <form
              @submit.prevent="handleEmailSignUp"
              class="flex flex-col gap-4"
            >
              <span
                v-if="errors.signup"
                class="mt-2 text-sm font-semibold bg-red-700 text-white py-4 px-4 rounded"
              >
                {{ errors.signup }}
              </span>
              <!-- Email -->
              <div class="mt-2">
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
                  v-model="signupData.email"
                  :class="{
                    'border-red-500': errors.email,
                    'border-neutral-300': !errors.email,
                  }"
                  class="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm"
                />
                <p
                  v-if="errors.email"
                  class="mt-1 text-sm text-red-500"
                >
                  {{ errors.email }}
                </p>
              </div>

              <span class="text-xs text-neutral-700 mt-4">
                By signing up, you agree to our
                <RouterLink
                  to="/about"
                  class="underline underline-offset-2"
                >
                  Privacy Policy
                </RouterLink>
                and
                <RouterLink
                  to="/about"
                  class="underline underline-offset-2"
                >
                  Terms of Agreement.
                </RouterLink>
              </span>

              <!-- Submit Button -->
              <button
                type="submit"
                class="w-full p-4 bg-black text-white font-medium text-sm rounded-md shadow-md lg:hover:bg-neutral-800 active:bg-neutral-800"
              >
                Continue
              </button>
            </form>

            <span
              @click="closeSignupModal"
              class="absolute top-6 right-6 cursor-pointer"
            >
              <CloseIcon />
            </span>
          </div>
          <!-- Step 2: Email Verification OTP -->
          <div
            class="flex flex-col gap-4 lg:max-w-[450px]"
            v-else-if="signupData.currentSignupStep == 2"
          >
            <h2 class="text-3xl font-bold">Validate your email</h2>
            <div class="text-sm flex flex-col gap-2">
              <div
                class="rounded-lg p-2 bg-neutral-200/50 font-semibold flex gap-2 items-center mb-2"
              >
                <div
                  class="rounded-full w-6 h-6"
                  :style="`background-color: ${signupData.college.color}`"
                ></div>
                <span>{{ signupData.college.name }}</span>
              </div>
              <span>
                We sent a verfication code to
                <span class="font-semibold">{{ signupData.email }}</span
                >. Please check your inbox and enter it below to verify your
                email address.
              </span>
              <span
                >The code will expire in
                <strong>{{ otpCountdown }}</strong> seconds.</span
              >
            </div>
            <form
              @submit.prevent="handleOtpVerification"
              class="flex flex-col gap-4"
            >
              <span
                v-if="errors.signup"
                class="text-sm font-semibold bg-red-700 text-white py-4 px-4 rounded"
              >
                {{ errors.signup }}
              </span>

              <!-- OTP -->
              <div class="flex justify-evenly">
                <input
                  v-for="(code, index) in signupData.otp"
                  :key="index"
                  v-model="signupData.otp[index]"
                  type="text"
                  maxlength="1"
                  class="w-12 h-12 text-center border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  :ref="(el) => (signupData.inputs[index] = el)"
                  @input="moveToNextOtpInput(index)"
                  @keydown.backspace="moveToPreviousOtpInput(index, $event)"
                />
              </div>
              <span class="text-sm">
                Didn't receive an OTP?
                <span
                  class="underline font-semibold cursor-pointer"
                  @click="resendOtp"
                  v-if="!hasResentOtp"
                >
                  Click to resend
                </span>
                <span
                  class="font-semibold"
                  v-else
                >
                  OTP resent!
                </span>
              </span>

              <!-- Submit OTP Button -->
              <button
                type="submit"
                class="w-full mt-4 p-4 bg-black text-white font-medium text-sm rounded-md shadow-md lg:hover:bg-neutral-800 active:bg-neutral-800 disabled:bg-neutral-500 disabled:active:bg-neutral-500 disabled:lg:hover:bg-neutral-500"
                :disabled="!isOtpInputComplete"
              >
                Continue
              </button>
            </form>
            <span
              @click="closeSignupModal"
              class="absolute top-6 right-6 cursor-pointer"
            >
              <CloseIcon />
            </span>
          </div>

          <!-- Step 3: User Details -->
          <div
            class="flex flex-col gap-4 max-h-[600px] lg:max-w-[600px] scrollable px-4"
            v-else-if="signupData.currentSignupStep == 3"
          >
            <h2 class="text-3xl font-bold">Create Account</h2>
            <div class="text-sm flex flex-col gap-2">
              <span>Let's finish setting up your account.</span>
            </div>

            <form
              @submit.prevent="handleCreateAccount"
              class="flex flex-col gap-4"
            >
              <span
                v-if="errors.signup"
                class="text-sm font-semibold bg-red-700 text-white py-4 px-4 rounded"
              >
                {{ errors.signup }}
              </span>
              <div class="flex flex-col gap-4">
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
                    v-model="signupData.username"
                    :class="{
                      'border-red-500': errors.username,
                      'border-neutral-300': !errors.username,
                    }"
                    class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
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
                    v-model="signupData.password"
                    :class="{
                      'border-red-500': errors.password,
                      'border-neutral-300': !errors.password,
                    }"
                    class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
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
                    v-model="signupData.passwordConfirm"
                    :class="{
                      'border-red-500': errors.passwordConfirm,
                      'border-neutral-300': !errors.passwordConfirm,
                    }"
                    class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
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
                  The following fields are all optional - but these would help
                  us curate your feed!
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
                    v-model="signupData.degree"
                    class="appearance-none mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-neutral-300 cursor-pointer bg-white"
                  >
                    <option
                      selected
                      disabled
                      value=""
                    >
                      Click to select a course group
                    </option>
                    <option v-for="course in COURSE_GROUPS">
                      {{ course.name }}
                    </option>
                  </select>
                </div>

                <!-- Interests/Topics -->
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
                        v-model="signupData.subtopics"
                      />
                      <label
                        :for="subtopic.id"
                        class="signup-checkbox-item"
                      >
                        <div
                          class="flex w-full gap-1 items-center justify-center"
                        >
                          <img
                            :src="subtopic.icon"
                            class="h-5"
                            alt=""
                            loading="lazy"
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

              <!-- Submit Account Button -->
              <button
                type="submit"
                class="w-full mt-4 p-4 bg-black text-white font-medium text-sm rounded-md shadow-md lg:hover:bg-neutral-800 active:bg-neutral-800 disabled:bg-neutral-500 disabled:active:bg-neutral-500 disabled:lg:hover:bg-neutral-500"
              >
                Create Account
              </button>
            </form>
            <span
              @click="closeSignupModal"
              class="absolute top-6 right-6 cursor-pointer"
            >
              <CloseIcon />
            </span>
          </div>

          <!-- Step -1: Email Not Supported -->
          <div
            class="flex flex-col gap-4"
            v-if="signupData.currentSignupStep == -1"
          >
            <h2 class="text-3xl font-bold">Join the Waitlist</h2>
            <div class="text-sm flex flex-col gap-2">
              <span>
                Sorry, but your email <strong>{{ signupData.email }}</strong> is
                currently not supported in Mesh.
              </span>
            </div>

            <span
              @click="closeSignupModal"
              class="absolute top-6 right-6 cursor-pointer"
            >
              <CloseIcon />
            </span>
          </div>

          <!-- Step -2: Email Used More Than Twice -->
          <div
            class="flex flex-col gap-4"
            v-if="signupData.currentSignupStep == -2"
          >
            <h2 class="text-3xl font-bold">
              Your email has already been used twice
            </h2>
            <div class="text-sm flex flex-col gap-2">
              <span>
                Sorry, but your email
                <strong>{{ signupData.email }}</strong> has already been used
                twice to request for an OTP. In order to prevent abuse and email
                sharing, we cannot allow you to use this email anymore.
              </span>
            </div>

            <span
              @click="closeSignupModal"
              class="absolute top-6 right-6 cursor-pointer"
            >
              <CloseIcon />
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- WHAT IS MESH -->
    <div
      class="snap-start w-full bg-neutral-800 min-h-svh py-16 lg:py-24 bg-cover bg-center flex flex-col gap-8 px-4 lg:px-10 justify-center items-center bg-[url('/landing_bg_black.svg')]"
    >
      <div
        class="backdrop-blur-sm bg-neutral-950/60 shadow-[rgba(0,0,0,0.3)_0px_0px_15px_6px] p-10 rounded-lg max-w-full text-white dark:text-white flex flex-col gap-4"
      >
        <div
          class="w-full lg:max-w-6xl text-3xl !leading-snug lg:text-6xl font-light"
        >
          <span class="font-extrabold">Welcome to Mesh - </span>the social
          network that's designed exclusively for college students in the
          country.
        </div>
        <div
          class="w-full lg:max-w-6xl text-3xl !leading-snug lg:text-6xl font-light"
        >
          At Mesh, we believe in the power of authentic, open conversations. Our
          platform is built around the concepts of anonymity and free speech to
          achieve just that.
        </div>
      </div>
    </div>

    <!-- HOW ANONYMITY WORKS -->
    <div
      class="snap-start w-full bg-white min-h-svh py-16 lg:py-24 bg-cover bg-center flex flex-col gap-8 px-4 lg:px-10 justify-center items-center bg-[url('/landing_bg.svg')]"
    >
      <div
        class="backdrop-blur-sm bg-white/60 shadow-[rgba(0,0,0,0.3)_0px_0px_15px_6px] p-10 rounded-lg max-w-full text-black dark:text-black flex flex-col gap-4"
      >
        <div class="w-full lg:max-w-6xl font-light flex flex-col gap-6">
          <div class="text-3xl lg:text-6xl font-extrabold">
            Anonymity meets
            <span class="color-change-animated">Authenticity</span>
          </div>
          <span class="lg:text-xl font-light !leading-relaxed">
            To use Mesh, you'll need to sign up with your valid university
            email. This helps us verify your school. We'll send you a
            verification code to confirm your email exists, but don't
            worry—<span class="font-bold"
              >getting the code doesn't mean you've created an account with
              us.</span
            ><br /><br />

            We don't store your email, and your activity on Mesh is completely
            untraceable. Even if your college asked us for information about
            your activity, we <span class="italic">literally</span> wouldn't
            have anything to share. <br /><br />
            To keep your anonymity safe, we also recommend avoiding sharing too
            much personal information in your posts that others might use to
            identify you.
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, watch, inject } from "vue";
  import { useRouter } from "vue-router";
  import CloseIcon from "@/components/icons/CloseIcon.vue";

  import { useUserStore } from "@/stores/user";
  import {
    encryptAndStore,
    decryptAndRetrieve,
  } from "@/tools/localStorageUtils";

  const loading = inject("$loading");

  const userStore = useUserStore();

  const router = useRouter();
  const errors = ref({});
  const showSignupModal = ref(false);

  const signupData = ref({
    currentSignupStep: 1,
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
    otp: Array(6).fill(""),
    inputs: [],
    degree: "",
    subtopics: [],
    collegeEmailUuid: "",
    college: {},
  });

  const loginData = ref({
    username: "",
    password: "",
  });

  const otpCountdown = ref(600);
  var countdownInterval = null;
  const hasResentOtp = ref(false);

  const SUBTOPICS = ref([]);
  const COURSE_GROUPS = ref([]);

  onMounted(async () => {
    try {
      const cachedSignupData = await decryptAndRetrieve("signupData");
      if (cachedSignupData) {
        signupData.value = cachedSignupData;

        if (signupData.value.currentSignupStep > 1) {
          openSignupModal();
        }
      } else {
        await encryptAndStore("signupData", signupData.value);
      }
    } catch (error) {
      console.log("Error loading cache");
    }
  });

  // Fetch server for data on specific signup steps
  watch(
    () => signupData.value.currentSignupStep,
    (newVal, oldVal) => {
      if (newVal == 3) {
        getSubtopics();
        getCourseGroups();
      }
    }
  );

  // fetch suptopics
  function getSubtopics() {
    const request = new Request(
      `${import.meta.env.VITE_API_BASE_URL}/api/subtopics`,
      {
        method: "GET",
        headers: {},
      }
    );
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
    const request = new Request(
      `${import.meta.env.VITE_API_BASE_URL}/api/course_groups`,
      {
        method: "GET",
        headers: {},
      }
    );
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

  // Check if otp is fully inputted
  const isOtpInputComplete = computed(() => {
    return signupData.value.otp.every((digit) => digit !== "");
  });

  // Cache the current signup data object to session storage
  function cacheSignupData() {
    encryptAndStore("signupData", signupData.value);
  }

  // Increment signup step counter
  function incrementSignupStep() {
    signupData.value.currentSignupStep += 1;
    cacheSignupData();
  }

  // Set specific signup step counter value
  function setSignupStep(val) {
    signupData.value.currentSignupStep = val;
    cacheSignupData();
  }

  // Start the OTP Countdown timer
  function startOtpCountdown() {
    countdownInterval = setInterval(() => {
      if (otpCountdown.value > 0) {
        otpCountdown.value -= 1;
      } else {
        clearInterval(countdownInterval);
      }
    }, 1000);
  }

  // Reset the OTP Countdown timer
  function resetOtpCountdown() {
    clearInterval(countdownInterval);
    otpCountdown.value = 600;
  }

  // Toggle show the signup component
  function openSignupModal() {
    showSignupModal.value = true;
  }

  // Toggle hide the signup component
  async function closeSignupModal() {
    showSignupModal.value = false;
    otpCountdown.value = 600;
    errors.value.signup = "";

    if (signupData.value.collegeEmailUuid) {
      // Delete temp user that was created with email
      await rollbackSignup(
        signupData.value.email,
        signupData.value.collegeEmailUuid
      );
    } else {
      signupData.value = {
        currentSignupStep: 1,
        username: "",
        password: "",
        passwordConfirm: "",
        email: "",
        otp: Array(6).fill(""),
        inputs: [],
        degree: "",
        subtopics: [],
        collegeEmailUuid: "",
        college: {},
      };

      cacheSignupData();
    }
  }

  async function rollbackSignup(email, uuid) {
    const reqBody = {
      email: email,
      uuid: uuid,
    };

    const request = new Request(
      `${import.meta.env.VITE_API_BASE_URL}/auth/rollback`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      }
    );

    const loader = loading.show();
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
        signupData.value = {
          currentSignupStep: 1,
          username: "",
          password: "",
          passwordConfirm: "",
          email: "",
          otp: Array(6).fill(""),
          inputs: [],
          degree: "",
          subtopics: [],
          collegeEmailUuid: "",
          college: {},
        };

        cacheSignupData();
      })
      .catch((e) => {
        errors.value.signup = e.message;
      })
      .finally(() => {
        loader.hide();
      });
  }

  // Client side username password validation
  function validateLoginForm() {
    errors.value = {};
    if (!loginData.value.username) {
      errors.value.username = "Username is required.";
    }
    if (!loginData.value.password) {
      errors.value.password = "Password is required.";
    }
    return Object.keys(errors.value).length === 0;
  }

  // Login auth handler
  function handleLogin() {
    if (validateLoginForm()) {
      const reqBody = {
        username: loginData.value.username,
        password: loginData.value.password,
      };

      const request = new Request(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        }
      );

      const loader = loading.show();
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
        .then(async (data) => {
          await userStore.setUser(data.data);
          router.go(0);
        })
        .catch((e) => {
          errors.value.login = e.message;
        })
        .finally(() => {
          loader.hide();
        });
    }
  }

  // Move focus to the next input field
  function moveToNextOtpInput(index) {
    if (
      signupData.value.otp[index] &&
      index < signupData.value.otp.length - 1
    ) {
      signupData.value.inputs[index + 1]?.focus();
    }
  }

  // Move focus to the previous input field
  function moveToPreviousOtpInput(index, event) {
    if (
      !signupData.value.otp[index] &&
      index > 0 &&
      event.key === "Backspace"
    ) {
      signupData.value.inputs[index - 1]?.focus();
    }
  }

  // Client side email validation
  function validateEmail() {
    errors.value = {};

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!signupData.value.email) {
      errors.value.email = "Email is required.";
    } else if (!emailRegex.test(signupData.value.email)) {
      errors.value.email = "Invalid email format...";
    }

    return Object.keys(errors.value).length === 0;
  }

  // Client side account info validation
  function validateAccountInfo() {
    errors.value = {};
    if (!signupData.value.username) {
      errors.value.username = "Username is required.";
    }

    if (signupData.value.password != signupData.value.passwordConfirm) {
      errors.value.password = "Passwords do not match";
      errors.value.passwordConfirm = "Passwords do not match";
    }

    if (signupData.value.password.length < 6) {
      errors.value.password = "Password must be at least 6 characters";
    }

    return Object.keys(errors.value).length === 0;
  }

  // Email verification handler
  function handleEmailSignUp() {
    if (validateEmail()) {
      const reqBody = {
        email: signupData.value.email,
      };

      const request = new Request(
        `${import.meta.env.VITE_API_BASE_URL}/auth/validate_email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        }
      );

      const loader = loader.show();
      fetch(request)
        .then((response) => {
          if (!response.ok) {
            // Check for a 400 error
            if (response.status === 400) {
              return response.json().then((errorData) => {
                throw new Error(`${errorData.message || "Bad Request"}`);
              });
            }
            // 401 Error: Email is unsupported
            if (response.status === 401) {
              setSignupStep(-1);
            }
            // 403 Error: Email is used more than twice
            if (response.status === 403) {
              setSignupStep(-2);
            }
            // Handle other status codes
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
          return response.json(); // Parse JSON if response is ok
        })
        .then((data) => {
          incrementSignupStep();
          signupData.value.college = data.data;
          startOtpCountdown();
        })
        .catch((e) => {
          console.log(e);
          errors.value.signup = e.message;
        })
        .finally(() => {
          loader.hide();
        });
    }
  }

  // OTP verification handler
  function handleOtpVerification() {
    errors.value = {};
    const reqBody = {
      otp: signupData.value.otp.join(""),
      email: signupData.value.email,
    };

    const request = new Request(
      `${import.meta.env.VITE_API_BASE_URL}/auth/validate_otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      }
    );

    const loader = loading.show();
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
        signupData.value.collegeEmailUuid = data.data.user.id;
        incrementSignupStep();
        resetOtpCountdown();
      })
      .catch((e) => {
        errors.value.signup = e.message;
      })
      .finally(() => {
        loader.hide();
      });
  }

  // Account creation handler
  function handleCreateAccount() {
    if (validateAccountInfo()) {
      var reqBody = {
        username: signupData.value.username,
        password: signupData.value.password,
        degree: signupData.value.degree,
        subtopics: signupData.value.subtopics,
        uuid: signupData.value.collegeEmailUuid,
        college: signupData.value.college,
      };

      const request = new Request(
        `${import.meta.env.VITE_API_BASE_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        }
      );

      const loader = loading.show();
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
        .then(async (data) => {
          await userStore.setUser(data.data);
          router.go(0);
        })
        .catch((e) => {
          errors.value.signup = e.message;
        })
        .finally(() => {
          loader.hide();
        });
    }
  }

  // Resend OTP to client email
  function resendOtp() {
    const reqBody = {
      email: signupData.value.email,
    };

    const request = new Request(
      `${import.meta.env.VITE_API_BASE_URL}/auth/resend_otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      }
    );

    const loader = loading.show();
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
        hasResentOtp.value = true;
        resetOtpCountdown();
        startOtpCountdown();
      })
      .catch((e) => {
        errors.value.signup = e.message;
      })
      .finally(() => {
        loader.hide();
      });
  }
</script>

<style scoped>
  .color-change-animated {
    -webkit-animation: color-change 6s infinite;
    -moz-animation: color-change 6s infinite;
    -o-animation: color-change 6s infinite;
    -ms-animation: color-change 6s infinite;
    animation: color-change 6s infinite;
  }

  @-webkit-keyframes color-change {
    0% {
      color: #7b1113;
    }
    20% {
      color: #7b1113;
    }
    25% {
      color: #00703c;
    }
    45% {
      color: #00703c;
    }
    50% {
      color: #003a6c;
    }
    70% {
      color: #003a6c;
    }
    75% {
      color: #fcbf15;
    }
    95% {
      color: #fcbf15;
    }
    100% {
      color: #7b1113;
    }
  }
  @-moz-keyframes color-change {
    0% {
      color: #7b1113;
    }
    20% {
      color: #7b1113;
    }
    25% {
      color: #00703c;
    }
    45% {
      color: #00703c;
    }
    50% {
      color: #003a6c;
    }
    70% {
      color: #003a6c;
    }
    75% {
      color: #fcbf15;
    }
    95% {
      color: #fcbf15;
    }
    100% {
      color: #7b1113;
    }
  }
  @-ms-keyframes color-change {
    0% {
      color: #7b1113;
    }
    20% {
      color: #7b1113;
    }
    25% {
      color: #00703c;
    }
    45% {
      color: #00703c;
    }
    50% {
      color: #003a6c;
    }
    70% {
      color: #003a6c;
    }
    75% {
      color: #fcbf15;
    }
    95% {
      color: #fcbf15;
    }
    100% {
      color: #7b1113;
    }
  }
  @-o-keyframes color-change {
    0% {
      color: #7b1113;
    }
    20% {
      color: #7b1113;
    }
    25% {
      color: #00703c;
    }
    45% {
      color: #00703c;
    }
    50% {
      color: #003a6c;
    }
    70% {
      color: #003a6c;
    }
    75% {
      color: #fcbf15;
    }
    95% {
      color: #fcbf15;
    }
    100% {
      color: #7b1113;
    }
  }
  @keyframes color-change {
    0% {
      color: #7b1113;
    }
    20% {
      color: #7b1113;
    }
    25% {
      color: #00703c;
    }
    45% {
      color: #00703c;
    }
    50% {
      color: #003a6c;
    }
    70% {
      color: #003a6c;
    }
    75% {
      color: #fcbf15;
    }
    95% {
      color: #fcbf15;
    }
    100% {
      color: #7b1113;
    }
  }
</style>
