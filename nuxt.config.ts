import { readFileSync } from 'fs'
import { join } from 'path'

// 读取配置文件
const servicesConfig = JSON.parse(readFileSync(join(process.cwd(), 'config/services.json'), 'utf-8'))
const partnersConfig = JSON.parse(readFileSync(join(process.cwd(), 'config/partners.json'), 'utf-8'))
const sponsorsConfig = JSON.parse(readFileSync(join(process.cwd(), 'config/sponsors.json'), 'utf-8'))

// 嵌入配置
const embeddedConfig = {
  services: servicesConfig,
  partners: partnersConfig,
  sponsors: sponsorsConfig,
  cdn: {
    github: {
      template: "https://{{mirror}}/gh/{{owner}}/{{repo}}@{{branch}}/{{path}}",
      mirror: "cdn.jsdelivr.net"
    },
    npm: {
      template: "https://{{mirror}}/npm/{{package}}@{{version}}/{{path}}",
      mirror: "cdn.jsdelivr.net"
    }
  }
}

export default defineNuxtConfig({
  compatibilityDate: '2025-09-19',
  devtools: { enabled: true },
  ssr: false, // 单页应用模式

  // 源码目录
  srcDir: 'src/',

  css: ['~/assets/css/main.css'],

  // 应用设置
  app: {
    head: {
      title: 'CDN IP 优选服务',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'CloudFlare、Vercel、Netlify 等全球主流云服务商的 CDN IP 优选、节点状态监测服务' },
        { name: 'keywords', content: 'CDN, IP优选, CloudFlare, Vercel, Netlify, 网络加速, 节点监测' },
        { name: 'author', content: 'CDN IP 优选服务' },
        { property: 'og:title', content: 'CDN IP 优选服务' },
        { property: 'og:description', content: 'CloudFlare、Vercel、Netlify 等全球主流云服务商的 CDN IP 优选、节点状态监测服务' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'CDN IP 优选服务' },
        { name: 'twitter:description', content: 'CloudFlare、Vercel、Netlify 等全球主流云服务商的 CDN IP 优选、节点状态监测服务' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'https://cdn.mfawa.top/favicon.ico' },
        { rel: 'canonical', href: 'https://www.byoip.top' }
      ],
      script: [
        { src: 'https://cdn.tailwindcss.com' },
        // 结构化数据
        {
          innerHTML: `
            // SEO结构化数据
            const structuredData = {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "CDN IP 优选服务",
              "description": "CloudFlare、Vercel、Netlify 等全球主流云服务商的 CDN IP 优选、节点状态监测服务",
              "applicationCategory": "NetworkingApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "CNY"
              }
            };
            
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(structuredData);
            document.head.appendChild(script);
          `,
          type: 'text/javascript'
        }
      ]
    }
  },

  // 构建设置
  nitro: {
    compressPublicAssets: true,
    minify: true,
    prerender: {
      routes: ['/partners', '/sponsor']
    },
    publicAssets: [
      {
        baseURL: '/icon',
        dir: 'public/icon'
      }
    ]
  },

  // 优化设置
  vite: {
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    }
  },

  // 运行时设置
  runtimeConfig: {
    public: {
      services: servicesConfig,
      partners: partnersConfig,
      sponsors: sponsorsConfig
    }
  }
})