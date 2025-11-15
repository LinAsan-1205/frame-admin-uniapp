<template>
  <view :class="segmentedClasses" :style="segmentedStyles">
    <view
      v-for="(option, index) in normalizedOptions"
      :key="option.value"
      :class="getItemClasses(option)"
      :style="getItemStyles(option)"
      @click="handleItemClick(option, index)"
    >
      <!-- 完整图标名称（如 i-mdi-home）直接使用 -->
      <view
        v-if="option.icon && isFullIconName(option.icon)"
        :class="[option.icon, n('item-icon')]"
        :style="{ fontSize: iconSize, width: iconSize, height: iconSize }"
      />
      <!-- 简短图标名称（如 home）使用 frame-icon -->
      <frame-icon
        v-else-if="option.icon"
        :name="option.icon"
        :size="iconSize"
        :class="n('item-icon')"
      />
      <text :class="n('item-text')">{{ option.label }}</text>
    </view>
    
    <!-- 滑动指示器 -->
    <view
      :class="n('indicator')"
      :style="indicatorStyle"
    />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createNamespace } from '../../utils'
import { frameSegmentedProps } from './types'
import type { FrameSegmentedEmits, SegmentedOption } from './types'

defineOptions({
  name: 'FrameSegmented',
})

const props = defineProps(frameSegmentedProps)
const emit = defineEmits<FrameSegmentedEmits>()

const { n, classes } = createNamespace('segmented')

// 标准化选项
const normalizedOptions = computed<SegmentedOption[]>(() => {
  return props.options.map((option) => {
    if (typeof option === 'string' || typeof option === 'number') {
      return {
        value: option,
        label: String(option),
      }
    }
    return option
  })
})

// 当前选中索引
const activeIndex = computed(() => {
  return normalizedOptions.value.findIndex(
    option => option.value === props.modelValue,
  )
})

// 分段器类名
const segmentedClasses = computed(() =>
  classes(
    n(),
    n('--var'),
    n(`--${props.size}`),
    n(`--${props.shape}`),
    [props.block, n('--block')],
    [props.disabled, n('--disabled')],
    props.customClass,
  ),
)

// 分段器样式
const segmentedStyles = computed(() => {
  const styles: Record<string, any> = {}
  
  if (props.bgColor) {
    styles.background = props.bgColor
  }
  
  if (props.height) {
    styles.height = typeof props.height === 'number' ? `${props.height}rpx` : props.height
  }
  
  if (props.padding) {
    styles.padding = typeof props.padding === 'number' ? `${props.padding}rpx` : props.padding
  }
  
  if (props.color) {
    styles.color = props.color
  }
  
  if (props.fontSize) {
    styles.fontSize = typeof props.fontSize === 'number' ? `${props.fontSize}rpx` : props.fontSize
  }
  
  if (typeof props.customStyle === 'string') {
    return props.customStyle
  }
  
  return { ...styles, ...props.customStyle }
})

// 图标尺寸
const iconSize = computed(() => {
  const sizeMap = {
    sm: '32rpx',
    md: '36rpx',
    lg: '40rpx',
  }
  return sizeMap[props.size]
})

// 指示器样式
const indicatorStyle = computed(() => {
  const total = normalizedOptions.value.length
  if (total === 0 || activeIndex.value === -1) {
    return {
      display: 'none',
    }
  }

  // 容器左右内边距
  const paddingX = 10 // 10rpx
  
  // 可用宽度 = 100% - 左右内边距
  // 每个选项的宽度 = 可用宽度 / 选项数量
  const itemWidth = `calc((100% - ${paddingX * 2}rpx) / ${total})`
  
  // 左偏移 = 左内边距 + (每项宽度 * 当前索引)
  const leftOffset = `calc(${paddingX}rpx + (100% - ${paddingX * 2}rpx) / ${total} * ${activeIndex.value})`
  
  const styles: Record<string, any> = {
    width: itemWidth,
    left: leftOffset,
  }
  
  // 自定义指示器背景色
  if (props.indicatorColor) {
    styles.background = props.indicatorColor
  }
  
  return styles
})

// 获取选项类名
function getItemClasses(option: SegmentedOption) {
  return classes(
    n('item'),
    [option.value === props.modelValue, n('item--active')],
    [option.disabled || props.disabled, n('item--disabled')],
  )
}

// 获取选项样式
function getItemStyles(option: SegmentedOption) {
  const styles: Record<string, any> = {}
  
  // 如果是激活项且设置了激活颜色
  if (option.value === props.modelValue && props.activeColor) {
    styles.color = props.activeColor
  }
  
  return styles
}

// 判断是否为完整的图标名称（如 i-mdi-home）
function isFullIconName(icon: string) {
  return icon.startsWith('i-')
}

// 处理选项点击
function handleItemClick(option: SegmentedOption, index: number) {
  // 触发 click 事件（无论是否禁用或已选中）
  emit('click', option.value, index)
  
  if (option.disabled || props.disabled) {
    return
  }

  if (option.value === props.modelValue) {
    return
  }

  emit('update:modelValue', option.value)
  emit('change', option.value, index)
}
</script>

<script lang="ts">
export default {
  name: 'FrameSegmented',
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
