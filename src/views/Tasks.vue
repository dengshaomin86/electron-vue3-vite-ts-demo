<template>
  <div class="wrapper tasks">
    <div class="title">
      <h1>待办</h1>
      <div class="header-icon">
        <el-icon :class="{ active: showFilter }" @click="showFilter = !showFilter"><Filter /></el-icon>
        <el-icon @click="handleAdd"><DocumentAdd /></el-icon>
      </div>
    </div>
    <header>
      <Transition name="slidedown">
        <ExtForm v-show="showFilter" ref="formRef" size="small" inline :items="itemsSearch" :model="formDataSearch" :label-width="60">
          <template #opts>
            <el-button type="primary" :loading="loading" @click="search">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </template>
        </ExtForm>
      </Transition>
    </header>
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

    <el-dialog v-model="visible" :title="taskId ? '编辑' : '新增'" :destroy-on-close="true" :close-on-click-modal="false">
      <ExtForm ref="formRef" class="form-task" :items="items" :model="formData" :label-width="60">
        <template #opts>
          <el-button type="primary" :loading="loading" @click="submit">提交</el-button>
        </template>
      </ExtForm>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { cloneDeep } from 'lodash-es';
import { ref, computed, reactive, onActivated, h } from 'vue';
import { ElMessageBox } from 'element-plus';
import { Filter, DocumentAdd } from '@element-plus/icons-vue';
import { useTaskStore, TaskItem, Status } from '@/pinia/task';
import ExtForm, { FormItem } from '@/components/ExtForm.vue';
import ExtPagination from '@/components/ExtPagination.vue';

const taskStore = useTaskStore();

const formRef = ref<InstanceType<typeof ExtForm>>();
const showFilter = ref<boolean>(false);
const visible = ref<boolean>(false);
const loading = ref<boolean>(false);
const taskId = ref<string>('');
const pageNum = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const list = ref<TaskItem[]>([]);
const formData = reactive({
  title: '',
  content: '',
});

const formDataSearch = reactive<{
  keyword: string;
  daterange: string[];
  daterangeFinish: string[];
  status: Status | 'all';
}>({
  keyword: '',
  daterange: [],
  daterangeFinish: [],
  status: 'all',
});

const items = computed<FormItem[]>(() => {
  return [
    {
      prop: 'title',
      label: '标题',
      component: 'el-input',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      attrs: {
        placeholder: '请输入',
      },
    },
    {
      prop: 'content',
      label: '内容',
      component: 'el-input',
      attrs: {
        type: 'textarea',
        placeholder: '请输入',
        autosize: {
          minRows: 3,
        },
      },
    },
    {
      prop: '',
      label: '',
      slot: 'opts',
    },
  ];
});

const itemsSearch = computed<FormItem[]>(() => {
  return [
    {
      prop: 'keyword',
      label: '关键字',
      span: 8,
      component: 'el-input',
      attrs: {
        placeholder: '请输入',
        clearable: true,
      },
    },
    {
      prop: 'daterange',
      label: '创建时间',
      span: 8,
      component: 'el-date-picker',
      attrs: {
        type: 'daterange',
        startPlaceholder: '开始',
        endPlaceholder: '结束',
        valueFormat: 'YYYY-MM-DD',
      },
    },
    {
      prop: 'daterangeFinish',
      label: '完成时间',
      span: 8,
      component: 'el-date-picker',
      attrs: {
        type: 'daterange',
        startPlaceholder: '开始',
        endPlaceholder: '结束',
        valueFormat: 'YYYY-MM-DD',
      },
    },
    {
      prop: 'status',
      label: '状态',
      span: 8,
      component: 'el-select-v2',
      attrs: {
        placeholder: '请选择',
        options: [
          {
            value: 'process',
            label: '处理中',
          },
          {
            value: 'finish',
            label: '已完成',
          },
          {
            value: 'all',
            label: '全部',
          },
        ],
      },
    },
    {
      prop: '',
      label: '',
      slot: 'opts',
    },
  ];
});

const fmtDate = (date: Date) => moment(date).format('yyyy-MM-DD HH:mm:ss');

const showDialog = () => {
  taskId.value = '';
  formData.title = '';
  formData.content = '';
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
  ElMessageBox.confirm(h('div', [h('span', '是否删除'), h('strong', { style: { color: 'red', margin: '0 4px' } }, item.title), h('span', '?')]), {
    title: '提示',
    type: 'error',
    showCancelButton: false,
  })
    .then(() => {
      taskStore.delTask(item.id);
      getList();
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
  ElMessageBox.confirm(h('div', [h('strong', { style: { color: 'red', marginRight: '4px' } }, item.title), h('span', '已完成?')]), {
    title: '提示',
    type: 'success',
    showCancelButton: false,
  })
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
  formDataSearch.keyword = '';
  formDataSearch.daterange = [];
  formDataSearch.daterangeFinish = [];
  formDataSearch.status = 'all';
};

const scrolltop = () => {
  document.querySelector('.tasks')?.scrollTo({ top: 0 });
};

const getList = () => {
  const result = taskStore.queryList({ pageNum: pageNum.value, pageSize: pageSize.value, ...formDataSearch });
  list.value = result.list;
  total.value = result.total;
  scrolltop();
};

onActivated(getList);
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 16px;
  height: 100%;
  overflow: auto;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
      margin-bottom: 12px;
    }
    .header-icon {
      .el-icon {
        transition: 0.15s;
        font-size: 2vw;
        margin-left: 1vw;
        &:hover {
          cursor: pointer;
          color: var(--el-color-primary);
        }
        &.active {
          color: var(--el-color-primary);
        }
      }
    }
  }

  header {
    overflow: hidden;
  }
  .el-empty {
    margin: 10vw auto;
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

.form-task {
  margin: 0 40px;
}

:deep(.el-form-item) {
  margin-bottom: 16px;
}
</style>
