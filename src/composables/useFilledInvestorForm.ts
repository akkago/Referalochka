import { ref, reactive } from 'vue'
import { filledInvestorFormData, rejectionWarning } from '@/data/mockData'
import type { FilledInvestorFormData, RejectionWarning } from '@/types'

export function useFilledInvestorForm() {
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const formData = reactive<FilledInvestorFormData>({
    ...filledInvestorFormData
  })

  const warning = reactive<RejectionWarning>({
    ...rejectionWarning
  })

  const loadFormData = async (): Promise<void> => {
    isLoading.value = true
    error.value = null
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // In real app, this would be an API call
      console.log('Loaded filled investor form data')
    } catch (err) {
      error.value = 'Ошибка загрузки данных анкеты'
      console.error('Failed to load form data:', err)
    } finally {
      isLoading.value = false
    }
  }

  const updateFormData = async (newData: Partial<FilledInvestorFormData>): Promise<{ success: boolean; error?: string }> => {
    isLoading.value = true
    error.value = null
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update form data
      Object.assign(formData, newData)
      
      return { success: true }
    } catch (err) {
      const errorMessage = 'Ошибка обновления данных анкеты'
      error.value = errorMessage
      console.error('Failed to update form data:', err)
      return { success: false, error: errorMessage }
    } finally {
      isLoading.value = false
    }
  }

  const resubmitForm = async (): Promise<{ success: boolean; error?: string }> => {
    isLoading.value = true
    error.value = null
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In real app, this would submit the form data
      console.log('Form resubmitted:', formData)
      
      return { success: true }
    } catch (err) {
      const errorMessage = 'Ошибка повторной отправки анкеты'
      error.value = errorMessage
      console.error('Failed to resubmit form:', err)
      return { success: false, error: errorMessage }
    } finally {
      isLoading.value = false
    }
  }

  const hideWarning = (): void => {
    warning.isVisible = false
  }

  const showWarning = (reason: string, details: string): void => {
    warning.isVisible = true
    warning.reason = reason
    warning.details = details
  }

  return {
    // State
    isLoading,
    error,
    formData,
    warning,
    
    // Methods
    loadFormData,
    updateFormData,
    resubmitForm,
    hideWarning,
    showWarning
  }
}
