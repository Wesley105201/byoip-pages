# NB 优选服务 - 配置文档

## 📋 目录

- [快速开始](#快速开始)
- [配置文件说明](#配置文件说明)
- [页面配置](#页面配置)
- [自定义主题](#自定义主题)
- [部署指南](#部署指南)
- [常见问题](#常见问题)

## 🎨 页面配置

### 首页配置

首页显示所有 CDN 优选服务，通过 `services.json` 配置。

#### 自定义页面标题和描述

在 `pages/index.vue` 中修改：

```vue
<script setup lang="ts">
useHead({
  title: '您的自定义标题',
  meta: [
    {
      name: 'description',
      content: '您的自定义描述'
    }
  ]
})
</script>
```

#### 自定义页面内容

修改页面头部信息：

```vue
<template>
  <div class="text-center mb-12">
    <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
      您的自定义标题
    </h1>
    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
      您的自定义描述
    </p>
  </div>
</template>
```

#### 自定义赞助方式

在 `pages/sponsor.vue` 中修改赞助方式图片：

```vue
<template>
  <!-- 支付宝 -->
  <img 
    src="您的支付宝收款码链接" 
    alt="支付宝收款码"
    class="w-48 h-48 mx-auto object-contain"
  />
  
  <!-- 爱发电 -->
  <img 
    src="您的爱发电链接" 
    alt="爱发电赞助"
    class="w-48 h-48 mx-auto object-contain"
  />
</template>
```

## 🎨 自定义主题

### 字体配置

项目使用自定义字体，在 `nuxt.config.ts` 中配置：

```typescript
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        // 预加载字体
        { 
          rel: 'preload', 
          href: '您的字体链接', 
          as: 'font', 
          type: 'font/woff2', 
          crossorigin: 'anonymous' 
        }
      ]
    }
  }
})
```

### 样式自定义

主要样式文件位于 `assets/css/main.css`：

```css
/* 自定义颜色 */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #10b981;
  --accent-color: #f59e0b;
}

/* 自定义字体 */
.font-chinese {
  font-family: 'xiaolai', 'PingFang SC', sans-serif;
}

.font-english {
  font-family: 'Cascadia Code', 'SF Mono', monospace;
}
```

### Tailwind CSS 配置

项目使用简化的 Tailwind CDN 配置。如需自定义，可在页面中添加配置：

```html
<script>
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#10b981'
      }
    }
  }
}
</script>
```

或在组件中使用内联样式类。

## 🚀 部署指南

### 静态站点部署 (推荐)

```bash
# 生成静态文件
npm run generate

# 部署 .output/public 目录到您的静态托管服务
```

#### 支持的静态托管平台

- **Vercel**: 零配置部署
- **Netlify**: 拖拽部署
- **GitHub Pages**: 免费托管
- **EdgeOne Pages**: 免费托管
- **Cloudflare Pages**: 全球 CDN

### Vercel 部署

1. 连接 GitHub 仓库
2. 设置构建命令：`npm run generate`
3. 设置输出目录：`.output/public`
4. 点击部署

### Netlify 部署

1. 连接 GitHub 仓库
2. 设置构建命令：`npm run generate`
3. 设置发布目录：`.output/public`
4. 点击部署

### 自定义服务器部署

```bash
# 构建应用
npm run build

# 启动服务器
node .output/server/index.mjs
```

### SEO 优化

#### 全局 SEO 配置

```typescript
export default defineNuxtConfig({
  app: {
    head: {
      title: 'NB 优选服务',
      meta: [
        { name: 'description', content: '全球主流 CDN 服务商 IP 优选服务' },
        { name: 'keywords', content: 'CDN,IP优选,CloudFlare,网络优化' },
        { property: 'og:title', content: 'NB 优选服务' },
        { property: 'og:description', content: '全球主流 CDN 服务商 IP 优选服务' },
        { property: 'og:image', content: '/og-image.png' }
      ]
    }
  }
})
```

#### 页面级 SEO

在每个页面中使用 `useHead`：

```vue
<script setup lang="ts">
useHead({
  title: '页面标题',
  meta: [
    { name: 'description', content: '页面描述' }
  ]
})
</script>
```

## ❓ 常见问题

### Q: 如何添加新的 CDN 服务？

A: 在 `public/config/services.json` 中添加新的服务配置：

```json
{
  "id": "new-cdn",
  "name": "新 CDN 服务",
  "description": "新 CDN 服务描述",
  "status": "active",
  "category": "cdn",
  "optimizedIPs": ["1.2.3.4", "5.6.7.8"]
}
```

### Q: 如何修改网站标题和描述？

A: 修改 `nuxt.config.ts` 中的 `app.head` 配置，或在具体页面中使用 `useHead` 函数。

### Q: 如何更换字体？

A: 修改 `nuxt.config.ts` 中的字体链接和 Tailwind 配置，然后更新 CSS 类名。

### Q: 如何添加新页面？

A: 在 `pages/` 目录下创建新的 `.vue` 文件，Nuxt 会自动生成路由。

### Q: 配置文件不生效怎么办？

A: 检查 JSON 格式是否正确，确保文件路径正确，重启开发服务器。

### Q: 如何自定义样式？

A: 修改 `assets/css/main.css` 文件，或在组件中使用 `<style>` 标签。

### Q: 部署后页面空白怎么办？

A: 检查构建输出，确保使用正确的构建命令和输出目录。