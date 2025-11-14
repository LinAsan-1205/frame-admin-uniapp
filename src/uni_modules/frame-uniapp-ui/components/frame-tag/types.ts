import type { PropType } from 'vue'

/**
 * 标签类型
 */
export type TagType = 'default' | 'primary' | 'success' | 'warning' | 'danger'

/**
 * 标签变体
 */
export type TagVariant = 'filled' | 'outlined' | 'light'

/**
 * 标签尺寸
 */
export type TagSize = 'sm' | 'md' | 'lg'

/**
 * FrameTag 组件属性
 */
export interface FrameTagProps {
  /**
   * 标签类型
   * @default 'default'
   */
  type?: TagType

  /**
   * 标签变体
   * @default 'light'
   */
  variant?: TagVariant

  /**
   * 标签尺寸
   * @default 'md'
   */
  size?: TagSize

  /**
   * 是否圆形
   * @default false
   */
  round?: boolean

  /**
   * 是否可关闭
   * @default false
   */
  closable?: boolean

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean

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
 * FrameTag 组件事件
 */
export interface FrameTagEmits {
  /**
   * 点击事件
   */
  (e: 'click', event: Event): void

  /**
   * 关闭事件
   */
  (e: 'close', event: Event): void
}

export const frameTagProps = {
  type: {
    type: String as PropType<TagType>,
    default: 'default',
  },
  variant: {
    type: String as PropType<TagVariant>,
    default: 'light',
  },
  size: {
    type: String as PropType<TagSize>,
    default: 'md',
  },
  round: {
    type: Boolean,
    default: false,
  },
  closable: {
    type: Boolean,
    default: false,
  },
  disabled: {
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
