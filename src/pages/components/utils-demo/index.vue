<template>
  <view class="demo-page">
    <view class="demo-section">
      <text class="demo-title">工具函数测试页面</text>

      <!-- BEM 命名测试 -->
      <view class="demo-block">
        <text class="demo-subtitle">BEM 命名工具</text>
        <view :class="buttonClasses">
          <text>使用 BEM 工具生成的类名</text>
        </view>
        <text class="demo-result">类名: {{ buttonClassesText }}</text>
      </view>

      <!-- 单位转换测试 -->
      <view class="demo-block">
        <text class="demo-subtitle">单位转换工具</text>
        <text class="demo-result">addUnit(100): {{ addUnitResult }}</text>
        <text class="demo-result">addUnit('100px'): {{ addUnitPxResult }}</text>
      </view>

      <!-- 类型判断测试 -->
      <view class="demo-block">
        <text class="demo-subtitle">类型判断工具</text>
        <text class="demo-result">number('123'): {{ numberResult }}</text>
        <text class="demo-result">string('hello'): {{ stringResult }}</text>
        <text class="demo-result">array([]): {{ arrayResult }}</text>
        <text class="demo-result">isEmpty(''): {{ isEmptyResult }}</text>
      </view>

      <!-- 平台工具测试 -->
      <view class="demo-block">
        <text class="demo-subtitle">平台工具</text>
        <text class="demo-result">状态栏高度: {{ statusBarHeight }}px</text>
        <text class="demo-result">导航栏高度: {{ navHeight }}px</text>
        <text class="demo-result">安全区底部: {{ safeBottom }}px</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  addUnit,
  array,
  createNamespace,
  getCustomNavHeight,
  getSafeAreaBottom,
  getStatusBarHeight,
  isEmpty,
  number,
  string,
} from '@/uni_modules/frame-uniapp-ui/utils'

// BEM 测试
const { n, classes } = createNamespace('button')
const buttonClasses = computed(() => {
  return classes(
    n(),
    n('--primary'),
    [true, n('--active')],
    [false, n('--disabled')],
  )
})
const buttonClassesText = computed(() => buttonClasses.value.join(' '))

// 单位转换测试
const addUnitResult = addUnit(100)
const addUnitPxResult = addUnit('100px')

// 类型判断测试
const numberResult = number('123')
const stringResult = string('hello')
const arrayResult = array([])
const isEmptyResult = isEmpty('')

// 平台工具测试
const statusBarHeight = getStatusBarHeight()
const navHeight = getCustomNavHeight()
const safeBottom = getSafeAreaBottom()
</script>

<style scoped lang="scss">
.demo-page {
  padding: 32rpx;
  background: #f5f6f8;
  min-height: 100vh;
}

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.demo-title {
  font-size: 40rpx;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 16rpx;
}

.demo-block {
  padding: 24rpx;
  background: white;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.demo-subtitle {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 16rpx;
  display: block;
}

.demo-result {
  font-size: 28rpx;
  color: #666;
  margin-top: 12rpx;
  display: block;
  font-family: 'Courier New', monospace;
  padding: 8rpx 12rpx;
  background: #f0f2f5;
  border-radius: 8rpx;
}

.fui-button {
  padding: 16rpx 32rpx;
  background: #2563eb;
  color: white;
  border-radius: 8rpx;
  margin-top: 12rpx;

  text {
    color: white;
  }

  &--active {
    background: #1d4ed8;
  }
}
</style>
