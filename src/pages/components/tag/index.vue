<template>
  <DemoPage title="Tag 标签" description="用于标记和分类的标签组件">
    <DemoSection title="Filled 实心">
      <view class="tag-group">
        <frame-tag type="default" variant="filled">默认</frame-tag>
        <frame-tag type="primary" variant="filled">主要</frame-tag>
        <frame-tag type="success" variant="filled">成功</frame-tag>
        <frame-tag type="warning" variant="filled">警告</frame-tag>
        <frame-tag type="danger" variant="filled">危险</frame-tag>
      </view>
    </DemoSection>

    <DemoSection title="Outlined 描边">
      <view class="tag-group">
        <frame-tag type="default" variant="outlined">默认</frame-tag>
        <frame-tag type="primary" variant="outlined">主要</frame-tag>
        <frame-tag type="success" variant="outlined">成功</frame-tag>
        <frame-tag type="warning" variant="outlined">警告</frame-tag>
        <frame-tag type="danger" variant="outlined">危险</frame-tag>
      </view>
    </DemoSection>

    <DemoSection title="Light 浅色">
      <view class="tag-group">
        <frame-tag type="default" variant="light">默认</frame-tag>
        <frame-tag type="primary" variant="light">主要</frame-tag>
        <frame-tag type="success" variant="light">成功</frame-tag>
        <frame-tag type="warning" variant="light">警告</frame-tag>
        <frame-tag type="danger" variant="light">危险</frame-tag>
      </view>
    </DemoSection>

    <DemoSection title="其他功能">
      <view class="tag-group">
        <frame-tag type="primary" :closable="true">可关闭</frame-tag>
        <frame-tag type="success" :round="true">圆形</frame-tag>
        <frame-tag type="warning" size="sm">小尺寸</frame-tag>
        <frame-tag type="danger" size="lg">大尺寸</frame-tag>
      </view>
    </DemoSection>

    <DemoSection title="API 属性" :grid="true">
      <ApiItem name="type" type="string" description="类型：default | primary | success | warning | danger" />
      <ApiItem name="variant" type="string" description="变体：filled | outlined | light" />
      <ApiItem name="size" type="string" description="尺寸：sm | md | lg" />
      <ApiItem name="closable" type="boolean" description="是否可关闭" />
      <ApiItem name="round" type="boolean" description="是否圆形" />
    </DemoSection>
  </DemoPage>
</template>

<script setup lang="ts">
import DemoPage from '@/components/DemoPage.vue';
import DemoSection from '@/components/DemoSection.vue';
import ApiItem from '@/components/ApiItem.vue';
</script>

<style scoped lang="scss">
.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  align-items: center;
}
</style>
