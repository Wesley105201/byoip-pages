<template>
  <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200 animate-pulse">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div>
          <div class="h-4 bg-gray-300 rounded w-24 mb-2"></div>
          <div class="h-3 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <div class="w-2 h-2 bg-gray-300 rounded-full"></div>
        <div class="h-3 bg-gray-300 rounded w-12"></div>
      </div>
    </div>

    <!-- 描述框架 -->
    <div class="space-y-2 mb-4">
      <div class="h-3 bg-gray-300 rounded w-full"></div>
      <div class="h-3 bg-gray-300 rounded w-3/4"></div>
    </div>

    <!-- 状态框架 -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-2">
        <div class="w-2 h-2 bg-gray-300 rounded-full"></div>
        <div class="h-3 bg-gray-300 rounded w-20"></div>
      </div>
      <div class="h-3 bg-gray-300 rounded w-12"></div>
    </div>

    <!-- 域名/ip 框架 -->
    <div class="mb-4">
      <div class="h-4 bg-gray-300 rounded w-20 mb-2"></div>
      <div class="space-y-2">
        <div v-for="i in 2" :key="i" class="flex items-center justify-between bg-gray-50 rounded px-3 py-2">
          <div class="h-3 bg-gray-300 rounded w-32"></div>
          <div class="h-3 bg-gray-300 rounded w-12"></div>
        </div>
      </div>
    </div>

    <!-- 标签框架 -->
    <div class="flex space-x-2">
      <div v-for="i in 2" :key="i" class="h-6 bg-gray-300 rounded-full w-16"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>