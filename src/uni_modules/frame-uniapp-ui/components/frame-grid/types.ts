import type { PropType } from 'vue'

/**
 * FrameGrid 组件属性
 */
export interface FrameGridProps {
  /**
   * 列数
   * @default 4
   */
  columns?: number

  /**
   * 是否显示边框
   * @default false
   */
  border?: boolean

  /**
   * 格子之间的间距
   * @default 0
   */
  gap?: number | string

  /**
   * 是否正方形格子
   * @default false
   */
  square?: boolean

  /**
   * 格子内容居中方式
   * @default 'center'
   */
  center?: boolean

  /**
   * 是否可点击
   * @default false
   */
  clickable?: boolean

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
 * FrameGridItem 组件属性
 */
export interface FrameGridItemProps {
  /**
   * 图标
   */
  icon?: string

  /**
   * 图标颜色
   */
  iconColor?: string

  /**
   * 图标类名前缀
   * @default 'wd-icon'
   */
  iconPrefix?: string

  /**
   * 文字
   */
  text?: string

  /**
   * 徽章内容
   */
  badge?: string | number

  /**
   * 是否显示徽章小红点
   * @default false
   */
  dot?: boolean

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
 * FrameGridItem 组件事件
 */
export interface FrameGridItemEmits {
  /**
   * 点击事件
   */
  (e: 'click', event: Event): void
}

export const frameGridProps = {
  columns: {
    type: Number,
    default: 4,
  },
  border: {
    type: Boolean,
    default: false,
  },
  gap: {
    type: [Number, String],
    default: 0,
  },
  square: {
    type: Boolean,
    default: false,
  },
  center: {
    type: Boolean,
    default: true,
  },
  clickable: {
    type: Boolean,
    default: false,
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

export const frameGridItemProps = {
  icon: {
    type: String,
    default: '',
  },
  iconColor: {
    type: String,
    default: '',
  },
  iconPrefix: {
    type: String,
    default: 'wd-icon',
  },
  text: {
    type: String,
    default: '',
  },
  badge: {
    type: [String, Number],
    default: '',
  },
  dot: {
    type: Boolean,
    default: false,
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
