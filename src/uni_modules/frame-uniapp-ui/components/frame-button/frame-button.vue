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
@import '../../styles/index.scss';

/* 重置 button 默认样式 */
.fui-button {
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  background: none;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  -webkit-appearance: none;
  appearance: none;
  text-align: center;

  /* 自定义样式 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 80rpx;
  padding: 0 30rpx;
  border-radius: 999rpx;
  border-width: 2rpx;
  border-style: solid;
  border-color: transparent;
  font-size: 28rpx;
  font-weight: 600;
  line-height: 1.4;
  color: var(--fui-color-text-primary);
  background-color: $fui-surface-muted;
  transition: all $fui-transition;
  box-shadow: $fui-shadow-soft;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  /* 移除 button 默认的伪类样式 */
  &::after {
    border: none !important;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
    transform: translate(-50%, -50%);
    transition: width 600ms ease, height 600ms ease, opacity 600ms ease;
    opacity: 0;
  }

  &:active::before {
    width: 300%;
    height: 300%;
    opacity: 1;
  }

  /* 尺寸 */
  &--size-small {
    min-height: 60rpx;
    padding: 0 20rpx;
    font-size: 24rpx;
    line-height: 1.4;
    border-width: 1rpx;
  }

  &--size-large {
    min-height: 96rpx;
    padding: 0 40rpx;
    font-size: 32rpx;
    line-height: 1.4;
    border-width: 2rpx;
  }

  /* 形状 */
  &--shape-rounded {
    border-radius: 16rpx;

    &.fui-button--size-small {
      border-radius: 12rpx;
    }

    &.fui-button--size-large {
      border-radius: 20rpx;
    }
  }

  &--shape-pill {
    border-radius: 999rpx;
  }

  &--shape-square {
    border-radius: 8rpx;

    &.fui-button--size-small {
      border-radius: 6rpx;
    }

    &.fui-button--size-large {
      border-radius: 10rpx;
    }
  }

  /* 块级 */
  &--block {
    width: 100%;
  }

  /* 细边框 */
  &--hairline {
    border-width: 1rpx;

    &.fui-button--size-small {
      border-width: 1rpx;
    }

    &.fui-button--size-large {
      border-width: 1rpx;
    }
  }

  /* 状态 */
  &.is-loading {
    cursor: wait;
    pointer-events: none;
  }

  &.is-disabled {
    opacity: 0.5;
    box-shadow: none;
    cursor: not-allowed;
    pointer-events: none;
  }
}

.fui-button__loading,
.fui-button__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 8rpx;
  position: relative;
  z-index: 1;
}

.fui-button__content {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  position: relative;
  z-index: 1;
}

.fui-button__spinner {
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  border-width: 4rpx;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.25);
  border-top-color: currentcolor;
  animation: fui-rotate 800ms linear infinite;
}

/* 不同尺寸的 spinner */
.fui-button--size-small .fui-button__spinner {
  width: 28rpx;
  height: 28rpx;
  border-width: 3rpx;
}

.fui-button--size-large .fui-button__spinner {
  width: 36rpx;
  height: 36rpx;
  border-width: 4rpx;
}

@keyframes fui-rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 主题样式 */
@each $name, $colors in $fui-color-map {
  .fui-button--theme-#{$name} {
    $bg: map-get($colors, bg);
    $text: map-get($colors, text);
    $border: map-get($colors, border);

    /* base 变体 - 基础按钮 */
    &.fui-button--variant-base {
      @if $bg {
        background: $bg;
      }
      color: if($text, $text, inherit);
      border-color: if($border, $border, transparent);
      box-shadow: 0 8rpx 20rpx rgba(15, 23, 42, 0.12),
                  0 4rpx 8rpx rgba(15, 23, 42, 0.08),
                  inset 0 -2rpx 0 rgba(0, 0, 0, 0.1);

      &:active {
        box-shadow: 0 4rpx 12rpx rgba(15, 23, 42, 0.15),
                    0 2rpx 4rpx rgba(15, 23, 42, 0.1),
                    inset 0 2rpx 4rpx rgba(0, 0, 0, 0.15);
      }
    }

    /* outline 变体 - 线框按钮 */
    &.fui-button--variant-outline {
      background-color: transparent;
      color: if($border, $border, inherit);
      border-color: if($border, $border, rgba(15, 23, 42, 0.1));
      box-shadow: none;

      &:active {
        background: if($border, rgba($border, 0.08), rgba(15, 23, 42, 0.04));
      }
    }

    /* dashed 变体 - 虚线按钮 */
    &.fui-button--variant-dashed {
      background-color: transparent;
      color: if($border, $border, inherit);
      border-color: if($border, $border, rgba(15, 23, 42, 0.1));
      border-style: dashed;
      box-shadow: none;

      &:active {
        background: if($border, rgba($border, 0.08), rgba(15, 23, 42, 0.04));
      }
    }

    /* text 变体 - 文字按钮 */
    &.fui-button--variant-text {
      background-color: transparent;
      color: if($border, $border, if($bg, $bg, inherit));
      border-color: transparent;
      box-shadow: none;
      min-height: auto;
      padding: 4rpx 0;

      &:active {
        opacity: 0.7;
      }

      /* text 按钮尺寸调整 */
      &.fui-button--size-small {
        padding: 2rpx 0;
        min-height: auto;
      }

      &.fui-button--size-large {
        padding: 6rpx 0;
        min-height: auto;
      }
    }

    /* ghost 修饰符 - 幽灵按钮 */
    &.fui-button--ghost {
      background-color: transparent;
      color: if($border, $border, if($bg, $bg, inherit));
      border-color: if($border, $border, rgba(255, 255, 255, 0.5));
      box-shadow: none;

      &:active {
        background: if($border, rgba($border, 0.1), rgba(255, 255, 255, 0.1));
      }
    }
  }
}

/* 点击效果 */
.fui-button:not(.is-disabled):not(.fui-button--variant-text):active {
  transform: translateY(2rpx) scale(0.98);
}

/* 移除 uni-app button 默认的 hover 样式 */
.button-hover {
  opacity: 1;
}
</style>
