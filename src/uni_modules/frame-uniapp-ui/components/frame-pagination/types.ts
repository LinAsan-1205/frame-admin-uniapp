/**
 * 分页组件尺寸
 */
export type FramePaginationSize = 'mini' | 'small' | 'medium' | 'large'

/**
 * 分页组件主题
 */
export type FramePaginationTheme = 'default' | 'primary' | 'success' | 'warning' | 'danger'

/**
 * 分页组件属性
 */
export interface FramePaginationProps {
  /**
   * 当前页码，支持 v-model
   * @default 1
   */
  modelValue?: number

  /**
   * 数据总数
   * @default 0
   */
  total?: number

  /**
   * 每页显示条数
   * @default 10
   */
  pageSize?: number

  /**
   * 显示的页码数量（不包括首尾页）
   * @default 3
   */
  pageCount?: number

  /**
   * 分页组件尺寸
   * @default 'small'
   */
  size?: FramePaginationSize

  /**
   * 分页组件主题
   * @default 'primary'
   */
  theme?: FramePaginationTheme

  /**
   * 是否使用简单模式
   * @default false
   */
  simple?: boolean

  /**
   * 是否显示上一页/下一页按钮
   * @default true
   */
  showPrevNext?: boolean

  /**
   * 是否显示首页/尾页
   * @default true
   */
  showFirstLast?: boolean

  /**
   * 是否显示省略号
   * @default true
   */
  showEllipsis?: boolean

  /**
   * 是否显示页面跳转器
   * @default false
   */
  showJumper?: boolean

  /**
   * 是否显示总数
   * @default false
   */
  showTotal?: boolean

  /**
   * 上一页按钮文本
   * @default ''
   */
  prevText?: string

  /**
   * 下一页按钮文本
   * @default ''
   */
  nextText?: string

  /**
   * 省略号文本
   * @default ''
   */
  ellipsisText?: string

  /**
   * 图标类名前缀
   * @default 'wd-icon'
   */
  classPrefix?: string

  /**
   * 自定义样式
   */
  customStyle?: string | Record<string, any>

  /**
   * 自定义类名
   */
  customClass?: string
}

/**
 * 分页组件事件
 */
export interface FramePaginationEmits {
  /**
   * 当前页码改变时触发
   */
  (event: 'update:modelValue', page: number): void

  /**
   * 页码改变时触发
   */
  (event: 'change', page: number): void
}
