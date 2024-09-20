<template>
  <div class="dishes-add-container">
    <bread-crumb :list="breadList">
      <template #operate>
        <el-button type="primary" plain @click="handleBackToList">
          取消
        </el-button>
        <el-button type="primary">确认新增</el-button>
      </template>
    </bread-crumb>
    <el-scrollbar class="card">
      <div class="form-title">基本信息</div>
      <el-form
        ref="formRef"
        label-width="132px"
        require-asterisk-position="right"
        :show-message="false"
        :model="formData"
        :rules="rules"
      >
        <el-form-item label="菜品分类" prop="categoryId">
          <el-tree-select
            placeholder="请选择菜品分类"
            v-model="formData.categoryId"
            :data="categoryList"
            value-key="value"
            lazy
            :load="loadCategory"
            check-strictly
            :props="props"
            :render-after-expand="false"
          />
        </el-form-item>
        <el-form-item label="菜品名称" prop="goodsName">
          <el-input
            type="text"
            maxlength="20"
            :show-word-limit="true"
            v-model="formData.goodsName"
            placeholder="请输入菜品名称"
          />
        </el-form-item>
        <el-form-item label="菜品图片" prop="imgs" class="img-upload">
          <el-upload
            v-model:file-list="imgList"
            action="#"
            list-type="picture-card"
            :multiple="true"
            :limit="9"
            :accept="['image/jpeg', 'image/png'].join(',')"
            :http-request="handleHttpUpload"
            :before-upload="handleBeforeUpload"
          >
            <svg-icon name="icon-add" fill="#7A8799"></svg-icon>
          </el-upload>
          <p>
            可拖拽图片改变顺序，默认第一张为商品主图，支持格式:
            JPG、PNG，图片大小不超过5M，不超过9张图
          </p>
        </el-form-item>
        <el-form-item label="菜品标签">
          <el-input
            type="text"
            v-model="formData.tags"
            placeholder="请输入菜品标签(以；区分间隔开，最多不超过5个)"
          />
        </el-form-item>
        <el-form-item label="菜品描述">
          <el-input
            type="textarea"
            maxlength="200"
            :show-word-limit="true"
            v-model="formData.brief"
            placeholder="请输入菜品描述"
          />
        </el-form-item>
        <el-form-item label="单价" prop="price">
          <el-input
            input-style="padding-left: 15px"
            v-model="formData.price"
            placeholder="请输入菜品单价"
            @input="handleInputNumber"
          />
          <span class="money-unit">￥</span>
        </el-form-item>
        <el-form-item label="单位" prop="goodsUnit">
          <el-input
            type="text"
            maxlength="5"
            :show-word-limit="true"
            v-model="formData.goodsUnit"
            placeholder="请输入单位名称"
          />
        </el-form-item>
        <el-form-item label="规格" class="specs-type">
          <el-radio-group v-model="specsType">
            <el-radio :value="1">单规格</el-radio>
            <el-radio :value="2">多规格（ 需单独配置价格及库存）</el-radio>
          </el-radio-group>
          <div class="single-specs" v-if="specsType === 1">
            <div
              class="single-list"
              v-for="item in formData.specs"
              :key="item.id"
            >
              <el-input v-model="item.skuName" placeholder="请输入规格名字" />
              <el-input
                type="number"
                v-model="item.price"
                placeholder="请输入单价"
              />
              <el-input
                type="number"
                v-model="item.stocks"
                placeholder="请输入库存数量"
              />
            </div>
          </div>
          <div class="multi-specs" v-if="specsType === 2">
            <div
              class="multi-list"
              v-for="(item, index) in formData.specs"
              :key="item.id"
            >
              <el-input v-model="item.skuName" placeholder="请输入规格名字" />
              <el-input
                type="number"
                v-model="item.price"
                placeholder="请输入单价"
              />
              <el-input
                type="number"
                v-model="item.stocks"
                placeholder="请输入库存数量"
              />
              <div class="operat-group flex-y">
                <div
                  class="delete-btn flex-x-y"
                  :class="{ disabled: formData.specs.length === 1 }"
                  @click="handleDeleteSpec(index)"
                >
                  <svg-icon
                    name="icon-minus"
                    :fill="formData.specs.length === 1 ? '#BCC5CC' : '#1A7DFF'"
                  />
                </div>
                <div class="delete-btn flex-x-y" @click="handleAddSpec">
                  <svg-icon name="icon-add" fill="#1A7DFF" />
                </div>
              </div>
            </div>
          </div>
          <div class="specs-tips flex-y">
            右侧点击
            <div><svg-icon name="icon-minus" fill="#1A7DFF" /></div>
            <div><svg-icon name="icon-add" fill="#1A7DFF" /></div>
            按钮可增删参数，并且可长按
            <div><svg-icon name="icon-draggable" fill="#1A7DFF" /></div>
            调整参数展示顺序
          </div>
        </el-form-item>
        <el-form-item label="菜品参数" class="dish-params">
          <div
            class="property-list"
            v-for="(item, index) in formData.properties"
            :key="item.id"
          >
            <el-input v-model="item.paramName" placeholder="请输入参数名字" />
            <el-input
              type="number"
              v-model="item.paramValue"
              placeholder="请输入参数值"
            />
            <div class="operat-group flex-y">
              <div
                class="delete-btn flex-x-y"
                :class="{ disabled: formData.properties.length === 1 }"
                @click="handleDeleteSpec(index)"
              >
                <svg-icon
                  name="icon-minus"
                  :fill="
                    formData.properties.length === 1 ? '#BCC5CC' : '#1A7DFF'
                  "
                />
              </div>
              <div class="delete-btn flex-x-y" @click="handleAddSpec">
                <svg-icon name="icon-add" fill="#1A7DFF" />
              </div>
            </div>
          </div>
          <div class="specs-tips flex-y">
            右侧点击
            <div><svg-icon name="icon-minus" fill="#1A7DFF" /></div>
            <div><svg-icon name="icon-add" fill="#1A7DFF" /></div>
            按钮可增删参数，并且可长按
            <div><svg-icon name="icon-draggable" fill="#1A7DFF" /></div>
            调整参数展示顺序
          </div>
        </el-form-item>
        <!-- console -->
        <div @click="console.log(formData)"></div>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import {
  dish_category_first_get,
  dish_category_second_get
} from "@/api/modules/dish-manage";
import { upload_images } from "@/api/modules/upload";
import { useTabsStore } from "@/stores/modules/tabs";
import { generateUUID } from "@/utils/table-handler";
import {
  ElMessage,
  FormInstance,
  UploadProps,
  UploadRequestOptions,
  UploadUserFile
} from "element-plus";
import { onBeforeMount, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

interface FormDataType {
  categoryId?: number;
  goodsName: string;
  imgs: string;
  tags?: string;
  brief?: string;
  price: string;
  goodsUnit: string;
  specs: {
    id: number | string;
    skuName: string;
    price: string;
    stocks?: number;
  }[];
  properties: {
    id: string | number;
    paramName: string;
    paramValue: string;
  }[];
}

// router
const route = useRoute();
const router = useRouter();
// pinia
const tabsStore = useTabsStore();
// ref
const formRef = ref<FormInstance>();
// 图片列表
const imgList = ref<UploadUserFile[]>([]);
// 表单信息
const formData = ref<FormDataType>({
  goodsName: "",
  imgs: "",
  price: "",
  goodsUnit: "",
  specs: [
    {
      id: generateUUID(),
      skuName: "",
      price: ""
    }
  ],
  properties: [
    {
      id: generateUUID(),
      paramName: "",
      paramValue: ""
    }
  ]
});
// 分类列表
const categoryList = ref<{ value: number; label: string }[]>([]);
// 规格类型
const specsType = ref<number>(2);
// 面包屑列表
const breadList = ["菜品管理", "菜品列表", "新增菜品"];
// tree配置
const props = {
  label: "label",
  children: "children",
  isLeaf: "isLeaf"
};
// 表单校验规则
const rules = reactive({
  categoryId: [{ required: true }],
  goodsName: [{ required: true }],
  imgs: [{ required: true }],
  price: [{ required: true }],
  goodsUnit: [{ required: true }]
});

const list = ref([
  { id: 1, name: "1111" },
  { id: 2, name: "22222" },
  { id: 3, name: "3333" },
  { id: 4, name: "4444" },
  { id: 5, name: "5555" }
]);

/**
 * 获取一级分类列表
 */
onBeforeMount(async () => {
  const res = await dish_category_first_get({
    pageNum: 1,
    pageSize: 10000
  });
  if (res.code === 200) {
    const arr = res.data.list.map(item => {
      return {
        value: item.categoryId,
        label: item.categoryName,
        children: [],
        isLeaf: false
      };
    });
    categoryList.value = arr;
  }
});

/**
 * 切换规格时清空数据
 */
watch(
  () => {
    specsType.value;
  },
  () => {
    formData.value.specs = [
      {
        id: generateUUID(),
        skuName: "",
        price: ""
      }
    ];
  },
  { deep: true, immediate: true }
);

/**
 * 加载子分类
 */
const loadCategory = async (node, resolve) => {
  if (node.data.value) {
    const categoryId = node.data.value;
    const res = await dish_category_second_get({
      categoryId,
      pageNum: 1,
      pageSize: 10000
    });
    if (res.code === 200) {
      const arr = res.data.list.map(item => {
        return {
          value: item.categoryId,
          label: item.categoryName,
          isLeaf: true
        };
      });
      resolve(arr);
    }
  }
};

/**
 * number输入
 */
const handleInputNumber = (val: string) => {
  formData.value.price = val.replace(/[^0-9.]/g, "");
};

/**
 * 删除规格
 */
const handleDeleteSpec = (index: number) => {
  formData.value.specs.splice(index, 1);
};

/**
 * 新增规格
 */
const handleAddSpec = () => {
  formData.value.specs.push({
    id: generateUUID(),
    skuName: "",
    price: ""
  });
};

/**
 * 上传之前校验
 */
const handleBeforeUpload: UploadProps["beforeUpload"] = rawFile => {
  if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error("图片大小不能超过5M");
    return false;
  }
  return true;
};

