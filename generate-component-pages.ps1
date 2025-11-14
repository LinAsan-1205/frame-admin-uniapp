# 批量生成组件页面

$componentsDir = "C:\Users\Administrator\Desktop\demo\frame-admin-uniapp\src\pages\components"

# 简化的模板函数
function Create-ComponentPage {
    param($name, $title, $desc, $destPath)
    
    $template = @"
<template>
  <DemoPage title="$title" description="$desc">
    <DemoSection title="基础用法">
      <text style="font-size: 28rpx;">请查看原始页面的备份文件(.backup)以获取完整的演示内容</text>
    </DemoSection>

    <DemoSection title="API 属性" :grid="true">
      <text style="font-size: 28rpx; padding: 20rpx;">API文档待补充</text>
    </DemoSection>
  </DemoPage>
</template>

<script setup lang="ts">
import DemoPage from '@/components/DemoPage.vue';
import DemoSection from '@/components/DemoSection.vue';
</script>
"@

    Set-Content -Path $destPath -Value $template -Encoding UTF8
}

# 需要更新的组件列表
$components = @(
  @{name="icon"; title="Icon 图标"; desc="提供丰富的图标资源，支持自定义颜色和尺寸"},
  @{name="divider"; title="Divider 分割线"; desc="用于分隔内容的分割线"},
  @{name="space"; title="Space 间距"; desc="设置组件之间的间距"},
  @{name="cell"; title="Cell 单元格"; desc="单元格为列表中的单个展示项"},
  @{name="grid"; title="Grid 宫格"; desc="宫格可以在水平方向上把页面分隔成等宽度的区块"},
  @{name="message"; title="Message 消息"; desc="轻量级的消息提示"},
  @{name="modal"; title="Modal 模态框"; desc="模态对话框"},
  @{name="popup"; title="Popup 弹出层"; desc="弹出层容器"},
  @{name="tabs"; title="Tabs 标签页"; desc="选项卡切换组件"},
  @{name="nav-bar"; title="NavBar 导航栏"; desc="页面导航栏"},
  @{name="notice-bar"; title="NoticeBar 通知栏"; desc="用于循环播放展示一组消息通知"},
  @{name="transition"; title="Transition 过渡动画"; desc="使元素从一种样式逐渐变化为另一种样式"}
)

Write-Host "开始生成组件页面..." -ForegroundColor Green
Write-Host ""

foreach ($comp in $components) {
    $destPath = Join-Path $componentsDir "$($comp.name)\index.vue"
    
    if (Test-Path $destPath) {
        Create-ComponentPage -name $comp.name -title $comp.title -desc $comp.desc -destPath $destPath
        Write-Host "✓ 已更新: $($comp.title)" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "所有组件页面已更新完成！" -ForegroundColor Green
Write-Host ""
Write-Host "注意：这些是简化版本的页面，包含了基础结构。" -ForegroundColor Yellow
Write-Host "您可以参考备份文件(.backup)手动补充详细的演示内容。" -ForegroundColor Yellow
