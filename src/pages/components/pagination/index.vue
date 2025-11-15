<template>
  <DemoPage title="Pagination 分页" description="功能丰富的分页组件，支持简单模式、完整模式、多种主题和尺寸">
    <!-- 预览 -->
    <view style="padding: 0 32rpx;">
      <frame-pagination
        v-model="previewPage"
        :total="100"
      />
    </view>

    <!-- 基础用法 -->
    <DemoSection title="基础用法">
      <DemoCard label="简单模式">
        <frame-pagination
          v-model="page1"
          :total="100"
          simple
        />
      </DemoCard>

      <DemoCard label="完整模式">
        <frame-pagination
          v-model="page2"
          :total="100"
        />
      </DemoCard>
    </DemoSection>

    <!-- 不同主题 -->
    <DemoSection title="不同主题">
      <DemoCard label="默认主题">
        <frame-pagination
          v-model="page7"
          :total="100"
          theme="default"
        />
      </DemoCard>

      <DemoCard label="主要主题">
        <frame-pagination
          v-model="page8"
          :total="100"
          theme="primary"
        />
      </DemoCard>

      <DemoCard label="成功主题">
        <frame-pagination
          v-model="page9"
          :total="100"
          theme="success"
        />
      </DemoCard>

      <DemoCard label="自定义颜色">
        <frame-pagination
          v-model="page10"
          :total="100"
          active-background-color="#ff6b6b"
          active-text-color="#ffffff"
        />
      </DemoCard>
    </DemoSection>

    <!-- 实际应用 -->
    <DemoSection title="实际应用">
      <DemoCard label="数据列表分页">
        <view class="data-list">
          <view
            v-for="item in currentList"
            :key="item.id"
            class="data-item"
          >
            <view class="item-title">
              {{ item.title }}
            </view>
            <view class="item-desc">
              {{ item.desc }}
            </view>
          </view>
        </view>
        <frame-pagination
          v-model="listPage"
          :total="dataList.length"
          :page-size="3"
        />
      </DemoCard>
    </DemoSection>

    <!-- API 文档 -->
    <DemoSection title="API 文档">
      <ApiItem
        v-for="item in apiItems"
        :key="item.key"
        :name="item.name"
        :description="item.desc"
      />
    </DemoSection>
  </DemoPage>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import ApiItem from '@/components/ApiItem.vue';
import DemoCard from '@/components/DemoCard.vue';
import DemoPage from '@/components/DemoPage.vue';
import DemoSection from '@/components/DemoSection.vue';

// 页码状态
const previewPage = ref(1);
const page1 = ref(1);
const page2 = ref(1);
const page7 = ref(1);
const page8 = ref(1);
const page9 = ref(1);
const page10 = ref(1);

// 数据列表示例
const listPage = ref(1);
const dataList = ref([
  { id: 1, title: '数据项 1', desc: '这是第一条数据的描述信息' },
  { id: 2, title: '数据项 2', desc: '这是第二条数据的描述信息' },
  { id: 3, title: '数据项 3', desc: '这是第三条数据的描述信息' },
  { id: 4, title: '数据项 4', desc: '这是第四条数据的描述信息' },
  { id: 5, title: '数据项 5', desc: '这是第五条数据的描述信息' },
  { id: 6, title: '数据项 6', desc: '这是第六条数据的描述信息' },
  { id: 7, title: '数据项 7', desc: '这是第七条数据的描述信息' },
  { id: 8, title: '数据项 8', desc: '这是第八条数据的描述信息' },
  { id: 9, title: '数据项 9', desc: '这是第九条数据的描述信息' },
  { id: 10, title: '数据项 10', desc: '这是第十条数据的描述信息' },
]);

// 当前页显示的数据（每页3条）
const currentList = computed(() => {
  const start = (listPage.value - 1) * 3;
  const end = start + 3;
  return dataList.value.slice(start, end);
});

// API 文档
const apiItems = [
  { key: 'modelValue', name: 'v-model', desc: '当前页码，支持 v-model 双向绑定' },
  { key: 'total', name: 'total', desc: '数据总条数' },
  { key: 'pageSize', name: 'page-size', desc: '每页显示条数，默认 10' },
  { key: 'size', name: 'size', desc: '分页尺寸，可选值：mini / small / medium / large' },
  { key: 'theme', name: 'theme', desc: '主题色，可选值：default / primary / success / warning / danger' },
  { key: 'simple', name: 'simple', desc: '是否使用简单模式' },
  { key: 'activeBackgroundColor', name: 'active-background-color', desc: '自定义选中背景色，如：#ff6b6b' },
  { key: 'activeTextColor', name: 'active-text-color', desc: '自定义选中文字颜色，如：#ffffff' },
];
</script>

<style scoped lang="scss">
.data-list {
  margin-bottom: 30rpx;
}

.data-item {
  padding: 24rpx;
  margin-bottom: 16rpx;
  background: var(--fui-color-background, #f9fafb);
  border-radius: 12rpx;
  transition: all 0.3s;

  &:last-child {
    margin-bottom: 0;
  }

  &:active {
    transform: scale(0.98);
    background: rgba(102, 126, 234, 0.05);
  }
}

.item-title {
  font-size: 28rpx;
  font-weight: 600;
  color: var(--fui-color-text-primary, #1a1a1a);
  margin-bottom: 8rpx;
}

.item-desc {
  font-size: 24rpx;
  color: var(--fui-color-text-secondary, #666);
  line-height: 1.6;
}

// 暗黑模式
[data-theme='dark'] {
  .data-item {
    background: #111827;

    &:active {
      background: rgba(102, 126, 234, 0.15);
    }
  }
}
</style>
