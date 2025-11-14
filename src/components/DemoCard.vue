<template>
  <view class="demo-card">
    <slot />
    <text v-if="label" class="demo-card__label">{{ label }}</text>
  </view>
</template>

<script setup lang="ts">
interface Props {
  label?: string
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.demo-card {
  padding: 28rpx;
  border-radius: 28rpx;
  border: 2rpx solid rgba(0, 61, 173, 0.15);
  background: linear-gradient(135deg, rgba(0, 61, 173, 0.05), rgba(255, 255, 255, 0.9));
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  align-items: center;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4rpx 12rpx rgba(0, 61, 173, 0.06);

  &:active {
    transform: scale(0.98);
    box-shadow: 0 8rpx 24rpx rgba(0, 61, 173, 0.12);
    border-color: #003dad;
  }
}

.demo-card__label {
  font-size: 24rpx;
  color: var(--theme-content-color, var(--fui-color-text-secondary));
  font-weight: 500;
}
</style>
