<template>
  <div class="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
    <div class="flex items-start">
      <div class="flex-shrink-0">
        <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
      </div>
      <div class="ml-3 flex-1">
        <h3 class="text-sm font-medium text-red-800">{{ title }}</h3>
        <div class="mt-2 text-sm text-red-700">
          <p>{{ message }}</p>
          <div v-if="details" class="mt-2 p-2 bg-red-100 rounded text-xs font-mono">
            {{ details }}
          </div>
        </div>
        <div class="mt-4 flex space-x-3">
          <button 
            v-if="showRetry"
            @click="handleRetry" 
            class="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm font-medium transition-colors"
          >
            {{ retryText }}
          </button>
          <button 
            v-if="showDismiss"
            @click="handleDismiss" 
            class="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm font-medium transition-colors"
          >
            {{ dismissText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  message: string
  details?: string
  showRetry?: boolean
  showDismiss?: boolean
  retryText?: string
  dismissText?: string
}

interface Emits {
  (e: 'retry'): void
  (e: 'dismiss'): void
}

const props = withDefaults(defineProps<Props>(), {
  title: '发生错误',
  showRetry: true,
  showDismiss: false,
  retryText: '重试',
  dismissText: '忽略'
})

const emit = defineEmits<Emits>()

const handleRetry = () => {
  emit('retry')
}

const handleDismiss = () => {
  emit('dismiss')
}
</script>