/**
 * 类型验证工具函数
 */

/**
 * 判断值是否为数字（包括数字字符串）
 * @param value - 要判断的值
 * @returns 是否为数字
 * @example
 * number('123') // true
 * number('12.34') // true
 * number('abc') // false
 */
export function number(value: any): boolean {
  return /^[+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value)
}

/**
 * 判断值是否为纯对象
 * @param value - 要判断的值
 * @returns 是否为纯对象
 * @example
 * object({}) // true
 * object([]) // false
 * object(null) // false
 */
export function object(value: any): boolean {
  return Object.prototype.toString.call(value) === '[object Object]'
}

/**
 * 判断值是否为字符串
 * @param value - 要判断的值
 * @returns 是否为字符串
 */
export function string(value: any): boolean {
  return typeof value === 'string'
}

/**
 * 判断值是否为布尔值
 * @param value - 要判断的值
 * @returns 是否为布尔值
 */
export function boolean(value: any): boolean {
  return typeof value === 'boolean'
}

/**
 * 判断值是否为函数
 * @param value - 要判断的值
 * @returns 是否为函数
 */
export function func(value: any): boolean {
  return typeof value === 'function'
}

/**
 * 判断值是否为数组
 * @param value - 要判断的值
 * @returns 是否为数组
 */
export function array(value: any): boolean {
  return Array.isArray(value)
}

/**
 * 判断值是否为 undefined
 * @param value - 要判断的值
 * @returns 是否为 undefined
 */
export function isUndefined(value: any): boolean {
  return value === undefined
}

/**
 * 判断值是否为 null
 * @param value - 要判断的值
 * @returns 是否为 null
 */
export function isNull(value: any): boolean {
  return value === null
}

/**
 * 判断值是否为空（null、undefined、空字符串、空数组、空对象）
 * @param value - 要判断的值
 * @returns 是否为空
 */
export function isEmpty(value: any): boolean {
  if (isNull(value) || isUndefined(value))
    return true
  if (string(value) || array(value))
    return value.length === 0
  if (object(value))
    return Object.keys(value).length === 0
  return false
}
