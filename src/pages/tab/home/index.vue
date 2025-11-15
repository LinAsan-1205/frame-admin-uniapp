<template>
  <view class="home-page">
    <!-- 顶部区域 -->
    <view class="home-hero">
      <view class="hero-content">
        <view class="hero-logo">
          <view class="i-mdi-vuejs" />
        </view>
        <text class="hero-title">
          Frame UI
        </text>
        <text class="hero-subtitle">
          {{ t('home.library.description') }}
        </text>
        <view class="hero-stats">
          <view class="stat-item">
            <text class="stat-number">
              {{ allComponents.length }}
            </text>
            <text class="stat-label">
              组件
            </text>
          </view>
          <view class="stat-divider" />
          <view class="stat-item">
            <text class="stat-number">
              4
            </text>
            <text class="stat-label">
              分类
            </text>
          </view>
        </view>
      </view>
      <view class="theme-toggle" @click="toggleTheme">
        <view :class="isDark ? 'i-mdi-weather-night' : 'i-mdi-weather-sunny'" />
      </view>
    </view>

    <!-- 分类切换器 -->
    <view class="category-tabs">
      <scroll-view
        class="tabs-scroll"
        scroll-x
        :show-scrollbar="false"
        :scroll-with-animation="true"
      >
        <view class="tabs-container">
          <view
            v-for="tab in categoryTabs"
            :key="tab.value"
            class="tab-item" :class="[{ 'tab-item--active': activeCategory === tab.value }]"
            @click="switchCategory(tab.value)"
          >
            <view class="tab-icon">
              <view :class="tab.icon" />
            </view>
            <text class="tab-label">
              {{ tab.label }}
            </text>
            <text class="tab-count">
              {{ tab.count }}
            </text>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 组件列表 -->
    <view class="components-container">
      <view class="component-list">
        <view
          v-for="card in displayedComponents"
          :key="card.key"
          class="component-item"
          @click="goComponent(card)"
        >
          <view class="component-icon">
            <view :class="card.icon" />
          </view>
          <view class="component-content">
            <text class="component-name">
              {{ card.name }}
            </text>
            <text class="component-desc">
              {{ card.desc }}
            </text>
          </view>
        </view>
      </view>
    </view>

    <!-- 隐私协议弹窗 -->
    <AgreePrivacy
      v-model="showPrivacy"
      :title="privacyTitle"
      :sub-title="privacySubTitle"
      :confirm-text="t('home.privacy.confirm')"
      :cancel-text="t('home.privacy.cancel')"
      @agree="handleAgree"
      @disagree="handleDisagree"
    />
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import AgreePrivacy from '@/components/agree-privacy/index.vue';
import { useTheme } from '@/hooks';

interface ComponentCardItem {
  key: string;
  name: string;
  desc: string;
  path: string;
  category: 'basic' | 'form' | 'feedback' | 'data';
  icon?: string;
}

const showPrivacy = ref(false);
const { t } = useI18n();
const { isDark, toggleTheme } = useTheme();

// 当前激活的分类
const activeCategory = ref<'all' | 'basic' | 'feedback' | 'data'>('all');

