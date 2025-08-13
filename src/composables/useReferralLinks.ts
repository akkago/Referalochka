import { ref, reactive, computed } from 'vue'
import type { ReferralLink, ReferralLinkForm, ReferralLinkFormState, ReferralLinkStats } from '@/types'
import { referralLinks, initialReferralLinkForm, referralLinkStats } from '@/data/mockData'

export function useReferralLinks() {
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const links = ref<ReferralLink[]>(referralLinks)
  const stats = ref<ReferralLinkStats>(referralLinkStats)

  const form = reactive<ReferralLinkForm>({
    ...initialReferralLinkForm
  })

  const formState = reactive<ReferralLinkFormState>({
    isSubmitting: false,
    errors: {},
    isValid: false
  })

  const isFormValid = computed(() => {
    return form.name.trim().length >= 3 && 
           form.name.trim().length <= 50 && 
           isValidUrl(form.url) &&
           (!form.description || form.description.trim().length <= 200)
  })

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const validateField = (fieldName: keyof ReferralLinkForm): boolean => {
    const value = form[fieldName]
    let isValid = true
    let errorMessage = ''

    switch (fieldName) {
      case 'name':
        const nameValue = value as string
        if (!nameValue || nameValue.trim().length === 0) {
          isValid = false
          errorMessage = 'Название ссылки обязательно'
        } else if (nameValue.trim().length < 3) {
          isValid = false
          errorMessage = 'Название должно содержать минимум 3 символа'
        } else if (nameValue.trim().length > 50) {
          isValid = false
          errorMessage = 'Название не должно превышать 50 символов'
        }
        break
      case 'url':
        const urlValue = value as string
        if (!urlValue || urlValue.trim().length === 0) {
          isValid = false
          errorMessage = 'URL ссылки обязателен'
        } else if (!isValidUrl(urlValue)) {
          isValid = false
          errorMessage = 'Введите корректный URL'
        }
        break
      case 'description':
        const descValue = value as string
        if (descValue && descValue.trim().length > 200) {
          isValid = false
          errorMessage = 'Описание не должно превышать 200 символов'
        }
        break
    }

    if (isValid) {
      delete formState.errors[fieldName]
    } else {
      formState.errors[fieldName] = errorMessage
    }

    return isValid
  }

  const validateForm = (): boolean => {
    const fields: (keyof ReferralLinkForm)[] = ['name', 'url', 'description']
    const isValid = fields.every(field => validateField(field))
    formState.isValid = isValid
    return isValid
  }

  const loadLinks = async (): Promise<void> => {
    isLoading.value = true
    error.value = null
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // In a real app, you would fetch data from API
      // const response = await api.getReferralLinks()
      // links.value = response.data
      
      updateStats()
    } catch (err) {
      error.value = 'Ошибка при загрузке реферальных ссылок'
      console.error('Failed to load referral links:', err)
    } finally {
      isLoading.value = false
    }
  }

  const createLink = async (linkData: ReferralLinkForm): Promise<{ success: boolean; error?: string }> => {
    formState.isSubmitting = true
    error.value = null
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would make an API call
      // const response = await api.createReferralLink(linkData)
      
      const newLink: ReferralLink = {
        id: Date.now().toString(),
        ...linkData,
        clicks: 0,
        conversions: 0,
        earnings: 0,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      }
      
      links.value.push(newLink)
      updateStats()
      
      return { success: true }
    } catch (err) {
      error.value = 'Ошибка при создании ссылки'
      console.error('Failed to create referral link:', err)
      return { success: false, error: error.value }
    } finally {
      formState.isSubmitting = false
    }
  }

  const updateLink = async (linkId: string, linkData: ReferralLinkForm): Promise<{ success: boolean; error?: string }> => {
    formState.isSubmitting = true
    error.value = null
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would make an API call
      // const response = await api.updateReferralLink(linkId, linkData)
      
      const index = links.value.findIndex(link => link.id === linkId)
      if (index !== -1) {
        links.value[index] = {
          ...links.value[index],
          ...linkData,
          updatedAt: new Date().toISOString().split('T')[0]
        }
        updateStats()
      }
      
      return { success: true }
    } catch (err) {
      error.value = 'Ошибка при обновлении ссылки'
      console.error('Failed to update referral link:', err)
      return { success: false, error: error.value }
    } finally {
      formState.isSubmitting = false
    }
  }

  const deleteLink = async (linkId: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // In a real app, you would make an API call
      // await api.deleteReferralLink(linkId)
      
      const index = links.value.findIndex(link => link.id === linkId)
      if (index !== -1) {
        links.value.splice(index, 1)
        updateStats()
      }
      
      return { success: true }
    } catch (err) {
      error.value = 'Ошибка при удалении ссылки'
      console.error('Failed to delete referral link:', err)
      return { success: false, error: error.value }
    }
  }

  const updateStats = (): void => {
    stats.value = {
      totalLinks: links.value.length,
      activeLinks: links.value.filter(link => link.isActive).length,
      totalClicks: links.value.reduce((sum, link) => sum + link.clicks, 0),
      totalConversions: links.value.reduce((sum, link) => sum + link.conversions, 0),
      totalEarnings: links.value.reduce((sum, link) => sum + link.earnings, 0)
    }
  }

  const resetForm = (): void => {
    Object.assign(form, initialReferralLinkForm)
    formState.errors = {}
    formState.isValid = false
    error.value = null
  }

  const updateForm = (updates: Partial<ReferralLinkForm>): void => {
    Object.assign(form, updates)
    validateForm()
  }

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
      return false
    }
  }

  return {
    isLoading,
    error,
    links,
    stats,
    form,
    formState,
    isFormValid,
    validateField,
    validateForm,
    loadLinks,
    createLink,
    updateLink,
    deleteLink,
    resetForm,
    updateForm,
    copyToClipboard
  }
}
