<template>
  <div class="dishes-detail-contianer">
    <bread-crumb :list="breadList">
      <template #operate>
        <el-button plain type="danger">删除菜品</el-button>
        <el-button type="primary">编辑菜品</el-button>
      </template>
    </bread-crumb>
    <el-scrollbar class="dishes-detail-content card">
      <p class="title">菜品信息</p>
      <el-form
        class="form-content"
        label-width="120px"
        require-asterisk-position="left"
      >
        <div>
          <el-form-item label="菜品图片">
            <div class="image-list">
              <div
                class="image-item"
                v-for="(item, index) in imageList"
                :key="index"
              >
                <el-image
                  :src="item"
                  :preview-src-list="imageList"
                  fit="cover"
                />
              </div>
            </div>
          </el-form-item>
          <el-form-item label="状态">
            <span class="dish-status" :style="{ color: dishStatus?.color }">
              {{ dishStatus?.text }}
            </span>
          </el-form-item>
          <el-form-item label="菜品名称">
            <span class="dish-name">{{ data?.goods.goodsName }}</span>
          </el-form-item>
          <el-form-item label="菜品参数" class="dish-property">
            <span v-if="data?.properties.length">{{ dishParams }}</span>
            <span v-else>暂无</span>
          </el-form-item>
          <el-form-item label="菜品描述" class="dish-descripe">
            <p v-if="data?.goods.brief">{{ data?.goods.brief }}</p>
            <p v-else>暂无</p>
          </el-form-item>
        </div>
        <div style="min-width: 710px; margin-left: 32px">
          <el-form-item label="单价">
            <span class="dish-price">￥{{ data?.goods.currentPrice }}</span>
          </el-form-item>
          <el-form-item label="单位">
            <span class="dish-unit">{{ data?.goods.goodsUnit }}</span>
          </el-form-item>
          <el-form-item label="库存" class="dish-stock">
            <span>{{ dishStock }}</span>
            /{{ data?.goods.totalStocks }}
          </el-form-item>
          <el-form-item label="菜品分类"></el-form-item>
          <el-form-item label="菜品标签"></el-form-item>
          <el-form-item label="菜品规格"></el-form-item>
        </div>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { Dish } from "@/api/interface/dish-manage";
import { dish_detail_get } from "@/api/modules/dish-manage";
import { computed, onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";

// route
const route = useRoute();
// 面包屑列表
const breadList = ["菜品管理", "菜品列表", "菜品详情"];
// 详情数据
const data = ref<Dish.DishDetailResponse>();
// 图片列表
const imageList = computed(() => data.value?.goods.imgs.split(","));
// 菜品状态
const dishStatus = computed(() => {
  switch (data.value?.goods.goodsStatus) {
    case -1:
      return { text: "删除", color: "#F55549" };
    case 0:
      return { text: "下架", color: "#525B66" };
    case 1:
      return { text: "正常", color: "#2BD66F" };
    default:
      break;
  }
});
// 菜品库存
const dishStock = computed(() => {
  if (data.value) {
    const { totalStocks, salesNum } = data.value.goods;
    return totalStocks - salesNum;
  }
});

// 菜品参数
const dishParams = computed(() =>
  data.value?.properties
    .map(item => `${item.paramName}：${item.paramValue}`)
    .join("；")
);

/**
 * 获取菜品详情
 */
onBeforeMount(async () => {
  const res = await dish_detail_get({ goodsId: Number(route.params.id) });
  if (res.code === 200) {
    data.value = res.data;
  }
});
</script>

<style lang="scss" scoped>
.el-button {
  height: 40px;
  font-family: PingFangMedium;
  border-radius: 8px;
}

.dishes-detail-contianer {
  height: 100%;
}

.dishes-detail-content {
  height: calc(100% - 88px);
  padding: 16px;
  .title {
    height: 40px;
    font-size: 16px;
    color: #08090a;
    font-family: PingFangMedium;
    line-height: 40px;
    margin-bottom: 4px;
  }
  .form-content {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    :deep(.el-form-item__label) {
      justify-content: flex-start;
    }
    .image-list {
      max-width: 524px;
      display: flex;
      flex-flow: row wrap;
      .image-item {
        width: 68px;
        height: 68px;
        border-radius: 8px;
        border: 1px solid #e1eaf5;
        overflow: hidden;
        margin-right: 8px;
        margin-bottom: 8px;
        &:last-child {
          margin-right: 0;
        }
      }
      .el-image {
        width: 100%;
        height: 100%;
      }
    }
    .dish-status {
      font-family: PingFangRegular;
      line-height: 22px;
    }
    .dish-name {
      color: #292d33;
      font-family: PingFangRegular;
      line-height: 22px;
    }
    .dish-property {
      .el-form-item__content span {
        font-family: PingFangRegular;
        color: #292d33;
      }
    }
    .dish-descripe {
      .el-form-item__content p {
        max-width: 554px;
        font-family: PingFangRegular;
        color: #292d33;
        line-height: 22px;
      }
    }
    .dish-price,
    .dish-unit {
      font-size: 16px;
      color: #292d33;
      font-family: PingFangMedium;
    }
    .dish-unit {
      font-size: 14px;
    }
    .dish-stock {
      .el-form-item__content {
        font-family: PingFangRegular;
        color: #292d33;
        span {
          color: #1a7dff;
        }
      }
    }
  }
}
</style>
