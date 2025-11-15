<template>
  <view class="component-card" @click="handleClick">
    <view class="component-card__header">
      <view v-if="icon" class="component-card__icon">
        <view :class="icon" />
      </view>
      <text class="component-card__name">
        {{ name }}
      </text>
      <text v-if="badge" class="component-card__badge">
        {{ badge }}
      </text>
    </view>
    <text class="component-card__desc">
      {{ desc }}
    </text>
    <view v-if="$slots.preview" class="component-card__preview">
      <slot name="preview" />
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  desc: string;
  badge?: string;
  icon?: string;
}>();

const emit = defineEmits<{
  click: [];
}>();

function handleClick() {
  emit('click');
}
</script>

<style scoped lang="scss">
.component-card {
  padding: 28rpx;
  border-radius: 20rpx;
  background: var(--fui-surface-base, #ffffff);
  border: 1rpx solid var(--fui-border-base, #e5e7eb);
  transition: all 250ms ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.component-card:active {
  transform: translateY(-2rpx);
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.08);
  border-color: var(--fui-primary-base, #667eea);
}

.component-card__header {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.component-card__icon {
  font-size: 36rpx;
  color: var(--fui-primary-base, #667eea);
  display: flex;
  align-items: center;
}

.component-card__name {
  font-size: 28rpx;
  font-weight: 600;
  color: var(--fui-text-base, #1a1a1a);
  flex: 1;
  min-width: 0;
}

.component-card__badge {
  padding: 6rpx 16rpx;
  border-radius: 999rpx;
  font-size: 22rpx;
  font-weight: 600;
  color: #ffffff;
  background: var(--fui-primary-base, #667eea);
  flex-shrink: 0;
}

.component-card__desc {
  font-size: 24rpx;
  color: var(--fui-text-secondary, #6b7280);
  line-height: 1.5;
}

.component-card__preview {
  display: flex;
  justify-content: flex-end;
  margin-top: 8rpx;
}

// 暗黑模式 - 已使用 CSS 变量，自动适配
:root[data-theme='dark'] {
  .component-card:active {
    box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.6);
  }
}
</style>
