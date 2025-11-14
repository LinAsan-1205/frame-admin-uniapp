<template>
  <DemoPage title="Loading 加载" description="加载提示动画">
    <!-- 动画类型 -->
    <DemoSection title="动画类型" :grid="true">
      <DemoCard label="spinner">
        <frame-loading :show="true" type="spinner" />
      </DemoCard>
      <DemoCard label="circular">
        <frame-loading :show="true" type="circular" color="#2563eb" />
      </DemoCard>
      <DemoCard label="dots">
        <frame-loading :show="true" type="dots" color="#10b981" />
      </DemoCard>
      <DemoCard label="pulse">
        <frame-loading :show="true" type="pulse" color="#f59e0b" />
      </DemoCard>
    </DemoSection>

    <!-- 不同尺寸 -->
    <DemoSection title="不同尺寸">
      <frame-space direction="horizontal" :size="24" align="center">
        <frame-loading :show="true" size="sm" />
        <frame-loading :show="true" size="md" />
        <frame-loading :show="true" size="lg" />
      </frame-space>
    </DemoSection>

    <!-- 带文字 -->
    <DemoSection title="带文字">
      <view class="loading-text-demos">
        <frame-loading :show="true" text="加载中..." />
        <frame-loading :show="true" text="处理中..." type="circular" color="#2563eb" />
        <frame-loading :show="true" text="请稍候..." type="dots" :vertical="true" />
      </view>
    </DemoSection>

    <!-- 全屏加载 -->
    <DemoSection title="全屏加载">
      <frame-space :size="12" :wrap="true">
        <frame-button size="small" @click="showLoading('spinner')">
          Spinner 加载
        </frame-button>
        <frame-button size="small" @click="showLoading('circular')">
          Circular 加载
        </frame-button>
        <frame-button size="small" @click="showLoading('dots')">
          Dots 加载
        </frame-button>
        <frame-button size="small" @click="showLoading('pulse')">
          Pulse 加载
        </frame-button>
      </frame-space>
    </DemoSection>

    <!-- API 属性 -->
    <DemoSection title="API 属性" :grid="true">
      <ApiItem
        name="type"
        type="string"
        description="动画类型：spinner | circular | dots | pulse"
      />
      <ApiItem
        name="size"
        type="string"
        description="尺寸：sm | md | lg"
      />
      <ApiItem
        name="color"
        type="string"
        description="颜色"
      />
      <ApiItem
        name="text"
        type="string"
        description="加载文字"
      />
      <ApiItem
        name="vertical"
        type="boolean"
        description="是否垂直排列"
      />
      <ApiItem
        name="overlay"
        type="boolean"
        description="是否显示遮罩"
      />
    </DemoSection>

    <!-- 全屏 Loading -->
    <frame-loading
      :show="loadingShow"
      :type="loadingType"
      text="加载中..."
      :overlay="true"
    />
  </DemoPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoPage from '@/components/DemoPage.vue';
import DemoSection from '@/components/DemoSection.vue';
import DemoCard from '@/components/DemoCard.vue';
import ApiItem from '@/components/ApiItem.vue';

const loadingShow = ref(false)
const loadingType = ref<'spinner' | 'circular' | 'dots' | 'pulse'>('spinner')

function showLoading(type: 'spinner' | 'circular' | 'dots' | 'pulse') {
  loadingType.value = type
  loadingShow.value = true
  setTimeout(() => {
    loadingShow.value = false
  }, 2000)
}
</script>

<style scoped lang="scss">
.loading-text-demos {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  padding: 32rpx;
  background: linear-gradient(135deg, rgba(0, 61, 173, 0.05), rgba(255, 255, 255, 0.9));
  border-radius: 28rpx;
  border: 2rpx solid rgba(0, 61, 173, 0.15);
}
</style>
