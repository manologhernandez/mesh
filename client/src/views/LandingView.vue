<template>
  <div class="max-h-svh overflow-y-scroll snap-y">
    <!-- LOG IN AND SIGNUP -->
    <div
      class="snap-start w-full bg-white min-h-svh bg-cover bg-center flex flex-col gap-8 justify-center items-center bg-[url('/landing_bg.svg')]"
    >
      <div
        class="backdrop-blur-sm bg-white/60 shadow-[rgba(0,0,0,0.3)_0px_0px_15px_6px] p-10 rounded-lg mx-4 max-w-full md:w-[450px] md:max-w-[450px] text-black dark:text-black"
      >
        <div v-if="!showSignupModal">
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

          <!-- Login-->
          <div class="flex flex-col gap-8 w-full lg:px-0 mt-4">
            <form
              @submit.prevent="handleLogin"
              class="flex flex-col gap-4"
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
                  v-model="password"
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
            class="flex flex-col gap-4"
            v-if="currentSignupStep == 1"
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

              <span class="text-xs mt-4">
                By signing up, you agree to our
                <RouterLink
                  to="/about"
                  class="underline underline-offset-2"
                  >Privacy Policy</RouterLink
                >
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
              @click="showSignupModal = false"
              class="text-sm underline underline-offset-2 cursor-pointer"
              >Return to login</span
            >
          </div>
          <!-- Step 2: Email Verification OTP -->
          <div
            class="flex flex-col gap-4"
            v-else-if="currentSignupStep == 2"
          >
            <h2 class="text-3xl font-bold">Validate your email</h2>
            <div class="text-sm flex flex-col gap-2">
              <span>
                We sent a verfication code to
                <span class="font-semibold">{{ email }}</span
                >. Please check your inbox and enter it below to verify your
                email address.
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
                  class="w-12 h-12 text-center border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  :ref="(el) => (inputs[index] = el)"
                  @input="moveToNextCodeInput(index)"
                  @keydown.backspace="moveToPreviousCodeInput(index, $event)"
                />
              </div>

              <!-- Submit Code Button -->
              <button
                type="submit"
                class="w-full mt-4 p-4 bg-black text-white font-medium text-sm rounded-md shadow-md lg:hover:bg-neutral-800 active:bg-neutral-800 disabled:bg-neutral-500 disabled:active:bg-neutral-500 disabled:lg:hover:bg-neutral-500"
                :disabled="!isCodeComplete"
              >
                Continue
              </button>
            </form>
          </div>

          <!-- Step 3: User Details -->
          <div
            class="flex flex-col gap-4 max-h-[600px] scrollable"
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
                    v-model="username"
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
                    v-model="password"
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
                    v-model="passwordConfirm"
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
                    v-model="degree"
                    class="appearance-none mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-neutral-300"
                  >
                    <option
                      selected
                      disabled
                    >
                      Click to select a course group
                    </option>
                    <option>Architecture</option>
                    <option>Business</option>
                    <option>Computer Science</option>
                    <option>Engineering</option>
                    <option>Nursing</option>
                    <option>Others</option>
                  </select>
                </div>

                <!-- Interests/Topics -->
                <div>
                  <span class="block text-sm font-semibold mb-1"
                    >Interests and Topics</span
                  >
                  <ul
                    id="topics"
                    class="grid w-full gap-4 grid-cols-2 lg:grid-cols-3"
                  >
                    <li v-for="interest in interestsChoices">
                      <input
                        type="checkbox"
                        :id="interest.id"
                        :value="interest.id"
                        class="hidden peer"
                        v-model="interests"
                      />
                      <label
                        :for="interest.id"
                        class="signup-checkbox-item"
                      >
                        <div
                          class="flex w-full gap-1 items-center justify-center"
                        >
                          <img
                            :src="interest.icon"
                            class="h-5"
                            alt=""
                          />
                          <div class="font-semibold text-sm">
                            {{ interest.text }}
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
                class="w-full mt-4 p-4 bg-black text-white font-medium text-sm rounded-md shadow-md lg:hover:bg-neutral-800 active:bg-neutral-800 disabled:bg-neutral-500 disabled:active:bg-neutral-500 disabled:lg:hover:bg-neutral-500"
              >
                Create Account
              </button>
            </form>
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
  import { ref, computed } from "vue";
  import { interestsChoices } from "@/tools/sampledata";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const username = ref("");
  const password = ref("");
  const errors = ref([]);
  const showSignupModal = ref(false);

  const email = ref("");
  const currentSignupStep = ref(1);
  const codes = ref(Array(6).fill(""));
  const inputs = ref([]);
  const passwordConfirm = ref("");
  const degree = ref("");
  const interests = ref([]);

  function openSignupModal() {
    showSignupModal.value = true;
  }

  function hideSignupModal() {
    showSignupModal.value = false;
  }

  const validateForm = () => {
    errors.value = {};
    if (!username.value) {
      errors.value.username = "Username is required.";
    }
    if (!password.value) {
      errors.value.password = "Password is required.";
    }
    return Object.keys(errors.value).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
      console.log("Logging in with:", {
        username: username.value,
        password: password.value,
      });
      alert("Login successful!");
      localStorage.setItem("mesh_token", "myaccesstoken");

      router.go(0);
    }
  };

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
        interests: interests.value,
      };
      alert("Received account info: " + JSON.stringify(accountInfo, null, 2));
      // Add API call and logic here

      localStorage.setItem("mesh_token", "myaccesstoken");
      router.go(0);
    }
  };
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
