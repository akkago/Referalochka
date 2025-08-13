import { describe, it, expect } from 'vitest'
import {
  shouldShowCostInfo,
  getCurrentUnitLabel,
  getCurrentUnitPlaceholder,
  calculateTotalCost,
  getCostInfoTitle,
  getCostPerUnitText,
  getTotalCostText,
  getBalanceText,
  validateTransitionCostForm,
  createInitialFormData,
  createInitialCostInfo
} from '../transitionCostUtils'
import type { TransitionCostSettingsForm, TransitionCostInfo } from '@/types'

describe('transitionCostUtils', () => {
  const mockFormData: TransitionCostSettingsForm = {
    whoCanTransition: 'all',
    paymentStrategy: 'transitions',
    transitionsCount: 10,
    publicationDays: 5,
    budgetLimit: 1000,
    disableByDate: '31.12.2025'
  }

  const mockCostInfo: TransitionCostInfo = {
    costPerTransition: 100,
    totalCost: 1000,
    balance: 3000
  }

  describe('shouldShowCostInfo', () => {
    it('should return true for transitions with count > 0', () => {
      const formData = { ...mockFormData, paymentStrategy: 'transitions', transitionsCount: 5 }
      expect(shouldShowCostInfo(formData)).toBe(true)
    })

    it('should return true for publication-period with days > 0', () => {
      const formData = { ...mockFormData, paymentStrategy: 'publication-period', publicationDays: 3 }
      expect(shouldShowCostInfo(formData)).toBe(true)
    })

    it('should return false for transitions with count = 0', () => {
      const formData = { ...mockFormData, paymentStrategy: 'transitions', transitionsCount: 0 }
      expect(shouldShowCostInfo(formData)).toBe(false)
    })

    it('should return false for publication-period with days = 0', () => {
      const formData = { ...mockFormData, paymentStrategy: 'publication-period', publicationDays: 0 }
      expect(shouldShowCostInfo(formData)).toBe(false)
    })
  })

  describe('getCurrentUnitLabel', () => {
    it('should return transitions label for transitions strategy', () => {
      const formData = { ...mockFormData, paymentStrategy: 'transitions' }
      expect(getCurrentUnitLabel(formData)).toBe('переходов')
    })

    it('should return days label for publication-period strategy', () => {
      const formData = { ...mockFormData, paymentStrategy: 'publication-period' }
      expect(getCurrentUnitLabel(formData)).toBe('дней')
    })
  })

  describe('getCurrentUnitPlaceholder', () => {
    it('should return transitions placeholder for transitions strategy', () => {
      const formData = { ...mockFormData, paymentStrategy: 'transitions' }
      expect(getCurrentUnitPlaceholder(formData)).toBe('0')
    })

    it('should return days placeholder for publication-period strategy', () => {
      const formData = { ...mockFormData, paymentStrategy: 'publication-period' }
      expect(getCurrentUnitPlaceholder(formData)).toBe('0')
    })
  })

  describe('calculateTotalCost', () => {
    it('should calculate total cost for transitions', () => {
      const formData = { ...mockFormData, paymentStrategy: 'transitions', transitionsCount: 5 }
      const costInfo = { ...mockCostInfo, costPerTransition: 100 }
      expect(calculateTotalCost(formData, costInfo)).toBe(500)
    })

    it('should calculate total cost for publication-period', () => {
      const formData = { ...mockFormData, paymentStrategy: 'publication-period', publicationDays: 3 }
      const costInfo = { ...mockCostInfo, costPerTransition: 200 }
      expect(calculateTotalCost(formData, costInfo)).toBe(600)
    })
  })

  describe('getCostInfoTitle', () => {
    it('should return transition cost title for transitions strategy', () => {
      const formData = { ...mockFormData, paymentStrategy: 'transitions' }
      expect(getCostInfoTitle(formData)).toBe('Стоимость перехода')
    })

    it('should return placement cost title for publication-period strategy', () => {
      const formData = { ...mockFormData, paymentStrategy: 'publication-period' }
      expect(getCostInfoTitle(formData)).toBe('Стоимость размещения')
    })
  })

  describe('getCostPerUnitText', () => {
    it('should return transition cost text for transitions strategy', () => {
      const formData = { ...mockFormData, paymentStrategy: 'transitions' }
      const costInfo = { ...mockCostInfo, costPerTransition: 150 }
      expect(getCostPerUnitText(formData, costInfo)).toBe('Один переход: 150 рублей')
    })

    it('should return placement cost text for publication-period strategy', () => {
      const formData = { ...mockFormData, paymentStrategy: 'publication-period' }
      const costInfo = { ...mockCostInfo, costPerTransition: 200 }
      expect(getCostPerUnitText(formData, costInfo)).toBe('Один размещения на 24 часа: 200 рублей')
    })
  })

  describe('getTotalCostText', () => {
    it('should return total cost text with formatted value', () => {
      const formData = { ...mockFormData, paymentStrategy: 'transitions' }
      const costInfo = { ...mockCostInfo, totalCost: 1500 }
      expect(getTotalCostText(formData, costInfo)).toBe('Итого: 1500 рублей')
    })
  })

  describe('getBalanceText', () => {
    it('should return balance text with formatted value', () => {
      const formData = { ...mockFormData, paymentStrategy: 'transitions' }
      const costInfo = { ...mockCostInfo, balance: 5000 }
      expect(getBalanceText(formData, costInfo)).toBe('Баланс: 5000 рублей')
    })
  })

  describe('validateTransitionCostForm', () => {
    it('should return empty errors for valid form', () => {
      const formData = { ...mockFormData, transitionsCount: 5, budgetLimit: 1000 }
      const errors = validateTransitionCostForm(formData)
      expect(errors).toEqual({})
    })

    it('should return error for negative transitions count', () => {
      const formData = { ...mockFormData, paymentStrategy: 'transitions', transitionsCount: -1 }
      const errors = validateTransitionCostForm(formData)
      expect(errors.transitionsCount).toBe('Количество переходов не может быть отрицательным')
    })

    it('should return error for negative publication days', () => {
      const formData = { ...mockFormData, paymentStrategy: 'publication-period', publicationDays: -1 }
      const errors = validateTransitionCostForm(formData)
      expect(errors.publicationDays).toBe('Количество дней не может быть отрицательным')
    })

    it('should return error for negative budget limit', () => {
      const formData = { ...mockFormData, budgetLimit: -100 }
      const errors = validateTransitionCostForm(formData)
      expect(errors.budgetLimit).toBe('Бюджет не может быть отрицательным')
    })
  })

  describe('createInitialFormData', () => {
    it('should return initial form data with default values', () => {
      const initialData = createInitialFormData()
      expect(initialData).toEqual({
        whoCanTransition: 'all',
        paymentStrategy: 'transitions',
        transitionsCount: 0,
        publicationDays: 0,
        budgetLimit: 0,
        disableByDate: ''
      })
    })
  })

  describe('createInitialCostInfo', () => {
    it('should return initial cost info with default values', () => {
      const initialCostInfo = createInitialCostInfo()
      expect(initialCostInfo).toEqual({
        costPerTransition: 100,
        totalCost: 0,
        balance: 3000
      })
    })
  })
})
