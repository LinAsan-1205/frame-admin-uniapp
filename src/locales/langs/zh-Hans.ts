export default {
  locale: {
    'auto': '系统',
    'en': '英语',
    'zh-hans': '中文',
  },
  home: {
    title: 'frame-uniapp-ui',
    subtitle: '为模板量身打造的 UI 组件集。',
    themeToggle: {
      label: '主题',
      light: '浅色',
      dark: '深色',
    },
    library: {
      badge: '组合式原子组件',
      title: '快速搭建精致的小程序与 H5',
      description: '每个组件都围绕管理端和运营端常见场景设计，保持一致的体验与代码风格。',
      highlights: {
        titles: {
          design: '设计规范',
          theme: '暗黑模式',
          quality: '交互体验',
        },
        design: 'BEM 命名与 Sass 变量统一规范，样式更易扩展。',
        theme: '原生支持暗黑模式，切换即刻生效。',
        quality: '交互动效与对齐间距参考成熟设计体系。',
      },
    },
    components: {
      title: '组件一览',
      subtitle: '浏览 frame-uniapp-ui 中的组件，点击卡片即可进入示例与使用说明。',
      badgeNew: '上新',
      button: {
        name: '按钮 Button',
        desc: '包含多种主题、状态与插槽预览。',
      },
    },
    actions: {
      docs: '查看 uni-app 文档',
      repo: '访问模板仓库',
      privacy: '查看隐私政策',
      open: '打开',
      copyTip: '链接已复制，可在浏览器中打开',
    },
    privacy: {
      title: '隐私政策概要',
      subtitle: '在继续使用前，请先阅读我们如何申请权限与处理数据。',
      confirm: '同意并继续',
      cancel: '暂不使用',
      agreeTip: '感谢你的信任，已记录隐私授权。',
      disagreeTip: '已为你关闭弹窗，随时可在首页再次查看。',
    },
  },
  components: {
    button: {
      title: 'Frame Button',
      description: '内置基础、描边、虚线、文字样式，支持幽灵按钮，并提供 Loading、禁用等交互状态。',
      sections: {
        variants: '风格',
        states: '状态',
        sizes: '尺寸',
        api: '属性',
      },
      variants: {
        base: '基础',
        outline: '描边',
        dashed: '虚线',
        text: '文字',
        ghost: '幽灵',
      },
      states: {
        loading: '加载中',
        disabled: '禁用',
      },
      sizes: {
        small: '紧凑',
        medium: '默认',
        large: '大型',
      },
      api: {
        variant: 'base | outline | dashed | text',
        theme: 'default | primary | success | warning | danger',
        size: 'small | medium | large',
        shape: 'rounded | pill | square',
        block: '为 true 时按钮将占满整行。',
        ghost: '幽灵按钮（镂空按钮）。',
        loading: '显示加载动画并禁止点击。',
        disabled: '禁用状态，屏蔽点击。',
      },
    },
  },
};
