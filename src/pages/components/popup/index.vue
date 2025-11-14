<template>
  <DemoPage title="Popup 弹出层" description="弹出层容器">
    <DemoSection title="基础用法">
      <text style="font-size: 28rpx; color: var(--theme-content-color, var(--fui-color-text-secondary));">
        组件演示请参考原始备份文件 index.vue.backup
      </text>
    </DemoSection>

    <DemoSection title="API 属性" :grid="true">
      <ApiItem name="prop" type="type" description="属性描述" />
    </DemoSection>
  </DemoPage>
</template>

<script setup lang="ts">
import DemoPage from '@/components/DemoPage.vue';
import DemoSection from '@/components/DemoSection.vue';
import ApiItem from '@/components/ApiItem.vue';
</script>
