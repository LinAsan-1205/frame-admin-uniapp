<template>
  <DemoPage title="NavBar 导航栏" description="页面顶部的导航栏组件">
    <DemoSection title="基础用法">
      <view class="nav-demo">
        <frame-nav-bar title="标题" :fixed="false" />
      </view>
    </DemoSection>

    <DemoSection title="返回按钮">
      <view class="nav-demo">
        <frame-nav-bar title="标题" :fixed="false" :show-left="true" left-icon="arrow-left" @click-left="handleBack" />
      </view>
    </DemoSection>

    <DemoSection title="右侧按钮">
      <view class="nav-demo">
        <frame-nav-bar title="标题" :fixed="false" :show-right="true" right-text="按钮" @click-right="handleRightClick" />
      </view>
    </DemoSection>

    <DemoSection title="自定义颜色">
      <view class="nav-demo">
        <frame-nav-bar title="标题" :fixed="false" :show-left="true" left-icon="arrow-left" bg-color="#2563eb" color="#ffffff" />
      </view>
    </DemoSection>

    <DemoSection title="API 属性" :grid="true">
      <ApiItem name="title" type="string" description="标题" />
      <ApiItem name="show-left" type="boolean" description="是否显示左侧内容" />
      <ApiItem name="left-icon" type="string" description="左侧图标" />
      <ApiItem name="left-text" type="string" description="左侧文字" />
      <ApiItem name="show-right" type="boolean" description="是否显示右侧内容" />
      <ApiItem name="right-text" type="string" description="右侧文字" />
    </DemoSection>
  </DemoPage>
</template>

<script setup lang="ts">
import DemoPage from '@/components/DemoPage.vue';
import DemoSection from '@/components/DemoSection.vue';
import ApiItem from '@/components/ApiItem.vue';

function handleBack() {
  uni.showToast({ title: '返回', icon: 'none' })
}

function handleRightClick() {
  uni.showToast({ title: '右侧按钮点击', icon: 'none' })
}
</script>

<style scoped lang="scss">
.nav-demo {
  border: 1rpx solid rgba(0, 61, 173, 0.15);
  border-radius: 12rpx;
  overflow: hidden;
}
</style>
