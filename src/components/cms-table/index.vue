<template>
  <div class="card table-main">
    <!-- 搜索主体 -->
    <table-search
      :columns="searchColumns"
      :search-param="searchParam"
      :search="_search"
      :reset="_reset"
    />
    <!-- 表格主体 -->
    <el-table
      ref="tableRef"
      header-row-class-name="table-header"
      row-class-name="table-row"
      v-bind="$attrs"
      :id="uuid"
      :data="tableData"
      :border="border"
      :row-key="rowKey"
      @selection-change="selectionChange"
    >
      <!-- 默认插槽 -->
      <slot />
      <template v-for="item in tableColumns" :key="item">
        <!-- selection || radio || index || expand || sort -->
        <el-table-column
          v-if="item.type && columnTypes.includes(item.type) && item.isShow"
          v-bind="item"
          :align="item.align ?? 'center'"
          :reserve-selection="item.type == 'selection'"
        >
          <template #default="scope">
            <template v-if="item.type == 'expand'">
              <component :is="item.render" v-bind="scope" v-if="item.render" />
              <slot v-else :name="item.type" v-bind="scope" />
            </template>
            <el-radio
              v-if="item.type == 'radio'"
              v-model="radio"
              :label="scope.row[rowKey]"
            >
              <i></i>
            </el-radio>
            <el-tag v-if="item.type == 'sort'" class="move">
              <el-icon> <DCaret /></el-icon>
            </el-tag>
          </template>
        </el-table-column>
        <table-column v-else :column="item">
          <template v-for="slot in Object.keys($slots)" #[slot]="scope">
            <slot :name="slot" v-bind="scope" />
          </template>
        </table-column>
      </template>
      <!-- 插入表格最后一行之后的插槽 -->
      <template #append>
        <slot name="append" />
      </template>
      <!-- 无数据 -->
      <template #empty>
        <div class="table-empty">
          <slot name="empty">
            <img src="@/assets/images/notData.png" alt="notData" />
            <div>暂无数据</div>
          </slot>
        </div>
      </template>
    </el-table>
    <!-- 分页组件 -->
    <slot name="pagination">
      <table-pagination
        v-if="pagination"
        :pageable="pageable"
        :handle-size-change="handleSizeChange"
        :handle-current-change="handleCurrentChange"
      />
    </slot>
  </div>
  <!-- 列设置 -->
</template>

<script setup lang="ts" name="cmsTable">
import { ref, watch, provide, onMounted, unref, computed, reactive } from "vue";
import { ElTable } from "element-plus";
import { ColumnProps, TypeProps } from "@/components/cms-table/interface";
import tablePagination from "./components/table-pagination.vue";
import TableColumn from "./components/table-column.vue";
import { useSelection } from "@/hooks/useSelection";
import { generateUUID, handleProp } from "@/utils/table-handler";
import { useTable } from "@/hooks/useTable";
import TableSearch from "@/components/table-search/index.vue";

export interface TableProps {
  columns: ColumnProps[]; // 列配置项
  requestApi?: (params: any) => Promise<any>; // 请求表格数据的api
  requestAuto?: boolean; // 是否自动执行请求api
  requestError?: (params: any) => void; // 表格api请求错误监听
  dataCallback?: (data: any) => any; // 返回数据的回调函数，可以对数据进行处理
  title?: string; // 表格标题
  pagination?: boolean; // 是否需要分页组件
  initParam?: any; // 初始化请求参数
  border?: boolean; // 是否带有纵向边框
  rowKey?: string; // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的id
}

const props = withDefaults(defineProps<TableProps>(), {
  columns: () => [],
  requestAuto: true,
  pagination: true,
  initParam: {},
  border: false,
  rowKey: "id"
});

const emit = defineEmits<{
  search: [];
  reset: [];
}>();

// table 实例
const tableRef = ref<InstanceType<typeof ElTable>>();
// 生成组件唯一id
const uuid = ref("id-" + generateUUID());
// 单选值
const radio = ref("");
// 接收 columns 并设置为响应式
const tableColumns = reactive<ColumnProps[]>(props.columns);
// 避免异步请求无法格式化单元格内容 || 无法填充搜索下拉选择
const enumMap = ref(new Map<string, { [key: string]: any }[]>());
// column 列类型
const columnTypes: TypeProps[] = [
  "selection",
  "radio",
  "index",
  "expand",
  "sort"
];
// 表格多选 Hooks
const { selectionChange, selectedList, selectedListIds, isSelected } =
  useSelection(props.rowKey);
// 表格操作 Hooks
const {
  tableData,
  pageable,
  searchParam,
  searchInitParam,
  getTableList,
  search,
  reset,
  handleSizeChange,
  handleCurrentChange
} = useTable(
  props.requestApi,
  props.initParam,
  props.pagination,
  props.dataCallback,
  props.requestError
);

/**
 * 初始化表格数据
 */
