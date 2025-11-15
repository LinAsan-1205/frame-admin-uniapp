import type { PropType } from 'vue'

/**
 * FrameNavBar 组件属性
 */
export interface FrameNavBarProps {
  /**
   * 标题
   */
  title?: string

  /**
   * 标题是否居中
   * @default true
   */
  titleCenter?: boolean

  /**
   * 是否固定在顶部
   * @default true
   */
  fixed?: boolean

  /**
   * 是否显示占位元素（fixed 为 true 时生效）
   * @default true
   */
  placeholder?: boolean

  /**
   * 是否显示下边框
   * @default false
   */
  border?: boolean

  /**
   * 导航栏高度
   * @default '44px'
   */
  height?: string | number

  /**
   * 背景颜色
   * @default '#ffffff'
   */
  bgColor?: string

  /**
   * 文字颜色
   * @default '#1a1a1a'
   */
  color?: string

  /**
   * 是否显示左侧内容
   * @default true
   */
  showLeft?: boolean

  /**
   * 左侧图标
   * @default 'arrow-left'
   */
  leftIcon?: string

  /**
   * 左侧文字
   */
  leftText?: string

  /**
   * 左侧图标大小
   * @default 'md'
   */
  leftIconSize?: string

  /**
   * 左侧图标颜色
   */
  leftIconColor?: string

  /**
   * 左侧最小宽度
   */
  leftWidth?: string | number

  /**
   * 是否显示首页图标（当在首页时）
   * @default true
   */
  showHomeIcon?: boolean

  /**
   * 首页图标
   * @default 'home'
   */
  homeIcon?: string

  /**
   * 点击左侧是否自动返回
   * @default true
   */
  autoBack?: boolean

  /**
   * 是否显示右侧内容
   * @default false
   */
  showRight?: boolean

  /**
   * 右侧图标
   */
  rightIcon?: string

  /**
   * 右侧文字
   */
  rightText?: string

  /**
   * 右侧图标大小
   * @default 'md'
   */
  rightIconSize?: string

  /**
   * 右侧图标颜色
   */
  rightIconColor?: string

  /**
   * 右侧最小宽度
   */
  rightWidth?: string | number

  /**
   * 是否开启顶部安全区适配
   * @default true
   */
  safeAreaInsetTop?: boolean

  /**
   * z-index 层级
   * @default 1000
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
 * FrameNavBar 组件事件
 */
export interface FrameNavBarEmits {
  /**
   * 点击左侧事件
   */
  (e: 'click-left'): void

  /**
   * 点击标题事件
   */
  (e: 'click-title'): void

  /**
   * 点击右侧事件
   */
  (e: 'click-right'): void

  /**
   * 点击首页图标事件
   */
  (e: 'click-home'): void
}

export const frameNavBarProps = {
  title: {
    type: String,
    default: '',
  },
  titleCenter: {
    type: Boolean,
    default: true,
  },
  fixed: {
    type: Boolean,
    default: true,
  },
  placeholder: {
    type: Boolean,
    default: true,
  },
  border: {
    type: Boolean,
    default: false,
  },
  height: {
    type: [String, Number],
    default: '44px',
  },
  bgColor: {
    type: String,
    default: '#ffffff',
  },
  color: {
    type: String,
    default: '#1a1a1a',
  },
  showLeft: {
    type: Boolean,
    default: true,
  },
  leftIcon: {
    type: String,
    default: 'arrow-left',
  },
  leftText: {
    type: String,
    default: '',
  },
  leftIconSize: {
    type: String,
    default: 'md',
  },
  leftIconColor: {
    type: String,
    default: '',
  },
  leftWidth: {
    type: [String, Number],
    default: '',
  },
  showHomeIcon: {
    type: Boolean,
    default: true,
  },
  homeIcon: {
    type: String,
    default: 'home',
  },
  autoBack: {
    type: Boolean,
    default: true,
  },
  showRight: {
    type: Boolean,
    default: false,
  },
  rightIcon: {
    type: String,
    default: '',
  },
  rightText: {
    type: String,
    default: '',
  },
  rightIconSize: {
    type: String,
    default: 'md',
  },
  rightIconColor: {
    type: String,
    default: '',
  },
  rightWidth: {
    type: [String, Number],
    default: '',
  },
  safeAreaInsetTop: {
    type: Boolean,
    default: true,
  },
  zIndex: {
    type: Number,
    default: 1000,
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