/**
 * 上传图片
 */
let tempImages: string[] = [];
const handleHttpUpload = async (options: UploadRequestOptions) => {
  let params = new FormData();
  params.append("pictures", options.file);
  params.append("folderName", "dishes");
  try {
    const { data } = await upload_images(params);
    tempImages.push(data);
    formData.value.imgs = tempImages.join(",");
  } catch (error) {
    options.onError(error as any);
  }
};

/**
 * 返回列表
 */
const handleBackToList = () => {
  router.push("/dishes-list");
  tabsStore.handleRemoveTab(route.fullPath);
};
</script>

<style lang="scss" scoped>
@mixin btn {
  height: 40px;
  font-family: PingFangMedium;
  font-size: 14px;
  border-radius: 8px;
}

.dishes-add-container {
  height: 100%;
  .form-title {
    height: 40px;
    font-size: 18px;
    color: #08090a;
    font-family: PingFangMedium;
    line-height: 40px;
    margin-bottom: 4px;
  }
}

.el-button {
  @include btn();
}

.el-scrollbar {
  height: calc(100% - 88px);
  padding: 16px;
}

.el-form-item {
  :deep(.el-form-item__label) {
    height: 40px;
    font-size: 14px;
    color: #525b66;
    font-family: PingFangMedium;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
  }
}

