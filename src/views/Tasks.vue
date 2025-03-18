<template>
  <div class="wrapper">
    <h1>待办</h1>
    <ExtForm ref="formRef" size="small" inline :items="itemsSearch" :model="formDataSearch">
      <template #opts>
        <el-button type="primary" :loading="loading" @click="search">查询</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button @click="handleAdd">新增</el-button>
      </template>
    </ExtForm>
    <div class="list">
      <div class="list-item" v-for="item in list">
        <div class="list-item-title">
          <span class="tag primary" v-if="item.status === 'process'">#处理中</span>
          <span class="tag success" v-else>#已完成</span>
          <span>{{ item.title }}</span>
        </div>
        <div class="list-item-content">
          <pre>{{ item.content }}</pre>
        </div>
        <div class="list-item-opts">
          <div>
            <span class="time">{{ fmtDate(item.ctime) }}</span>
            <span class="time" v-if="item.ftime">&nbsp;/&nbsp;{{ fmtDate(item.ftime) }}</span>
          </div>
          <span>
            <el-button size="small" type="danger" link @click="delItem(item)">删除</el-button>
            <template v-if="item.status !== 'finish'">
              <el-button size="small" type="primary" link @click="handleModify(item)">编辑</el-button>
              <el-button size="small" type="primary" link @click="finishItem(item)">完成</el-button>
            </template>
          </span>
        </div>
      </div>
    </div>
    <el-empty v-if="!list.length"></el-empty>

    <ExtPagination v-model:pageNum="pageNum" :pageSize="pageSize" :total="total" @change="getList"></ExtPagination>

    <el-dialog v-model="visible" title="新增" :destroy-on-close="true">
      <ExtForm ref="formRef" :items="items" :model="formData">
        <template #opts>
          <el-button type="primary" :loading="loading" @click="submit">提交</el-button>
        </template>
      </ExtForm>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { cloneDeep } from "lodash-es";
import { ref, computed, reactive, onActivated } from "vue";
import { ElMessageBox } from "element-plus";
import { useTaskStore, TaskItem, Status } from "@/pinia/task";
import ExtForm, { FormItem } from "@/components/ExtForm.vue";
import ExtPagination from "@/components/ExtPagination.vue";

const taskStore = useTaskStore();

const formRef = ref<InstanceType<typeof ExtForm>>();
const visible = ref<boolean>(false);
const loading = ref<boolean>(false);
const taskId = ref<string>("");
const pageNum = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const list = ref<TaskItem[]>([]);
const formData = reactive({
  title: "",
  content: "",
});

const formDataSearch = reactive<{ daterange: string[]; status: Status | "all" }>({
  daterange: [],
  status: "all",
});

const tasks = computed(() => taskStore.gTasks);

const items = computed<FormItem[]>(() => {
  return [
    {
      prop: "title",
      label: "标题",
      component: "el-input",
      attrs: {
        placeholder: "请输入",
      },
    },
    {
      prop: "content",
      label: "内容",
      component: "el-input",
      attrs: {
        type: "textarea",
        placeholder: "请输入",
        autosize: {
          minRows: 3,
        },
      },
    },
    {
      prop: "",
      label: "",
      slot: "opts",
    },
  ];
});

const itemsSearch = computed<FormItem[]>(() => {
  return [
    {
      prop: "daterange",
      label: "创建时间",
      span: 8,
      component: "el-date-picker",
      attrs: {
        type: "daterange",
        startPlaceholder: "开始日期",
        endPlaceholder: "结束日期",
        valueFormat: "YYYY-MM-DD",
      },
    },
    {
      prop: "status",
      label: "状态",
      span: 6,
      component: "el-select-v2",
      attrs: {
        placeholder: "请选择",
        options: [
          {
            value: "process",
            label: "处理中",
          },
          {
            value: "finish",
            label: "已完成",
          },
          {
            value: "all",
            label: "全部",
          },
        ],
      },
    },
    {
      prop: "",
      label: "",
      slot: "opts",
    },
  ];
});

const fmtDate = (date: Date) => moment(date).format("yyyy-MM-DD HH:mm:ss");

const showDialog = () => {
  taskId.value = "";
  formData.title = "";
  formData.content = "";
  visible.value = true;
};

const handleAdd = () => {
  showDialog();
};

const submit = () => {
  const validate = formRef.value!.validate();
  validate(async (result) => {
    if (!result) return;
    loading.value = true;
    if (taskId.value) {
      taskStore.modifyTask({ ...cloneDeep(formData), id: taskId.value });
    } else {
      taskStore.addTask(cloneDeep(formData));
    }
    loading.value = false;
    visible.value = false;
    getList();
  });
};

const delItem = (item: TaskItem) => {
  ElMessageBox.confirm(`是否删除${item.title}?`, { title: "提示", type: "warning" })
    .then(() => {
      taskStore.delTask(item.id);
    })
    .catch(() => {});
};

const handleModify = async (item: TaskItem) => {
  showDialog();
  taskId.value = item.id;
  formData.title = item.title;
  formData.content = item.content;
};

const finishItem = (item: TaskItem) => {
  ElMessageBox.confirm(`是否标记完成${item.title}?`, { title: "提示", type: "warning" })
    .then(() => {
      taskStore.finishTask(item.id);
    })
    .catch(() => {});
};

const search = () => {
  pageNum.value = 1;
  getList();
};

const reset = () => {
  formDataSearch.daterange = [];
  formDataSearch.status = "all";
};

const getList = () => {
  const result = taskStore.queryList({ pageNum: pageNum.value, pageSize: pageSize.value, ...formDataSearch });
  list.value = result.list;
  total.value = result.total;
};

onActivated(getList);
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 16px;
  h1 {
    margin-bottom: 12px;
  }
}

.list {
  margin-top: 12px;
  &-item {
    @include app-panel;
    margin-bottom: 12px;
    border-radius: 8px;
    overflow: hidden;
    &-title {
      padding: 8px 16px;
      box-shadow: 0 0 5px 0 #000;
      font-size: 14px;
      font-weight: bold;
      .tag {
        margin-right: 8px;
        font-size: 12px;
        font-weight: normal;
        &.primary {
          color: var(--el-color-primary);
        }
        &.success {
          color: var(--el-color-success);
        }
      }
    }
    &-content {
      padding: 8px 16px;
      font-size: 14px;
      pre {
        word-break: break-all;
        white-space: pre-wrap;
      }
    }
    &-opts {
      padding: 8px 16px;
      display: flex;
      justify-content: space-between;
    }
    .time {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.6);
    }
  }
}
</style>
