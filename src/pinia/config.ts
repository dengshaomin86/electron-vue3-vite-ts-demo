import { defineStore } from 'pinia';

type Theme = 'light' | 'dark';

interface Setup {
  transitionSwitch: boolean;
}

interface State {
  theme: Theme;
  transition: string;
  transitionStyle: any;
  setup: Setup;
}

export const useConfigStore = defineStore('config', {
  persist: true,
  state: (): State => {
    return {
      theme: 'dark',
      transition: '',
      transitionStyle: '',
      setup: {
        transitionSwitch: true,
      },
    };
  },
  getters: {
    gTheme: (state) => state.theme,
    gTransition: (state) => state.transition,
    gTransitionStyle: (state) => state.transitionStyle,
    gSetup: (state) => state.setup,
  },
  actions: {
    setTheme() {
      document.documentElement.setAttribute('theme', this.theme);
    },
    setTransition(name: string = '', style?: any) {
      this.transitionStyle = style;
      this.transition = name;
    },
    updateSetup(key: keyof Setup, value: any) {
      this.setup[key] = value;
    },
  },
});