.el-select {
  width: 828px;
  height: 40px;
  :deep(.el-select__wrapper) {
    height: 100%;
    font-family: PingFangRegular;
    border-radius: 8px 8px 8px 8px;
    border: 1px solid #e1eaf5;
    box-shadow: none;

    .el-select__selected-item {
      color: #08090a;
      @at-root {
        &.is-transparent {
          color: #7a8799;
        }
      }
    }
  }
}

.el-input {
  width: 828px;
  height: 40px;
  :deep(.el-input__wrapper) {
    font-family: PingFangRegular;
    box-shadow: none;
    border-radius: 8px;
    border: 1px solid #e1eaf5;
    &:hover {
      box-shadow: none !important;
    }
    .el-input__inner {
      color: #08090a;
      &::placeholder {
        color: #7a8799;
      }
    }
  }
  :deep(.is-focus) {
    box-shadow: none !important;
  }
}

:deep(.el-upload-list) {
  .el-upload {
    width: 94px;
    height: 94px;
    background-color: #ffffff;
    margin-bottom: 8px;
    > svg {
      width: 24px;
      height: 24px;
    }
  }
}

:deep(.el-upload-list__item) {
  width: 94px;
  height: 94px;
  border-radius: 6px;
}

.img-upload {
  :deep(.el-form-item__content) {
    flex-direction: column;
    align-items: flex-start;
    p {
      height: 20px;
      font-size: 12px;
      color: #7a8799;
      font-family: PingFangRegular;
      line-height: 20px;
    }
  }
}

