<template>
  <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
    <!-- Header with service name and status -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-3">
        <div class="flex-shrink-0">
          <!-- Provider icon/badge -->
          <div class="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
               :class="getProviderColor(service.provider)">
            {{ getProviderInitial(service.provider) }}
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900 font-cascadia">{{ service.name }}</h3>
          <p class="text-sm text-gray-500">{{ service.provider.toUpperCase() }}</p>
        </div>
      </div>
      
      <!-- Status indicator -->
      <div class="flex items-center space-x-2">
        <div class="flex items-center space-x-1">
          <div class="w-2 h-2 rounded-full" :class="getStatusColor(service.status)"></div>
          <span class="text-xs font-medium" :class="getStatusTextColor(service.status)">
            {{ getStatusText(service.status) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Description -->
    <p class="text-gray-600 text-sm mb-4 font-chinese">{{ service.description }}</p>

    <!-- Node status and response time -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-2">
        <div class="w-2 h-2 rounded-full" :class="getNodeStatusColor(service.nodeStatus)"></div>
        <span class="text-sm text-gray-600">节点状态: {{ getNodeStatusText(service.nodeStatus) }}</span>
      </div>
      <div v-if="service.responseTime" class="text-sm text-gray-600 font-cascadia">
        {{ service.responseTime }}ms
      </div>
    </div>

    <!-- Optimized IPs -->
    <div class="mb-4">
      <h4 class="text-sm font-medium text-gray-700 mb-2">优选 IP 地址:</h4>
      <div class="space-y-2">
        <div v-for="(ip, index) in service.optimizedIPs" :key="index" 
             class="flex items-center justify-between bg-gray-50 rounded px-3 py-2">
          <span class="text-sm font-mono text-gray-800 font-cascadia">{{ ip }}</span>
          <button @click="copyToClipboard(ip)" 
                  class="text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors"
                  :class="{ 'text-green-600': copiedIP === ip }">
            {{ copiedIP === ip ? '已复制' : '复制' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Tags -->
    <div v-if="service.tags && service.tags.length > 0" class="flex flex-wrap gap-2">
      <span v-for="tag in service.tags" :key="tag"
            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CDNServiceConfig } from '~/types'

interface Props {
  service: CDNServiceConfig
}

const props = defineProps<Props>()

// Reactive state for copy functionality
const copiedIP = ref<string | null>(null)

// Copy to clipboard functionality
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    copiedIP.value = text
    
    // Reset after 2 seconds
    setTimeout(() => {
      copiedIP.value = null
    }, 2000)
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    
    copiedIP.value = text
    setTimeout(() => {
      copiedIP.value = null
    }, 2000)
  }
}

// Provider color mapping
const getProviderColor = (provider: string) => {
  const colors = {
    cloudflare: 'bg-orange-500',
    cloudfront: 'bg-yellow-600',
    vercel: 'bg-purple-600',
    netlify: 'bg-green-600',
    edgeone: 'bg-blue-600',
    other: 'bg-gray-500'
  }
  return colors[provider as keyof typeof colors] || colors.other
}

// Provider initial letter
const getProviderInitial = (provider: string) => {
  const initials = {
    cloudflare: 'CF',
    cloudfront: 'CF',
    vercel: 'VC',
    netlify: 'NT',
    edgeone: 'EO',
    other: 'O'
  }
  return initials[provider as keyof typeof initials] || 'O'
}

// Status color mapping
const getStatusColor = (status: string) => {
  const colors = {
    active: 'bg-green-500',
    inactive: 'bg-red-500',
    maintenance: 'bg-yellow-500'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-500'
}

// Status text color mapping
const getStatusTextColor = (status: string) => {
  const colors = {
    active: 'text-green-700',
    inactive: 'text-red-700',
    maintenance: 'text-yellow-700'
  }
  return colors[status as keyof typeof colors] || 'text-gray-700'
}

// Status text mapping
const getStatusText = (status: string) => {
  const texts = {
    active: '正常',
    inactive: '离线',
    maintenance: '维护中'
  }
  return texts[status as keyof typeof texts] || '未知'
}

// Node status color mapping
const getNodeStatusColor = (nodeStatus: string) => {
  const colors = {
    online: 'bg-green-500',
    offline: 'bg-red-500',
    slow: 'bg-yellow-500'
  }
  return colors[nodeStatus as keyof typeof colors] || 'bg-gray-500'
}

// Node status text mapping
const getNodeStatusText = (nodeStatus: string) => {
  const texts = {
    online: '在线',
    offline: '离线',
    slow: '缓慢'
  }
  return texts[nodeStatus as keyof typeof texts] || '未知'
}
</script>