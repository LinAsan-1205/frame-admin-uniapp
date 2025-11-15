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
    n('--var'),
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
@import './style.scss';
</style>
