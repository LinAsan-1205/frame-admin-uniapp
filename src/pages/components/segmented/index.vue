<template>
  <DemoPage title="Segmented 分段器" description="用于复杂区域进行分段和隐藏，常用于单选信息展示">
    <DemoSectionTabs :tabs="['示例', 'API']" @change="handleTabChange">
      <DemoTabPane :active="activeTab === 0">
        <DemoSection title="基础用法">
          <frame-segmented
            v-model="value1"
            :options="['选项1', '选项2', '选项3', '选项4']"
          />
        </DemoSection>

        <DemoSection title="形状">
          <view class="flex flex-col gap-24rpx">
            <frame-segmented
              v-model="value2"
              :options="['选项1', '选项2', '选项3', '选项4']"
              shape="square"
            />
            <frame-segmented
              v-model="value2"
              :options="['选项1', '选项2', '选项3', '选项4']"
              shape="round"
            />
            <frame-segmented
              v-model="value2"
              :options="['选项1', '选项2', '选项3', '选项4']"
              shape="pill"
            />
          </view>
        </DemoSection>

        <DemoSection title="尺寸">
          <view class="flex flex-col gap-24rpx">
            <frame-segmented
              v-model="value3"
              :options="['选项1', '选项2', '选项3']"
              size="sm"
            />
            <frame-segmented
              v-model="value3"
              :options="['选项1', '选项2', '选项3']"
              size="md"
            />
            <frame-segmented
              v-model="value3"
              :options="['选项1', '选项2', '选项3']"
              size="lg"
            />
          </view>
        </DemoSection>

        <DemoSection title="块级元素">
          <frame-segmented
            v-model="value4"
            :options="['选项1', '选项2', '选项3']"
            block
          />
        </DemoSection>

        <DemoSection title="带图标">
          <view class="flex flex-col gap-24rpx">
            <frame-segmented
              v-model="value5"
              :options="iconOptions"
            />
            <frame-segmented
              v-model="value13"
              :options="styledIconOptions"
              bg-color="#1e293b"
              indicator-color="#3b82f6"
              active-color="#ffffff"
              color="#94a3b8"
            />
          </view>
        </DemoSection>

        <DemoSection title="禁用状态">
          <view class="flex flex-col gap-24rpx">
            <frame-segmented
              v-model="value6"
              :options="disabledOptions"
            />
            <frame-segmented
              v-model="value7"
              :options="['选项1', '选项2', '选项3']"
              disabled
            />
          </view>
        </DemoSection>

        <DemoSection title="自定义样式">
          <view class="flex flex-col gap-24rpx">
            <frame-segmented
              v-model="value8"
              :options="['选项1', '选项2', '选项3']"
              bg-color="#e3f2fd"
              color="#1976d2"
            />
            <frame-segmented
              v-model="value9"
              :options="['选项1', '选项2', '选项3']"
              height="80rpx"
              font-size="32rpx"
            />
            <frame-segmented
              v-model="value10"
              :options="['选项1', '选项2', '选项3']"
              padding="10rpx 30rpx"
            />
            <frame-segmented
              v-model="value12"
              :options="['选项1', '选项2', '选项3']"
              indicator-color="#ff9800"
              active-color="#ffffff"
            />
          </view>
        </DemoSection>

        <DemoSection title="事件监听">
          <view class="flex flex-col gap-24rpx">
            <frame-segmented
              v-model="value11"
              :options="['选项1', '选项2', '选项3', '选项4']"
              @change="handleChange"
              @click="handleClick"
            />
            <view class="text-28rpx text-#666">
              <text>最后点击: {{ lastClick }}</text>
            </view>
            <view class="text-28rpx text-#666">
              <text>最后切换: {{ lastChange }}</text>
            </view>
          </view>
        </DemoSection>
      </DemoTabPane>

      <DemoTabPane :active="activeTab === 1">
        <DemoSection title="基础属性" :grid="true">
          <ApiItem name="v-model" type="string | number" description="当前选中值" />
          <ApiItem name="options" type="Array" description="选项列表，支持字符串数组或对象数组" />
          <ApiItem name="disabled" type="boolean" description="是否禁用，默认 false" />
          <ApiItem name="size" type="string" description="尺寸：sm | md | lg，默认 md" />
          <ApiItem name="shape" type="string" description="形状：square | round | pill，默认 round" />
          <ApiItem name="block" type="boolean" description="是否为块级元素，默认 false" />
        </DemoSection>

        <DemoSection title="样式属性" :grid="true">
          <ApiItem name="color" type="string" description="分段器文本颜色" />
          <ApiItem name="bg-color" type="string" description="分段器背景色" />
          <ApiItem name="height" type="string | number" description="分段器高度" />
          <ApiItem name="font-size" type="string | number" description="分段器文字大小" />
          <ApiItem name="padding" type="string | number" description="分段器内边距" />
          <ApiItem name="indicator-color" type="string" description="指示器背景色" />
          <ApiItem name="active-color" type="string" description="激活项文字颜色" />
        </DemoSection>

        <DemoSection title="选项对象属性" :grid="true">
          <ApiItem name="value" type="string | number" description="选项值" />
          <ApiItem name="label" type="string" description="选项文本" />
          <ApiItem name="icon" type="string" description="选项图标" />
          <ApiItem name="disabled" type="boolean" description="是否禁用该选项" />
        </DemoSection>

        <DemoSection title="事件" :grid="true">
          <ApiItem name="change" type="event" description="分段切换时触发，参数：value（选中的值）、index（选中分段的索引）" />
          <ApiItem name="click" type="event" description="点击分段时触发，参数：value（点击的值）、index（点击分段的索引）" />
        </DemoSection>
      </DemoTabPane>
    </DemoSectionTabs>
  </DemoPage>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ApiItem from '@/components/ApiItem.vue';
import DemoPage from '@/components/DemoPage.vue';
import DemoSection from '@/components/DemoSection.vue';
import DemoSectionTabs from '@/components/DemoSectionTabs.vue';
import DemoTabPane from '@/components/DemoTabPane.vue';

const activeTab = ref(0);

function handleTabChange(index: number) {
  activeTab.value = index;
}

const value1 = ref('选项1');
const value2 = ref('选项1');
const value3 = ref('选项1');
const value4 = ref('选项1');
const value5 = ref('home');
const value6 = ref('选项1');
const value7 = ref('选项1');
const value8 = ref('选项1');
const value9 = ref('选项1');
const value10 = ref('选项1');
const value11 = ref('选项1');
const value12 = ref('选项1');
const value13 = ref('chart');

const lastClick = ref('');
const lastChange = ref('');

const iconOptions = [
  { value: 'home', label: '首页', icon: 'i-mdi-home' },
  { value: 'user', label: '用户', icon: 'i-mdi-account' },
  { value: 'setting', label: '设置', icon: 'i-mdi-cog' },
];

const styledIconOptions = [
  { value: 'chart', label: '图表', icon: 'i-mdi-chart-line' },
  { value: 'data', label: '数据', icon: 'i-mdi-database' },
  { value: 'file', label: '文件', icon: 'i-mdi-file-document' },
];

const disabledOptions = [
  { value: '选项1', label: '选项1' },
  { value: '选项2', label: '选项2', disabled: true },
  { value: '选项3', label: '选项3' },
];

function handleChange(value: string | number, index: number) {
  lastChange.value = `值: ${value}, 索引: ${index}`;
}

function handleClick(value: string | number, index: number) {
  lastClick.value = `值: ${value}, 索引: ${index}`;
}
</script>

<style scoped lang="scss">
</style>
