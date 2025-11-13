<template>
  <view class="home-page">
    <view class="hero-card">
      <view class="hero-top">
        <view class="badge-group">
          <text
            v-for="badge in heroBadges"
            :key="badge.key"
            class="hero-badge"
            :class="badge.tone"
          >
            {{ badge.text }}
          </text>
        </view>
        <view class="language-switch" @click="toggleLocale">
          <text class="language-label">
            {{ t('home.localeLabel') }}
          </text>
          <text class="language-value">
            {{ currentLocaleName }}
          </text>
          <text class="language-action">
            {{ nextLocaleLabel }}
          </text>
        </view>
      </view>

      <view class="hero-body">
        <image class="hero-logo" src="@/static/images/logo.png" mode="aspectFit" />
        <view class="hero-text">
          <text class="title">
            {{ t('home.title') }}
          </text>
          <text class="subtitle">
            {{ t('home.subtitle') }}
          </text>
        </view>
      </view>

      <view class="stat-list">
        <view
          v-for="stat in stats"
          :key="stat.key"
          class="stat-card"
        >
          <text class="stat-value">
            {{ stat.value }}
          </text>
          <text class="stat-label">
            {{ stat.label }}
          </text>
          <text class="stat-helper">
            {{ stat.helper }}
          </text>
        </view>
      </view>
    </view>

    <view class="panel">
      <view class="panel-header">
        <text class="panel-title">
          {{ t('home.sections.features') }}
        </text>
        <text class="panel-subtitle">
          {{ t('home.sections.featuresSub') }}
        </text>
      </view>
      <view class="feature-grid">
        <view
          v-for="feature in featureCards"
          :key="feature.key"
          class="feature-card"
        >
          <view class="feature-icon" :class="feature.tone">
            <view class="icon-dot" />
          </view>
          <view class="feature-meta">
            <text class="feature-title">
              {{ feature.title }}
            </text>
            <text class="feature-desc">
              {{ feature.desc }}
            </text>
          </view>
        </view>
      </view>
    </view>

    <view class="panel">
      <view class="panel-header">
        <text class="panel-title">
          {{ t('home.sections.resources') }}
        </text>
        <text class="panel-subtitle">
          {{ t('home.sections.resourcesSub') }}
        </text>
      </view>

      <view class="resource-list">
        <view
          v-for="action in linkActions"
          :key="action.key"
          class="resource-card"
        >
          <view class="resource-info">
            <text class="resource-title">
              {{ action.label }}
            </text>
            <text class="resource-desc">
              {{ actionDescriptions[action.key] }}
            </text>
          </view>
          <view class="resource-trigger" :class="action.theme" @click="handleAction(action)">
            {{ t('home.actions.open') }}
          </view>
        </view>
      </view>
    </view>

    <view class="cta-panel">
      <text class="cta-title">
        {{ t('home.sections.ctaTitle') }}
      </text>
      <text class="cta-text">
        {{ t('home.sections.ctaSubtitle') }}
      </text>
      <view class="cta-actions">
        <view
          v-for="(action, index) in topLinkActions"
          :key="action.key"
          class="cta-button"
          :class="index === 0 ? 'primary' : 'secondary'"
          @click="handleAction(action)"
        >
          {{ action.label }}
        </view>
        <view
          v-if="privacyAction"
          class="cta-button ghost"
          @click="handleAction(privacyAction)"
        >
          {{ privacyAction.label }}
        </view>
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
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import AgreePrivacy from '@/components/agree-privacy/index.vue';
import { useClipboard } from '@/hooks';

type ActionType = 'link' | 'privacy';
type ActionKey = 'docs' | 'repo' | 'privacy';
interface ActionItem {
  key: ActionKey;
  label: string;
  type: ActionType;
  url?: string;
  theme: 'green' | 'blue' | 'neutral';
}

const showPrivacy = ref(false);
const { setClipboardData } = useClipboard();
const { t, locale } = useI18n();

const localeNameMap = computed(() => ({
  'zh-Hans': '简体中文',
  'en': 'English',
}));

const currentLocaleName = computed(() => localeNameMap.value[locale.value as 'zh-Hans' | 'en'] || locale.value);

const nextLocaleLabel = computed(() =>
  locale.value === 'zh-Hans' ? t('home.localeToggle', { lang: 'English' }) : t('home.localeToggle', { lang: '中文' }),
);

