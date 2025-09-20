import { ref, type Ref } from 'vue'
import { navigateTo } from '#app'

interface NavigationManager {
  navigateToPath(path: string): Promise<void>
  isNavigating: Ref<boolean>
}

export const useNavigation = (): NavigationManager => {
  const isNavigating = ref(false)

  const navigateToPath = async (path: string): Promise<void> => {
    if (isNavigating.value) {
      return
    }

    try {
      isNavigating.value = true
      await navigateTo(path)
    } catch (error) {
      console.error('Navigation error:', error)
    } finally {
      isNavigating.value = false
    }
  }

  return {
    navigateToPath,
    isNavigating
  }
}