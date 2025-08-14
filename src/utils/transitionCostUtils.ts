import type { TransitionCostSettingsForm, TransitionCostInfo } from '@/types'
import { TRANSITION_COST_SETTINGS } from '@/constants'

export function shouldShowCostInfo(formData: TransitionCostSettingsForm): boolean {
  return (formData.paymentStrategy === 'transitions' && formData.transitionsCount > 0) ||
         (formData.paymentStrategy === 'publication-period' && formData.publicationDays > 0)
}

export function getCurrentUnitLabel(formData: TransitionCostSettingsForm): string {
  return formData.paymentStrategy === 'transitions' 
    ? TRANSITION_COST_SETTINGS.TRANSITIONS_COUNT.label 
    : TRANSITION_COST_SETTINGS.PUBLICATION_DAYS.label
}

export function getCurrentUnitPlaceholder(formData: TransitionCostSettingsForm): string {
  return formData.paymentStrategy === 'transitions' 
    ? TRANSITION_COST_SETTINGS.TRANSITIONS_COUNT.placeholder 
    : TRANSITION_COST_SETTINGS.PUBLICATION_DAYS.placeholder
}

export function calculateTotalCost(formData: TransitionCostSettingsForm, costInfo: TransitionCostInfo): number {
  if (formData.paymentStrategy === 'transitions') {
    return formData.transitionsCount * costInfo.costPerTransition
  } else {
    return formData.publicationDays * costInfo.costPerTransition
  }
}

export function getCostInfoTitle(formData: TransitionCostSettingsForm): string {
  return formData.paymentStrategy === 'transitions' 
    ? TRANSITION_COST_SETTINGS.COST_INFO.TRANSITION_COST.title
    : TRANSITION_COST_SETTINGS.COST_INFO.PLACEMENT_COST.title
}

export function getCostPerUnitText(formData: TransitionCostSettingsForm, costInfo: TransitionCostInfo): string {
  if (formData.paymentStrategy === 'transitions') {
    return TRANSITION_COST_SETTINGS.COST_INFO.TRANSITION_COST.costPerTransition
      .replace('{cost}', costInfo.costPerTransition.toString())
  } else {
    return TRANSITION_COST_SETTINGS.COST_INFO.PLACEMENT_COST.costPerDay
      .replace('{cost}', costInfo.costPerTransition.toString())
  }
}

export function getTotalCostText(formData: TransitionCostSettingsForm, costInfo: TransitionCostInfo): string {
  const costInfoText = formData.paymentStrategy === 'transitions' 
    ? TRANSITION_COST_SETTINGS.COST_INFO.TRANSITION_COST
    : TRANSITION_COST_SETTINGS.COST_INFO.PLACEMENT_COST
  
  return costInfoText.totalCost.replace('{total}', costInfo.totalCost.toString())
}

export function getBalanceText(formData: TransitionCostSettingsForm, costInfo: TransitionCostInfo): string {
  const costInfoText = formData.paymentStrategy === 'transitions' 
    ? TRANSITION_COST_SETTINGS.COST_INFO.TRANSITION_COST
    : TRANSITION_COST_SETTINGS.COST_INFO.PLACEMENT_COST
  
  return costInfoText.balance.replace('{balance}', costInfo.balance.toString())
}

export function validateTransitionCostForm(formData: TransitionCostSettingsForm): Record<string, string> {
  const errors: Record<string, string> = {}
  
  if (formData.paymentStrategy === 'transitions' && formData.transitionsCount < 0) {
    errors.transitionsCount = 'Количество переходов не может быть отрицательным'
  }
  
  if (formData.paymentStrategy === 'publication-period' && formData.publicationDays < 0) {
    errors.publicationDays = 'Количество дней не может быть отрицательным'
  }
  
  if (formData.budgetLimit < 0) {
    errors.budgetLimit = 'Бюджет не может быть отрицательным'
  }
  
  return errors
}

export function createInitialFormData(): TransitionCostSettingsForm {
  return {
    whoCanTransition: 'all',
    paymentStrategy: 'transitions',
    transitionsCount: 0,
    publicationDays: 0,
    budgetLimit: 0,
    disableByDate: ''
  }
}

export function createInitialCostInfo(): TransitionCostInfo {
  return {
    costPerTransition: 100,
    totalCost: 0,
    balance: 3000
  }
}
