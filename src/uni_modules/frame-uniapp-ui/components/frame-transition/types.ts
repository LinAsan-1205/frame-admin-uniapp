import type { PropType } from 'vue'

/**
 * 过渡动画类型
 */
export type TransitionMode =
  | 'fade'              // 淡入淡出
  | 'slide-up'          // 上滑
  | 'slide-down'        // 下滑
  | 'slide-left'        // 左滑
  | 'slide-right'       // 右滑
  | 'zoom-in'           // 放大
  | 'zoom-out'          // 缩小
  | 'fade-up'           // 淡入上滑
  | 'fade-down'         // 淡入下滑
  | 'fade-left'         // 淡入左滑
  | 'fade-right'        // 淡入右滑

/**
 * 动画时间函数
 */
export type TimingFunction =
  | 'linear'
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'step-start'
  | 'step-end'

/**
 * FrameTransition 组件属性
 */
export interface FrameTransitionProps {
  /**
   * 是否显示组件
   */
  show?: boolean

  /**
   * 过渡动画模式
   * @default 'fade'
   */
  mode?: TransitionMode | TransitionMode[]

  /**
   * 动画持续时间（毫秒）
   * @default 300
   */
  duration?: number

  /**
   * 动画时间函数
   * @default 'ease'
   */
  timingFunction?: TimingFunction

  /**
   * 自定义样式
   */
  customStyle?: Record<string, any> | string

  /**
   * 自定义类名
   */
  customClass?: string

  /**
   * 是否禁用动画
   * @default false
   */
  disabled?: boolean
}

/**
 * FrameTransition 组件事件
 */
export interface FrameTransitionEmits {
  /**
   * 点击事件
   */
  (e: 'click', event: Event): void

  /**
   * 动画开始前触发
   */
  (e: 'before-enter'): void

  /**
   * 动画开始后触发
   */
  (e: 'enter'): void

  /**
   * 动画结束后触发
   */
  (e: 'after-enter'): void

  /**
   * 关闭动画开始前触发
   */
  (e: 'before-leave'): void

  /**
   * 关闭动画开始后触发
   */
  (e: 'leave'): void

  /**
   * 关闭动画结束后触发
   */
  (e: 'after-leave'): void
}

export const frameTransitionProps = {
  show: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: [String, Array] as PropType<TransitionMode | TransitionMode[]>,
    default: 'fade',
  },
  duration: {
    type: Number,
    default: 300,
  },
  timingFunction: {
    type: String as PropType<TimingFunction>,
    default: 'ease',
  },
  customStyle: {
    type: [Object, String] as PropType<Record<string, any> | string>,
    default: () => ({}),
  },
  customClass: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
}
