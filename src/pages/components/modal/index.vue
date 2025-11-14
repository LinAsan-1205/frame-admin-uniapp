<template>
  <DemoPage title="Modal 模态框" description="模态对话框，用于展示重要信息">
    <DemoSection title="基础对话框">
      <frame-space :size="12" :wrap="true">
        <frame-button size="small" @click="showBasicModal">基础对话框</frame-button>
        <frame-button size="small" @click="showConfirmModal">确认对话框</frame-button>
        <frame-button size="small" @click="showAlertModal">警告对话框</frame-button>
      </frame-space>
    </DemoSection>

    <DemoSection title="自定义配置">
      <frame-space :size="12" :wrap="true">
        <frame-button size="small" @click="showClosableModal">可关闭对话框</frame-button>
        <frame-button size="small" @click="showNoButtonModal">无按钮对话框</frame-button>
        <frame-button size="small" @click="showClickOverlayModal">点击遮罩关闭</frame-button>
      </frame-space>
    </DemoSection>

    <DemoSection title="API 属性" :grid="true">
      <ApiItem name="title" type="string" description="标题" />
      <ApiItem name="content" type="string" description="内容" />
      <ApiItem name="show-cancel" type="boolean" description="是否显示取消按钮" />
      <ApiItem name="cancel-text" type="string" description="取消按钮文字" />
      <ApiItem name="confirm-text" type="string" description="确认按钮文字" />
      <ApiItem name="closable" type="boolean" description="是否显示关闭按钮" />
      <ApiItem name="close-on-click-overlay" type="boolean" description="点击遮罩是否关闭" />
    </DemoSection>

    <frame-modal
      :show="modalShow"
      :title="modalTitle"
      :content="modalContent"
      :show-cancel="modalShowCancel"
      :cancel-text="modalCancelText"
      :confirm-text="modalConfirmText"
      :confirm-color="modalConfirmColor"
      :closable="modalClosable"
      :close-on-click-overlay="modalCloseOnOverlay"
      @close="modalShow = false"
      @cancel="modalShow = false"
      @confirm="handleConfirm"
    />
  </DemoPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoPage from '@/components/DemoPage.vue';
import DemoSection from '@/components/DemoSection.vue';
import ApiItem from '@/components/ApiItem.vue';

const modalShow = ref(false)
const modalTitle = ref('')
const modalContent = ref('')
const modalShowCancel = ref(true)
const modalCancelText = ref('取消')
const modalConfirmText = ref('确定')
const modalConfirmColor = ref('')
const modalClosable = ref(false)
const modalCloseOnOverlay = ref(false)

function showBasicModal() {
  modalTitle.value = '提示'
  modalContent.value = '这是一个基础的模态框'
  modalShowCancel.value = true
  modalClosable.value = false
  modalCloseOnOverlay.value = false
  modalConfirmColor.value = ''
  modalShow.value = true
}

function showConfirmModal() {
  modalTitle.value = '确认操作'
  modalContent.value = '确定要执行此操作吗？'
  modalShowCancel.value = true
  modalClosable.value = false
  modalCloseOnOverlay.value = false
  modalConfirmColor.value = '#2563eb'
  modalShow.value = true
}

function showAlertModal() {
  modalTitle.value = '警告'
  modalContent.value = '此操作不可撤销，请谨慎操作！'
  modalShowCancel.value = true
  modalClosable.value = false
  modalCloseOnOverlay.value = false
  modalConfirmColor.value = '#ef4444'
  modalShow.value = true
}

function showClosableModal() {
  modalTitle.value = '可关闭对话框'
  modalContent.value = '点击右上角的关闭按钮可以关闭对话框'
  modalShowCancel.value = true
  modalClosable.value = true
  modalCloseOnOverlay.value = false
  modalConfirmColor.value = ''
  modalShow.value = true
}

function showNoButtonModal() {
  modalTitle.value = '无按钮对话框'
  modalContent.value = '这个对话框没有底部按钮，点击右上角关闭'
  modalShowCancel.value = false
  modalClosable.value = true
  modalCloseOnOverlay.value = false
  modalConfirmColor.value = ''
  modalShow.value = true
}

function showClickOverlayModal() {
  modalTitle.value = '点击遮罩关闭'
  modalContent.value = '点击对话框外的遮罩层可以关闭对话框'
  modalShowCancel.value = true
  modalClosable.value = false
  modalCloseOnOverlay.value = true
  modalConfirmColor.value = ''
  modalShow.value = true
}

function handleConfirm() {
  modalShow.value = false
  uni.showToast({
    title: '确认成功',
    icon: 'success',
  })
}
</script>
