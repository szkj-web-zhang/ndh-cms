import { Table } from "@/components/cms-table/interface";
import { reactive, computed, toRefs } from "vue";

/**
 * @description table 页面操作方法封装
 * @param {Function} api 获取表格数据 api 方法
 * @param {Object} initParam 获取数据初始化参数
 * @param {Boolean} isPageable 是否有分页
 * @param {Function} dataCallBack 对后台返回的数据进行处理的方法
 * */
export const useTable = (
  api?: (params: any) => Promise<any>,
  initParam: object = {},
  isPageable: boolean = true,
  dataCallBack?: (data: any) => any,
  requestError?: (error: any) => void
) => {
  const state = reactive<Table.StateProps>({
    tableData: [], // 表格数据
    // 分页数据
    pageable: {
      page: 1, // 当前页数
      pageSize: 10, // 每页显示条数
      total: 0 // 总条数
    },
    searchParam: {}, // 查询参数(只包括查询)
    searchInitParam: {}, // 初始化默认的查询参数
    totalParam: {} // 总参数(包含分页和查询参数)
  });

  /**
   * @description 分页查询参数
   * */
  const pageParam = computed({
    get: () => {
      return {
        page: state.pageable.page,
        pageSize: state.pageable.pageSize
      };
    },
    set: (newVal: any) => {
      console.log("我是分页更新之后的值", newVal);
    }
  });

  /**
   * 获取表格数据
   * */
  const getTableList = async () => {
    if (!api) return;
    try {
      // 先把初始化参数和分页参数放到总参数里面
      Object.assign(
        state.totalParam,
        initParam,
        isPageable ? pageParam.value : {}
      );
      let { data } = await api({
        ...state.searchInitParam,
        ...state.totalParam
      });
      dataCallBack && (data = dataCallBack(data));
      state.tableData = isPageable ? data.list : data;
      // 解构后台返回的分页数据 (如果有分页更新分页信息)
      if (isPageable) {
        state.pageable.total = data.totalCount;
      }
    } catch (error) {
      requestError && requestError(error);
    }
  };

  /**
   * 更新查询参数
   * */
  const updatedTotalParam = () => {
    state.totalParam = {};
    // 处理查询参数，可以给查询参数加自定义前缀操作
    let nowSearchParam: Table.StateProps["searchParam"] = {};
    // 防止手动清空输入框携带参数（这里可以自定义查询参数前缀）
    for (let key in state.searchParam) {
      // 某些情况下参数为 false/0 也应该携带参数
      if (
        state.searchParam[key] ||
        state.searchParam[key] === false ||
        state.searchParam[key] === 0
      ) {
        nowSearchParam[key] = state.searchParam[key];
      }
    }
    Object.assign(state.totalParam, nowSearchParam);
  };

  /**
   * 表格数据查询
   */
  const search = () => {
    state.pageable.page = 1;
    updatedTotalParam();
    getTableList();
  };

  /**
   * 表格数据重置
   * */
  const reset = () => {
    state.pageable.page = 1;
    // 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数
    state.searchParam = { ...state.searchInitParam };
    updatedTotalParam();
    getTableList();
  };

  /**
   * 每页条数改变
   * @param {Number} val 当前条数
   * */
  const handleSizeChange = (val: number) => {
    state.pageable.page = 1;
    state.pageable.pageSize = val;
    getTableList();
  };

  /**
   * 当前页改变
   * @param {Number} val 当前页
   * */
  const handleCurrentChange = (val: number) => {
    state.pageable.page = val;
    getTableList();
  };

  return {
    ...toRefs(state),
    getTableList,
    search,
    reset,
    handleSizeChange,
    handleCurrentChange,
    updatedTotalParam
  };
};
