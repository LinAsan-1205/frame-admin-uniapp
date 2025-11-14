<template>
  <DemoPage title="Icon 图标" description="提供丰富的图标资源，支持自定义颜色和尺寸">
    <DemoSection title="基础用法" :grid="true">
      <DemoCard label="默认">
        <frame-icon name="search" size="lg" />
      </DemoCard>
      <DemoCard label="蓝色">
        <frame-icon name="home" size="lg" color="#2563eb" />
      </DemoCard>
      <DemoCard label="旋转">
        <frame-icon name="star" size="lg" color="#10b981" :spin="true" />
      </DemoCard>
      <DemoCard label="加粗">
        <frame-icon name="user" size="xl" color="#f59e0b" :bold="true" />
      </DemoCard>
    </DemoSection>

    <DemoSection title="不同尺寸" :grid="true">
      <DemoCard label="小">
        <frame-icon name="heart" size="sm" color="#ef4444" />
      </DemoCard>
      <DemoCard label="中">
        <frame-icon name="heart" size="md" color="#ef4444" />
      </DemoCard>
      <DemoCard label="大">
        <frame-icon name="heart" size="lg" color="#ef4444" />
      </DemoCard>
      <DemoCard label="超大">
        <frame-icon name="heart" size="xl" color="#ef4444" />
      </DemoCard>
    </DemoSection>

    <DemoSection title="API 属性" :grid="true">
      <ApiItem name="name" type="string" description="图标名称" />
      <ApiItem name="size" type="string" description="图标大小：sm | md | lg | xl" />
      <ApiItem name="color" type="string" description="图标颜色" />
      <ApiItem name="spin" type="boolean" description="是否旋转" />
      <ApiItem name="bold" type="boolean" description="是否加粗" />
    </DemoSection>
  </DemoPage>
</template>

<script setup lang="ts">
import DemoPage from '@/components/DemoPage.vue';
import DemoSection from '@/components/DemoSection.vue';
import DemoCard from '@/components/DemoCard.vue';
import ApiItem from '@/components/ApiItem.vue';
</script>
