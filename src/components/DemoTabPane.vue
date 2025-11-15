<template>
  <view v-show="active" class="demo-tab-pane">
    <slot />
  </view>
</template>

<script setup lang="ts">
interface Props {
  active: boolean;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
.demo-tab-pane {
  // Tab 面板样式
}
</style>
