<template>
  <DemoPage title="Avatar 头像" description="用于展示用户头像或图标">
    <DemoSection title="基础用法" :grid="true">
      <DemoCard label="文字">
        <frame-avatar text="张三" size="md" />
      </DemoCard>
      <DemoCard label="图标">
        <frame-avatar icon="user" size="md" bg-color="#2563eb" color="#ffffff" />
      </DemoCard>
      <DemoCard label="方形">
        <frame-avatar text="李四" size="md" shape="square" bg-color="#10b981" color="#ffffff" />
      </DemoCard>
    </DemoSection>

    <DemoSection title="不同尺寸" :grid="true">
      <DemoCard label="小">
        <frame-avatar text="小" size="sm" bg-color="#f59e0b" color="#ffffff" />
      </DemoCard>
      <DemoCard label="中">
        <frame-avatar text="中" size="md" bg-color="#f59e0b" color="#ffffff" />
      </DemoCard>
      <DemoCard label="大">
        <frame-avatar text="大" size="lg" bg-color="#f59e0b" color="#ffffff" />
      </DemoCard>
      <DemoCard label="超大">
        <frame-avatar text="超大" size="xl" bg-color="#f59e0b" color="#ffffff" />
      </DemoCard>
    </DemoSection>

    <DemoSection title="API 属性" :grid="true">
      <ApiItem name="text" type="string" description="显示的文本" />
      <ApiItem name="icon" type="string" description="图标名称" />
      <ApiItem name="size" type="string" description="尺寸：sm | md | lg | xl" />
      <ApiItem name="shape" type="string" description="形状：circle | square" />
      <ApiItem name="bg-color" type="string" description="背景颜色" />
      <ApiItem name="color" type="string" description="文字/图标颜色" />
    </DemoSection>
  </DemoPage>
</template>

<script setup lang="ts">
import DemoPage from '@/components/DemoPage.vue';
import DemoSection from '@/components/DemoSection.vue';
import DemoCard from '@/components/DemoCard.vue';
import ApiItem from '@/components/ApiItem.vue';
</script>
