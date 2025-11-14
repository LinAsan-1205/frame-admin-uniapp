<template>
  <frame-transition
    :show="show"
    mode="fade"
    :duration="duration"
  >
    <view
      :class="overlayClasses"
      :style="overlayStyles"
      @click="handleClick"
      @touchmove.stop.prevent="handleTouchMove"
    >
      <slot />
    </view>
  </frame-transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createNamespace } from '../../utils'
import { frameOverlayProps } from './types'
import type { FrameOverlayEmits } from './types'

defineOptions({
  name: 'FrameOverlay',
})

const props = defineProps(frameOverlayProps)
const emit = defineEmits<FrameOverlayEmits>()

const { n, classes } = createNamespace('overlay')

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
    backgroundColor: `rgba(0, 0, 0, ${props.opacity})`,
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
</style>
