export default defineNuxtPlugin(() => {
  if (import.meta.server) return

  const { loadFonts, isFontLoaded } = useFont()
  const initializeFonts = async () => {
    try {
      // 添加加载类
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
        throw new Error('部分字体加载失败')
      }
    } catch (error) {
      console.warn('⚠️ 字体加载失败，使用后备字体:', error)
      document.documentElement.classList.remove('fonts-loading')
      document.documentElement.classList.add('fonts-fallback')
    }
  }

  // 当DOM加载完成时初始化字体
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFonts)
  } else {
    initializeFonts()
  }

  // 提供字体工具全局访问
  return {
    provide: {
      fontLoader: {
        loadFonts,
        isFontLoaded
      }
    }
  }
})