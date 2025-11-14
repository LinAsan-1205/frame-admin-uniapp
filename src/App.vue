<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
import { useTheme } from '@/hooks';

// 初始化主题
const { theme } = useTheme();

onLaunch(() => {
  console.log('App Launch');
  console.log('Current theme:', theme.value);
});

onShow(() => {
  console.log('App Show');
});

onHide(() => {
  console.log('App Hide');
});
</script>

<style lang="scss">
@import '@/static/styles/common.scss';
</style>
