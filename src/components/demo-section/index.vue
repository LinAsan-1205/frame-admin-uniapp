<template>
  <view class="demo-section" :class="customClass">
    <slot />
  </view>
</template>

<script setup lang="ts">
defineProps<{
  customClass?: string;
}>();
</script>

<style scoped lang="scss">
.demo-section {
  background: var(--fui-color-surface, #ffffff);
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: var(--fui-shadow-sm, 0 8rpx 32rpx rgba(0, 0, 0, 0.08));
}
</style>
