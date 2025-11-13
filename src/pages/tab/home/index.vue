<template>
  <view class="home-page">
    <!-- 顶部栏 -->
    <view class="home-header">
      <view class="home-header__content">
        <view class="home-header__info">
          <text class="home-header__title">frame-uniapp-ui</text>
          <text class="home-header__subtitle">{{ t('home.library.description') }}</text>
        </view>
        <view class="home-header__actions">
          <view class="theme-switch" @click="toggleTheme">
            <text class="theme-switch__icon">{{ isDark ? '🌙' : '☀️' }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 基础组件 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">基础组件</text>
        <text class="section-subtitle">常用的基础UI组件</text>
      </view>
      <view class="component-grid">
        <view
          v-for="card in basicComponents"
          :key="card.key"
          class="component-item"
          @click="goComponent(card)"
        >
          <view class="component-item__header">
            <text class="component-item__name">{{ card.name }}</text>
            <text v-if="card.badge" class="component-item__badge">{{ card.badge }}</text>
          </view>
          <text class="component-item__desc">{{ card.desc }}</text>
          <view class="component-item__preview">
            <FrameButton v-bind="card.preview" size="small">
              {{ card.previewText }}
            </FrameButton>
          </view>
        </view>
      </view>
    </view>

    <!-- 表单组件 -->
    <view v-if="formComponents.length > 0" class="section">
      <view class="section-header">
        <text class="section-title">表单组件</text>
        <text class="section-subtitle">用于数据录入和表单交互</text>
      </view>
      <view class="component-grid">
        <view
          v-for="card in formComponents"
          :key="card.key"
          class="component-item"
          @click="goComponent(card)"
        >
          <view class="component-item__header">
            <text class="component-item__name">{{ card.name }}</text>
            <text v-if="card.badge" class="component-item__badge">{{ card.badge }}</text>
          </view>
          <text class="component-item__desc">{{ card.desc }}</text>
          <view class="component-item__preview">
            <FrameButton v-bind="card.preview" size="small">
              {{ card.previewText }}
            </FrameButton>
          </view>
        </view>
      </view>
    </view>

    <!-- 反馈组件 -->
    <view v-if="feedbackComponents.length > 0" class="section">
      <view class="section-header">
        <text class="section-title">反馈组件</text>
        <text class="section-subtitle">用于向用户展示反馈信息</text>
      </view>
      <view class="component-grid">
        <view
          v-for="card in feedbackComponents"
          :key="card.key"
          class="component-item"
          @click="goComponent(card)"
        >
          <view class="component-item__header">
            <text class="component-item__name">{{ card.name }}</text>
            <text v-if="card.badge" class="component-item__badge">{{ card.badge }}</text>
          </view>
          <text class="component-item__desc">{{ card.desc }}</text>
          <view class="component-item__preview">
            <FrameButton v-bind="card.preview" size="small">
              {{ card.previewText }}
            </FrameButton>
          </view>
        </view>
      </view>
    </view>

    <!-- 数据展示 -->
    <view v-if="dataComponents.length > 0" class="section">
      <view class="section-header">
        <text class="section-title">数据展示</text>
        <text class="section-subtitle">用于数据展示和可视化</text>
      </view>
      <view class="component-grid">
        <view
          v-for="card in dataComponents"
          :key="card.key"
          class="component-item"
          @click="goComponent(card)"
        >
          <view class="component-item__header">
            <text class="component-item__name">{{ card.name }}</text>
            <text v-if="card.badge" class="component-item__badge">{{ card.badge }}</text>
          </view>
          <text class="component-item__desc">{{ card.desc }}</text>
          <view class="component-item__preview">
            <FrameButton v-bind="card.preview" size="small">
              {{ card.previewText }}
            </FrameButton>
          </view>
        </view>
      </view>
    </view>

    <!-- 隐私协议弹窗 -->
    <AgreePrivacy
      v-model="showPrivacy"
      :title="privacyTitle"
      :sub-title="privacySubTitle"
      :confirm-text="t('home.privacy.confirm')"
      :cancel-text="t('home.privacy.cancel')"
      @agree="handleAgree"
      @disagree="handleDisagree"
    />
  </view>
</template>

<script setup lang="ts">
import type { FrameButtonProps } from '@/uni_modules/frame-uniapp-ui';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import AgreePrivacy from '@/components/agree-privacy/index.vue';
import { useTheme } from '@/hooks';
import { FrameButton } from '@/uni_modules/frame-uniapp-ui';

interface ComponentCardItem {
  key: string;
  name: string;
  desc: string;
  badge?: string;
  path: string;
  previewText: string;
  preview: FrameButtonProps;
  category: 'basic' | 'form' | 'feedback' | 'data';
}

const showPrivacy = ref(false);
const { t } = useI18n();
const { isDark, toggleTheme } = useTheme();

// 所有组件配置
const allComponents = computed<ComponentCardItem[]>(() => [
  {
    key: 'button',
    name: t('home.components.button.name'),
    desc: t('home.components.button.desc'),
    badge: t('home.components.badgeNew'),
    path: '/pages/components/button/index',
    previewText: t('home.components.button.name'),
    preview: {
      theme: 'primary',
      variant: 'base',
      shape: 'pill',
    },
    category: 'basic',
  },
  // 未来可以在这里添加更多组件
]);

// 按分类筛选组件
const basicComponents = computed(() =>
  allComponents.value.filter(c => c.category === 'basic'),
);

const formComponents = computed(() =>
  allComponents.value.filter(c => c.category === 'form'),
);

const feedbackComponents = computed(() =>
  allComponents.value.filter(c => c.category === 'feedback'),
);

const dataComponents = computed(() =>
  allComponents.value.filter(c => c.category === 'data'),
);

const privacyTitle = computed(() => t('home.privacy.title'));
const privacySubTitle = computed(() => t('home.privacy.subtitle'));

function goComponent(card: { path: string }) {
  uni.navigateTo({ url: card.path });
}

function handleAgree() {
  uni.showToast({
    title: t('home.privacy.agreeTip'),
    icon: 'none',
  });
}

function handleDisagree() {
  uni.showToast({
    title: t('home.privacy.disagreeTip'),
    icon: 'none',
  });
}
</script>

<style scoped>
/* 页面容器 */
.home-page {
  min-height: 100vh;
  background: var(--fui-color-bg-primary);
}

/* 顶部栏 */
.home-header {
  padding: 48rpx 32rpx 32rpx;
  background: var(--fui-color-surface);
  border-bottom: 1rpx solid var(--fui-color-border);
}

.home-header__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24rpx;
}

