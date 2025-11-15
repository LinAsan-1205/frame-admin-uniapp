<template>
  <view class="demo-section-tabs">
    <view class="demo-section-tabs__header">
      <view
        v-for="(tab, index) in tabs"
        :key="index"
        class="demo-section-tabs__tab"
        :class="{ 'demo-section-tabs__tab--active': activeIndex === index }"
        @click="handleTabClick(index)"
      >
        <text class="demo-section-tabs__tab-text">{{ tab }}</text>
      </view>
    </view>
    <view class="demo-section-tabs__content">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  tabs: string[];
  defaultActive?: number;
}

const props = withDefaults(defineProps<Props>(), {
  defaultActive: 0,
});

const emit = defineEmits<{
  change: [index: number];
}>();

const activeIndex = ref(props.defaultActive);

function handleTabClick(index: number) {
  if (activeIndex.value === index) return;
  activeIndex.value = index;
  emit('change', index);
}

defineExpose({
  activeIndex,
});
</script>

<style scoped lang="scss">
.demo-section-tabs {
  margin-bottom: 32rpx;
}

.demo-section-tabs__header {
  display: flex;
  position: relative;
  background: transparent;
  border-bottom: 2rpx solid var(--fui-border-base);
  margin-bottom: 32rpx;
}

.demo-section-tabs__tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24rpx 32rpx;
  position: relative;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;

  &::after {
    content: '';
    position: absolute;
    bottom: -2rpx;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 60%;
    height: 4rpx;
    background: var(--fui-primary-base);
    border-radius: 2rpx;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:active {
    transform: scale(0.98);
  }

  &--active {
    &::after {
      transform: translateX(-50%) scaleX(1);
    }

    .demo-section-tabs__tab-text {
      color: var(--fui-primary-base);
      font-weight: 600;
      transform: scale(1.05);
    }
  }
}

.demo-section-tabs__tab-text {
  font-size: 30rpx;
  color: var(--fui-text-secondary);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  line-height: 1;
}

.demo-section-tabs__content {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
