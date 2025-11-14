<template>
  <view
    :class="tagClasses"
    :style="tagStyles"
    @click="handleClick"
  >
    <view :class="n('content')">
      <slot />
    </view>
    <text
      v-if="closable"
      :class="n('close')"
      @click.stop="handleClose"
    >
      ×
    </text>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createNamespace } from '../../utils'
import { frameTagProps } from './types'
import type { FrameTagEmits } from './types'

defineOptions({
  name: 'FrameTag',
})

const props = defineProps(frameTagProps)
const emit = defineEmits<FrameTagEmits>()

const { n, classes } = createNamespace('tag')

// 类名
const tagClasses = computed(() =>
  classes(
    n(),
    n(`--type-${props.type}`),
    n(`--variant-${props.variant}`),
    n(`--size-${props.size}`),
    [props.round, n('--round')],
    [props.disabled, n('--disabled')],
    props.customClass,
  ),
)

// 样式
const tagStyles = computed(() => {
  if (typeof props.customStyle === 'string') {
    return props.customStyle
  }
  return props.customStyle
})

/**
 * 点击处理
 */
function handleClick(event: Event) {
  if (props.disabled)
    return
  emit('click', event)
}

/**
 * 关闭处理
 */
function handleClose(event: Event) {
  if (props.disabled)
    return
  emit('close', event)
}
</script>

<script lang="ts">
export default {
  name: 'FrameTag',
  // #ifdef MP-WEIXIN
  options: {
    virtualHost: true,
  },
  // #endif
}
</script>

<style scoped lang="scss">
@import '../../styles/index.scss';

.fui-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  padding: 4rpx 12rpx;
  border-radius: 8rpx;
  font-size: 24rpx;
  line-height: 1.5;
  font-weight: 500;
  border: 2rpx solid transparent;
  transition: all $fui-transition;
  white-space: nowrap;

  // 尺寸
  &--size-sm {
    padding: 2rpx 8rpx;
    font-size: 22rpx;
  }

  &--size-lg {
    padding: 6rpx 16rpx;
    font-size: 26rpx;
  }

  // 圆形
  &--round {
    border-radius: 999rpx;
  }

  // 禁用
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  // 类型 + 变体样式
  @each $type in ('default', 'primary', 'success', 'warning', 'danger') {
    &--type-#{$type} {
      // filled 变体
      &.fui-tag--variant-filled {
        @if $type == 'default' {
          background-color: var(--fui-color-text-tertiary);
          color: #ffffff;
        } @else if $type == 'primary' {
          background-color: var(--fui-color-primary);
          color: #ffffff;
        } @else if $type == 'success' {
          background-color: var(--fui-color-success);
          color: #ffffff;
        } @else if $type == 'warning' {
          background-color: var(--fui-color-warning);
          color: var(--fui-color-warning-text);
        } @else if $type == 'danger' {
          background-color: var(--fui-color-error);
          color: #ffffff;
        }
      }

      // outlined 变体
      &.fui-tag--variant-outlined {
        background-color: transparent;
        @if $type == 'default' {
          border-color: var(--fui-color-border);
          color: var(--fui-color-text-primary);
        } @else if $type == 'primary' {
          border-color: var(--fui-color-primary);
          color: var(--fui-color-primary);
        } @else if $type == 'success' {
          border-color: var(--fui-color-success);
          color: var(--fui-color-success);
        } @else if $type == 'warning' {
          border-color: var(--fui-color-warning);
          color: var(--fui-color-warning);
        } @else if $type == 'danger' {
          border-color: var(--fui-color-error);
          color: var(--fui-color-error);
        }
      }

      // light 变体
      &.fui-tag--variant-light {
        border-color: transparent;
        @if $type == 'default' {
          background-color: var(--fui-color-surface-muted);
          color: var(--fui-color-text-secondary);
        } @else if $type == 'primary' {
          background-color: rgba(37, 99, 235, 0.1);
          color: var(--fui-color-primary);
        } @else if $type == 'success' {
          background-color: rgba(16, 185, 129, 0.1);
          color: var(--fui-color-success);
        } @else if $type == 'warning' {
          background-color: rgba(245, 158, 11, 0.1);
          color: var(--fui-color-warning);
        } @else if $type == 'danger' {
          background-color: rgba(239, 68, 68, 0.1);
          color: var(--fui-color-error);
        }
      }
    }
  }
}

.fui-tag__content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fui-tag__close {
  font-size: 32rpx;
  line-height: 1;
  cursor: pointer;
  transition: opacity $fui-transition;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 0.5;
  }
}
</style>
