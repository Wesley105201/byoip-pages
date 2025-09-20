// CDN服务配置类型
export interface CDNServiceConfig {
  id: string
  name: string
  provider: 'cloudflare' | 'cloudfront' | 'edgeone' | 'vercel' | 'netlify' | 'other'
  description: string
  status: 'active' | 'inactive' | 'maintenance'
  optimizedIPs: string[]
  nodeStatus: 'online' | 'offline' | 'slow'
  responseTime?: number
  tags: string[]
  protocol?: string
  updateFrequency?: string
}

export interface ServicesConfig {
  services: CDNServiceConfig[]
}

// 合作伙伴配置类型
export interface PartnerConfig {
  id: string
  name: string
  logo: string
  description: string
  website: string
  type: 'platinum' | 'gold' | 'silver' | 'bronze'
}

export interface PartnersConfig {
  partners: PartnerConfig[]
}

// 赞助商配置类型
export interface SponsorConfig {
  id: string
  name: string
  logo: string
  description: string
  website: string
  amount?: string
  level?: 'diamond' | 'platinum' | 'gold' | 'silver'
}

export interface SponsorsConfig {
  sponsors: SponsorConfig[]
}

// CDN镜像配置类型
export interface CDNMirrorConfig {
  github: {
    template: string
    mirror: string
  }
  npm: {
    template: string
    mirror: string
  }
  alternatives?: {
    mirrors: string[]
  }
}

// Configuration Validation Types
export interface ConfigValidationResult {
  isValid: boolean
  errors: string[]
  warnings?: string[]
}

// API Response Types
export interface ConfigResponse<T> {
  data: T | null
  error: string | null
  loading: boolean
}

// Configuration Status Types
export interface ConfigStatus {
  loaded: boolean
  loading: boolean
  error: string | null
  lastUpdated: Date | null
  hotReload: boolean
}

export interface ConfigManagerStatus {
  services: ConfigStatus
  partners: ConfigStatus
  sponsors: ConfigStatus
  cdn: ConfigStatus
}

// Performance Configuration Types
export interface PerformanceConfig {
  optimization: {
    preload: {
      enabled: boolean
      routes: string[]
      resources: string[]
    }
    lazyLoading: {
      enabled: boolean
      threshold: string
      components: string[]
    }
    caching: {
      staticAssets: {
        maxAge: number
        immutable: boolean
      }
      apiResponses: {
        maxAge: number
        staleWhileRevalidate: number
      }
      fonts: {
        maxAge: number
        crossOrigin: string
      }
    }
    compression: {
      enabled: boolean
      algorithms: string[]
      threshold: number
    }
  }
  monitoring: {
    coreWebVitals: {
      enabled: boolean
      thresholds: {
        fcp: number
        lcp: number
        cls: number
        fid: number
      }
    }
    resourceTiming: {
      enabled: boolean
      slowResourceThreshold: number
    }
    longTasks: {
      enabled: boolean
      threshold: number
    }
  }
  compatibility: {
    polyfills: {
      intersectionObserver: boolean
      fetch: boolean
      customProperties: boolean
    }
    fallbacks: {
      webp: string
      avif: string
      modernFonts: string
    }
  }
}

