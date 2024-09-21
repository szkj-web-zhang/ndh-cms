<template>
  <div class="users-list">
    <bread-crumb :list="crumbTitles">
      <template #operate>
        <el-button plain class="batch-btn" type="primary">导出</el-button>
        <el-button plain class="batch-btn" type="primary">批量操作</el-button>
        <el-button class="batch-btn" type="primary">新增用户</el-button>
      </template>
    </bread-crumb>
    <cms-table
      ref="tableRef"
      :columns="columns"
      :request-api="getList"
      :data-callback="dataCallback"
      :row-key="'stationId'"
    >
      <template #operation="scope">
        <table-operate :data="operateParams(scope.row)" />
      </template>
    </cms-table>
  </div>
</template>

<script lang="tsx" setup>
import { Users } from '@/api/interface/user-manage';
import { get_user_list } from '@/api/modules/users-manage';
import { ColumnProps } from '@/components/cms-table/interface';
import { TableOperateProps } from '@/components/table-operate/index.vue';

import { onMounted, reactive, ref } from 'vue';

const crumbTitles = ['用户管理'];



// 状态标签样式
const statusType = {
  1:'success',
  2:'warning',
  3:'warning'
};
const statusText = {
  1:'正常',
  2:'黑名单',
  3:'已注销'
};


let tableRef = ref(null)

// 操作栏参数
const operateParams = (data: Users.ItemData): TableOperateProps[] => {
  let ops:TableOperateProps[] = [
    {
      buttonOption: { label: "编辑备注", type: "default" },
      fn: () => {}
    },
    {
      buttonOption: { label: "查看详情", type: "default" },
      fn: () => {
        
      }
    }
  ]
  if (data.blacklist == 1) { //正常
    ops.push({ buttonOption: { label: "加入黑名单", type: "default" }, fn: () => {

    }})
  }
  return ops;
};

let columns = reactive<ColumnProps<Users.ItemData>[]>([
  { prop: "id", label: "编号", width: 68, align: "center" },
  { prop: "nickName", label: "用户", width: 150, align: "left", render: scope => {
      return (
        <div className="table-render">
          <el-avatar size={25} src={scope.row.headPortrait}/>
          <span className="nick-name">{scope.row.nickName}</span>
        </div>
      );
    },
    search: {
      el: "input",
      key: "searchKey",
      label: "关键字",
      placeholder: "用户名"
    }
  },
  { prop: "phoneNumber", label: "手机号", align: "left", search: {
      el: "input",
      key: "searchKey",
      label: "关键字",
      placeholder: "手机号"
    }
  },
  { prop: "count", label: "累计订单", align: "left"},
  { prop: "parentNickName", label: "上级用户", width: 150, align: "left", render: scope => {
      return (
        <div className="table-render">
          <el-avatar size={25} src={scope.row.parentHeadPortrait}/>
          <span className="nick-name">{scope.row.parentNickName}</span>
        </div>
      );
    } 
  },
  { prop: "registerTime", label: "注册时间", align: "left"},
  { prop: "remark", label: "备注", align: "left"},
  {
    prop: "stationStatus",
    label: "账号状态",
    align: "center",
    width: 120,
    render: scope => {
      return (
        <el-tag effect={"plain"} round type={statusType[scope.row.blacklist]}>
          {statusText[scope.row.blacklist]}
        </el-tag>
      );
    },
    enum: [
      {label:'全部', value:-1},
      {label:'正常',value:1},
      {label:'黑名单',value:2},
      {label:'已注销',value:3},
    ],
    fieldNames: { label: "label", value: "value" },
    search: {
      el: "select",
      key: "state",
      label: "状态",
      defaultValue: -1
    },
  },
  {
    prop: "operation",
    fixed: "right",
    label: "操作",
    width: 180,
    align: "center"
  }
])

/**
 * 获取自提点列表的接口
 */
const getList = (params: Users.ListParams) => {
  return get_user_list(params);
};

/**
 * 数据转换
 */
const dataCallback = (data:Users.ListResponse) => {
  return data;
};

</script>

<style lang="scss" scoped>
.users-list {
  height: 100%;
}

:deep(.table-render) {
  display: flex;
  align-items: center;
  .nick-name {
    margin-left: 10px;
  }
  .text-value {
    margin-left: 10px;
  }
}

</style>
