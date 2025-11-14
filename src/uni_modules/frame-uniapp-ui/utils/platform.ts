/**
 * 平台相关工具函数
 */

/**
 * 获取系统信息
 */
export function getSystemInfo() {
  return uni.getSystemInfoSync()
}

/**
 * 获取状态栏高度（单位：px）
 * @returns 状态栏高度
 */
export function getStatusBarHeight(): number {
  const { statusBarHeight = 0 } = getSystemInfo()
  return statusBarHeight
}

/**
 * 获取胶囊按钮信息（仅小程序）
 */
export function getMenuButtonBoundingClientRect() {
  // #ifdef MP
  return uni.getMenuButtonBoundingClientRect()
  // #endif
  // #ifndef MP
  return null
  // #endif
}

/**
 * 计算自定义导航栏高度
 * @param navBarHeight - 导航栏内容高度（默认 44px）
 * @returns 导航栏总高度（状态栏 + 内容高度）
 */
export function getCustomNavHeight(navBarHeight = 44): number {
  const statusBarHeight = getStatusBarHeight()
  return statusBarHeight + navBarHeight
}

/**
 * 获取自定义导航栏顶部距离（CSS 使用）
 * @param navBarHeight - 导航栏内容高度（默认 44）
 * @returns 带单位的顶部距离字符串
 * @example
 * getCustomNavTop() // '88px' (假设状态栏高度为 44px)
 */
export function getCustomNavTop(navBarHeight = 44): string {
  return `${getCustomNavHeight(navBarHeight)}px`
}

/**
 * 获取安全区域信息
 */
export function getSafeArea() {
  const systemInfo = getSystemInfo()
  return systemInfo.safeArea || null
}

/**
 * 获取底部安全区域高度
 * @returns 底部安全区域高度（单位：px）
 */
export function getSafeAreaBottom(): number {
  const systemInfo = getSystemInfo()
  const { screenHeight, safeArea } = systemInfo

  if (!safeArea)
    return 0

  return screenHeight - safeArea.bottom
}

/**
 * 判断是否为 iOS 系统
 */
export function isIOS(): boolean {
  const { platform } = getSystemInfo()
  return platform === 'ios'
}

/**
 * 判断是否为 Android 系统
 */
export function isAndroid(): boolean {
  const { platform } = getSystemInfo()
  return platform === 'android'
}

/**
 * 判断是否为微信小程序
 */
export function isWeixin(): boolean {
  // #ifdef MP-WEIXIN
  return true
  // #endif
  // #ifndef MP-WEIXIN
  return false
  // #endif
}

/**
 * 判断是否为 H5
 */
export function isH5(): boolean {
  // #ifdef H5
  return true
  // #endif
  // #ifndef H5
  return false
  // #endif
}

/**
 * 判断是否为 App
 */
export function isApp(): boolean {
  // #ifdef APP
  return true
  // #endif
  // #ifndef APP
  return false
  // #endif
}
