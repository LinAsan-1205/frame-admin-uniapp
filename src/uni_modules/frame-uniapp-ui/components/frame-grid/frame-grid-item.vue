<template>
  <view
    :class="itemClasses"
    :style="itemStyles"
    :hover-class="hoverClass"
    @click="handleClick"
  >
    <frame-badge
      v-if="badge || dot"
      :value="badge"
      :dot="dot"
    >
      <view :class="n('content')">
        <view v-if="icon || $slots.icon" :class="n('icon')">
          <text v-if="icon" :class="iconClasses" :style="iconStyles" />
          <slot v-else name="icon" />
        </view>
        <view v-if="text || $slots.default" :class="n('text')">
          <text v-if="text">{{ text }}</text>
          <slot v-else />
        </view>
      </view>
    </frame-badge>
    <view v-else :class="n('content')">
      <view v-if="icon || $slots.icon" :class="n('icon')">
        <text v-if="icon" :class="iconClasses" :style="iconStyles" />
        <slot v-else name="icon" />
      </view>
      <view v-if="text || $slots.default" :class="n('text')">
        <text v-if="text">{{ text }}</text>
        <slot v-else />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, inject, useSlots } from 'vue'
import { createNamespace } from '../../utils'
import { frameGridItemProps } from './types'
import type { FrameGridItemEmits } from './types'

defineOptions({
  name: 'FrameGridItem',
})

const props = defineProps(frameGridItemProps)
const emit = defineEmits<FrameGridItemEmits>()
const slots = useSlots()

const { n, classes } = createNamespace('grid-item')

// 从父组件注入的数据
const gridConfig = inject<any>('frameGrid', {})

// 图标类名
const iconClasses = computed(() => [
  props.iconPrefix,
  `${props.iconPrefix}-${props.icon}`,
])

// 图标样式
const iconStyles = computed(() => {
  const styles: Record<string, any> = {}
  if (props.iconColor) {
    styles.color = props.iconColor
  }
  return styles
})

// hover 类名
const hoverClass = computed(() => {
  return gridConfig.clickable || slots.default ? n('--hover') : 'none'
})

// 类名
const itemClasses = computed(() =>
  classes(
    n(),
    [gridConfig.border, n('--border')],
    [gridConfig.square, n('--square')],
    [gridConfig.center, n('--center')],
    [gridConfig.clickable, n('--clickable')],
    props.customClass,
  ),
)

// 样式
const itemStyles = computed(() => {
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
  name: 'FrameGridItem',
  // #ifdef MP-WEIXIN
  options: {
    virtualHost: true,
  },
  // #endif
}
</script>

<style scoped lang="scss">
@import '../../styles/index.scss';

.fui-grid-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32rpx 16rpx;
  background-color: var(--fui-color-surface);
  transition: background-color $fui-transition;
  box-sizing: border-box;

  // 带边框
  &--border {
    border-right: 1rpx solid var(--fui-color-border);
    border-bottom: 1rpx solid var(--fui-color-border);
  }

  // 正方形
  &--square {
    &::before {
      content: '';
      display: block;
      padding-top: 100%;
    }

    .fui-grid-item__content {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      transform: translateY(-50%);
    }
  }

  // 居中
  &--center {
    text-align: center;
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

.fui-grid-item__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.fui-grid-item__icon {
  margin-bottom: 12rpx;
  font-size: 56rpx;
  line-height: 1;
  color: var(--fui-color-text-secondary);
}

.fui-grid-item__text {
  font-size: 24rpx;
  color: var(--fui-color-text-secondary);
  line-height: 1.5;
}
</style>
