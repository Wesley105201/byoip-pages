<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <TransitionGroup name="notification" tag="div">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="notification-card rounded-lg shadow-lg p-4 border-l-4"
          :class="getNotificationClasses(notification.type)"
        >
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <component :is="getIcon(notification.type)" class="w-5 h-5" />
            </div>
            <div class="ml-3 flex-1">
              <h4 class="text-sm font-medium" :class="getTitleClasses(notification.type)">
                {{ notification.title }}
              </h4>
              <p class="text-sm mt-1" :class="getMessageClasses(notification.type)">
                {{ notification.message }}
              </p>
              <div v-if="notification.actions && notification.actions.length > 0" class="mt-3 flex space-x-2">
                <button
                  v-for="action in notification.actions"
                  :key="action.label"
                  @click="handleAction(action, notification.id)"
                  class="text-xs font-medium px-2 py-1 rounded transition-colors"
                  :class="getActionClasses(notification.type)"
                >
                  {{ action.label }}
                </button>
              </div>
            </div>
            <div class="ml-4 flex-shrink-0">
              <button
                @click="removeNotification(notification.id)"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Progress bar for auto-dismiss -->
          <div
            v-if="notification.duration && notification.duration > 0"
            class="mt-2 w-full bg-gray-200 rounded-full h-1"
          >
            <div
              class="h-1 rounded-full transition-all ease-linear"
              :class="getProgressClasses(notification.type)"
              :style="{ 
                width: '100%',
                animation: `shrink ${notification.duration}ms linear forwards`
              }"
            ></div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { notifications, removeNotification } = useErrorHandler()

// Icon components
const ErrorIcon = () => h('svg', {
  class: 'w-5 h-5',
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24'
}, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  })
])

const WarningIcon = () => h('svg', {
  class: 'w-5 h-5',
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24'
}, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
  })
])

const InfoIcon = () => h('svg', {
  class: 'w-5 h-5',
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24'
}, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  })
])

const SuccessIcon = () => h('svg', {
  class: 'w-5 h-5',
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24'
}, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  })
])

const getIcon = (type: string) => {
  switch (type) {
    case 'error':
      return ErrorIcon
    case 'warning':
      return WarningIcon
    case 'info':
      return InfoIcon
    case 'success':
      return SuccessIcon
    default:
      return InfoIcon
  }
}

const getNotificationClasses = (type: string) => {
  switch (type) {
    case 'error':
      return 'bg-red-50 border-red-400 text-red-800'
    case 'warning':
      return 'bg-yellow-50 border-yellow-400 text-yellow-800'
    case 'info':
      return 'bg-blue-50 border-blue-400 text-blue-800'
    case 'success':
      return 'bg-green-50 border-green-400 text-green-800'
    default:
      return 'bg-gray-50 border-gray-400 text-gray-800'
  }
}

const getTitleClasses = (type: string) => {
  switch (type) {
    case 'error':
      return 'text-red-800'
    case 'warning':
      return 'text-yellow-800'
    case 'info':
      return 'text-blue-800'
    case 'success':
      return 'text-green-800'
    default:
      return 'text-gray-800'
  }
}

const getMessageClasses = (type: string) => {
  switch (type) {
    case 'error':
      return 'text-red-700'
    case 'warning':
      return 'text-yellow-700'
    case 'info':
      return 'text-blue-700'
    case 'success':
      return 'text-green-700'
    default:
      return 'text-gray-700'
  }
}

const getActionClasses = (type: string) => {
  switch (type) {
    case 'error':
      return 'bg-red-100 hover:bg-red-200 text-red-800'
    case 'warning':
      return 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800'
    case 'info':
      return 'bg-blue-100 hover:bg-blue-200 text-blue-800'
    case 'success':
      return 'bg-green-100 hover:bg-green-200 text-green-800'
    default:
      return 'bg-gray-100 hover:bg-gray-200 text-gray-800'
  }
}

const getProgressClasses = (type: string) => {
  switch (type) {
    case 'error':
      return 'bg-red-400'
    case 'warning':
      return 'bg-yellow-400'
    case 'info':
      return 'bg-blue-400'
    case 'success':
      return 'bg-green-400'
    default:
      return 'bg-gray-400'
  }
}

const handleAction = (action: { label: string; action: () => void }, notificationId: string) => {
  action.action()
  removeNotification(notificationId)
}
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.notification-move {
  transition: transform 0.3s ease;
}

@keyframes shrink {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

.notification-card {
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.95);
}
</style>