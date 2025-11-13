<template>
  <view class="button-page">
    <!-- 顶部栏 -->
    <view class="page-header">
      <text class="page-title">{{ heroTitle }}</text>
      <text class="page-desc">{{ heroDesc }}</text>
      <view class="page-preview">
        <FrameButton theme="primary" size="large">
          {{ heroTitle }}
        </FrameButton>
      </view>
    </view>

    <!-- 变体展示 -->
    <view class="section">
      <text class="section-title">{{ t('components.button.sections.variants') }}</text>
      <view class="demo-grid">
        <view v-for="item in variantDemos" :key="item.key" class="demo-card">
          <FrameButton v-bind="item.props">
            {{ item.label }}
          </FrameButton>
          <text class="demo-label">{{ item.label }}</text>
        </view>
      </view>
    </view>

    <!-- 状态展示 -->
    <view class="section">
      <text class="section-title">{{ t('components.button.sections.states') }}</text>
      <view class="demo-grid">
        <view v-for="item in stateDemos" :key="item.key" class="demo-card">
          <FrameButton v-bind="item.props">
            {{ item.label }}
          </FrameButton>
          <text class="demo-label">{{ item.label }}</text>
        </view>
      </view>
    </view>

    <!-- 尺寸展示 -->
    <view class="section">
      <text class="section-title">{{ t('components.button.sections.sizes') }}</text>
      <view class="demo-grid">
        <view v-for="item in sizeDemos" :key="item.key" class="demo-card">
          <FrameButton v-bind="item.props">
            {{ item.label }}
          </FrameButton>
          <text class="demo-label">{{ item.label }}</text>
        </view>
      </view>
    </view>

    <!-- API 文档 -->
    <view class="section">
      <text class="section-title">{{ t('components.button.sections.api') }}</text>
      <view class="api-list">
        <view v-for="item in apiItems" :key="item.key" class="api-card">
          <text class="api-name">{{ item.name }}</text>
          <text class="api-desc">{{ item.desc }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { FrameButtonProps } from '@/uni_modules/frame-uniapp-ui';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { FrameButton } from '@/uni_modules/frame-uniapp-ui';

interface ButtonDemo {
  key: string;
  label: string;
  props: FrameButtonProps;
}

const { t } = useI18n();

const heroTitle = computed(() => t('components.button.title'));
const heroDesc = computed(() => t('components.button.description'));

const variantDemos = computed<ButtonDemo[]>(() => [
  { key: 'base', label: t('components.button.variants.base'), props: { theme: 'primary', variant: 'base' } },
  { key: 'outline', label: t('components.button.variants.outline'), props: { theme: 'primary', variant: 'outline' } },
  { key: 'dashed', label: t('components.button.variants.dashed'), props: { theme: 'primary', variant: 'dashed' } },
  { key: 'text', label: t('components.button.variants.text'), props: { theme: 'primary', variant: 'text' } },
  { key: 'ghost', label: t('components.button.variants.ghost'), props: { theme: 'primary', ghost: true } },
]);

const stateDemos = computed<ButtonDemo[]>(() => [
  { key: 'loading', label: t('components.button.states.loading'), props: { theme: 'primary', loading: true } },
  { key: 'disabled', label: t('components.button.states.disabled'), props: { theme: 'primary', disabled: true } },
]);

const sizeDemos = computed<ButtonDemo[]>(() => [
  { key: 'small', label: t('components.button.sizes.small'), props: { theme: 'primary', size: 'small' } },
  { key: 'medium', label: t('components.button.sizes.medium'), props: { theme: 'primary', size: 'medium' } },
  { key: 'large', label: t('components.button.sizes.large'), props: { theme: 'primary', size: 'large', block: true } },
]);

const apiItems = computed(() => [
  { key: 'variant', name: 'variant', desc: t('components.button.api.variant') },
  { key: 'theme', name: 'theme', desc: t('components.button.api.theme') },
  { key: 'size', name: 'size', desc: t('components.button.api.size') },
  { key: 'shape', name: 'shape', desc: t('components.button.api.shape') },
  { key: 'block', name: 'block', desc: t('components.button.api.block') },
  { key: 'loading', name: 'loading', desc: t('components.button.api.loading') },
  { key: 'disabled', name: 'disabled', desc: t('components.button.api.disabled') },
]);
</script>

<style scoped>
.button-page {
  min-height: 100vh;
  padding: 48rpx 32rpx 120rpx;
  display: flex;
  flex-direction: column;
  gap: 40rpx;
  background: var(--theme-surface-color);
}

.hero-preview {
  margin-top: 20rpx;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200rpx, 1fr));
  gap: 24rpx;
  margin-top: 24rpx;
}

.demo-card {
  padding: 28rpx;
  border-radius: 28rpx;
  border: 2rpx solid var(--theme-border-color);
  background: linear-gradient(135deg, var(--theme-surface-muted), rgba(255, 255, 255, 0.5));
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  align-items: center;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4rpx 12rpx rgba(15, 23, 42, 0.04);
}

.demo-card:active {
  transform: scale(0.98);
  box-shadow: 0 8rpx 24rpx rgba(15, 23, 42, 0.08);
}

.demo-label {
  font-size: 24rpx;
  color: var(--theme-content-color);
  font-weight: 500;
}

.api-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  margin-top: 28rpx;
}

.api-card {
  padding: 24rpx 28rpx;
  border-radius: 28rpx;
  border: 2rpx solid var(--theme-border-color);
  background: linear-gradient(135deg, var(--theme-surface-muted), rgba(255, 255, 255, 0.5));
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2rpx 8rpx rgba(15, 23, 42, 0.04);
}

.api-card:active {
  transform: translateX(4rpx);
  box-shadow: 0 4rpx 16rpx rgba(15, 23, 42, 0.08);
  border-color: var(--theme-primary);
}

.api-name {
  display: block;
  font-size: 28rpx;
  font-weight: 700;
  color: var(--theme-primary);
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  margin-bottom: 8rpx;
}

.api-desc {
  display: block;
  font-size: 24rpx;
  color: var(--theme-content-color);
  line-height: 1.6;
}
</style>
