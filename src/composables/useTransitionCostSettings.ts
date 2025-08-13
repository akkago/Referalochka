import { ref, reactive, computed, watch } from 'vue'
import type { TransitionCostSettingsForm, TransitionCostSettingsState, TransitionCostInfo } from '@/types'
import {
  shouldShowCostInfo,
  getCurrentUnitLabel,
  getCurrentUnitPlaceholder,
  calculateTotalCost,
  validateTransitionCostForm,
  createInitialFormData,
  createInitialCostInfo
} from '@/utils/transitionCostUtils'

export function useTransitionCostSettings(initialData?: Partial<TransitionCostSettingsForm>, initialCostInfo?: TransitionCostInfo) {
  // State
  const formData = reactive<TransitionCostSettingsForm>({
    ...createInitialFormData(),
    ...initialData
  })

  const costInfo = reactive<TransitionCostInfo>({
    ...createInitialCostInfo(),
    ...initialCostInfo
  })

  const formState = reactive<TransitionCostSettingsState>({
    isSubmitting: false,
    errors: {},
    isValid: false
  })

  // Computed
  const shouldShowCostInfoComputed = computed(() => shouldShowCostInfo(formData))

  const currentUnitLabelComputed = computed(() => getCurrentUnitLabel(formData))

  const currentUnitPlaceholderComputed = computed(() => getCurrentUnitPlaceholder(formData))

  // Methods
  const validateForm = (): boolean => {
    const errors = validateTransitionCostForm(formData)
    formState.errors = errors
    formState.isValid = Object.keys(errors).length === 0
    return formState.isValid
  }

  const updateCostInfo = () => {
    costInfo.totalCost = calculateTotalCost(formData, costInfo)
  }

  const handleFieldChange = (fieldName: keyof TransitionCostSettingsForm) => {
    validateForm()
    updateCostInfo()
  }

  const resetForm = () => {
    Object.assign(formData, createInitialFormData())
    Object.assign(costInfo, createInitialCostInfo())
    validateForm()
  }

  const submitForm = async (): Promise<{ success: boolean; data?: TransitionCostSettingsForm; error?: string }> => {
    if (!validateForm()) {
      return { success: false, error: 'Форма содержит ошибки' }
    }
    
    formState.isSubmitting = true
    
    try {
      // Симуляция API вызова
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return { success: true, data: { ...formData } }
    } catch (error) {
      return { success: false, error: 'Ошибка при отправке формы' }
    } finally {
      formState.isSubmitting = false
    }
  }

  // Watch for form changes
  watch(formData, () => {
    validateForm()
    updateCostInfo()
  }, { deep: true })

  // Initial validation
  validateForm()
  updateCostInfo()

  return {
    // State
    formData,
    costInfo,
    formState,
    
    // Computed
    shouldShowCostInfo: shouldShowCostInfoComputed,
    currentUnitLabel: currentUnitLabelComputed,
    currentUnitPlaceholder: currentUnitPlaceholderComputed,
    
    // Methods
    validateForm,
    updateCostInfo,
    handleFieldChange,
    resetForm,
    submitForm
  }
}
