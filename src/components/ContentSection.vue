<template>
  <ProgressiveLoader
    :is-loading="isLoading"
    :content-type="contentType"
    :skeleton-count="skeletonCount"
    :show-spinner="showSpinner"
    :loading-text="loadingText"
    @loaded="onContentLoaded"
    @content-visible="onContentVisible"
  >
    <!-- Actual content with fade-in items -->
    <div class="content-grid">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="content-item fade-in-item"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <slot name="item" :item="item" :index="index">
          <!-- Default item template -->
          <div class="default-item">
            <h3 class="item-title font-cascadia">{{ item.title }}</h3>
            <p class="item-description font-mixed">{{ item.description }}</p>
          </div>
        </slot>
      </div>
    </div>
  </ProgressiveLoader>
</template>

<script setup lang="ts">
interface ContentItem {
  id: string | number
  title: string
  description: string
  [key: string]: any
}

interface Props {
  items?: ContentItem[]
  isLoading?: boolean
  contentType?: 'card' | 'list' | 'block'
  skeletonCount?: number
  showSpinner?: boolean
  loadingText?: string
  loadingDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  isLoading: true,
  contentType: 'card',
  skeletonCount: 3,
  showSpinner: true,
  loadingText: '加载内容中...',
  loadingDelay: 1000
})

const emit = defineEmits<{
  loaded: []
  contentVisible: []
}>()

// Simulate loading delay
const internalLoading = ref(props.isLoading)

onMounted(() => {
  if (props.isLoading && props.loadingDelay > 0) {
    setTimeout(() => {
      internalLoading.value = false
    }, props.loadingDelay)
  }
})

const isLoading = computed(() => {
  return props.isLoading && internalLoading.value
})

const onContentLoaded = () => {
  emit('loaded')
}

const onContentVisible = () => {
  emit('contentVisible')
}
</script>

<style scoped>
.content-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.content-item {
  opacity: 0;
  transform: translateY(20px);
}

.fade-in-item {
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.default-item {
  padding: 1.5rem;
  border-radius: 8px;
  background: white;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
}

.default-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.item-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.item-description {
  color: #6b7280;
  line-height: 1.6;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .default-item {
    padding: 1rem;
  }
  
  .item-title {
    font-size: 1.125rem;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .fade-in-item {
    animation: none;
    opacity: 1;
    transform: none;
  }
  
  .default-item:hover {
    transform: none;
  }
}
</style>