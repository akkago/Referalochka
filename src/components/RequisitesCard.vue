<template>
  <div class="requisites-card">
    <!-- Delete Modal -->
    <DeleteRequisitesModal
      :config="deleteModalConfig"
      @confirm="handleDeleteConfirm"
      @cancel="handleDeleteCancel"
      @close="handleDeleteClose"
    />
    <!-- Header with title and update button -->
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-2xl font-bold text-gray-800">{{ REQUISITES_SECTIONS.COMPANY }}</h2>
      <v-btn
        variant="text"
        color="primary"
        class="text-blue-600"
        @click="updateData"
      >
        {{ REQUISITES_ACTIONS.UPDATE }}
      </v-btn>
    </div>

    <v-form ref="form" v-model="isFormValid" class="space-y-8">
      <!-- Company Details Section -->
      <div class="form-section">
        <h3 class="text-xl font-semibold text-gray-800 mb-6">{{ REQUISITES_SECTIONS.COMPANY }}</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <v-text-field
            v-model="formData.company.fullName"
            :label="REQUISITES_FIELD_LABELS.COMPANY.FULL_NAME"
            variant="outlined"
            density="comfortable"
            class="field-input"
            :rules="[createValidationRule(validateRequired)]"
          />
          
          <v-text-field
            v-model="formData.company.shortName"
            :label="REQUISITES_FIELD_LABELS.COMPANY.SHORT_NAME"
            variant="outlined"
            density="comfortable"
            class="field-input"
            :rules="[createValidationRule(validateRequired)]"
          />
          
          <v-text-field
            v-model="formData.company.inn"
            :label="REQUISITES_FIELD_LABELS.COMPANY.INN"
            variant="outlined"
            density="comfortable"
            class="field-input"
            :rules="[createValidationRule(validateInn)]"
          />
          
          <v-text-field
            v-model="formData.company.kpp"
            :label="REQUISITES_FIELD_LABELS.COMPANY.KPP"
            variant="outlined"
            density="comfortable"
            class="field-input"
            :rules="[createValidationRule(validateKpp)]"
          />
          
          <v-text-field
            v-model="formData.company.ogrn"
            :label="REQUISITES_FIELD_LABELS.COMPANY.OGRN"
            variant="outlined"
            density="comfortable"
            class="field-input"
            :rules="[createValidationRule(validateOgrn)]"
          />
          
          <div class="md:col-span-2">
            <v-text-field
              v-model="formData.company.legalAddress"
              :label="REQUISITES_FIELD_LABELS.COMPANY.LEGAL_ADDRESS"
              variant="outlined"
              density="comfortable"
              class="field-input"
              :rules="[createValidationRule(validateRequired)]"
            />
          </div>
          
          <div class="md:col-span-2">
            <v-text-field
              v-model="formData.company.mailingAddress"
              :label="REQUISITES_FIELD_LABELS.COMPANY.MAILING_ADDRESS"
              variant="outlined"
              density="comfortable"
              class="field-input"
              :rules="[createValidationRule(validateRequired)]"
            />
          </div>
        </div>
      </div>

      <!-- Head Details Section -->
      <div class="form-section">
        <h3 class="text-xl font-semibold text-gray-800 mb-6">{{ REQUISITES_SECTIONS.HEAD }}</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <v-text-field
            v-model="formData.head.position"
            :label="REQUISITES_FIELD_LABELS.HEAD.POSITION"
            variant="outlined"
            density="comfortable"
            class="field-input"
            :rules="[createValidationRule(validateRequired)]"
          />
          
          <v-text-field
            v-model="formData.head.fullName"
            :label="REQUISITES_FIELD_LABELS.HEAD.FULL_NAME"
            variant="outlined"
            density="comfortable"
            class="field-input"
            :rules="[createValidationRule(validateRequired)]"
          />
          
          <div class="md:col-span-2">
            <v-text-field
              v-model="formData.head.basis"
              :label="REQUISITES_FIELD_LABELS.HEAD.BASIS"
              variant="outlined"
              density="comfortable"
              class="field-input"
              :placeholder="REQUISITES_PLACEHOLDERS.BASIS"
            />
          </div>
        </div>
      </div>

      <!-- Bank Requisites Section -->
      <div class="form-section">
        <h3 class="text-xl font-semibold text-gray-800 mb-6">{{ REQUISITES_SECTIONS.BANK }}</h3>
        
        <div class="space-y-6">
          <!-- Existing Bank Requisites -->
          <div
            v-for="(requisite, index) in formData.bankRequisites"
            :key="requisite.id"
            class="bank-requisite-block p-6 bg-gray-50 rounded-lg"
          >
            <div class="flex justify-between items-start mb-4">
              <div class="flex items-center gap-3">
                                  <v-radio
                    v-model="defaultRequisiteId"
                    :value="requisite.id"
                    :label="REQUISITES_FIELD_LABELS.BANK.USE_DEFAULT"
                    color="primary"
                  />
              </div>
              
              <v-btn
                icon
                variant="text"
                color="error"
                size="small"
                @click="openDeleteRequisiteModal(requisite.id)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <v-text-field
                v-model="requisite.bic"
                :label="REQUISITES_FIELD_LABELS.BANK.BIC"
                variant="outlined"
                density="comfortable"
                class="field-input"
                :placeholder="REQUISITES_PLACEHOLDERS.BIC"
                :rules="[createValidationRule(validateBic)]"
              />
              
              <v-text-field
                v-model="requisite.currentAccount"
                :label="REQUISITES_FIELD_LABELS.BANK.CURRENT_ACCOUNT"
                variant="outlined"
                density="comfortable"
                class="field-input"
                :placeholder="REQUISITES_PLACEHOLDERS.CURRENT_ACCOUNT"
              />
              
              <v-text-field
                v-model="requisite.bank"
                :label="REQUISITES_FIELD_LABELS.BANK.BANK"
                variant="outlined"
                density="comfortable"
                class="field-input"
                :placeholder="REQUISITES_PLACEHOLDERS.BANK"
              />
              
              <v-text-field
                v-model="requisite.correspondentAccount"
                :label="REQUISITES_FIELD_LABELS.BANK.CORRESPONDENT_ACCOUNT"
                variant="outlined"
                density="comfortable"
                class="field-input"
                :placeholder="REQUISITES_PLACEHOLDERS.CORRESPONDENT_ACCOUNT"
              />
            </div>
          </div>

          <!-- Add New Requisite Button -->
          <div class="text-center">
            <v-btn
              color="primary"
              variant="outlined"
              prepend-icon="mdi-plus"
              @click="addRequisite"
            >
              {{ REQUISITES_ACTIONS.ADD }}
            </v-btn>
          </div>
        </div>
      </div>

      <!-- Footer Buttons -->
      <div class="flex justify-end gap-4 pt-8">
        <v-btn
          variant="outlined"
          color="gray"
          size="large"
          @click="cancel"
        >
          {{ REQUISITES_ACTIONS.CANCEL }}
        </v-btn>
        
        <v-btn
          color="primary"
          variant="elevated"
          size="large"
          :disabled="!isFormValid"
          @click="submit"
        >
          {{ REQUISITES_ACTIONS.SUBMIT }}
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { RequisitesData, BankRequisite } from '@/types'
import DeleteRequisitesModal from './DeleteRequisitesModal.vue'
import { useDeleteModal } from '@/composables/useDeleteModal'
import { 
  REQUISITES_FIELD_LABELS, 
  REQUISITES_SECTIONS, 
  REQUISITES_ACTIONS, 
  REQUISITES_PLACEHOLDERS 
} from '@/constants/requisites'
import { DELETE_MODAL_MESSAGES } from '@/constants/modals'
import { 
  validateInn, 
  validateKpp, 
  validateOgrn, 
  validateBic, 
  validateRequired,
  createValidationRule 
} from '@/utils/requisitesValidation'

