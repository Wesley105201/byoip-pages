/**
 * 浏览器兼容性检测
 */

interface BrowserInfo {
  name: string
  version: string
  engine: string
  platform: string
  mobile: boolean
}

interface CompatibilityFeatures {
  webp: boolean
  avif: boolean
  intersectionObserver: boolean
  performanceObserver: boolean
  fontDisplay: boolean
  cssGrid: boolean
  flexbox: boolean
  customProperties: boolean
  es6Modules: boolean
  fetch: boolean
}

interface BrowserCompatibilityManager {
  getBrowserInfo: () => BrowserInfo
  checkFeatureSupport: () => CompatibilityFeatures
  applyPolyfills: () => Promise<void>
  optimizeForBrowser: () => void
  isModernBrowser: () => boolean
  shouldUsePolyfills: () => boolean
}

export const useBrowserCompatibility = (): BrowserCompatibilityManager => {
  const browserInfo = ref<BrowserInfo | null>(null)
  const features = ref<CompatibilityFeatures | null>(null)

  /**
   * 检测浏览器信息
   */
  const getBrowserInfo = (): BrowserInfo => {
    if (browserInfo.value) {
      return browserInfo.value
    }

    const userAgent = navigator.userAgent
    const platform = navigator.platform
    const mobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)

    let name = 'Unknown'
    let version = 'Unknown'
    let engine = 'Unknown'

    // 检测浏览器
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
      name = 'Chrome'
      const match = userAgent.match(/Chrome\/(\d+)/)
      version = match ? match[1] : 'Unknown'
      engine = 'Blink'
    } else if (userAgent.includes('Firefox')) {
      name = 'Firefox'
      const match = userAgent.match(/Firefox\/(\d+)/)
      version = match ? match[1] : 'Unknown'
      engine = 'Gecko'
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
      name = 'Safari'
      const match = userAgent.match(/Version\/(\d+)/)
      version = match ? match[1] : 'Unknown'
      engine = 'WebKit'
    } else if (userAgent.includes('Edg')) {
      name = 'Edge'
      const match = userAgent.match(/Edg\/(\d+)/)
      version = match ? match[1] : 'Unknown'
      engine = 'Blink'
    } else if (userAgent.includes('MSIE') || userAgent.includes('Trident')) {
      name = 'Internet Explorer'
      const match = userAgent.match(/(?:MSIE |rv:)(\d+)/)
      version = match ? match[1] : 'Unknown'
      engine = 'Trident'
    }

    const info: BrowserInfo = {
      name,
      version,
      engine,
      platform,
      mobile
    }

    browserInfo.value = info
    return info
  }

  /**
   * 检查功能支持
   */
  const checkFeatureSupport = (): CompatibilityFeatures => {
    if (features.value) {
      return features.value
    }

    const support: CompatibilityFeatures = {
      webp: false,
      avif: false,
      intersectionObserver: 'IntersectionObserver' in window,
      performanceObserver: 'PerformanceObserver' in window,
      fontDisplay: CSS.supports('font-display', 'swap'),
      cssGrid: CSS.supports('display', 'grid'),
      flexbox: CSS.supports('display', 'flex'),
      customProperties: CSS.supports('--custom', 'property'),
      es6Modules: 'noModule' in document.createElement('script'),
      fetch: 'fetch' in window
    }

    // 检查 WebP 支持
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    support.webp = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0

    // 检查 AVIF 支持（异步，稍后更新）
    checkAVIFSupport().then(avifSupported => {
      support.avif = avifSupported
      features.value = { ...support }
    })

    features.value = support
    return support
  }

  /**
   * 检查 AVIF 支持（异步）
   */
  const checkAVIFSupport = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const avif = new Image()
      avif.onload = () => resolve(true)
      avif.onerror = () => resolve(false)
      avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A='
    })
  }

  /**
   * 应用不支持的功能的填充
   */
  const applyPolyfills = async (): Promise<void> => {
    const support = checkFeatureSupport()
    const polyfillsNeeded: string[] = []

    // IntersectionObserver 填充程序
    if (!support.intersectionObserver) {
      polyfillsNeeded.push('intersection-observer')
    }

    // 获取 polyfill
    if (!support.fetch) {
      polyfillsNeeded.push('fetch')
    }

    // CSS 自定义属性填充程序（用于 IE）
    if (!support.customProperties) {
      polyfillsNeeded.push('css-vars-ponyfill')
    }

    // 从 CDN 加载 polyfill
    if (polyfillsNeeded.length > 0) {
      const polyfillUrl = `https://polyfill.io/v3/polyfill.min.js?features=${polyfillsNeeded.join(',')}`
      
      try {
        await loadScript(polyfillUrl)
        console.log('Polyfills loaded:', polyfillsNeeded)
      } catch (error) {
        console.warn('Failed to load polyfills:', error)
      }
    }
  }

  /**
   * 动态加载脚本
   * @param src 脚本 URL
   * @returns 加载脚本的 Promise
   */
  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => resolve()
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
      document.head.appendChild(script)
    })
  }

  /**
   * 针对特定浏览器进行优化
   * @description 针对不同浏览器添加特定的 CSS 类名和优化策略
   */
  const optimizeForBrowser = (): void => {
    const browser = getBrowserInfo()
    const support = checkFeatureSupport()

    // 针对特定浏览器添加 CSS 类名
    document.documentElement.classList.add(`browser-${browser.name.toLowerCase()}`)
    document.documentElement.classList.add(`engine-${browser.engine.toLowerCase()}`)
    
    if (browser.mobile) {
      document.documentElement.classList.add('mobile')
    }

    // 基于功能添加 CSS 类名
    Object.entries(support).forEach(([feature, supported]) => {
      document.documentElement.classList.add(
        supported ? `supports-${feature}` : `no-${feature}`
      )
    })

    // 浏览器特定的优化
    switch (browser.name) {
      case 'Safari':
        // Safari特定优化
        optimizeForSafari()
        break
      case 'Firefox':
        // Firefox特定优化
        optimizeForFirefox()
        break
      case 'Internet Explorer':
        // IE特定优化
        optimizeForIE()
        break
    }
  }

  /**
   * Safari特定优化
   */
  const optimizeForSafari = (): void => {
    // 在Safari上禁用平滑滚动（性能问题）
    document.documentElement.style.scrollBehavior = 'auto'
    
    // Safari特定的 CSS 修复
    const style = document.createElement('style')
    style.textContent = `
      /* Safari font rendering fix */
      * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      /* Safari flexbox fixes */
      .flex-container {
        -webkit-flex-wrap: wrap;
      }
    `
    document.head.appendChild(style)
  }

  /**
   * Firefox特定优化
   */
  const optimizeForFirefox = (): void => {
    // Firefox scrollbar styling
    const style = document.createElement('style')
    style.textContent = `
      /* Firefox scrollbar */
      * {
        scrollbar-width: thin;
        scrollbar-color: #888 #f1f1f1;
      }
    `
    document.head.appendChild(style)
  }

  /**
   * IE特定优化
   */
  const optimizeForIE = (): void => {
    // 在IE上禁用平滑滚动（性能问题）
    document.documentElement.style.scrollBehavior = 'auto'
    
    // 在IE上添加兼容性警告
    console.warn('Internet Explorer detected. Some features may not work properly.')
    
    // 禁用IE的现代功能
    document.documentElement.classList.add('legacy-browser')
  }

  /**
   * 检查浏览器是否为现代浏览器
   */
  const isModernBrowser = (): boolean => {
    const browser = getBrowserInfo()
    const support = checkFeatureSupport()
    
    // 定义现代浏览器的标准
    const modernCriteria = [
      support.es6Modules,
      support.fetch,
      support.customProperties,
      support.flexbox,
      browser.name !== 'Internet Explorer'
    ]
    
    return modernCriteria.every(criterion => criterion)
  }

  /**
   * 检查是否需要使用 polyfill
   */
  const shouldUsePolyfills = (): boolean => {
    return !isModernBrowser()
  }

  // 在客户端初始化
  if (import.meta.client) {
    onMounted(() => {
      getBrowserInfo()
      checkFeatureSupport()
      optimizeForBrowser()
      
      if (shouldUsePolyfills()) {
        applyPolyfills()
      }
    })
  }

  return {
    getBrowserInfo,
    checkFeatureSupport,
    applyPolyfills,
    optimizeForBrowser,
    isModernBrowser,
    shouldUsePolyfills
  }
}