<template>
  <DemoPage title="Message 消息提示" description="轻量级的信息反馈组件">
    <DemoSection title="消息类型">
      <frame-space :size="12" :wrap="true">
        <frame-button size="small" theme="success" @click="showMessage('success')">成功提示</frame-button>
        <frame-button size="small" theme="danger" @click="showMessage('error')">错误提示</frame-button>
        <frame-button size="small" theme="warning" @click="showMessage('warning')">警告提示</frame-button>
        <frame-button size="small" theme="primary" @click="showMessage('info')">信息提示</frame-button>
      </frame-space>
    </DemoSection>

    <DemoSection title="显示位置">
      <frame-space :size="12" :wrap="true">
        <frame-button size="small" @click="showMessagePosition('top')">顶部显示</frame-button>
        <frame-button size="small" @click="showMessagePosition('center')">居中显示</frame-button>
        <frame-button size="small" @click="showMessagePosition('bottom')">底部显示</frame-button>
      </frame-space>
    </DemoSection>

    <DemoSection title="自定义配置">
      <frame-space :size="12" :wrap="true">
        <frame-button size="small" @click="showLongMessage">长时间显示(5s)</frame-button>
        <frame-button size="small" @click="showNoIconMessage">无图标提示</frame-button>
      </frame-space>
    </DemoSection>

    <DemoSection title="API 属性" :grid="true">
      <ApiItem name="type" type="string" description="类型：success | error | warning | info" />
      <ApiItem name="message" type="string" description="消息文字" />
      <ApiItem name="position" type="string" description="显示位置：top | center | bottom" />
      <ApiItem name="duration" type="number" description="显示时长(ms)，默认3000" />
      <ApiItem name="show-icon" type="boolean" description="是否显示图标" />
    </DemoSection>

    <frame-message
      :show="messageShow"
      :type="messageType"
      :message="messageText"
      :position="messagePosition"
      :duration="messageDuration"
      :show-icon="messageShowIcon"
      @close="messageShow = false"
    />
  </DemoPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoPage from '@/components/DemoPage.vue';
import DemoSection from '@/components/DemoSection.vue';
import ApiItem from '@/components/ApiItem.vue';

const messageShow = ref(false)
const messageType = ref<'success' | 'error' | 'warning' | 'info'>('success')
const messageText = ref('')
const messagePosition = ref<'top' | 'center' | 'bottom'>('top')
const messageDuration = ref(3000)
const messageShowIcon = ref(true)

function showMessage(type: 'success' | 'error' | 'warning' | 'info') {
  const messages = {
    success: '操作成功！',
    error: '操作失败，请重试',
    warning: '请注意检查信息',
    info: '这是一条提示信息',
  }
  messageType.value = type
  messageText.value = messages[type]
  messagePosition.value = 'top'
  messageDuration.value = 3000
  messageShowIcon.value = true
  messageShow.value = true
}

function showMessagePosition(position: 'top' | 'center' | 'bottom') {
  messageType.value = 'info'
  messageText.value = `${position === 'top' ? '顶部' : position === 'center' ? '居中' : '底部'}显示`
  messagePosition.value = position
  messageDuration.value = 3000
  messageShowIcon.value = true
  messageShow.value = true
}

function showLongMessage() {
  messageType.value = 'success'
  messageText.value = '这条消息会显示 5 秒钟'
  messagePosition.value = 'top'
  messageDuration.value = 5000
  messageShowIcon.value = true
  messageShow.value = true
}

function showNoIconMessage() {
  messageType.value = 'info'
  messageText.value = '这是没有图标的消息'
  messagePosition.value = 'top'
  messageDuration.value = 3000
  messageShowIcon.value = false
  messageShow.value = true
}
</script>
