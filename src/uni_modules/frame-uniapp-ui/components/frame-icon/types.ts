import type { PropType } from 'vue'

/**
 * 图标类型
 */
export type IconType = 'icon' | 'image' | 'svg'

/**
 * 图标尺寸预设
 */
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * FrameIcon 组件属性
 */
export interface FrameIconProps {
  /**
   * 图标名称或图片路径
   */
  name?: string

  /**
   * 图标类型
   * @default 'icon'
   */
  type?: IconType

  /**
   * 图标尺寸（预设或自定义）
   * @default 'md'
   */
  size?: IconSize | string | number

  /**
   * 图标颜色
   */
  color?: string

  /**
   * 图标类名前缀（用于图标字体）
   * @default 'wd-icon'
   */
  prefix?: string

  /**
   * 是否加粗
   * @default false
   */
  bold?: boolean

  /**
   * 是否旋转动画
   * @default false
   */
  spin?: boolean

  /**
   * 旋转速度（秒）
   * @default 1
   */
  spinDuration?: number

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
 * FrameIcon 组件事件
 */
export interface FrameIconEmits {
  /**
   * 点击事件
   */
  (e: 'click', event: Event): void
}

export const frameIconProps = {
  name: {
    type: String,
    default: '',
  },
  type: {
    type: String as PropType<IconType>,
    default: 'icon',
  },
  size: {
    type: [String, Number] as PropType<IconSize | string | number>,
    default: 'md',
  },
  color: {
    type: String,
    default: '',
  },
  prefix: {
    type: String,
    default: 'wd-icon',
  },
  bold: {
    type: Boolean,
    default: false,
  },
  spin: {
    type: Boolean,
    default: false,
  },
  spinDuration: {
    type: Number,
    default: 1,
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
export const sizeMap: Record<IconSize, string> = {
  xs: '32rpx',
  sm: '40rpx',
  md: '48rpx',
  lg: '56rpx',
  xl: '64rpx',
}