onMounted(() => {
  props.requestAuto && getTableList();
});

/**
 * 监听页面initParam改化，重新获取表格数据
 */
watch(() => props.initParam, getTableList, { deep: true });

/**
 * 定义enumMap存储enum值
 */
const setEnumMap = async ({ prop, enum: enumValue }: ColumnProps) => {
  if (!enumValue) return;
  // 如果当前 enumMap 存在相同的值 return
  if (
    enumMap.value.has(prop!) &&
    (typeof enumValue === "function" || enumMap.value.get(prop!) === enumValue)
  )
    return;
  // 当前 enum 为静态数据，则直接存储到 enumMap
  if (typeof enumValue !== "function")
    return enumMap.value.set(prop!, unref(enumValue!));
  // 为了防止接口执行慢，而存储慢，导致重复请求，所以预先存储为[]，接口返回后再二次存储
  enumMap.value.set(prop!, []);
  // 当前 enum 为后台数据需要请求数据，则调用该请求接口，并存储到 enumMap
  const { data } = await enumValue();
  enumMap.value.set(prop!, data);
};

/**
 * 扁平化columns的方法
 */
const flatColumnsFunc = (
  columns: ColumnProps[],
  flatArr: ColumnProps[] = []
) => {
  columns.forEach(async col => {
    if (col._children?.length) flatArr.push(...flatColumnsFunc(col._children));
    flatArr.push(col);
    // column 添加默认 isShow && isSetting && isFilterEnum 属性值
    col.isShow = col.isShow ?? true;
    col.isSetting = col.isSetting ?? true;
    col.isFilterEnum = col.isFilterEnum ?? true;
    // 设置 enumMap
    await setEnumMap(col);
  });
  return flatArr.filter(item => !item._children?.length);
};

// 扁平化columns
const flatColumns = computed(() => flatColumnsFunc(tableColumns));
// 过滤需要搜索的配置项 && 排序
const searchColumns = computed(() => {
  return flatColumns.value
    ?.filter(item => item.search?.el || item.search?.render)
    .sort((a, b) => a.search!.order! - b.search!.order!);
});
/**
 * 设置 搜索表单默认排序 && 搜索表单项的默认值
 */
searchColumns.value?.forEach((column, index) => {
  column.search!.order = column.search?.order ?? index + 2;
  const key = column.search?.key ?? handleProp(column.prop!);
  const defaultValue = column.search?.defaultValue;
  if (defaultValue !== undefined && defaultValue !== null) {
    searchParam.value[key] = defaultValue;
    searchInitParam.value[key] = defaultValue;
  }
});

/**
 * 清空选中数据列表
 */
const clearSelection = () => tableRef.value!.clearSelection();

const _search = () => {
  search();
  emit("search");
};

const _reset = () => {
  reset();
  emit("reset");
};

// 注入 enumMap
provide("enumMap", enumMap);

defineExpose({
  element: tableRef,
  tableData,
  radio,
  pageable,
  searchParam,
  searchInitParam,
  isSelected,
  selectedList,
  selectedListIds,
  //
  getTableList,
  search,
  reset,
  handleSizeChange,
  handleCurrentChange,
  clearSelection,
  enumMap
});
</script>

<style lang="scss" scoped>
.table-main {
  width: 100%;
  height: calc(100% - 88px);
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px;
  :deep(.el-table) {
    flex: 1;
    .el-table__inner-wrapper {
      &::before {
        background-color: transparent;
      }
    }
    .table-header {
      background-color: #f0f4fa !important;
    }
    .el-table__header-wrapper {
      height: 48px;
      font-family: PingFangMedium;
      color: #525b66;
      font-size: 14px;
      border-radius: 8px;
      .el-table__header {
        height: 100%;
      }
      .el-table__cell {
        background-color: #f0f4fa;
        padding: 0;
        .cell {
          line-height: 48px;
          padding: 0;
        }
      }
    }
    .table-row {
      height: 64px;
      font-family: PingFangRegular;
      color: #292d33;
      font-size: 14px;
      .el-table__cell {
        padding: 0;
        .cell {
          padding: 0;
        }
      }
    }
  }
}

:deep(.el-table__empty-block) {
  margin-top: 24px;
  .table-empty {
    line-height: 30px;
    img {
      display: inline-flex;
    }
  }
}

:deep(.el-pagination) {
  justify-content: flex-end;
  margin-top: 16px;
  .el-pagination__total {
    font-family: PingFangregular;
    font-size: 12px;
    color: #525b66;
  }
  .el-select__selected-item span {
    font-family: PingFangMedium;
    color: #08090a;
  }
  .el-pager li {
    border-radius: 4px;
  }
  .el-pagination__goto,
  .el-pagination__classifier {
    font-family: PingFangRegular;
    color: #525b66;
  }
  .el-input input {
    font-family: PingFangMedium;
    color: #08090a;
  }
}
</style>
