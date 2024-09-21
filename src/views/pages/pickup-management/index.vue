<template>
  <div class="pickup-station-list">
    <bread-crumb :list="crumbTitles"></bread-crumb>
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
import { PickUpStation } from '@/api/interface/pickup-station-manage';
import { get_pickup_station_list } from '@/api/modules/pickup-station-manage';
import { ColumnProps } from '@/components/cms-table/interface';
import { TableOperateProps } from '@/components/table-operate/index.vue';

import { onMounted, reactive, ref } from 'vue';

const crumbTitles = ['自提点管理','自提点列表'];
// 状态标签样式
const statusType = (res: number) => (res === 1 ? "success" : "info");
const statusText = (res: number) => (res === 1 ? "营业中" : "未开启");

let tableRef = ref(null)

// 操作栏参数
const operateParams = (data: PickUpStation.ItemData): TableOperateProps[] => {
  return [
    {
      buttonOption: { label: "编辑", type: "default" },
      fn: () => {}
    },
    {
      buttonOption: { label: "详情", type: "default" },
      fn: () => {
        
      }
    },
    { buttonOption: { label: "更多", type: "default" }, fn: () => {} },
  ]
};

let columns = reactive<ColumnProps<PickUpStation.ItemData>[]>([
  { prop: "stationId", label: "编号", width: 68, align: "center" },
  {
    prop: "stationLogo",
    label: "自提点照片",
    align: "left",
    width: 120,
    render: scope => {
      return (
        <el-avatar
          style={{ marginTop: "6px" }}
          shape="square"
          size={45}
          src={scope.row.stationLogo}
        />
      );
    }
  },
  { prop: "stationName", label: "自提点名称", align: "left", search: {
      el: "input",
      key: "searchKey",
      label: "关键字",
      placeholder: "搜索名称"
    }
  },
  { prop: "stationAddress", label: "自提点地址", align: "left"},
  { prop: "stationDesc", label: "自提点描述", align: "left"},
  { prop: "nickName", label: "用户", width: 150, align: "left", render: scope => {
      return (
        <div className="table-render">
          <el-avatar size={25} src={scope.row.headPortrait}/>
          <span className="nick-name">{scope.row.nickName}</span>
        </div>
      );
    } 
  },
  {
    prop: "stationStatus",
    label: "营业状态",
    align: "center",
    width: 120,
    render: scope => {
      return (
        <el-tag effect={"plain"} round type={statusType(scope.row.stationStatus)}>
          {statusText(scope.row.stationStatus)}
        </el-tag>
      );
    },
    enum: [
      {label:'全部', value:-1},
      {label:'营业中',value:1},
      {label:'未开启',value:0}
    ],
    fieldNames: { label: "label", value: "value" },
    search: {
      el: "select",
      key: "status",
      label: "营业状态",
      defaultValue: -1
    },
  },
  {
    prop: "isEnable",
    label: "自提点权限",
    align: "center",
    render: scope => {
      return (
        <div className="table-render" style={{'justify-content': 'center'}}>
          <el-switch v-model={scope.row.isEnable}/>
          <span className="text-value">{ scope.row.isEnable ? '启用' : '禁用' }</span>
        </div>
      );
    }
  },
  {
    prop: "operation",
    fixed: "right",
    label: "操作",
    width: 108,
    align: "center"
  }
])

/**
 * 获取自提点列表的接口
 */
const getList = (params: PickUpStation.ListParams) => {
  return get_pickup_station_list(params);
};

/**
 * 数据转换
 */
const dataCallback = (data: { pageUtils: PickUpStation.ListResponse }) => {
  return data.pageUtils;
};

</script>

<style lang="scss" scoped>
.pickup-station-list {
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
