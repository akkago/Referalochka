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
          <InvestorProfileCard @action-click="handleActionClick" />
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
              Здесь будет содержимое анкеты партнера
            </p>
          </div>
        </div>
        
        <div v-else-if="isRequisitesTabActive" class="requisites-content">
          <div class="text-center py-12">
            <v-icon size="64" color="grey" class="mb-4">
              mdi-bank
            </v-icon>
            <h3 class="text-lg font-medium text-gray-600 mb-2">
              Реквизиты
            </h3>
            <p class="text-gray-500">
              Здесь будут отображаться реквизиты
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProfile } from '@/composables/useProfile'
import InvestorProfileCard from '@/components/InvestorProfileCard.vue'

const {
  activeTab,
  currentTabs,
  isInvestorTabActive,
  isPartnerTabActive,
  isRequisitesTabActive,
  setActiveTab,
  handleProfileAction
} = useProfile()

const handleTabClick = (tabId: string) => {
  setActiveTab(tabId)
  console.log('Tab clicked:', tabId)
}

const handleActionClick = (actionId: string) => {
  handleProfileAction(actionId)
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
</style>
