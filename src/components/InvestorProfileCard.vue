<template>
  <div class="investor-profile-card">
    <!-- Empty State (when form is not filled) -->
    <div v-if="!isFormFilled" class="text-center">
      <!-- Status Icon -->
      <div class="mb-6">
        <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-purple-100 mb-4">
          <v-icon
            size="48"
            :color="currentProfile.iconColor"
            class="text-white"
          >
            {{ currentProfile.icon }}
          </v-icon>
        </div>
      </div>
      
      <!-- Title -->
      <h2 class="text-3xl font-bold text-gray-800 mb-4">
        {{ currentProfile.title }}
      </h2>
      
      <!-- Description -->
      <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        {{ currentProfile.description }}
      </p>
      
      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <v-btn
          v-for="action in currentProfile.actions"
          :key="action.id"
          :variant="action.variant"
          :color="action.color"
          size="large"
          class="px-8"
          @click="handleActionClick(action.id)"
        >
          <v-icon
            v-if="action.icon"
            :icon="action.icon"
            start
            class="mr-2"
          />
          {{ action.title }}
        </v-btn>
      </div>
    </div>

    <!-- Filled State (when form is filled) -->
    <div v-else class="filled-form-content">
      <!-- Rejection Warning -->
      <div v-if="rejectionWarning?.isVisible" class="rejection-warning mb-6">
        <div class="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <v-icon color="error" class="mt-1">mdi-alert-circle</v-icon>
          <div class="flex-1">
            <h4 class="text-sm font-semibold text-red-800 mb-1">
              {{ REJECTION_WARNING.TITLE }}
            </h4>
            <p class="text-sm text-red-700 leading-relaxed">
              {{ rejectionWarning.details }}
            </p>
          </div>
        </div>
      </div>

      <!-- Form Content -->
      <div class="space-y-8">
        <!-- General Information Section -->
        <div class="form-section">
          <h3 class="text-xl font-semibold text-gray-800 mb-6">
            {{ FILLED_INVESTOR_FORM_SECTIONS.GENERAL_INFO }}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="field-group">
              <label class="text-sm font-medium text-gray-700 mb-2">
                {{ FILLED_INVESTOR_FORM_LABELS.GENERAL_INFO.NAME }}
              </label>
              <div class="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                {{ formData.generalInfo.name }}
              </div>
            </div>
            
            <div class="field-group">
              <label class="text-sm font-medium text-gray-700 mb-2">
                {{ FILLED_INVESTOR_FORM_LABELS.GENERAL_INFO.SURNAME }}
              </label>
              <div class="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                {{ formData.generalInfo.surname }}
              </div>
            </div>
            
            <div class="field-group">
              <label class="text-sm font-medium text-gray-700 mb-2">
                {{ FILLED_INVESTOR_FORM_LABELS.GENERAL_INFO.PHONE }}
              </label>
              <div class="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                {{ formData.generalInfo.phone }}
              </div>
            </div>
            
            <div class="field-group">
              <label class="text-sm font-medium text-gray-700 mb-2">
                {{ FILLED_INVESTOR_FORM_LABELS.GENERAL_INFO.EMAIL }}
              </label>
              <div class="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                {{ formData.generalInfo.email }}
              </div>
            </div>
            
            <div class="field-group">
              <label class="text-sm font-medium text-gray-700 mb-2">
                {{ FILLED_INVESTOR_FORM_LABELS.GENERAL_INFO.BRAND }}
              </label>
              <div class="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                {{ formData.generalInfo.brand }}
              </div>
            </div>
            
            <div class="field-group">
              <label class="text-sm font-medium text-gray-700 mb-2">
                {{ FILLED_INVESTOR_FORM_LABELS.GENERAL_INFO.COMPANY }}
              </label>
              <div class="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                {{ formData.generalInfo.company }}
              </div>
            </div>
            
            <div class="field-group">
              <label class="text-sm font-medium text-gray-700 mb-2">
                {{ FILLED_INVESTOR_FORM_LABELS.GENERAL_INFO.INN }}
              </label>
              <div class="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                {{ formData.generalInfo.inn }}
              </div>
            </div>
          </div>
        </div>

        <!-- Resources Section -->
        <div class="form-section">
          <h3 class="text-xl font-semibold text-gray-800 mb-6">
            {{ FILLED_INVESTOR_FORM_SECTIONS.RESOURCES }}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="field-group">
              <label class="text-sm font-medium text-gray-700 mb-2">
                {{ FILLED_INVESTOR_FORM_LABELS.RESOURCES.WEBSITE_TYPE }}
              </label>
              <div class="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                {{ formData.resources.websiteType }}
              </div>
            </div>
            
            <div class="field-group">
              <label class="text-sm font-medium text-gray-700 mb-2">
                {{ FILLED_INVESTOR_FORM_LABELS.RESOURCES.WEBSITE_URL }}
              </label>
              <div class="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                <a :href="formData.resources.websiteUrl" target="_blank" class="text-blue-600 hover:text-blue-800">
                  {{ formData.resources.websiteUrl }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- About Section -->
        <div class="form-section">
          <h3 class="text-xl font-semibold text-gray-800 mb-6">
            {{ FILLED_INVESTOR_FORM_SECTIONS.ABOUT }}
          </h3>
          <div class="space-y-6">
            <div class="field-group">
              <label class="text-sm font-medium text-gray-700 mb-2">
                {{ FILLED_INVESTOR_FORM_LABELS.ABOUT.HEADLINE }}
              </label>
              <div class="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                {{ formData.about.headline }}
              </div>
            </div>
            
            <div class="field-group">
              <label class="text-sm font-medium text-gray-700 mb-2">
                {{ FILLED_INVESTOR_FORM_LABELS.ABOUT.DESCRIPTION }}
              </label>
              <div class="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 whitespace-pre-line">
                {{ formData.about.description }}
              </div>
            </div>
          </div>
        </div>

        <!-- Investments Section -->
        <div class="form-section">
          <h3 class="text-xl font-semibold text-gray-800 mb-6">
            {{ FILLED_INVESTOR_FORM_SECTIONS.INVESTMENTS }}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="field-group">
              <label class="text-sm font-medium text-gray-700 mb-2">
                {{ FILLED_INVESTOR_FORM_LABELS.INVESTMENTS.FORMAT }}
              </label>
              <div class="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                {{ formData.investments.format }}
              </div>
            </div>
            
            <div class="field-group">
              <label class="text-sm font-medium text-gray-700 mb-2">
                {{ FILLED_INVESTOR_FORM_LABELS.INVESTMENTS.MIN }}
              </label>
              <div class="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                {{ formatCurrency(formData.investments.min) }}
              </div>
            </div>
            
            <div class="field-group">
              <label class="text-sm font-medium text-gray-700 mb-2">
                {{ FILLED_INVESTOR_FORM_LABELS.INVESTMENTS.MAX }}
              </label>
              <div class="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                {{ formatCurrency(formData.investments.max) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Categories Section -->
        <div class="form-section">
          <h3 class="text-xl font-semibold text-gray-800 mb-6">
            {{ FILLED_INVESTOR_FORM_SECTIONS.CATEGORIES }}
          </h3>
          <div class="space-y-6">
            <div class="field-group">
              <label class="text-sm font-medium text-gray-700 mb-2">
                {{ FILLED_INVESTOR_FORM_LABELS.CATEGORIES.TAGS }}
              </label>
              <div class="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                {{ formData.categories.tags }}
              </div>
            </div>
            
            <div class="field-group">
              <label class="text-sm font-medium text-gray-700 mb-2">
                {{ FILLED_INVESTOR_FORM_LABELS.CATEGORIES.CATEGORIES }}
              </label>
              <div class="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <div class="space-y-2">
                  <div
                    v-for="category in INVESTMENT_CATEGORIES"
                    :key="category"
                    class="flex items-center gap-2"
                  >
                    <v-icon
                      :color="formData.categories.selectedCategories.includes(category) ? 'primary' : 'grey'"
                      size="small"
                    >
                      {{ formData.categories.selectedCategories.includes(category) ? 'mdi-check-circle' : 'mdi-circle-outline' }}
                    </v-icon>
                    <span :class="formData.categories.selectedCategories.includes(category) ? 'text-gray-900' : 'text-gray-500'">
                      {{ category }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end gap-4 pt-8 border-t border-gray-200">
        <v-btn
          variant="outlined"
          color="gray"
          size="large"
          @click="handleEdit"
        >
          Редактировать
        </v-btn>
        
        <v-btn
          color="primary"
          variant="elevated"
          size="large"
          @click="handleResubmit"
        >
          Отправить повторно
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProfile } from '@/composables/useProfile'
import type { FilledInvestorFormData, RejectionWarning } from '@/types'
import { 
  FILLED_INVESTOR_FORM_SECTIONS, 
  FILLED_INVESTOR_FORM_LABELS,
  INVESTMENT_CATEGORIES,
  REJECTION_WARNING
} from '@/constants/investorForm'
import { formatCurrency } from '@/utils/formatters'

interface Props {
  formData?: FilledInvestorFormData
  rejectionWarning?: RejectionWarning
}

interface Emits {
  (e: 'actionClick', actionId: string): void
  (e: 'edit'): void
  (e: 'resubmit'): void
}

const props = withDefaults(defineProps<Props>(), {
  formData: undefined,
  rejectionWarning: undefined
})

const emit = defineEmits<Emits>()

const { currentProfile } = useProfile()

// Determine if form is filled based on whether formData is provided
const isFormFilled = computed(() => {
  return !!props.formData
})

const handleActionClick = (actionId: string) => {
  emit('actionClick', actionId)
  console.log('Action clicked:', actionId)
}

const handleEdit = (): void => {
  emit('edit')
}

const handleResubmit = (): void => {
  emit('resubmit')
}
</script>

<style scoped>
.investor-profile-card {
  padding: 2rem 0;
}

/* Custom purple background for icon */
.bg-purple-100 {
  background-color: #f3e8ff;
}

/* Filled form styles */
.filled-form-content {
  min-height: 400px;
}

.form-section {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 2rem;
}

.form-section:last-child {
  border-bottom: none;
}

.field-group {
  display: flex;
  flex-direction: column;
}

.rejection-warning {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
