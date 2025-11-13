<template>
  <view
    v-if="modelValue"
    class="privacy-mask"
    @touchmove.stop.prevent
  >
    <view class="privacy-card">
      <view class="privacy-header">
        <view>
          <text class="privacy-title">
            {{ initTitle }}
          </text>
          <text class="privacy-subtitle">
            {{ initSubTitle }}
          </text>
        </view>
        <button class="privacy-close" @click="closeAgreePrivacy">
          ✕
        </button>
      </view>

      <scroll-view class="privacy-content" scroll-y>
        <view
          v-for="(item, index) in policyBullets"
          :key="index"
          class="privacy-paragraph"
        >
          <text>{{ item }}</text>
        </view>
        <view class="privacy-paragraph">
          <text>
            <text>查看完整条款可访问 </text>
            <text class="privacy-link" @click="openPrivacyContract">
              {{ initPrivacyContractName }}
            </text>
          </text>
        </view>
      </scroll-view>

      <view class="privacy-actions">
        <button class="privacy-button secondary" @click="disagree">
          {{ cancelText }}
        </button>
        <button
          :id="agreePrivacyId"
          class="privacy-button primary"
          open-type="agreePrivacyAuthorization"
          @agreeprivacyauthorization="agree"
        >
          {{ confirmText }}
        </button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

const props = withDefaults(defineProps<AgreePrivacyProps>(), {
  modelValue: false,
  title: '隐私政策概要',
  subTitle: '',
  disableCheckPrivacy: true,
  agreePrivacyId: 'agree-btn',
  confirmText: '同意并继续',
  cancelText: '暂不使用',
});

const emit = defineEmits(['update:modelValue', 'needPrivacyAuthorization', 'agree', 'disagree']);

declare const wx: any;

interface AgreePrivacyProps {
  modelValue: boolean;
  title?: string;
  subTitle?: string;
  disableCheckPrivacy?: boolean;
  agreePrivacyId?: string;
  confirmText?: string;
  cancelText?: string;
}

const initTitle = ref(props.title);
const initSubTitle = ref('');
const initPrivacyContractName = ref('隐私政策');

const cancelText = computed(() => props.cancelText);
const confirmText = computed(() => props.confirmText);

const policyBullets = computed(() => [
  '1. 为向您提供基础服务，我们会遵循合法、正当、必要的原则收集必要信息。',
  '2. 未经您的授权同意，我们不会将信息共享给第三方或用于未经授权的用途。',
  '3. 您可随时撤回授权或再次查看完整隐私条款。',
]);

function closeAgreePrivacy() {
  emit('update:modelValue', false);
}

function buildDefaultSubTitle() {
  return `亲爱的用户，为确保服务可用并保护您的权益，请认真阅读${initPrivacyContractName.value}，重点了解我们如何收集、使用和存储信息。`;
}

function syncTitle(value?: string) {
  initTitle.value = value || props.title || '隐私政策概要';
}

function syncSubTitle(value?: string) {
  initSubTitle.value = value || props.subTitle || buildDefaultSubTitle();
}

function initData() {
  syncTitle(props.title);
  syncSubTitle(props.subTitle);
}

watch(() => props.title, (value) => {
  syncTitle(value);
});

watch(() => props.subTitle, (value) => {
  syncSubTitle(value);
});

function checkPrivacySetting() {
  if (typeof wx === 'undefined' || typeof wx.getPrivacySetting !== 'function') {
    return;
  }
  wx.getPrivacySetting({
    success: (res: any) => {
      if (res.needAuthorization) {
        initPrivacyContractName.value = res.privacyContractName || initPrivacyContractName.value;
        initData();
        if (!props.disableCheckPrivacy) {
          emit('update:modelValue', true);
        }
      }
    },
    fail: (e: any) => {
      console.error('getPrivacySetting fail:', e);
    },
  });
}

function bindNeedPrivacyAuthorization() {
  if (typeof wx === 'undefined' || typeof wx.onNeedPrivacyAuthorization !== 'function') {
    return;
  }
  wx.onNeedPrivacyAuthorization((resolve: any, eventInfo: any) => {
    emit('update:modelValue', true);
    emit('needPrivacyAuthorization', resolve, eventInfo);
  });
}

function openPrivacyContract() {
  if (typeof wx !== 'undefined' && typeof wx.openPrivacyContract === 'function') {
    wx.openPrivacyContract({
      success: () => {},
      fail: (e: any) => {
        uni.showToast({
          title: `打开失败: ${e.errMsg || e}`,
          icon: 'none',
        });
      },
    });
    return;
  }

  uni.showToast({
    title: '当前平台不支持直接查看，请在小程序中打开',
    icon: 'none',
  });
}

function agree(e: any) {
  const buttonId = e?.target?.id || 'agree-btn';
  emit('agree', buttonId);
  emit('update:modelValue', false);
}

function disagree() {
  emit('disagree');
  closeAgreePrivacy();
}

onMounted(() => {
  initData();
  checkPrivacySetting();
  bindNeedPrivacyAuthorization();
});
</script>

<style scoped lang="scss">
.privacy-mask {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32rpx;
  background-color: rgba(15, 23, 42, 0.55);
}

.privacy-card {
  width: 100%;
  max-width: 640rpx;
  border-radius: 32rpx;
  background-color: #fff;
  padding: 48rpx 36rpx;
  box-shadow: 0 24rpx 80rpx rgba(15, 23, 42, 0.2);
}

.privacy-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24rpx;
}

.privacy-title {
  font-size: 34rpx;
  font-weight: 600;
  color: #0f172a;
}

.privacy-subtitle {
  display: block;
  margin-top: 16rpx;
  font-size: 26rpx;
  line-height: 1.6;
  color: #475569;
}

.privacy-close {
  width: 64rpx;
  height: 64rpx;
  border: none;
  border-radius: 20rpx;
  font-size: 32rpx;
  background-color: #f1f5f9;
  color: #1e293b;
}

.privacy-close::after {
  display: none;
}

.privacy-content {
  max-height: 520rpx;
  margin-top: 36rpx;
  padding-right: 12rpx;
}

.privacy-paragraph {
  margin-bottom: 20rpx;
  font-size: 26rpx;
  line-height: 1.6;
  color: #475569;
}

.privacy-link {
  color: #2563eb;
  text-decoration: underline;
}

.privacy-actions {
  margin-top: 32rpx;
  display: flex;
  gap: 24rpx;
}

.privacy-button {
  flex: 1;
  height: 92rpx;
  border-radius: 999rpx;
  font-size: 28rpx;
  font-weight: 500;
  border: none;
}

.privacy-button::after {
  display: none;
}

.privacy-button.secondary {
  background-color: #f1f5f9;
  color: #1e293b;
}

.privacy-button.primary {
  background: linear-gradient(120deg, #22c55e, #16a34a);
  color: #fff;
}
</style>
