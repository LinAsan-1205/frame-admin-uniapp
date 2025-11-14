<template>
  <view v-if="popupState.showWrapper" :class="popupClasses" :style="popupStyles">
    <!-- 遮罩层 -->
    <frame-overlay
      v-if="overlay"
      :show="popupState.showContent"
      :z-index="zIndex"
      :duration="duration"
      @close="handleOverlayClick"
    />

    <!-- 弹出内容：让过渡作用在内容节点本身（position: fixed） -->
    <frame-transition
      :show="popupState.showContent"
      :mode="transitionMode"
      :duration="duration"
      :custom-class="contentClasses"
      :custom-style="contentStyles"
      @before-enter="handleBeforeEnter"
      @after-enter="handleAfterEnter"
      @after-leave="handleAfterLeave"
      @click.stop
    >
      <slot />
    </frame-transition>
  </view>
</template>

<script setup lang="ts">
import { computed, reactive, watch, nextTick } from 'vue'
import { addUnit, createNamespace } from '../../utils'
import { framePopupProps } from './types'
import type { FramePopupEmits, PopupPosition } from './types'

defineOptions({
  name: 'FramePopup',
})

const props = defineProps(framePopupProps)
const emit = defineEmits<FramePopupEmits>()

const { n, classes } = createNamespace('popup')

// 弹出层状态
const popupState = reactive({
  showWrapper: false, // 是否显示包裹层
  showContent: false, // 是否显示内容（控制动画）
})

// 过渡动画模式映射
const transitionModeMap: Record<PopupPosition, string> = {
  top: 'slide-down',
  bottom: 'slide-up',
  left: 'slide-right',
  right: 'slide-left',
  center: 'zoom-in',
}

// 过渡动画模式
const transitionMode = computed(() => transitionModeMap[props.position])

// 弹出层类名
const popupClasses = computed(() =>
  classes(
    n(),
    n(`--${props.position}`),
    props.customClass,
  ),
)

// 弹出层样式
const popupStyles = computed(() => {
  return {
    zIndex: props.zIndex,
  }
})

// 内容类名（以字符串返回，避免传数组给 frame-transition 的 custom-class）
const contentClasses = computed(() =>
  classes(
    n('content'),
    n(`content--${props.position}`),
    [props.round, n('content--round')],
    [props.safeAreaInsetBottom, n('content--safe-bottom')],
    [props.safeAreaInsetTop, n('content--safe-top')],
  ).join(' '),
)

// 内容样式
const contentStyles = computed(() => {
  const baseStyles: Record<string, any> = {
    backgroundColor: props.bgColor,
    // 确保内容在遮罩之上：内容层级 = 遮罩层级 + 1
    zIndex: (props.zIndex || 0) + 1,
  }

  // 圆角
  if (props.round) {
    const radius = addUnit(props.radius)
    if (props.position === 'top') {
      baseStyles.borderBottomLeftRadius = radius
      baseStyles.borderBottomRightRadius = radius
    } else if (props.position === 'bottom') {
      baseStyles.borderTopLeftRadius = radius
      baseStyles.borderTopRightRadius = radius
    } else if (props.position === 'center') {
      baseStyles.borderRadius = radius
    }
  }

  // 宽度（左右弹出时生效）
  if (props.width && (props.position === 'left' || props.position === 'right')) {
    baseStyles.width = addUnit(props.width)
  }

  // 高度（上下弹出时生效）
  if (props.height && (props.position === 'top' || props.position === 'bottom')) {
    baseStyles.height = addUnit(props.height)
  }

  // center 模式：提供居中定位与位移（与动画 transform 合并）
  if (props.position === 'center') {
    baseStyles.top = '50%'
    baseStyles.left = '50%'
    baseStyles.transform = 'translate(-50%, -50%)'
    baseStyles.maxWidth = '90%'
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
 * 处理遮罩层点击
 */
function handleOverlayClick() {
  emit('click-overlay')
  if (props.closeOnClickOverlay) {
    close()
  }
}

/**
 * 动画开始前
 */
function handleBeforeEnter() {
  // 可以在这里做一些准备工作
}

/**
 * 动画结束后（打开）
 */
function handleAfterEnter() {
  emit('open')
}

/**
 * 动画结束后（关闭）
 */
function handleAfterLeave() {
  popupState.showWrapper = false
  emit('close')
}

/**
 * 打开弹出层
 */
function open() {
  popupState.showWrapper = true
  nextTick(() => {
    popupState.showContent = true
  })
}

/**
 * 关闭弹出层
 */
function close() {
  popupState.showContent = false
}

// 监听 show 变化
watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      open()
    } else {
      close()
    }
  },
  { immediate: true },
)

// 暴露方法
defineExpose({
  open,
  close,
})
</script>

<script lang="ts">
export default {
  name: 'FramePopup',
  // #ifdef MP-WEIXIN
  options: {
    virtualHost: true,
  },
  // #endif
}
</script>

<style scoped lang="scss">
@import '../../styles/index.scss';

.fui-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;

  &--top,
  &--bottom,
  &--left,
  &--right,
  &--center {
    pointer-events: auto;
  }
}

.fui-popup__content {
  position: fixed;
  background: var(--fui-color-surface);
  box-sizing: border-box;
  max-height: 100%;
  overflow-y: auto;

  &--top {
    top: 0;
    left: 0;
    right: 0;
  }

  &--bottom {
    bottom: 0;
    left: 0;
    right: 0;
  }

  &--left {
    top: 0;
    left: 0;
    bottom: 0;
  }

  &--right {
    top: 0;
    right: 0;
    bottom: 0;
  }

  &--center {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 90%;
  }

  &--safe-bottom {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }

  &--safe-top {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
  }
}
</style>
