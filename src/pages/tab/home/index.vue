<template>
  <view class="home-page">
    <!-- 顶部区域 -->
    <view class="home-hero">
      <view class="hero-content">
        <view class="hero-logo">
          <view class="i-mdi-vuejs" />
        </view>
        <text class="hero-title">Frame UI</text>
        <text class="hero-subtitle">{{ t('home.library.description') }}</text>
        <view class="hero-stats">
          <view class="stat-item">
            <text class="stat-number">{{ allComponents.length }}</text>
            <text class="stat-label">组件</text>
          </view>
          <view class="stat-divider" />
          <view class="stat-item">
            <text class="stat-number">4</text>
            <text class="stat-label">分类</text>
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
            :class="['tab-item', { 'tab-item--active': activeCategory === tab.value }]"
            @click="switchCategory(tab.value)"
          >
            <view class="tab-icon">
              <view :class="tab.icon" />
            </view>
            <text class="tab-label">{{ tab.label }}</text>
            <text class="tab-count">{{ tab.count }}</text>
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
            <text class="component-name">{{ card.name }}</text>
            <text class="component-desc">{{ card.desc }}</text>
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
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AgreePrivacy from '@/components/agree-privacy/index.vue'
import { useTheme } from '@/hooks'

interface ComponentCardItem {
  key: string
  name: string
  desc: string
  path: string
  category: 'basic' | 'form' | 'feedback' | 'data'
  icon?: string
}

const showPrivacy = ref(false)
const { t } = useI18n()
const { isDark, toggleTheme } = useTheme()

// 当前激活的分类
const activeCategory = ref<'all' | 'basic' | 'feedback' | 'data'>('all')

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
])

// 按分类筛选组件
const basicComponents = computed(() =>
  allComponents.value.filter(c => c.category === 'basic'),
)

const formComponents = computed(() =>
  allComponents.value.filter(c => c.category === 'form'),
)

const feedbackComponents = computed(() =>
  allComponents.value.filter(c => c.category === 'feedback'),
)

const dataComponents = computed(() =>
  allComponents.value.filter(c => c.category === 'data'),
)

// 分类标签配置
const categoryTabs = computed(() => [
  {
    value: 'all',
    label: '全部',
    count: allComponents.value.length,
    icon: 'i-mdi-apps',
  },
  {
    value: 'basic',
    label: '基础',
    count: basicComponents.value.length,
    icon: 'i-mdi-cube-outline',
  },
  {
    value: 'feedback',
    label: '反馈',
    count: feedbackComponents.value.length,
    icon: 'i-mdi-bell-outline',
  },
  {
    value: 'data',
    label: '数据',
    count: dataComponents.value.length,
    icon: 'i-mdi-view-dashboard-outline',
  },
])

// 当前显示的组件列表
const displayedComponents = computed(() => {
  switch (activeCategory.value) {
    case 'basic':
      return basicComponents.value
    case 'feedback':
      return feedbackComponents.value
    case 'data':
      return dataComponents.value
    default:
      return allComponents.value
  }
})

const privacyTitle = computed(() => t('home.privacy.title'))
const privacySubTitle = computed(() => t('home.privacy.subtitle'))

// 切换分类
function switchCategory(category: 'all' | 'basic' | 'feedback' | 'data') {
  activeCategory.value = category
}

function goComponent(card: { path: string }) {
  uni.navigateTo({ url: card.path })
}

function handleAgree() {
  uni.showToast({
    title: t('home.privacy.agreeTip'),
    icon: 'none',
  })
}

function handleDisagree() {
  uni.showToast({
    title: t('home.privacy.disagreeTip'),
    icon: 'none',
  })
}
</script>

<style scoped lang="scss">
.home-page {
  min-height: 100vh;
  background: var(--fui-color-bg-primary);
  padding-bottom: 120rpx;
}

