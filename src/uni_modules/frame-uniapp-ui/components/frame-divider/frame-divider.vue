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
@import '../../styles/index.scss';

.fui-divider {
  display: flex;
  align-items: center;
  border-color: var(--fui-color-border);
  box-sizing: border-box;

  // 水平分割线
  &--horizontal {
    width: 100%;
    border-top-width: 2rpx;
    border-top-style: solid;

    &.fui-divider--hairline {
      border-top-width: 1rpx;
    }

    &.fui-divider--dashed {
      border-top-style: dashed;
    }

    // 有内容时
    &.fui-divider--with-content {
      border-top: none;

      &::before,
      &::after {
        content: '';
        flex: 1;
        border-top-width: 2rpx;
        border-top-style: solid;
        border-color: inherit;
      }

      &.fui-divider--hairline::before,
      &.fui-divider--hairline::after {
        border-top-width: 1rpx;
      }

      &.fui-divider--dashed::before,
      &.fui-divider--dashed::after {
        border-top-style: dashed;
      }

      // 内容位置
      &.fui-divider--content-left {
        &::before {
          max-width: 48rpx;
        }
      }

      &.fui-divider--content-right {
        &::after {
          max-width: 48rpx;
        }
      }
    }
  }

  // 垂直分割线
  &--vertical {
    width: 2rpx;
    height: 1em;
    margin: 0 16rpx;
    border-left-width: 2rpx;
    border-left-style: solid;

    &.fui-divider--hairline {
      width: 1rpx;
      border-left-width: 1rpx;
    }

    &.fui-divider--dashed {
      border-left-style: dashed;
    }
  }
}

.fui-divider__content {
  padding: 0 24rpx;
  font-size: 28rpx;
  color: var(--fui-color-text-tertiary);
  white-space: nowrap;
}
</style>
