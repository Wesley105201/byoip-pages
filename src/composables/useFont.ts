/**
 * 简化的字体管理 - 依赖 CSS @import 加载的字体
 */

interface SimpleFontManager {
  isFontLoaded: (family: string) => boolean
  loadFonts: () => Promise<void>
  getFontStatus: () => Record<string, boolean>
}

export const useFont = (): SimpleFontManager => {
  const loadedFonts = ref<Set<string>>(new Set())

  /**
   * 检查字体是否已加载
   */
  const isFontLoaded = (family: string): boolean => {
    if (typeof document === 'undefined') return false
    
    // 检查字体是否在 document.fonts 中
    if (document.fonts) {
      for (const font of document.fonts) {
        if (font.family.includes(family)) {
          return font.status === 'loaded'
        }
      }
    }
    
    return loadedFonts.value.has(family)
  }

  /**
   * 等待字体加载完成
   */
  const waitForFonts = async (): Promise<void> => {
    if (typeof document === 'undefined') return

    try {
      // 等待所有字体加载完成
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready
        console.log('All fonts loaded')
      }
      
      // 检查特定字体
      const fontFamilies = ['xiaolai', 'Cascadia Code']
      
      for (const family of fontFamilies) {
        if (document.fonts) {
          // 检查字体是否可用
          const available = document.fonts.check(`16px "${family}"`)
          if (available) {
            loadedFonts.value.add(family)
          }
        }
      }
      
      // 添加字体加载完成的类
      document.documentElement.classList.remove('fonts-loading')
      document.documentElement.classList.add('fonts-loaded')
      
    } catch (error) {
      console.warn('Font loading check failed:', error)
      document.documentElement.classList.remove('fonts-loading')
      document.documentElement.classList.add('fonts-fallback')
    }
  }

  /**
   * 加载字体
   */
  const loadFonts = async (): Promise<void> => {
    if (typeof document === 'undefined') return

    // 设置加载状态
    document.documentElement.classList.add('fonts-loading')
    
    // 等待字体加载
    await waitForFonts()
    
    // 延迟检查，确保 CSS @import 的字体有时间加载
    setTimeout(async () => {
      await waitForFonts()
    }, 1000)
  }

  /**
   * 获取字体状态
   */
  const getFontStatus = (): Record<string, boolean> => {
    return {
      'xiaolai': isFontLoaded('xiaolai'),
      'Cascadia Code': isFontLoaded('Cascadia Code')
    }
  }

  // 客户端初始化
  if (import.meta.client) {
    onMounted(() => {
      loadFonts()
    })
  }

  return {
    isFontLoaded,
    loadFonts,
    getFontStatus
  }
}