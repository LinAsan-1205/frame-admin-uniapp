import type { PropType } from 'vue'

/**
 * 分割线方向
 */
export type DividerDirection = 'horizontal' | 'vertical'

/**
 * 分割线内容位置
 */
export type DividerContentPosition = 'left' | 'center' | 'right'

/**
 * FrameDivider 组件属性
 */
export interface FrameDividerProps {
  /**
   * 分割线方向
   * @default 'horizontal'
   */
  direction?: DividerDirection

  /**
   * 分割线内容位置
   * @default 'center'
   */
  contentPosition?: DividerContentPosition

  /**
   * 是否为虚线
   * @default false
   */
  dashed?: boolean

  /**
   * 是否为细线（1px）
   * @default false
   */
  hairline?: boolean

  /**
   * 分割线颜色
   */
  color?: string

  /**
   * 分割线边距
   */
  margin?: string | number

  /**
   * 自定义样式
   */
  customStyle?: Record<string, any> | string

  /**
   * 自定义类名
   */
  customClass?: string
}

export const frameDividerProps = {
  direction: {
    type: String as PropType<DividerDirection>,
    default: 'horizontal',
  },
  contentPosition: {
    type: String as PropType<DividerContentPosition>,
    default: 'center',
  },
  dashed: {
    type: Boolean,
    default: false,
  },
  hairline: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: '',
  },
  margin: {
    type: [String, Number],
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
