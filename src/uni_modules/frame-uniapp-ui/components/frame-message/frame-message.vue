<template>
  <frame-transition
    :show="show"
    :mode="transitionMode"
    @after-leave="handleAfterLeave"
  >
    <view
      :class="messageClasses"
      :style="messageStyles"
    >
      <frame-icon
        v-if="showIcon && iconName"
        :name="iconName"
        :color="iconColor"
        size="md"
      />
      <text :class="n('text')">{{ message }}</text>
    </view>
  </frame-transition>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { createNamespace } from '../../utils'
import { frameMessageProps, messageIconMap } from './types'
import type { FrameMessageEmits, TransitionMode } from './types'

defineOptions({
  name: 'FrameMessage',
})

const props = defineProps(frameMessageProps)
const emit = defineEmits<FrameMessageEmits>()

const { n, classes } = createNamespace('message')

let timer: any = null

// 获取图标名称
const iconName = computed(() => {
  if (props.icon)
    return props.icon
  return messageIconMap[props.type]
})

// 获取图标颜色
const iconColor = computed(() => {
  const colorMap = {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#2563eb',
  }
  return colorMap[props.type]
})

// 过渡动画模式
const transitionMode = computed((): TransitionMode => {
  if (props.position === 'top')
    return 'slide-down'
  if (props.position === 'bottom')
    return 'slide-up'
  return 'fade'
})

// 类名
const messageClasses = computed(() =>
  classes(
    n(),
    n(`--${props.type}`),
    n(`--${props.position}`),
    props.customClass,
  ),
)

// 样式
const messageStyles = computed(() => {
  const baseStyles: Record<string, any> = {
    zIndex: props.zIndex,
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

/**
 * 开始计时器
 */
function startTimer() {
  if (props.duration > 0) {
    timer = setTimeout(() => {
      emit('close')
    }, props.duration)
  }
}

/**
 * 清除计时器
 */
function clearTimer() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

/**
 * 动画结束后的回调
 */
function handleAfterLeave() {
  emit('closed')
}

// 监听 show 变化
watch(
  () => props.show,
  (val) => {
    if (val) {
      startTimer()
    }
    else {
      clearTimer()
    }
  },
  { immediate: true },
)

onMounted(() => {
  if (props.show) {
    startTimer()
  }
})

onUnmounted(() => {
  clearTimer()
})
</script>

<script lang="ts">
export default {
  name: 'FrameMessage',
  // #ifdef MP-WEIXIN
  options: {
    virtualHost: true,
  },
  // #endif
}
</script>

<style scoped lang="scss">
@import '../../styles/index.scss';

.fui-message {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: 12rpx;
  min-width: 200rpx;
  max-width: 80%;
  padding: 24rpx 32rpx;
  background: var(--fui-color-surface);
  border-radius: 16rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.12);
  font-size: 28rpx;
  color: var(--fui-color-text-primary);
  word-break: break-all;

  // 位置
  &--top {
    top: 100rpx;
  }

  &--center {
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &--bottom {
    bottom: 100rpx;
  }

  // 类型样式（可选的背景色）
  &--success {
    // background: rgba(16, 185, 129, 0.1);
  }

  &--error {
    // background: rgba(239, 68, 68, 0.1);
  }

  &--warning {
    // background: rgba(245, 158, 11, 0.1);
  }

  &--info {
    // background: rgba(37, 99, 235, 0.1);
  }
}

.fui-message__text {
  line-height: 1.5;
}
</style>
