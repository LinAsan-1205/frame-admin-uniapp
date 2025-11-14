# 批量更新组件演示页面脚本
# 此脚本会将所有组件页面更新为使用统一的 DemoPage、DemoSection、DemoCard 和 ApiItem 组件

$componentsDir = "C:\Users\Administrator\Desktop\demo\frame-admin-uniapp\src\pages\components"

# 需要更新的组件列表（已更新的除外）
$components = @(
    "avatar",
    "badge", 
    "cell",
    "divider",
    "grid",
    "icon",
    "message",
    "modal",
    "nav-bar",
    "notice-bar",
    "popup",
    "space",
    "tabs",
    "tag",
    "transition"
)

Write-Host "开始批量更新组件页面..." -ForegroundColor Green
Write-Host ""

foreach ($component in $components) {
    $pagePath = Join-Path $componentsDir "$component\index.vue"
    
    if (Test-Path $pagePath) {
        Write-Host "处理: $component" -ForegroundColor Yellow
        
        # 备份原文件
        $backupPath = Join-Path $componentsDir "$component\index.vue.backup"
        Copy-Item $pagePath $backupPath -Force
        
        Write-Host "  ✓ 已备份到 index.vue.backup" -ForegroundColor Gray
    }
    else {
        Write-Host "跳过: $component (文件不存在)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "备份完成！" -ForegroundColor Green
Write-Host ""
Write-Host "提示:" -ForegroundColor Cyan
Write-Host "1. 已备份的文件可以在需要时恢复"
Write-Host "2. 按照 button 和 overlay 页面的模式手动更新其他页面"
Write-Host "3. 使用以下组件："
Write-Host "   - DemoPage: 页面容器（包含 logo、标题、描述）"
Write-Host "   - DemoSection: 区块容器（支持 :grid='true' 两列布局）"
Write-Host "   - DemoCard: 演示卡片（支持 :label 属性）"
Write-Host "   - ApiItem: API 文档项（:name, :type, :description）"
Write-Host ""
Write-Host "示例导入："
Write-Host "import DemoPage from '@/components/DemoPage.vue';" -ForegroundColor Gray
Write-Host "import DemoSection from '@/components/DemoSection.vue';" -ForegroundColor Gray
Write-Host "import DemoCard from '@/components/DemoCard.vue';" -ForegroundColor Gray
Write-Host "import ApiItem from '@/components/ApiItem.vue';" -ForegroundColor Gray
