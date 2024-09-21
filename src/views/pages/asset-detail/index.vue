<template>
  <div class="users-list">
    <bread-crumb :list="crumbTitles">
      <template #operate>
        <el-button plain class="batch-btn" type="primary">导出</el-button>
        <el-button plain class="batch-btn" type="primary">批量操作</el-button>
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
import { AssetsDetail } from '@/api/interface/assets-detail.ts';
import { get_assets_detail_list } from '@/api/modules/assets-detail';
import { ColumnProps } from '@/components/cms-table/interface';
import { TableOperateProps } from '@/components/table-operate/index.vue';

import { onMounted, reactive, ref } from 'vue';

const crumbTitles = ['财务管理','资产明细'];

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
const operateParams = (data: AssetsDetail.ItemData): TableOperateProps[] => {
  let ops:TableOperateProps[] = [
    {
      buttonOption: { label: "详情", type: "default" },
      fn: () => {
        
      }
    }
  ]
  return ops;
};

let columns = reactive<ColumnProps<AssetsDetail.ItemData>[]>([
  { prop: "recordId", label: "编号", width: 68, align: "center" },
  { prop: "orderPayNo", label: "流水号"},
  { prop: "transNo", label: "关联订单"},
  { prop: "nickName", label: "用户", width: 150, align: "left", render: scope => {
      return (
        <div className="table-render">
          <el-avatar size={25} src={scope.row.headPortrait}/>
          <span className="nick-name">{scope.row.nickName}</span>
        </div>
      );
    },
  },
  { prop: "recordType", label: "交易类型", align: "left"},
  { prop: "changeAmount", label: "交易金额", align: "left",render: scope => {
      return <span className="dish-price">￥{scope.row.changeAmount}</span>;
    }},
  { prop: "payType", label: "支付方式", align: "left"},
  { prop: "createTime", label: "下单时间", align: "left"},
  { prop: "createTrTime", label: "交易时间", align: "left"},
  { prop: "operateNickName", label: "操作人", align: "center"},
  { prop: "status", label: "支付状态", align: "center", 
    enum: [
      {label:'全部', value:-1},
      {label:'失败',value:0},
      {label:'成功',value:1},
    ],
    fieldNames: { label: "label", value: "value" },
    search: {
      el: "select",
      key: "state",
      label: "状态",
      defaultValue: -1
    }
  },
  {
    prop: "operation",
    fixed: "right",
    label: "操作",
    width: 80,
    align: "center"
  }
])

/**
 * 列表的接口
 */
const getList = (params: AssetsDetail.ListParams) => {
  return get_assets_detail_list(params);
};

/**
 * 数据转换
 */
const dataCallback = (data:AssetsDetail.ListResponse) => {
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

:deep(.dish-price) {
  font-family: alibabaPuhuiMedium;
  color: #292d33;
}

</style>
