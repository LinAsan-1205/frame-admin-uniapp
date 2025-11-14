import type { PropType } from 'vue'

/**
 * 间距方向
 */
export type SpaceDirection = 'horizontal' | 'vertical'

/**
 * 对齐方式
 */
export type SpaceAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch'

/**
 * FrameSpace 组件属性
 */
export interface FrameSpaceProps {
  /**
   * 间距方向
   * @default 'horizontal'
   */
  direction?: SpaceDirection

  /**
   * 间距大小（支持数字、字符串或数组）
   * @default 16
   */
  size?: number | string | [number | string, number | string]

  /**
   * 对齐方式
   * @default 'center'
   */
  align?: SpaceAlign

  /**
   * 是否自动换行（仅水平方向有效）
   * @default false
   */
  wrap?: boolean

  /**
   * 是否填充容器
   * @default false
   */
  fill?: boolean

  /**
   * 自定义样式
   */
  customStyle?: Record<string, any> | string

  /**
   * 自定义类名
   */
  customClass?: string
}

export const frameSpaceProps = {
  direction: {
    type: String as PropType<SpaceDirection>,
    default: 'horizontal',
  },
  size: {
    type: [Number, String, Array] as PropType<number | string | [number | string, number | string]>,
    default: 16,
  },
  align: {
    type: String as PropType<SpaceAlign>,
    default: 'center',
  },
  wrap: {
    type: Boolean,
    default: false,
  },
  fill: {
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
