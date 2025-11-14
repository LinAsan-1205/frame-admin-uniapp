<template>
  <view class="section-header" :class="customClass">
    <view class="section-header__main">
      <view v-if="icon" :class="icon" class="section-header__icon" />
      <text class="section-header__title">{{ title }}</text>
    </view>
    <text v-if="subtitle" class="section-header__subtitle">{{ subtitle }}</text>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  icon?: string
  customClass?: string
}>()
</script>

<style scoped lang="scss">
.section-header {
  margin-bottom: 24rpx;
  padding-bottom: 16rpx;
  border-bottom: 2rpx solid #f0f2f5;
}

.section-header__main {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 8rpx;
}

.section-header__icon {
  font-size: 32rpx;
  color: var(--fui-color-primary, #667eea);
}

.section-header__title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1a1a1a;
  display: block;
}

.section-header__subtitle {
  font-size: 24rpx;
  color: #6b7280;
  display: block;
  line-height: 1.5;
}
</style>
