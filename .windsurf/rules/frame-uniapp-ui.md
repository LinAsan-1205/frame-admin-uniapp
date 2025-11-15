---
trigger: manual
---

# frame-uniapp-ui

# components
- 每个文件和目录必须保持同步的名称
- 必须要有index.ts和types.ts
- 具体参考frame-button

# props
- 必须结构 但是不影响结构的值的变化

# styles
- 样式要符合当前系统主题
- 颜色字体大小 不允许写死 必须用已有的 如果没有 就写到src\uni_modules\frame-uniapp-ui\styles\variables.scss里面
- 样式的 颜色 大小 边距大小 只要是数字 颜色之类的 都需要放到当前组件的var 里面 定义
- 每个vue文件里面不写css css 全部定义到style.scss 然后在组件里面引入
