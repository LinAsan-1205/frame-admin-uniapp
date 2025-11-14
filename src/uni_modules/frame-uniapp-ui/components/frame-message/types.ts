import type { PropType } from 'vue'

/**
 * 消息类型
 */
export type MessageType = 'success' | 'error' | 'warning' | 'info'

/**
 * 消息位置
 */
export type MessagePosition = 'top' | 'center' | 'bottom'

/**
 * FrameMessage 组件属性
 */
export interface FrameMessageProps {
  /**
   * 是否显示消息
   * @default false
   */
  show?: boolean

  /**
   * 消息类型
   * @default 'info'
   */
  type?: MessageType

  /**
   * 消息内容
   */
  message?: string

  /**
   * 消息位置
   * @default 'center'
   */
  position?: MessagePosition

  /**
   * 显示时长（毫秒），0 表示不自动关闭
   * @default 3000
   */
  duration?: number

  /**
   * 是否显示图标
   * @default true
   */
  showIcon?: boolean

  /**
   * 自定义图标
   */
  icon?: string

  /**
   * z-index 层级
   * @default 2000
   */
  zIndex?: number

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
 * FrameMessage 组件事件
 */
export interface FrameMessageEmits {
  /**
   * 关闭事件
   */
  (e: 'close'): void

  /**
   * 关闭后的回调
   */
  (e: 'closed'): void
}

export const frameMessageProps = {
  show: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<MessageType>,
    default: 'info',
  },
  message: {
    type: String,
    default: '',
  },
  position: {
    type: String as PropType<MessagePosition>,
    default: 'center',
  },
  duration: {
    type: Number,
    default: 3000,
  },
  showIcon: {
    type: Boolean,
    default: true,
  },
  icon: {
    type: String,
    default: '',
  },
  zIndex: {
    type: Number,
    default: 2000,
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

/**
 * 类型图标映射
 */
export const messageIconMap: Record<MessageType, string> = {
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info',
}
