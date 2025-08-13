<template>
  <div class="profile-view">
    <div class="pa-6">
      <!-- Page Header -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-800">
          Личный профиль
        </h1>
      </div>
      
      <!-- Profile Content with Border -->
      <div class="border-2 border-dashed border-blue-400 rounded-lg p-6 bg-white">
        <!-- Tabs -->
        <div class="mb-8">
          <v-tabs
            v-model="activeTab"
            color="primary"
            class="border-b border-gray-200"
          >
            <v-tab
              v-for="tab in currentTabs"
              :key="tab.id"
              :value="tab.id"
              class="text-sm font-medium"
              @click="handleTabClick(tab.id)"
            >
              {{ tab.title }}
            </v-tab>
          </v-tabs>
        </div>
        
        <!-- Tab Content -->
        <div v-if="isInvestorTabActive" class="investor-content">
          <InvestorProfileCard 
            :form-data="investorFormData"
            :rejection-warning="investorRejectionWarning"
            @action-click="handleActionClick"
            @edit="handleInvestorEdit"
            @resubmit="handleInvestorResubmit"
          />
        </div>
        
        <div v-else-if="isPartnerTabActive" class="partner-content">
          <div class="text-center py-12">
            <v-icon size="64" color="grey" class="mb-4">
              mdi-account-group
            </v-icon>
            <h3 class="text-lg font-medium text-gray-600 mb-2">
              Анкета партнера
            </h3>
            <p class="text-gray-500">
              Переход на страницу анкеты партнера...
            </p>
          </div>
        </div>
        
        <div v-else-if="isRequisitesTabActive" class="requisites-content">
          <RequisitesCard
            :initial-data="requisitesData"
            @submit="handleRequisitesSubmit"
            @cancel="handleRequisitesCancel"
            @update="handleRequisitesUpdate"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useProfile } from '@/composables/useProfile'
import { useRequisites } from '@/composables/useRequisites'
import { useFilledInvestorForm } from '@/composables/useFilledInvestorForm'
import InvestorProfileCard from '@/components/InvestorProfileCard.vue'
import RequisitesCard from '@/components/RequisitesCard.vue'
import { ROUTES } from '@/constants'
import { requisitesData } from '@/data/mockData'
import type { RequisitesData } from '@/types'

const router = useRouter()

const {
  activeTab,
  currentTabs,
  isInvestorTabActive,
  isPartnerTabActive,
  isRequisitesTabActive,
  setActiveTab,
  handleProfileAction
} = useProfile()

const { saveRequisites, updateRequisites } = useRequisites()

// Filled investor form data
const {
  formData: investorFormData,
  warning: investorRejectionWarning,
  resubmitForm
} = useFilledInvestorForm()

const handleTabClick = (tabId: string) => {
  setActiveTab(tabId)
  console.log('Tab clicked:', tabId)
  
  // Если кликнули на вкладку "Анкета партнера", переходим на отдельную страницу
  if (tabId === 'partner') {
    router.push({ name: ROUTES.PARTNER_FORM })
  }
}

const handleActionClick = (actionId: string) => {
  handleProfileAction(actionId)
}

const handleInvestorEdit = () => {
  // Navigate to edit form
  router.push({ name: ROUTES.INVESTOR_FORM })
}

const handleInvestorResubmit = async () => {
  const result = await resubmitForm()
  
  if (result.success) {
    console.log('Investor form resubmitted successfully')
  } else {
    console.error('Failed to resubmit investor form:', result.error)
  }
}

const handleRequisitesSubmit = async (data: RequisitesData) => {
  const result = await saveRequisites(data)
  if (result.success) {
    console.log('Requisites saved successfully')
  } else {
    console.error('Failed to save requisites:', result.error)
  }
}

const handleRequisitesCancel = () => {
  console.log('Requisites form cancelled')
}

const handleRequisitesUpdate = async () => {
  const result = await updateRequisites()
  if (result.success) {
    console.log('Requisites updated successfully')
  } else {
    console.error('Failed to update requisites:', result.error)
  }
}
</script>

<style scoped>
.profile-view {
  min-height: 100vh;
  background-color: #f9fafb;
}

.investor-content {
  min-height: 400px;
}

.partner-content {
  min-height: 400px;
}

.requisites-content {
  min-height: 400px;
}
</style>
