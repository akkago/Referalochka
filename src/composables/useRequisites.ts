import { ref, reactive } from 'vue'
import { requisitesData } from '@/data/mockData'
import type { RequisitesData, BankRequisite } from '@/types'

export function useRequisites() {
  // State
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)
  
  const data = reactive<RequisitesData>({
    company: { ...requisitesData.company },
    head: { ...requisitesData.head },
    bankRequisites: [...requisitesData.bankRequisites]
  })

  // Methods
  const loadRequisites = async (): Promise<void> => {
    isLoading.value = true
    error.value = null
    
    try {
      // Здесь можно добавить API вызов
      // const response = await api.getRequisites()
      // Object.assign(data, response.data)
      
      // Пока используем mock данные
      Object.assign(data, requisitesData)
    } catch (err) {
      error.value = 'Ошибка при загрузке реквизитов'
      console.error('Error loading requisites:', err)
    } finally {
      isLoading.value = false
    }
  }

  const saveRequisites = async (requisitesData: RequisitesData): Promise<{ success: boolean; error?: string }> => {
    isLoading.value = true
    error.value = null
    
    try {
      // Здесь можно добавить API вызов
      // await api.saveRequisites(requisitesData)
      
      // Обновляем локальные данные
      Object.assign(data, requisitesData)
      
      console.log('Requisites saved successfully:', requisitesData)
      return { success: true }
    } catch (err) {
      error.value = 'Ошибка при сохранении реквизитов'
      console.error('Error saving requisites:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const addBankRequisite = (): void => {
    const newRequisite: BankRequisite = {
      id: `requisite-${Date.now()}`,
      bic: '',
      currentAccount: '',
      bank: '',
      correspondentAccount: '',
      isDefault: false
    }
    
    data.bankRequisites.push(newRequisite)
  }

  const removeBankRequisite = (id: string): void => {
    const index = data.bankRequisites.findIndex(r => r.id === id)
    if (index !== -1) {
      data.bankRequisites.splice(index, 1)
    }
  }

  const setDefaultRequisite = (id: string): void => {
    data.bankRequisites.forEach(requisite => {
      requisite.isDefault = requisite.id === id
    })
  }

  const updateRequisites = async (): Promise<{ success: boolean; error?: string }> => {
    isLoading.value = true
    error.value = null
    
    try {
      // Здесь можно добавить API вызов для обновления данных
      // await api.updateRequisites()
      
      console.log('Requisites updated successfully')
      return { success: true }
    } catch (err) {
      error.value = 'Ошибка при обновлении реквизитов'
      console.error('Error updating requisites:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  return {
    // State
    isLoading,
    error,
    data,
    
    // Methods
    loadRequisites,
    saveRequisites,
    addBankRequisite,
    removeBankRequisite,
    setDefaultRequisite,
    updateRequisites
  }
}
