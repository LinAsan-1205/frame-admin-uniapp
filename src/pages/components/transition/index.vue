<template>
  <DemoPage title="Transition 过渡动画" description="用于元素的显示与隐藏过渡效果">
    <DemoSection title="基础用法">
      <frame-button theme="primary" size="small" @click="showTransition = !showTransition">
        {{ showTransition ? "隐藏" : "显示" }}
      </frame-button>

      <view class="transition-demos">
        <frame-transition :show="showTransition" mode="fade">
          <view class="transition-box">淡入淡出</view>
        </frame-transition>
        <frame-transition :show="showTransition" mode="slide-up">
          <view class="transition-box">上滑</view>
        </frame-transition>
        <frame-transition :show="showTransition" mode="slide-down">
          <view class="transition-box">下滑</view>
        </frame-transition>
        <frame-transition :show="showTransition" mode="zoom-in">
          <view class="transition-box">放大</view>
        </frame-transition>
        <frame-transition :show="showTransition" mode="fade-up">
          <view class="transition-box">淡入上滑</view>
        </frame-transition>
      </view>
    </DemoSection>

    <DemoSection title="API 属性" :grid="true">
      <ApiItem name="show" type="boolean" description="是否显示组件" />
      <ApiItem name="mode" type="string" description="过渡模式：fade | slide-up | slide-down | zoom-in | fade-up" />
      <ApiItem name="duration" type="number" description="过渡时间，单位ms" />
    </DemoSection>
  </DemoPage>
</template>

<script setup lang="ts">
import { ref } from "vue"
import DemoPage from "@/components/DemoPage.vue";
import DemoSection from "@/components/DemoSection.vue";
import ApiItem from "@/components/ApiItem.vue";

const showTransition = ref(false)
</script>

<style scoped lang="scss">
.transition-demos {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  margin-top: 16rpx;
}

.transition-box {
  padding: 24rpx 32rpx;
  background: linear-gradient(135deg, #003dad, #10b981);
  color: #ffffff;
  border-radius: 12rpx;
  font-size: 24rpx;
  font-weight: 500;
  text-align: center;
}
</style>
