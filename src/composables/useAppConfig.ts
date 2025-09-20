/**
 * 应用配置管理 - 使用构建时注入的配置
 */

import type {
  ServicesConfig,
  PartnersConfig,
  SponsorsConfig,
  CDNMirrorConfig,
  PerformanceConfig
} from '~/types'

interface AppConfig {
  services: ServicesConfig
  partners: PartnersConfig
  sponsors: SponsorsConfig
  cdn: CDNMirrorConfig
  performance: PerformanceConfig
}

interface AppConfigManager {
  services: ComputedRef<ServicesConfig>
  partners: ComputedRef<PartnersConfig>
  sponsors: ComputedRef<SponsorsConfig>
  cdn: ComputedRef<CDNMirrorConfig>
  performance: ComputedRef<PerformanceConfig>
  isLoaded: ComputedRef<boolean>
  getConfig: <T extends keyof AppConfig>(key: T) => AppConfig[T]
}

// 默认配置，防止构建时配置加载失败
const defaultConfig: AppConfig = {
  services: { services: [] },
  partners: { partners: [] },
  sponsors: { sponsors: [] },
  cdn: {
    github: {
      template: "https://{{mirror}}/gh/{{owner}}/{{repo}}@{{branch}}/{{path}}",
      mirror: "cdn.jsdelivr.net"
    },
    npm: {
      template: "https://{{mirror}}/npm/{{package}}@{{version}}/{{path}}",
      mirror: "cdn.jsdelivr.net"
    },
    alternatives: {
      mirrors: ["cdn.jsdelivr.net"]
    }
  },
  performance: {
    optimization: {
      preload: { enabled: false, routes: [], resources: [] },
      lazyLoading: { enabled: true, threshold: "100px", components: [] },
      caching: {
        staticAssets: { maxAge: 31536000, immutable: true },
        apiResponses: { maxAge: 300, staleWhileRevalidate: 86400 },
        fonts: { maxAge: 31536000, crossOrigin: "anonymous" }
      },
      compression: { enabled: true, algorithms: ["gzip"], threshold: 1024 }
    },
    monitoring: {
      coreWebVitals: {
        enabled: true,
        thresholds: { fcp: 1800, lcp: 2500, cls: 0.1, fid: 100 }
      },
      resourceTiming: { enabled: true, slowResourceThreshold: 1000 },
      longTasks: { enabled: true, threshold: 50 }
    },
    compatibility: {
      polyfills: {
        intersectionObserver: true,
        fetch: true,
        customProperties: true
      },
      fallbacks: {
        webp: "jpg",
        avif: "webp",
        modernFonts: "systemFonts"
      }
    }
  }
}

export const useStaticConfig = (): AppConfigManager => {
  // 从构建时注入的全局配置获取数据
  const getGlobalConfig = (): AppConfig => {
    // 客户端：从window.__APP_CONFIG__获取
    if (typeof window !== 'undefined' && (window as any).__APP_CONFIG__) {
      const globalConfig = (window as any).__APP_CONFIG__
      return {
        services: globalConfig.services || defaultConfig.services,
        partners: globalConfig.partners || defaultConfig.partners,
        sponsors: globalConfig.sponsors || defaultConfig.sponsors,
        cdn: globalConfig.cdn || defaultConfig.cdn,
        performance: globalConfig.performance || defaultConfig.performance
      }
    }

    // 服务端：从runtimeConfig获取
    const runtimeConfig = useRuntimeConfig()
    if (runtimeConfig.public.appConfig) {
      const runtimeAppConfig = runtimeConfig.public.appConfig as any
      return {
        services: runtimeAppConfig.services || defaultConfig.services,
        partners: runtimeAppConfig.partners || defaultConfig.partners,
        sponsors: runtimeAppConfig.sponsors || defaultConfig.sponsors,
        cdn: runtimeAppConfig.cdn || defaultConfig.cdn,
        performance: runtimeAppConfig.performance || defaultConfig.performance
      }
    }

    // 回退到默认配置
    return defaultConfig
  }

  const config = ref<AppConfig>(getGlobalConfig())

  // 响应式配置访问器
  const services = computed(() => config.value.services)
  const partners = computed(() => config.value.partners)
  const sponsors = computed(() => config.value.sponsors)
  const cdn = computed(() => config.value.cdn)
  const performance = computed(() => config.value.performance)

  // 检查配置是否已加载
  const isLoaded = computed(() => {
    return !!(
      config.value.services?.services?.length ||
      config.value.partners?.partners?.length ||
      config.value.sponsors?.sponsors?.length ||
      config.value.cdn?.github ||
      config.value.performance?.optimization
    )
  })

  // 通用配置获取方法
  const getConfig = <T extends keyof AppConfig>(key: T): AppConfig[T] => {
    return config.value[key]
  }

  // 客户端初始化
  onMounted(() => {
    // 确保客户端配置是最新的
    config.value = getGlobalConfig()
  })

  return {
    services,
    partners,
    sponsors,
    cdn,
    performance,
    isLoaded,
    getConfig
  }
}

// 便捷的配置访问函数
export const useServices = () => {
  const { services } = useStaticConfig()
  return services
}

export const usePartners = () => {
  const { partners } = useStaticConfig()
  return partners
}

export const useSponsors = () => {
  const { sponsors } = useStaticConfig()
  return sponsors
}

export const useCDNConfig = () => {
  const { cdn } = useStaticConfig()
  return cdn
}

export const usePerformanceConfig = () => {
  const { performance } = useStaticConfig()
  return performance
}