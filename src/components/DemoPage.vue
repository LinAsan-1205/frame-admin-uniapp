<template>
  <view class="demo-page min-h-screen flex flex-col gap-40rpx p-48rpx pb-120rpx">
    <view class="demo-page__header flex flex-col items-center gap-16rpx border-2rpx border-[rgba(0,61,173,0.1)] rd-32rpx border-solid p-32rpx shadow-[0_8rpx_24rpx_rgba(0,61,173,0.08)]">
      <image class="mb-16rpx h-120rpx w-120rpx" src="@/static/images/logo.png" mode="aspectFit" />
      <text class="demo-page__title text-center text-48rpx font-bold">
        {{ title }}
      </text>
      <text class="demo-page__desc text-center text-28rpx leading-relaxed op-85">
        {{ description }}
      </text>
    </view>
    <slot />
  </view>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  description?: string;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
.demo-page {
  background: var(--fui-color-bg-primary);
}

.demo-page__header {
  background: linear-gradient(135deg, #003dad15, rgba(255, 255, 255, 0.8));
}

.demo-page__title {
  color: #003dad;
}

.demo-page__desc {
  color: var(--fui-color-text-secondary);
}

// 暗黑模式
[data-theme='dark'] {
  .demo-page {
    background: #0f172a;
  }

  .demo-page__header {
    background: rgba(17, 24, 39, 0.8);
    border-color: rgba(59, 130, 246, 0.3);
    box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.4);
  }

  .demo-page__title {
    color: #60a5fa;
  }

  .demo-page__desc {
    color: var(--fui-color-text-secondary);
  }
}
</style>
