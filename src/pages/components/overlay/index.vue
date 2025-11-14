<template>
  <DemoPage title="Overlay 遮罩层" description="创建一个遮罩层，用于强调特定元素">
    <!-- 基础用法 -->
    <DemoSection title="基础用法">
      <frame-space :size="12" :wrap="true">
        <frame-button size="small" @click="showOverlay = true">
          显示遮罩
        </frame-button>
        <frame-button size="small" @click="showOverlayWithContent = true">
          遮罩 + 内容
        </frame-button>
        <frame-button size="small" @click="showOverlayNoClose = true">
          不可关闭
        </frame-button>
      </frame-space>
    </DemoSection>

    <!-- API 属性 -->
    <DemoSection title="API 属性" :grid="true">
      <ApiItem
        name="show"
        type="boolean"
        description="是否显示遮罩"
      />
      <ApiItem
        name="z-index"
        type="number"
        description="层级"
      />
      <ApiItem
        name="duration"
        type="number"
        description="动画时长(ms)"
      />
      <ApiItem
        name="close-on-click-overlay"
        type="boolean"
        description="点击遮罩是否关闭"
      />
    </DemoSection>

    <!-- 遮罩层 - 始终渲染，不影响布局 -->
    <frame-overlay
      :show="showOverlay"
      @close="showOverlay = false"
    />

    <frame-overlay
      :show="showOverlayWithContent"
      @close="showOverlayWithContent = false"
    >
      <view class="overlay-content" @click.stop>
        <text class="overlay-title">遮罩层内容</text>
        <text class="overlay-desc">这是一段说明文字</text>
        <frame-button size="small" @click="showOverlayWithContent = false">
          关闭
        </frame-button>
      </view>
    </frame-overlay>

    <frame-overlay
      :show="showOverlayNoClose"
      :close-on-click-overlay="false"
    >
      <view class="overlay-content" @click.stop>
        <text class="overlay-title">需要手动关闭</text>
        <frame-button size="small" @click="showOverlayNoClose = false">
          确定
        </frame-button>
      </view>
    </frame-overlay>
  </DemoPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoPage from '@/components/DemoPage.vue';
import DemoSection from '@/components/DemoSection.vue';
import ApiItem from '@/components/ApiItem.vue';

const showOverlay = ref(false)
const showOverlayWithContent = ref(false)
const showOverlayNoClose = ref(false)
</script>

<style scoped lang="scss">
.overlay-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24rpx;
  padding: 48rpx 32rpx;
  background: var(--theme-surface-color, var(--fui-color-surface));
  border-radius: 24rpx;
  max-width: 80%;
}

.overlay-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #003dad;
}

.overlay-desc {
  font-size: 28rpx;
  color: var(--theme-content-color, var(--fui-color-text-secondary));
  text-align: center;
}
</style>
