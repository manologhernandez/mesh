import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ref, computed } from "vue";
import { store, clear } from "@/tools/localStorageUtils";

export const useUserStore = defineStore("user", () => {
  // state variables
  const user = useLocalStorage("mesh_user", {});
  const sessionToken = useLocalStorage("mesh_token", "");

  // getters
  const userId = computed(() => {
    if (user.value && user.value.email) {
      return user.value.email.split("@")[0];
    }
  });

  const token = computed(() => {
    return sessionToken.value;
  });

  //setters
  function setUser(userData) {
    console.log("vue store setting user: ", userData);
    store("mesh_user", JSON.stringify(userData.user));
    store("mesh_token", userData.session.access_token);
    user.value = userData.user;
    sessionToken.value = userData.session.access_token;
  }

  //setters
  function clearUser() {
    console.log("vue store clearing user");
    clear();
  }

  return { user, userId, setUser, clearUser };
});
