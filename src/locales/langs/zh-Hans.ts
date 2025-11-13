export default {
  locale: {
    'auto': '系统',
    'en': '英语',
    'zh-hans': '中文',
  },
  home: {
    title: '极简版 uni-app 启动模板',
    subtitle: '保留核心能力，开箱即可继续搭建业务页面。',
    localeLabel: '当前语言',
    localeToggle: '切换为 {lang}',
    badges: {
      stable: '开箱即用的最佳实践',
      modern: 'MCP 开发辅助已准备就绪',
    },
    sections: {
      features: '核心亮点',
      featuresSub: '重新排版后的能力卡片，方便在演示时快速说明。',
      resources: '常用资源',
      resourcesSub: '快速跳转到官方文档或模板仓库继续了解。',
      ctaTitle: '继续构建你的业务',
      ctaSubtitle: '保持这个轻量基座，直接在其上扩展页面或引入模块。',
    },
    stats: {
      request: {
        label: '请求封装',
        value: 'luch-request',
        desc: '拦截器与错误提示已内置',
      },
      hooks: {
        label: '常用 Hooks',
        value: 'use* 系列',
        desc: '剪切板、主题、权限等开箱即用',
      },
      i18n: {
        label: '国际化',
        value: 'zh / en',
        desc: '两种语言实时切换预览',
      },
    },
    features: {
      layout: '桌面端也会按照手机宽度居中展示',
      permission: '路由解析与权限拦截逻辑已经准备就绪',
      request: '内置请求封装，含拦截器、Loading 和防重复提交',
      hooks: '剪切板、定位、分享等常用 hooks 随取随用',
      i18n: '内置 Vue I18n，可一键切换多语言',
    },
    featureDescriptions: {
      layout: 'H5 自动限制在移动端尺寸，方便在桌面调试时保持一致观感。',
      permission: '权限守卫、白名单、常用常量均已预置，直接补充业务规则即可。',
      request: '拦截器、错误提示与 Loading 状态均有示例，避免重复封装。',
      hooks: '存储、剪切板、隐私弹窗等自定义 hooks 与示例已经连接。',
      i18n: '提供中英文文案示例，并支持在任意终端上动态切换。',
    },
    actions: {
      docs: '查看 uni-app 文档',
      repo: '访问模板仓库',
      privacy: '查看隐私政策',
      open: '打开',
      copyTip: '链接已复制，可在浏览器中打开',
    },
    actionDescriptions: {
      docs: '查阅官方指南、API 与发布流程。',
      repo: '浏览模板源码，了解目录约定。',
      privacy: '查看当前应用的权限使用说明。',
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
};
