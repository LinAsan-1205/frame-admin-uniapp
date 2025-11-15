<template>
  <button
    :class="buttonClasses"
    :style="buttonStyle"
    :disabled="isDisabled"
    :id="buttonId"
    :form-type="formType"
    :open-type="openType"
    :scope="scope"
    :hover-class="computedHoverClass"
    :hover-start-time="hoverStartTime"
    :hover-stay-time="hoverStayTime"
    :hover-stop-propagation="hoverStopPropagation"
    :lang="lang"
    :session-from="sessionFrom"
    :send-message-title="sendMessageTitle"
    :send-message-path="sendMessagePath"
    :send-message-img="sendMessageImg"
    :app-parameter="appParameter"
    :show-message-card="showMessageCard"
    @click="handleClick"
    @getuserinfo="handleGetUserInfo"
    @contact="handleContact"
    @getphonenumber="handleGetPhoneNumber"
    @getrealtimephonenumber="handleGetRealtimePhoneNumber"
    @opensetting="handleOpenSetting"
    @launchapp="handleLaunchApp"
    @error="handleError"
    @chooseavatar="handleChooseAvatar"
    @agreeprivacyauthorization="handleAgreePrivacyAuthorization"
  >
    <view v-if="loading" :class="n('loading')">
      <view :class="n('spinner')" :style="spinnerStyle" />
    </view>
    <view v-else-if="icon || hasIconSlot" :class="n('icon')">
      <text v-if="icon" :class="[classPrefix, icon]" />
      <slot v-else name="icon" />
    </view>
    <view :class="n('content')">
      <slot />
    </view>
  </button>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { createNamespace } from '../../utils'
import type {
  FrameButtonClickEvent,
  FrameButtonEmits,
  FrameButtonProps,
} from './types'

// 使用 BEM 命名工具
const { n, classes: bemClasses } = createNamespace('button')

const props = withDefaults(defineProps<FrameButtonProps>(), {
  variant: 'base',
  theme: 'default',
  size: 'medium',
  shape: 'pill',
  block: false,
  ghost: false,
  round: true,
  hairline: false,
  loading: false,
  disabled: false,
  classPrefix: 'wd-icon',
  hoverClass: 'button-hover',
  hoverStartTime: 20,
  hoverStayTime: 70,
  hoverStopPropagation: false,
  lang: 'en',
  showMessageCard: false,
})

const emit = defineEmits<FrameButtonEmits>()

const slots = useSlots()
const hasIconSlot = computed(() => Boolean(slots.icon))
const isDisabled = computed(() => props.disabled || props.loading)

// 处理 round 属性，映射到 shape
const computedShape = computed(() => {
  if (props.round === false)
    return 'square'

  return props.shape
})

// 使用 BEM 工具生成类名
const buttonClasses = computed(() => {
  return bemClasses(
    n(),
    n('--var'),
    n(`--variant-${props.variant}`),
    n(`--theme-${props.theme}`),
    n(`--size-${props.size}`),
    n(`--shape-${computedShape.value}`),
    [props.block, n('--block')],
    [props.ghost, n('--ghost')],
    [props.hairline, n('--hairline')],
    [props.loading, 'is-loading'],
    [isDisabled.value, 'is-disabled'],
    props.customClass,
  )
})

const computedHoverClass = computed(() => {
  return isDisabled.value ? 'none' : props.hoverClass
})

const spinnerStyle = computed(() => {
  if (props.loadingColor) {
    return {
      borderTopColor: props.loadingColor,
      borderRightColor: `${props.loadingColor}40`,
      borderBottomColor: `${props.loadingColor}40`,
      borderLeftColor: `${props.loadingColor}40`,
    }
  }
  return {}
})

const buttonStyle = computed(() => {
  const style: Record<string, any> = {}

  // 自定义高度
  if (props.customHeight) {
    style.minHeight = props.customHeight
    style.height = props.customHeight
  }

  // 自定义字体大小
  if (props.customFontSize)
    style.fontSize = props.customFontSize

  // 自定义背景色
  if (props.backgroundColor)
    style.backgroundColor = props.backgroundColor

  // 自定义文字颜色
  if (props.textColor)
    style.color = props.textColor

  // 自定义边框颜色
  if (props.borderColor)
    style.borderColor = props.borderColor

  // 合并自定义样式
  if (props.customStyle) {
    if (typeof props.customStyle === 'string')
      return props.customStyle

    Object.assign(style, props.customStyle)
  }

  return style
})

function handleClick(event: FrameButtonClickEvent) {
  if (isDisabled.value)
    return

  emit('click', event)
}

function handleGetUserInfo(event: any) {
  emit('getuserinfo', event.detail)
}

function handleContact(event: any) {
  emit('contact', event.detail)
}

function handleGetPhoneNumber(event: any) {
  emit('getphonenumber', event.detail)
}

function handleGetRealtimePhoneNumber(event: any) {
  emit('getrealtimephonenumber', event.detail)
}

function handleOpenSetting(event: any) {
  emit('opensetting', event.detail)
}

function handleLaunchApp(event: any) {
  emit('launchapp', event.detail)
}

function handleError(event: any) {
  emit('error', event.detail)
}

function handleChooseAvatar(event: any) {
  emit('chooseavatar', event.detail)
}

function handleAgreePrivacyAuthorization(event: any) {
  emit('agreeprivacyauthorization', event.detail)
}
</script>

<style scoped lang="scss">
@import './style.scss';
</style>
