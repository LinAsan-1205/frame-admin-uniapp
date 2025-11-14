# 组件演示页面更新指南

已创建通用的演示页面组件，用于统一所有组件演示页面的样式和布局。

## 已完成的页面

- ✅ button (按钮)
- ✅ overlay (遮罩层) 
- ✅ loading (加载)

## 可用的通用组件

### 1. DemoPage
页面容器组件，包含 logo、标题和描述。

```vue
<DemoPage title="组件标题" description="组件描述">
  <!-- 内容 -->
</DemoPage>
```

### 2. DemoSection
区块容器组件，包含标题和内容区域。

```vue
<!-- 普通布局 -->
<DemoSection title="区块标题">
  <!-- 内容 -->
</DemoSection>

<!-- 两列网格布局 -->
<DemoSection title="区块标题" :grid="true">
  <!-- 自动两列排列 -->
</DemoSection>
```

### 3. DemoCard
演示卡片组件，用于展示单个演示项。

```vue
<DemoCard label="演示标签">
  <!-- 演示内容，如按钮 -->
</DemoCard>
```

### 4. ApiItem
API 文档项组件，用于展示 API 属性。

```vue
<ApiItem
  name="propName"
  type="string"
  description="属性描述"
/>
```

## 更新步骤

### 1. 导入组件

在 `<script setup>` 中添加导入：

```typescript
import DemoPage from '@/components/DemoPage.vue';
import DemoSection from '@/components/DemoSection.vue';
import DemoCard from '@/components/DemoCard.vue';
import ApiItem from '@/components/ApiItem.vue';
```

### 2. 更新模板结构

#### 旧结构：
```vue
<template>
  <view class="component-page">
    <view class="page-header">
      <text class="page-title">标题</text>
      <text class="page-desc">描述</text>
    </view>
    
    <view class="demo-section">
      <view class="section-header">
        <text class="section-title">演示标题</text>
      </view>
      <view class="section-content">
        <!-- 内容 -->
      </view>
    </view>
  </view>
</template>
```

#### 新结构：
```vue
<template>
  <DemoPage title="标题" description="描述">
    <DemoSection title="演示标题" :grid="true">
      <DemoCard label="标签">
        <!-- 内容 -->
      </DemoCard>
    </DemoSection>
  </DemoPage>
</template>
```

### 3. 删除样式

删除所有相关的 `<style>` 部分，因为样式已经包含在通用组件中。

## 示例参考

查看以下文件作为参考：
- `src/pages/components/button/index.vue` - 完整示例
- `src/pages/components/overlay/index.vue` - Overlay 组件示例
- `src/pages/components/loading/index.vue` - Loading 组件示例

## 设计规范

- **主色调**: #003dad
- **两列布局**: 使用 `grid="true"` 属性
- **渐变背景**: 已内置在组件中
- **交互效果**: 点击缩放、悬停阴影等已内置
- **统一圆角**: 28-32rpx

## 待更新页面列表

以下页面已备份（.backup 文件），可以按需更新：

- [ ] avatar
- [ ] badge
- [ ] cell
- [ ] divider
- [ ] grid
- [ ] icon
- [ ] message
- [ ] modal
- [ ] nav-bar
- [ ] notice-bar
- [ ] popup
- [ ] space
- [ ] tabs
- [ ] tag
- [ ] transition

## 注意事项

1. **Overlay 组件**: 应始终渲染在页面底部，通过 `:show` 属性控制显示，不要用 `v-if`
2. **Logo**: 自动显示在每个页面顶部
3. **响应式**: 组件已支持不同屏幕尺寸
4. **暗色模式**: 使用 CSS 变量支持主题切换

## 恢复备份

如果需要恢复原始文件：

```powershell
Copy-Item "src/pages/components/[组件名]/index.vue.backup" "src/pages/components/[组件名]/index.vue" -Force
```
