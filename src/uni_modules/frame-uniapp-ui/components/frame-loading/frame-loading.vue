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
    n('--var'),
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
@import './style.scss';
</style>
