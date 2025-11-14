<template>
  <view
    :class="cellClasses"
    :style="cellStyles"
    :hover-class="hoverClass"
    @click="handleClick"
  >
    <!-- 左侧图标 -->
    <view v-if="icon || $slots.icon" :class="n('icon')">
      <text v-if="icon" :class="iconClasses" />
      <slot v-else name="icon" />
    </view>

    <!-- 主要内容 -->
    <view :class="n('main')">
      <!-- 标题区域 -->
      <view :class="n('title-wrap')">
        <text v-if="required" :class="n('required')">*</text>
        <view v-if="title || $slots.title" :class="n('title')">
          <text v-if="title">{{ title }}</text>
          <slot v-else name="title" />
        </view>
      </view>

      <!-- 描述 -->
      <view v-if="label || $slots.label" :class="n('label')">
        <text v-if="label">{{ label }}</text>
        <slot v-else name="label" />
      </view>
    </view>

    <!-- 右侧内容 -->
    <view :class="n('value')">
      <slot>
        <text v-if="value">{{ value }}</text>
      </slot>
    </view>

    <!-- 右侧箭头 -->
    <view v-if="isLink" :class="n('arrow')">
      <text :class="arrowClasses" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { createNamespace } from '../../utils'
import { frameCellProps } from './types'
import type { FrameCellEmits } from './types'

defineOptions({
  name: 'FrameCell',
})

const props = defineProps(frameCellProps)
const emit = defineEmits<FrameCellEmits>()
const slots = useSlots()

const { n, classes } = createNamespace('cell')

// 图标类名
const iconClasses = computed(() => [
  props.iconPrefix,
  `${props.iconPrefix}-${props.icon}`,
])

// 箭头类名
const arrowClasses = computed(() => [
  props.iconPrefix,
  `${props.iconPrefix}-arrow-${props.arrowDirection}`,
])

// hover 类名
const hoverClass = computed(() => {
  return props.clickable || props.isLink || slots.default
    ? n('--hover')
    : 'none'
})

// 类名
const cellClasses = computed(() =>
  classes(
    n(),
    n(`--size-${props.size}`),
    [props.border, n('--border')],
    [props.center, n('--center')],
    [props.clickable || props.isLink, n('--clickable')],
    props.customClass,
  ),
)

// 样式
const cellStyles = computed(() => {
  if (typeof props.customStyle === 'string') {
    return props.customStyle
  }
  return props.customStyle
})

/**
 * 点击处理
 */
function handleClick(event: Event) {
  if (props.clickable || props.isLink) {
    emit('click', event)
  }
}
</script>

<script lang="ts">
export default {
  name: 'FrameCell',
  // #ifdef MP-WEIXIN
  options: {
    virtualHost: true,
  },
  // #endif
}
</script>

<style scoped lang="scss">
@import '../../styles/index.scss';

.fui-cell {
  position: relative;
  display: flex;
  align-items: center;
  padding: 24rpx 32rpx;
  background-color: var(--fui-color-surface);
  transition: background-color $fui-transition;

  // 尺寸
  &--size-sm {
    padding: 16rpx 24rpx;
  }

  &--size-lg {
    padding: 32rpx 40rpx;
  }

  // 居中
  &--center {
    align-items: center;

    .fui-cell__label {
      margin-top: 0;
    }
  }

  // 边框
  &--border {
    &::after {
      content: '';
      position: absolute;
      left: 32rpx;
      right: 0;
      bottom: 0;
      height: 1rpx;
      background-color: var(--fui-color-border);
      transform: scaleY(0.5);
    }
  }

  // 可点击
  &--clickable {
    cursor: pointer;
  }

  // hover 效果
  &--hover {
    background-color: var(--fui-color-surface-muted);
  }
}

.fui-cell__icon {
  margin-right: 16rpx;
  font-size: 40rpx;
  line-height: 1;
  color: var(--fui-color-text-secondary);
}

.fui-cell__main {
  flex: 1;
  min-width: 0;
}

.fui-cell__title-wrap {
  display: flex;
  align-items: center;
}

.fui-cell__required {
  margin-right: 4rpx;
  font-size: 28rpx;
  color: var(--fui-color-error);
  line-height: 1;
}

.fui-cell__title {
  font-size: 28rpx;
  font-weight: 500;
  color: var(--fui-color-text-primary);
  line-height: 1.5;
}

.fui-cell__label {
  margin-top: 8rpx;
  font-size: 24rpx;
  color: var(--fui-color-text-tertiary);
  line-height: 1.5;
}

.fui-cell__value {
  margin-left: 24rpx;
  font-size: 28rpx;
  color: var(--fui-color-text-secondary);
  text-align: right;
  line-height: 1.5;
}

.fui-cell__arrow {
  margin-left: 8rpx;
  font-size: 32rpx;
  color: var(--fui-color-text-quaternary);
  line-height: 1;
  transition: transform $fui-transition;
}
</style>
