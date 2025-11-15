<template>
  <view>
    <!-- 导航栏 -->
    <view :class="navBarClasses" :style="navBarStyles">
      <!-- 状态栏占位 -->
      <view
        v-if="safeAreaInsetTop"
        :class="n('status-bar')"
        :style="statusBarStyles"
      />

      <!-- 导航栏内容 -->
      <view :class="n('content')" :style="contentStyles">
        <!-- 左侧 -->
        <view v-if="showLeft || $slots.left" :class="n('left')" :style="leftStyles" @click="handleLeftClick">
          <slot name="left">
            <!-- 返回图标或首页图标 -->
            <frame-icon
              v-if="isFirstPage && showHomeIcon"
              :name="homeIcon"
              :size="leftIconSize"
              :color="leftIconColor || color"
            />
            <frame-icon
              v-else-if="!isFirstPage && leftIcon"
              :name="leftIcon"
              :size="leftIconSize"
              :color="leftIconColor || color"
            />

            <!-- 左侧文字 -->
            <text v-if="leftText" :class="n('left-text')" :style="{ color: leftIconColor || color }">
              {{ leftText }}
            </text>
          </slot>
        </view>

        <!-- 标题 -->
        <view
          :class="titleClasses"
          :style="{ color }"
          @click="handleTitleClick"
        >
          <slot>
            <text :class="n('title-text')">{{ title }}</text>
          </slot>
        </view>

        <!-- 右侧 -->
        <view v-if="showRight || $slots.right" :class="n('right')" :style="rightStyles" @click="handleRightClick">
          <slot name="right">
            <!-- 右侧文字 -->
            <text v-if="rightText" :class="n('right-text')" :style="{ color: rightIconColor || color }">
              {{ rightText }}
            </text>

            <!-- 右侧图标 -->
            <frame-icon
              v-if="rightIcon"
              :name="rightIcon"
              :size="rightIconSize"
              :color="rightIconColor || color"
            />
          </slot>
        </view>
      </view>
    </view>

    <!-- 占位元素 -->
    <view v-if="fixed && placeholder" :style="placeholderStyles" />
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { addUnit, createNamespace, getSystemInfo } from '../../utils'
import { frameNavBarProps } from './types'
import type { FrameNavBarEmits } from './types'

defineOptions({
  name: 'FrameNavBar',
})

const props = defineProps(frameNavBarProps)
const emit = defineEmits<FrameNavBarEmits>()

const { n, classes } = createNamespace('nav-bar')

// 获取系统信息
const systemInfo = getSystemInfo()
const statusBarHeight = systemInfo.statusBarHeight || 0

// 是否为首页
const isFirstPage = computed(() => {
  const pages = getCurrentPages()
  return pages.length === 1
})

// 导航栏类名
const navBarClasses = computed(() =>
  classes(
    n(),
    n('--var'),
    [props.fixed, n('--fixed')],
    [props.border, n('--border')],
    props.customClass,
  ),
)

// 导航栏样式
const navBarStyles = computed(() => {
  const baseStyles: Record<string, any> = {
    backgroundColor: props.bgColor,
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

// 状态栏样式
const statusBarStyles = computed(() => {
  return {
    height: `${statusBarHeight}px`,
    backgroundColor: props.bgColor,
  }
})

// 内容样式
const contentStyles = computed(() => {
  return {
    height: addUnit(props.height),
  }
})

// 左侧样式
const leftStyles = computed(() => {
  const styles: Record<string, any> = {}
  if (props.leftWidth) {
    styles.minWidth = addUnit(props.leftWidth)
  }
  return styles
})

// 右侧样式
const rightStyles = computed(() => {
  const styles: Record<string, any> = {}
  if (props.rightWidth) {
    styles.minWidth = addUnit(props.rightWidth)
  }
  return styles
})

// 标题类名
const titleClasses = computed(() =>
  classes(
    n('title'),
    [props.titleCenter, n('title--center')],
  ),
)

// 占位样式
const placeholderStyles = computed(() => {
  let height = 0

  // 状态栏高度
  if (props.safeAreaInsetTop) {
    height += statusBarHeight
  }

  // 导航栏高度
  const navHeight = typeof props.height === 'number'
    ? props.height
    : parseFloat(props.height)
  height += navHeight

  return {
    height: `${height}px`,
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
 * 处理左侧点击
 */
function handleLeftClick() {
  if (isFirstPage.value && props.showHomeIcon) {
    emit('click-home')
    return
  }

  if (!isFirstPage.value && props.autoBack) {
    uni.navigateBack()
    return
  }

  emit('click-left')
}

/**
 * 处理标题点击
 */
function handleTitleClick() {
  emit('click-title')
}

/**
 * 处理右侧点击
 */
function handleRightClick() {
  emit('click-right')
}

// 上报页面标题（用于统计）
onMounted(() => {
  if (props.title && typeof uni.report === 'function') {
    uni.report('title', props.title)
  }
})
</script>

<script lang="ts">
export default {
  name: 'FrameNavBar',
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
