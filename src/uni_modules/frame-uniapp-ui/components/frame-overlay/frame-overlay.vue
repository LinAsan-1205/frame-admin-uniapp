<template>
  <view
    v-if="show || isAnimating"
    :class="overlayClasses"
    :style="overlayStyles"
    @click="handleClick"
    @touchmove.stop.prevent="handleTouchMove"
  >
    <view :class="n('content')" :style="contentStyles">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { createNamespace } from '../../utils'
import { frameOverlayProps } from './types'
import type { FrameOverlayEmits } from './types'

defineOptions({
  name: 'FrameOverlay',
})

const props = defineProps(frameOverlayProps)
const emit = defineEmits<FrameOverlayEmits>()

const { n, classes } = createNamespace('overlay')

// 动画状态
const isAnimating = ref(false)
const currentOpacity = ref(0)
const contentOpacity = ref(0)
let timer: any = null

// 监听 show 变化，控制动画
watch(() => props.show, (newVal) => {
  clearTimeout(timer)
  
  if (newVal) {
    // 显示遮罩 - 先设置初始状态
    currentOpacity.value = 0
    contentOpacity.value = 0
    
    // 立即显示元素（此时opacity为0，不可见）
    isAnimating.value = true
    
    // 下一帧开始动画（参考frame-transition的时序）
    nextTick(() => {
      // 强制重绘，确保 opacity: 0 已生效
      const forceReflow = currentOpacity.value
      setTimeout(() => {
        currentOpacity.value = props.opacity
        contentOpacity.value = 1
      }, 20)
    })
    
    // 动画结束后清理状态
    timer = setTimeout(() => {
      isAnimating.value = false
    }, props.duration)
  } else {
    // 隐藏遮罩 - 只在已显示时才执行关闭动画
    if (isAnimating.value) {
      currentOpacity.value = 0
      contentOpacity.value = 0
      
      // 动画结束后才隐藏元素
      timer = setTimeout(() => {
        isAnimating.value = false
      }, props.duration)
    }
  }
})

// 类名
const overlayClasses = computed(() =>
  classes(
    n(),
    props.customClass,
  ),
)

// 样式
const overlayStyles = computed(() => {
  const baseStyles: Record<string, any> = {
    zIndex: props.zIndex,
    backgroundColor: `rgba(0, 0, 0, ${currentOpacity.value})`,
    transition: `background-color ${props.duration}ms ease`,
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

// 内容样式
const contentStyles = computed(() => ({
  opacity: contentOpacity.value,
  transition: `opacity ${props.duration}ms ease`,
  pointerEvents: contentOpacity.value === 0 ? 'none' : 'auto',
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
  if (props.closeOnClickOverlay) {
    emit('close')
  }
}

/**
 * 阻止滚动穿透
 */
function handleTouchMove(event: Event) {
  if (props.lockScroll) {
    event.preventDefault()
    event.stopPropagation()
  }
}
</script>

<script lang="ts">
export default {
  name: 'FrameOverlay',
  // #ifdef MP-WEIXIN
  options: {
    virtualHost: true,
  },
  // #endif
}
</script>

<style scoped lang="scss">
@import '../../styles/index.scss';

.fui-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fui-overlay__content {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
