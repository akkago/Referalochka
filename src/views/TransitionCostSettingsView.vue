<template>
  <div class="transition-cost-settings-view">
    <div class="bg-gray-100 min-h-screen p-8">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">
            Демонстрация настроек стоимости перехода
          </h1>
          <p class="text-gray-600">
            Три варианта отображения формы согласно макету
          </p>
        </div>
        
        <!-- Three Variants Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Variant 1: Transitions without cost info -->
          <div class="variant-card">
            <div class="bg-white rounded-lg shadow-lg p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-4 text-center">
                Вариант 1: Количество переходов (без информации о стоимости)
              </h3>
              <TransitionCostSettings
                :initial-data="variant1Data"
                :cost-info="variant1CostInfo"
                @update="handleVariant1Update"
              />
            </div>
          </div>
          
          <!-- Variant 2: Transitions with cost info -->
          <div class="variant-card">
            <div class="bg-white rounded-lg shadow-lg p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-4 text-center">
                Вариант 2: Количество переходов (с информацией о стоимости)
              </h3>
              <TransitionCostSettings
                :initial-data="variant2Data"
                :cost-info="variant2CostInfo"
                @update="handleVariant2Update"
              />
            </div>
          </div>
          
          <!-- Variant 3: Publication period with cost info -->
          <div class="variant-card">
            <div class="bg-white rounded-lg shadow-lg p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-4 text-center">
                Вариант 3: Срок публикации (с информацией о стоимости)
              </h3>
              <TransitionCostSettings
                :initial-data="variant3Data"
                :cost-info="variant3CostInfo"
                @update="handleVariant3Update"
              />
            </div>
          </div>
        </div>
        
        <!-- Controls -->
        <div class="mt-8 text-center">
          <div class="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">
              Управление демонстрацией
            </h3>
            <div class="space-y-4">
              <div class="flex justify-center gap-4">
                <v-btn
                  color="primary"
                  variant="outlined"
                  @click="resetToDefaults"
                >
                  Сбросить к значениям по умолчанию
                </v-btn>
                <v-btn
                  color="success"
                  variant="outlined"
                  @click="showCurrentData"
                >
                  Показать текущие данные
                </v-btn>
              </div>
              
              <div v-if="showData" class="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 class="font-medium text-gray-800 mb-2">Текущие данные:</h4>
                <pre class="text-sm text-gray-600 overflow-auto">{{ JSON.stringify(currentData, null, 2) }}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import TransitionCostSettings from '@/components/TransitionCostSettings.vue'
import type { TransitionCostSettingsForm, TransitionCostInfo } from '@/types'
import { transitionCostSettingsData } from '@/data/mockData'

// State
const showData = ref(false)
const currentData = ref({})

// Variant 1: Transitions without cost info
const variant1Data = reactive<TransitionCostSettingsForm>({
  ...transitionCostSettingsData.transitionsWithoutCost
})

const variant1CostInfo = reactive<TransitionCostInfo>({
  ...transitionCostSettingsData.transitionsWithoutCost.costInfo
})

// Variant 2: Transitions with cost info
const variant2Data = reactive<TransitionCostSettingsForm>({
  ...transitionCostSettingsData.transitionsWithCost
})

const variant2CostInfo = reactive<TransitionCostInfo>({
  ...transitionCostSettingsData.transitionsWithCost.costInfo
})

// Variant 3: Publication period with cost info
const variant3Data = reactive<TransitionCostSettingsForm>({
  ...transitionCostSettingsData.publicationPeriodWithCost
})

const variant3CostInfo = reactive<TransitionCostInfo>({
  ...transitionCostSettingsData.publicationPeriodWithCost.costInfo
})

// Methods
const handleVariant1Update = (data: TransitionCostSettingsForm) => {
  Object.assign(variant1Data, data)
  updateCurrentData()
}

const handleVariant2Update = (data: TransitionCostSettingsForm) => {
  Object.assign(variant2Data, data)
  updateCurrentData()
}

const handleVariant3Update = (data: TransitionCostSettingsForm) => {
  Object.assign(variant3Data, data)
  updateCurrentData()
}

const resetToDefaults = () => {
  Object.assign(variant1Data, transitionCostSettingsData.transitionsWithoutCost)
  Object.assign(variant2Data, transitionCostSettingsData.transitionsWithCost)
  Object.assign(variant3Data, transitionCostSettingsData.publicationPeriodWithCost)
  
  Object.assign(variant1CostInfo, transitionCostSettingsData.transitionsWithoutCost.costInfo)
  Object.assign(variant2CostInfo, transitionCostSettingsData.transitionsWithCost.costInfo)
  Object.assign(variant3CostInfo, transitionCostSettingsData.publicationPeriodWithCost.costInfo)
  
  updateCurrentData()
}

const showCurrentData = () => {
  showData.value = !showData.value
  if (showData.value) {
    updateCurrentData()
  }
}

const updateCurrentData = () => {
  currentData.value = {
    variant1: { ...variant1Data, costInfo: { ...variant1CostInfo } },
    variant2: { ...variant2Data, costInfo: { ...variant2CostInfo } },
    variant3: { ...variant3Data, costInfo: { ...variant3CostInfo } }
  }
}
</script>

<style scoped>
.transition-cost-settings-view {
  min-height: 100vh;
}

.variant-card {
  transition: transform 0.2s ease-in-out;
}

.variant-card:hover {
  transform: translateY(-2px);
}
</style>
