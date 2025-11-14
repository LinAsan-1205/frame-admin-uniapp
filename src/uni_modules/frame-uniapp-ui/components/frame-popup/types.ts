import type { PropType } from 'vue'

/**
 * Popup 弹出位置
 */
export type PopupPosition = 'top' | 'bottom' | 'left' | 'right' | 'center'

/**
 * FramePopup 组件属性
 */
export interface FramePopupProps {
  /**
   * 是否显示弹出层
   * @default false
   */
  show?: boolean

  /**
   * 弹出位置
   * @default 'bottom'
   */
  position?: PopupPosition

  /**
   * 是否显示遮罩层
   * @default true
   */
  overlay?: boolean

  /**
   * 是否点击遮罩层关闭
   * @default true
   */
  closeOnClickOverlay?: boolean

  /**
   * 弹出层宽度（position 为 left/right 时生效）
   */
  width?: string | number

  /**
   * 弹出层高度（position 为 top/bottom 时生效）
   */
  height?: string | number

  /**
   * 是否显示圆角
   * @default false
   */
  round?: boolean

  /**
   * 圆角大小
   * @default '24rpx'
   */
  radius?: string | number

  /**
   * 是否开启底部安全区适配
   * @default false
   */
  safeAreaInsetBottom?: boolean

  /**
   * 是否开启顶部安全区适配
   * @default false
   */
  safeAreaInsetTop?: boolean

  /**
   * 动画时长（毫秒）
   * @default 300
   */
  duration?: number

  /**
   * z-index 层级
   * @default 1000
   */
  zIndex?: number

  /**
   * 背景颜色
   */
  bgColor?: string

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
 * FramePopup 组件事件
 */
export interface FramePopupEmits {
  /**
   * 打开事件（动画结束后触发）
   */
  (e: 'open'): void

  /**
   * 关闭事件（动画结束后触发）
   */
  (e: 'close'): void

  /**
   * 点击遮罩层事件
   */
  (e: 'click-overlay'): void
}

export const framePopupProps = {
  show: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String as PropType<PopupPosition>,
    default: 'bottom',
  },
  overlay: {
    type: Boolean,
    default: true,
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
  width: {
    type: [String, Number],
    default: '',
  },
  height: {
    type: [String, Number],
    default: '',
  },
  round: {
    type: Boolean,
    default: false,
  },
  radius: {
    type: [String, Number],
    default: '24rpx',
  },
  safeAreaInsetBottom: {
    type: Boolean,
    default: false,
  },
  safeAreaInsetTop: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Number,
    default: 300,
  },
  zIndex: {
    type: Number,
    default: 1000,
  },
  bgColor: {
    type: String,
    default: '#ffffff',
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
