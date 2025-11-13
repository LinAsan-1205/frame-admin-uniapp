<template>
  <view class="home-page">
    <view class="home-card">
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

      <image class="logo" src="@/static/images/logo.png" mode="aspectFit" />
      <text class="title">
        {{ t('home.title') }}
      </text>
      <text class="subtitle">
        {{ t('home.subtitle') }}
      </text>

      <view class="feature-list">
        <view
          v-for="feature in features"
          :key="feature"
          class="feature-item"
        >
          <view class="dot" />
          <text>{{ feature }}</text>
        </view>
      </view>

      <view class="actions">
        <view
          v-for="action in actions"
          :key="action.label"
          class="action-button"
          :class="action.theme"
          @click="handleAction(action)"
        >
          {{ action.label }}
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
interface ActionItem {
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

const features = computed(() => [
  t('home.features.layout'),
  t('home.features.permission'),
  t('home.features.request'),
  t('home.features.hooks'),
  t('home.features.i18n'),
]);

const actions = computed<ActionItem[]>(() => [
  {
    label: t('home.actions.docs'),
    type: 'link',
    url: 'https://uniapp.dcloud.net.cn/',
    theme: 'green',
  },
  {
    label: t('home.actions.repo'),
    type: 'link',
    url: 'https://github.com/oyjt/uniapp-vue3-template',
    theme: 'blue',
  },
  {
    label: t('home.actions.privacy'),
    type: 'privacy',
    theme: 'neutral',
  },
]);

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
  padding: 80rpx 32rpx 120rpx;
  background: linear-gradient(135deg, #f4f7fb 0%, #e0ecff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-card {
  width: 100%;
  max-width: 480px;
  padding: 64rpx 48rpx;
  border-radius: 40rpx;
  background-color: #ffffff;
  box-shadow: 0 32rpx 80rpx rgba(15, 23, 42, 0.08);
  text-align: center;
}

.language-switch {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12rpx 28rpx;
  border-radius: 999rpx;
  background-color: #f1f5f9;
  font-size: 24rpx;
  margin-bottom: 32rpx;
  color: #475569;
}

.language-label {
  font-weight: 500;
}

.language-value {
  font-size: 26rpx;
  font-weight: 600;
  color: #111827;
}

.language-action {
  font-size: 24rpx;
  color: #2563eb;
}

.logo {
  width: 180rpx;
  height: 180rpx;
  margin-bottom: 40rpx;
}

.title {
  display: block;
  font-size: 40rpx;
  font-weight: 600;
  color: #111827;
}

.subtitle {
  display: block;
  margin-top: 20rpx;
  font-size: 28rpx;
  line-height: 1.6;
  color: #6b7280;
}

.feature-list {
  margin-top: 48rpx;
  border-top: 1px solid #f1f5f9;
  border-bottom: 1px solid #f1f5f9;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding: 28rpx 0;
  font-size: 28rpx;
  color: #374151;
}

.feature-item + .feature-item {
  border-top: 1px solid #f1f5f9;
}

.dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background: linear-gradient(120deg, #21d59d, #3c9cff);
}

.actions {
  margin-top: 48rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.action-button {
  padding: 28rpx;
  border-radius: 999rpx;
  font-size: 30rpx;
  font-weight: 500;
  color: #ffffff;
}

.action-button.green {
  background: linear-gradient(120deg, #21d59d, #16a34a);
}

.action-button.blue {
  background: linear-gradient(120deg, #3c9cff, #2563eb);
}

.action-button.neutral {
  background: #0f172a;
}
</style>
