import type { PropType } from 'vue'

/**
 * 徽章类型
 */
export type BadgeType = 'default' | 'primary' | 'success' | 'warning' | 'danger'

/**
 * FrameBadge 组件属性
 */
export interface FrameBadgeProps {
  /**
   * 徽章内容（数字或文字）
   */
  value?: string | number

  /**
   * 最大值（超过显示为 {max}+）
   * @default 99
   */
  max?: number

  /**
   * 是否显示为小红点
   * @default false
   */
  dot?: boolean

  /**
   * 徽章类型
   * @default 'danger'
   */
  type?: BadgeType

  /**
   * 是否隐藏徽章
   * @default false
   */
  hidden?: boolean

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
 * FrameBadge 组件事件
 */
export interface FrameBadgeEmits {
  /**
   * 点击事件
   */
  (e: 'click', event: Event): void
}

export const frameBadgeProps = {
  value: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  max: {
    type: Number,
    default: 99,
  },
  dot: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<BadgeType>,
    default: 'danger',
  },
  hidden: {
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
