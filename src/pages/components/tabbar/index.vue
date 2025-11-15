<template>
  <DemoPage title="Tabbar 标签栏" description="底部导航栏，用于在不同页面之间进行切换">
    <!-- 预览 -->
    <view style="padding: 0 32rpx 120rpx;">
      <frame-tabbar
        v-model="activeTab"
        :items="tabItems"
      />
    </view>

    <!-- 组件类型 -->
    <DemoSection title="组件类型">
      <view class="demo-item">
        <text class="demo-label">
          基础2
        </text>
        <view class="demo-wrapper">
          <frame-tabbar
            v-model="tab1"
            :items="basicItems"
            :fixed="false"
          />
        </view>
      </view>

      <view class="demo-item">
        <text class="demo-label">
          纯文本
        </text>
        <view class="demo-wrapper">
          <frame-tabbar
            v-model="tab2"
            :items="textOnlyItems"
            :fixed="false"
          />
        </view>
      </view>

      <view class="demo-item">
        <text class="demo-label">
          纯图标
        </text>
        <view class="demo-wrapper">
          <frame-tabbar
            v-model="tab6"
            :items="iconOnlyItems"
            :fixed="false"
          />
        </view>
      </view>
    </DemoSection>

    <!-- 图标加文字标签栏 -->
    <DemoSection title="图标加文字标签栏">
      <view class="demo-item">
        <text class="demo-label">
          图标加文字标签栏
        </text>
        <view class="demo-wrapper">
          <frame-tabbar
            v-model="tab3"
            :items="badgeItems"
            :fixed="false"
          />
        </view>
      </view>

      <view class="demo-item">
        <text class="demo-label">
          自定义图标home
        </text>
        <view class="demo-wrapper">
          <frame-tabbar
            v-model="tab5"
            :items="badgeItems"
            :fixed="false"
          />
        </view>
      </view>

      <view class="demo-item">
        <text class="demo-label">
          悬浮胶囊标签栏
        </text>
        <frame-tabbar
          v-model="tab7"
          :items="badgeItems"
          :fixed="false"
          capsule
        />
      </view>

      <view class="demo-item">
        <text class="demo-label">
          纯图标
        </text>
        <view class="demo-wrapper">
          <frame-tabbar
            v-model="tab4"
            :items="iconOnlyItems"
            :fixed="false"
          />
        </view>
      </view>
    </DemoSection>

    <!-- API 文档 -->
    <DemoSection title="API 文档">
      <ApiItem
        v-for="item in apiItems"
        :key="item.key"
        :name="item.name"
        :description="item.desc"
      />
    </DemoSection>
  </DemoPage>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ApiItem from '@/components/ApiItem.vue';
import DemoPage from '@/components/DemoPage.vue';
import DemoSection from '@/components/DemoSection.vue';

// 标签状态
const activeTab = ref('home');
const tab1 = ref('home');
const tab2 = ref('home');
const tab3 = ref('home');
const tab4 = ref('home');
const tab5 = ref('home');
const tab6 = ref('home');
const tab7 = ref('home');

// 基础标签项
const tabItems = ref([
  { name: 'home', text: '首页', icon: 'i-mdi-home-outline', activeIcon: 'i-mdi-home' },
  { name: 'category', text: '分类', icon: 'i-mdi-apps', activeIcon: 'i-mdi-apps' },
  { name: 'cart', text: '购物车', icon: 'i-mdi-cart-outline', activeIcon: 'i-mdi-cart', badge: 5 },
  { name: 'user', text: '我的', icon: 'i-mdi-account-outline', activeIcon: 'i-mdi-account', dot: true },
]);

const basicItems = ref([
  { name: 'home', text: '首页', icon: 'i-mdi-home-outline', activeIcon: 'i-mdi-home' },
  { name: 'category', text: '应用', icon: 'i-mdi-apps', activeIcon: 'i-mdi-apps' },
  { name: 'user', text: '我的', icon: 'i-mdi-account-outline', activeIcon: 'i-mdi-account' },
]);

const badgeItems = ref([
  { name: 'home', text: '首页', icon: 'i-mdi-home-outline', activeIcon: 'i-mdi-home' },
  { name: 'message', text: '消息', icon: 'i-mdi-bell-outline', activeIcon: 'i-mdi-bell', badge: 99 },
  { name: 'cart', text: '购物车', icon: 'i-mdi-cart-outline', activeIcon: 'i-mdi-cart', badge: 5 },
  { name: 'user', text: '我的', icon: 'i-mdi-account-outline', activeIcon: 'i-mdi-account' },
]);

const textOnlyItems = ref([
  { name: 'home', text: '首页' },
  { name: 'category', text: '应用' },
  { name: 'chat', text: '聊天' },
  { name: 'user', text: '我的' },
]);

const iconOnlyItems = ref([
  { name: 'home', icon: 'i-mdi-home-outline', activeIcon: 'i-mdi-home' },
  { name: 'category', icon: 'i-mdi-apps', activeIcon: 'i-mdi-apps' },
  { name: 'chat', icon: 'i-mdi-chat-outline', activeIcon: 'i-mdi-chat' },
  { name: 'user', icon: 'i-mdi-account-outline', activeIcon: 'i-mdi-account' },
]);

// API 文档
const apiItems = [
  { key: 'modelValue', name: 'v-model', desc: '当前选中项的 name，支持 v-model 双向绑定' },
  { key: 'items', name: 'items', desc: 'Tabbar 项列表，每项包含 name、text、icon 等属性' },
  { key: 'activeColor', name: 'active-color', desc: '选中颜色，默认使用主题色' },
  { key: 'inactiveColor', name: 'inactive-color', desc: '未选中颜色，默认使用主题色' },
  { key: 'fixed', name: 'fixed', desc: '是否固定在底部，默认 true' },
  { key: 'border', name: 'border', desc: '是否显示顶部边框，默认 false' },
  { key: 'backgroundColor', name: 'background-color', desc: '背景色，默认使用主题色' },
  { key: 'safeAreaInsetBottom', name: 'safe-area-inset-bottom', desc: '是否开启底部安全区适配，默认 true' },
  { key: 'capsule', name: 'capsule', desc: '是否悬浮胶囊样式，默认 false' },
  { key: 'iconSize', name: 'icon-size', desc: '图标尺寸，默认 40rpx' },
];
</script>

<style scoped lang="scss">
.demo-item {
  margin-bottom: 32rpx;

  &:last-child {
    margin-bottom: 0;
  }
}

.demo-label {
  display: block;
  margin-bottom: 16rpx;
  font-size: 28rpx;
  color: var(--fui-text-base, #333);
  font-weight: 500;
}

.demo-wrapper {
  position: relative;
  height: 200rpx;
  background: #f5f5f5;
  border-radius: 16rpx;
  overflow: hidden;
}

// 暗黑模式
[data-theme='dark'] {
  .demo-label {
    color: var(--fui-text-base, #e5e7eb);
  }

  .demo-wrapper {
    background: #1f2937;
  }
}
</style>
