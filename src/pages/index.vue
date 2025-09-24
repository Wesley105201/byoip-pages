<template>
    <div class="container mx-auto px-4 py-8">
    
      <!-- 标题部分 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-cascadia">NB 优选服务</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto font-chinese">
          CloudFlare、Vercel、Netlify 等全球主流云服务商的 CDN IP 优选、节点状态监测服务
        </p>
        
        <!-- 提示 -->
        <div class="mt-8 mx-auto max-w-2xl">
          <div class="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 shadow-sm">
            <div class="flex items-center justify-center space-x-2 text-green-700">
              <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p :class="['font-mixed font-medium', textClasses]">
                {{ finalText }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 错误状态 -->
      <div v-if="errors.services" class="text-center py-12">
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <svg class="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 class="text-lg font-medium text-red-800 mb-2">配置加载失败</h3>
          <p class="text-sm text-red-600 mb-4">{{ errors.services }}</p>
          <button @click="reloadServices" 
                  class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors">
            重新加载
          </button>
        </div>
      </div>

      <!-- 服务网格 -->
      <div v-if="services?.services && services.services.length > 0" class="space-y-8">
        <!-- 服务状态 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-green-50 rounded-lg p-6 text-center">
            <div class="text-2xl font-bold text-green-600 font-cascadia">{{ activeServicesCount }}</div>
            <div class="text-sm text-green-700">正常服务</div>
          </div>
          <div class="bg-yellow-50 rounded-lg p-6 text-center">
            <div class="text-2xl font-bold text-yellow-600 font-cascadia">{{ maintenanceServicesCount }}</div>
            <div class="text-sm text-yellow-700">维护中</div>
          </div>
          <div class="bg-blue-50 rounded-lg p-6 text-center">
            <div class="text-2xl font-bold text-blue-600 font-cascadia">1000+</div>
            <div class="text-sm text-blue-700">优选 IP 总数</div>
          </div>
        </div>

        <!-- 服务列表 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="service in services.services" :key="service.id">
            <DomainCard :service="service" />
          </div>
        </div>
        <div class="h-5"></div>
      </div>

      <!-- 空状态 -->
      <div v-else class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">暂无服务配置</h3>
        <p class="mt-1 text-sm text-gray-500">请检查配置文件或联系管理员</p>
        <button @click="reloadServices" 
                class="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
          重新加载配置
        </button>
      </div>
    </div>
</template>

<script setup lang="ts">

// 使用响应式文本适配
const { finalText, textClasses } = useResponsiveText({
  zh: '本优选免费，你如果付费的你被骗了',
  en: 'This is the preferred free option. If you paid, you\'ve been scammed.'
}, {
  maxLength: 100,
  breakpoint: 768
})

const { services, isLoaded } = useStaticConfig() // 使用静态配置
const errors = ref({ services: null as string | null }) // 记录错误

// 检查配置是否加载
onMounted(() => {
  if (!isLoaded.value) {
    errors.value.services = '配置加载失败，请刷新页面重试'
  }
})



// 重新加载服务（刷新页面）
const reloadServices = () => {
  window.location.reload()
}

const activeServicesCount = computed(() => {
  return services.value?.services?.filter(service => service.status === 'active').length || 0
})

const maintenanceServicesCount = computed(() => {
  return services.value?.services?.filter(service => service.status === 'maintenance').length || 0
})

useHead({
  title: 'NB 优选服务 - 首页',
  meta: [
    {
      name: 'description',
      content: 'CloudFlare、Vercel、Netlify 等全球主流云服务商的 CDN IP 优选、节点状态监测服务'
    }
  ]
})

</script>