.specs-type,
.dish-params {
  :deep(.el-form-item__content) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.el-textarea {
  width: 828px;
  :deep(.el-textarea__inner) {
    min-height: 94px !important;
    color: #08090a;
    font-family: PingFangRegular;
    border-radius: 8px;
    border: 1px solid #e1eaf5;
    box-shadow: none;
    padding: 9px 12px;
    &::placeholder {
      color: #7a8799;
    }
  }
}

.money-unit {
  font-size: 14px;
  color: #08090a;
  font-family: PingFangMedium;
  line-height: 22px;
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
}

.el-radio-group {
  font-family: PingFangRegular;
  font-size: 14px;
  margin-bottom: 8px;
  :deep(.el-radio) {
    span {
      color: #08090a;
    }
  }
}

.single-specs,
.multi-specs {
  width: 828px;
  height: 40px;
  .single-list,
  .multi-list {
    height: 100%;
    display: flex;
    justify-content: space-around;
  }
  .el-input {
    &:nth-child(2) {
      margin: 0 10px;
    }
    :deep(.el-input__wrapper) input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}

.multi-specs {
  height: auto;
  .multi-list {
    height: 40px;
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
}

.operat-group {
  height: 100%;
  line-height: 40px;
  margin-left: 12px;
  .delete-btn,
  .add-btn {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #ebf4ff;
    cursor: pointer;
    > svg {
      width: 16px;
      height: 16px;
    }
  }
  .disabled {
    background-color: #f5f7fa;
    pointer-events: none;
  }
  .delete-btn {
    margin-right: 8px;
  }
}

.specs-tips {
  height: 20px;
  font-size: 12px;
  color: #7a8799;
  font-family: PingFangRegular;
  margin-top: 18px;
  > div {
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:not(:last-child) {
      background-color: #ebf4ff;
      border-radius: 50%;
      > svg {
        width: 12px;
        height: 12px;
      }
    }
    &:first-child {
      margin-left: 2px;
    }
    &:nth-child(2) {
      margin: 0 2px;
    }
    &:last-child {
      margin: 0 2px;
      > svg {
        width: 16px;
        height: 16px;
      }
    }
  }
}

.property-list {
  width: 828px;
  height: 40px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 4px;
  &:last-child {
    margin-bottom: 0;
  }
  .el-input {
    margin-right: 12px;
  }
}
</style>
