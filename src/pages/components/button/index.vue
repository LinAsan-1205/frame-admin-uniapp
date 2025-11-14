<template>
  <DemoPage :title="heroTitle" :description="heroDesc">
    <!-- 预览 -->
    <view style="padding: 0 32rpx;">
      <FrameButton theme="primary" size="large" block>
        {{ heroTitle }}
      </FrameButton>
    </view>

    <!-- 变体展示 -->
    <DemoSection :title="t('components.button.sections.variants')" :grid="true">
      <DemoCard v-for="item in variantDemos" :key="item.key" :label="item.label">
        <FrameButton v-bind="item.props">
          {{ item.label }}
        </FrameButton>
      </DemoCard>
    </DemoSection>

    <!-- 状态展示 -->
    <DemoSection :title="t('components.button.sections.states')" :grid="true">
      <DemoCard v-for="item in stateDemos" :key="item.key" :label="item.label">
        <FrameButton v-bind="item.props">
          {{ item.label }}
        </FrameButton>
      </DemoCard>
    </DemoSection>

    <!-- 尺寸展示 -->
    <DemoSection :title="t('components.button.sections.sizes')" :grid="true">
      <DemoCard v-for="item in sizeDemos" :key="item.key" :label="item.label">
        <FrameButton v-bind="item.props">
          {{ item.label }}
        </FrameButton>
      </DemoCard>
    </DemoSection>

    <!-- API 文档 -->
    <DemoSection :title="t('components.button.sections.api')" :grid="true">
      <ApiItem
        v-for="item in apiItems"
        :key="item.key"
        :name="item.name"
        :description="item.desc"
      />
    </DemoSection>
  </DemoPage>
</template>

<script setup lang="ts">
import type { FrameButtonProps } from '@/uni_modules/frame-uniapp-ui';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { FrameButton } from '@/uni_modules/frame-uniapp-ui';
import DemoPage from '@/components/DemoPage.vue';
import DemoSection from '@/components/DemoSection.vue';
import DemoCard from '@/components/DemoCard.vue';
import ApiItem from '@/components/ApiItem.vue';

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
