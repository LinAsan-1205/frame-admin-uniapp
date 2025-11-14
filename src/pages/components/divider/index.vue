<template>
  <DemoPage title="Divider 分割线" description="用于分隔内容的分割线">
    <DemoSection title="基础用法">
      <text class="demo-label">基础分割线：</text>
      <frame-divider />
    </DemoSection>

    <DemoSection title="带文字">
      <text class="demo-label">默认居中：</text>
      <frame-divider>默认文字</frame-divider>
      
      <text class="demo-label">左侧文字：</text>
      <frame-divider content-position="left">左侧文字</frame-divider>
      
      <text class="demo-label">右侧文字：</text>
      <frame-divider content-position="right">右侧文字</frame-divider>
    </DemoSection>

    <DemoSection title="虚线样式">
      <text class="demo-label">虚线分割：</text>
      <frame-divider :dashed="true">虚线分割</frame-divider>
    </DemoSection>

    <DemoSection title="自定义颜色">
      <text class="demo-label">蓝色分割线：</text>
      <frame-divider color="#2563eb">蓝色分割线</frame-divider>
      
      <text class="demo-label">绿色分割线：</text>
      <frame-divider color="#10b981">绿色分割线</frame-divider>
      
      <text class="demo-label">红色分割线：</text>
      <frame-divider color="#ef4444">红色分割线</frame-divider>
    </DemoSection>

    <DemoSection title="API 属性" :grid="true">
      <ApiItem name="content-position" type="string" description="内容位置：left | center | right" />
      <ApiItem name="dashed" type="boolean" description="是否虚线" />
      <ApiItem name="color" type="string" description="分割线颜色" />
      <ApiItem name="margin" type="number" description="上下边距(rpx)" />
    </DemoSection>
  </DemoPage>
</template>

<script setup lang="ts">
import DemoPage from '@/components/DemoPage.vue';
import DemoSection from '@/components/DemoSection.vue';
import ApiItem from '@/components/ApiItem.vue';
</script>

<style scoped lang="scss">
.demo-label {
  font-size: 26rpx;
  font-weight: 500;
  color: var(--theme-content-color, var(--fui-color-text-secondary));
  display: block;
  margin-top: 8rpx;
}
</style>
