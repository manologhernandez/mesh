import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ref, computed } from "vue";
import { store, clear } from "@/tools/localStorageUtils";

export const useUserStore = defineStore("user", () => {
  // state variables
  const user = null;
  const sessionToken = useLocalStorage("mesh_token", "");

  // getters
  const username = computed(() => {
    if (sessionToken.value) {
      const tokenPayload = JSON.parse(atob(sessionToken.value.split(".")[1]));
      return tokenPayload.email.split("@")[0];
    }
  });

  const college = computed(() => {
    if (sessionToken.value) {
      const tokenPayload = JSON.parse(atob(sessionToken.value.split(".")[1]));
      return tokenPayload.user_metadata.college;
    }
  });

  const token = computed(() => {
    return "Bearer " + sessionToken.value;
  });

  //setters
  function setUser(userData) {
    store("mesh_token", userData.session.token);
    sessionToken.value = userData.session.token;
  }

  //setters
  function clearUser() {
    clear();
  }

  return { user, username, college, token, setUser, clearUser };
});
