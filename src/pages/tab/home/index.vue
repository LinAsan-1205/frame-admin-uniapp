<template>
  <view class="home">
    <view class="home__hero">
      <view class="home__badge">
        {{ t('home.library.badge') }}
      </view>
      <text class="home__name">
        frame-uniapp-ui
      </text>
      <text class="home__title">
        {{ t('home.library.title') }}
      </text>
      <text class="home__subtitle">
        {{ t('home.library.description') }}
      </text>

      <view class="home__theme-toggle">
        <text class="home__theme-label">
          {{ t('home.themeToggle.label') }}
        </text>
        <FrameButton
          variant="ghost"
          :theme="isDark ? 'warning' : 'primary'"
          size="small"
          @click="toggleTheme"
        >
          {{ isDark ? t('home.themeToggle.light') : t('home.themeToggle.dark') }}
        </FrameButton>
      </view>

      <view class="home__actions">
        <FrameButton
          v-for="action in primaryActions"
          :key="action.key"
          variant="solid"
          :theme="action.theme"
          size="large"
          @click="handleAction(action)"
        >
          {{ action.label }}
        </FrameButton>
      </view>

      <view class="home__highlight-grid">
        <view
          v-for="highlight in libraryHighlights"
          :key="highlight.key"
          class="highlight-card"
        >
          <text class="highlight-card__title">
            {{ highlight.title }}
          </text>
          <text class="highlight-card__desc">
            {{ highlight.desc }}
          </text>
        </view>
      </view>
    </view>

    <view class="home__panel">
      <view class="home__panel-header">
        <text class="home__panel-title">
          {{ t('home.components.title') }}
        </text>
        <text class="home__panel-desc">
          {{ t('home.components.subtitle') }}
        </text>
      </view>
      <view class="component-grid">
        <view
          v-for="card in componentCards"
          :key="card.key"
          class="component-card"
          @click="goComponent(card)"
        >
          <view class="component-card__header">
            <text class="component-card__name">
              {{ card.name }}
            </text>
            <text class="component-card__badge">
              {{ card.badge }}
            </text>
          </view>
          <text class="component-card__desc">
            {{ card.desc }}
          </text>
          <view class="component-card__preview">
            <FrameButton v-bind="card.preview">
              {{ card.previewText }}
            </FrameButton>
          </view>
        </view>
      </view>
    </view>

    <view class="home__links">
      <view
        v-for="action in secondaryActions"
        :key="action.key"
        class="link-card"
        @click="handleAction(action)"
      >
        <view class="link-card__meta">
          <text class="link-card__label">
            {{ action.label }}
          </text>
          <text class="link-card__tag">
            {{ action.meta }}
          </text>
        </view>
        <text class="link-card__cta">
          {{ t('home.actions.open') }}
        </text>
      </view>
    </view>

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
import { useClipboard, useTheme } from '@/hooks';
import { FrameButton } from '@/uni_modules/frame-uniapp-ui';

type ActionType = 'link' | 'privacy';
type ActionKey = 'docs' | 'repo' | 'privacy';
interface ActionItem {
  key: ActionKey;
  label: string;
  type: ActionType;
  url?: string;
  theme: 'primary' | 'success' | 'default';
  meta: string;
}

interface ComponentCardItem {
  key: string;
  name: string;
  desc: string;
  badge: string;
  path: string;
  previewText: string;
  preview: FrameButtonProps;
}

const showPrivacy = ref(false);
const { setClipboardData } = useClipboard();
const { t } = useI18n();
const { isDark, toggleTheme } = useTheme();

const highlightKeys = ['design', 'theme', 'quality'] as const;

const libraryHighlights = computed(() =>
  highlightKeys.map(key => ({
    key,
    title: t(`home.library.highlights.titles.${key}`),
    desc: t(`home.library.highlights.${key}`),
  })),
);

const actions = computed<ActionItem[]>(() => [
  {
    key: 'docs',
    label: t('home.actions.docs'),
    type: 'link',
    url: 'https://uniapp.dcloud.net.cn/',
    theme: 'primary',
    meta: 'uni-app',
  },
  {
    key: 'repo',
    label: t('home.actions.repo'),
    type: 'link',
    url: 'https://github.com/oyjt/uniapp-vue3-template',
    theme: 'success',
    meta: 'GitHub',
  },
  {
    key: 'privacy',
    label: t('home.actions.privacy'),
    type: 'privacy',
    theme: 'default',
    meta: 'Modal',
  },
]);

const primaryActions = computed(() => actions.value.filter(action => action.type === 'link'));
const secondaryActions = computed(() => actions.value);

