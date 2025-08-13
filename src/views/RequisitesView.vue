<template>
  <div class="requisites-view">
    <div class="bg-white rounded-lg border border-blue-200 p-8">
      <!-- Tabs -->
      <div class="mb-8">
        <v-tabs
          v-model="activeTab"
          color="primary"
          class="mb-6"
        >
          <v-tab
            v-for="tab in profileTabs"
            :key="tab.id"
            :value="tab.id"
            :class="[
              'text-sm font-medium',
              tab.isActive ? 'text-blue-600' : 'text-gray-600'
            ]"
          >
            {{ tab.title }}
          </v-tab>
        </v-tabs>
      </div>

      <!-- Requisites Content -->
      <RequisitesCard
        :initial-data="requisitesData"
        @submit="handleSubmit"
        @cancel="handleCancel"
        @update="handleUpdate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import RequisitesCard from '@/components/RequisitesCard.vue'
import { profileTabs } from '@/data/mockData'
import { useRequisites } from '@/composables/useRequisites'
import { ROUTES } from '@/constants'
import type { RequisitesData } from '@/types'

const router = useRouter()
const { data: requisitesData, saveRequisites, updateRequisites, isLoading, error } = useRequisites()

// Active tab
const activeTab = ref('requisites')

// Computed
const updatedProfileTabs = computed(() => {
  return profileTabs.map(tab => ({
    ...tab,
    isActive: tab.id === activeTab.value
  }))
})

// Load data on mount
onMounted(() => {
  // Data is already loaded from mock
})

// Methods
const handleSubmit = async (data: RequisitesData) => {
  const result = await saveRequisites(data)
  
  if (result.success) {
    router.push({ name: ROUTES.PROFILE })
  } else {
    console.error('Failed to save requisites:', result.error)
  }
}

const handleCancel = () => {
  router.push({ name: ROUTES.PROFILE })
}

const handleUpdate = async () => {
  const result = await updateRequisites()
  
  if (result.success) {
    console.log('Requisites updated successfully')
  } else {
    console.error('Failed to update requisites:', result.error)
  }
}
</script>

<style scoped>
.requisites-view {
  min-height: 100vh;
  background-color: #f8fafc;
}

/* Custom tab styling */
.v-tabs {
  border-bottom: 1px solid #e5e7eb;
}

.v-tab {
  text-transform: none;
  font-weight: 500;
  min-width: 120px;
}

.v-tab--selected {
  color: #2563eb !important;
  border-bottom: 2px solid #2563eb;
}
</style>
