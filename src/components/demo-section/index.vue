<template>
  <view class="demo-section" :class="customClass">
    <slot />
  </view>
</template>

<script setup lang="ts">
defineProps<{
  customClass?: string
}>()
</script>

<style scoped lang="scss">
.demo-section {
  background: #ffffff;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.08);
}
</style>
