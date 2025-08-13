import { ref, reactive, computed } from 'vue'
import type { EditProjectForm, EditProjectFormState } from '@/types'
import { editProjectFormData } from '@/data/mockData'

export function useEditProject() {
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)
  
  const form = reactive<EditProjectForm>({
    ...editProjectFormData
  })
  
  const formState = reactive<EditProjectFormState>({
    isSubmitting: false,
    errors: {},
    isValid: false,
    isEnabled: form.isEnabled
  })
  
  const isFormValid = computed(() => {
    const requiredFields = [
      'region',
      'projectType',
      'industry',
      'projectStage',
      'about.headline',
      'about.description',
      'projectLink'
    ]
    
    return requiredFields.every(field => {
      const value = getNestedValue(form, field)
      return value && value.toString().trim().length > 0
    })
  })
  
  const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((current, key) => current?.[key], obj)
  }
  
  const validateField = (fieldPath: string): boolean => {
    const value = getNestedValue(form, fieldPath)
    const isValid = value && value.toString().trim().length > 0
    
    if (isValid) {
      delete formState.errors[fieldPath]
    } else {
      formState.errors[fieldPath] = 'Это поле обязательно для заполнения'
    }
    
    formState.isValid = isFormValid.value
    return isValid
  }
  
  const validateForm = (): boolean => {
    const requiredFields = [
      'region',
      'projectType',
      'industry',
      'projectStage',
      'about.headline',
      'about.description',
      'projectLink'
    ]
    
    let isValid = true
    
    requiredFields.forEach(field => {
      if (!validateField(field)) {
        isValid = false
      }
    })
    
    formState.isValid = isValid
    return isValid
  }
  
  const loadProject = async (projectId: string): Promise<void> => {
    isLoading.value = true
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // В реальном приложении здесь был бы API вызов для загрузки проекта
      // const project = await getProject(projectId)
      // Object.assign(form, project)
      
      // Для демонстрации используем mock данные
      Object.assign(form, { ...editProjectFormData, id: projectId })
    } catch (error) {
      console.error('Failed to load project:', error)
    } finally {
      isLoading.value = false
    }
  }
  
  const resetForm = (): void => {
    Object.assign(form, editProjectFormData)
    formState.errors = {}
    formState.isValid = false
    formState.isEnabled = form.isEnabled
    error.value = null
  }
  
  const submitForm = async (): Promise<{ success: boolean; error?: string }> => {
    if (!validateForm()) {
      return { success: false, error: 'Пожалуйста, заполните все обязательные поля' }
    }
    
    formState.isSubmitting = true
    error.value = null
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // В реальном приложении здесь был бы API вызов
      // const response = await updateProject(form)
      
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Произошла ошибка при обновлении проекта'
      error.value = errorMessage
      return { success: false, error: errorMessage }
    } finally {
      formState.isSubmitting = false
    }
  }
  
  const updateForm = (updates: Partial<EditProjectForm>): void => {
    Object.assign(form, updates)
    validateForm()
  }
  
  const toggleProject = (isEnabled: boolean): void => {
    form.isEnabled = isEnabled
    formState.isEnabled = isEnabled
  }
  
  const stopAdvertising = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // В реальном приложении здесь был бы API вызов для остановки рекламы
      // await stopProjectAdvertising(form.id)
      
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Произошла ошибка при остановке рекламы'
      return { success: false, error: errorMessage }
    }
  }
  
  const launchAdvertising = async (): Promise<{ success: boolean; error?: string }> => {
    if (!validateForm()) {
      return { success: false, error: 'Пожалуйста, заполните все обязательные поля' }
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // В реальном приложении здесь был бы API вызов для запуска рекламы
      // await launchProjectAdvertising(form)
      
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Произошла ошибка при запуске рекламы'
      return { success: false, error: errorMessage }
    }
  }
  
  return {
    // State
    isLoading,
    error,
    form,
    formState,
    
    // Computed
    isFormValid,
    
    // Methods
    validateField,
    validateForm,
    loadProject,
    resetForm,
    submitForm,
    updateForm,
    toggleProject,
    stopAdvertising,
    launchAdvertising
  }
}
