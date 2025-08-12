import { ref, computed } from 'vue'
import type { ProfileTab, InvestorProfile } from '@/types'
import { profileTabs, investorProfile } from '@/data/mockData'

export function useProfile() {
  // Reactive state
  const activeTab = ref('investor')
  const currentProfile = ref<InvestorProfile>(investorProfile)
  
  // Computed
  const currentTabs = computed(() => {
    return profileTabs.map(tab => ({
      ...tab,
      isActive: tab.id === activeTab.value
    }))
  })
  
  const isInvestorTabActive = computed(() => activeTab.value === 'investor')
  const isPartnerTabActive = computed(() => activeTab.value === 'partner')
  const isRequisitesTabActive = computed(() => activeTab.value === 'requisites')
  
  // Methods
  const setActiveTab = (tabId: string) => {
    activeTab.value = tabId
  }
  
  const handleProfileAction = (actionId: string) => {
    console.log('Profile action:', actionId)
    
    switch (actionId) {
      case 'add-organization':
        // Логика добавления организации
        console.log('Adding organization...')
        break
      case 'verify':
        // Логика верификации
        console.log('Starting verification...')
        break
      default:
        console.log('Unknown action:', actionId)
    }
  }
  
  const updateProfileStatus = (status: 'pending' | 'verified' | 'rejected') => {
    currentProfile.value = {
      ...currentProfile.value,
      status
    }
  }
  
  return {
    // State
    activeTab,
    currentProfile,
    
    // Computed
    currentTabs,
    isInvestorTabActive,
    isPartnerTabActive,
    isRequisitesTabActive,
    
    // Methods
    setActiveTab,
    handleProfileAction,
    updateProfileStatus
  }
}
