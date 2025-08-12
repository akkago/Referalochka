<template>
  <div class="partner-form-view">
    <div class="pa-6">
      <!-- Page Header -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-800">
          Анкета партнера
        </h1>
      </div>
      
      <!-- Form Content with Border -->
      <div class="border-2 border-dashed border-blue-400 rounded-lg p-6 bg-white">
        <!-- Tabs -->
        <div class="mb-8">
          <v-tabs
            v-model="activeTab"
            color="primary"
            class="border-b border-gray-200"
          >
            <v-tab
              value="investor"
              class="text-sm font-medium"
              @click="navigateToInvestor"
            >
              Анкета инвестора
            </v-tab>
            <v-tab
              value="partner"
              class="text-sm font-medium"
            >
              Анкета партнера
            </v-tab>
            <v-tab
              value="requisites"
              class="text-sm font-medium"
              @click="navigateToRequisites"
            >
              Реквизиты
            </v-tab>
          </v-tabs>
        </div>

        <!-- Partner Form -->
        <PartnerFormCard @submit="handleSubmit" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PartnerFormCard from '@/components/PartnerFormCard.vue'
import { ROUTES } from '@/constants'

const router = useRouter()
const activeTab = ref('partner')

const handleSubmit = (data: any) => {
  console.log('Partner form submitted:', data)
  alert('Анкета партнера успешно отправлена!')
  router.push({ name: ROUTES.PROFILE })
}

const navigateToInvestor = () => {
  router.push({ name: ROUTES.INVESTOR_FORM })
}

const navigateToRequisites = () => {
  // Пока просто возвращаемся в профиль
  router.push({ name: ROUTES.PROFILE })
}
</script>

<style scoped>
.partner-form-view {
  min-height: 100vh;
  background-color: #f9fafb;
}
</style>