const componentCards = computed<ComponentCardItem[]>(() => [
  {
    key: 'button',
    name: t('home.components.button.name'),
    desc: t('home.components.button.desc'),
    badge: t('home.components.badgeNew'),
    path: '/pages/components/button/index',
    previewText: t('home.components.button.name'),
    preview: {
      theme: 'primary',
      variant: 'solid',
      size: 'medium',
      shape: 'pill',
    },
  },
]);

const privacyTitle = computed(() => t('home.privacy.title'));
const privacySubTitle = computed(() => t('home.privacy.subtitle'));

async function openLink(url?: string) {
  if (!url) {
    return;
  }

  if (typeof window !== 'undefined' && typeof window.open === 'function') {
    window.open(url, '_blank');
    return;
  }

  await setClipboardData({ data: url });
  uni.showToast({
    title: t('home.actions.copyTip'),
    icon: 'none',
  });
}

function handleAction(action: ActionItem) {
  if (action.type === 'privacy') {
    showPrivacy.value = true;
    return;
  }
  if (action.type === 'link') {
    openLink(action.url);
  }
}

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

<style scoped lang="scss">
.home {
  min-height: 100vh;
  padding: 64rpx 32rpx 120rpx;
  background: radial-gradient(circle at 20% 20%, rgba(79, 70, 229, 0.12), transparent 60%),
    radial-gradient(circle at 80% 0%, rgba(59, 130, 246, 0.16), transparent 50%),
    var(--theme-bg-color);
  display: flex;
  flex-direction: column;
  gap: 40rpx;
}

.home__hero {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  padding: 48rpx 36rpx;
  border-radius: 40rpx;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(15, 118, 110, 0.9));
  color: #fff;
  box-shadow: var(--theme-shadow-soft);
}

.home__badge {
  align-self: flex-start;
  padding: 8rpx 22rpx;
  border-radius: 999rpx;
  background-color: rgba(255, 255, 255, 0.12);
  font-size: 22rpx;
  letter-spacing: 2rpx;
  text-transform: uppercase;
}

.home__name {
  font-size: 24rpx;
  letter-spacing: 4rpx;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}

.home__title {
  font-size: 44rpx;
  font-weight: 700;
}

.home__subtitle {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.home__theme-toggle {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.home__theme-label {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
}

.home__actions {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.home__highlight-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180rpx, 1fr));
  gap: 20rpx;
}

.highlight-card {
  padding: 24rpx;
  border-radius: 24rpx;
  background-color: rgba(255, 255, 255, 0.12);
}

.highlight-card__title {
  display: block;
  font-size: 26rpx;
  font-weight: 600;
}

.highlight-card__desc {
  display: block;
  margin-top: 10rpx;
  font-size: 24rpx;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.8);
}

.home__panel {
  padding: 40rpx 36rpx;
  border-radius: 36rpx;
  background-color: var(--theme-surface-color);
  box-shadow: var(--theme-shadow-soft);
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.home__panel-header {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.home__panel-title {
  font-size: 34rpx;
  font-weight: 600;
  color: var(--theme-main-color);
}

.home__panel-desc {
  font-size: 26rpx;
  color: var(--theme-content-color);
}

.component-grid {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.component-card {
  padding: 28rpx;
  border-radius: 32rpx;
  background: var(--theme-surface-muted);
  border: 2rpx solid var(--theme-border-color);
  display: flex;
  flex-direction: column;
  gap: 18rpx;
}

.component-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16rpx;
}

.component-card__name {
  font-size: 32rpx;
  font-weight: 600;
  color: var(--theme-main-color);
}

.component-card__badge {
  padding: 6rpx 18rpx;
  border-radius: 999rpx;
  font-size: 22rpx;
  color: var(--theme-primary);
  background-color: rgba(37, 99, 235, 0.16);
}

.component-card__desc {
  font-size: 26rpx;
  color: var(--theme-content-color);
  line-height: 1.5;
}

.component-card__preview {
  padding: 24rpx;
  border-radius: 24rpx;
  background-color: var(--theme-surface-color);
  display: flex;
  justify-content: center;
}

.home__links {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.link-card {
  padding: 28rpx 32rpx;
  border-radius: 28rpx;
  background: var(--theme-surface-color);
  border: 2rpx solid var(--theme-border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.link-card__meta {
  display: flex;
  flex-direction: column;
}

.link-card__label {
  font-size: 30rpx;
  font-weight: 600;
  color: var(--theme-main-color);
}

.link-card__tag {
  font-size: 24rpx;
  color: var(--theme-content-color);
}

.link-card__cta {
  font-size: 24rpx;
  color: var(--theme-primary);
}

@media (min-width: 600px) {
  .home__actions {
    flex-direction: row;
  }

  .component-grid {
    flex-direction: row;
  }

  .component-card {
    flex: 1;
  }
}
</style>
