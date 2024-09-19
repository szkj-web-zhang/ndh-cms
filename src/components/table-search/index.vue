<template>
  <div
    v-if="columns.length"
    class="table-search-container"
    :class="{ collapsed }"
    ref="container"
  >
    <el-form :model="searchParam" class="searchForm">
      <div class="search-list">
        <el-form-item
          class="search-item flex-y"
          v-for="item in columns"
          :key="item.prop"
        >
          <template #label>
            <span>{{ `${item.search?.label ?? item.label}` }}</span>
            <span>&nbsp;:</span>
          </template>
          <search-item
            :column="item"
            :search-param="searchParam"
            :search="search"
            :reset="reset"
          />
        </el-form-item>
      </div>
    </el-form>
    <div class="button-group flex-r">
      <div
        class="collapse-btn flex-y"
        v-if="showCollapse"
        @click="collapsed = !collapsed"
      >
        {{ !collapsed ? "展开" : "收起" }}
        <div class="dropdown-icon flex-y" :class="{ transform: collapsed }">
          <svg-icon name="icon-arrow-down-s" fill="#1A7DFF"></svg-icon>
        </div>
      </div>
      <div class="refresh-btn flex-y" @click="reset">
        <svg-icon name="icon-refresh" fill="#1A7DFF"></svg-icon>
        刷新
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import SearchItem from "@/components/table-search/component/search-item.vue";
import { ColumnProps } from "../cms-table/interface";

interface PropsType {
  // 搜索配置列
  columns?: ColumnProps[];
  // 搜索参数
  searchParam?: { [key: string]: any };
  search: (params: any) => void; // 搜索方法
  reset: (params: any) => void; // 重置方法
}

const props = withDefaults(defineProps<PropsType>(), {
  columns: () => [],
  searchParam: () => ({})
});

// grid ref
const container = ref<HTMLDivElement>();
// 是否默认折叠搜索项
const collapsed = ref(false);
// 判断是否显示 展开/合并
const showCollapse = computed(() => {
  if (container.value) {
    return container.value.scrollHeight - 16 > container.value.clientHeight;
  }
});
</script>

<style lang="scss" scoped>
.table-search-container {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  margin-bottom: 16px;
}

.collapsed {
  height: auto;
  margin-bottom: 0;
}

.searchForm {
  width: 85%;
}

.button-group {
  height: 100%;
  font-family: PingFangRegular;
  font-size: 14px;
  color: #1a7dff;
  align-items: center;
  svg {
    width: 20px;
    height: 20px;
    margin-right: 4px;
  }
  .refresh-btn,
  .collapse-btn {
    height: 22px;
    line-height: 22px;
    cursor: pointer;
    user-select: none;
  }
  .collapse-btn {
    margin-right: 10px;
  }
  .dropdown-icon {
    transition: all 0.3s ease;
    svg {
      margin-right: 0;
    }
  }
  .transform {
    transform: rotate(180deg);
  }
}

.search-list {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
}

.search-item {
  height: 40px;
  font-family: PingFangRegular;
  font-size: 14px;
  color: #292d33;
  transition: all 0.3s ease;
  box-sizing: border-box;
  margin-bottom: 16px;
  margin-right: 16px;
}
</style>