interface Props {
  initialData?: RequisitesData
}

const props = withDefaults(defineProps<Props>(), {
  initialData: undefined
})

const emit = defineEmits<{
  submit: [data: RequisitesData]
  cancel: []
  update: []
}>()

// Form state
const form = ref()
const isFormValid = ref(false)

// Form data
const formData = ref<RequisitesData>({
  company: {
    fullName: '',
    shortName: '',
    inn: '',
    kpp: '',
    ogrn: '',
    legalAddress: '',
    mailingAddress: ''
  },
  head: {
    position: '',
    fullName: '',
    basis: ''
  },
  bankRequisites: []
})

// Default requisite tracking
const defaultRequisiteId = ref<string>('')

// Delete modal state
const { deleteModalConfig, openDeleteModal, closeDeleteModal, setDeleteModalCallbacks } = useDeleteModal()

// Initialize form data
const initializeFormData = () => {
  if (props.initialData) {
    formData.value = JSON.parse(JSON.stringify(props.initialData))
    const defaultRequisite = formData.value.bankRequisites.find(r => r.isDefault)
    if (defaultRequisite) {
      defaultRequisiteId.value = defaultRequisite.id
    }
  } else {
    // Set default values from mock data
    formData.value = {
      company: {
        fullName: 'Общество с ограниченной ответственностью «Сибирский Логистический Центр»',
        shortName: 'ООО «СЛЦ»',
        inn: '5401234567',
        kpp: '540101001',
        ogrn: '1145476192001',
        legalAddress: '630102, г. Новосибирск, ул. Ленина, д. 12, оф. 34',
        mailingAddress: '630102, г. Новосибирск, ул. Ленина, д. 12, оф. 34'
      },
      head: {
        position: 'Генеральны директор',
        fullName: 'Иванов Сергей Петрович',
        basis: 'Нет данных'
      },
      bankRequisites: [
        {
          id: '1',
          bic: '',
          currentAccount: '',
          bank: '',
          correspondentAccount: '',
          isDefault: true
        },
        {
          id: '2',
          bic: '',
          currentAccount: '',
          bank: '',
          correspondentAccount: '',
          isDefault: false
        }
      ]
    }
    defaultRequisiteId.value = '1'
  }
}

