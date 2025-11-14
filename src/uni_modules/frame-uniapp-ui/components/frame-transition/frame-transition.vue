<template>
  <!-- #ifndef APP-NVUE -->
  <view
    v-show="isShow"
    ref="ani"
    :class="transitionClasses"
    :style="transitionStyles"
    :animation="animationData"
    @click="handleClick"
  >
    <slot />
  </view>
  <!-- #endif -->

  <!-- #ifdef APP-NVUE -->
  <view
    v-if="isShow"
    ref="ani"
    :class="transitionClasses"
    :style="transitionStyles"
    :animation="animationData"
    @click="handleClick"
  >
    <slot />
  </view>
  <!-- #endif -->
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, ref, watch } from 'vue'
import { createNamespace } from '../../utils'
import { createAnimation } from './animation'
import { frameTransitionProps } from './types'
import type { FrameTransitionEmits, TransitionMode } from './types'

defineOptions({
  name: 'FrameTransition',
})

const props = defineProps(frameTransitionProps)
const emit = defineEmits<FrameTransitionEmits>()

const { n, classes } = createNamespace('transition')

const instance = getCurrentInstance()

// 状态
const isShow = ref(false)
const transform = ref('')
const opacity = ref(1)
const animationData = ref<any>(null)
let animation: any = null
let timer: any = null

// 动画配置
const animationConfig = computed(() => ({
  duration: props.duration,
  timingFunction: props.timingFunction,
  transformOrigin: '50% 50%',
  delay: 0,
}))

// 类名
const transitionClasses = computed(() =>
  classes(
    n(),
    props.customClass,
  ),
)

