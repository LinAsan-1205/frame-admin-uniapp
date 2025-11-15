<template>
  <view v-if="popupState.showWrapper" :class="popupClasses" :style="popupStyles">
    <!-- 驕ｮ鄂ｩ螻?-->
    <frame-overlay
      v-if="overlay"
      :show="popupState.showContent"
      :z-index="zIndex"
      :duration="duration"
      @close="handleOverlayClick"
    />

    <!-- 蠑ｹ蜃ｺ蜀�ｮｹ�夊ｮｩ霑�ｸ｡菴懃畑蝨ｨ蜀�ｮｹ闃らせ譛ｬ霄ｫ��osition: fixed�?-->
    <frame-transition
      :show="popupState.showContent"
      :mode="transitionMode"
      :duration="duration"
      :custom-class="contentClasses"
      :custom-style="contentStyles"
      @before-enter="handleBeforeEnter"
      @after-enter="handleAfterEnter"
      @after-leave="handleAfterLeave"
      @click.stop
    >
      <slot />
    </frame-transition>
  </view>
</template>

<script setup lang="ts">
import { computed, reactive, watch, nextTick } from 'vue'
import { addUnit, createNamespace } from '../../utils'
import { framePopupProps } from './types'
import type { FramePopupEmits, PopupPosition } from './types'

defineOptions({
  name: 'FramePopup',
})

const props = defineProps(framePopupProps)
const emit = defineEmits<FramePopupEmits>()

const { n, classes } = createNamespace('popup')

// 蠑ｹ蜃ｺ螻ら憾諤?
const popupState = reactive({
  showWrapper: false, // 譏ｯ蜷ｦ譏ｾ遉ｺ蛹�｣ｹ螻?
  showContent: false, // 譏ｯ蜷ｦ譏ｾ遉ｺ蜀�ｮｹ�域而蛻ｶ蜉ｨ逕ｻ��
})

// 霑�ｸ｡蜉ｨ逕ｻ讓｡蠑乗丐蟆�
const transitionModeMap: Record<PopupPosition, string> = {
  top: 'slide-down',
  bottom: 'slide-up',
  left: 'slide-right',
  right: 'slide-left',
  center: 'zoom-in',
}

// 霑�ｸ｡蜉ｨ逕ｻ讓｡蠑�
const transitionMode = computed(() => transitionModeMap[props.position])

// 蠑ｹ蜃ｺ螻らｱｻ蜷?
const popupClasses = computed(() =>
  classes(
    n(),
    n('--var'),
    n(`--${props.position}`),
    props.customClass,
  ),
)

// 蠑ｹ蜃ｺ螻よ�ｷ蠑?
const popupStyles = computed(() => {
  return {
    zIndex: props.zIndex,
  }
})

// 蜀�ｮｹ邀ｻ蜷搾ｼ井ｻ･蟄礼ｬｦ荳ｲ霑泌屓�碁∩蜈堺ｼ�謨ｰ扈�ｻ� frame-transition 逧?custom-class�?
const contentClasses = computed(() =>
  classes(
    n('content'),
    n(`content--${props.position}`),
    [props.round, n('content--round')],
    [props.safeAreaInsetBottom, n('content--safe-bottom')],
    [props.safeAreaInsetTop, n('content--safe-top')],
  ).join(' '),
)

// 蜀�ｮｹ譬ｷ蠑�
const contentStyles = computed(() => {
  const baseStyles: Record<string, any> = {
    backgroundColor: props.bgColor,
    // 遑ｮ菫晏�螳ｹ蝨ｨ驕ｮ鄂ｩ荵倶ｸ奇ｼ壼�螳ｹ螻らｺｧ = 驕ｮ鄂ｩ螻らｺｧ + 1
    zIndex: (props.zIndex || 0) + 1,
  }

  // 蝨�ｧ�
  if (props.round) {
    const radius = addUnit(props.radius)
    if (props.position === 'top') {
      baseStyles.borderBottomLeftRadius = radius
      baseStyles.borderBottomRightRadius = radius
    } else if (props.position === 'bottom') {
      baseStyles.borderTopLeftRadius = radius
      baseStyles.borderTopRightRadius = radius
    } else if (props.position === 'center') {
      baseStyles.borderRadius = radius
    }
  }

  // 螳ｽ蠎ｦ�亥ｷｦ蜿ｳ蠑ｹ蜃ｺ譌ｶ逕滓譜�?
  if (props.width && (props.position === 'left' || props.position === 'right')) {
    baseStyles.width = addUnit(props.width)
  }

  // 鬮伜ｺｦ�井ｸ贋ｸ句ｼｹ蜃ｺ譌ｶ逕滓譜�?
  if (props.height && (props.position === 'top' || props.position === 'bottom')) {
    baseStyles.height = addUnit(props.height)
  }

  // center 讓｡蠑擾ｼ壽署萓帛ｱ�ｸｭ螳壻ｽ堺ｸ惹ｽ咲ｧｻ�井ｸ主勘逕ｻ transform 蜷亥ｹｶ�?
  if (props.position === 'center') {
    baseStyles.top = '50%'
    baseStyles.left = '50%'
    baseStyles.transform = 'translate(-50%, -50%)'
    baseStyles.maxWidth = '90%'
  }

  // 蜷亥ｹｶ閾ｪ螳壻ｹ画�ｷ蠑?
  if (typeof props.customStyle === 'string') {
    return `${styleToString(baseStyles)};${props.customStyle}`
  }

  return {
    ...baseStyles,
    ...props.customStyle,
  }
})

/**
 * 蟆��ｷ蠑丞ｯｹ雎｡霓ｬ荳ｺ蟄礼ｬｦ荳ｲ
 */
function styleToString(styles: Record<string, any>): string {
  return Object.entries(styles)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      return `${cssKey}:${value}`
    })
    .join(';')
}

/**
 * 螟�炊驕ｮ鄂ｩ螻らせ蜃?
 */
function handleOverlayClick() {
  emit('click-overlay')
  if (props.closeOnClickOverlay) {
    close()
  }
}

/**
 * 蜉ｨ逕ｻ蠑蟋句燕
 */
function handleBeforeEnter() {
  // 蜿ｯ莉･蝨ｨ霑咎㈹蛛壻ｸ莠帛㊥螟�ｷ･菴?
}

/**
 * 蜉ｨ逕ｻ扈捺據蜷趣ｼ域遠蠑�?
 */
function handleAfterEnter() {
  emit('open')
}

/**
 * 蜉ｨ逕ｻ扈捺據蜷趣ｼ亥�髣ｭ�?
 */
function handleAfterLeave() {
  popupState.showWrapper = false
  emit('close')
}

/**
 * 謇灘ｼ蠑ｹ蜃ｺ螻?
 */
function open() {
  popupState.showWrapper = true
  nextTick(() => {
    popupState.showContent = true
  })
}

/**
 * 蜈ｳ髣ｭ蠑ｹ蜃ｺ螻?
 */
function close() {
  popupState.showContent = false
}

// 逶大成 show 蜿伜喧
watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      open()
    } else {
      close()
    }
  },
  { immediate: true },
)

// 證ｴ髴ｲ譁ｹ豕�
defineExpose({
  open,
  close,
})
</script>

<script lang="ts">
export default {
  name: 'FramePopup',
  // #ifdef MP-WEIXIN
  options: {
    virtualHost: true,
  },
  // #endif
}
</script>

<style scoped lang="scss">
@import './style.scss';
</style>
