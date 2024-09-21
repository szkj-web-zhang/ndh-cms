<template>
  <div class="channel-list">
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
import { Channel } from '@/api/interface/channel-manage';
import { get_channel_list } from '@/api/modules/channel-manage';
import { ColumnProps } from '@/components/cms-table/interface';
import { TableOperateProps } from '@/components/table-operate/index.vue';

import { onMounted, reactive, ref } from 'vue';

const crumbTitles = ['渠道管理','渠道列表'];

let tableRef = ref(null)

// 操作栏参数
const operateParams = (data: Channel.ItemData): TableOperateProps[] => {
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

let columns = reactive<ColumnProps<Channel.ItemData>[]>([
  { prop: "accountUuid", label: "编号", width: 180, align: "left" },
  { prop: "nickName", label: "渠道负责人", align: "left", render: scope => {
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
  { prop: "teamLeaderSumAmount", label: "渠道总消费", align: "left", render : scope => {
    return <span className="dish-price">￥{scope.row.teamLeaderSumAmount}</span>;
  }},
  { prop: "teamLeaderCount", label: "团队数量", align: "left"},
  { prop: "operateAccountCount", label: "渠道总人数", align: "left"},
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
const getList = (params: Channel.ListParams) => {
  return get_channel_list(params);
};

/**
 * 数据转换
 */
const dataCallback = (data: { pageUtils: Channel.ListResponse }) => {
  return data.pageUtils;
};

</script>

<style lang="scss" scoped>
.channel-list {
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
