import { defineStore } from 'pinia';

type Theme = 'light' | 'dark';

interface State {
  theme: Theme;
  transition: string;
  transitionStyle: any;
}

export const useConfigStore = defineStore('config', {
  persist: true,
  state: (): State => {
    return {
      theme: 'dark',
      transition: '',
      transitionStyle: '',
    };
  },
  getters: {
    gTheme: (state) => state.theme,
    gTransition: (state) => state.transition,
    gTransitionStyle: (state) => state.transitionStyle,
  },
  actions: {
    setTheme() {
      document.documentElement.setAttribute('theme', this.theme);
    },
    setTransition(name: string = '', style?: any) {
      this.transitionStyle = style;
      this.transition = name;
    },
  },
});
