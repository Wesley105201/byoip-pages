import { ref, reactive } from 'vue'

interface ResourceState {
  loading: boolean
  loaded: boolean
  error: string | null
  retryCount: number
}

interface LoadResourceOptions {
  maxRetries?: number
  retryDelay?: number
  timeout?: number
  fallbackUrls?: string[]
}

export const useResourceLoader = () => {
  const resources = reactive<Map<string, ResourceState>>(new Map())

  const getResourceState = (url: string): ResourceState => {
    if (!resources.has(url)) {
      resources.set(url, {
        loading: false,
        loaded: false,
        error: null,
        retryCount: 0
      })
    }
    return resources.get(url)!
  }

  const delay = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const loadCSS = async (
    url: string, 
    options: LoadResourceOptions = {}
  ): Promise<boolean> => {
    const {
      maxRetries = 3,
      retryDelay = 1000,
      timeout = 10000,
      fallbackUrls = []
    } = options

    const state = getResourceState(url)
    
    if (state.loaded) {
      return true
    }

    if (state.loading) {
      // 等待现有负载完成
      return new Promise((resolve) => {
        const checkLoaded = () => {
          if (state.loaded) {
            resolve(true)
          } else if (state.error) {
            resolve(false)
          } else {
            setTimeout(checkLoaded, 100)
          }
        }
        checkLoaded()
      })
    }

    state.loading = true
    state.error = null

    const urlsToTry = [url, ...fallbackUrls]

    for (const currentUrl of urlsToTry) {
      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          const success = await loadCSSFromUrl(currentUrl, timeout)
          if (success) {
            state.loaded = true
            state.loading = false
            return true
          }
        } catch (error) {
          console.warn(`CSS load attempt ${attempt + 1} failed for ${currentUrl}:`, error)
          
          if (attempt < maxRetries) {
            await delay(retryDelay * (attempt + 1))
          }
        }
      }
    }

    state.loading = false
    state.error = `Failed to load CSS after ${maxRetries + 1} attempts`
    return false
  }

  const loadCSSFromUrl = (url: string, timeout: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      // 检查是否已加载
      const existingLink = document.querySelector(`link[href="${url}"]`)
      if (existingLink) {
        resolve(true)
        return
      }

      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = url

      const timeoutId = setTimeout(() => {
        reject(new Error('CSS load timeout'))
      }, timeout)

      link.onload = () => {
        clearTimeout(timeoutId)
        resolve(true)
      }

      link.onerror = () => {
        clearTimeout(timeoutId)
        reject(new Error('CSS load error'))
      }

      document.head.appendChild(link)
    })
  }

  const loadScript = async (
    url: string,
    options: LoadResourceOptions = {}
  ): Promise<boolean> => {
    const {
      maxRetries = 3,
      retryDelay = 1000,
      timeout = 10000,
      fallbackUrls = []
    } = options

    const state = getResourceState(url)
    
    if (state.loaded) {
      return true
    }

    if (state.loading) {
      return new Promise((resolve) => {
        const checkLoaded = () => {
          if (state.loaded) {
            resolve(true)
          } else if (state.error) {
            resolve(false)
          } else {
            setTimeout(checkLoaded, 100)
          }
        }
        checkLoaded()
      })
    }

    state.loading = true
    state.error = null

    const urlsToTry = [url, ...fallbackUrls]

    for (const currentUrl of urlsToTry) {
      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          const success = await loadScriptFromUrl(currentUrl, timeout)
          if (success) {
            state.loaded = true
            state.loading = false
            return true
          }
        } catch (error) {
          console.warn(`Script load attempt ${attempt + 1} failed for ${currentUrl}:`, error)
          
          if (attempt < maxRetries) {
            await delay(retryDelay * (attempt + 1))
          }
        }
      }
    }

    state.loading = false
    state.error = `Failed to load script after ${maxRetries + 1} attempts`
    return false
  }

  const loadScriptFromUrl = (url: string, timeout: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src="${url}"]`)
      if (existingScript) {
        resolve(true)
        return
      }

      const script = document.createElement('script')
      script.src = url
      script.async = true

      const timeoutId = setTimeout(() => {
        reject(new Error('Script load timeout'))
      }, timeout)

      script.onload = () => {
        clearTimeout(timeoutId)
        resolve(true)
      }

      script.onerror = () => {
        clearTimeout(timeoutId)
        reject(new Error('Script load error'))
      }

      document.head.appendChild(script)
    })
  }

  const preloadResource = (url: string, type: 'style' | 'script' | 'image' = 'script') => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = url
    link.as = type
    document.head.appendChild(link)
  }

  const getLoadingState = (url: string) => {
    return getResourceState(url)
  }

  const clearCache = () => {
    resources.clear()
  }

  return {
    loadCSS,
    loadScript,
    preloadResource,
    getLoadingState,
    clearCache
  }
}