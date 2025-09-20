/**
 * 字体加载插件
 * 确保字体正确加载并处理降级方案
 */

export default defineNuxtPlugin(() => {
  // 仅在客户端运行
  if (import.meta.server) return

  const { loadFonts, isFontLoaded } = useFont()

  // 初始化字体加载
  const initializeFonts = async () => {
    try {
      // 添加加载中类名
      document.documentElement.classList.add('fonts-loading')
      
      // 加载字体
      await loadFonts()
      
      // 检查字体是否成功加载
      const fontsLoaded = isFontLoaded('xiaolai') && isFontLoaded('Cascadia Code')
      
      if (fontsLoaded) {
        document.documentElement.classList.remove('fonts-loading')
        document.documentElement.classList.add('fonts-loaded')
        console.log('✅ 自定义字体加载成功')
      } else {
        throw new Error('Some fonts failed to load')
      }
    } catch (error) {
      console.warn('⚠️ 字体加载失败，使用备用字体:', error)
      document.documentElement.classList.remove('fonts-loading')
      document.documentElement.classList.add('fonts-fallback')
    }
  }

  // 当DOM就绪时初始化字体
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFonts)
  } else {
    initializeFonts()
  }

  // 全局提供字体工具
  return {
    provide: {
      fontLoader: {
        loadFonts,
        isFontLoaded
      }
    }
  }
})