import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ref, computed } from "vue";
import { store, clear } from "@/tools/localStorageUtils";

export const useUserStore = defineStore("user", () => {
  // state variables
  const user = useLocalStorage("mesh_user", {});
  const sessionToken = useLocalStorage("mesh_token", "");

  // getters
  const username = computed(() => {
    if (user.value && user.value.username) {
      return user.value.username;
    }
  });

  const college = computed(() => {
    if (user.value && user.value.metadata) {
      return user.value.metadata.college;
    }
  });

  const token = computed(() => {
    return sessionToken.value;
  });

  //setters
  function setUser(userData) {
    console.log("vue store setting user: ", userData);
    store("mesh_user", JSON.stringify(userData.user));
    store("mesh_token", userData.session.token);
    user.value = userData.user;
    sessionToken.value = userData.session.token;
  }

  //setters
  function clearUser() {
    console.log("vue store clearing user");
    clear();
  }

  return { user, username, college, token, setUser, clearUser };
});
