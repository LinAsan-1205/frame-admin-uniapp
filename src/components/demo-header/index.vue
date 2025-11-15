<template>
  <view class="demo-header" :style="{ background: bgColor }">
    <view v-if="icon" class="demo-header__icon">
      <view :class="icon" class="icon-large" />
    </view>
    <text class="demo-header__title">
      {{ title }}
    </text>
    <text v-if="subtitle" class="demo-header__subtitle">
      {{ subtitle }}
    </text>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
  icon?: string;
  bgColor?: string;
}>();
</script>

<style scoped lang="scss">
.demo-header {
  text-align: center;
  padding: 40rpx 32rpx;
  margin-bottom: 32rpx;
  border-radius: 0 0 48rpx 48rpx;
}

.demo-header__icon {
  display: flex;
  justify-content: center;
  margin-bottom: 20rpx;

  .icon-large {
    font-size: 80rpx;
    color: rgba(255, 255, 255, 0.9);
  }
}

.demo-header__title {
  font-size: 48rpx;
  font-weight: bold;
  color: #ffffff;
  display: block;
  margin-bottom: 16rpx;
  letter-spacing: 1rpx;
}

.demo-header__subtitle {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.85);
  display: block;
  line-height: 1.5;
}

// 暗黑模式 - demo-header 已使用白色文字，在暗黑模式下保持一致
// 如果背景色通过 bgColor prop 传入，则自动适配
</style>
