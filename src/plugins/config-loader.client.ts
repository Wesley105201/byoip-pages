/**
 * 客户端配置加载插件
 * 配置已在构建时嵌入HTML，此插件仅用于验证配置可用性
 */

export default defineNuxtPlugin(() => {
  // 只在客户端运行
  if (import.meta.server) return

  try {
    // 获取嵌入配置
    const appConfig = (window as any).__APP_CONFIG__
    
    if (!appConfig) {
      console.error('Application configuration not found in embedded data')
      return
    }

    // 记录配置加载状态
    console.log('嵌入配置加载成功:', {
      services: appConfig.services?.services?.length || 0,
      partners: appConfig.partners?.partners?.length || 0,
      sponsors: appConfig.sponsors?.sponsors?.length || 0
    })

  } catch (error) {
    console.error('Failed to access embedded configuration:', error)
  }
})