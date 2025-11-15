<template>
  <view :class="tabsClasses" :style="tabsStyles">
    <scroll-view
      :scroll-x="scrollable"
      :scroll-with-animation="animation"
      :class="n('scroll')"
      :show-scrollbar="false"
    >
      <view :class="n('list')">
        <!-- 标签项 -->
        <view
          v-for="(item, index) in items"
          :key="item.value"
          :id="`${tabId}-${index}`"
          :class="getItemClasses(item)"
          @click="handleItemClick(item, index)"
        >
          <view :class="n('item-content')">
            <!-- 图标 -->
            <frame-icon
              v-if="item.icon"
              :name="item.icon"
              size="md"
              :color="getItemColor(item)"
            />

            <!-- 文字 -->
            <text :class="n('item-text')" :style="{ color: getItemColor(item) }">
              {{ item.label }}
            </text>

            <!-- 徽标 -->
            <frame-badge
              v-if="item.badge !== undefined || item.dot"
              :value="item.badge"
              :dot="item.dot"
              :custom-style="{ marginLeft: '8rpx' }"
            />
          </view>
        </view>

        <!-- 指示线 -->
        <view :class="n('line')" :style="lineStyles" />
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onMounted, reactive, watch } from 'vue'
import { addUnit, createNamespace } from '../../utils'
import { frameTabsProps } from './types'
import type { FrameTabsEmits, TabItem } from './types'

defineOptions({
  name: 'FrameTabs',
})

const props = defineProps(frameTabsProps)
const emit = defineEmits<FrameTabsEmits>()

const { n, classes } = createNamespace('tabs')

// 获取实例
const instance = getCurrentInstance()

// 生成唯一 ID
const tabId = `fui-tabs-${Math.random().toString(36).slice(2)}`

// 指示线状态
const lineState = reactive({
  left: 0,
  width: 0,
  hasTransition: false,
})

// Tabs 类名
const tabsClasses = computed(() =>
  classes(
    n(),
    n('--var'),
    [props.border, n('--border')],
    [props.sticky, n('--sticky')],
    [isScrollable.value, n('--scrollable')],
    props.customClass,
  ),
)

// Tabs 样式
const tabsStyles = computed(() => {
  const baseStyles: Record<string, any> = {
    backgroundColor: props.bgColor,
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

// 指示线样式
const lineStyles = computed(() => {
  const styles: Record<string, any> = {
    left: `${lineState.left}px`,
    height: addUnit(props.lineHeight),
    backgroundColor: props.lineColor || 'var(--fui-color-primary)',
  }

  // 自定义宽度
  if (props.lineWidth) {
    styles.width = addUnit(props.lineWidth)
  } else {
    styles.width = `${lineState.width}px`
  }

  // 动画
  if (lineState.hasTransition && props.animation) {
    const duration = props.duration
    styles.transition = `left ${duration}ms, width ${duration}ms`
  }

  return styles
})

/**
 * 获取项的类名
 */
function getItemClasses(item: TabItem) {
  return classes(
    n('item'),
    [item.value === props.modelValue, n('item--active')],
    [item.disabled, n('item--disabled')],
  )
}

/**
 * 获取项的颜色
 */
function getItemColor(item: TabItem): string {
  if (item.disabled) {
    return '#c0c4cc'
  }
  if (item.value === props.modelValue) {
    return props.activeColor || 'var(--fui-color-primary)'
  }
  return props.inactiveColor || '#606266'
}

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
 * 更新指示线位置
 */
function updateLinePosition() {
  const index = props.items.findIndex(item => item.value === props.modelValue)
  if (index === -1) return

  nextTick(() => {
    const query = uni.createSelectorQuery().in(instance)
    query
      .select(`.${n('list')}`)
      .boundingClientRect()
      .select(`#${tabId}-${index}`)
      .boundingClientRect()
      .exec((res: any) => {
        if (res && res[0] && res[1]) {
          const listRect = res[0]
          const itemRect = res[1]
          lineState.width = itemRect.width
          lineState.left = itemRect.left - listRect.left
        }
      })
  })
}

/**
 * 处理项点击
 */
function handleItemClick(item: TabItem, index: number) {
  const data = { item, index }

  emit('click', data)

  // 禁用项
  if (item.disabled) {
    emit('disabled', data)
    return
  }

  // 已激活项
  if (item.value === props.modelValue) {
    return
  }

  // 切换
  emit('update:modelValue', item.value)
  emit('change', data)
}

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  () => {
    if (!lineState.hasTransition) {
      lineState.hasTransition = true
    }
    updateLinePosition()
  },
)

// 初始化
onMounted(() => {
  if (props.items.length > 0) {
    updateLinePosition()
  }
})
</script>

<script lang="ts">
export default {
  name: 'FrameTabs',
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
