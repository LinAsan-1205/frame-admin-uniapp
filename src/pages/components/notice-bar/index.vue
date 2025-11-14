<template>
  <DemoPage title="NoticeBar 通知栏" description="用于循环播放展示一组消息通知">
    <DemoSection title="基础用法">
      <frame-notice-bar text="这是一条通知消息" />
    </DemoSection>

    <DemoSection title="可关闭">
      <frame-notice-bar text="这条通知可以关闭" mode="closeable" />
    </DemoSection>

    <DemoSection title="链接模式">
      <frame-notice-bar text="点击查看更多信息" mode="link" @click="handleNoticeClick" />
    </DemoSection>

    <DemoSection title="滚动通知">
      <frame-notice-bar
        text="这是一条很长很长的通知消息，内容会自动滚动播放，方便用户查看完整信息"
        :scrollable="true"
        :speed="50"
      />
    </DemoSection>

    <DemoSection title="文本换行">
      <frame-notice-bar
        text="这是一条支持换行的通知消息，可以显示多行内容，适合展示较长的文本信息"
        :wrapable="true"
      />
    </DemoSection>

    <DemoSection title="API 属性" :grid="true">
      <ApiItem name="text" type="string" description="通知文本内容" />
      <ApiItem name="mode" type="string" description="模式：closeable | link" />
      <ApiItem name="scrollable" type="boolean" description="是否开启滚动播放" />
      <ApiItem name="wrapable" type="boolean" description="是否开启文本换行" />
      <ApiItem name="speed" type="number" description="滚动速度(px/s)" />
      <ApiItem name="bg-color" type="string" description="背景颜色" />
    </DemoSection>
  </DemoPage>
</template>

<script setup lang="ts">
import DemoPage from '@/components/DemoPage.vue';
import DemoSection from '@/components/DemoSection.vue';
import ApiItem from '@/components/ApiItem.vue';

function handleNoticeClick() {
  uni.showToast({ title: '点击了通知栏', icon: 'none' })
}
</script>
