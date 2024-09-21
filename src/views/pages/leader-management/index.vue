<template>
  <div class="leader-list">
    <bread-crumb :list="crumbTitles"></bread-crumb>
    <cms-table
      ref="tableRef"
      :columns="columns"
      :request-api="getList"
      :data-callback="dataCallback"
      :row-key="'accountUuid'"
    >
      <template #operation="scope">
        <table-operate :data="operateParams(scope.row)" />
      </template>
    </cms-table>
  </div>
</template>

<script lang="tsx" setup>
import { Leader } from '@/api/interface/leader-manage';
import { get_leader_list } from '@/api/modules/leader-manage';
import { ColumnProps } from '@/components/cms-table/interface';
import { TableOperateProps } from '@/components/table-operate/index.vue';

import { onMounted, reactive, ref } from 'vue';

const crumbTitles = ['团队管理','团队列表'];

let tableRef = ref(null)

// 操作栏参数
const operateParams = (data: Leader.ItemData): TableOperateProps[] => {
  return [
    {
      buttonOption: { label: "移除", type: "danger" },
      fn: () => {

      }
    },
    {
      buttonOption: { label: "详情", type: "default" },
      fn: () => {
        
      }
    },
  ]
};

let columns = reactive<ColumnProps<Leader.ItemData>[]>([
  { prop: "accountUuid", label: "编号", width: 180, align: "left" },
  { prop: "nickName", label: "团队长", align: "left", render: scope => {
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
      placeholder: "搜索团队长"
    }
  },
  { prop: "teamAccountNum", label: "团队人数", align: "left"},
  { prop: "teamOrderNum", label: "团队总下单", align: "left"},
  { prop: "teamOrderAmount", label: "团队总消费", align: "left", render : scope => {
    return <span className="dish-price">￥{scope.row.teamOrderAmount}</span>;
  }},
  { prop: "teamNickName", label: "上级渠道", align: "left", render: scope => {
      return (
        <div className="table-render">
          <el-avatar size={25} src={scope.row.teamHeadPortrait}/>
          <span className="nick-name">{scope.row.teamNickName}</span>
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
const getList = (params: Leader.ListParams) => {
  return get_leader_list(params);
};

/**
 * 数据转换
 */
const dataCallback = (data: { pageUtils: Leader.ListResponse }) => {
  return data.pageUtils;
};

</script>

<style lang="scss" scoped>
.leader-list {
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
