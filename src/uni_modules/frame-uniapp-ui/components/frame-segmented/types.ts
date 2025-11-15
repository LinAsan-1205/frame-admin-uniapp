import type { PropType } from 'vue'

/**
 * 分段器选项
 */
export interface SegmentedOption {
  /**
   * 选项值
   */
  value: string | number
  /**
   * 选项文本
   */
  label: string
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 图标
   */
  icon?: string
}

/**
 * FrameSegmented 组件属性
 */
export interface FrameSegmentedProps {
  /**
   * 当前选中值
   */
  modelValue?: string | number

  /**
   * 选项列表
   */
  options?: SegmentedOption[] | string[] | number[]

  /**
   * 是否禁用
   */
  disabled?: boolean

  /**
   * 尺寸
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'

  /**
   * 形状
   * @default 'round'
   */
  shape?: 'square' | 'round' | 'pill'

  /**
   * 是否为块级元素
   * @default false
   */
  block?: boolean

  /**
   * 分段器文本颜色
   */
  color?: string

  /**
   * 分段器背景色
   */
  bgColor?: string

  /**
   * 分段器高度
   */
  height?: string | number

  /**
   * 分段器文字大小
   */
  fontSize?: string | number

  /**
   * 分段器内边距
   */
  padding?: string | number

  /**
   * 指示器背景色
   */
  indicatorColor?: string

  /**
   * 激活项文字颜色
   */
  activeColor?: string

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
 * FrameSegmented 组件事件
 */
export interface FrameSegmentedEmits {
  /**
   * 更新 modelValue
   */
  (e: 'update:modelValue', value: string | number): void

  /**
   * 值改变事件
   * @param value 当前选中的值
   * @param index 当前选中分段的索引
   */
  (e: 'change', value: string | number, index: number): void

  /**
   * 点击分段时触发
   * @param value 点击的值
   * @param index 点击分段的索引
   */
  (e: 'click', value: string | number, index: number): void
}

export const frameSegmentedProps = {
  modelValue: {
    type: [String, Number],
    default: '',
  },
  options: {
    type: Array as PropType<SegmentedOption[] | string[] | number[]>,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<'sm' | 'md' | 'lg'>,
    default: 'md',
  },
  shape: {
    type: String as PropType<'square' | 'round' | 'pill'>,
    default: 'round',
  },
  block: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: '',
  },
  bgColor: {
    type: String,
    default: '',
  },
  height: {
    type: [String, Number],
    default: '',
  },
  fontSize: {
    type: [String, Number],
    default: '',
  },
  padding: {
    type: [String, Number],
    default: '',
  },
  indicatorColor: {
    type: String,
    default: '',
  },
  activeColor: {
    type: String,
    default: '',
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
