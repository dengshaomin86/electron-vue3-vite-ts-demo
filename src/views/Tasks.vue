<template>
  <div class="wrapper">
    <h1>待办</h1>
    <div>
      <el-button type="primary" @click="handleAdd">新增</el-button>
    </div>
    <div class="list">
      <div class="list-item" v-for="item in tasks">
        <div class="list-item-title">
          <span class="tag primary" v-if="item.status === 'process'">#处理中</span>
          <span class="tag success" v-else>#已完成</span>
          <span>{{ item.title }}</span>
        </div>
        <div class="list-item-content">{{ item.content }}</div>
        <div class="list-item-opts">
          <div>
            <span class="time">{{ fmtDate(item.mtime || item.ctime) }}</span>
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
import { ref, computed, reactive, nextTick } from "vue";
import { ElMessageBox } from "element-plus";
import { useTaskStore, TaskItem } from "@/pinia/task";
import ExtForm, { FormItem } from "@/components/ExtForm.vue";
import { delay } from "@/utils";

const taskStore = useTaskStore();

const formRef = ref<InstanceType<typeof ExtForm>>();
const visible = ref<boolean>(false);
const loading = ref<boolean>(false);
const taskId = ref<string>("");
const formData = reactive({
  title: "",
  content: "",
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
        placeholder: "请输入",
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
    console.log(result);
    loading.value = true;
    await delay(1000);
    if (taskId.value) {
      taskStore.modifyTask({ ...cloneDeep(formData), id: taskId.value });
    } else {
      taskStore.addTask(cloneDeep(formData));
    }
    loading.value = false;
    visible.value = false;
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
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 16px;
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
