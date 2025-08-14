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
    // Если мы на главной странице проектов, активен поиск
    if (currentRoute.value === ROUTES.PROJECTS || currentRoute.value === undefined) {
      return navigationItems.find(item => item.id === 'search')
    }
    
    // Для других маршрутов
    const routeToItemMap: Record<string, string> = {
      [ROUTES.USER_PROJECTS]: 'my-projects',
      [ROUTES.PROFILE]: 'profile',
      [ROUTES.DOCUMENTS]: 'documents',
      [ROUTES.EMPLOYEES]: 'employees'
    }
    
    const targetItemId = routeToItemMap[currentRoute.value]
    if (targetItemId) {
      return navigationItems.find(item => item.id === targetItemId)
    }
    
    // По умолчанию возвращаем первый элемент
    return navigationItems[0]
  })
  
  const updatedNavigationItems = computed(() => {
    const activeItem = activeNavigationItem.value
    
    return navigationItems.map(item => {
      const isActive = item.id === activeItem?.id
      return {
        ...item,
        isActive
      }
    })
  })
  
  // Methods
  const navigateTo = (itemId: string) => {
    switch (itemId) {
      case 'search':
        router.push({ name: ROUTES.PROJECTS })
        break
      case 'my-projects':
        router.push({ name: ROUTES.USER_PROJECTS })
        break
      case 'profile':
        router.push({ name: ROUTES.PROFILE })
        break
      case 'documents':
        router.push({ name: ROUTES.DOCUMENTS })
        break
      case 'employees':
        router.push({ name: ROUTES.EMPLOYEES })
        break

      default:
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
