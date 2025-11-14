<template>
  <view class="component-card" @click="handleClick">
    <view class="component-card__header">
      <view class="component-card__icon" v-if="icon">
        <view :class="icon" />
      </view>
      <text class="component-card__name">{{ name }}</text>
      <text v-if="badge" class="component-card__badge">{{ badge }}</text>
    </view>
    <text class="component-card__desc">{{ desc }}</text>
    <view v-if="$slots.preview" class="component-card__preview">
      <slot name="preview" />
    </view>
  </view>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  click: []
}>()

defineProps<{
  name: string
  desc: string
  badge?: string
  icon?: string
}>()

function handleClick() {
  emit('click')
}
</script>

<style scoped lang="scss">
.component-card {
  padding: 28rpx;
  border-radius: 20rpx;
  background: var(--fui-color-surface, #ffffff);
  border: 1rpx solid var(--fui-color-border, #e5e7eb);
  transition: all 250ms ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.component-card:active {
  transform: translateY(-2rpx);
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.08);
  border-color: var(--fui-color-primary, #667eea);
}

.component-card__header {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.component-card__icon {
  font-size: 36rpx;
  color: var(--fui-color-primary, #667eea);
  display: flex;
  align-items: center;
}

.component-card__name {
  font-size: 28rpx;
  font-weight: 600;
  color: var(--fui-color-text-primary, #1a1a1a);
  flex: 1;
  min-width: 0;
}

.component-card__badge {
  padding: 6rpx 16rpx;
  border-radius: 999rpx;
  font-size: 22rpx;
  font-weight: 600;
  color: #ffffff;
  background: var(--fui-color-primary, #667eea);
  flex-shrink: 0;
}

.component-card__desc {
  font-size: 24rpx;
  color: var(--fui-color-text-secondary, #6b7280);
  line-height: 1.5;
}

.component-card__preview {
  display: flex;
  justify-content: flex-end;
  margin-top: 8rpx;
}
</style>
