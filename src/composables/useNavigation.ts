import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { navigationItems } from '@/data/mockData'
import { ROUTES } from '@/constants'
import type { NavigationItem } from '@/types'

export function useNavigation() {
  const router = useRouter()
  
  // Reactive state
  const currentRoute = ref(router.currentRoute.value.name as string)
  
  // Computed
  const activeNavigationItem = computed(() => {
    return navigationItems.find(item => {
      if (currentRoute.value === ROUTES.PROJECTS) {
        return item.id === 'search'
      }
      if (currentRoute.value === ROUTES.PROFILE) {
        return item.id === 'profile'
      }
      if (currentRoute.value === ROUTES.REQUISITES) {
        return item.id === 'requisites'
      }
      return item.isActive
    })
  })
  
  const updatedNavigationItems = computed(() => {
    return navigationItems.map(item => ({
      ...item,
      isActive: item.id === activeNavigationItem.value?.id
    }))
  })
  
  // Methods
  const navigateTo = (itemId: string) => {
    switch (itemId) {
      case 'search':
        router.push({ name: ROUTES.PROJECTS })
        break
      case 'profile':
        router.push({ name: ROUTES.PROFILE })
        break
      case 'requisites':
        router.push({ name: ROUTES.REQUISITES })
        break
      default:
        console.log('Navigation to:', itemId)
        // Здесь можно добавить другие маршруты
    }
  }
  
  const updateCurrentRoute = () => {
    currentRoute.value = router.currentRoute.value.name as string
  }
  
  // Watch for route changes
  router.afterEach(() => {
    updateCurrentRoute()
  })
  
  return {
    currentRoute,
    activeNavigationItem,
    updatedNavigationItems,
    navigateTo,
    updateCurrentRoute
  }
}
