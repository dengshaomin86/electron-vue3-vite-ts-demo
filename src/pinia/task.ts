import { defineStore } from "pinia";
import { createRandomId } from "@/utils";

export interface TaskItem {
  id: string;
  title: string;
  content: string;
  status: "process" | "finish";
  ctime: Date;
  mtime: Date | null;
  ftime: Date | null;
}

interface State {
  tasks: TaskItem[];
}

export const useTaskStore = defineStore("task", {
  persist: true,
  state: (): State => {
    return {
      tasks: [],
    };
  },
  getters: {
    gTasks: (state) => state.tasks,
  },
  actions: {
    addTask(data: Pick<TaskItem, "title" | "content">) {
      const id = createRandomId();
      const ctime = new Date();
      this.tasks.unshift({ ...data, id, ctime, mtime: null, ftime: null, status: "process" });
    },
    delTask(id: string) {
      this.tasks = this.tasks.filter((v) => v.id !== id);
    },
    modifyTask(data: Pick<TaskItem, "id" | "title" | "content">) {
      let item = this.tasks.find((v) => v.id === data.id);
      if (!item) return false;
      item.title = data.title;
      item.content = data.content;
      item.mtime = new Date();
      return true;
    },
    finishTask(id: string) {
      let item = this.tasks.find((v) => v.id === id);
      if (!item) return false;
      item.status = "finish";
      item.ftime = new Date();
      return true;
    },
  },
});
