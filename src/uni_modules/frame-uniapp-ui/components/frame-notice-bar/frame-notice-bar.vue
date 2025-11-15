<template>
  <view v-if="show" :class="noticeBarClasses" :style="noticeBarStyles" @click="handleClick">
    <!-- 左侧图标 -->
    <view v-if="showLeftIcon || $slots.left" :class="n('left')">
      <slot name="left">
        <frame-icon
          v-if="leftIcon"
          :name="leftIcon"
          size="md"
          :color="leftIconColor || color"
        />
      </slot>
    </view>

    <!-- 内容区域 -->
    <view :class="n('content')">
      <view
        :id="textId"
        :class="textClasses"
        :style="textStyles"
      >
        <slot>{{ text }}</slot>
      </view>
    </view>

    <!-- 右侧图标 -->
    <view v-if="showRightIconComputed || $slots.right" :class="n('right')" @click.stop="handleRightClick">
      <slot name="right">
        <frame-icon
          v-if="rightIconComputed"
          :name="rightIconComputed"
          size="md"
          :color="rightIconColor || color"
        />
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onMounted, reactive, ref } from 'vue'
import { addUnit, createNamespace } from '../../utils'
import { frameNoticeBarProps } from './types'
import type { FrameNoticeBarEmits } from './types'

defineOptions({
  name: 'FrameNoticeBar',
})

const props = defineProps(frameNoticeBarProps)
const emit = defineEmits<FrameNoticeBarEmits>()

const { n, classes } = createNamespace('notice-bar')

// 获取实例
const instance = getCurrentInstance()

// 生成唯一 ID
const textId = `fui-notice-bar-text-${Math.random().toString(36).slice(2)}`

// 是否显示
const show = ref(true)

// 动画状态
const animationState = reactive({
  duration: '0s',
  delay: '0s',
})

// 是否显示右侧图标
const showRightIconComputed = computed(() => {
  return props.showRightIcon || props.mode === 'closeable' || props.mode === 'link'
})

// 右侧图标
const rightIconComputed = computed(() => {
  if (props.rightIcon) return props.rightIcon
  if (props.mode === 'closeable') return 'close'
  if (props.mode === 'link') return 'arrow-right'
  return ''
})

// 通知栏类名
const noticeBarClasses = computed(() =>
  classes(
    n(),
    n('--var'),
    [props.wrapable && !props.scrollable, n('--wrapable')],
    [props.scrollable, n('--scrollable')],
    props.customClass,
  ),
)

// 通知栏样式
const noticeBarStyles = computed(() => {
  const baseStyles: Record<string, any> = {
    backgroundColor: props.bgColor,
    color: props.color,
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

// 文本类名
const textClasses = computed(() =>
  classes(
    n('text'),
    [props.scrollable, n('text--scrollable')],
    [!props.scrollable, n('text--single')],
    [!props.scrollable && props.wrapable, n('text--wrapable')],
  ),
)

// 文本样式
const textStyles = computed(() => {
  const styles: Record<string, any> = {
    fontSize: addUnit(props.fontSize),
  }

  // 滚动动画
  if (props.scrollable) {
    styles.animationDuration = animationState.duration
    styles.animationDelay = animationState.delay
  }

  return styles
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
 * 初始化滚动动画
 */
function initScrollAnimation() {
  if (!props.scrollable) return

  nextTick(() => {
    const query = uni.createSelectorQuery().in(instance)

    // 获取内容区域和文本宽度
    query
      .select(`.${n('content')}`)
      .boundingClientRect()
    query
      .select(`#${textId}`)
      .boundingClientRect()
    query.exec((res: any) => {
      if (!res || res.length < 2) return

      const contentRect = res[0]
      const textRect = res[1]

      if (!contentRect || !textRect) return

      // 只有当文本宽度大于容器宽度时才滚动
      if (textRect.width > contentRect.width) {
        const duration = textRect.width / props.speed
        const delay = contentRect.width / props.speed

        animationState.duration = `${duration}s`
        animationState.delay = `-${delay}s`
      }
    })
  })
}

/**
 * 处理点击
 */
function handleClick() {
  emit('click')
}

/**
 * 处理右侧图标点击
 */
function handleRightClick() {
  emit('click-right')

  if (props.mode === 'closeable') {
    show.value = false
    emit('close')
  }
}

// 初始化
onMounted(() => {
  if (props.scrollable) {
    setTimeout(() => {
      initScrollAnimation()
    }, props.delay)
  }
})
</script>

<script lang="ts">
export default {
  name: 'FrameNoticeBar',
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
