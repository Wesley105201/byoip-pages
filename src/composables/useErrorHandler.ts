import { ref, reactive } from 'vue'

interface ErrorNotification {
  id: string
  title: string
  message: string
  type: 'error' | 'warning' | 'info' | 'success'
  timestamp: Date
  duration?: number
  actions?: Array<{
    label: string
    action: () => void
  }>
}

interface ErrorStats {
  totalErrors: number
  configErrors: number
  resourceErrors: number
  fontErrors: number
  networkErrors: number
}

export const useErrorHandler = () => {
  const notifications = ref<ErrorNotification[]>([])
  const errorStats = reactive<ErrorStats>({
    totalErrors: 0,
    configErrors: 0,
    resourceErrors: 0,
    fontErrors: 0,
    networkErrors: 0
  })

  const generateId = (): string => {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  const addNotification = (notification: Omit<ErrorNotification, 'id' | 'timestamp'>): string => {
    const id = generateId()
    const newNotification: ErrorNotification = {
      ...notification,
      id,
      timestamp: new Date(),
      duration: notification.duration || 5000
    }

    notifications.value.push(newNotification)
    
    // 更新统计
    errorStats.totalErrors++
    if (notification.type === 'error') {
      if (notification.message.includes('config') || notification.message.includes('配置')) {
        errorStats.configErrors++
      } else if (notification.message.includes('font') || notification.message.includes('字体')) {
        errorStats.fontErrors++
      } else if (notification.message.includes('network') || notification.message.includes('网络')) {
        errorStats.networkErrors++
      } else if (notification.message.includes('resource') || notification.message.includes('资源')) {
        errorStats.resourceErrors++
      }
    }

    // 在持续时间后自动删除
    if (newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }

    return id
  }

  const removeNotification = (id: string): void => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clearAllNotifications = (): void => {
    notifications.value = []
  }

  const handleConfigError = (error: string, context?: string): string => {
    return addNotification({
      title: '配置加载错误',
      message: `${context ? `${context}: ` : ''}${error}`,
      type: 'error',
      actions: [
        {
          label: '重试',
          action: () => {
            console.log('Retry action triggered for config error')
          }
        }
      ]
    })
  }

  const handleResourceError = (resource: string, error: string): string => {
    return addNotification({
      title: '资源加载失败',
      message: `无法加载 ${resource}: ${error}`,
      type: 'error',
      duration: 8000,
      actions: [
        {
          label: '重试',
          action: () => {
            console.log(`Retry action triggered for resource: ${resource}`)
          }
        }
      ]
    })
  }

  const handleFontError = (fontFamily: string, error: string): string => {
    return addNotification({
      title: '字体加载失败',
      message: `字体 ${fontFamily} 加载失败: ${error}`,
      type: 'warning',
      duration: 6000,
      actions: [
        {
          label: '使用备用字体',
          action: () => {
            console.log(`Fallback font action triggered for: ${fontFamily}`)
          }
        }
      ]
    })
  }

  const handleNetworkError = (operation: string, error: string): string => {
    return addNotification({
      title: '网络错误',
      message: `${operation} 时发生网络错误: ${error}`,
      type: 'error',
      duration: 10000,
      actions: [
        {
          label: '重试',
          action: () => {
            console.log(`Network retry action triggered for: ${operation}`)
          }
        },
        {
          label: '检查网络',
          action: () => {
            window.open('https://www.gov.cn', '_blank')
          }
        }
      ]
    })
  }

  const handleSuccess = (message: string, duration = 3000): string => {
    return addNotification({
      title: '操作成功',
      message,
      type: 'success',
      duration
    })
  }

  const handleWarning = (message: string, duration = 4000): string => {
    return addNotification({
      title: '警告',
      message,
      type: 'warning',
      duration
    })
  }

  const handleInfo = (message: string, duration = 3000): string => {
    return addNotification({
      title: '信息',
      message,
      type: 'info',
      duration
    })
  }

  const getErrorSummary = () => {
    const recentErrors = notifications.value
      .filter(n => n.type === 'error')
      .filter(n => Date.now() - n.timestamp.getTime() < 300000)
      .length

    return {
      ...errorStats,
      recentErrors,
      hasErrors: notifications.value.some(n => n.type === 'error'),
      hasWarnings: notifications.value.some(n => n.type === 'warning')
    }
  }

  const exportErrorLog = (): string => {
    const errorLog = {
      timestamp: new Date().toISOString(),
      stats: errorStats,
      notifications: notifications.value.map(n => ({
        ...n,
        timestamp: n.timestamp.toISOString()
      })),
      userAgent: navigator.userAgent,
      url: window.location.href
    }

    return JSON.stringify(errorLog, null, 2)
  }

  const setupGlobalErrorHandler = () => {
    if (typeof window !== 'undefined') {
      window.addEventListener('error', (event) => {
        handleResourceError(
          event.filename || 'Unknown resource',
          event.message || 'Unknown error'
        )
      })

      window.addEventListener('unhandledrejection', (event) => {
        handleNetworkError(
          'Promise rejection',
          event.reason?.message || 'Unknown promise rejection'
        )
      })
    }
  }

  // 清理函数
  const cleanup = () => {
    clearAllNotifications()
    if (typeof window !== 'undefined') {
      window.removeEventListener('error', () => {})
      window.removeEventListener('unhandledrejection', () => {})
    }
  }

  return {
    notifications: readonly(notifications),
    errorStats: readonly(errorStats),
    addNotification,
    removeNotification,
    clearAllNotifications,
    handleConfigError,
    handleResourceError,
    handleFontError,
    handleNetworkError,
    handleSuccess,
    handleWarning,
    handleInfo,
    getErrorSummary,
    exportErrorLog,
    setupGlobalErrorHandler,
    cleanup
  }
}