import { ref, computed } from 'vue'
import type { UserProject, ProjectFiltersState } from '@/types'
import { userProjects } from '@/data/mockData'

export function useUserProjects() {
  const isLoading = ref<boolean>(false)
  const projects = ref<UserProject[]>([])
  const filters = ref<ProjectFiltersState>({
    search: '',
    stage: 'Все стадии',
    industry: 'Все отрасли',
    region: 'Все регионы',
    type: 'Все типы'
  })

  const loadProjects = async (): Promise<void> => {
    isLoading.value = true
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      projects.value = [...userProjects]
    } catch (error) {
      console.error('Failed to load projects:', error)
    } finally {
      isLoading.value = false
    }
  }

  const updateFilters = (newFilters: ProjectFiltersState): void => {
    filters.value = newFilters
  }

  const toggleProject = async (projectId: string, isEnabled: boolean): Promise<{ success: boolean; error?: string }> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Update local state
      const project = projects.value.find(p => p.id === projectId)
      if (project) {
        project.isEnabled = isEnabled
      }
      
      return { success: true }
    } catch (error) {
      console.error('Failed to toggle project:', error)
      return { success: false, error: 'Ошибка при изменении статуса проекта' }
    }
  }

  const editProject = (projectId: string): void => {
    // В реальном приложении здесь был бы переход на страницу редактирования
    console.log('Edit project:', projectId)
  }

  const addProject = (): void => {
    // В реальном приложении здесь был бы переход на страницу создания проекта
    console.log('Add new project')
  }

  const copyToClipboard = async (text: string): Promise<{ success: boolean; error?: string }> => {
    try {
      await navigator.clipboard.writeText(text)
      return { success: true }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
      return { success: false, error: 'Ошибка при копировании' }
    }
  }

  return {
    // State
    isLoading,
    projects,
    filters,
    
    // Methods
    loadProjects,
    updateFilters,
    toggleProject,
    editProject,
    addProject,
    copyToClipboard
  }
}
