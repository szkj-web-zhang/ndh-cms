import { ref, onMounted, onUnmounted } from "vue";

// 自定义Hook，用于监听屏幕宽度变化并实现防抖
export const useDebounceResize = (debounceTime = 300) => {
  const screenWidth = ref(window.innerWidth);

  let timeoutId: string | number | NodeJS.Timeout | undefined;

  const handleResize = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      screenWidth.value = window.innerWidth;
    }, debounceTime);
  };

  onMounted(() => {
    window.addEventListener("resize", handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
    clearTimeout(timeoutId);
  });

  return {
    screenWidth
  };
};
