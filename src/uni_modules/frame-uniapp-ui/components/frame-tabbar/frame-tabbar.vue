<template>
  <view :class="tabbarClasses" :style="tabbarStyle">
    <view
      v-for="(item, index) in items"
      :key="item.name"
      :class="itemClasses(item)"
      @click="handleItemClick(item, index)"
    >
      <!-- 图标 -->
      <frame-badge
        v-if="item.icon || item.activeIcon || item.iconUrl || item.activeIconUrl"
        :value="item.badge"
        :dot="item.dot"
        type="danger"
      >
        <view :class="n('item-icon')">
          <!-- 图片图标 -->
          <frame-icon
            v-if="item.iconUrl || item.activeIconUrl"
            :name="isActive(item) ? (item.activeIconUrl || item.iconUrl) : item.iconUrl"
            type="image"
            :size="iconSize"
          />
          <!-- UnoCSS Iconify 图标 -->
          <view
            v-else
            :class="isActive(item) ? (item.activeIcon || item.icon) : item.icon"
            :style="{ 
              fontSize: iconSize,
              color: isActive(item) ? (activeColor || undefined) : (inactiveColor || undefined)
            }"
          />
        </view>
      </frame-badge>

      <!-- 文本 -->
      <text
        v-if="item.text"
        :class="[n('item-text'), isActive(item) ? n('item-text--active') : '']"
        :style="{ color: isActive(item) ? (activeColor || undefined) : (inactiveColor || undefined) }"
      >
        {{ item.text }}
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { createNamespace } from '../../utils';
import FrameBadge from '../frame-badge/frame-badge.vue';
import FrameIcon from '../frame-icon/frame-icon.vue';
import type {
  FrameTabbarEmits,
  FrameTabbarItem,
  FrameTabbarProps,
} from './types';

// 使用 BEM 命名工具
const { n, classes: bemClasses } = createNamespace('tabbar');

const props = withDefaults(defineProps<FrameTabbarProps>(), {
  modelValue: '',
  items: () => [],
  activeColor: '',
  inactiveColor: '',
  fixed: true,
  border: false,
  backgroundColor: '',
  safeAreaInsetBottom: true,
  capsule: false,
  iconSize: '40rpx',
});

const emit = defineEmits<FrameTabbarEmits>();

// 判断是否选中
function isActive(item: FrameTabbarItem) {
  return props.modelValue === item.name;
}

// Tabbar 类名
const tabbarClasses = computed(() => {
  return bemClasses(
    n(),
    n('--var'),
    [props.fixed, n('--fixed')],
    [props.border, n('--border')],
    [props.safeAreaInsetBottom, n('--safe-area')],
    [props.capsule, n('--capsule')],
    props.customClass,
  );
});

// Tabbar 样式
const tabbarStyle = computed(() => {
  const style: Record<string, any> = {
    backgroundColor: props.backgroundColor,
  };

  if (props.customStyle) {
    if (typeof props.customStyle === 'string') {
      return props.customStyle;
    }
    Object.assign(style, props.customStyle);
  }

  return style;
});

// Item 类名
function itemClasses(item: FrameTabbarItem) {
  return bemClasses(
    n('item'),
    [isActive(item), n('item--active')],
  );
}

// 点击项
function handleItemClick(item: FrameTabbarItem, index: number) {
  if (item.name !== props.modelValue) {
    emit('update:modelValue', item.name);
    emit('change', item.name, index);
  }
}
</script>

<style scoped lang="scss">
@import './style.scss';
</style>
