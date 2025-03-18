import moment from "moment";
import { defineStore } from "pinia";
import { createRandomId } from "@/utils";

export type Status = "process" | "finish";

export interface TaskParams {
  pageNum: number;
  pageSize: number;
  status: Status | "all";
  daterange: string[] | null;
}

export interface TaskItem {
  id: string;
  title: string;
  content: string;
  status: Status;
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
    gTasksProcess: (state) => state.tasks.filter((v) => v.status === "process").slice(0, 10),
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
    queryList(params: TaskParams) {
      const { pageNum, pageSize, daterange, status } = params;
      let list = this.tasks;
      if (daterange?.length) {
        const start = moment(daterange[0]).startOf("day").valueOf();
        const end = moment(daterange[1]).endOf("day").valueOf();
        list = list.filter((v) => {
          const date = moment(v.ctime).valueOf();
          return date >= start && date <= end;
        });
      }
      if (status !== "all") {
        list = list.filter((v) => v.status === status);
      }
      const idx = (pageNum - 1) * pageSize;
      return { pageNum, pageSize, total: this.tasks.length, list: list.slice(idx, idx + pageSize) };
    },
  },
});