// 所有组件配置
const allComponents = computed<ComponentCardItem[]>(() => [
  {
    key: 'button',
    name: 'Button 按钮',
    desc: '基础按钮组件，支持多种主题和状态',
    path: '/pages/components/button/index',
    category: 'basic',
    icon: 'i-mdi-gesture-tap-button',
  },
  {
    key: 'transition',
    name: 'Transition 过渡',
    desc: '元素的显示与隐藏过渡效果',
    path: '/pages/components/transition/index',
    category: 'basic',
    icon: 'i-mdi-animation-outline',
  },
  {
    key: 'icon',
    name: 'Icon 图标',
    desc: '丰富的图标资源，支持自定义',
    path: '/pages/components/icon/index',
    category: 'basic',
    icon: 'i-mdi-emoticon-outline',
  },
  {
    key: 'tabs',
    name: 'Tabs 标签页',
    desc: '选项卡切换组件',
    path: '/pages/components/tabs/index',
    category: 'basic',
    icon: 'i-mdi-tab',
  },
  {
    key: 'popup',
    name: 'Popup 弹出层',
    desc: '从不同方向弹出的浮层',
    path: '/pages/components/popup/index',
    category: 'basic',
    icon: 'i-mdi-dock-bottom',
  },
  {
    key: 'nav-bar',
    name: 'NavBar 导航栏',
    desc: '页面顶部导航栏',
    path: '/pages/components/nav-bar/index',
    category: 'basic',
    icon: 'i-mdi-page-layout-header',
  },
  {
    key: 'notice-bar',
    name: 'NoticeBar 通知栏',
    desc: '循环播放消息通知',
    path: '/pages/components/notice-bar/index',
    category: 'basic',
    icon: 'i-mdi-bullhorn-outline',
  },
  {
    key: 'segmented',
    name: 'Segmented 分段器',
    desc: '用于复杂区域进行分段和隐藏',
    path: '/pages/components/segmented/index',
    category: 'basic',
    icon: 'i-mdi-view-split-horizontal',
  },
  {
    key: 'loading',
    name: 'Loading 加载',
    desc: '加载提示动画',
    path: '/pages/components/loading/index',
    category: 'feedback',
    icon: 'i-mdi-loading',
  },
  {
    key: 'message',
    name: 'Message 消息',
    desc: '轻量级信息反馈',
    path: '/pages/components/message/index',
    category: 'feedback',
    icon: 'i-mdi-message-outline',
  },
  {
    key: 'modal',
    name: 'Modal 模态框',
    desc: '模态对话框',
    path: '/pages/components/modal/index',
    category: 'feedback',
    icon: 'i-mdi-window-restore',
  },
  {
    key: 'overlay',
    name: 'Overlay 遮罩层',
    desc: '创建一个遮罩层',
    path: '/pages/components/overlay/index',
    category: 'feedback',
    icon: 'i-mdi-layers-outline',
  },
  {
    key: 'avatar',
    name: 'Avatar 头像',
    desc: '用于展示用户头像或图标',
    path: '/pages/components/avatar/index',
    category: 'data',
    icon: 'i-mdi-account-circle-outline',
  },
  {
    key: 'tag',
    name: 'Tag 标签',
    desc: '用于标记和分类的标签组件',
    path: '/pages/components/tag/index',
    category: 'data',
    icon: 'i-mdi-tag-outline',
  },
  {
    key: 'badge',
    name: 'Badge 徽章',
    desc: '用于消息提示和数量标记',
    path: '/pages/components/badge/index',
    category: 'data',
    icon: 'i-mdi-numeric-1-circle-outline',
  },
  {
    key: 'divider',
    name: 'Divider 分割线',
    desc: '用于分隔内容的分割线',
    path: '/pages/components/divider/index',
    category: 'data',
    icon: 'i-mdi-minus',
  },
  {
    key: 'space',
    name: 'Space 间距',
    desc: '设置组件之间的间距',
    path: '/pages/components/space/index',
    category: 'data',
    icon: 'i-mdi-arrow-expand-horizontal',
  },
  {
    key: 'cell',
    name: 'Cell 单元格',
    desc: '列表中的单个单元格',
    path: '/pages/components/cell/index',
    category: 'data',
    icon: 'i-mdi-view-list-outline',
  },
  {
    key: 'grid',
    name: 'Grid 网格',
    desc: '宫格布局，展示功能入口',
    path: '/pages/components/grid/index',
    category: 'data',
    icon: 'i-mdi-grid',
  },
  {
    key: 'pagination',
    name: 'Pagination 分页',
    desc: '功能丰富的分页组件，支持简单模式和完整模式',
    path: '/pages/components/pagination/index',
    category: 'data',
    icon: 'i-mdi-page-next-outline',
  },
]);

// 按分类筛选组件
const basicComponents = computed(() =>
  allComponents.value.filter(c => c.category === 'basic'),
);

const _formComponents = computed(() =>
  allComponents.value.filter(c => c.category === 'form'),
);

const feedbackComponents = computed(() =>
  allComponents.value.filter(c => c.category === 'feedback'),
);

const dataComponents = computed(() =>
  allComponents.value.filter(c => c.category === 'data'),
);

// 分类标签配置
const categoryTabs = computed<Array<{
  value: 'all' | 'basic' | 'feedback' | 'data';
  label: string;
  count: number;
  icon: string;
}>>(() => [
  {
    value: 'all' as const,
    label: '全部',
    count: allComponents.value.length,
    icon: 'i-mdi-apps',
  },
  {
    value: 'basic' as const,
    label: '基础',
    count: basicComponents.value.length,
    icon: 'i-mdi-cube-outline',
  },
  {
    value: 'feedback' as const,
    label: '反馈',
    count: feedbackComponents.value.length,
    icon: 'i-mdi-bell-outline',
  },
  {
    value: 'data' as const,
    label: '数据',
    count: dataComponents.value.length,
    icon: 'i-mdi-view-dashboard-outline',
  },
]);

// 当前显示的组件列表
const displayedComponents = computed(() => {
  switch (activeCategory.value) {
    case 'basic':
      return basicComponents.value;
    case 'feedback':
      return feedbackComponents.value;
    case 'data':
      return dataComponents.value;
    default:
      return allComponents.value;
  }
});

const privacyTitle = computed(() => t('home.privacy.title'));
const privacySubTitle = computed(() => t('home.privacy.subtitle'));

// 切换分类
function switchCategory(category: 'all' | 'basic' | 'feedback' | 'data') {
  activeCategory.value = category;
}

function goComponent(card: { path: string }) {
  uni.navigateTo({ url: card.path });
}

function handleAgree() {
  uni.showToast({
    title: t('home.privacy.agreeTip'),
    icon: 'none',
  });
}

