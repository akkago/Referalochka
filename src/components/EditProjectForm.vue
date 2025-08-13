<template>
  <div class="edit-project-form">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
      <!-- Header with Project ID and Enable Toggle -->
      <div class="flex justify-between items-center mb-8">
        <div class="flex items-center gap-4">
          <h2 class="text-2xl font-bold text-gray-800">
            {{ EDIT_PROJECT_SECTIONS.EDIT_PROJECT }}
          </h2>
          <span class="text-lg text-gray-600">
            {{ EDIT_PROJECT_FIELDS.PROJECT_ID.prefix }}{{ form.id }}
          </span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-600">
            {{ EDIT_PROJECT_FIELDS.ENABLE_PROJECT.label }}
          </span>
          <v-switch
            v-model="form.isEnabled"
            color="primary"
            hide-details
            @change="handleToggleChange"
          />
        </div>
      </div>

      <!-- Tabs -->
      <div class="mb-8">
        <v-tabs
          v-model="activeTab"
          color="primary"
          class="border-b border-gray-200"
        >
          <v-tab
            v-for="tab in tabs"
            :key="tab.id"
            :value="tab.id"
            class="text-sm font-medium"
            @click="handleTabClick(tab.id)"
          >
            {{ tab.title }}
          </v-tab>
        </v-tabs>
      </div>
      
      <!-- Form Content -->
      <div class="space-y-8">
        <!-- Edit Project Section -->
        <div class="form-section">
          <h3 class="text-xl font-semibold text-gray-800 mb-6">
            {{ EDIT_PROJECT_SECTIONS.EDIT_PROJECT }}
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Region -->
            <div class="field-group">
              <div class="flex items-center gap-2 mb-2">
                <label class="text-sm font-medium text-gray-700">
                  {{ EDIT_PROJECT_FIELDS.REGION.label }}
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
                  <span>Выберите регион проекта</span>
                </v-tooltip>
              </div>
              <v-select
                v-model="form.region"
                :items="REGIONS_EDIT"
                :placeholder="EDIT_PROJECT_FIELDS.REGION.placeholder"
                variant="outlined"
                density="compact"
                hide-details
                @update:model-value="validateField('region')"
              />
            </div>
            
            <!-- Project Type -->
            <div class="field-group">
              <label class="text-sm font-medium text-gray-700 mb-2">
                {{ EDIT_PROJECT_FIELDS.PROJECT_TYPE.label }}
              </label>
              <v-select
                v-model="form.projectType"
                :items="PROJECT_TYPES_EDIT"
                :placeholder="EDIT_PROJECT_FIELDS.PROJECT_TYPE.placeholder"
                variant="outlined"
                density="compact"
                hide-details
                @update:model-value="validateField('projectType')"
              />
            </div>
            
            <!-- Industry -->
            <div class="field-group">
              <label class="text-sm font-medium text-gray-700 mb-2">
                {{ EDIT_PROJECT_FIELDS.INDUSTRY.label }}
              </label>
              <v-select
                v-model="form.industry"
                :items="INDUSTRIES_EDIT"
                :placeholder="EDIT_PROJECT_FIELDS.INDUSTRY.placeholder"
                variant="outlined"
                density="compact"
                hide-details
                @update:model-value="validateField('industry')"
              />
            </div>
            
            <!-- Project Stage -->
            <div class="field-group">
              <label class="text-sm font-medium text-gray-700 mb-2">
                {{ EDIT_PROJECT_FIELDS.PROJECT_STAGE.label }}
              </label>
              <v-select
                v-model="form.projectStage"
                :items="PROJECT_STAGES_EDIT"
                :placeholder="EDIT_PROJECT_FIELDS.PROJECT_STAGE.placeholder"
                variant="outlined"
                density="compact"
                hide-details
                @update:model-value="validateField('projectStage')"
              />
            </div>
          </div>
          
          <!-- About Project -->
          <div class="mt-6">
            <label class="text-sm font-medium text-gray-700 mb-2">
              {{ EDIT_PROJECT_FIELDS.ABOUT.label }}
            </label>
            <div class="space-y-4">
              <v-text-field
                v-model="form.about.headline"
                :placeholder="EDIT_PROJECT_FIELDS.ABOUT.headline.placeholder"
                variant="outlined"
                density="compact"
                hide-details
                @update:model-value="validateField('about.headline')"
              />
              <v-textarea
                v-model="form.about.description"
                :placeholder="EDIT_PROJECT_FIELDS.ABOUT.description.placeholder"
                variant="outlined"
                density="compact"
                hide-details
                rows="4"
                auto-grow
                @update:model-value="validateField('about.description')"
              />
            </div>
          </div>
          
          <!-- Project Link -->
          <div class="mt-6">
            <label class="text-sm font-medium text-gray-700 mb-2">
              {{ EDIT_PROJECT_FIELDS.PROJECT_LINK.label }}
            </label>
            <p class="text-sm text-gray-500 mb-3">
              {{ EDIT_PROJECT_FIELDS.PROJECT_LINK.description }}
            </p>
            <div class="flex">
              <div class="flex-shrink-0 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg px-3 py-2 text-sm text-gray-600">
                https://
              </div>
              <v-text-field
                v-model="form.projectLink"
                :placeholder="EDIT_PROJECT_FIELDS.PROJECT_LINK.placeholder"
                variant="outlined"
                density="compact"
                hide-details
                class="flex-1"
                style="border-radius: 0 8px 8px 0;"
                @update:model-value="validateField('projectLink')"
              />
            </div>
          </div>
        </div>
        
        <!-- Divider -->
        <div class="border-t border-gray-200"></div>
        
        <!-- Transition Cost Settings Section -->
        <div class="form-section">
          <h3 class="text-xl font-semibold text-gray-800 mb-6">
            {{ EDIT_PROJECT_SECTIONS.TRANSITION_COST_SETTINGS }}
          </h3>
          
          <div class="space-y-6">
            <!-- Who can transition -->
            <div class="field-group">
              <div class="flex items-center gap-2 mb-3">
                <label class="text-sm font-medium text-gray-700">
                  {{ TRANSITION_SETTINGS_EDIT.WHO_CAN_TRANSITION.label }}
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
                v-model="form.transitionSettings.whoCanTransition"
                hide-details
                @update:model-value="validateField('transitionSettings.whoCanTransition')"
              >
                <v-radio
                  v-for="option in Object.values(TRANSITION_SETTINGS_EDIT.WHO_CAN_TRANSITION.options)"
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
                {{ TRANSITION_SETTINGS_EDIT.PAYMENT_STRATEGY.label }}
              </label>
              <v-radio-group
                v-model="form.transitionSettings.paymentStrategy"
                hide-details
                @update:model-value="validateField('transitionSettings.paymentStrategy')"
              >
                <v-radio
                  v-for="option in Object.values(TRANSITION_SETTINGS_EDIT.PAYMENT_STRATEGY.options)"
                  :key="option.value"
                  :value="option.value"
                  :label="option.label"
                  color="primary"
                />
              </v-radio-group>
            </div>
            
            <!-- Transitions Count -->
            <div class="field-group">
              <div class="flex items-center gap-2">
                <v-text-field
                  v-model.number="form.transitionSettings.transitionsCount"
                  type="number"
                  :placeholder="TRANSITION_SETTINGS_EDIT.TRANSITIONS_COUNT.placeholder"
                  variant="outlined"
                  density="compact"
                  hide-details
                  class="max-w-32"
                  @update:model-value="validateField('transitionSettings.transitionsCount')"
                />
                <span class="text-sm text-gray-600">
                  {{ TRANSITION_SETTINGS_EDIT.TRANSITIONS_COUNT.label }}
                </span>
              </div>
            </div>

            <!-- Transition Cost Info Box -->
            <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 class="text-sm font-medium text-purple-800 mb-3">
                {{ TRANSITION_COST_INFO.TITLE }}
              </h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-purple-700">{{ TRANSITION_COST_INFO.COST_PER_TRANSITION }}</span>
                  <span class="text-purple-800 font-medium">{{ form.transitionCost.costPerTransition }} {{ TRANSITION_COST_INFO.CURRENCY }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-purple-700">{{ TRANSITION_COST_INFO.TOTAL_COST }}</span>
                  <span class="text-purple-800 font-medium">{{ form.transitionCost.totalCost }} {{ TRANSITION_COST_INFO.CURRENCY }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-purple-700">{{ TRANSITION_COST_INFO.BALANCE }}</span>
                  <span class="text-purple-800 font-medium">{{ form.transitionCost.balance }} {{ TRANSITION_COST_INFO.CURRENCY }}</span>
                </div>
              </div>
            </div>
            
            <!-- Budget Limit -->
            <div class="field-group">
              <div class="flex items-center gap-2">
                <v-text-field
                  v-model.number="form.transitionSettings.budgetLimit"
                  type="number"
                  :placeholder="TRANSITION_SETTINGS_EDIT.BUDGET_LIMIT.placeholder"
                  variant="outlined"
                  density="compact"
                  hide-details
                  class="max-w-32"
                  @update:model-value="validateField('transitionSettings.budgetLimit')"
                />
                <span class="text-sm text-gray-600">
                  {{ TRANSITION_SETTINGS_EDIT.BUDGET_LIMIT.suffix }}
                </span>
              </div>
            </div>
            
            <!-- Disable by Date -->
            <div class="field-group">
              <label class="text-sm font-medium text-gray-700 mb-2">
                {{ TRANSITION_SETTINGS_EDIT.DISABLE_BY_DATE.label }}
              </label>
              <v-text-field
                v-model="form.transitionSettings.disableByDate"
                :placeholder="TRANSITION_SETTINGS_EDIT.DISABLE_BY_DATE.placeholder"
                variant="outlined"
                density="compact"
                hide-details
                class="max-w-48"
                prepend-inner-icon="mdi-calendar"
                @update:model-value="validateField('transitionSettings.disableByDate')"
              />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="flex justify-end gap-4 pt-8 border-t border-gray-200 mt-8">
        <v-btn
          variant="text"
          color="gray"
          size="large"
          @click="handleCancel"
        >
          {{ EDIT_PROJECT_ACTIONS.CANCEL }}
        </v-btn>
        
        <v-btn
          variant="text"
          color="gray"
          size="large"
          @click="handleStopAdvertising"
        >
          {{ EDIT_PROJECT_ACTIONS.STOP_ADVERTISING }}
        </v-btn>
        
        <v-btn
          color="primary"
          variant="elevated"
          size="large"
          :disabled="!formState.isValid || formState.isSubmitting"
          :loading="formState.isSubmitting"
          @click="handleLaunchAdvertising"
        >
          {{ EDIT_PROJECT_ACTIONS.LAUNCH_ADVERTISING }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import type { EditProjectForm, EditProjectFormState, EditProjectTab } from '@/types'
import {
  EDIT_PROJECT_SECTIONS,
  EDIT_PROJECT_TABS,
  EDIT_PROJECT_FIELDS,
  TRANSITION_SETTINGS_EDIT,
  EDIT_PROJECT_ACTIONS,
  TRANSITION_COST_INFO,
  REGIONS_EDIT,
  PROJECT_TYPES_EDIT,
  INDUSTRIES_EDIT,
  PROJECT_STAGES_EDIT
} from '@/constants/editProject'
import { editProjectFormData } from '@/data/mockData'

interface Props {
  initialData?: Partial<EditProjectForm>
  projectId?: string
}

interface Emits {
  (e: 'submit', form: EditProjectForm): void
  (e: 'cancel'): void
  (e: 'toggle', isEnabled: boolean): void
  (e: 'stop-advertising'): void
  (e: 'launch-advertising'): void
}

const props = withDefaults(defineProps<Props>(), {
  initialData: () => ({}),
  projectId: ''
})

const emit = defineEmits<Emits>()

// State
const activeTab = ref<string>(EDIT_PROJECT_TABS.DESCRIPTION.id)
const form = reactive<EditProjectForm>({
  ...editProjectFormData,
  ...props.initialData,
  id: props.projectId || editProjectFormData.id
})

const formState = reactive<EditProjectFormState>({
  isSubmitting: false,
  errors: {},
  isValid: false,
  isEnabled: form.isEnabled
})

// Computed
const tabs = computed<EditProjectTab[]>(() => [
  { ...EDIT_PROJECT_TABS.DESCRIPTION, isActive: activeTab.value === EDIT_PROJECT_TABS.DESCRIPTION.id },
  { ...EDIT_PROJECT_TABS.REFERRAL_LINKS, isActive: activeTab.value === EDIT_PROJECT_TABS.REFERRAL_LINKS.id }
])

// Methods
const handleTabClick = (tabId: string) => {
  activeTab.value = tabId
}

const validateField = (fieldPath: string) => {
  // В реальном приложении здесь была бы валидация полей
  console.log('Validating field:', fieldPath)
}

const validateForm = (): boolean => {
  // Простая валидация для демонстрации
  const requiredFields = [
    'region',
    'projectType',
    'industry',
    'projectStage',
    'about.headline',
    'about.description',
    'projectLink'
  ]
  
  const isValid = requiredFields.every(field => {
    const value = getNestedValue(form, field)
    return value && value.toString().trim().length > 0
  })
  
  formState.isValid = isValid
  return isValid
}

const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

const handleToggleChange = (value: boolean) => {
  form.isEnabled = value
  formState.isEnabled = value
  emit('toggle', value)
}

const handleCancel = () => {
  emit('cancel')
}

const handleStopAdvertising = () => {
  emit('stop-advertising')
}

const handleLaunchAdvertising = async () => {
  if (!validateForm()) {
    console.error('Form validation failed')
    return
  }
  
  formState.isSubmitting = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    emit('launch-advertising')
    emit('submit', { ...form })
  } catch (error) {
    console.error('Failed to submit form:', error)
  } finally {
    formState.isSubmitting = false
  }
}

// Watch for form changes to validate
watch(form, () => {
  validateForm()
}, { deep: true })

// Initial validation
validateForm()
</script>

<style scoped>
.edit-project-form {
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 2rem 0;
}

.form-section {
  animation: fadeIn 0.3s ease-in-out;
}

.field-group {
  display: flex;
  flex-direction: column;
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
