<template>
  <view class="demo-section border-2rpx border-[rgba(0,61,173,0.08)] rd-32rpx border-solid p-32rpx shadow-[0_4rpx_16rpx_rgba(0,61,173,0.04)] dark:border-blue-400/40 dark:shadow-none">
    <text class="demo-section__title mb-8rpx block border-b-3rpx border-b-[#003dad] border-b-solid pb-16rpx text-36rpx font-bold dark:border-b-blue-400 dark:text-[#60a5fa]">
      {{ title }}
    </text>
    <view class="mt-24rpx" :class="grid ? 'grid grid-cols-2 gap-24rpx' : ''">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  grid?: boolean; // 是否使用两列网格布局
}

defineProps<Props>();
</script>

<style scoped lang="scss">
.demo-section {
  background: linear-gradient(135deg, rgba(0, 61, 173, 0.02), rgba(255, 255, 255, 0.9));
}

.demo-section__title {
  color: #003dad;
}

// 暗黑模式
[data-theme='dark'] {
  .demo-section {
    background: rgba(17, 24, 39, 0.8);
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.3);
  }

  .demo-section__title {
    color: #60a5fa;
  }
}
</style>
