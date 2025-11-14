<template>
  <DemoPage title="Popup 弹出层" description="从不同方向弹出的浮层容器">
    <DemoSection title="弹出位置">
      <frame-space :size="12" :wrap="true">
        <frame-button size="small" @click="showPopup('top')">顶部弹出</frame-button>
        <frame-button size="small" @click="showPopup('bottom')">底部弹出</frame-button>
        <frame-button size="small" @click="showPopup('left')">左侧弹出</frame-button>
        <frame-button size="small" @click="showPopup('right')">右侧弹出</frame-button>
        <frame-button size="small" @click="showPopup('center')">居中弹出</frame-button>
      </frame-space>
    </DemoSection>

    <DemoSection title="圆角弹出">
      <frame-space :size="12" :wrap="true">
        <frame-button size="small" @click="showRoundPopup('bottom')">底部圆角</frame-button>
        <frame-button size="small" @click="showRoundPopup('center')">居中圆角</frame-button>
      </frame-space>
    </DemoSection>

    <DemoSection title="API 属性" :grid="true">
      <ApiItem name="show" type="boolean" description="是否显示弹出层" />
      <ApiItem name="position" type="string" description="弹出位置：top | bottom | left | right | center" />
      <ApiItem name="round" type="boolean" description="是否显示圆角" />
      <ApiItem name="height" type="string" description="弹出层高度" />
      <ApiItem name="width" type="string" description="弹出层宽度" />
    </DemoSection>

    <frame-popup
      :show="popupShow"
      :position="popupPosition"
      :round="popupRound"
      :height="popupHeight"
      :width="popupWidth"
      @close="popupShow = false"
    >
      <view class="popup-content">
        <text class="popup-title">{{ popupPosition }} 弹出层</text>
        <text class="popup-desc">这是弹出层的内容区域</text>
        <frame-button size="small" @click="popupShow = false">关闭</frame-button>
      </view>
    </frame-popup>
  </DemoPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoPage from '@/components/DemoPage.vue';
import DemoSection from '@/components/DemoSection.vue';
import ApiItem from '@/components/ApiItem.vue';

const popupShow = ref(false)
const popupPosition = ref<'top' | 'bottom' | 'left' | 'right' | 'center'>('bottom')
const popupRound = ref(false)
const popupHeight = ref('')
const popupWidth = ref('')

function showPopup(position: 'top' | 'bottom' | 'left' | 'right' | 'center') {
  popupPosition.value = position
  popupRound.value = false
  popupHeight.value = position === 'top' || position === 'bottom' ? '40vh' : ''
  popupWidth.value = position === 'left' || position === 'right' ? '70vw' : ''
  popupShow.value = true
}

function showRoundPopup(position: 'bottom' | 'center') {
  popupPosition.value = position
  popupRound.value = true
  popupHeight.value = position === 'bottom' ? '40vh' : ''
  popupWidth.value = ''
  popupShow.value = true
}
</script>

<style scoped lang="scss">
.popup-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24rpx;
  padding: 48rpx 32rpx;
}

.popup-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #003dad;
}

.popup-desc {
  font-size: 28rpx;
  color: var(--theme-content-color, var(--fui-color-text-secondary));
  text-align: center;
}
</style>
