import type { PropType } from 'vue'

/**
 * 头像形状
 */
export type AvatarShape = 'circle' | 'square'

/**
 * 头像尺寸预设
 */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * FrameAvatar 组件属性
 */
export interface FrameAvatarProps {
  /**
   * 头像图片地址
   */
  src?: string

  /**
   * 头像文字（图片加载失败时显示）
   */
  text?: string

  /**
   * 图标名称（图片和文字都没有时显示）
   */
  icon?: string

  /**
   * 头像尺寸
   * @default 'md'
   */
  size?: AvatarSize | string | number

  /**
   * 头像形状
   * @default 'circle'
   */
  shape?: AvatarShape

  /**
   * 背景颜色
   */
  bgColor?: string

  /**
   * 文字/图标颜色
   */
  color?: string

  /**
   * 图标类名前缀
   * @default 'wd-icon'
   */
  iconPrefix?: string

  /**
   * 图片裁剪模式
   * @default 'aspectFill'
   */
  mode?: string

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
 * FrameAvatar 组件事件
 */
export interface FrameAvatarEmits {
  /**
   * 点击事件
   */
  (e: 'click', event: Event): void

  /**
   * 图片加载失败事件
   */
  (e: 'error', event: Event): void
}

export const frameAvatarProps = {
  src: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: 'user',
  },
  size: {
    type: [String, Number] as PropType<AvatarSize | string | number>,
    default: 'md',
  },
  shape: {
    type: String as PropType<AvatarShape>,
    default: 'circle',
  },
  bgColor: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '',
  },
  iconPrefix: {
    type: String,
    default: 'wd-icon',
  },
  mode: {
    type: String,
    default: 'aspectFill',
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
export const avatarSizeMap: Record<AvatarSize, string> = {
  xs: '48rpx',
  sm: '64rpx',
  md: '80rpx',
  lg: '96rpx',
  xl: '120rpx',
}