// Watch for default requisite changes
watch(defaultRequisiteId, (newValue) => {
  formData.value.bankRequisites.forEach(requisite => {
    requisite.isDefault = requisite.id === newValue
  })
})

// Methods
const addRequisite = (): void => {
  const newRequisite: BankRequisite = {
    id: `requisite-${Date.now()}`,
    bic: '',
    currentAccount: '',
    bank: '',
    correspondentAccount: '',
    isDefault: false
  }
  
  formData.value.bankRequisites.push(newRequisite)
}

const handleDeleteConfirm = (id: string): void => {
  removeRequisite(id)
  closeDeleteModal()
}

const handleDeleteCancel = (): void => {
  closeDeleteModal()
}

const handleDeleteClose = (): void => {
  closeDeleteModal()
}

const openDeleteRequisiteModal = (id: string): void => {
  openDeleteModal(
    id,
    DELETE_MODAL_MESSAGES.REQUISITES.TITLE,
    DELETE_MODAL_MESSAGES.REQUISITES.MESSAGE
  )
  setDeleteModalCallbacks(handleDeleteConfirm, handleDeleteCancel)
}

const removeRequisite = (id: string): void => {
  const index = formData.value.bankRequisites.findIndex(r => r.id === id)
  if (index !== -1) {
    formData.value.bankRequisites.splice(index, 1)
    
    // If we removed the default requisite, set the first one as default
    if (defaultRequisiteId.value === id && formData.value.bankRequisites.length > 0) {
      defaultRequisiteId.value = formData.value.bankRequisites[0].id
      formData.value.bankRequisites[0].isDefault = true
    }
  }
}

const updateData = (): void => {
  emit('update')
}

const submit = async (): Promise<void> => {
  const { valid } = await form.value?.validate()
  
  if (valid) {
    emit('submit', formData.value)
  }
}

const cancel = (): void => {
  emit('cancel')
}

// Initialize on mount
onMounted(() => {
  initializeFormData()
})
</script>

<style scoped>
.requisites-card {
  min-height: 400px;
  padding: 2rem;
}

.form-section {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 2rem;
}

.form-section:last-child {
  border-bottom: none;
}

.field-input {
  width: 100%;
}

.bank-requisite-block {
  border: 1px solid #e5e7eb;
}

/* Custom radio button styling */
.v-radio-group {
  margin-bottom: 0;
}

.v-radio {
  margin-bottom: 0;
}
</style>
