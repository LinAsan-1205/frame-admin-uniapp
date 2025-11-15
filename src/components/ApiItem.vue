<template>
  <view class="api-item border-2rpx border-[rgba(0,61,173,0.15)] rd-28rpx border-solid p-24rpx shadow-[0_2rpx_8rpx_rgba(0,61,173,0.06)] transition-all active:translate-y--2rpx">
    <text class="api-item__name mb-8rpx block text-28rpx font-bold font-mono">
      {{ name }}
    </text>
    <text v-if="type" class="api-item__type mb-12rpx inline-block rd-8rpx px-12rpx py-4rpx text-22rpx text-white font-semibold">
      {{ type }}
    </text>
    <text class="api-item__desc mt-8rpx block text-24rpx leading-relaxed">
      {{ description }}
    </text>
  </view>
</template>

<script setup lang="ts">
interface Props {
  name: string;
  type?: string;
  description: string;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
.api-item {
  background: linear-gradient(135deg, rgba(0, 61, 173, 0.05), rgba(255, 255, 255, 0.9));
}

.api-item__name {
  color: #003dad;
}

.api-item__type {
  background: #003dad;
}

.api-item__desc {
  color: var(--fui-color-text-secondary);
}

// 暗黑模式
[data-theme='dark'] {
  .api-item {
    background: rgba(17, 24, 39, 0.8);
    border-color: rgba(59, 130, 246, 0.3);
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.3);
  }

  .api-item__name {
    color: #60a5fa;
  }

  .api-item__type {
    background: #3b82f6;
  }

  .api-item__desc {
    color: var(--fui-color-text-secondary);
  }
}
</style>
