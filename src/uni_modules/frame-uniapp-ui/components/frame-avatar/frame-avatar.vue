<template>
  <view
    :class="avatarClasses"
    :style="avatarStyles"
    @click="handleClick"
  >
    <!-- 图片头像 -->
    <image
      v-if="!imageError && src"
      :src="src"
      :mode="mode"
      :class="n('image')"
      @error="handleError"
    />

    <!-- 文字头像 -->
    <text
      v-else-if="text"
      :class="n('text')"
      :style="textStyles"
    >
      {{ displayText }}
    </text>

    <!-- 图标头像 -->
    <text
      v-else-if="icon"
      :class="iconClasses"
      :style="iconStyles"
    />

    <!-- 插槽 -->
    <slot v-else />
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { addUnit, createNamespace } from '../../utils'
import { avatarSizeMap, frameAvatarProps } from './types'
import type { FrameAvatarEmits } from './types'

defineOptions({
  name: 'FrameAvatar',
})

const props = defineProps(frameAvatarProps)
const emit = defineEmits<FrameAvatarEmits>()

const { n, classes } = createNamespace('avatar')

// 图片加载错误状态
const imageError = ref(false)

// 计算实际尺寸
const computedSize = computed(() => {
  // 如果是预设尺寸
  if (avatarSizeMap[props.size as keyof typeof avatarSizeMap]) {
    return avatarSizeMap[props.size as keyof typeof avatarSizeMap]
  }
  // 如果是数字，添加单位
  if (typeof props.size === 'number') {
    return addUnit(props.size)
  }
  // 直接返回字符串
  return props.size
})

// 计算显示的文字（最多两个字）
const displayText = computed(() => {
  if (!props.text)
    return ''
  if (props.text.length <= 2)
    return props.text
  return props.text.slice(-2)
})

// 计算文字大小（头像尺寸的 40%）
const textSize = computed(() => {
  const size = computedSize.value
  const numSize = Number.parseFloat(size)
  if (Number.isNaN(numSize))
    return '28rpx'
  return `${numSize * 0.4}${size.replace(/[\d.]/g, '')}`
})

// 容器类名
const avatarClasses = computed(() =>
  classes(
    n(),
    n(`--${props.shape}`),
    props.customClass,
  ),
)

// 容器样式
const avatarStyles = computed(() => {
  const baseStyles: Record<string, any> = {
    width: computedSize.value,
    height: computedSize.value,
  }

  if (props.bgColor) {
    baseStyles.backgroundColor = props.bgColor
  }

  if (props.color) {
    baseStyles.color = props.color
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

// 文字样式
const textStyles = computed(() => ({
  fontSize: textSize.value,
  color: props.color || 'inherit',
}))

// 图标类名
const iconClasses = computed(() => [
  props.iconPrefix,
  `${props.iconPrefix}-${props.icon}`,
])

// 图标样式
const iconStyles = computed(() => ({
  fontSize: textSize.value,
  color: props.color || 'inherit',
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

/**
 * 图片加载失败处理
 */
function handleError(event: Event) {
  imageError.value = true
  emit('error', event)
}
</script>

<script lang="ts">
export default {
  name: 'FrameAvatar',
  // #ifdef MP-WEIXIN
  options: {
    virtualHost: true,
  },
  // #endif
}
</script>

<style scoped lang="scss">
@import '../../styles/index.scss';

.fui-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: var(--fui-color-surface-muted);
  color: var(--fui-color-text-tertiary);
  flex-shrink: 0;
  position: relative;

  // 圆形
  &--circle {
    border-radius: 50%;
  }

  // 方形
  &--square {
    border-radius: 12rpx;
  }
}

.fui-avatar__image {
  width: 100%;
  height: 100%;
  display: block;
}

.fui-avatar__text {
  font-weight: 500;
  line-height: 1;
  user-select: none;
}
</style>
