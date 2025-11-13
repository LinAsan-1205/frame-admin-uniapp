<template>
  <view class="component-page">
    <view class="component-hero">
      <text class="component-hero__eyebrow">
        frame-uniapp-ui
      </text>
      <text class="component-hero__title">
        {{ heroTitle }}
      </text>
      <text class="component-hero__desc">
        {{ heroDesc }}
      </text>
      <view class="component-hero__preview">
        <FrameButton theme="primary" size="large">
          {{ heroTitle }}
        </FrameButton>
      </view>
    </view>

    <view class="demo-group">
      <text class="demo-group__title">
        {{ t('components.button.sections.variants') }}
      </text>
      <view class="demo-row">
        <view v-for="item in variantDemos" :key="item.key" class="demo-card">
          <FrameButton v-bind="item.props">
            {{ item.label }}
          </FrameButton>
          <text class="demo-card__label">
            {{ item.label }}
          </text>
        </view>
      </view>
    </view>

    <view class="demo-group">
      <text class="demo-group__title">
        {{ t('components.button.sections.states') }}
      </text>
      <view class="demo-row">
        <view v-for="item in stateDemos" :key="item.key" class="demo-card">
          <FrameButton v-bind="item.props">
            {{ item.label }}
          </FrameButton>
          <text class="demo-card__label">
            {{ item.label }}
          </text>
        </view>
      </view>
    </view>

    <view class="demo-group">
      <text class="demo-group__title">
        {{ t('components.button.sections.sizes') }}
      </text>
      <view class="demo-row">
        <view v-for="item in sizeDemos" :key="item.key" class="demo-card">
          <FrameButton v-bind="item.props">
            {{ item.label }}
          </FrameButton>
          <text class="demo-card__label">
            {{ item.label }}
          </text>
        </view>
      </view>
    </view>

    <view class="api-panel">
      <text class="api-panel__title">
        {{ t('components.button.sections.api') }}
      </text>
      <view class="api-list">
        <view v-for="item in apiItems" :key="item.key" class="api-card">
          <text class="api-card__name">
            {{ item.name }}
          </text>
          <text class="api-card__desc">
            {{ item.desc }}
          </text>
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
  { key: 'solid', label: t('components.button.variants.solid'), props: { theme: 'primary', variant: 'solid' } },
  { key: 'outline', label: t('components.button.variants.outline'), props: { theme: 'primary', variant: 'outline' } },
  { key: 'ghost', label: t('components.button.variants.ghost'), props: { theme: 'primary', variant: 'ghost' } },
  { key: 'text', label: t('components.button.variants.text'), props: { theme: 'primary', variant: 'text' } },
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

<style scoped lang="scss">
.component-page {
  min-height: 100vh;
  padding: 48rpx 32rpx 120rpx;
  background-color: var(--theme-bg-color);
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.component-hero {
  padding: 40rpx 36rpx;
  border-radius: 40rpx;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(29, 78, 216, 0.92));
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 18rpx;
  box-shadow: var(--theme-shadow-soft);
}

.component-hero__eyebrow {
  letter-spacing: 4rpx;
  font-size: 22rpx;
  opacity: 0.7;
}

.component-hero__title {
  font-size: 40rpx;
  font-weight: 700;
}

.component-hero__desc {
  font-size: 26rpx;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
}

.component-hero__preview {
  margin-top: 16rpx;
}

.demo-group {
  padding: 36rpx;
  border-radius: 32rpx;
  background-color: var(--theme-surface-color);
  box-shadow: var(--theme-shadow-soft);
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.demo-group__title {
  font-size: 30rpx;
  font-weight: 600;
  color: var(--theme-main-color);
}

.demo-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200rpx, 1fr));
  gap: 24rpx;
}

.demo-card {
  padding: 24rpx;
  border-radius: 24rpx;
  border: 2rpx solid var(--theme-border-color);
  background-color: var(--theme-surface-muted);
  display: flex;
  flex-direction: column;
  gap: 18rpx;
  align-items: center;
}

.demo-card__label {
  font-size: 24rpx;
  color: var(--theme-content-color);
}

.api-panel {
  padding: 36rpx;
  border-radius: 32rpx;
  background-color: var(--theme-surface-color);
  box-shadow: var(--theme-shadow-soft);
}

.api-panel__title {
  font-size: 32rpx;
  font-weight: 600;
  color: var(--theme-main-color);
}

.api-list {
  margin-top: 24rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.api-card {
  padding: 20rpx 24rpx;
  border-radius: 24rpx;
  border: 2rpx solid var(--theme-border-color);
  background-color: var(--theme-surface-muted);
}

.api-card__name {
  font-size: 26rpx;
  font-weight: 600;
  color: var(--theme-main-color);
}

.api-card__desc {
  font-size: 24rpx;
  color: var(--theme-content-color);
  margin-top: 6rpx;
}
</style>