const heroBadges = computed(() => [
  { key: 'stable', text: t('home.badges.stable'), tone: 'primary' },
  { key: 'modern', text: t('home.badges.modern'), tone: 'ghost' },
]);

const stats = computed(() => [
  {
    key: 'request',
    label: t('home.stats.request.label'),
    value: t('home.stats.request.value'),
    helper: t('home.stats.request.desc'),
  },
  {
    key: 'hooks',
    label: t('home.stats.hooks.label'),
    value: t('home.stats.hooks.value'),
    helper: t('home.stats.hooks.desc'),
  },
  {
    key: 'i18n',
    label: t('home.stats.i18n.label'),
    value: t('home.stats.i18n.value'),
    helper: t('home.stats.i18n.desc'),
  },
]);

const featureCards = computed(() => [
  {
    key: 'layout',
    title: t('home.features.layout'),
    desc: t('home.featureDescriptions.layout'),
    tone: 'teal',
  },
  {
    key: 'permission',
    title: t('home.features.permission'),
    desc: t('home.featureDescriptions.permission'),
    tone: 'blue',
  },
  {
    key: 'request',
    title: t('home.features.request'),
    desc: t('home.featureDescriptions.request'),
    tone: 'green',
  },
  {
    key: 'hooks',
    title: t('home.features.hooks'),
    desc: t('home.featureDescriptions.hooks'),
    tone: 'purple',
  },
  {
    key: 'i18n',
    title: t('home.features.i18n'),
    desc: t('home.featureDescriptions.i18n'),
    tone: 'orange',
  },
]);

const actions = computed<ActionItem[]>(() => [
  {
    key: 'docs',
    label: t('home.actions.docs'),
    type: 'link',
    url: 'https://uniapp.dcloud.net.cn/',
    theme: 'green',
  },
  {
    key: 'repo',
    label: t('home.actions.repo'),
    type: 'link',
    url: 'https://github.com/oyjt/uniapp-vue3-template',
    theme: 'blue',
  },
  {
    key: 'privacy',
    label: t('home.actions.privacy'),
    type: 'privacy',
    theme: 'neutral',
  },
]);

const actionDescriptions = computed<Record<ActionKey, string>>(() => ({
  docs: t('home.actionDescriptions.docs'),
  repo: t('home.actionDescriptions.repo'),
  privacy: t('home.actionDescriptions.privacy'),
}));

const linkActions = computed(() => actions.value.filter(action => action.type === 'link'));
const topLinkActions = computed(() => linkActions.value.slice(0, 2));
const privacyAction = computed(() => actions.value.find(action => action.type === 'privacy'));

const privacyTitle = computed(() => t('home.privacy.title'));
const privacySubTitle = computed(() => t('home.privacy.subtitle'));

function toggleLocale() {
  locale.value = locale.value === 'zh-Hans' ? 'en' : 'zh-Hans';
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

async function openLink(url: string) {
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
  if (action.type === 'link' && action.url) {
    openLink(action.url);
  }
}
</script>

<style scoped lang="scss">
.home-page {
  min-height: 100vh;
  padding: 80rpx 32rpx 140rpx;
  background: radial-gradient(circle at top, #f4f9ff, #e7eef9 45%, #dde7ff);
  display: flex;
  flex-direction: column;
  gap: 40rpx;
}

.hero-card {
  padding: 48rpx 40rpx 40rpx;
  border-radius: 48rpx;
  background: linear-gradient(135deg, #0f172a, #1d4ed8);
  color: #ffffff;
  box-shadow: 0 30rpx 80rpx rgba(15, 23, 42, 0.25);
}

.hero-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24rpx;
}

.badge-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
}

.hero-badge {
  padding: 10rpx 24rpx;
  border-radius: 999rpx;
  font-size: 22rpx;
  font-weight: 500;
}

.hero-badge.primary {
  background: rgba(255, 255, 255, 0.18);
}

.hero-badge.ghost {
  border: 1rpx solid rgba(255, 255, 255, 0.35);
}

.language-switch {
  display: flex;
  align-items: center;
  gap: 12rpx;
  padding: 12rpx 28rpx;
  border-radius: 999rpx;
  background-color: rgba(255, 255, 255, 0.12);
  font-size: 24rpx;
  color: #dbeafe;
}

.language-label {
  font-weight: 500;
}

.language-value {
  font-size: 26rpx;
  font-weight: 600;
  color: #ffffff;
}

.language-action {
  font-size: 24rpx;
  color: #a5b4fc;
}

.hero-body {
  display: flex;
  align-items: center;
  gap: 32rpx;
  margin-top: 32rpx;
}

.hero-logo {
  width: 160rpx;
  height: 160rpx;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 32rpx;
  padding: 20rpx;
}

.hero-text .title {
  display: block;
  font-size: 44rpx;
  font-weight: 600;
}

.hero-text .subtitle {
  display: block;
  margin-top: 16rpx;
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
}

.stat-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20rpx;
  margin-top: 40rpx;
}

