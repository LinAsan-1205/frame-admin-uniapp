<template>
  <view
    :class="dividerClasses"
    :style="dividerStyles"
  >
    <view
      v-if="hasContent && direction === 'horizontal'"
      :class="n('content')"
    >
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { addUnit, createNamespace } from '../../utils'
import { frameDividerProps } from './types'

defineOptions({
  name: 'FrameDivider',
})

const props = defineProps(frameDividerProps)
const slots = useSlots()

const { n, classes } = createNamespace('divider')

// 是否有内容
const hasContent = computed(() => Boolean(slots.default))

// 类名
const dividerClasses = computed(() =>
  classes(
    n(),
    n('--var'),
    n(`--${props.direction}`),
    n(`--content-${props.contentPosition}`),
    [props.dashed, n('--dashed')],
    [props.hairline, n('--hairline')],
    [hasContent.value, n('--with-content')],
    props.customClass,
  ),
)

// 样式
const dividerStyles = computed(() => {
  const baseStyles: Record<string, any> = {}

  if (props.color) {
    baseStyles.borderColor = props.color
    baseStyles.color = props.color
  }

  if (props.margin) {
    const marginValue = addUnit(props.margin)
    if (props.direction === 'horizontal') {
      baseStyles.marginTop = marginValue
      baseStyles.marginBottom = marginValue
    }
    else {
      baseStyles.marginLeft = marginValue
      baseStyles.marginRight = marginValue
    }
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
  name: 'FrameDivider',
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
