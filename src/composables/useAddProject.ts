import { ref, reactive, computed } from 'vue'
import type { AddProjectForm, AddProjectFormState } from '@/types'
import { filledAddProjectForm } from '@/data/mockData'

export function useAddProject() {
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)
  
  const form = reactive<AddProjectForm>({
    ...filledAddProjectForm
  })
  
  const formState = reactive<AddProjectFormState>({
    isSubmitting: false,
    errors: {},
    isValid: false
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
  
  const resetForm = (): void => {
    Object.assign(form, filledAddProjectForm)
    formState.errors = {}
    formState.isValid = false
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
      // const response = await createProject(form)
      
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Произошла ошибка при создании проекта'
      error.value = errorMessage
      return { success: false, error: errorMessage }
    } finally {
      formState.isSubmitting = false
    }
  }
  
  const updateForm = (updates: Partial<AddProjectForm>): void => {
    Object.assign(form, updates)
    validateForm()
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
    resetForm,
    submitForm,
    updateForm
  }
}
