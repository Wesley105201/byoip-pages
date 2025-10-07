# NB 优选服务

<div align="center">

![NB 优选服务](https://img.shields.io/badge/CDN-IP%20优选-blue?style=for-the-badge)
![Nuxt 3](https://img.shields.io/badge/Nuxt-3-00DC82?style=for-the-badge&logo=nuxt.js)
![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?style=for-the-badge&logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript)

提供 CloudFlare、EdgeOne、Vercel、Netlify 等全球主流云服务商的 CDN IP 优选、节点状态监测服务

[在线演示](https://www.byoip.top) · [使用文档](./docs/docs.md) · [配置教程](./docs/config.md)

</div>

## ✨ 特性

- 🚀 **现代化技术栈** - 基于 Nuxt 3 + Vue 3 + TypeScript
- 📱 **响应式设计** - 完美适配桌面端和移动端
- ⚡ **极致性能** - 轻量化设计，快速加载
- 🎨 **简洁界面** - 清晰直观的用户界面
- 🔧 **灵活配置** - JSON 配置文件，易于维护

## 🚀 快速开始

### 环境要求

- Node.js 18+ 
- pnpm 或 yarn 或 npm

### 安装

```bash
# 克隆项目
git clone https://github.com/FrecklyComb1728/byoip-pages
cd byoip-pages

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

访问 `http://localhost:3000` 查看效果

### 构建部署

```bash
# 构建生产版本
pnpm build
pnpm ssr

# 生成静态站点 (推荐)
pnpm generate
pnpm ssg

# 预览构建结果
pnpm preview
```

## 📁 项目结构

```
cdn-ip-optimizer/
├── 📁 assets/              # 静态资源
│   └── css/                # 样式文件
├── 📁 components/          # Vue 组件
│   ├── DomainCard.vue      # 域名卡片组件
│   ├── Navigation.vue      # 导航组件
│   └── ...                 # 其他组件
├── 📁 composables/         # 组合式函数
│   ├── useConfig.ts        # 配置管理
│   ├── useCDN.ts          # CDN 管理
│   └── ...                 # 其他工具函数
├── 📁 pages/               # 页面文件
│   ├── index.vue           # 首页
│   ├── partners.vue        # 合作伙伴页
│   └── sponsor.vue         # 赞助页面
├── 📁 public/              # 公共文件
│   └── config/             # 配置文件
│       ├── services.json   # 服务配置
│       ├── partners.json   # 合作伙伴配置
│       ├── sponsors.json   # 赞助商配置
│       └── cdn.json        # CDN 配置
├── 📁 types/               # TypeScript 类型
├── 📁 docs/                # 文档
└── 📄 nuxt.config.ts       # Nuxt 配置
```

## ⚙️ 配置说明

网站内容通过 JSON 配置文件管理，支持热更新。详细配置说明请参考：

📖 **[完整配置文档](./docs/docs.md)** | 📝 **[配置教程](./docs/config.md)**

### 快速配置

| 配置文件 | 说明 | 示例 |
|---------|------|------|
| `services.json` | CDN 优选服务配置 | 服务名称、状态、优选 IP 等 |
| `partners.json` | 技术合作伙伴配置 | 合作伙伴信息、链接等 |
| `sponsors.json` | 赞助商配置 | 赞助商信息、金额等 |
| `cdn.json` | CDN 镜像源配置 | GitHub、npm 镜像源等 |



## 许可证

本项目采用 [Unlicense license 许可证](LICENSE)

## 赞助支持

如果这个项目对您有帮助，欢迎赞助支持：

- [爱发电](https://afdian.com/a/iambees)
- [支付宝](https://cdn.mfawa.top/image/alipay.png)

## 联系我们

- 邮箱：me@imbee.top
- QQ: 3979158171


特别感谢：
- [Nuxt.js](https://nuxt.com/) - 优秀的 Vue.js 框架
- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架

---

<div align="center">

**[⭐ 给个 Star](https://github.com/FrecklyComb1728/byoip-pages) | [🐛 报告问题](https://github.com/FrecklyComb1728/byoip-pages/issues) | [💡 功能建议](https://github.com/FrecklyComb1728/byoip-pages/issues)**

</div>