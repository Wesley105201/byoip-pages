<template>
  <div class="bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-300 overflow-hidden">
    <!-- 合作伙伴logo -->
    <div class="p-6 pb-4">
      <div class="flex justify-center mb-4">
        <ImageLoader
          :src="partner.logo"
          :alt="`${partner.name} logo`"
          :fallback-text="partner.name"
          container-class="h-16 w-24 flex items-center justify-center"
          image-class="max-h-full max-w-full object-contain"
        />
      </div>
      

      
      <!-- 合作伙伴名称 -->
      <h3 class="text-lg font-semibold text-center mb-2 font-cascadia">
        {{ partner.name }}
      </h3>
      
      <!-- 合作伙伴描述 -->
      <p class="text-gray-600 text-sm text-center mb-4 leading-relaxed">
        {{ partner.description }}
      </p>
      
      <!-- 访问网站按钮 -->
      <div class="text-center">
        <a 
          :href="partner.website"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
          访问网站
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PartnerConfig } from '~/types'

interface Props {
  partner: PartnerConfig
}

defineProps<Props>()
</script>