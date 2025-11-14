import type { PropType } from 'vue'

/**
 * FrameModal 组件属性
 */
export interface FrameModalProps {
  /**
   * 是否显示模态框
   * @default false
   */
  show?: boolean

  /**
   * 标题
   */
  title?: string

  /**
   * 内容
   */
  content?: string

  /**
   * 是否显示取消按钮
   * @default true
   */
  showCancel?: boolean

  /**
   * 取消按钮文字
   * @default '取消'
   */
  cancelText?: string

  /**
   * 确认按钮文字
   * @default '确定'
   */
  confirmText?: string

  /**
   * 确认按钮颜色
   */
  confirmColor?: string

  /**
   * 是否显示关闭图标
   * @default false
   */
  closable?: boolean

  /**
   * 点击遮罩层是否关闭
   * @default false
   */
  closeOnClickOverlay?: boolean

  /**
   * z-index 层级
   * @default 2000
   */
  zIndex?: number

  /**
   * 宽度
   */
  width?: string | number

  /**
   * 自定义样式
   */
  customStyle?: Record<string, any> | string

  /**
   * 自定义类名
   */
  customClass?: string
}

/**
 * FrameModal 组件事件
 */
export interface FrameModalEmits {
  /**
   * 取消事件
   */
  (e: 'cancel'): void

  /**
   * 确认事件
   */
  (e: 'confirm'): void

  /**
   * 关闭事件
   */
  (e: 'close'): void
}

export const frameModalProps = {
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
  cancelText: {
    type: String,
    default: '取消',
  },
  confirmText: {
    type: String,
    default: '确定',
  },
  confirmColor: {
    type: String,
    default: '',
  },
  closable: {
    type: Boolean,
    default: false,
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: false,
  },
  zIndex: {
    type: Number,
    default: 2000,
  },
  width: {
    type: [String, Number],
    default: '600rpx',
  },
  customStyle: {
    type: [Object, String] as PropType<Record<string, any> | string>,
    default: () => ({}),
  },
  customClass: {
    type: String,
    default: '',
  },
}
