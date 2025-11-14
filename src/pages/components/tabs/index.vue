<template>
  <DemoPage title="Tabs 标签页" description="选项卡切换组件">
    <DemoSection title="基础用法">
      <frame-tabs v-model="activeTab1" :items="tabItems1" />
      <view class="tab-content">当前选中：{{ activeTab1 }}</view>
    </DemoSection>

    <DemoSection title="带图标">
      <frame-tabs v-model="activeTab2" :items="tabItems2" />
    </DemoSection>

    <DemoSection title="带徽标">
      <frame-tabs v-model="activeTab3" :items="tabItems3" />
    </DemoSection>

    <DemoSection title="可滚动">
      <frame-tabs v-model="activeTab4" :items="tabItems4" :scrollable="true" />
    </DemoSection>

    <DemoSection title="自定义颜色">
      <frame-tabs v-model="activeTab5" :items="tabItems1" active-color="#10b981" line-color="#10b981" />
    </DemoSection>

    <DemoSection title="API 属性" :grid="true">
      <ApiItem name="items" type="TabItem[]" description="标签列表数据" />
      <ApiItem name="v-model" type="string" description="当前激活的标签值" />
      <ApiItem name="scrollable" type="boolean" description="是否可滚动" />
      <ApiItem name="active-color" type="string" description="激活标签的颜色" />
      <ApiItem name="line-color" type="string" description="底部指示线颜色" />
    </DemoSection>
  </DemoPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TabItem } from '@/uni_modules/frame-uniapp-ui/components/frame-tabs/types'
import DemoPage from '@/components/DemoPage.vue';
import DemoSection from '@/components/DemoSection.vue';
import ApiItem from '@/components/ApiItem.vue';

const activeTab1 = ref('tab1')
const activeTab2 = ref('home')
const activeTab3 = ref('message')
const activeTab4 = ref('tab1')
const activeTab5 = ref('tab1')

const tabItems1: TabItem[] = [
  { value: 'tab1', label: '标签一' },
  { value: 'tab2', label: '标签二' },
  { value: 'tab3', label: '标签三' },
  { value: 'tab4', label: '标签四' },
]

const tabItems2: TabItem[] = [
  { value: 'home', label: '首页', icon: 'home' },
  { value: 'category', label: '分类', icon: 'menu' },
  { value: 'cart', label: '购物车', icon: 'cart' },
  { value: 'user', label: '我的', icon: 'user' },
]

const tabItems3: TabItem[] = [
  { value: 'message', label: '消息', badge: 99 },
  { value: 'notice', label: '通知', badge: 5 },
  { value: 'todo', label: '待办', dot: true },
  { value: 'other', label: '其他' },
]

const tabItems4: TabItem[] = [
  { value: 'tab1', label: '标签一' },
  { value: 'tab2', label: '标签二' },
  { value: 'tab3', label: '标签三' },
  { value: 'tab4', label: '标签四' },
  { value: 'tab5', label: '标签五' },
  { value: 'tab6', label: '标签六' },
  { value: 'tab7', label: '标签七' },
  { value: 'tab8', label: '标签八' },
]
</script>

<style scoped lang="scss">
.tab-content {
  padding: 32rpx;
  text-align: center;
  font-size: 28rpx;
  color: var(--theme-content-color, var(--fui-color-text-secondary));
}
</style>
