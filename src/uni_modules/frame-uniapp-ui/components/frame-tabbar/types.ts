/**
 * Tabbar 项配置
 */
export interface FrameTabbarItem {
  /**
   * 唯一标识
   */
  name: string | number

  /**
   * 显示文本
   */
  text?: string

  /**
   * 图标类名（未选中）
   */
  icon?: string

  /**
   * 图标类名（选中）
   */
  activeIcon?: string

  /**
   * 徽标内容
   */
  badge?: string | number

  /**
   * 是否显示徽标红点
   */
  dot?: boolean

  /**
   * 自定义图标 URL（未选中）
   */
  iconUrl?: string

  /**
   * 自定义图标 URL（选中）
   */
  activeIconUrl?: string
}

/**
 * Tabbar 组件属性
 */
export interface FrameTabbarProps {
  /**
   * 当前选中项的 name
   */
  modelValue?: string | number

  /**
   * Tabbar 项列表
   */
  items?: FrameTabbarItem[]

  /**
   * 选中颜色
   * @default '#1890ff'
   */
  activeColor?: string

  /**
   * 未选中颜色
   * @default '#666666'
   */
  inactiveColor?: string

  /**
   * 是否固定在底部
   * @default true
   */
  fixed?: boolean

  /**
   * 是否显示顶部边框
   * @default false
   */
  border?: boolean

  /**
   * 背景色
   * @default '#ffffff'
   */
  backgroundColor?: string

  /**
   * 是否开启底部安全区适配
   * @default true
   */
  safeAreaInsetBottom?: boolean

  /**
   * 是否悬浮胶囊样式
   * @default false
   */
  capsule?: boolean

  /**
   * 图标尺寸
   * @default '40rpx'
   */
  iconSize?: string

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
 * Tabbar 组件事件
 */
export interface FrameTabbarEmits {
  /**
   * 选中项改变时触发
   */
  (event: 'update:modelValue', name: string | number): void

  /**
   * 选中项改变时触发
   */
  (event: 'change', name: string | number, index: number): void
}
