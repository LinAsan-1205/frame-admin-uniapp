<template>
  <DemoPage title="Space 间距" description="设置组件之间的间距">
    <DemoSection title="水平间距">
      <frame-space direction="horizontal" :size="16">
        <frame-button size="small">按钮1</frame-button>
        <frame-button size="small">按钮2</frame-button>
        <frame-button size="small">按钮3</frame-button>
      </frame-space>
    </DemoSection>

    <DemoSection title="垂直间距">
      <frame-space direction="vertical" :size="16">
        <view class="space-item">项目 1</view>
        <view class="space-item">项目 2</view>
        <view class="space-item">项目 3</view>
      </frame-space>
    </DemoSection>

    <DemoSection title="自动换行">
      <frame-space :wrap="true" :size="12">
        <frame-tag type="primary">标签1</frame-tag>
        <frame-tag type="success">标签2</frame-tag>
        <frame-tag type="warning">标签3</frame-tag>
        <frame-tag type="danger">标签4</frame-tag>
        <frame-tag type="default">标签5</frame-tag>
        <frame-tag type="primary">标签6</frame-tag>
        <frame-tag type="success">标签7</frame-tag>
        <frame-tag type="warning">标签8</frame-tag>
      </frame-space>
    </DemoSection>

    <DemoSection title="不同尺寸">
      <text class="demo-label">小间距(8)：</text>
      <frame-space :size="8">
        <frame-button size="small">按钮</frame-button>
        <frame-button size="small">按钮</frame-button>
        <frame-button size="small">按钮</frame-button>
      </frame-space>

      <text class="demo-label">中间距(16)：</text>
      <frame-space :size="16">
        <frame-button size="small">按钮</frame-button>
        <frame-button size="small">按钮</frame-button>
        <frame-button size="small">按钮</frame-button>
      </frame-space>

      <text class="demo-label">大间距(32)：</text>
      <frame-space :size="32">
        <frame-button size="small">按钮</frame-button>
        <frame-button size="small">按钮</frame-button>
        <frame-button size="small">按钮</frame-button>
      </frame-space>
    </DemoSection>

    <DemoSection title="API 属性" :grid="true">
      <ApiItem name="direction" type="string" description="间距方向：horizontal | vertical" />
      <ApiItem name="size" type="number" description="间距大小(rpx)" />
      <ApiItem name="wrap" type="boolean" description="是否自动换行" />
      <ApiItem name="align" type="string" description="对齐方式：start | center | end" />
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

.space-item {
  padding: 24rpx;
  background: linear-gradient(135deg, #003dad, #10b981);
  color: #ffffff;
  border-radius: 12rpx;
  text-align: center;
  font-size: 28rpx;
}
</style>
