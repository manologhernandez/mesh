import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ref, computed } from "vue";

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
    localStorage.setItem("mesh_user", JSON.stringify(userData.user));
    localStorage.setItem("mesh_token", userData.session.access_token);
    user.value = userData.user;
    sessionToken.value = userData.session.access_token;
  }

  //setters
  function clearUser() {
    console.log("vue store clearing user");
    localStorage.removeItem("mesh_user");
    localStorage.removeItem("mesh_token");
  }

  return { user, userId, setUser, clearUser };
});
