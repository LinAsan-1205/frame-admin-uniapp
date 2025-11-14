<template>
  <view class="demo-section">
    <text class="demo-section__title">{{ title }}</text>
    <view class="demo-section__content" :class="{ 'demo-section__content--grid': grid }">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
interface Props {
  title: string
  grid?: boolean  // 是否使用两列网格布局
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.demo-section {
  padding: 32rpx;
  background: linear-gradient(135deg, rgba(0, 61, 173, 0.02), rgba(255, 255, 255, 0.9));
  border-radius: 32rpx;
  border: 2rpx solid rgba(0, 61, 173, 0.08);
  box-shadow: 0 4rpx 16rpx rgba(0, 61, 173, 0.04);
}

.demo-section__title {
  display: block;
  font-size: 36rpx;
  font-weight: 700;
  color: #003dad;
  margin-bottom: 8rpx;
  padding-bottom: 16rpx;
  border-bottom: 3rpx solid #003dad;
}

.demo-section__content {
  margin-top: 24rpx;
  
  &--grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24rpx;
  }
}
</style>
