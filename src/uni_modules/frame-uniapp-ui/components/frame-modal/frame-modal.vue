<template>
  <frame-overlay
    :show="show"
    :z-index="zIndex"
    :close-on-click-overlay="closeOnClickOverlay"
    @close="handleOverlayClick"
  >
    <frame-transition
      :show="show"
      mode="zoom-in"
    >
      <view
        :class="modalClasses"
        :style="modalStyles"
        @click.stop
      >
        <!-- 关闭图标 -->
        <view
          v-if="closable"
          :class="n('close')"
          @click="handleClose"
        >
          <frame-icon name="close" size="sm" />
        </view>

        <!-- 标题 -->
        <view v-if="title || $slots.title" :class="n('header')">
          <text v-if="title" :class="n('title')">{{ title }}</text>
          <slot v-else name="title" />
        </view>

        <!-- 内容 -->
        <view :class="n('body')">
          <slot>
            <text v-if="content" :class="n('content')">{{ content }}</text>
          </slot>
        </view>

        <!-- 底部按钮 -->
        <view v-if="showCancel || $slots.footer" :class="n('footer')">
          <slot name="footer">
            <frame-space :size="16" :fill="true">
              <frame-button
                v-if="showCancel"
                variant="outlined"
                :block="true"
                @click="handleCancel"
              >
                {{ cancelText }}
              </frame-button>
              <frame-button
                theme="primary"
                :block="true"
                :style="confirmButtonStyle"
                @click="handleConfirm"
              >
                {{ confirmText }}
              </frame-button>
            </frame-space>
          </slot>
        </view>
      </view>
    </frame-transition>
  </frame-overlay>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { addUnit, createNamespace } from '../../utils'
import { frameModalProps } from './types'
import type { FrameModalEmits } from './types'

defineOptions({
  name: 'FrameModal',
})

const props = defineProps(frameModalProps)
const emit = defineEmits<FrameModalEmits>()

const { n, classes } = createNamespace('modal')

// 类名
const modalClasses = computed(() =>
  classes(
    n(),
    n('--var'),
    props.customClass,
  ),
)

// 样式
const modalStyles = computed(() => {
  const baseStyles: Record<string, any> = {
    width: addUnit(props.width),
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

// 确认按钮样式
const confirmButtonStyle = computed(() => {
  if (props.confirmColor) {
    return {
      backgroundColor: props.confirmColor,
      borderColor: props.confirmColor,
    }
  }
  return {}
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
 * 遮罩层点击
 */
function handleOverlayClick() {
  if (props.closeOnClickOverlay) {
    handleClose()
  }
}

/**
 * 关闭
 */
function handleClose() {
  emit('close')
}

/**
 * 取消
 */
function handleCancel() {
  emit('cancel')
  emit('close')
}

/**
 * 确认
 */
function handleConfirm() {
  emit('confirm')
}
</script>

<script lang="ts">
export default {
  name: 'FrameModal',
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
