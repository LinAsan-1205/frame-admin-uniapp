import type { PropType } from 'vue'

/**
 * 单元格尺寸
 */
export type CellSize = 'sm' | 'md' | 'lg'

/**
 * FrameCell 组件属性
 */
export interface FrameCellProps {
  /**
   * 标题
   */
  title?: string

  /**
   * 描述
   */
  label?: string

  /**
   * 右侧内容
   */
  value?: string

  /**
   * 左侧图标
   */
  icon?: string

  /**
   * 图标类名前缀
   * @default 'wd-icon'
   */
  iconPrefix?: string

  /**
   * 是否显示右侧箭头
   * @default false
   */
  isLink?: boolean

  /**
   * 箭头方向
   * @default 'right'
   */
  arrowDirection?: 'up' | 'down' | 'left' | 'right'

  /**
   * 是否显示下边框
   * @default true
   */
  border?: boolean

  /**
   * 是否居中对齐
   * @default false
   */
  center?: boolean

  /**
   * 单元格尺寸
   * @default 'md'
   */
  size?: CellSize

  /**
   * 是否必填（显示红色星号）
   * @default false
   */
  required?: boolean

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
 * FrameCell 组件事件
 */
export interface FrameCellEmits {
  /**
   * 点击事件
   */
  (e: 'click', event: Event): void
}

export const frameCellProps = {
  title: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  value: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  iconPrefix: {
    type: String,
    default: 'wd-icon',
  },
  isLink: {
    type: Boolean,
    default: false,
  },
  arrowDirection: {
    type: String as PropType<'up' | 'down' | 'left' | 'right'>,
    default: 'right',
  },
  border: {
    type: Boolean,
    default: true,
  },
  center: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<CellSize>,
    default: 'md',
  },
  required: {
    type: Boolean,
    default: false,
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
