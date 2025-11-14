<template>
  <DemoPage title="Grid 网格" description="宫格布局，适合展示多个同级功能入口">
    <DemoSection title="基础网格（4列）">
      <frame-grid :columns="4" :border="true" :clickable="true">
        <frame-grid-item icon="home" text="首页" />
        <frame-grid-item icon="user" text="我的" />
        <frame-grid-item icon="setting" text="设置" />
        <frame-grid-item icon="star" text="收藏" />
      </frame-grid>
    </DemoSection>

    <DemoSection title="3列网格">
      <frame-grid :columns="3" :border="true">
        <frame-grid-item icon="scan" text="扫一扫" icon-color="#2563eb" />
        <frame-grid-item icon="qrcode" text="付款码" icon-color="#10b981" />
        <frame-grid-item icon="wallet" text="钱包" icon-color="#f59e0b" />
        <frame-grid-item icon="card" text="卡包" icon-color="#ef4444" />
        <frame-grid-item icon="coupon" text="优惠券" icon-color="#8b5cf6" />
        <frame-grid-item icon="gift" text="礼品卡" icon-color="#ec4899" />
      </frame-grid>
    </DemoSection>

    <DemoSection title="带徽章">
      <frame-grid :columns="4" :gap="16">
        <frame-grid-item icon="message" text="消息" :badge="5" />
        <frame-grid-item icon="bell" text="通知" :badge="99" />
        <frame-grid-item icon="mail" text="邮件" :dot="true" />
        <frame-grid-item icon="task" text="待办" />
      </frame-grid>
    </DemoSection>

    <DemoSection title="正方形格子">
      <frame-grid :columns="3" :border="true" :square="true">
        <frame-grid-item icon="photo" text="相册" />
        <frame-grid-item icon="camera" text="相机" />
        <frame-grid-item icon="video" text="视频" />
      </frame-grid>
    </DemoSection>

    <DemoSection title="API 属性" :grid="true">
      <ApiItem name="columns" type="number" description="列数" />
      <ApiItem name="border" type="boolean" description="是否显示边框" />
      <ApiItem name="square" type="boolean" description="是否正方形格子" />
      <ApiItem name="clickable" type="boolean" description="是否可点击" />
      <ApiItem name="gap" type="number" description="格子间距(rpx)" />
    </DemoSection>
  </DemoPage>
</template>

<script setup lang="ts">
import DemoPage from '@/components/DemoPage.vue';
import DemoSection from '@/components/DemoSection.vue';
import ApiItem from '@/components/ApiItem.vue';
</script>
