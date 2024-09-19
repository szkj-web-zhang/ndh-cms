<template>
  <div class="input-box" v-if="column.search?.el === 'input'">
    <el-input
      v-model="_searchParam[column.search?.key ?? handleProp(column.prop!)]"
      :placeholder="column.search.placeholder"
    />
    <el-button type="primary" class="search-btn" @click="search">
      搜索
    </el-button>
  </div>
  <el-select
    class="select-box"
    v-if="column.search?.el === 'select'"
    v-model="_searchParam[column.search?.key ?? handleProp(column.prop!)]"
    :placeholder="column.search.placeholder"
    @change="search"
  >
    <el-option
      v-for="(item, index) in columnEnum"
      :key="index"
      :label="item[fieldNames.label]"
      :value="item[fieldNames.value]"
    />
  </el-select>
</template>

<script lang="ts" setup>
import { ColumnProps } from "@/components/cms-table/interface";
import { computed, inject, ref } from "vue";
import { handleProp } from "@/utils/table-handler";

interface PropsStype {
  column: ColumnProps;
  searchParam: { [key: string]: any };
  search: (params: any) => void; // 搜索方法
  reset: (params: any) => void; // 重置方法
}

const props = defineProps<PropsStype>();

// 重新设置搜索参数
const _searchParam = computed(() => props.searchParam);
// 接收enumMap
const enumMap = inject("enumMap", ref(new Map()));
// 判断 fieldNames 设置 label && value && children 的 key 值
const fieldNames = computed(() => {
  return {
    label: props.column.fieldNames?.label ?? "label",
    value: props.column.fieldNames?.value ?? "value",
    children: props.column.fieldNames?.children ?? "children"
  };
});
const columnEnum = computed(() => {
  let enumData = enumMap.value.get(props.column.prop);
  if (!enumData) return [];
  if (props.column.search?.el === "select-v2" && props.column.fieldNames) {
    enumData = enumData.map((item: { [key: string]: any }) => {
      return {
        ...item,
        label: item[fieldNames.value.label],
        value: item[fieldNames.value.value]
      };
    });
  }
  return enumData;
});
</script>

<style lang="scss" scoped>
.input-box {
  position: relative;
  .el-input {
    width: 426px;
    height: 40px;
    :deep(.el-input__wrapper) {
      border-radius: 8px;
      border: 1px solid #e1eaf5;
      box-shadow: none;
      padding: 0 94px 0 12px;
      &.is-focus {
        box-shadow: 0 0 0 1px var(--el-input-focus-border-color) inset;
      }
      &:hover {
        box-shadow: 0 0 0 1px var(--el-input-focus-border-color) inset;
      }
      input {
        font-family: PingFangRegular;
        color: #08090a;
        font-size: 14px;
        &::placeholder {
          color: #7a8799;
        }
      }
    }
  }
  .search-btn {
    width: 56px;
    height: 32px;
    font-family: PingFangMedium;
    color: #ffffff;
    position: absolute;
    top: 50%;
    right: 4px;
    transform: translateY(-50%);
    border-radius: 6px;
    padding: 0;
  }
}

.select-box {
  :deep(.el-select__wrapper) {
    width: 190px;
    height: 40px;
    font-family: PingFangRegular;
    color: #08090a;
    font-size: 14px;
    border-radius: 8px 8px 8px 8px;
    border: 1px solid #e1eaf5;
    box-shadow: none;
    padding: 0 12px;
    &.is-hovering {
      box-shadow: 0 0 0 1px var(--el-color-primary) inset;
    }
    &.is-focused {
      box-shadow: 0 0 0 1px var(--el-color-primary) inset;
    }
  }
}
</style>
