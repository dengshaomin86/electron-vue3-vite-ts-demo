import { defineStore } from "pinia";

export interface Config {
  [key: string]: string;
}

interface State {
  config: Config;
}

export const useConfigStore = defineStore("config", {
  state: (): State => {
    return {
      config: {
        background: "",
      },
    };
  },
  getters: {
    background: (state) => state.config.background,
  },
  actions: {
    updateConfig(data: any) {
      if (!data) return;
      this.config = data;
    },
  },
});
