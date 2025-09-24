<template>
  <div class="min-h-screen bg-white text-gray-900">
    <Navigation />
      <NuxtPage />
    <Footer />
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