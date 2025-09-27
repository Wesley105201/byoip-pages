# NB 优选服务 - 配置教程

## 📋 目录

- [配置文件概述](#配置文件概述)
- [配置文件详解](#配置文件详解)
  - [服务配置 (services.json)](#服务配置-servicesjson)
  - [合作伙伴配置 (partners.json)](#合作伙伴配置-partnersjson)
  - [赞助商配置 (sponsors.json)](#赞助商配置-sponsorsjson)
  - [CDN 配置 (cdn.json)](#cdn-配置-cdnjson)
- [配置文件验证](#配置文件验证)
- [配置热更新](#配置热更新)
- [最佳实践](#最佳实践)

## 配置文件概述

本项目采用 JSON 格式的配置文件来管理网站内容和功能，所有配置文件位于 `config/` 目录下。配置文件在构建时被嵌入到应用中，支持通过修改配置文件快速更新网站内容。

主要配置文件包括：

| 配置文件 | 说明 | 用途 |
|---------|------|------|
| `services.json` | 服务配置 | 定义 CDN IP 优选服务的基本信息 |
| `partners.json` | 合作伙伴配置 | 管理合作伙伴信息展示 |
| `sponsors.json` | 赞助商配置 | 管理赞助商信息展示 |
| `cdn.json` | CDN 配置 | 配置 CDN 镜像和资源加载策略 |
| `performance.json` | 性能配置 | 控制网站性能优化和监控策略 |

## 配置文件详解

### 服务配置 (services.json)

`services.json` 用于配置 CDN IP 优选服务的基本信息，包括服务名称、描述、状态、优选 IP 等。

#### 示例配置

```json
{
  "services": [
    {
      "id": "cloudflare-1",
      "name": "CloudFlare 优选",
      "provider": "cloudflare",
      "description": "CloudFlare CDN IP 优选服务，提供全球加速",
      "status": "active",
      "optimizedIPs": ["*.cloudflare.byoip.top", "*.cloudflare.cnae.top"],
      "nodeStatus": "online",
      "responseTime": 70,
      "tags": ["全球加速", "高可用"]
    }
  ]
}
```

#### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 服务唯一标识符 |
| `name` | string | ✅ | 服务显示名称 |
| `provider` | string | ✅ | 服务提供商：`cloudflare`、`netlify`、`vercel` 等 |
| `description` | string | ✅ | 服务描述 |
| `status` | string | ✅ | 服务状态：`active`、`inactive`、`maintenance` |
| `optimizedIPs` | array | ✅ | 优选 IP 或域名列表 |
| `nodeStatus` | string | ✅ | 节点状态：`online`、`offline`、`degraded` |
| `responseTime` | number | ✅ | 响应时间（毫秒） |
| `tags` | array | ✅ | 服务标签 |

### 合作伙伴配置 (partners.json)

`partners.json` 用于管理合作伙伴信息，这些信息将在合作伙伴页面展示。

#### 示例配置

```json
{
  "partners": [
    {
      "id": "partner-1",
      "name": "fishcpy",
      "logo": "https://www.fis.ink/img/logo_c.png",
      "description": "cloudflare 优选维护者",
      "website": "https://www.fis.ink"
    }
  ]
}
```

#### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 合作伙伴唯一标识符 |
| `name` | string | ✅ | 合作伙伴名称 |
| `logo` | string | ✅ | 合作伙伴 logo URL |
| `description` | string | ✅ | 合作伙伴描述 |
| `website` | string | ✅ | 合作伙伴网站 URL |

### 赞助商配置 (sponsors.json)

`sponsors.json` 用于管理赞助商信息，这些信息将在赞助商页面展示。

#### 示例配置

```json
{
  "sponsors": [
    {
      "id": "sponsor-1",
      "name": "蜜蜂QWQ",
      "logo": "https://cdn.mfawa.top/image/logo.svg",
      "description": "加油！",
      "website": "https://imbee.top",
      "amount": "¥0"
    }
  ]
}
```

#### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 赞助商唯一标识符 |
| `name` | string | ✅ | 赞助商名称 |
| `logo` | string | ✅ | 赞助商 logo URL |
| `description` | string | ✅ | 赞助商描述或留言 |
| `website` | string | ✅ | 赞助商网站 URL |
| `amount` | string | ✅ | 赞助金额 |

### CDN 配置 (cdn.json)

`cdn.json` 用于配置 CDN 镜像和资源加载策略，支持 GitHub 和 NPM 资源的 CDN 加速。

#### 示例配置

```json
{
  "github": {
    "template": "https://{{mirror}}/gh/{{owner}}/{{repo}}@{{branch}}/{{path}}",
    "mirror": "cdn.smartcis.cn"
  },
  "npm": {
    "template": "https://{{mirror}}/npm/{{package}}@{{version}}/{{path}}",
    "mirror": "cdn.smartcis.cn"
  },
  "alternatives": {
    "mirrors": [
      "fastly.jsdelivr.net",
      "gcore.jsdelivr.net",
      "cdn.jsdmirror.com",
      "cdn.smartcis.cn",
      "jsdelivr.topthink.com"
    ]
  }
}
```

#### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `github.template` | string | ✅ | GitHub 资源 URL 模板 |
| `github.mirror` | string | ✅ | GitHub 资源默认镜像 |
| `npm.template` | string | ✅ | NPM 资源 URL 模板 |
| `npm.mirror` | string | ✅ | NPM 资源默认镜像 |
| `alternatives.mirrors` | array | ✅ | 备选 CDN 镜像列表 |

### 性能配置 (performance.json)

`performance.json` 用于控制网站的性能优化和监控策略，包括预加载、懒加载、缓存、压缩等配置。

#### 示例配置

```json
{
  "optimization": {
    "preload": {
      "enabled": true,
      "routes": ["/", "/partners", "/sponsor"],
      "resources": [
        "https://fastly.jsdelivr.net/gh/FrecklyComb1728/blog@main/public/fonts/xiaolai.css",
        "https://fastly.jsdelivr.net/npm/@fontsource/cascadia-code@5.2.3/files/cascadia-code-latin-400-normal.woff2"
      ]
    },
    "lazyLoading": {
      "enabled": true,
      "threshold": "100px",
      "components": ["PartnerCard", "SponsorCard", "DomainCard"]
    },
    "caching": {
      "staticAssets": {
        "maxAge": 31536000,
        "immutable": true
      },
      "apiResponses": {
        "maxAge": 300,
        "staleWhileRevalidate": 86400
      },
      "fonts": {
        "maxAge": 31536000,
        "crossOrigin": "anonymous"
      }
    },
    "compression": {
      "enabled": true,
      "algorithms": ["gzip", "brotli"],
      "threshold": 1024
    }
  },
  "monitoring": {
    "coreWebVitals": {
      "enabled": true,
      "thresholds": {
        "fcp": 1800,
        "lcp": 2500,
        "cls": 0.1,
        "fid": 100
      }
    },
    "resourceTiming": {
      "enabled": true,
      "slowResourceThreshold": 1000
    },
    "longTasks": {
      "enabled": true,
      "threshold": 50
    }
  },
  "compatibility": {
    "polyfills": {
      "intersectionObserver": true,
      "fetch": true,
      "customProperties": true
    },
    "fallbacks": {
      "webp": "jpg",
      "avif": "webp",
      "modernFonts": "systemFonts"
    }
  }
}
```

#### 字段说明

**优化配置**

| 字段 | 类型 | 说明 |
|------|------|------|
| `optimization.preload.enabled` | boolean | 是否启用资源预加载 |
| `optimization.preload.routes` | array | 需要预加载的路由 |
| `optimization.preload.resources` | array | 需要预加载的资源 URL |
| `optimization.lazyLoading.enabled` | boolean | 是否启用懒加载 |
| `optimization.lazyLoading.threshold` | string | 懒加载触发阈值 |
| `optimization.lazyLoading.components` | array | 需要懒加载的组件 |
| `optimization.caching.staticAssets.maxAge` | number | 静态资源缓存时间（秒） |
| `optimization.caching.staticAssets.immutable` | boolean | 静态资源是否不可变 |
| `optimization.caching.apiResponses.maxAge` | number | API 响应缓存时间（秒） |
| `optimization.caching.apiResponses.staleWhileRevalidate` | number | 过期后仍可使用的时间（秒） |
| `optimization.caching.fonts.maxAge` | number | 字体缓存时间（秒） |
| `optimization.caching.fonts.crossOrigin` | string | 字体跨域策略 |
| `optimization.compression.enabled` | boolean | 是否启用压缩 |
| `optimization.compression.algorithms` | array | 压缩算法 |
| `optimization.compression.threshold` | number | 压缩阈值（字节） |

**监控配置**

| 字段 | 类型 | 说明 |
|------|------|------|
| `monitoring.coreWebVitals.enabled` | boolean | 是否启用核心网页指标监控 |
| `monitoring.coreWebVitals.thresholds.fcp` | number | 首次内容绘制阈值（毫秒） |
| `monitoring.coreWebVitals.thresholds.lcp` | number | 最大内容绘制阈值（毫秒） |
| `monitoring.coreWebVitals.thresholds.cls` | number | 累积布局偏移阈值 |
| `monitoring.coreWebVitals.thresholds.fid` | number | 首次输入延迟阈值（毫秒） |
| `monitoring.resourceTiming.enabled` | boolean | 是否启用资源计时监控 |
| `monitoring.resourceTiming.slowResourceThreshold` | number | 慢资源阈值（毫秒） |
| `monitoring.longTasks.enabled` | boolean | 是否启用长任务监控 |
| `monitoring.longTasks.threshold` | number | 长任务阈值（毫秒） |

**兼容性配置**

| 字段 | 类型 | 说明 |
|------|------|------|
| `compatibility.polyfills.intersectionObserver` | boolean | 是否加载 IntersectionObserver polyfill |
| `compatibility.polyfills.fetch` | boolean | 是否加载 Fetch API polyfill |
| `compatibility.polyfills.customProperties` | boolean | 是否加载 CSS 自定义属性 polyfill |
| `compatibility.fallbacks.webp` | string | WebP 图片格式的降级方案 |
| `compatibility.fallbacks.avif` | string | AVIF 图片格式的降级方案 |
| `compatibility.fallbacks.modernFonts` | string | 现代字体格式的降级方案 |

## 配置文件验证

本项目使用 JSON Schema 验证配置文件的格式和内容，确保配置文件符合预期的结构和数据类型。JSON Schema 文件位于 `config/schemas/` 目录下。

如果配置文件不符合 Schema 定义，应用将在构建时或运行时显示错误信息，帮助您快速定位和修复配置问题。

## 配置热更新

在开发模式下，修改配置文件后，应用将自动重新加载配置，无需重启开发服务器。这使得您可以快速预览配置更改的效果。

在生产环境中，配置文件在构建时被嵌入到应用中，如需更新配置，需要重新构建应用。

## 最佳实践

1. **保持配置文件的简洁性**：只包含必要的配置项，避免冗余配置。

2. **使用有意义的 ID**：为服务、合作伙伴和赞助商使用有意义的 ID，便于后续引用和管理。

3. **图片资源优化**：
   - 使用 CDN 托管图片资源
   - 优化图片大小和格式
   - 考虑使用 WebP 或 AVIF 等现代图片格式

4. **性能配置调优**：
   - 根据实际需求调整预加载和懒加载策略
   - 合理设置缓存时间
   - 监控性能指标，及时调整配置

5. **定期更新 CDN 配置**：
   - 定期检查 CDN 镜像的可用性
   - 更新备选镜像列表
   - 优化资源加载策略

6. **配置文件备份**：
   - 定期备份配置文件
   - 使用版本控制管理配置文件的变更
   - 记录重要配置更改的原因和效果