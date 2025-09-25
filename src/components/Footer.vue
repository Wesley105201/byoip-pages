<template>
  <footer
    class="bg-gray-50 text-gray-1000 border-t border-gray-200 py-6 md:py-5 transition-all duration-300 fixed bottom-0 left-0 right-0 z-10 bg-opacity-90 backdrop-blur-sm"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
        <!-- 版权信息 -->
        <p class="text-sm md:text-base">
          Copyright &copy; {{ currentYear }} NB 优选服务
        </p>
        <!-- 导航链接（可选） -->
        <nav>
          <!-- 这部分由copilot修改 -->
          <!-- <NuxtLink v-for="link in footerLinks" :key="link.href" :to="link.href" class="text-sm hover:text-blue-600 transition-colors duration-200">
            {{ link.label }}
          </NuxtLink> -->
          <span class="inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              class="inline-block mr-1 align-middle"
            >
              <path
                fill="currentColor"
                d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
              />
            </svg>
            GitHub：
            <a
              href="https://github.com/FrecklyComb1728/byoip-pages"
              class="text-blue-600 hover:text-blue-800"
            >
              byoip-pages
            </a>
            &nbsp;&nbsp;&nbsp;
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 168' width='25' height='25' class='inline-block mr-1 align-middle' aria-hidden='true' focusable='false'>
              <path fill='%2300DC82' d='M143.618 167.029h95.166c3.023 0 5.992-.771 8.61-2.237a16.963 16.963 0 0 0 6.302-6.115 16.324 16.324 0 0 0 2.304-8.352c0-2.932-.799-5.811-2.312-8.35L189.778 34.6a16.966 16.966 0 0 0-6.301-6.113 17.626 17.626 0 0 0-8.608-2.238c-3.023 0-5.991.772-8.609 2.238a16.964 16.964 0 0 0-6.3 6.113l-16.342 27.473-31.95-53.724a16.973 16.973 0 0 0-6.304-6.112A17.638 17.638 0 0 0 96.754 0c-3.022 0-5.992.772-8.61 2.237a16.973 16.973 0 0 0-6.303 6.112L2.31 141.975A16.302 16.302 0 0 0 0 150.325c0 2.932.793 5.813 2.304 8.352a16.964 16.964 0 0 0 6.302 6.115 17.628 17.628 0 0 0 8.61 2.237h59.737c23.669 0 41.123-10.084 53.134-29.758l29.159-48.983 15.618-26.215 46.874 78.742h-62.492l-15.628 26.214Zm-67.64-26.24-41.688-.01L96.782 35.796l31.181 52.492-20.877 35.084c-7.976 12.765-17.037 17.416-31.107 17.416Z'/>
            </svg>
            <a href="https://nuxt.com" class="text-blue-600">Nuxt</a>
          </span>
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