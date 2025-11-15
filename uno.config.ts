import {
  defineConfig,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import { presetWeapp } from 'unocss-preset-weapp';
import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer';

const { presetWeappAttributify, transformerAttributify } = extractorAttributify();

export default defineConfig({
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp({
      // 启用暗黑模式支持 - 使用 data-theme 属性
      dark: {
        dark: '[data-theme="dark"]',
      },
      attributifyPseudo: true,
    }),
    // attributify autocomplete
    presetWeappAttributify() as any,
    // https://unocss.dev/presets/icons
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  safelist: [
    // Message 组件图标
    'i-mdi-check-circle',
    'i-mdi-close-circle',
    'i-mdi-alert-circle',
    'i-mdi-information',
    'i-mdi-close',
    'i-mdi-heart',
    // NavBar 组件图标
    'i-mdi-menu',
    'i-mdi-star',
    'i-mdi-magnify',
    'i-mdi-dots-vertical',
    // 首页图标
    'i-mdi-view-split-horizontal',
    // 分段器图标
    'i-mdi-home',
    'i-mdi-account',
    'i-mdi-cog',
    'i-mdi-chart-line',
    'i-mdi-database',
    'i-mdi-file-document',
  ],
  /**
   * 自定义快捷语句
   * @see https://github.com/unocss/unocss#shortcuts
   */
  shortcuts: {
    'border-base': 'border border-gray-500_10',
    'center': 'flex justify-center items-center',
    // Demo 组件暗黑模式快捷类
    'demo-card-base': 'p-28rpx rd-28rpx border-2rpx border-solid flex flex-col gap-20rpx items-center transition-all duration-300',
    'demo-card-light': 'border-[rgba(0,61,173,0.15)] bg-gradient-to-br from-[rgba(0,61,173,0.05)] to-[rgba(255,255,255,0.9)] shadow-[0_4rpx_12rpx_rgba(0,61,173,0.06)]',
    'demo-card-dark': 'dark:border-[rgba(59,130,246,0.3)] dark:bg-[rgba(31,41,55,0.6)] dark:backdrop-blur-8rpx dark:shadow-[0_4rpx_16rpx_rgba(0,0,0,0.3),inset_0_1rpx_0_rgba(255,255,255,0.05)]',
  },
  theme: {
    colors: {
      // 主题颜色
      'primary': 'var(--theme-primary)',
      'success': 'var(--theme-success)',
      'warning': 'var(--theme-warning)',
      'error': 'var(--theme-error)',
      // 文字颜色
      'text-main': 'var(--theme-main-color)',
      'text-content': 'var(--theme-content-color)',
      'text-tips': 'var(--theme-tips-color)',
      'text-light': 'var(--theme-light-color)',
      'text-disabled': 'var(--theme-disabled-color)',
      // 背景颜色
      'bg-main': 'var(--theme-bg-color)',
      'bg-secondary': 'var(--theme-bg-color-secondary)',
      // 边框颜色
      'border-main': 'var(--theme-border-color)',
    },
  },
  transformers: [
    // 启用 @apply 功能
    transformerDirectives({
      enforce: 'pre',
    }),
    // https://unocss.dev/transformers/variant-group
    // 启用 () 分组功能
    transformerVariantGroup(),
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify() as any,
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass(),
  ],
});
