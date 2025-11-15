<template>
  <view class="demo-card flex flex-col items-center gap-20rpx border-2rpx border-[rgba(0,61,173,0.15)] rd-28rpx border-solid p-28rpx shadow-[0_4rpx_12rpx_rgba(0,61,173,0.06)] transition-all active:scale-98">
    <slot />
    <text v-if="label" class="demo-card__label text-24rpx font-medium">
      {{ label }}
    </text>
  </view>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
.demo-card {
  background: linear-gradient(135deg, rgba(0, 61, 173, 0.05), rgba(255, 255, 255, 0.9));
}

.demo-card__label {
  color: var(--fui-color-text-secondary);
}

// 暗黑模式
[data-theme='dark'] {
  .demo-card {
    background: rgba(17, 24, 39, 0.8);
    border-color: rgba(59, 130, 246, 0.3);
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.3);
  }

  .demo-card__label {
    color: var(--fui-color-text-secondary);
  }
}
</style>
