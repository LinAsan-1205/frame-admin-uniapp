<template>
  <view
    :class="spaceClasses"
    :style="spaceStyles"
  >
    <view
      v-for="(item, index) in items"
      :key="index"
      :class="itemClasses"
      :style="getItemStyle(index)"
    >
      <component :is="item" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { addUnit, createNamespace } from '../../utils'
import { frameSpaceProps } from './types'

defineOptions({
  name: 'FrameSpace',
})

const props = defineProps(frameSpaceProps)
const slots = useSlots()

const { n, classes } = createNamespace('space')

// 获取所有子节点
const items = computed(() => {
  const defaultSlot = slots.default?.()
  if (!defaultSlot)
    return []

  return defaultSlot.filter(item => item.type.toString() !== 'Symbol(Comment)')
})

// 计算间距值
const computedGap = computed(() => {
  if (Array.isArray(props.size)) {
    return props.size.map(s => addUnit(s))
  }
  return addUnit(props.size)
})

// 类名
const spaceClasses = computed(() =>
  classes(
    n(),
    n(`--${props.direction}`),
    n(`--align-${props.align}`),
    [props.wrap, n('--wrap')],
    [props.fill, n('--fill')],
    props.customClass,
  ),
)

// 容器样式
const spaceStyles = computed(() => {
  const baseStyles: Record<string, any> = {}

  // 设置 gap
  if (Array.isArray(computedGap.value)) {
    baseStyles.rowGap = computedGap.value[0]
    baseStyles.columnGap = computedGap.value[1]
  }
  else {
    baseStyles.gap = computedGap.value
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

// 子项类名
const itemClasses = computed(() =>
  classes(
    n('item'),
    [props.fill, n('item--fill')],
  ),
)

/**
 * 获取子项样式
 */
function getItemStyle(index: number) {
  return {}
}

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
  name: 'FrameSpace',
  // #ifdef MP-WEIXIN
  options: {
    virtualHost: true,
  },
  // #endif
}
</script>

<style scoped lang="scss">
@import '../../styles/index.scss';

.fui-space {
  display: flex;
  width: 100%;

  // 水平方向
  &--horizontal {
    flex-direction: row;
  }

  // 垂直方向
  &--vertical {
    flex-direction: column;
  }

  // 自动换行
  &--wrap {
    flex-wrap: wrap;
  }

  // 对齐方式
  &--align-start {
    align-items: flex-start;
  }

  &--align-center {
    align-items: center;
  }

  &--align-end {
    align-items: flex-end;
  }

  &--align-baseline {
    align-items: baseline;
  }

  &--align-stretch {
    align-items: stretch;
  }
}

.fui-space__item {
  // 填充模式
  &--fill {
    flex: 1;
  }
}
</style>
