<template>
  <DemoPage title="NavBar 导航栏" description="页面顶部的导航栏组件">
    <DemoSectionTabs :tabs="['示例', 'API']" @change="handleTabChange">
      <DemoTabPane :active="activeTab === 0">
        <DemoSection title="基础用法">
          <view class="nav-demo">
            <frame-nav-bar title="标题" :fixed="false" />
          </view>
        </DemoSection>

        <DemoSection title="返回按钮">
          <view class="nav-demo">
            <frame-nav-bar
              title="标题" :fixed="false" :show-left="true" left-icon="arrow-left"
              @click-left="handleBack"
            />
          </view>
        </DemoSection>

        <DemoSection title="右侧按钮">
          <view class="nav-demo">
            <frame-nav-bar
              title="标题" :fixed="false" :show-right="true" right-text="按钮"
              @click-right="handleRightClick"
            />
          </view>
        </DemoSection>

        <DemoSection title="自定义颜色">
          <view class="nav-demo">
            <frame-nav-bar
              title="标题" :fixed="false" :show-left="true" left-icon="arrow-left" bg-color="#2563eb"
              color="#ffffff"
            />
          </view>
        </DemoSection>

        <DemoSection title="自定义插槽">
          <view class="nav-demo">
            <frame-nav-bar :fixed="false">
              <template #left>
                <view class="flex items-center gap-8rpx">
                  <view class="i-mdi-menu text-40rpx" />
                  <text class="text-28rpx">
                    菜单
                  </text>
                </view>
              </template>
              <view class="flex items-center gap-12rpx">
                <view class="i-mdi-star text-40rpx text-#f59e0b" />
                <text class="text-32rpx font-600">
                  自定义标题
                </text>
              </view>
              <template #right>
                <view class="flex items-center gap-16rpx">
                  <view class="i-mdi-magnify text-40rpx" />
                  <view class="i-mdi-dots-vertical text-40rpx" />
                </view>
              </template>
            </frame-nav-bar>
          </view>
        </DemoSection>
      </DemoTabPane>

      <DemoTabPane :active="activeTab === 1">
        <DemoSection title="基础属性" :grid="true">
          <ApiItem name="title" type="string" description="标题" />
          <ApiItem name="title-center" type="boolean" description="标题是否居中，默认 true" />
          <ApiItem name="fixed" type="boolean" description="是否固定在顶部，默认 true" />
          <ApiItem name="placeholder" type="boolean" description="是否显示占位元素，默认 true" />
          <ApiItem name="border" type="boolean" description="是否显示下边框，默认 false" />
          <ApiItem name="height" type="string | number" description="导航栏高度，默认 44px" />
          <ApiItem name="bg-color" type="string" description="背景颜色，默认 #ffffff" />
          <ApiItem name="color" type="string" description="文字颜色，默认 #1a1a1a" />
          <ApiItem name="z-index" type="number" description="层级，默认 1000" />
          <ApiItem name="safe-area-inset-top" type="boolean" description="是否开启顶部安全区适配，默认 true" />
        </DemoSection>

        <DemoSection title="左侧属性" :grid="true">
          <ApiItem name="show-left" type="boolean" description="是否显示左侧内容，默认 true" />
          <ApiItem name="left-icon" type="string" description="左侧图标，默认 arrow-left" />
          <ApiItem name="left-text" type="string" description="左侧文字" />
          <ApiItem name="left-icon-size" type="string" description="左侧图标大小，默认 md" />
          <ApiItem name="left-icon-color" type="string" description="左侧图标颜色" />
          <ApiItem name="left-width" type="string | number" description="左侧最小宽度" />
          <ApiItem name="show-home-icon" type="boolean" description="是否显示首页图标，默认 true" />
          <ApiItem name="home-icon" type="string" description="首页图标，默认 home" />
          <ApiItem name="auto-back" type="boolean" description="点击左侧是否自动返回，默认 true" />
        </DemoSection>

        <DemoSection title="右侧属性" :grid="true">
          <ApiItem name="show-right" type="boolean" description="是否显示右侧内容，默认 false" />
          <ApiItem name="right-icon" type="string" description="右侧图标" />
          <ApiItem name="right-text" type="string" description="右侧文字" />
          <ApiItem name="right-icon-size" type="string" description="右侧图标大小，默认 md" />
          <ApiItem name="right-icon-color" type="string" description="右侧图标颜色" />
          <ApiItem name="right-width" type="string | number" description="右侧最小宽度" />
        </DemoSection>

        <DemoSection title="事件" :grid="true">
          <ApiItem name="click-left" type="event" description="点击左侧时触发" />
          <ApiItem name="click-title" type="event" description="点击标题时触发" />
          <ApiItem name="click-right" type="event" description="点击右侧时触发" />
          <ApiItem name="click-home" type="event" description="点击首页图标时触发" />
        </DemoSection>

        <DemoSection title="插槽" :grid="true">
          <ApiItem name="default" type="slot" description="自定义标题内容" />
          <ApiItem name="left" type="slot" description="自定义左侧内容" />
          <ApiItem name="right" type="slot" description="自定义右侧内容" />
        </DemoSection>
      </DemoTabPane>
    </DemoSectionTabs>
  </DemoPage>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ApiItem from '@/components/ApiItem.vue';
import DemoPage from '@/components/DemoPage.vue';
import DemoSection from '@/components/DemoSection.vue';
import DemoSectionTabs from '@/components/DemoSectionTabs.vue';
import DemoTabPane from '@/components/DemoTabPane.vue';

const activeTab = ref(0);

function handleTabChange(index: number) {
  activeTab.value = index;
}

function handleBack() {
  uni.showToast({ title: '返回', icon: 'none' });
}

function handleRightClick() {
  uni.showToast({ title: '右侧按钮点击', icon: 'none' });
}
</script>

<style scoped lang="scss">
.nav-demo {
  border: 1rpx solid rgba(0, 61, 173, 0.15);
  border-radius: 12rpx;
  overflow: hidden;
}
</style>
