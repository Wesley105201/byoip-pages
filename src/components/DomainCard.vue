<template>
  <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
    <!-- 卡片头，包含服务名称和状态 -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-3">
        <div class="flex-shrink-0">
          <!-- 服务提供商图标/徽章 --> 
          <!-- 这里可以根据实际情况替换为具体的图标 -->
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
      
      <!-- 状态指示器 -->
      <div class="flex items-center space-x-2">
        <div class="flex items-center space-x-1">
          <div class="w-2 h-2 rounded-full" :class="getStatusColor(service.status)"></div>
          <span class="text-xs font-medium" :class="getStatusTextColor(service.status)">
            {{ getStatusText(service.status) }}
          </span>
        </div>
      </div>
    </div>

    <!-- 服务描述 -->
    <p class="text-gray-600 text-sm mb-4 font-chinese">{{ service.description }}</p>

    <!-- 节点状态和响应时间 -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-2">
        <div class="w-2 h-2 rounded-full" :class="getNodeStatusColor(service.nodeStatus)"></div>
        <span class="text-sm text-gray-600">节点状态: {{ getNodeStatusText(service.nodeStatus) }}</span>
      </div>
      <div v-if="service.responseTime" class="text-sm text-gray-600 font-cascadia">
        {{ service.responseTime }}ms
      </div>
    </div>

    <!-- 优选 IP 地址 -->
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

    <!-- 服务标签 -->
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

// 复制功能的响应式状态
// 用于跟踪当前已复制的 IP 地址
const copiedIP = ref<string | null>(null)

// 复制到剪贴板功能
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    copiedIP.value = text
    
    // 2秒后重置
    setTimeout(() => {
      copiedIP.value = null
    }, 2000)
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    // 在2秒后重置，旧版浏览器的备选方案
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

// 提供者颜色映射
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

// 提供者首字母
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

// 状态颜色映射
const getStatusColor = (status: string) => {
  const colors = {
    active: 'bg-green-500',
    inactive: 'bg-red-500',
    maintenance: 'bg-yellow-500'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-500'
}

// 状态文本颜色映射 
const getStatusTextColor = (status: string) => {
  const colors = {
    active: 'text-green-700',
    inactive: 'text-red-700',
    maintenance: 'text-yellow-700'
  }
  return colors[status as keyof typeof colors] || 'text-gray-700'
}

// 状态文本映射
const getStatusText = (status: string) => {
  const texts = {
    active: '正常',
    inactive: '离线',
    maintenance: '维护中'
  }
  return texts[status as keyof typeof texts] || '未知'
}

// 节点状态颜色映射
const getNodeStatusColor = (nodeStatus: string) => {
  const colors = {
    online: 'bg-green-500',
    offline: 'bg-red-500',
    slow: 'bg-yellow-500'
  }
  return colors[nodeStatus as keyof typeof colors] || 'bg-gray-500'
}

// 节点状态文本映射
const getNodeStatusText = (nodeStatus: string) => {
  const texts = {
    online: '在线',
    offline: '离线',
    slow: '缓慢'
  }
  return texts[nodeStatus as keyof typeof texts] || '未知'
}
</script>