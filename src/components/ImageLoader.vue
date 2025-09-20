<template>
  <div class="relative" :class="containerClass">
    <!-- 加载占位符 -->
    <div 
      v-if="isLoading" 
      class="flex items-center justify-center bg-gray-50 rounded border-2 border-dashed border-gray-200"
      :class="[placeholderClass, containerClass]"
    >
      <div class="animate-pulse">
        <svg class="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z"></path>
        </svg>
      </div>
    </div>

    <!-- 错误占位符 -->
    <div 
      v-else-if="hasError" 
      class="flex items-center justify-center bg-gray-50 rounded border-2 border-dashed border-gray-200 text-gray-500 text-sm"
      :class="[placeholderClass, containerClass]"
    >
      <div class="text-center">
        <svg class="w-6 h-6 text-gray-400 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div class="text-xs">{{ fallbackText || '图片加载失败' }}</div>
      </div>
    </div>

    <!-- 实际图片 -->
    <img
      v-show="!isLoading && !hasError"
      :src="src"
      :alt="alt"
      :class="imageClass"
      class="block"
      @load="handleLoad"
      @error="handleError"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  src: string
  alt: string
  fallbackSrc?: string
  fallbackText?: string
  containerClass?: string
  imageClass?: string
  placeholderClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  containerClass: '',
  imageClass: 'w-full h-full object-contain',
  placeholderClass: ''
})

const isLoading = ref(true)
const hasError = ref(false)

const handleLoad = () => {
  isLoading.value = false
  hasError.value = false
}

const handleError = () => {
  isLoading.value = false
  hasError.value = true
}

// 当 src 变化时重置状态
watch(() => props.src, () => {
  isLoading.value = true
  hasError.value = false
})
</script>