function handleDisagree() {
  uni.showToast({
    title: t('home.privacy.disagreeTip'),
    icon: 'none',
  });
}
</script>

<style scoped>
.home-page {
  @apply min-h-100vh bg-main pb-120rpx;
}

/* 顶部区域 */
.home-hero {
  @apply relative pt-80rpx px-32rpx pb-48rpx bg-gradient-to-br from-[#003dad] to-[#0052cc] mb-32rpx;
}

.hero-content {
  @apply text-center;
}

.hero-logo {
  @apply text-96rpx c-[rgba(255,255,255,0.95)] mb-24rpx flex justify-center;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10rpx);
  }
}

.hero-title {
  @apply block text-56rpx fw-800 c-white mb-12rpx tracking-2rpx;
}

.hero-subtitle {
  @apply block text-28rpx c-[rgba(255,255,255,0.85)] mb-32rpx;
}

.hero-stats {
  @apply flex items-center justify-center gap-32rpx p-24rpx bg-[rgba(255,255,255,0.15)] rd-20rpx backdrop-blur-10rpx;
}

.stat-item {
  @apply flex flex-col items-center gap-8rpx;
}

.stat-number {
  @apply text-48rpx fw-700 c-white;
}

.stat-label {
  @apply text-24rpx c-[rgba(255,255,255,0.8)];
}

.stat-divider {
  @apply w-2rpx h-60rpx bg-[rgba(255,255,255,0.3)];
}

.theme-toggle {
  @apply absolute top-32rpx right-32rpx w-80rpx h-80rpx rd-50% bg-[rgba(255,255,255,0.2)] backdrop-blur-10rpx flex items-center justify-center text-40rpx c-white transition-all duration-300;
}

.theme-toggle:active {
  @apply scale-90 bg-[rgba(255,255,255,0.3)];
}

/* 分类切换器 */
.category-tabs {
  @apply bg-main mb-24rpx;
}

.tabs-scroll {
  @apply w-full whitespace-nowrap;
}

.tabs-container {
  @apply inline-flex gap-16rpx px-32rpx py-24rpx;
}

.tab-item {
  @apply inline-flex flex-row items-center gap-12rpx px-28rpx py-20rpx bg-surface rd-20rpx border-2rpx border-solid border-transparent transition-all duration-300 shadow-[0_2rpx_8rpx_rgba(0,0,0,0.04)] relative overflow-hidden flex-shrink-0 whitespace-nowrap;
}

.tab-item::before {
  content: '';
  @apply absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-[rgba(0,61,173,0.05)] to-[rgba(0,82,204,0.02)] op-0 transition-opacity duration-300;
}

.tab-item:active {
  @apply scale-96;
}

.tab-item--active {
  @apply bg-gradient-to-br from-[#003dad] to-[#0052cc] border-[#003dad] shadow-[0_8rpx_24rpx_rgba(0,61,173,0.25)];
}

.tab-item--active::before {
  @apply op-100;
}

.tab-item--active .tab-icon {
  @apply bg-[rgba(255,255,255,0.2)] c-white scale-105;
}

.tab-item--active .tab-label {
  @apply c-white fw-700;
}

.tab-item--active .tab-count {
  @apply bg-[rgba(255,255,255,0.25)] c-white;
}

.tab-icon {
  @apply w-56rpx h-56rpx rd-16rpx bg-[rgba(0,61,173,0.08)] flex items-center justify-center text-32rpx c-[#003dad] transition-all duration-300 flex-shrink-0;
}

.tab-label {
  @apply text-26rpx fw-600 c-text-main transition-all duration-300;
}

.tab-count {
  @apply text-22rpx c-[#003dad] bg-[rgba(0,61,173,0.1)] px-12rpx py-4rpx rd-12rpx fw-600 min-w-44rpx text-center transition-all duration-300;
}

/* 组件容器 */
.components-container {
  @apply px-32rpx;
}

/* 组件列表 */
.component-list {
  @apply grid grid-cols-2 gap-16rpx;
}

.component-item {
  @apply flex flex-col items-center gap-16rpx px-20rpx py-32rpx bg-surface rd-20rpx transition-all duration-200 shadow-[0_2rpx_8rpx_rgba(0,0,0,0.02)] text-center;
}

.component-item:active {
  @apply scale-96 shadow-[0_4rpx_16rpx_rgba(0,61,173,0.12)];
}

.component-icon {
  @apply w-80rpx h-80rpx rd-20rpx bg-[rgba(0,61,173,0.08)] flex items-center justify-center text-44rpx c-[#003dad] flex-shrink-0;
}

.component-content {
  @apply w-full flex flex-col gap-8rpx;
}

.component-name {
  @apply text-28rpx fw-600 c-text-main;
}

.component-desc {
  @apply text-22rpx c-text-tips overflow-hidden text-ellipsis line-clamp-2;
}
</style>