.home-header__info {
  flex: 1;
  min-width: 0;
}

.home-header__title {
  display: block;
  font-size: 32rpx;
  font-weight: 700;
  color: var(--fui-color-text-primary);
  margin-bottom: 8rpx;
}

.home-header__subtitle {
  display: block;
  font-size: 24rpx;
  color: var(--fui-color-text-secondary);
  line-height: 1.5;
}

.home-header__actions {
  flex-shrink: 0;
}

/* 主题切换器 */
.theme-switch {
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
  background: var(--fui-color-surface-muted);
  border: 2rpx solid var(--fui-color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 200ms ease;
  cursor: pointer;
}

.theme-switch:active {
  transform: scale(0.95);
  background: var(--fui-color-bg-secondary);
}

.theme-switch__icon {
  font-size: 32rpx;
}

/* 分区 */
.section {
  padding: 40rpx 32rpx;
}

.section-header {
  margin-bottom: 24rpx;
}

.section-title {
  display: block;
  font-size: 28rpx;
  font-weight: 700;
  color: var(--fui-color-text-primary);
  margin-bottom: 8rpx;
}

.section-subtitle {
  display: block;
  font-size: 24rpx;
  color: var(--fui-color-text-tertiary);
}

/* 组件网格 */
.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300rpx, 1fr));
  gap: 20rpx;
}

/* 组件卡片 */
.component-item {
  padding: 24rpx;
  border-radius: 20rpx;
  background: var(--fui-color-surface);
  border: 1rpx solid var(--fui-color-border);
  transition: all 250ms ease;
  cursor: pointer;
}

.component-item:active {
  transform: translateY(-2rpx);
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.08);
  border-color: var(--fui-color-primary);
}

.component-item__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12rpx;
  margin-bottom: 12rpx;
}

.component-item__name {
  font-size: 28rpx;
  font-weight: 600;
  color: var(--theme-main-color);
  flex: 1;
  min-width: 0;
}

.component-item__badge {
  padding: 6rpx 16rpx;
  border-radius: 999rpx;
  font-size: 22rpx;
  font-weight: 600;
  color: #ffffff;
  background: var(--theme-primary);
  flex-shrink: 0;
}

.component-item__desc {
  display: block;
  font-size: 24rpx;
  color: var(--theme-content-color);
  line-height: 1.5;
  margin-bottom: 16rpx;
}

.component-item__preview {
  display: flex;
  justify-content: flex-end;
}

/* 响应式 */
@media (max-width: 600px) {
  .component-grid {
    grid-template-columns: 1fr;
  }
}
</style>
