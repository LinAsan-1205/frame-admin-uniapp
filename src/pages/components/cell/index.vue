<template>
  <DemoPage title="Cell 单元格" description="列表中的单个单元格，可组成列表">
    <DemoSection title="基础用法">
      <view class="cell-demo">
        <frame-cell title="单元格" value="内容" />
        <frame-cell title="单元格" value="内容" label="描述信息" />
      </view>
    </DemoSection>

    <DemoSection title="带图标">
      <view class="cell-demo">
        <frame-cell title="个人信息" icon="user" :is-link="true" />
        <frame-cell title="设置" icon="setting" :is-link="true" />
        <frame-cell title="消息通知" icon="bell" :is-link="true" />
      </view>
    </DemoSection>

    <DemoSection title="必填标记">
      <view class="cell-demo">
        <frame-cell title="姓名" :required="true" />
        <frame-cell title="手机号" :required="true" />
        <frame-cell title="邮箱" :required="true" />
      </view>
    </DemoSection>

    <DemoSection title="不同尺寸">
      <view class="cell-demo">
        <frame-cell title="小尺寸" size="sm" value="内容" />
        <frame-cell title="默认尺寸" size="md" value="内容" />
        <frame-cell title="大尺寸" size="lg" value="内容" />
      </view>
    </DemoSection>

    <DemoSection title="API 属性" :grid="true">
      <ApiItem name="title" type="string" description="左侧标题" />
      <ApiItem name="value" type="string" description="右侧内容" />
      <ApiItem name="label" type="string" description="标题下方的描述信息" />
      <ApiItem name="icon" type="string" description="左侧图标名称" />
      <ApiItem name="is-link" type="boolean" description="是否展示右侧箭头" />
      <ApiItem name="required" type="boolean" description="是否显示必填标记" />
      <ApiItem name="size" type="string" description="尺寸：sm | md | lg" />
    </DemoSection>
  </DemoPage>
</template>

<script setup lang="ts">
import DemoPage from '@/components/DemoPage.vue';
import DemoSection from '@/components/DemoSection.vue';
import ApiItem from '@/components/ApiItem.vue';
</script>

<style scoped lang="scss">
.cell-demo {
  padding: 0;
}
</style>
