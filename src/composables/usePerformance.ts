interface PerformanceMetrics {
  pageLoadTime: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
  firstInputDelay: number
  timeToInteractive: number
}

interface ResourceTiming {
  name: string
  duration: number
  size: number
  type: string
}

interface PerformanceManager {
  startMeasurement: (name: string) => void
  endMeasurement: (name: string) => number
  getMetrics: () => Partial<PerformanceMetrics>
  getResourceTimings: () => ResourceTiming[]
  optimizeImages: () => void
  enableLazyLoading: () => void
  measureCoreWebVitals: () => Promise<Partial<PerformanceMetrics>>
}

export const usePerformance = (): PerformanceManager => {
  const measurements = new Map<string, number>()
  const metrics = ref<Partial<PerformanceMetrics>>({})
  
  const startMeasurement = (name: string): void => {
    if (typeof performance !== 'undefined') {
      measurements.set(name, performance.now())
    }
  }

  const endMeasurement = (name: string): number => {
    if (typeof performance !== 'undefined' && measurements.has(name)) {
      const startTime = measurements.get(name)!
      const duration = performance.now() - startTime
      measurements.delete(name)
      console.log(`Performance: ${name} took ${Math.round(duration)}ms`)
      return duration
    }
    return 0
  }

  const getMetrics = (): Partial<PerformanceMetrics> => {
    return { ...metrics.value }
  }
  const getResourceTimings = (): ResourceTiming[] => {
    if (typeof performance === 'undefined' || !performance.getEntriesByType) {
      return []
    }

    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
    return resources.map(resource => ({
      name: resource.name,
      duration: resource.duration,
      size: resource.transferSize || 0,
      type: getResourceType(resource.name)
    }))
  }

  const getResourceType = (url: string): string => {
    if (url.includes('.css')) return 'stylesheet'
    if (url.includes('.js')) return 'script'
    if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) return 'image'
    if (url.match(/\.(woff|woff2|ttf|otf)$/i)) return 'font'
    return 'other'
  }

  const measureCoreWebVitals = async (): Promise<Partial<PerformanceMetrics>> => {
    const webVitals: Partial<PerformanceMetrics> = {}

    if (typeof performance === 'undefined') {
      return webVitals
    }

    const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0]
    if (fcpEntry) {
      webVitals.firstContentfulPaint = fcpEntry.startTime
    }

    if ('PerformanceObserver' in window) {
      try {
        await new Promise<void>((resolve) => {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1] as any
            if (lastEntry) {
              webVitals.largestContentfulPaint = lastEntry.startTime
            }
            observer.disconnect()
            resolve()
          })
          observer.observe({ entryTypes: ['largest-contentful-paint'] })
          
          setTimeout(() => {
            observer.disconnect()
            resolve()
          }, 5000)
        })
      } catch (error) {
        console.warn('LCP measurement failed:', error)
      }

      try {
        await new Promise<void>((resolve) => {
          let clsValue = 0
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries() as any[]) {
              if (!entry.hadRecentInput) {
                clsValue += entry.value
              }
            }
            webVitals.cumulativeLayoutShift = clsValue
          })
          observer.observe({ entryTypes: ['layout-shift'] })

          setTimeout(() => {
            observer.disconnect()
            resolve()
          }, 5000)
        })
      } catch (error) {
        console.warn('CLS measurement failed:', error)
      }

      try {
        await new Promise<void>((resolve) => {
          const observer = new PerformanceObserver((list) => {
            const firstEntry = list.getEntries()[0] as any
            if (firstEntry) {
              webVitals.firstInputDelay = firstEntry.processingStart - firstEntry.startTime
            }
            observer.disconnect()
            resolve()
          })
          observer.observe({ entryTypes: ['first-input'] })

          setTimeout(() => {
            observer.disconnect()
            resolve()
          }, 10000)
        })
      } catch (error) {
        console.warn('FID measurement failed:', error)
      }
    }

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigation) {
      webVitals.pageLoadTime = navigation.loadEventEnd - navigation.fetchStart
      webVitals.timeToInteractive = navigation.domInteractive - navigation.fetchStart
    }

    metrics.value = { ...metrics.value, ...webVitals }
    return webVitals
  }

  const optimizeImages = (): void => {
    if (typeof document === 'undefined') return

    const images = document.querySelectorAll('img[data-src]')
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            const src = img.dataset.src
            
            if (src) {
              // 检查 WebP 支持
              const supportsWebP = document.createElement('canvas')
                .toDataURL('image/webp')
                .indexOf('data:image/webp') === 0
              
              if (supportsWebP && src.includes('.jpg') || src.includes('.png')) {
                const webpSrc = src.replace(/\.(jpg|png)$/i, '.webp')

                const testImg = new Image()
                testImg.onload = () => {
                  img.src = webpSrc
                  img.classList.add('loaded')
                }
                testImg.onerror = () => {
                  img.src = src
                  img.classList.add('loaded')
                }
                testImg.src = webpSrc
              } else {
                img.src = src
                img.classList.add('loaded')
              }
              
              img.removeAttribute('data-src')
              imageObserver.unobserve(img)
            }
          }
        })
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      })

      images.forEach(img => imageObserver.observe(img))
    } else {
      // 对于没有IntersectionObserver的浏览器的备用选项
      images.forEach(img => {
        const src = (img as HTMLImageElement).dataset.src
        if (src) {
          (img as HTMLImageElement).src = src
          img.removeAttribute('data-src')
        }
      })
    }
  }

  const enableLazyLoading = (): void => {
    if (typeof document === 'undefined') return

    const lazyComponents = document.querySelectorAll('[data-lazy-component]')
    
    if ('IntersectionObserver' in window) {
      const componentObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement
            const componentName = element.dataset.lazyComponent
            
            if (componentName) {
              element.dispatchEvent(new CustomEvent('lazy-load', {
                detail: { componentName }
              }))
              componentObserver.unobserve(element)
            }
          }
        })
      }, {
        rootMargin: '100px 0px',
        threshold: 0.01
      })

      lazyComponents.forEach(component => componentObserver.observe(component))
    }
  }

  const initializePerformanceMonitoring = (): void => {
    if (typeof window === 'undefined') return

    if ('PerformanceObserver' in window) {
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach(entry => {
            if (entry.duration > 50) {
              console.warn(`Long task detected: ${Math.round(entry.duration)}ms`)
            }
          })
        })
        longTaskObserver.observe({ entryTypes: ['longtask'] })
      } catch (error) {
        console.warn('Long task monitoring not supported')
      }
    }

    if ('memory' in performance) {
      const memoryInfo = (performance as any).memory
      console.log('Memory usage:', {
        used: Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024) + 'MB',
        total: Math.round(memoryInfo.totalJSHeapSize / 1024 / 1024) + 'MB',
        limit: Math.round(memoryInfo.jsHeapSizeLimit / 1024 / 1024) + 'MB'
      })
    }
    setTimeout(() => {
      measureCoreWebVitals().then(vitals => {
        console.log('Core Web Vitals:', vitals)
      })
    }, 1000)
  }

  if (import.meta.client) {
    onMounted(() => {
      initializePerformanceMonitoring()
      optimizeImages()
      enableLazyLoading()
    })
  }

  return {
    startMeasurement,
    endMeasurement,
    getMetrics,
    getResourceTimings,
    optimizeImages,
    enableLazyLoading,
    measureCoreWebVitals
  }
}