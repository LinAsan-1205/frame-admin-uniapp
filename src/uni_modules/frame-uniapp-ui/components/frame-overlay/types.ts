import type { PropType } from 'vue'

/**
 * FrameOverlay 组件属性
 */
export interface FrameOverlayProps {
  /**
   * 是否显示遮罩层
   * @default false
   */
  show?: boolean

  /**
   * z-index 层级
   * @default 1000
   */
  zIndex?: number

  /**
   * 遮罩层透明度（0-1）
   * @default 0.5
   */
  opacity?: number

  /**
   * 动画持续时间（毫秒）
   * @default 300
   */
  duration?: number

  /**
   * 是否锁定背景滚动
   * @default true
   */
  lockScroll?: boolean

  /**
   * 点击遮罩层是否关闭
   * @default true
   */
  closeOnClickOverlay?: boolean

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
 * FrameOverlay 组件事件
 */
export interface FrameOverlayEmits {
  /**
   * 点击遮罩层事件
   */
  (e: 'click', event: Event): void

  /**
   * 关闭事件
   */
  (e: 'close'): void
}

export const frameOverlayProps = {
  show: {
    type: Boolean,
    default: false,
  },
  zIndex: {
    type: Number,
    default: 1000,
  },
  opacity: {
    type: Number,
    default: 0.5,
  },
  duration: {
    type: Number,
    default: 300,
  },
  lockScroll: {
    type: Boolean,
    default: true,
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
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
