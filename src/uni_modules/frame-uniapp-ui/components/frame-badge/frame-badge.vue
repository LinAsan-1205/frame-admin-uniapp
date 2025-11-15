<template>
  <view :class="badgeWrapperClasses" @click="handleClick">
    <!-- 插槽内容 -->
    <slot />

    <!-- 徽章 -->
    <view
      v-if="!hidden && (showBadge || dot)"
      :class="badgeContentClasses"
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

// 容器类名
const badgeWrapperClasses = computed(() =>
  classes(
    n(),
    n('--var'),
  ),
)

// 徽章内容类名
const badgeContentClasses = computed(() =>
  classes(
    n('content'),
    n(`content--type-${props.type}`),
    [props.dot, n('content--dot')],
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
@import './style.scss';
</style>
