<template>
  <div class="crumb-container card flex-y">
    <div class="crumb-list flex-y">
      <div class="flex-r" v-for="item in list" :key="item">
        {{ item }}
        <span class="flex-x-y">/</span>
      </div>
    </div>
    <div class="button-group">
      <slot name="operate"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface PropsType {
  list: string[];
}

defineProps<PropsType>();
</script>

<style lang="scss" scoped>
.crumb-container {
  height: 72px;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 0 16px;
}

.crumb-list {
  height: 26px;
  > div {
    height: 100%;
    font-family: PingFangRegular;
    font-size: 14px;
    color: #7a8799;
    align-items: center;
    line-height: 26px;
    > span {
      width: 14px;
      height: 14px;
      margin: 0 4px;
    }
  }
  > div:last-child {
    font-family: PingFangMedium;
    font-size: 18px;
    color: #292d33;
    > span {
      display: none;
    }
  }
}
</style>
