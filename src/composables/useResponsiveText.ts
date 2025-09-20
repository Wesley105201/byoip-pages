import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface TextContent {
  zh: string
  en: string
}

export interface ResponsiveTextOptions {
  maxLength?: number
  breakpoint?: number
  preferredLanguage?: 'zh' | 'en' | 'auto'
}

export function useResponsiveText(content: TextContent, options: ResponsiveTextOptions = {}) {
  const {
    maxLength = 50,
    breakpoint = 768,
    preferredLanguage = 'auto'
  } = options

  const screenWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)
  const userLanguage = ref<'zh' | 'en'>('zh')

  // 检测用户语言偏好
  const detectLanguage = () => {
    if (preferredLanguage !== 'auto') {
      userLanguage.value = preferredLanguage
      return
    }

    if (typeof navigator !== 'undefined') {
      const lang = navigator.language || navigator.languages?.[0] || 'zh-CN'
      userLanguage.value = lang.startsWith('zh') ? 'zh' : 'en'
    }
  }

  // 更新屏幕宽度
  const updateScreenWidth = () => {
    screenWidth.value = window.innerWidth
  }

  // 计算显示文本
  const displayText = computed(() => {
    const isMobile = screenWidth.value < breakpoint
    const zhText = content.zh
    const enText = content.en

    // 移动端优先显示较短的文本
    if (isMobile) {
      if (zhText.length <= enText.length) {
        return zhText
      } else {
        return enText
      }
    }

    // 桌面端根据用户语言偏好显示
    if (userLanguage.value === 'zh') {
      return zhText
    } else {
      return enText
    }
  })

  // 计算是否需要显示双语
  const shouldShowBilingual = computed(() => {
    const isMobile = screenWidth.value < breakpoint
    return !isMobile && (content.zh.length + content.en.length) <= maxLength * 2
  })

  // 计算双语显示文本
  const bilingualText = computed(() => {
    if (!shouldShowBilingual.value) {
      return displayText.value
    }

    if (userLanguage.value === 'zh') {
      return `${content.zh} / ${content.en}`
    } else {
      return `${content.en} / ${content.zh}`
    }
  })

  // 计算最终显示的文本
  const finalText = computed(() => {
    return shouldShowBilingual.value ? bilingualText.value : displayText.value
  })

  // 计算文本样式类
  const textClasses = computed(() => {
    const isMobile = screenWidth.value < breakpoint
    const isLongText = finalText.value.length > maxLength

    return {
      'text-sm': isMobile || isLongText,
      'text-base': !isMobile && !isLongText,
      'leading-relaxed': isLongText,
      'text-center': true
    }
  })

  onMounted(() => {
    detectLanguage()
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateScreenWidth)
    }
  })

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', updateScreenWidth)
    }
  })

  return {
    displayText,
    finalText,
    textClasses,
    shouldShowBilingual,
    userLanguage: readonly(userLanguage),
    screenWidth: readonly(screenWidth)
  }
}