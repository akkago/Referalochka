<template>
  <div class="transition-cost-settings">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <!-- Title -->
      <h3 class="text-xl font-semibold text-gray-800 mb-6">
        {{ TRANSITION_COST_SETTINGS.TITLE }}
      </h3>
      
      <!-- Form -->
      <v-form ref="form" v-model="isFormValid" class="space-y-6">
        <!-- Who can transition -->
        <div class="field-group">
          <div class="flex items-center gap-2 mb-3">
            <label class="text-sm font-medium text-gray-700">
              {{ TRANSITION_COST_SETTINGS.WHO_CAN_TRANSITION.label }}
            </label>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-icon
                  v-bind="props"
                  size="small"
                  color="primary"
                  class="cursor-help"
                >
                  mdi-help-circle
                </v-icon>
              </template>
              <span>Выберите, кто может переходить по ссылке</span>
            </v-tooltip>
          </div>
                      <v-radio-group
              v-model="formData.whoCanTransition"
              hide-details
              @update:model-value="handleFieldUpdate('whoCanTransition')"
            >
            <v-radio
              v-for="option in Object.values(TRANSITION_COST_SETTINGS.WHO_CAN_TRANSITION.options)"
              :key="option.value"
              :value="option.value"
              :label="option.label"
              color="primary"
            />
          </v-radio-group>
        </div>
        
        <!-- Payment Strategy -->
        <div class="field-group">
          <label class="text-sm font-medium text-gray-700 mb-3">
            {{ TRANSITION_COST_SETTINGS.PAYMENT_STRATEGY.label }}
          </label>
                      <v-radio-group
              v-model="formData.paymentStrategy"
              hide-details
              @update:model-value="handleFieldUpdate('paymentStrategy')"
            >
            <v-radio
              v-for="option in Object.values(TRANSITION_COST_SETTINGS.PAYMENT_STRATEGY.options)"
              :key="option.value"
              :value="option.value"
              :label="option.label"
              color="primary"
            />
          </v-radio-group>
        </div>
        
        <!-- Transitions Count or Publication Days -->
        <div class="field-group">
          <div class="flex items-center gap-2">
            <v-text-field
              v-model.number="formData.transitionsCount"
              v-if="formData.paymentStrategy === 'transitions'"
              type="number"
              :placeholder="TRANSITION_COST_SETTINGS.TRANSITIONS_COUNT.placeholder"
              variant="outlined"
              density="compact"
              hide-details
              class="max-w-32"
                              @update:model-value="handleFieldUpdate('transitionsCount')"
            />
            <v-text-field
              v-model.number="formData.publicationDays"
              v-else
              type="number"
              :placeholder="TRANSITION_COST_SETTINGS.PUBLICATION_DAYS.placeholder"
              variant="outlined"
              density="compact"
              hide-details
              class="max-w-32"
                              @update:model-value="handleFieldUpdate('publicationDays')"
            />
            <span class="text-sm text-gray-600">
              {{ formData.paymentStrategy === 'transitions' 
                ? TRANSITION_COST_SETTINGS.TRANSITIONS_COUNT.label 
                : TRANSITION_COST_SETTINGS.PUBLICATION_DAYS.label 
              }}
            </span>
          </div>
        </div>
        
        <!-- Cost Info Box -->
        <div v-if="shouldShowCostInfo" class="cost-info-box">
          <div class="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <v-icon color="primary" size="small" class="mt-0.5">
              mdi-information
            </v-icon>
            <div class="flex-1">
              <h4 class="text-sm font-medium text-gray-800 mb-2">
                {{ getCostInfoTitleComputed }}
              </h4>
              <div class="space-y-1 text-sm text-gray-600">
                <div>{{ getCostPerUnitTextComputed }}</div>
                <div>{{ getTotalCostTextComputed }}</div>
                <div>{{ getBalanceTextComputed }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Budget Limit -->
        <div class="field-group">
          <div class="flex items-center gap-2">
            <v-text-field
              v-model.number="formData.budgetLimit"
              type="number"
              :placeholder="TRANSITION_COST_SETTINGS.BUDGET_LIMIT.placeholder"
              variant="outlined"
              density="compact"
              hide-details
              class="max-w-32"
                              @update:model-value="handleFieldUpdate('budgetLimit')"
            />
            <span class="text-sm text-gray-600">
              {{ TRANSITION_COST_SETTINGS.BUDGET_LIMIT.suffix }}
            </span>
          </div>
        </div>
        
        <!-- Disable by Date -->
        <div class="field-group">
          <label class="text-sm font-medium text-gray-700 mb-2">
            {{ TRANSITION_COST_SETTINGS.DISABLE_BY_DATE.label }}
          </label>
          <v-text-field
            v-model="formData.disableByDate"
            :placeholder="TRANSITION_COST_SETTINGS.DISABLE_BY_DATE.placeholder"
            variant="outlined"
            density="compact"
            hide-details
            class="max-w-48"
            prepend-inner-icon="mdi-calendar"
                            @update:model-value="handleFieldUpdate('disableByDate')"
          />
        </div>
      </v-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TransitionCostSettingsForm, TransitionCostInfo } from '@/types'
import { TRANSITION_COST_SETTINGS } from '@/constants'
import { useTransitionCostSettings } from '@/composables/useTransitionCostSettings'
import {
  getCostInfoTitle,
  getCostPerUnitText,
  getTotalCostText,
  getBalanceText
} from '@/utils/transitionCostUtils'

interface Props {
  initialData?: Partial<TransitionCostSettingsForm>
  costInfo?: TransitionCostInfo
}

interface Emits {
  (e: 'update', data: TransitionCostSettingsForm): void
  (e: 'submit', data: TransitionCostSettingsForm): void
}

const props = withDefaults(defineProps<Props>(), {
  initialData: () => ({}),
  costInfo: () => ({
    costPerTransition: 100,
    totalCost: 0,
    balance: 3000
  })
})

const emit = defineEmits<Emits>()

// Use composable
const {
  formData,
  costInfo,
  formState,
  shouldShowCostInfo,
  currentUnitLabel,
  currentUnitPlaceholder,
  handleFieldChange,
  validateForm
} = useTransitionCostSettings(props.initialData, props.costInfo)

// State
const form = ref()
const isFormValid = ref(true)

// Methods
const handleFieldUpdate = (fieldName: keyof TransitionCostSettingsForm) => {
  handleFieldChange(fieldName)
  emit('update', { ...formData })
}

const getCostInfoTitleComputed = computed(() => getCostInfoTitle(formData))
const getCostPerUnitTextComputed = computed(() => getCostPerUnitText(formData, costInfo))
const getTotalCostTextComputed = computed(() => getTotalCostText(formData, costInfo))
const getBalanceTextComputed = computed(() => getBalanceText(formData, costInfo))
</script>

<style scoped>
.transition-cost-settings {
  min-height: 400px;
}

.field-group {
  display: flex;
  flex-direction: column;
}

.cost-info-box {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