// 样式（合并自定义 transform 与动画 transform，避免覆盖）
const transitionStyles = computed(() => {
  const baseStyles: Record<string, any> = {
    opacity: opacity.value,
    transitionDuration: `${props.duration}ms`,
    transitionTimingFunction: props.timingFunction,
  }

  // 字符串样式：直接拼接（不易解析 transform，保持现状）
  if (typeof props.customStyle === 'string') {
    const inline = styleToString({ transform: transform.value, ...baseStyles })
    return `${inline};${props.customStyle}`
  }

  // 对象样式：合并 transform
  const custom = props.customStyle || {}
  const customTransform = (custom as any).transform as string | undefined
  const merged: Record<string, any> = {
    ...baseStyles,
    ...custom,
  }

  // 组合 transform（自定义在前，动画在后）
  const pieces: string[] = []
  if (customTransform) pieces.push(customTransform)
  if (transform.value) pieces.push(transform.value)
  merged.transform = pieces.join(' ').trim()

  return merged
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
 * 获取动画类型对应的初始样式
 * type=true 表示目标为“显示状态”，type=false 表示目标为“隐藏状态”
 */
function getInitialStyles(type: boolean, mode: TransitionMode) {
  const animations: Record<TransitionMode, any> = {
    'fade': { opacity: type ? 1 : 0 },
    // slide-up: 自下向上进入 -> 隐藏时应在容器下方（+100%）
    'slide-up': { transform: `translateY(${type ? '0' : '100%'})` },
    // slide-down: 自上向下进入 -> 隐藏时应在容器上方（-100%）
    'slide-down': { transform: `translateY(${type ? '0' : '-100%'})` },
    // slide-left: 自右向左进入 -> 隐藏时应在容器右侧（+100%）
    'slide-left': { transform: `translateX(${type ? '0' : '100%'})` },
    // slide-right: 自左向右进入 -> 隐藏时应在容器左侧（-100%）
    'slide-right': { transform: `translateX(${type ? '0' : '-100%'})` },
    'zoom-in': { transform: `scale(${type ? 1 : 0.8})` },
    'zoom-out': { transform: `scale(${type ? 1 : 1.2})` },
    'fade-up': {
      opacity: type ? 1 : 0,
      transform: `translateY(${type ? '0' : '20%'})`,
    },
    'fade-down': {
      opacity: type ? 1 : 0,
      transform: `translateY(${type ? '0' : '-20%'})`,
    },
    'fade-left': {
      opacity: type ? 1 : 0,
      transform: `translateX(${type ? '0' : '20%'})`,
    },
    'fade-right': {
      opacity: type ? 1 : 0,
      transform: `translateX(${type ? '0' : '-20%'})`,
    },
  }

  return animations[mode] || animations.fade
}

/**
 * 初始化样式
 */
function initStyles(type: boolean) {
  const modes = Array.isArray(props.mode) ? props.mode : [props.mode]
  let transformValue = ''
  let opacityValue = 1

  modes.forEach((mode) => {
    const styles = getInitialStyles(type, mode)
    if (styles.transform) {
      transformValue += `${styles.transform} `
    }
    if (typeof styles.opacity !== 'undefined') {
      opacityValue = styles.opacity
    }
  })

  return {
    transform: transformValue.trim(),
    opacity: opacityValue,
  }
}

/**
 * 应用动画
 */
function applyAnimation(type: boolean) {
  if (!animation) return animation

  const modes = Array.isArray(props.mode) ? props.mode : [props.mode]

  modes.forEach((mode) => {
    const styles = getInitialStyles(type, mode)

    if (mode === 'fade' || mode.startsWith('fade-')) {
      animation.opacity(styles.opacity)
    }

    if (styles.transform) {
      const transformMatch = styles.transform.match(/(translateX|translateY|scale)\(([^)]+)\)/)
      if (transformMatch) {
        const [, method, value] = transformMatch
        animation[method](value)
      }
    }
  })

  return animation
}

/**
 * 打开动画（CSS 过渡版）
 */
function open() {
  clearTimeout(timer)

  // 如果禁用动画，直接显示
  if (props.disabled) {
    isShow.value = true
    opacity.value = 1
    transform.value = initStyles(true).transform
    emit('after-enter')
    return
  }

  emit('before-enter')

  // 设置初始样式（隐藏态）
  const initialStyles = initStyles(false)
  transform.value = initialStyles.transform
  opacity.value = initialStyles.opacity

  // 显示元素
  isShow.value = true

  // 下一帧切到可见，触发 CSS 过渡
  nextTick(() => {
    setTimeout(() => {
      emit('enter')
      const showStyles = initStyles(true)
      transform.value = showStyles.transform
      opacity.value = showStyles.opacity

      // 在持续时间后派发 after-enter
      clearTimeout(timer)
      timer = setTimeout(() => {
        emit('after-enter')
      }, props.duration)
    }, 20)
  })
}

/**
 * 关闭动画（CSS 过渡版）
 */
function close() {
  // 如果禁用动画，直接隐藏
  if (props.disabled) {
    isShow.value = false
    emit('after-leave')
    return
  }

  emit('before-leave')
  emit('leave')

  // 切到隐藏样式，触发 CSS 过渡
  const hideStyles = initStyles(false)
  transform.value = hideStyles.transform
  opacity.value = hideStyles.opacity

  clearTimeout(timer)
  timer = setTimeout(() => {
    isShow.value = false
    animationData.value = null
    animation = null
    emit('after-leave')
  }, props.duration)
}

/**
 * 点击处理
 */
function handleClick(event: Event) {
  emit('click', event)
}

// 监听 show 变化
watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      open()
    }
    else {
      // 避免初始化时执行 close
      if (isShow.value) {
        close()
      }
    }
  },
  { immediate: true },
)
</script>

<script lang="ts">
export default {
  name: 'FrameTransition',
  // #ifdef MP-WEIXIN
  options: {
    virtualHost: true,
  },
  // #endif
}
</script>

<style scoped lang="scss">
@import '../../styles/index.scss';

.fui-transition {
  transition-property: transform, opacity;
}
</style>