/* 顶部区域 */
.home-hero {
  position: relative;
  padding: 80rpx 32rpx 48rpx;
  background: linear-gradient(135deg, #003dad 0%, #0052cc 100%);
  margin-bottom: 32rpx;
}

.hero-content {
  text-align: center;
}

.hero-logo {
  font-size: 96rpx;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 24rpx;
  display: flex;
  justify-content: center;
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
  display: block;
  font-size: 56rpx;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 12rpx;
  letter-spacing: 2rpx;
}

.hero-subtitle {
  display: block;
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 32rpx;
  line-height: 1.6;
}

.hero-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32rpx;
  padding: 24rpx;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20rpx;
  backdrop-filter: blur(10px);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
}

.stat-number {
  font-size: 48rpx;
  font-weight: 700;
  color: #ffffff;
  line-height: 1;
}

.stat-label {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
}

.stat-divider {
  width: 2rpx;
  height: 60rpx;
  background: rgba(255, 255, 255, 0.3);
}

.theme-toggle {
  position: absolute;
  top: 32rpx;
  right: 32rpx;
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
  color: #ffffff;
  transition: all 0.3s;
  cursor: pointer;
}

.theme-toggle:active {
  transform: scale(0.9);
  background: rgba(255, 255, 255, 0.3);
}

/* 分类切换器 */
.category-tabs {
  background: var(--fui-color-bg-primary);
  margin-bottom: 24rpx;
}

.tabs-scroll {
  width: 100%;
  white-space: nowrap;
}

.tabs-container {
  display: inline-flex;
  gap: 16rpx;
  padding: 24rpx 32rpx;
}

.tab-item {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 12rpx;
  padding: 20rpx 28rpx;
  background: var(--fui-color-surface);
  border-radius: 20rpx;
  border: 2rpx solid transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  white-space: nowrap;
}

.tab-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 61, 173, 0.05) 0%, rgba(0, 82, 204, 0.02) 100%);
  opacity: 0;
  transition: opacity 0.3s;
}

.tab-item:active {
  transform: scale(0.96);
}

.tab-item--active {
  background: linear-gradient(135deg, #003dad 0%, #0052cc 100%);
  border-color: #003dad;
  box-shadow: 0 8rpx 24rpx rgba(0, 61, 173, 0.25);
}

.tab-item--active::before {
  opacity: 1;
}

.tab-item--active .tab-icon {
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  transform: scale(1.05);
}

.tab-item--active .tab-label {
  color: #ffffff;
  font-weight: 700;
}

.tab-item--active .tab-count {
  background: rgba(255, 255, 255, 0.25);
  color: #ffffff;
}

.tab-icon {
  width: 56rpx;
  height: 56rpx;
  border-radius: 16rpx;
  background: rgba(0, 61, 173, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  color: #003dad;
  transition: all 0.3s;
  flex-shrink: 0;
}

.tab-label {
  font-size: 26rpx;
  font-weight: 600;
  color: var(--fui-color-text-primary);
  transition: all 0.3s;
  line-height: 1.2;
}

.tab-count {
  font-size: 22rpx;
  color: #003dad;
  background: rgba(0, 61, 173, 0.1);
  padding: 4rpx 12rpx;
  border-radius: 12rpx;
  font-weight: 600;
  min-width: 44rpx;
  text-align: center;
  transition: all 0.3s;
}

/* 组件容器 */
.components-container {
  padding: 0 32rpx;
}

/* 组件列表 */
.component-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16rpx;
}

.component-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
  padding: 32rpx 20rpx;
  background: var(--fui-color-surface);
  border-radius: 20rpx;
  transition: all 0.2s;
  cursor: pointer;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.02);
  text-align: center;
}

.component-item:active {
  transform: scale(0.96);
  box-shadow: 0 4rpx 16rpx rgba(0, 61, 173, 0.12);
}

.component-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 20rpx;
  background: rgba(0, 61, 173, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 44rpx;
  color: #003dad;
  flex-shrink: 0;
}

.component-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.component-name {
  font-size: 28rpx;
  font-weight: 600;
  color: var(--fui-color-text-primary);
  line-height: 1.3;
}

.component-desc {
  font-size: 22rpx;
  color: var(--fui-color-text-tertiary);
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
