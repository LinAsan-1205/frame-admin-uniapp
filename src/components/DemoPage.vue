<template>
  <view class="demo-page">
    <view class="demo-page__header">
      <image class="demo-page__logo" src="@/static/images/logo.png" mode="aspectFit" />
      <text class="demo-page__title">{{ title }}</text>
      <text class="demo-page__desc">{{ description }}</text>
    </view>
    <slot />
  </view>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description?: string
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.demo-page {
  min-height: 100vh;
  padding: 48rpx 32rpx 120rpx;
  display: flex;
  flex-direction: column;
  gap: 40rpx;
  background: var(--theme-surface-color, var(--fui-color-bg-primary));
}

.demo-page__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
  padding: 32rpx;
  background: linear-gradient(135deg, #003dad15, rgba(255, 255, 255, 0.8));
  border-radius: 32rpx;
  border: 2rpx solid rgba(0, 61, 173, 0.1);
  box-shadow: 0 8rpx 24rpx rgba(0, 61, 173, 0.08);
}

.demo-page__logo {
  width: 120rpx;
  height: 120rpx;
  margin-bottom: 16rpx;
}

.demo-page__title {
  font-size: 48rpx;
  font-weight: 700;
  color: #003dad;
  text-align: center;
}

.demo-page__desc {
  font-size: 28rpx;
  color: var(--theme-content-color, var(--fui-color-text-secondary));
  text-align: center;
  line-height: 1.6;
  opacity: 0.85;
}
</style>
