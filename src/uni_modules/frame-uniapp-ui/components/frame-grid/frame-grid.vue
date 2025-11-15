<template>
  <view
    :class="gridClasses"
    :style="gridStyles"
  >
    <slot />
  </view>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { addUnit, createNamespace } from '../../utils'
import { frameGridProps } from './types'

defineOptions({
  name: 'FrameGrid',
})

const props = defineProps(frameGridProps)

const { n, classes } = createNamespace('grid')

// 提供给子组件的数据
provide('frameGrid', {
  columns: props.columns,
  border: props.border,
  square: props.square,
  center: props.center,
  clickable: props.clickable,
  gap: props.gap,
})

// 类名
const gridClasses = computed(() =>
  classes(
    n(),
    n('--var'),
    [props.border, n('--border')],
    props.customClass,
  ),
)

// 样式
const gridStyles = computed(() => {
  const baseStyles: Record<string, any> = {
    gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
  }

  if (props.gap) {
    baseStyles.gap = addUnit(props.gap)
  }

  // 合并自定义样式
  if (typeof props.customStyle === 'string') {
    return `${styleToString(baseStyles)};${props.customStyle}`
  }

  return {
    ...baseStyles,
    ...props.customStyle,
  }
})

/**
 * 将样式对象转为字符串
 */
function styleToString(styles: Record<string, any>): string {
  return Object.entries(styles)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      return `${cssKey}:${value}`
    })
    .join(';')
}
</script>

<script lang="ts">
export default {
  name: 'FrameGrid',
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
