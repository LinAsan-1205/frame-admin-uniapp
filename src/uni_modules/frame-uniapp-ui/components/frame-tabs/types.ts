import type { PropType } from 'vue'

/**
 * Tabs 标签项数据
 */
export interface TabItem {
  /**
   * 标签值（唯一标识）
   */
  value: string | number

  /**
   * 标签文字
   */
  label: string

  /**
   * 图标名称
   */
  icon?: string

  /**
   * 是否禁用
   */
  disabled?: boolean

  /**
   * 徽标数字
   */
  badge?: number | string

  /**
   * 是否显示小红点
   */
  dot?: boolean
}

/**
 * FrameTabs 组件属性
 */
export interface FrameTabsProps {
  /**
   * 当前激活的标签值
   */
  modelValue?: string | number

  /**
   * 标签列表数据
   */
  items?: TabItem[]

  /**
   * 是否可滚动
   * @default false
   */
  scrollable?: boolean

  /**
   * 指示线宽度（默认与标签等宽）
   */
  lineWidth?: string | number

  /**
   * 指示线高度
   * @default '3px'
   */
  lineHeight?: string | number

  /**
   * 指示线颜色
   */
  lineColor?: string

  /**
   * 激活颜色
   */
  activeColor?: string

  /**
   * 未激活颜色
   */
  inactiveColor?: string

  /**
   * 是否开启动画
   * @default true
   */
  animation?: boolean

  /**
   * 动画时长（毫秒）
   * @default 300
   */
  duration?: number

  /**
   * 背景颜色
   * @default '#ffffff'
   */
  bgColor?: string

  /**
   * 是否显示下边框
   * @default true
   */
  border?: boolean

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
 * FrameTabs 组件事件
 */
export interface FrameTabsEmits {
  /**
   * 更新 modelValue
   */
  (e: 'update:modelValue', value: string | number): void

  /**
   * 切换事件
   */
  (e: 'change', data: { item: TabItem; index: number }): void

  /**
   * 点击事件
   */
  (e: 'click', data: { item: TabItem; index: number }): void

  /**
   * 点击禁用项事件
   */
  (e: 'disabled', data: { item: TabItem; index: number }): void
}

export const frameTabsProps = {
  modelValue: {
    type: [String, Number],
    default: '',
  },
  items: {
    type: Array as PropType<TabItem[]>,
    default: () => [],
  },
  scrollable: {
    type: Boolean,
    default: false,
  },
  lineWidth: {
    type: [String, Number],
    default: '',
  },
  lineHeight: {
    type: [String, Number],
    default: '3px',
  },
  lineColor: {
    type: String,
    default: '',
  },
  activeColor: {
    type: String,
    default: '',
  },
  inactiveColor: {
    type: String,
    default: '',
  },
  animation: {
    type: Boolean,
    default: true,
  },
  duration: {
    type: Number,
    default: 300,
  },
  bgColor: {
    type: String,
    default: '#ffffff',
  },
  border: {
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
