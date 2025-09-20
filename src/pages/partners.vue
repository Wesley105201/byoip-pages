<template>
  <div>
    <!-- 导航 -->
    <Navigation />
    
    <div class="container mx-auto px-4 py-8">
      <!-- 头部区域 -->
      <div class="text-center mb-12">
        <h1 class="card-title text-4xl mb-6">技术合作伙伴</h1>
        <p class="card-description text-xl max-w-3xl mx-auto mb-8 text-gray-600">
          感谢我们的技术合伙人在 NB 优选服务发展过程中提供的专业技术支持和宝贵建议
        </p>
      </div>

      <!-- 错误状态 -->
      <div v-if="error" class="text-center py-12">
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <svg class="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 class="text-lg font-medium text-red-800 mb-2">合伙人信息加载失败</h3>
          <p class="text-sm text-red-600 mb-4">无法加载合伙人信息</p>
          <button @click="refresh" 
                  class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors">
            重试
          </button>
        </div>
      </div>

      <!-- 合作伙伴列表 -->
      <div v-if="partners && partners.length > 0" class="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
        <PartnerCard 
          v-for="partner in partners" 
          :key="partner.id"
          :partner="partner"
          class="w-full sm:w-80 md:w-96"
        />  
      </div>

      <!-- 空状态 -->
      <div v-else class="text-center py-12">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        <h3 class="text-lg font-semibold text-gray-600 mb-2">暂无合伙人信息</h3>
        <p class="text-gray-500">请稍后再试或联系管理员</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 使用构建时注入的合作伙伴配置
const partnersConfig = usePartners()
const partners = computed(() => partnersConfig.value?.partners || [])
const error = ref(null)
const refresh = () => window.location.reload()



// Set page head
useHead({
  title: '技术合伙人 - NB 优选服务',
  meta: [
    { name: 'description', content: '感谢我们的技术合伙人在 NB 优选服务发展过程中提供的专业技术支持和宝贵建议' }
  ]
})
</script>