<template>
  <view :class="n()" @click="handleClick">
    <!-- 插槽内容 -->
    <slot />

    <!-- 徽章 -->
    <view
      v-if="!hidden && (showBadge || dot)"
      :class="badgeClasses"
      :style="badgeStyles"
    >
      <text v-if="!dot && displayValue" :class="n('text')">
        {{ displayValue }}
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createNamespace } from '../../utils'
import { frameBadgeProps } from './types'
import type { FrameBadgeEmits } from './types'

defineOptions({
  name: 'FrameBadge',
})

const props = defineProps(frameBadgeProps)
const emit = defineEmits<FrameBadgeEmits>()

const { n, classes } = createNamespace('badge')

// 是否显示徽章内容
const showBadge = computed(() => {
  if (props.dot)
    return true
  const val = props.value
  return val !== '' && val !== null && val !== undefined
})

// 显示的值
const displayValue = computed(() => {
  if (props.dot)
    return ''

  const val = props.value
  if (typeof val === 'number' && val > props.max) {
    return `${props.max}+`
  }

  return String(val)
})

// 徽章类名
const badgeClasses = computed(() =>
  classes(
    n('content'),
    n(`--type-${props.type}`),
    [props.dot, n('--dot')],
    props.customClass,
  ),
)

// 徽章样式
const badgeStyles = computed(() => {
  if (typeof props.customStyle === 'string') {
    return props.customStyle
  }
  return props.customStyle
})

/**
 * 点击处理
 */
function handleClick(event: Event) {
  emit('click', event)
}
</script>

<script lang="ts">
export default {
  name: 'FrameBadge',
  // #ifdef MP-WEIXIN
  options: {
    virtualHost: true,
  },
  // #endif
}
</script>

<style scoped lang="scss">
@import '../../styles/index.scss';

.fui-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.fui-badge__content {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32rpx;
  height: 32rpx;
  padding: 0 8rpx;
  border-radius: 16rpx;
  font-size: 20rpx;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  border: 2rpx solid var(--fui-color-surface, #ffffff);
  box-sizing: border-box;

  // 小红点
  &--dot {
    min-width: 16rpx;
    width: 16rpx;
    height: 16rpx;
    padding: 0;
    border-radius: 50%;
  }

  // 类型样式
  &--type-default {
    background-color: var(--fui-color-text-tertiary);
    color: #ffffff;
  }

  &--type-primary {
    background-color: var(--fui-color-primary);
    color: #ffffff;
  }

  &--type-success {
    background-color: var(--fui-color-success);
    color: #ffffff;
  }

  &--type-warning {
    background-color: var(--fui-color-warning);
    color: var(--fui-color-warning-text);
  }

  &--type-danger {
    background-color: var(--fui-color-error);
    color: #ffffff;
  }
}

.fui-badge__text {
  transform: scale(0.9);
}
</style>
