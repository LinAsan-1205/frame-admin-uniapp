import type { PropType } from 'vue'

/**
 * NoticeBar 模式
 */
export type NoticeBarMode = 'closeable' | 'link'

/**
 * FrameNoticeBar 组件属性
 */
export interface FrameNoticeBarProps {
  /**
   * 通知文本
   */
  text?: string

  /**
   * 模式
   * @default ''
   */
  mode?: NoticeBarMode | ''

  /**
   * 背景颜色
   * @default '#fffbe8'
   */
  bgColor?: string

  /**
   * 文字颜色
   * @default '#ed6a0c'
   */
  color?: string

  /**
   * 字体大小
   * @default '28rpx'
   */
  fontSize?: string | number

  /**
   * 是否显示左侧图标
   * @default true
   */
  showLeftIcon?: boolean

  /**
   * 左侧图标
   * @default 'notification'
   */
  leftIcon?: string

  /**
   * 左侧图标颜色
   */
  leftIconColor?: string

  /**
   * 是否显示右侧图标
   * @default false
   */
  showRightIcon?: boolean

  /**
   * 右侧图标
   */
  rightIcon?: string

  /**
   * 右侧图标颜色
   */
  rightIconColor?: string

  /**
   * 是否开启滚动
   * @default false
   */
  scrollable?: boolean

  /**
   * 滚动速度（px/s）
   * @default 50
   */
  speed?: number

  /**
   * 是否开启文本换行（scrollable 为 false 时生效）
   * @default false
   */
  wrapable?: boolean

  /**
   * 延迟多久开始滚动（毫秒）
   * @default 1000
   */
  delay?: number

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
 * FrameNoticeBar 组件事件
 */
export interface FrameNoticeBarEmits {
  /**
   * 点击通知栏事件
   */
  (e: 'click'): void

  /**
   * 点击右侧图标事件
   */
  (e: 'click-right'): void

  /**
   * 关闭事件
   */
  (e: 'close'): void
}

export const frameNoticeBarProps = {
  text: {
    type: String,
    default: '',
  },
  mode: {
    type: String as PropType<NoticeBarMode | ''>,
    default: '',
  },
  bgColor: {
    type: String,
    default: '#fffbe8',
  },
  color: {
    type: String,
    default: '#ed6a0c',
  },
  fontSize: {
    type: [String, Number],
    default: '28rpx',
  },
  showLeftIcon: {
    type: Boolean,
    default: true,
  },
  leftIcon: {
    type: String,
    default: 'notification',
  },
  leftIconColor: {
    type: String,
    default: '',
  },
  showRightIcon: {
    type: Boolean,
    default: false,
  },
  rightIcon: {
    type: String,
    default: '',
  },
  rightIconColor: {
    type: String,
    default: '',
  },
  scrollable: {
    type: Boolean,
    default: false,
  },
  speed: {
    type: Number,
    default: 50,
  },
  wrapable: {
    type: Boolean,
    default: false,
  },
  delay: {
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
