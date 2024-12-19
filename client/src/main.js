import "./assets/style.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { LoadingPlugin } from "vue-loading-overlay";
import { useDark } from "@vueuse/core";

const isDark = useDark();

// Detect click outside element
// https://stackoverflow.com/questions/36170425/detect-click-outside-element
const clickOutside = {
  beforeMount: (el, binding) => {
    el.clickOutsideEvent = (event) => {
      // here I check that click was outside the el and his children
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        binding.value();
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted: (el) => {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(
  LoadingPlugin,
  {
    // props
    backgroundColor: isDark.value ? "#000" : "fff",
    color: isDark.value ? "#fff" : "#000",
    loader: "dots",
    opacity: 0.5,
  },
  {
    //slots
  }
);
app.directive("click-outside", clickOutside);
app.mount("#app");
