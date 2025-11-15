<template>
  <view v-if="show || isClosing" :class="wrapperClasses" :style="wrapperStyles">
    <frame-transition
      :show="show && !skipAnimation"
      :mode="transitionMode"
      :duration="300"
      @after-leave="handleAfterLeave"
    >
      <view :class="messageClasses" :style="messageStyles">
        <view v-if="showIcon || $slots.icon" :class="n('icon')">
          <slot name="icon">
            <view
              :class="iconClass"
              :style="iconStyle"
            />
          </slot>
        </view>
        <view :class="n('content')">
          <slot>
            <text :class="n('text')">{{ message }}</text>
          </slot>
        </view>
        <view
          v-if="closable"
          :class="n('close')"
          @click.stop="handleClose"
        >
          <view class="i-mdi-close" :style="{ fontSize: '40rpx', width: '40rpx', height: '40rpx' }" />
        </view>
      </view>
    </frame-transition>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { createNamespace } from '../../utils'
import { frameMessageProps } from './types'
import type { FrameMessageEmits } from './types'
import type { TransitionMode } from '../frame-transition/types'

defineOptions({
  name: 'FrameMessage',
})

const props = defineProps(frameMessageProps)
const emit = defineEmits<FrameMessageEmits>()

const { n, classes } = createNamespace('message')

let timer: any = null
const skipAnimation = ref(false)
const isClosing = ref(false)

// 图标类名映射（完整的 UnoCSS 类名）
const iconClassMap: Record<string, string> = {
  success: 'i-mdi-check-circle',
  error: 'i-mdi-close-circle',
  warning: 'i-mdi-alert-circle',
  info: 'i-mdi-information',
}

// 获取图标类名
const iconClass = computed(() => {
  if (props.icon) {
    return props.icon
  }
  return iconClassMap[props.type]
})

// 获取图标样式 - 使用 CSS 变量跟随主题
const iconStyle = computed(() => ({
  color: `var(--fui-color-${props.type === 'error' ? 'error' : props.type})`,
  fontSize: '48rpx',
  width: '48rpx',
  height: '48rpx',
}))

// 过渡动画模式
const transitionMode = computed((): TransitionMode => {
  if (props.position === 'top')
    return 'slide-down'
  if (props.position === 'bottom')
    return 'slide-up'
  return 'fade'
})

// 外层容器类名
const wrapperClasses = computed(() =>
  classes(
    n('wrapper'),
    n('wrapper--var'),
    n(`wrapper--${props.position}`),
  ),
)

// 外层容器样式
const wrapperStyles = computed(() => ({
  zIndex: props.zIndex,
}))

// Message 内容类名
const messageClasses = computed(() =>
  classes(
    n(),
    n(`--${props.type}`),
    props.customClass,
  ),
)

// Message 内容样式
const messageStyles = computed(() => {
  const baseStyles: Record<string, any> = {}

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
 * 手动关闭 - 直接消失不需要动画
 */
function handleClose() {
  clearTimer()
  skipAnimation.value = true
  emit('close')
  // 重置标志
  setTimeout(() => {
    skipAnimation.value = false
  }, 50)
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
      skipAnimation.value = false
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
@import './style.scss';
</style>
