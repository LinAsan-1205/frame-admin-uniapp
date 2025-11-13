<template>
  <view
    class="fui-button"
    :class="classes"
    role="button"
    :aria-disabled="isDisabled ? 'true' : 'false'"
    @click="handleClick"
  >
    <view v-if="loading" class="fui-button__state">
      <view class="fui-button__spinner" />
    </view>
    <view v-else-if="hasIconSlot" class="fui-button__state">
      <slot name="icon" />
    </view>
    <view class="fui-button__label">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';

import type {
  FrameButtonClickEvent,
  FrameButtonEmits,
  FrameButtonProps,
} from './types';

const props = withDefaults(defineProps<FrameButtonProps>(), {
  variant: 'solid',
  theme: 'default',
  size: 'medium',
  shape: 'pill',
  block: false,
  loading: false,
  disabled: false,
});

const emit = defineEmits<FrameButtonEmits>();

const slots = useSlots();
const hasIconSlot = computed(() => Boolean(slots.icon));
const isDisabled = computed(() => props.disabled || props.loading);

const classes = computed(() => [
  `fui-button--variant-${props.variant}`,
  `fui-button--theme-${props.theme}`,
  `fui-button--size-${props.size}`,
  `fui-button--shape-${props.shape}`,
  {
    'fui-button--block': props.block,
    'is-loading': props.loading,
    'is-disabled': isDisabled.value,
  },
]);

function handleClick(event: FrameButtonClickEvent) {
  if (isDisabled.value) {
    return;
  }
  emit('click', event);
}
</script>

<style scoped lang="scss">
@use 'sass:map';
@use '../../styles/variables.scss' as fui;

.fui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 88rpx;
  padding: 0 32rpx;
  border-radius: 999rpx;
  border-width: 2rpx;
  border-style: solid;
  border-color: transparent;
  font-size: 28rpx;
  font-weight: 600;
  line-height: 1;
  color: var(--theme-main-color);
  background-color: fui.$fui-surface-muted;
  transition: transform fui.$fui-transition, box-shadow fui.$fui-transition,
    opacity fui.$fui-transition, background-color fui.$fui-transition,
    border-color fui.$fui-transition, color fui.$fui-transition;
  box-shadow: fui.$fui-shadow-soft;
  overflow: hidden;

  &--size-small {
    min-height: 64rpx;
    padding: 0 24rpx;
    font-size: 24rpx;
  }

  &--size-large {
    min-height: 100rpx;
    padding: 0 40rpx;
    font-size: 30rpx;
  }

  &--shape-rounded {
    border-radius: 32rpx;
  }

  &--shape-pill {
    border-radius: 999rpx;
  }

  &--shape-square {
    border-radius: 18rpx;
  }

  &--block {
    width: 100%;
  }

  &.is-loading {
    cursor: wait;
  }

  &.is-disabled {
    opacity: 0.5;
    box-shadow: none;
  }
}

.fui-button__state {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 12rpx;
}

.fui-button__label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
}

.fui-button__spinner {
  width: 28rpx;
  height: 28rpx;
  border-radius: 50%;
  border: 4rpx solid rgba(255, 255, 255, 0.3);
  border-top-color: currentcolor;
  animation: fui-rotate 800ms linear infinite;
}

@keyframes fui-rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@each $name, $colors in fui.$fui-color-map {
  .fui-button--theme-#{$name} {
    $bg: map.get($colors, bg);
    $text: map.get($colors, text);
    $border: map.get($colors, border);
    background-color: if($bg, $bg, inherit);
    color: if($text, $text, inherit);
    border-color: if($border, $border, transparent);
  }

  .fui-button--variant-outline.fui-button--theme-#{$name} {
    background-color: transparent;
    color: if($border, $border, inherit);
    border-color: if($border, $border, rgba(15, 23, 42, 0.1));
    box-shadow: none;
  }

  .fui-button--variant-ghost.fui-button--theme-#{$name} {
    background-color: transparent;
    color: if($text, $text, inherit);
    border-color: transparent;
    box-shadow: none;
  }

  .fui-button--variant-text.fui-button--theme-#{$name} {
    background-color: transparent;
    color: if($text, $text, inherit);
    border-color: transparent;
    box-shadow: none;
    min-height: auto;
    padding: 8rpx 0;
  }
}

.fui-button:not(.is-disabled):active {
  transform: translateY(2rpx) scale(0.99);
  box-shadow: 0 10rpx 24rpx rgba(15, 23, 42, 0.12);
}
</style>
