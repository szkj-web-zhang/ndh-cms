<template>
  <div class="dishes-list-container">
    <bread-crumb>
      <template #operate>
        <el-button type="primary">新增菜品</el-button>
      </template>
    </bread-crumb>
    <cms-table
      ref="tableRef"
      :columns="columns"
      :request-api="getList"
      :data-callback="dataCallback"
      :row-key="'goodsId'"
    >
      <template #operation="scope">
        <table-operate :data="operateParams(scope.row)" />
        <!-- <div @click="console.log(JSON.parse(JSON.stringify(scope.row)))">
          123
        </div> -->
      </template>
    </cms-table>
    <default-dialog
      icon-name="icon-question"
      icon-color="#FFA033"
      title="此操作将删除该菜品所有信息，是否继续？"
      ref="removeRef"
      @confirm="handleRemoveDish"
    />
  </div>
</template>

<script lang="tsx" setup>
import { Dish } from "@/api/interface/dish-manage";
import {
  dish_list_status_get,
  dishes_list_get,
  dishes_remove_post
} from "@/api/modules/dish-manage";
import CmsTable from "@/components/cms-table/index.vue";
import { ColumnProps, TableInstance } from "@/components/cms-table/interface";
import { computed, onBeforeMount, reactive, ref, watch } from "vue";
import TableOperate, {
  TableOperateProps
} from "@/components/table-operate/index.vue";
import DefaultDialog from "@/components/default-dialog/index.vue";
import { ElMessage } from "element-plus";

// Table 实例
const tableRef = ref<TableInstance>();
// 状态筛选列表
const statusList = ref<Record<number, string>[]>([]);
// 多选状态
const selectStatus = ref(false);
// 下架弹框ref
const removeRef = ref<InstanceType<typeof DefaultDialog>>();
// 获取转换后的状态筛选列表
const transferStatus = computed(() => {
  const arr: { label: string; value: number }[] = [];
  statusList.value.map(item => {
    const res = {
      label: item[Object.keys(item)[0]],
      value: Number(Object.keys(item)[0])
    };
    arr.push(res);
  });
  arr.unshift({ label: "全部", value: 0 });
  return arr;
});
// 状态标签文本
const statusText = (res: number) => (res === 1 ? "正常" : "售罄");
// 状态标签样式
const statusType = (res: number) => (res === 1 ? "success" : "warning");
// 列表配置
const columns = reactive<ColumnProps<Dish.ItemData>[]>([
  {
    type: "selection",
    fixed: "left",
    width: 38,
    isShow: selectStatus,
    align: "center"
  },
  { prop: "goodsId", label: "编号", width: 68, align: "center" },
  {
    prop: "picture",
    label: "菜品图片",
    align: "left",
    width: 120,
    render: scope => {
      return (
        <el-avatar
          style={{ marginTop: "6px" }}
          shape="square"
          size={45}
          src={scope.row.picture}
        />
      );
    }
  },
  {
    prop: "goodsName",
    label: "菜品名称",
    width: 228,
    align: "left",
    search: {
      el: "input",
      key: "searchKey",
      label: "关键字",
      placeholder: "搜索菜品"
    }
  },
  {
    prop: "currentPrice",
    label: "菜品单价",
    align: "left",
    render: scope => {
      return <span className="dish-price">￥{scope.row.currentPrice}</span>;
    }
  },
  {
    prop: "salesNum",
    label: "累计销量",
    align: "left"
  },
  {
    prop: "reminderStocks",
    label: "库存",
    align: "left"
  },
  {
    prop: "goodsTag",
    label: "菜品标签",
    align: "left",
    width: 200
  },
  {
    prop: "createTime",
    label: "创建时间",
    align: "left",
    width: 200,
    render: scope => {
      return <span>{scope.row.createTime.replace("T", " ")}</span>;
    }
  },
  {
    prop: "updateTime",
    label: "更新时间",
    align: "left",
    width: 200,
    render: scope => {
      return <span>{scope.row.updateTime.replace("T", " ")}</span>;
    }
  },
  {
    prop: "goodsStatus",
    label: "状态",
    align: "center",
    width: 120,
    enum: transferStatus,
    fieldNames: { label: "label", value: "value" },
    search: {
      el: "select",
      key: "status",
      label: "状态",
      defaultValue: transferStatus.value[0].value
    },
    render: scope => {
      return (
        <el-tag effect={"plain"} round type={statusType(scope.row.goodsStatus)}>
          {statusText(scope.row.goodsStatus)}
        </el-tag>
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
]);
// 操作栏参数
const operateParams = (data: Dish.ItemData): TableOperateProps[] => {
  return [
    {
      buttonOption: { label: "下架", type: "danger" },
      fn: () => removeRef.value?.open(data.goodsId)
    },
    { buttonOption: { label: "菜品详情", type: "default" }, fn: () => {} },
    { buttonOption: { label: "编辑菜品", type: "default" }, fn: () => {} },
    { buttonOption: { label: "删除菜品", type: "danger" }, fn: () => {} }
  ];
};

/**
 * 获取状态筛选列表
 */
onBeforeMount(async () => {
  const res = await dish_list_status_get();
  if (res.code === 200) statusList.value = res.data.data;
});

/**
 * 获取用户列表的接口
 */
const getList = (params: Dish.ListParams) => {
  return dishes_list_get(params);
};

/**
 * 数据转换
 */
const dataCallback = (data: { pageUtils: Dish.ListResponse }) => {
  return data.pageUtils;
};

/**
 * 下架菜品
 */
const handleRemoveDish = async id => {
  const { code } = await dishes_remove_post({
    goodsIds: String(id)
  });
  if (code === 200) {
    ElMessage.success("下架成功");
    removeRef.value?.close();
    tableRef.value?.getTableList();
  }
};
</script>

<style lang="scss" scoped>
.dishes-list-container {
  height: 100%;
}

.dish-img {
  width: 45px;
  height: 45px;
  border-radius: 6px;
}

:deep(.dish-price) {
  font-family: alibabaPuhuiMedium;
  color: #292d33;
}

:deep(.el-tag) {
  width: 56px;
  font-family: PingFangMedium;
}
</style>
