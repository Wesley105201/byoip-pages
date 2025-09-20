<template>
  <div class="bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-300 overflow-hidden">
    <!-- Sponsor Level Badge (Top) -->
    <div class="px-4 pt-4 pb-2">
      <div class="flex justify-center">
        <span 
          class="inline-block px-3 py-1 text-xs font-semibold rounded-full"
          :class="getLevelStyles(sponsor.level || 'silver')"
        >
          {{ getLevelLabel(sponsor.level || 'silver') }}
        </span>
      </div>
    </div>
    
    <!-- Sponsor Logo -->
    <div class="px-6 pb-4">
      <div class="flex justify-center mb-4">
        <ImageLoader
          :src="sponsor.logo"
          :alt="`${sponsor.name} logo`"
          :fallback-text="sponsor.name"
          container-class="h-20 w-32"
          image-class="h-20 w-auto object-contain"
        />
      </div>
      
      <!-- Sponsor Name -->
      <h3 class="text-lg font-semibold text-center mb-2 font-cascadia">
        {{ sponsor.name }}
      </h3>
      
      <!-- Sponsor Description -->
      <p class="text-gray-600 text-sm text-center mb-3 leading-relaxed">
        {{ sponsor.description }}
      </p>
      
      <!-- Sponsor Amount -->
      <div v-if="sponsor.amount" class="text-center mb-4">
        <span class="text-lg font-bold text-green-600">
          {{ sponsor.amount }}
        </span>
      </div>
      
      <!-- Visit Website Button -->
      <div class="text-center">
        <a 
          :href="sponsor.website"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-md transition-colors duration-200"
          :class="getLevelButtonStyles(sponsor.level || 'silver')"
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
import type { SponsorConfig } from '~/types'

interface Props {
  sponsor: SponsorConfig
}

const props = defineProps<Props>()

// Image error handling is now managed by LazyImage component

// Get level-specific styling for badges
const getLevelStyles = (level: string) => {
  const styles = {
    diamond: 'bg-purple-100 text-purple-800 border border-purple-200',
    platinum: 'bg-blue-100 text-blue-800 border border-blue-200',
    gold: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    silver: 'bg-gray-100 text-gray-800 border border-gray-200'
  }
  return styles[level as keyof typeof styles] || styles.silver
}

// Get level-specific styling for buttons
const getLevelButtonStyles = (level: string) => {
  const styles = {
    diamond: 'bg-purple-600 hover:bg-purple-700',
    platinum: 'bg-blue-600 hover:bg-blue-700',
    gold: 'bg-yellow-600 hover:bg-yellow-700',
    silver: 'bg-gray-600 hover:bg-gray-700'
  }
  return styles[level as keyof typeof styles] || styles.silver
}
</script>