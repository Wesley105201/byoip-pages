# CDN IP 优选服务 - 配置文档

## 📋 目录

- [快速开始](#快速开始)
- [配置文件说明](#配置文件说明)
- [页面配置](#页面配置)
- [自定义主题](#自定义主题)
- [部署指南](#部署指南)
- [常见问题](#常见问题)

## 🚀 快速开始

### 环境准备

确保您的开发环境满足以下要求：

```bash
Node.js >= 18.0.0
npm >= 8.0.0
```

### 安装依赖

```bash
# 使用 npm
npm install

# 使用 yarn
yarn install

# 使用 pnpm
pnpm install
```

### 开发模式

```bash
# 启动开发服务器
npm run dev

# 访问地址
http://localhost:3000
```

### 生产构建

```bash
# 构建 SPA 应用
npm run build

# 生成静态站点 (推荐)
npm run generate

# 预览构建结果
npm run preview
```

## ⚙️ 配置文件说明

所有配置文件位于 `public/config/` 目录下，采用 JSON 格式，支持热更新。

### 1. 服务配置 (`services.json`)

配置 CDN 优选服务的基本信息：

```json
{
  "services": [
    {
      "id": "cloudflare",
      "name": "CloudFlare CDN",
      "description": "全球最大的 CDN 服务商之一",
      "status": "active",
      "category": "cdn",
      "optimizedIPs": [
        "104.16.132.229",
        "104.16.133.229"
      ],
      "testUrl": "https://cloudflare.com",
      "documentation": "https://developers.cloudflare.com/",
      "lastUpdated": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 服务唯一标识符 |
| `name` | string | ✅ | 服务显示名称 |
| `description` | string | ✅ | 服务描述 |
| `status` | string | ✅ | 服务状态：`active`、`maintenance`、`inactive` |
| `category` | string | ✅ | 服务分类：`cdn`、`dns`、`security` |
| `optimizedIPs` | array | ✅ | 优选 IP 地址列表 |
| `testUrl` | string | ❌ | 测试链接 |
| `documentation` | string | ❌ | 文档链接 |
| `lastUpdated` | string | ❌ | 最后更新时间 (ISO 8601 格式) |

### 2. 合作伙伴配置 (`partners.json`)

配置技术合作伙伴信息：

```json
{
  "partners": [
    {
      "id": "partner-1",
      "name": "技术合作伙伴",
      "logo": "https://example.com/logo.png",
      "description": "提供技术支持和咨询服务",
      "website": "https://example.com",
      "type": "platinum",
      "services": ["技术咨询", "系统集成"],
      "contactEmail": "contact@example.com"
    }
  ]
}
```

#### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 合作伙伴唯一标识符 |
| `name` | string | ✅ | 合作伙伴名称 |
| `logo` | string | ✅ | Logo 图片链接 |
| `description` | string | ✅ | 合作伙伴描述 |
| `website` | string | ✅ | 官方网站链接 |
| `type` | string | ✅ | 合作伙伴类型：`platinum`、`gold`、`silver`、`bronze` |
| `services` | array | ❌ | 提供的服务列表 |
| `contactEmail` | string | ❌ | 联系邮箱 |

### 3. 赞助商配置 (`sponsors.json`)

配置赞助商信息（已简化为统一列表）：

```json
{
  "sponsors": [
    {
      "id": "sponsor-1",
      "name": "赞助商名称",
      "logo": "https://example.com/logo.png",
      "description": "感谢对项目的支持",
      "website": "https://example.com",
      "amount": "¥500"
    }
  ]
}
```

#### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 赞助商唯一标识符 |
| `name` | string | ✅ | 赞助商名称 |
| `logo` | string | ✅ | Logo 图片链接 |
| `description` | string | ✅ | 赞助商描述 |
| `website` | string | ✅ | 官方网站链接 |
| `amount` | string | ❌ | 赞助金额 |

### 4. CDN 配置 (`cdn.json`)

配置 CDN 镜像源：

```json
{
  "github": {
    "template": "https://{{mirror}}/gh/{{owner}}/{{repo}}@{{branch}}/{{path}}",
    "mirror": "fastly.jsdelivr.net"
  },
  "npm": {
    "template": "https://{{mirror}}/npm/{{package}}@{{version}}/{{path}}",
    "mirror": "fastly.jsdelivr.net"
  },
  "alternatives": {
    "mirrors": [
      "fastly.jsdelivr.net",
      "cdn.jsdelivr.net",
      "unpkg.com"
    ]
  }
}
```

#### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `github.template` | string | ✅ | GitHub CDN 模板 |
| `github.mirror` | string | ✅ | 当前使用的 GitHub 镜像 |
| `npm.template` | string | ✅ | npm CDN 模板 |
| `npm.mirror` | string | ✅ | 当前使用的 npm 镜像 |
| `alternatives.mirrors` | array | ❌ | 备用镜像列表 |

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

### 合作伙伴页面

通过 `partners.json` 配置合作伙伴信息。页面会自动按照合作伙伴类型分组显示。

### 赞助页面

通过 `sponsors.json` 配置赞助商信息。页面采用统一列表形式显示所有赞助商。

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

## 🔧 高级配置

### 环境变量

创建 `.env` 文件：

```bash
# 基础 URL
BASE_URL=https://your-domain.com

# API 端点
API_ENDPOINT=https://api.your-domain.com

# CDN 配置
CDN_BASE_URL=https://cdn.your-domain.com
```

在 `nuxt.config.ts` 中使用：

```typescript
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'http://localhost:3000',
      apiEndpoint: process.env.API_ENDPOINT,
      cdnBaseUrl: process.env.CDN_BASE_URL
    }
  }
})
```

### 性能优化

#### 启用压缩

```typescript
export default defineNuxtConfig({
  nitro: {
    compressPublicAssets: true,
    minify: true
  }
})
```

#### 预渲染路由

```typescript
export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: ['/partners', '/sponsor']
    }
  }
})
```

### SEO 优化

#### 全局 SEO 配置

```typescript
export default defineNuxtConfig({
  app: {
    head: {
      title: 'CDN IP 优选服务',
      meta: [
        { name: 'description', content: '全球主流 CDN 服务商 IP 优选服务' },
        { name: 'keywords', content: 'CDN,IP优选,CloudFlare,网络优化' },
        { property: 'og:title', content: 'CDN IP 优选服务' },
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

## 📞 技术支持

如果您在使用过程中遇到问题，可以通过以下方式获取帮助：

- 📧 邮箱：support@example.com
- 💬 QQ群：123456789
- 🐛 [GitHub Issues](https://github.com/your-username/your-repo/issues)
- 📖 [在线文档](https://your-docs-url.com)

## 🔄 更新日志

### v1.2.0 (2024-01-15)
- ✨ 新增赞助页面统一列表展示
- 🔧 优化配置加载策略
- 🗑️ 删除调试信息显示
- 📱 改进移动端适配

### v1.1.0 (2024-01-10)
- ✨ 新增性能监控功能
- 🔧 优化 CDN 缓存策略
- 🌐 新增浏览器兼容性检测
- 📊 新增 Core Web Vitals 监控

### v1.0.0 (2024-01-01)
- 🎉 首次发布
- ✨ 基础功能实现
- 📱 响应式设计
- 🔧 JSON 配置系统

---

<div align="center">

**需要更多帮助？** [联系我们](mailto:support@example.com) | [查看示例](https://demo.example.com)

</div>