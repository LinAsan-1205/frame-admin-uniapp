/**
 * BEM 命名规范工具
 * Block Element Modifier
 */

type ClassName = string | undefined | null
type Classes = (ClassName | [any, ClassName, ClassName?])[]

/**
 * 创建 BEM 命名空间
 * @param name - 组件名称（不含前缀）
 * @returns BEM 工具函数集合
 * @example
 * const { n, classes, getVar } = createNamespace('button')
 * n() // 'fui-button'
 * n('icon') // 'fui-button__icon'
 * n('--primary') // 'fui-button--primary'
 * getVar('color') // '--fui-button-color'
 */
export function createNamespace<C extends string>(name: C) {
  const namespace = 'fui' as const
  const componentName = `${namespace}-${name}` as const

  /**
   * 创建 BEM 类名
   * @param suffix - 后缀（可以是 element、modifier 或特殊标记）
   * @returns BEM 类名字符串
   * @example
   * n() // 'fui-button'
   * n('icon') // 'fui-button__icon' (element)
   * n('--primary') // 'fui-button--primary' (modifier)
   * n('$icon') // 'fui-icon' (特殊：使用命名空间前缀)
   */
  const createBEM = <S extends string | undefined = undefined>(suffix?: S): string => {
    if (!suffix)
      return componentName

    // 特殊标记：$ 开头表示使用命名空间
    if (suffix[0] === '$')
      return suffix.replace('$', namespace)

    // Modifier: -- 开头
    if (suffix.startsWith('--'))
      return `${componentName}${suffix}`

    // Element: 默认
    return `${componentName}__${suffix}`
  }

  /**
   * 条件类名处理
   * @param classes - 类名数组（支持条件表达式）
   * @returns 过滤后的类名数组
   * @example
   * classes('a', 'b') // ['a', 'b']
   * classes([true, 'a'], [false, 'b']) // ['a']
   * classes([true, 'a', 'b']) // ['a']
   * classes([false, 'a', 'b']) // ['b']
   */
  const classes = (...classes: Classes): any[] => {
    return classes
      .map((className) => {
        // 支持条件表达式：[condition, truthy, falsy?]
        if (Array.isArray(className)) {
          const [condition, truthy, falsy = null] = className
          return condition ? truthy : falsy
        }

        return className
      })
      .filter(name => name) // 过滤掉 null/undefined
  }

  /**
   * 获取 CSS 变量名
   * @param name - 变量名称
   * @returns CSS 变量名
   * @example
   * getVar('color') // '--fui-button-color'
   * getVar('-bg') // '--fui-button-bg'
   */
  const getVar = (name: string): string => {
    return `--${componentName}${name.startsWith('-') ? name : `-${name}`}`
  }

  return {
    /** 命名空间 */
    namespace,
    /** BEM 类名生成器（简写） */
    n: createBEM,
    /** 条件类名处理 */
    classes,
    /** CSS 变量名生成器 */
    getVar,
  }
}

/**
 * 类型导出
 */
export type { ClassName, Classes }
