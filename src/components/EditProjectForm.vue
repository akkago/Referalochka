<template>
  <div class="edit-project-form">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
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
        <div v-if="activeTab === EDIT_PROJECT_TABS.DESCRIPTION.id" class="form-section">
          <h3 class="text-xl font-semibold text-gray-800 mb-6">
            {{ EDIT_PROJECT_SECTIONS.EDIT_PROJECT }}
          </h3>
          
          <ProjectFormFields
            :form-data="form"
            :fields="EDIT_PROJECT_FIELDS"
            :regions="REGIONS_EDIT"
            :project-types="PROJECT_TYPES_EDIT"
            :industries="INDUSTRIES_EDIT"
            :project-stages="PROJECT_STAGES_EDIT"
            @validate="validateField"
          />
        </div>
        
        <div class="border-t border-gray-200"></div>
        
        <div class="form-section">
          <TransitionCostSettings
            :initial-data="form.transitionSettings"
            :cost-info="form.transitionCost"
            @update="handleTransitionSettingsUpdate"
          />
        </div>
        
        <div v-if="activeTab === EDIT_PROJECT_TABS.REFERRAL_LINKS.id" class="form-section">
          <h3 class="text-xl font-semibold text-gray-800 mb-6">
            {{ EDIT_PROJECT_SECTIONS.REFERRAL_LINKS }}
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
        :primary-text="EDIT_PROJECT_ACTIONS.LAUNCH_ADVERTISING"
        :cancel-text="EDIT_PROJECT_ACTIONS.CANCEL"
        :secondary-text="EDIT_PROJECT_ACTIONS.STOP_ADVERTISING"
        :show-secondary="true"
        :disabled="!formState.isValid || formState.isSubmitting"
        :loading="formState.isSubmitting"
        @primary="handleLaunchAdvertising"
        @cancel="handleCancel"
        @secondary="handleStopAdvertising"
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
import type { EditProjectForm, EditProjectTab, ReferralLink, ReferralLinkStats } from '@/types'
import {
  EDIT_PROJECT_SECTIONS,
  EDIT_PROJECT_TABS,
  EDIT_PROJECT_FIELDS,
  EDIT_PROJECT_ACTIONS,
  REGIONS_EDIT,
  PROJECT_TYPES_EDIT,
  INDUSTRIES_EDIT,
  PROJECT_STAGES_EDIT
} from '@/constants/editProject'
import { editProjectFormData, referralLinks as mockReferralLinks, referralLinkStats } from '@/data/mockData'

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

const activeTab = ref<string>(EDIT_PROJECT_TABS.DESCRIPTION.id)
const form = reactive<EditProjectForm>({
  ...editProjectFormData,
  ...props.initialData,
  id: props.projectId || editProjectFormData.id
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

const tabs = computed<EditProjectTab[]>(() => [
  { ...EDIT_PROJECT_TABS.DESCRIPTION, isActive: activeTab.value === EDIT_PROJECT_TABS.DESCRIPTION.id },
  { ...EDIT_PROJECT_TABS.REFERRAL_LINKS, isActive: activeTab.value === EDIT_PROJECT_TABS.REFERRAL_LINKS.id }
])

const handleTabClick = (tabId: string) => {
  activeTab.value = tabId
}

const handleToggleChange = (value: boolean) => {
  form.isEnabled = value
  emit('toggle', value)
}

const handleCancel = () => {
  emit('cancel')
}

const handleTransitionSettingsUpdate = (data: any) => {
  Object.assign(form.transitionSettings, data)
  validateForm()
}

const handleStopAdvertising = () => {
  emit('stop-advertising')
}

const handleLaunchAdvertising = async () => {
  if (!validateForm()) {
    console.error('Form validation failed')
    return
  }
  
  setSubmitting(true)
  
  try {
    await new Promise(resolve => setTimeout(resolve, 2000))
    emit('launch-advertising')
    emit('submit', { ...form })
  } catch (error) {
    console.error('Failed to submit form:', error)
  } finally {
    setSubmitting(false)
  }
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
.edit-project-form {
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
