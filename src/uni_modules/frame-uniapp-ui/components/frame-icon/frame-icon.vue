<template>
  <view
    :class="iconClasses"
    :style="iconStyles"
    @click="handleClick"
  >
    <!-- 图标字体 -->
    <text
      v-if="type === 'icon' && name"
      :class="iconFontClasses"
      :style="iconFontStyles"
    />

    <!-- 图片图标 -->
    <image
      v-else-if="type === 'image' && name"
      :src="name"
      :class="n('image')"
      :style="imageStyles"
      mode="aspectFit"
    />

    <!-- SVG 图标（通过插槽） -->
    <slot v-else-if="type === 'svg'" />

    <!-- 默认插槽 -->
    <slot v-else />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { addUnit, createNamespace } from '../../utils'
import { frameIconProps, sizeMap } from './types'
import type { FrameIconEmits } from './types'

defineOptions({
  name: 'FrameIcon',
})

const props = defineProps(frameIconProps)
const emit = defineEmits<FrameIconEmits>()

const { n, classes } = createNamespace('icon')

// 计算实际尺寸
const computedSize = computed(() => {
  // 如果是预设尺寸
  if (sizeMap[props.size as keyof typeof sizeMap]) {
    return sizeMap[props.size as keyof typeof sizeMap]
  }
  // 如果是数字，添加单位
  if (typeof props.size === 'number') {
    return addUnit(props.size)
  }
  // 直接返回字符串
  return props.size
})

// 容器类名
const iconClasses = computed(() =>
  classes(
    n(),
    [props.spin, n('--spin')],
    [props.bold, n('--bold')],
    props.customClass,
  ),
)

// 容器样式
const iconStyles = computed(() => {
  const baseStyles: Record<string, any> = {
    fontSize: computedSize.value,
    width: computedSize.value,
    height: computedSize.value,
  }

  if (props.color) {
    baseStyles.color = props.color
  }

  if (props.spin) {
    baseStyles.animationDuration = `${props.spinDuration}s`
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

// 图标字体类名
const iconFontClasses = computed(() => [
  props.prefix,
  `${props.prefix}-${props.name}`,
])

// 图标字体样式
const iconFontStyles = computed(() => {
  const styles: Record<string, any> = {
    fontSize: computedSize.value,
  }

  if (props.color) {
    styles.color = props.color
  }

  return styles
})

// 图片样式
const imageStyles = computed(() => ({
  width: computedSize.value,
  height: computedSize.value,
}))

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

/**
 * 点击处理
 */
function handleClick(event: Event) {
  emit('click', event)
}
</script>

<script lang="ts">
export default {
  name: 'FrameIcon',
  // #ifdef MP-WEIXIN
  options: {
    virtualHost: true,
  },
  // #endif
}
</script>

<style scoped lang="scss">
@import '../../styles/index.scss';

.fui-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  line-height: 1;

  // 加粗
  &--bold {
    font-weight: bold;
  }

  // 旋转动画
  &--spin {
    animation: fui-icon-rotate linear infinite;
  }
}

.fui-icon__image {
  display: block;
  width: 100%;
  height: 100%;
}

@keyframes fui-icon-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
