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
        <view v-if="showLeft || $slots.left" :class="n('left')" @click="handleLeftClick">
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
        <view v-if="showRight || $slots.right" :class="n('right')" @click="handleRightClick">
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
@import '../../styles/index.scss';

.fui-nav-bar {
  position: relative;
  background: var(--fui-color-surface);

  &--fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  &--border {
    border-bottom: 1rpx solid var(--fui-color-border);
  }
}

.fui-nav-bar__status-bar {
  width: 100%;
}

.fui-nav-bar__content {
  @include flex-center;
  position: relative;
  padding: 0 32rpx;
}

.fui-nav-bar__left {
  @include flex-center;
  position: absolute;
  left: 32rpx;
  top: 50%;
  transform: translateY(-50%);
  gap: 8rpx;
  cursor: pointer;
  transition: opacity $fui-transition;

  &:active {
    opacity: 0.6;
  }
}

.fui-nav-bar__left-text {
  font-size: 28rpx;
  line-height: 1;
}

.fui-nav-bar__title {
  flex: 1;
  font-size: 32rpx;
  font-weight: 600;
  line-height: 1;
  @include text-ellipsis;

  &--center {
    text-align: center;
  }
}

.fui-nav-bar__title-text {
  @include text-ellipsis;
}

.fui-nav-bar__right {
  @include flex-center;
  position: absolute;
  right: 32rpx;
  top: 50%;
  transform: translateY(-50%);
  gap: 8rpx;
  cursor: pointer;
  transition: opacity $fui-transition;

  &:active {
    opacity: 0.6;
  }
}

.fui-nav-bar__right-text {
  font-size: 28rpx;
  line-height: 1;
}
</style>
