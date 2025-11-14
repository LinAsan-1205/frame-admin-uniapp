<template>
  <view class="api-item">
    <text class="api-item__name">{{ name }}</text>
    <text v-if="type" class="api-item__type">{{ type }}</text>
    <text class="api-item__desc">{{ description }}</text>
  </view>
</template>

<script setup lang="ts">
interface Props {
  name: string
  type?: string
  description: string
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.api-item {
  padding: 24rpx 28rpx;
  border-radius: 28rpx;
  border: 2rpx solid rgba(0, 61, 173, 0.15);
  background: linear-gradient(135deg, rgba(0, 61, 173, 0.05), rgba(255, 255, 255, 0.9));
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2rpx 8rpx rgba(0, 61, 173, 0.06);

  &:active {
    transform: translateY(-2rpx);
    box-shadow: 0 6rpx 20rpx rgba(0, 61, 173, 0.12);
    border-color: #003dad;
  }
}

.api-item__name {
  display: block;
  font-size: 28rpx;
  font-weight: 700;
  color: #003dad;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  margin-bottom: 8rpx;
}

.api-item__type {
  display: inline-block;
  padding: 4rpx 12rpx;
  background: #003dad;
  color: #ffffff;
  border-radius: 8rpx;
  font-size: 22rpx;
  font-weight: 600;
  margin-bottom: 12rpx;
}

.api-item__desc {
  display: block;
  font-size: 24rpx;
  color: var(--theme-content-color, var(--fui-color-text-secondary));
  line-height: 1.6;
  margin-top: 8rpx;
}
</style>
