import type { PropType } from 'vue'

/**
 * 加载动画类型
 */
export type LoadingType = 'spinner' | 'circular' | 'dots' | 'pulse'

/**
 * 加载动画尺寸
 */
export type LoadingSize = 'sm' | 'md' | 'lg'

/**
 * FrameLoading 组件属性
 */
export interface FrameLoadingProps {
  /**
   * 是否显示加载
   * @default false
   */
  show?: boolean

  /**
   * 加载动画类型
   * @default 'spinner'
   */
  type?: LoadingType

  /**
   * 加载动画尺寸
   * @default 'md'
   */
  size?: LoadingSize | string | number

  /**
   * 加载动画颜色
   */
  color?: string

  /**
   * 是否垂直排列
   * @default false
   */
  vertical?: boolean

  /**
   * 加载文字
   */
  text?: string

  /**
   * 文字颜色
   */
  textColor?: string

  /**
   * 文字大小
   */
  textSize?: string | number

  /**
   * 是否显示遮罩层
   * @default false
   */
  overlay?: boolean

  /**
   * 遮罩层透明度
   * @default 0.5
   */
  overlayOpacity?: number

  /**
   * 自定义样式
   */
  customStyle?: Record<string, any> | string

  /**
   * 自定义类名
   */
  customClass?: string
}

export const frameLoadingProps = {
  show: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<LoadingType>,
    default: 'spinner',
  },
  size: {
    type: [String, Number] as PropType<LoadingSize | string | number>,
    default: 'md',
  },
  color: {
    type: String,
    default: '',
  },
  vertical: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: '',
  },
  textColor: {
    type: String,
    default: '',
  },
  textSize: {
    type: [String, Number],
    default: '',
  },
  overlay: {
    type: Boolean,
    default: false,
  },
  overlayOpacity: {
    type: Number,
    default: 0.5,
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
 * 尺寸映射
 */
export const loadingSizeMap: Record<LoadingSize, string> = {
  sm: '32rpx',
  md: '48rpx',
  lg: '64rpx',
}
