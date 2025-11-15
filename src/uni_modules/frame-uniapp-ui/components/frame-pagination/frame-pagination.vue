<template>
  <view :class="paginationClasses" :style="customStyle">
    <!-- 简单模式 -->
    <template v-if="simple">
      <view :class="n('simple')">
        <frame-button
          :disabled="currentPage === 1"
          :size="size"
          variant="outline"
          shape="rounded"
          @click="handlePrev"
        >
          {{ prevText || '上一页' }}
        </frame-button>
        
        <view :class="n('simple-info')">
          <text :class="n('simple-current')">{{ currentPage }}</text>
          <text :class="n('simple-separator')">/</text>
          <text :class="n('simple-total')">{{ totalPages }}</text>
        </view>
        
        <frame-button
          :disabled="currentPage === totalPages"
          :size="size"
          variant="outline"
          shape="rounded"
          @click="handleNext"
        >
          {{ nextText || '下一页' }}
        </frame-button>
      </view>
    </template>

    <!-- 完整模式 -->
    <template v-else>
      <view :class="n('full')">
        <!-- 上一页按钮 -->
        <frame-button
          v-if="showPrevNext"
          :disabled="currentPage === 1"
          :size="size"
          variant="outline"
          shape="rounded"
          @click="handlePrev"
        >
          {{ prevText || '上一页' }}
        </frame-button>

        <!-- 页码列表 -->
        <view :class="n('pages')">
          <!-- 左侧省略号 -->
          <frame-button
            v-if="showLeftEllipsis"
            :size="size"
            variant="outline"
            shape="rounded"
            @click="handleEllipsisClick('left')"
          >
            {{ ellipsisText || '...' }}
          </frame-button>

          <!-- 页码按钮（连续显示） -->
          <frame-button
            v-for="page in middlePages"
            :key="page"
            :size="size"
            :variant="currentPage === page ? 'base' : 'outline'"
            :theme="currentPage === page ? theme : 'default'"
            shape="rounded"
            :background-color="currentPage === page ? props.activeBackgroundColor : undefined"
            :text-color="currentPage === page ? props.activeTextColor : undefined"
            @click="handlePageClick(page)"
          >
            {{ page }}
          </frame-button>

          <!-- 右侧省略号 -->
          <frame-button
            v-if="showRightEllipsis"
            :size="size"
            variant="outline"
            shape="rounded"
            @click="handleEllipsisClick('right')"
          >
            {{ ellipsisText || '...' }}
          </frame-button>
        </view>

        <!-- 下一页按钮 -->
        <frame-button
          v-if="showPrevNext"
          :disabled="currentPage === totalPages"
          :size="size"
          variant="outline"
          shape="rounded"
          @click="handleNext"
        >
          {{ nextText || '下一页' }}
        </frame-button>
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { createNamespace } from '../../utils';
import type {
  FramePaginationEmits,
  FramePaginationProps,
} from './types';

// 使用 BEM 命名工具
const { n, classes: bemClasses } = createNamespace('pagination');

const props = withDefaults(defineProps<FramePaginationProps>(), {
  modelValue: 1,
  total: 0,
  pageSize: 10,
  pageCount: 3,
  size: 'small',
  theme: 'primary',
  simple: false,
  showPrevNext: true,
  showFirstLast: false,
  showEllipsis: true,
  showJumper: false,
  showTotal: false,
  prevText: '',
  nextText: '',
  ellipsisText: '',
  classPrefix: 'wd-icon',
  activeBackgroundColor: undefined,
  activeTextColor: undefined,
});

const emit = defineEmits<FramePaginationEmits>();

// 当前页码
const currentPage = ref(props.modelValue);

// 监听 modelValue 变化
watch(() => props.modelValue, (val) => {
  currentPage.value = val;
});

// 总页数
const totalPages = computed(() => {
  return Math.ceil(props.total / props.pageSize);
});

const pages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const count = props.pageCount;

  // 如果总页数小于等于要显示的页码数，显示所有页码
  if (total <= count + 2) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const half = Math.floor(count / 2);
  let start = Math.max(1, current - half);
  let end = Math.min(total, start + count - 1);

  // 调整起始位置，确保显示固定数量的页码
  if (end - start + 1 < count) {
    start = Math.max(1, end - count + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const middlePages = computed(() => {
  return pages.value;
});

// 是否显示左侧省略号
const showLeftEllipsis = computed(() => {
  if (!props.showEllipsis) {
    return false;
  }
  return pages.value[0] > 1;
});

// 是否显示右侧省略号
const showRightEllipsis = computed(() => {
  if (!props.showEllipsis) {
    return false;
  }
  return pages.value[pages.value.length - 1] < totalPages.value;
});

// 组件类名
const paginationClasses = computed(() => {
  return bemClasses(
    n(),
    n(`--size-${props.size}` as any),
    [props.simple, n('--simple')],
    props.customClass,
  );
});

// 上一页
function handlePrev() {
  if (currentPage.value > 1) {
    changePage(currentPage.value - 1);
  }
}

// 下一页
function handleNext() {
  if (currentPage.value < totalPages.value) {
    changePage(currentPage.value + 1);
  }
}

// 点击页码
function handlePageClick(page: number) {
  if (page !== currentPage.value) {
    changePage(page);
  }
}

// 点击省略号
function handleEllipsisClick(direction: 'left' | 'right') {
  const step = props.pageCount;
  let targetPage: number;

  if (direction === 'left') {
    targetPage = Math.max(1, currentPage.value - step);
  }
  else {
    targetPage = Math.min(totalPages.value, currentPage.value + step);
  }

  changePage(targetPage);
}

// 切换页码
function changePage(page: number) {
  currentPage.value = page;
  emit('update:modelValue', page);
  emit('change', page);
}
</script>

<style scoped lang="scss">
.fui-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20rpx 0;
}

/* 简单模式 */
.fui-pagination__simple {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.fui-pagination__simple-info {
  display: flex;
  align-items: center;
  gap: 8rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  color: var(--fui-color-text-primary, #333);
}

.fui-pagination__simple-current {
  font-weight: 600;
  color: var(--fui-color-primary, #1890ff);
}

.fui-pagination__simple-separator {
  margin: 0 4rpx;
  color: var(--fui-color-text-secondary, #666);
}

.fui-pagination__simple-total {
  color: var(--fui-color-text-secondary, #666);
}

/* 完整模式 */
.fui-pagination__full {
  display: flex;
  align-items: center;
  gap: 8rpx;
  flex-wrap: wrap;
  justify-content: center;
}

.fui-pagination__pages {
  display: flex;
  align-items: center;
  gap: 6rpx;
}

/* 尺寸变体 */
.fui-pagination--size-small {
  .fui-pagination__simple-info {
    font-size: 24rpx;
  }
}

.fui-pagination--size-large {
  .fui-pagination__simple-info {
    font-size: 32rpx;
  }
}
</style>
