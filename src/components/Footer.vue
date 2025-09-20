<template>
  <footer
    class="bg-gray-50 text-gray-1000 border-t border-gray-200 py-6 md:py-5 transition-all duration-300 fixed bottom-0 left-0 right-0 z-10 bg-opacity-90 backdrop-blur-sm"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
        <!-- 版权信息 -->
        <p class="text-sm md:text-base">
          &copy; {{ currentYear }} NB 优选服务. 保留所有权利。
        </p>
        <!-- 导航链接（可选） -->
        <nav class="flex gap-6">
          <NuxtLink
            v-for="link in footerLinks"
            :key="link.href"
            :to="link.href"
            class="text-sm hover:text-blue-600 transition-colors duration-200"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()

const footerLinks = [

  { label: '首页', href: '/' },
  { label: '合作伙伴', href: '/partners' },
  { label: '赞助商', href: '/sponsor' },
  { label: '关于我们', href: '/about' },
  { label: '隐私政策', href: '/privacy' },
]
</script>