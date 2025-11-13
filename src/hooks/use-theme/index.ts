import { computed, ref, watch } from 'vue';

type ThemeMode = 'light' | 'dark';

const THEME_STORAGE_KEY = 'app-theme-mode';

function resolveInitialTheme(): ThemeMode {
  const stored = uni.getStorageSync(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  try {
    const systemTheme = uni.getSystemInfoSync?.().theme;
    if (systemTheme === 'dark' || systemTheme === 'light') {
      return systemTheme;
    }
  }
  catch (error) {
    console.warn('resolveInitialTheme error:', error);
  }
  return 'light';
}

const themeState = ref<ThemeMode>(resolveInitialTheme());

// 应用主题到页面
function applyTheme(mode: ThemeMode) {
  // 保存到本地存储
  uni.setStorageSync(THEME_STORAGE_KEY, mode);

  // Web 环境：设置 document 属性
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = mode;
    document.documentElement.classList.toggle('theme-dark', mode === 'dark');
    document.documentElement.classList.toggle('theme-light', mode === 'light');
    document.body?.setAttribute('data-theme', mode);
  }

  // uni-app 环境：通过设置全局类名
  // #ifdef H5
  const pages = getCurrentPages();
  if (pages.length > 0) {
    const currentPage = pages[pages.length - 1];
    if (currentPage?.$vm?.$el) {
      currentPage.$vm.$el.setAttribute('data-theme', mode);
    }
  }
  // #endif

  // 小程序环境：触发全局事件
  // #ifndef H5
  uni.$emit('theme-change', mode);
  // #endif
}

watch(
  themeState,
  (mode) => {
    applyTheme(mode);
  },
  { immediate: true },
);

export default function useTheme() {
  const theme = computed(() => themeState.value);
  const isDark = computed(() => themeState.value === 'dark');

  const setTheme = (mode: ThemeMode) => {
    if (mode !== 'light' && mode !== 'dark') {
      themeState.value = 'light';
      return;
    }
    themeState.value = mode;
  };

  const toggleTheme = () => {
    themeState.value = isDark.value ? 'light' : 'dark';
  };

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
  };
}