.stat-card {
  padding: 24rpx;
  border-radius: 28rpx;
  background-color: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(6rpx);
}

.stat-value {
  display: block;
  font-size: 30rpx;
  font-weight: 600;
}

.stat-label {
  display: block;
  margin-top: 8rpx;
  font-size: 24rpx;
}

.stat-helper {
  display: block;
  margin-top: 6rpx;
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.7);
}

.panel {
  padding: 40rpx 36rpx;
  border-radius: 36rpx;
  background-color: #ffffff;
  box-shadow: 0 20rpx 60rpx rgba(15, 23, 42, 0.08);
}

.panel-header {
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}

.panel-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #0f172a;
}

.panel-subtitle {
  font-size: 26rpx;
  color: #6b7280;
}

.feature-grid {
  margin-top: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.feature-card {
  display: flex;
  gap: 20rpx;
  align-items: center;
}

.feature-icon {
  width: 72rpx;
  height: 72rpx;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e2e8f0;
}

.feature-icon .icon-dot {
  width: 20rpx;
  height: 20rpx;
  border-radius: 50%;
  background-color: #0f172a;
}

.feature-icon.teal {
  background: rgba(16, 185, 129, 0.15);
}

.feature-icon.blue {
  background: rgba(59, 130, 246, 0.15);
}

.feature-icon.green {
  background: rgba(52, 211, 153, 0.2);
}

.feature-icon.purple {
  background: rgba(147, 51, 234, 0.16);
}

.feature-icon.orange {
  background: rgba(249, 115, 22, 0.18);
}

.feature-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #0f172a;
}

.feature-desc {
  display: block;
  margin-top: 6rpx;
  font-size: 26rpx;
  color: #6b7280;
  line-height: 1.5;
}

.resource-list {
  margin-top: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.resource-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24rpx;
  padding: 28rpx 32rpx;
  border-radius: 28rpx;
  background-color: #f8fafc;
}

.resource-info {
  flex: 1;
}

.resource-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #111827;
}

.resource-desc {
  display: block;
  margin-top: 8rpx;
  font-size: 24rpx;
  color: #6b7280;
}

.resource-trigger {
  padding: 18rpx 32rpx;
  border-radius: 999rpx;
  font-size: 26rpx;
  font-weight: 500;
  color: #ffffff;
}

.resource-trigger.green {
  background: linear-gradient(120deg, #059669, #10b981);
}

.resource-trigger.blue {
  background: linear-gradient(120deg, #2563eb, #3b82f6);
}

.cta-panel {
  padding: 40rpx 36rpx;
  border-radius: 36rpx;
  background: linear-gradient(135deg, #fef9c3, #fef3c7);
  box-shadow: inset 0 0 0 2rpx rgba(251, 191, 36, 0.4);
  text-align: center;
}

.cta-title {
  display: block;
  font-size: 34rpx;
  font-weight: 600;
  color: #92400e;
}

.cta-text {
  display: block;
  margin-top: 12rpx;
  font-size: 26rpx;
  color: #b45309;
  line-height: 1.6;
}

.cta-actions {
  margin-top: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.cta-button {
  padding: 24rpx;
  border-radius: 24rpx;
  font-size: 28rpx;
  font-weight: 600;
  color: #ffffff;
}

.cta-button.primary {
  background: linear-gradient(120deg, #2563eb, #3b82f6);
}

.cta-button.secondary {
  background: linear-gradient(120deg, #059669, #10b981);
}

.cta-button.ghost {
  background: transparent;
  border: 2rpx solid rgba(15, 23, 42, 0.2);
  color: #92400e;
}
</style>
