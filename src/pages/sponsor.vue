<template>
    <!-- 赞助区域 -->
    <div class="bg-gray-50 py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h1 class="card-title text-4xl mb-6 text-center">赞助支持</h1>
          <p class="card-description text-xl max-w-3xl mx-auto mb-8 text-gray-600 text-center">
            感谢所有赞助商对 NB 优选服务项目的大力支持，您的支持是我们持续改进和发展的动力
          </p>
          <h2 class="text-3xl font-bold text-center mb-8 font-cascadia text-green-600">
            支持我们
          </h2>
          <div class="bg-green-50 border border-green-200 rounded-lg p-8">
            <p class="text-center text-green-800 mb-8 text-lg">
              如果您觉得我们的服务对您有帮助，欢迎通过以下方式支持我们的项目发展
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- 支付宝 -->
              <div class="text-center">
                <h3 class="text-xl font-semibold mb-4 text-green-700">支付宝</h3>
                <div class="bg-white rounded-lg p-6 shadow-sm">
                  <img 
                    src="https://cdn.mfawa.top/image/icon/byoip-alipay.png" 
                    alt="支付宝收款码"
                    class="w-80 h-80 mx-auto object-contain cursor-pointer hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                    @click="openImageModal('https://cdn.mfawa.top/image/icon/byoip-alipay.png', '支付宝收款码')"
                  />
                  <p class="text-sm text-gray-600 mt-2">点击图片放大查看</p>
                </div>
              </div>
              
              <!-- 微信 -->
              <div class="text-center">
                <h3 class="text-xl font-semibold mb-4 text-green-700">微信</h3>
                <div class="bg-white rounded-lg p-6 shadow-sm">
                  <img 
                    src="https://cdn.mfawa.top/image/icon/byoip-wechat.png" 
                    alt="微信赞助"
                    class="w-80 h-80 mx-auto object-contain cursor-pointer hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                    @click="openImageModal('https://cdn.mfawa.top/image/icon/byoip-wechat.png', '微信赞助')"
                  />
                  <p class="text-sm text-gray-600 mt-2">点击图片放大查看</p>
                </div>
              </div>
            </div>
            <p class="text-center text-green-700 text-lg mt-6">
              您的每一份支持都是我们前进的动力 ❤️
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <div class="text-center mb-12">
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
          <h3 class="text-lg font-semibold text-blue-800 mb-2">成为赞助商</h3>
          <p class="text-blue-700 text-sm">
            如果您希望支持我们的项目发展，欢迎联系我们了解赞助详情
          </p>
        </div>
      </div>

      <!-- 错误状态 -->
      <div v-if="error" class="text-center py-12">
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <svg class="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 class="text-lg font-medium text-red-800 mb-2">赞助商信息加载失败</h3>
          <p class="text-sm text-red-600 mb-4">无法加载赞助商信息</p>
          <button @click="refresh" 
                  class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors">
            重试
          </button>
        </div>
      </div>

      <div v-if="sponsors && sponsors.length > 0">
        <h2 class="text-2xl font-bold text-center mb-8 font-cascadia text-blue-600">
          赞助商列表
        </h2>
        
        <div class="max-w-4xl mx-auto space-y-4">
          <div 
            v-for="sponsor in sponsors" 
            :key="sponsor.id"
            class="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200 p-4"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <ImageLoader
                  :src="sponsor.logo"
                  :alt="`${sponsor.name} logo`"
                  :fallback-text="sponsor.name"
                  container-class="h-12 w-16 flex-shrink-0"
                  image-class="h-12 w-auto object-contain"
                />
                <div>
                  <h3 class="text-lg font-semibold font-cascadia">{{ sponsor.name }}</h3>
                  <p class="text-gray-600 text-sm">{{ sponsor.description }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <span v-if="sponsor.amount" class="text-green-600 font-semibold">
                  {{ sponsor.amount }}
                </span>
                <a 
                  :href="sponsor.website"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                  访问
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="h-16"></div>

      </div>

      <!-- 空状态 -->
      <div v-else class="text-center py-12">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M9 21h6a2 2 0 002-2V9a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
        <h3 class="text-lg font-semibold text-gray-600 mb-2">暂无赞助商信息</h3>
        <p class="text-gray-500">请稍后再试或联系管理员</p>
      </div>
    </div>

    <div 
      v-if="showModal" 
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      @click="closeImageModal"
    >
      <div class="relative p-4">
        <button 
          @click="closeImageModal"
          class="absolute -top-2 -right-2 bg-white text-black hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold z-10 shadow-lg"
        >
          ×
        </button>
        <div class="bg-white rounded-lg p-4 shadow-2xl">
          <img :src="modalImage.src" :alt="modalImage.alt" class="w-[600px] h-[600px] object-contain"/>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
// 使用构建时注入的配置
const sponsorsConfig = useSponsors()
const sponsors = computed(() => sponsorsConfig.value?.sponsors || [])
const error = ref(null)
const refresh = () => window.location.reload()
const showModal = ref(false)
const modalImage = ref({ src: '', alt: '' })
const openImageModal = (src: string, alt: string) => {
  modalImage.value = { src, alt }
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

const closeImageModal = () => {
  showModal.value = false
  modalImage.value = { src: '', alt: '' }
  document.body.style.overflow = 'auto'
}

onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && showModal.value) {
      closeImageModal()
    }
  }
  document.addEventListener('keydown', handleEscape)
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
    document.body.style.overflow = 'auto'
  })
})

// 设置页面head
useHead({
  title: '赞助支持 - NB 优选服务',
  meta: [
    { name: 'description', content: '感谢所有赞助商对 NB 优选服务项目的大力支持，您的支持是我们持续改进和发展的动力' }
  ]
})
</script>