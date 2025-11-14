/**
 * 单位转换工具函数
 */

import { number } from './validate'

/**
 * 添加单位，如果是纯数字则添加 rpx
 * @param val - 数字或带单位的字符串
 * @returns 带单位的字符串
 * @example
 * addUnit(100) // '100rpx'
 * addUnit('100') // '100rpx'
 * addUnit('100px') // '100px'
 * addUnit('50%') // '50%'
 */
export function addUnit(val: number | string): string | null {
  if (!val)
    return null

  const reg = /^[0-9]*$/g
  return typeof val === 'number' || reg.test(val as string) ? `${val}rpx` : val as string
}

/**
 * 获取像素值（rpx/upx 转 px）
 * @param value - 数字或带单位的字符串
 * @param unit - 是否返回带 px 单位的字符串
 * @returns 像素值
 * @example
 * getPx(100) // 100
 * getPx(100, true) // '100px'
 * getPx('200rpx') // 实际像素值（根据屏幕宽度计算）
 * getPx('200rpx', true) // '实际像素值px'
 */
export function getPx(value: any, unit = false): number | string {
  // 如果是纯数字
  if (number(value))
    return unit ? `${value}px` : Number(value)

  // 如果带有 rpx 或 upx，转换为 px
  if (/(rpx|upx)$/.test(value)) {
    const pxValue = uni.upx2px(Number.parseInt(value))
    return unit ? `${pxValue}px` : Number(pxValue)
  }

  // 其他情况（如 '100px'、'50%' 等）
  const numValue = Number.parseInt(value)
  return unit ? `${numValue}px` : numValue
}

/**
 * 获取自定义距离值（支持数组）
 * @param val - 单个值或值数组
 * @returns 带单位的距离字符串
 * @example
 * getCustomDistance(10) // '10rpx'
 * getCustomDistance([10, 20]) // '10rpx 20rpx'
 * getCustomDistance([10, 20, 30, 40]) // '10rpx 20rpx 30rpx 40rpx'
 */
export function getCustomDistance(val: string | number | Array<string | number>): string | null {
  if (!val)
    return null

  if (Array.isArray(val))
    return val.map(num => addUnit(num)).join(' ')

  return addUnit(val)
}
