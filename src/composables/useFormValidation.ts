import { reactive, watch } from 'vue'

interface FormState {
  isSubmitting: boolean
  errors: Record<string, string>
  isValid: boolean
}

export function useFormValidation<T extends Record<string, any>>(
  formData: T,
  requiredFields: string[],
  validationRules?: Record<string, (value: any) => string | null>
) {
  const formState = reactive<FormState>({
    isSubmitting: false,
    errors: {},
    isValid: false
  })

  const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((current, key) => current?.[key], obj)
  }

  const validateField = (fieldPath: string): string | null => {
    const value = getNestedValue(formData, fieldPath)
    
    if (!value || value.toString().trim().length === 0) {
      return 'Это поле обязательно для заполнения'
    }
    
    if (validationRules?.[fieldPath]) {
      return validationRules[fieldPath](value)
    }
    
    return null
  }

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}
    
    requiredFields.forEach(field => {
      const error = validateField(field)
      if (error) {
        errors[field] = error
      }
    })
    
    formState.errors = errors
    formState.isValid = Object.keys(errors).length === 0
    
    return formState.isValid
  }

  const clearErrors = () => {
    formState.errors = {}
  }

  const setSubmitting = (isSubmitting: boolean) => {
    formState.isSubmitting = isSubmitting
  }

  watch(formData, () => {
    validateForm()
  }, { deep: true })

  return {
    formState,
    validateField,
    validateForm,
    clearErrors,
    setSubmitting
  }
}

