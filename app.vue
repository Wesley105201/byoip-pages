<template>
  <div class="min-h-screen bg-white text-gray-900">
    <!-- Navigation Component -->
    <Navigation />
    
    <!-- Main Content Area -->
    <main class="pb-24"> <!-- 添加底部内边距，防止内容被固定页脚遮挡 -->
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
// 设置基本head
useHead({
  htmlAttrs: {
    lang: 'zh-CN'
  },
  bodyAttrs: {
    class: 'font-sans'
  }
})

console.log('App loaded')
</script>

<style>
/* 全局样式 */
body {
  font-family: 'Cascadia Code', monospace, system-ui, sans-serif;
}
</style>