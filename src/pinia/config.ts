import { defineStore } from "pinia";

type Theme = "light" | "dark";

interface State {
  theme: Theme;
}

export const useConfigStore = defineStore("config", {
  state: (): State => {
    return {
      theme: "dark",
    };
  },
  getters: {
    gTheme: (state) => state.theme,
  },
  actions: {
    setTheme() {
      document.documentElement.setAttribute("theme", this.theme);
    },
  },
});
