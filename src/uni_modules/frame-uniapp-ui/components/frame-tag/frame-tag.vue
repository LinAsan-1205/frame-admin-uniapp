<template>
  <view
    :class="tagClasses"
    :style="tagStyles"
    @click="handleClick"
  >
    <view :class="n('content')">
      <slot />
    </view>
    <text
      v-if="closable"
      :class="n('close')"
      @click.stop="handleClose"
    >
      ×
    </text>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createNamespace } from '../../utils'
import { frameTagProps } from './types'
import type { FrameTagEmits } from './types'

defineOptions({
  name: 'FrameTag',
})

const props = defineProps(frameTagProps)
const emit = defineEmits<FrameTagEmits>()

const { n, classes } = createNamespace('tag')

// 类名
const tagClasses = computed(() =>
  classes(
    n(),
    n('--var'),
    n(`--type-${props.type}`),
    n(`--variant-${props.variant}`),
    n(`--size-${props.size}`),
    [props.round, n('--round')],
    [props.disabled, n('--disabled')],
    props.customClass,
  ),
)

// 样式
const tagStyles = computed(() => {
  if (typeof props.customStyle === 'string') {
    return props.customStyle
  }
  return props.customStyle
})

/**
 * 点击处理
 */
function handleClick(event: Event) {
  if (props.disabled)
    return
  emit('click', event)
}

/**
 * 关闭处理
 */
function handleClose(event: Event) {
  if (props.disabled)
    return
  emit('close', event)
}
</script>

<script lang="ts">
export default {
  name: 'FrameTag',
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
