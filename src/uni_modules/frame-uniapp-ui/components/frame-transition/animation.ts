/**
 * 动画引擎
 * 跨平台支持：H5、小程序、App
 */

// #ifdef APP-NVUE
const nvueAnimation = uni.requireNativePlugin('animation')
// #endif

interface AnimationConfig {
  duration: number
  timingFunction: string
  transformOrigin?: string
  delay?: number
}

interface AnimationStyles {
  transform?: string
  opacity?: number
  [key: string]: any
}

/**
 * 动画类
 */
class FrameAnimation {
  private animation: any
  private options: AnimationConfig
  private currentStepAnimates: Record<number, { styles: AnimationStyles, config: AnimationConfig }>
  private next: number
  private $: any
  private timer: any

  constructor(options: AnimationConfig, instance: any) {
    this.options = options
    this.$ = instance
    this.next = 0
    this.currentStepAnimates = {}

    // #ifndef APP-NVUE
    this.animation = uni.createAnimation({
      ...options,
    })
    // #endif
  }

  /**
   * Nvue 推送动画
   */
  private _nvuePushAnimates(type: string, args: any) {
    // #ifdef APP-NVUE
    let aniObj = this.currentStepAnimates[this.next]
    let styles: { styles: AnimationStyles, config: AnimationConfig }

    if (!aniObj) {
      styles = {
        styles: {},
        config: this.options,
      }
    }
    else {
      styles = aniObj
    }

    const transformTypes = [
      'matrix',
      'matrix3d',
      'rotate',
      'rotate3d',
      'rotateX',
      'rotateY',
      'rotateZ',
      'scale',
      'scale3d',
      'scaleX',
      'scaleY',
      'scaleZ',
      'skew',
      'skewX',
      'skewY',
      'translate',
      'translate3d',
      'translateX',
      'translateY',
      'translateZ',
    ]

    if (transformTypes.includes(type)) {
      if (!styles.styles.transform)
        styles.styles.transform = ''

      let unit = ''
      if (type === 'rotate')
        unit = 'deg'

      styles.styles.transform += `${type}(${args}${unit}) `
    }
    else {
      styles.styles[type] = `${args}`
    }

    this.currentStepAnimates[this.next] = styles
    // #endif
  }

  /**
   * Nvue 运行动画
   */
  private async _animateRun(styles: AnimationStyles = {}, config: AnimationConfig) {
    // #ifdef APP-NVUE
    const ref = this.$.$refs.ani?.ref
    if (!ref)
      return

    return new Promise((resolve) => {
      nvueAnimation.transition(
        ref,
        {
          styles,
          ...config,
        },
        () => {
          resolve(true)
        },
      )
    })
    // #endif
  }

  /**
   * Nvue 下一个动画
   */
  private async _nvueNextAnimate(animates: Record<number, any>, step = 0, fn?: () => void) {
    // #ifdef APP-NVUE
    const obj = animates[step]
    if (obj) {
      const { styles, config } = obj
      await this._animateRun(styles, config)
      await this._nvueNextAnimate(animates, step + 1, fn)
    }
    else {
      this.currentStepAnimates = {}
      fn?.()
    }
    // #endif
  }

  /**
   * 设置动画步骤
   */
  step(config: Partial<AnimationConfig> = {}) {
    // #ifndef APP-NVUE
    this.animation.step(config)
    // #endif

    // #ifdef APP-NVUE
    this.currentStepAnimates[this.next].config = {
      ...this.options,
      ...config,
    }
    this.currentStepAnimates[this.next].styles.transformOrigin
      = this.currentStepAnimates[this.next].config.transformOrigin
    this.next++
    // #endif

    return this
  }

  /**
   * 运行动画
   */
  run(fn?: () => void) {
    // #ifndef APP-NVUE
    this.$.animationData = this.animation.export()
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      fn?.()
    }, this.options.duration)
    // #endif

    // #ifdef APP-NVUE
    this._nvueNextAnimate(this.currentStepAnimates, 0, fn)
    this.next = 0
    // #endif
  }

  /**
   * 动态添加动画方法
   */
  opacity(value: number) {
    // #ifndef APP-NVUE
    this.animation.opacity(value)
    // #endif
    // #ifdef APP-NVUE
    this._nvuePushAnimates('opacity', value)
    // #endif
    return this
  }

  translateX(value: string | number) {
    // #ifndef APP-NVUE
    this.animation.translateX(value)
    // #endif
    // #ifdef APP-NVUE
    this._nvuePushAnimates('translateX', value)
    // #endif
    return this
  }

  translateY(value: string | number) {
    // #ifndef APP-NVUE
    this.animation.translateY(value)
    // #endif
    // #ifdef APP-NVUE
    this._nvuePushAnimates('translateY', value)
    // #endif
    return this
  }

  scale(value: number) {
    // #ifndef APP-NVUE
    this.animation.scale(value)
    // #endif
    // #ifdef APP-NVUE
    this._nvuePushAnimates('scale', value)
    // #endif
    return this
  }

  scaleX(value: number) {
    // #ifndef APP-NVUE
    this.animation.scaleX(value)
    // #endif
    // #ifdef APP-NVUE
    this._nvuePushAnimates('scaleX', value)
    // #endif
    return this
  }

  scaleY(value: number) {
    // #ifndef APP-NVUE
    this.animation.scaleY(value)
    // #endif
    // #ifdef APP-NVUE
    this._nvuePushAnimates('scaleY', value)
    // #endif
    return this
  }

  rotate(value: number) {
    // #ifndef APP-NVUE
    this.animation.rotate(value)
    // #endif
    // #ifdef APP-NVUE
    this._nvuePushAnimates('rotate', value)
    // #endif
    return this
  }
}

/**
 * 创建动画实例
 */
export function createAnimation(options: AnimationConfig, instance: any) {
  return new FrameAnimation(options, instance)
}
