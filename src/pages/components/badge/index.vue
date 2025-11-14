<template>
  <DemoPage title="Badge 徽章" description="用于消息提示和数量标记">
    <DemoSection title="基础用法">
      <view class="badge-row">
        <frame-badge :value="5">
          <view class="badge-box">消息</view>
        </frame-badge>
        <frame-badge :value="99" type="primary">
          <view class="badge-box">通知</view>
        </frame-badge>
        <frame-badge :value="120" :max="99" type="success">
          <view class="badge-box">待办</view>
        </frame-badge>
      </view>
    </DemoSection>

    <DemoSection title="小红点">
      <view class="badge-row">
        <frame-badge :dot="true">
          <view class="badge-box">小红点</view>
        </frame-badge>
        <frame-badge :dot="true" type="success">
          <view class="badge-box">成功</view>
        </frame-badge>
        <frame-badge :dot="true" type="warning">
          <view class="badge-box">警告</view>
        </frame-badge>
      </view>
    </DemoSection>

    <DemoSection title="不同类型">
      <view class="badge-row">
        <frame-badge :value="5" type="default">
          <view class="badge-box">默认</view>
        </frame-badge>
        <frame-badge :value="5" type="primary">
          <view class="badge-box">主要</view>
        </frame-badge>
        <frame-badge :value="5" type="success">
          <view class="badge-box">成功</view>
        </frame-badge>
        <frame-badge :value="5" type="warning">
          <view class="badge-box">警告</view>
        </frame-badge>
        <frame-badge :value="5" type="danger">
          <view class="badge-box">危险</view>
        </frame-badge>
      </view>
    </DemoSection>

    <DemoSection title="API 属性" :grid="true">
      <ApiItem name="value" type="number" description="显示的数字" />
      <ApiItem name="max" type="number" description="最大值，超过显示max+" />
      <ApiItem name="dot" type="boolean" description="显示为小红点" />
      <ApiItem name="type" type="string" description="类型：default | primary | success | warning | danger" />
    </DemoSection>
  </DemoPage>
</template>

<script setup lang="ts">
import DemoPage from '@/components/DemoPage.vue';
import DemoSection from '@/components/DemoSection.vue';
import ApiItem from '@/components/ApiItem.vue';
</script>

<style scoped lang="scss">
.badge-row {
  display: flex;
  gap: 48rpx;
  flex-wrap: wrap;
}

.badge-box {
  padding: 20rpx 32rpx;
  background: linear-gradient(135deg, rgba(0, 61, 173, 0.05), rgba(255, 255, 255, 0.9));
  border-radius: 12rpx;
  font-size: 24rpx;
  color: var(--theme-content-color, var(--fui-color-text-primary));
  border: 2rpx solid rgba(0, 61, 173, 0.15);
}
</style>
