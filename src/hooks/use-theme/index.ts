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

watch(
  themeState,
  (mode) => {
    uni.setStorageSync(THEME_STORAGE_KEY, mode);
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = mode;
      document.documentElement.classList.toggle('theme-dark', mode === 'dark');
      document.documentElement.classList.toggle('theme-light', mode === 'light');
      document.body?.setAttribute('data-theme', mode);
    }
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
