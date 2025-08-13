<template>
  <div class="add-project-form">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
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
      
      <div class="space-y-8">
        <div v-if="activeTab === ADD_PROJECT_TABS.DESCRIPTION.id" class="form-section">
          <h3 class="text-xl font-semibold text-gray-800 mb-6">
            {{ ADD_PROJECT_SECTIONS.ADD_PROJECT }}
          </h3>
          
          <ProjectFormFields
            :form-data="form"
            :fields="ADD_PROJECT_FIELDS"
            :regions="REGIONS"
            :project-types="PROJECT_TYPES_ADD"
            :industries="INDUSTRIES_ADD"
            :project-stages="PROJECT_STAGES_ADD"
            @validate="validateField"
          />
        </div>
        
        <div class="border-t border-gray-200"></div>
        
        <div class="form-section">
          <TransitionCostSettings
            :initial-data="form.transitionSettings"
            :cost-info="transitionCostInfo"
            @update="handleTransitionSettingsUpdate"
          />
        </div>
        
        <div v-if="activeTab === ADD_PROJECT_TABS.REFERRAL_LINKS.id" class="form-section">
          <h3 class="text-xl font-semibold text-gray-800 mb-6">
            {{ ADD_PROJECT_SECTIONS.REFERRAL_LINKS }}
          </h3>
          
          <StatsCards :stats="referralStats" class="mb-8" />
          
          <ReferralLinksList
            :links="referralLinks"
            @create="handleCreateReferralLink"
            @edit="handleEditReferralLink"
            @delete="handleDeleteReferralLink"
          />
        </div>
      </div>
      
      <ActionButtons
        :primary-text="ADD_PROJECT_ACTIONS.CREATE_PROJECT"
        :cancel-text="ADD_PROJECT_ACTIONS.CANCEL"
        :disabled="!formState.isValid || formState.isSubmitting"
        :loading="formState.isSubmitting"
        @primary="handleSubmit"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import TransitionCostSettings from '@/components/TransitionCostSettings.vue'
import ProjectFormFields from '@/components/ProjectFormFields.vue'
import StatsCards from '@/components/StatsCards.vue'
import ReferralLinksList from '@/components/ReferralLinksList.vue'
import ActionButtons from '@/components/ActionButtons.vue'
import { useFormValidation } from '@/composables/useFormValidation'
import type { AddProjectForm, AddProjectTab, ReferralLink, ReferralLinkStats, TransitionCostInfo } from '@/types'
import {
  ADD_PROJECT_SECTIONS,
  ADD_PROJECT_TABS,
  ADD_PROJECT_FIELDS,
  ADD_PROJECT_ACTIONS,
  REGIONS,
  PROJECT_TYPES_ADD,
  INDUSTRIES_ADD,
  PROJECT_STAGES_ADD
} from '@/constants/addProject'
import { filledAddProjectForm, referralLinks as mockReferralLinks, referralLinkStats } from '@/data/mockData'

interface Props {
  initialData?: Partial<AddProjectForm>
}

interface Emits {
  (e: 'submit', form: AddProjectForm): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  initialData: () => ({})
})

const emit = defineEmits<Emits>()

const activeTab = ref<string>(ADD_PROJECT_TABS.DESCRIPTION.id)
const form = reactive<AddProjectForm>({
  ...filledAddProjectForm,
  ...props.initialData
})

const requiredFields = [
  'region',
  'projectType',
  'industry',
  'projectStage',
  'about.headline',
  'about.description',
  'projectLink'
]

const { formState, validateField, validateForm, setSubmitting } = useFormValidation(form, requiredFields)

const referralLinks = ref<ReferralLink[]>(mockReferralLinks)
const referralStats = ref<ReferralLinkStats>(referralLinkStats)

const transitionCostInfo = reactive<TransitionCostInfo>({
  costPerTransition: 100,
  totalCost: 0,
  balance: 3000
})

const tabs = computed<AddProjectTab[]>(() => [
  { ...ADD_PROJECT_TABS.DESCRIPTION, isActive: activeTab.value === ADD_PROJECT_TABS.DESCRIPTION.id },
  { ...ADD_PROJECT_TABS.REFERRAL_LINKS, isActive: activeTab.value === ADD_PROJECT_TABS.REFERRAL_LINKS.id }
])

const handleTabClick = (tabId: string) => {
  activeTab.value = tabId
}

const handleSubmit = async () => {
  if (!validateForm()) {
    console.error('Form validation failed')
    return
  }
  
  setSubmitting(true)
  
  try {
    await new Promise(resolve => setTimeout(resolve, 2000))
    emit('submit', { ...form })
  } catch (error) {
    console.error('Failed to submit form:', error)
  } finally {
    setSubmitting(false)
  }
}

const handleCancel = () => {
  emit('cancel')
}

const handleTransitionSettingsUpdate = (data: any) => {
  Object.assign(form.transitionSettings, data)
  validateForm()
}

const handleCreateReferralLink = () => {
  console.log('Create referral link')
}

const handleEditReferralLink = (link: ReferralLink) => {
  console.log('Edit referral link:', link)
}

const handleDeleteReferralLink = (link: ReferralLink) => {
  console.log('Delete referral link:', link)
}
</script>

<style scoped>
.add-project-form {
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 2rem 0;
}

.form-section {
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
