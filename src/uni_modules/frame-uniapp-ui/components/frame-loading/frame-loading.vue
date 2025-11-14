<template>
  <frame-overlay
    v-if="overlay"
    :show="show"
    :opacity="overlayOpacity"
  >
    <view
      :class="loadingClasses"
      :style="loadingStyles"
    >
      <view :class="n('spinner')">
        <!-- Spinner 动画 -->
        <view v-if="type === 'spinner'" :class="n('spinner-inner')" :style="spinnerStyles" />

        <!-- Circular 动画 -->
        <view v-else-if="type === 'circular'" :class="n('circular')" :style="circularStyles">
          <view :class="n('circular-path')" />
        </view>

        <!-- Dots 动画 -->
        <view v-else-if="type === 'dots'" :class="n('dots')">
          <view v-for="i in 3" :key="i" :class="n('dot')" :style="dotStyles" />
        </view>

        <!-- Pulse 动画 -->
        <view v-else-if="type === 'pulse'" :class="n('pulse')" :style="pulseStyles" />
      </view>

      <text v-if="text" :class="n('text')" :style="textStyles">
        {{ text }}
      </text>
    </view>
  </frame-overlay>

  <view
    v-else-if="show"
    :class="loadingClasses"
    :style="loadingStyles"
  >
    <view :class="n('spinner')">
      <!-- Spinner 动画 -->
      <view v-if="type === 'spinner'" :class="n('spinner-inner')" :style="spinnerStyles" />

      <!-- Circular 动画 -->
      <view v-else-if="type === 'circular'" :class="n('circular')" :style="circularStyles">
        <view :class="n('circular-path')" />
      </view>

      <!-- Dots 动画 -->
      <view v-else-if="type === 'dots'" :class="n('dots')">
        <view v-for="i in 3" :key="i" :class="n('dot')" :style="dotStyles" />
      </view>

      <!-- Pulse 动画 -->
      <view v-else-if="type === 'pulse'" :class="n('pulse')" :style="pulseStyles" />
    </view>

    <text v-if="text" :class="n('text')" :style="textStyles">
      {{ text }}
    </text>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { addUnit, createNamespace } from '../../utils'
import { frameLoadingProps, loadingSizeMap } from './types'

defineOptions({
  name: 'FrameLoading',
})

const props = defineProps(frameLoadingProps)

const { n, classes } = createNamespace('loading')

// 计算实际尺寸
const computedSize = computed(() => {
  // 如果是预设尺寸
  if (loadingSizeMap[props.size as keyof typeof loadingSizeMap]) {
    return loadingSizeMap[props.size as keyof typeof loadingSizeMap]
  }
  // 如果是数字，添加单位
  if (typeof props.size === 'number') {
    return addUnit(props.size)
  }
  // 直接返回字符串
  return props.size
})

// 类名
const loadingClasses = computed(() =>
  classes(
    n(),
    n(`--${props.type}`),
    [props.vertical, n('--vertical')],
    props.customClass,
  ),
)

// 容器样式
const loadingStyles = computed(() => {
  if (typeof props.customStyle === 'string') {
    return props.customStyle
  }
  return props.customStyle
})

// Spinner 样式
const spinnerStyles = computed(() => ({
  width: computedSize.value,
  height: computedSize.value,
  borderColor: props.color ? `${props.color}40` : undefined,
  borderTopColor: props.color || undefined,
}))

// Circular 样式
const circularStyles = computed(() => ({
  width: computedSize.value,
  height: computedSize.value,
}))

// Dot 样式
const dotStyles = computed(() => ({
  backgroundColor: props.color || undefined,
}))

// Pulse 样式
const pulseStyles = computed(() => ({
  width: computedSize.value,
  height: computedSize.value,
  backgroundColor: props.color || undefined,
}))

// 文字样式
const textStyles = computed(() => {
  const styles: Record<string, any> = {}

  if (props.textColor) {
    styles.color = props.textColor
  }

  if (props.textSize) {
    styles.fontSize = addUnit(props.textSize)
  }

  return styles
})
</script>

<script lang="ts">
export default {
  name: 'FrameLoading',
  // #ifdef MP-WEIXIN
  options: {
    virtualHost: true,
  },
  // #endif
}
</script>

<style scoped lang="scss">
@import '../../styles/index.scss';

.fui-loading {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;

  // 垂直排列
  &--vertical {
    flex-direction: column;
  }
}

.fui-loading__spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}

// Spinner 动画
.fui-loading__spinner-inner {
  border: 4rpx solid rgba(0, 0, 0, 0.1);
  border-top-color: var(--fui-color-primary);
  border-radius: 50%;
  animation: fui-loading-spin 0.8s linear infinite;
}

// Circular 动画
.fui-loading__circular {
  position: relative;
  border-radius: 50%;
  animation: fui-loading-rotate 2s linear infinite;
}

.fui-loading__circular-path {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 4rpx solid transparent;
  border-top-color: var(--fui-color-primary);
  border-right-color: var(--fui-color-primary);
  border-radius: 50%;
  animation: fui-loading-circular 1.5s ease-in-out infinite;
}

// Dots 动画
.fui-loading__dots {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.fui-loading__dot {
  width: 12rpx;
  height: 12rpx;
  background-color: var(--fui-color-primary);
  border-radius: 50%;
  animation: fui-loading-dots 1.4s ease-in-out infinite;

  &:nth-child(1) {
    animation-delay: -0.32s;
  }

  &:nth-child(2) {
    animation-delay: -0.16s;
  }
}

// Pulse 动画
.fui-loading__pulse {
  background-color: var(--fui-color-primary);
  border-radius: 50%;
  animation: fui-loading-pulse 1.2s ease-in-out infinite;
}

.fui-loading__text {
  font-size: 28rpx;
  color: var(--fui-color-text-secondary);
  line-height: 1.5;
}

// 动画定义
@keyframes fui-loading-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes fui-loading-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes fui-loading-circular {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes fui-loading-dots {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fui-loading-pulse {
  0%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}
</style>
