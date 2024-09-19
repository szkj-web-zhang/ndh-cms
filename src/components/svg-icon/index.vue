<template>
  <svg :class="classNames" aria-hidden="true">
    <use :xlink:href="`#${name}`" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface PropsType {
  // 自定义类名
  class?: string;
  // icon名称
  name?: string;
  // 自定义颜色
  color?: string;
}

const props = defineProps<PropsType>();

// 计算类名
const classNames = computed(() => {
  return props.class ? `svg-icon ${props.class}` : " svg-icon";
});
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
