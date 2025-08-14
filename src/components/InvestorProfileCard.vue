<template>
  <div class="investor-profile-card">
    <div v-if="!isFormFilled" class="text-center">
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
      
      <h2 class="text-3xl font-bold text-gray-800 mb-4">
        {{ currentProfile.title }}
      </h2>
      
      <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        {{ currentProfile.description }}
      </p>
      
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

    <div v-else class="filled-form-content">
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

      <div class="space-y-8">
        <div class="mb-6">
          <div class="text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-lg">
            Статус инвестора действителен до: 01.10.2025
          </div>
        </div>

        <div class="form-section">
          <div class="flex items-start gap-8">
            <div class="flex-shrink-0 pt-6 w-1/3">
              <h3 class="text-xl font-semibold text-gray-800">
                Профиль
              </h3>
            </div>
            
            <div class="flex-1 w-2/3">
              <div class="name-surname-row">
                <div class="field-group flex-1">
                  <label class="text-sm font-medium text-gray-700 mb-2">
                    {{ FILLED_INVESTOR_FORM_LABELS.GENERAL_INFO.NAME }}
                  </label>
                  <v-text-field
                    v-model="formData.generalInfo.name"
                    placeholder="Введите имя"
                    type="text"
                    variant="outlined"
                    density="comfortable"
                    class="field-input"
                  />
                </div>
                
                <div class="field-group flex-1">
                  <label class="text-sm font-medium text-gray-700 mb-2">
                    {{ FILLED_INVESTOR_FORM_LABELS.GENERAL_INFO.SURNAME }}
                  </label>
                  <v-text-field
                    v-model="formData.generalInfo.surname"
                    placeholder="Введите фамилию"
                    type="text"
                    variant="outlined"
                    density="comfortable"
                    class="field-input"
                  />
                </div>
              </div>
              
              <div class="phone-email-row">
                <div class="field-group flex-1">
                  <label class="text-sm font-medium text-gray-700 mb-2">
                    {{ FILLED_INVESTOR_FORM_LABELS.GENERAL_INFO.PHONE }}
                  </label>
                  <v-text-field
                    v-model="formData.generalInfo.phone"
                    placeholder="+7-900-000-00-00"
                    type="tel"
                    variant="outlined"
                    density="comfortable"
                    class="field-input"
                  />
                </div>
                
                <div class="field-group flex-1">
                  <label class="text-sm font-medium text-gray-700 mb-2">
                    {{ FILLED_INVESTOR_FORM_LABELS.GENERAL_INFO.EMAIL }}
                  </label>
                  <v-text-field
                    v-model="formData.generalInfo.email"
                    placeholder="example@email.com"
                    type="email"
                    variant="outlined"
                    density="comfortable"
                    class="field-input"
                  />
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="field-group">
                  <label class="text-sm font-medium text-gray-700 mb-2">
                    {{ FILLED_INVESTOR_FORM_LABELS.GENERAL_INFO.BRAND }}
                  </label>
                  <v-text-field
                    v-model="formData.generalInfo.brand"
                    placeholder="Введите название бренда"
                    type="text"
                    variant="outlined"
                    density="comfortable"
                    class="field-input"
                  />
                </div>
                
                <div class="field-group">
                  <label class="text-sm font-medium text-gray-700 mb-2">
                    {{ FILLED_INVESTOR_FORM_LABELS.GENERAL_INFO.COMPANY }}
                  </label>
                  <v-text-field
                    v-model="formData.generalInfo.company"
                    placeholder="Введите название компании"
                    type="text"
                    variant="outlined"
                    density="comfortable"
                    class="field-input"
                  />
                </div>
                
                <div class="field-group">
                  <label class="text-sm font-medium text-gray-700 mb-2">
                    {{ FILLED_INVESTOR_FORM_LABELS.GENERAL_INFO.INN }}
                  </label>
                  <v-text-field
                    v-model="formData.generalInfo.inn"
                    placeholder="Введите ИНН"
                    type="text"
                    variant="outlined"
                    density="comfortable"
                    class="field-input"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-section">
          <div class="flex items-start gap-8">
            <div class="flex-shrink-0 pt-6 w-1/3">
              <h3 class="text-xl font-semibold text-gray-800">
                {{ FILLED_INVESTOR_FORM_SECTIONS.RESOURCES }}
              </h3>
            </div>
            
            <div class="flex-1 w-2/3">
              <div class="space-y-4">
                <div v-if="resourceLinks.length > 0" class="space-y-4">
                  <div
                    v-for="(link, index) in resourceLinks"
                    :key="index"
                    class="flex gap-6"
                  >
                    <div class="field-group flex-1">
                      <label class="text-sm font-medium text-gray-700 mb-2">
                        {{ FILLED_INVESTOR_FORM_LABELS.RESOURCES.WEBSITE_TYPE }}
                      </label>
                      <v-select
                        v-model="link.type"
                        :items="['Сайт', 'Блог', 'Социальная сеть', 'YouTube', 'Другое']"
                        placeholder="Выберите тип"
                        variant="outlined"
                        density="comfortable"
                        class="field-input"
                      />
                    </div>
                    
                    <div class="field-group flex-1">
                      <label class="text-sm font-medium text-gray-700 mb-2">
                        {{ FILLED_INVESTOR_FORM_LABELS.RESOURCES.WEBSITE_URL }}
                      </label>
                      <v-text-field
                        v-model="link.url"
                        placeholder="https://example.com"
                        type="url"
                        variant="outlined"
                        density="comfortable"
                        class="field-input"
                      />
                    </div>
                    
                    <div class="field-group flex-shrink-0 self-end">
                      <v-btn
                        icon
                        variant="text"
                        color="error"
                        size="small"
                        @click="removeResourceLink(index)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </div>
                  </div>
                </div>
                
                <div class="flex gap-6">
                  <div class="field-group flex-1">
                    <label class="text-sm font-medium text-gray-700 mb-2">
                      {{ FILLED_INVESTOR_FORM_LABELS.RESOURCES.WEBSITE_TYPE }}
                    </label>
                    <v-select
                      v-model="newResourceLink.type"
                      :items="['Сайт', 'Блог', 'Социальная сеть', 'YouTube', 'Другое']"
                      placeholder="Выберите тип"
                      variant="outlined"
                      density="comfortable"
                      class="field-input"
                    />
                  </div>
                  
                  <div class="field-group flex-1">
                    <label class="text-sm font-medium text-gray-700 mb-2">
                      {{ FILLED_INVESTOR_FORM_LABELS.RESOURCES.WEBSITE_URL }}
                    </label>
                    <v-text-field
                      v-model="newResourceLink.url"
                      placeholder="https://example.com"
                      type="url"
                      variant="outlined"
                      density="comfortable"
                      class="field-input"
                    />
                  </div>
                </div>
                
                <div class="flex justify-start">
                  <v-btn
                    color="grey"
                    variant="outlined"
                    size="large"
                    class="w-full"
                    @click="addResourceLink"
                  >
                    + Добавить ссылку
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-section">
          <div class="flex items-start gap-8">
            <div class="flex-shrink-0 pt-6 w-1/3">
              <h3 class="text-xl font-semibold text-gray-800">
                {{ FILLED_INVESTOR_FORM_SECTIONS.ABOUT }}
              </h3>
            </div>
            
            <div class="flex-1 w-2/3">
              <div class="space-y-6">
                <div class="field-group">
                  <label class="text-sm font-medium text-gray-700 mb-2">
                    {{ FILLED_INVESTOR_FORM_LABELS.ABOUT.HEADLINE }}
                  </label>
                  <v-text-field
                    v-model="formData.about.headline"
                    placeholder="Краткое описание о себе"
                    type="text"
                    variant="outlined"
                    density="comfortable"
                    class="field-input"
                  />
                </div>
                
                <div class="field-group">
                  <label class="text-sm font-medium text-gray-700 mb-2">
                    {{ FILLED_INVESTOR_FORM_LABELS.ABOUT.DESCRIPTION }}
                  </label>
                  <v-textarea
                    v-model="formData.about.description"
                    placeholder="Подробное описание о себе и опыте"
                    variant="outlined"
                    density="comfortable"
                    rows="6"
                    class="field-input"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3 class="text-xl font-semibold text-gray-800 mb-6">
            {{ FILLED_INVESTOR_FORM_SECTIONS.INVESTMENTS }}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="field-group">
              <label class="text-sm font-medium text-gray-700 mb-2">
                {{ FILLED_INVESTOR_FORM_LABELS.INVESTMENTS.FORMAT }}
              </label>
              <v-select
                v-model="formData.investments.format"
                :items="['Доля', 'Займ']"
                placeholder="Выберите формат"
                variant="outlined"
                density="comfortable"
                class="field-input"
              />
            </div>
            
            <div class="field-group">
              <label class="text-sm font-medium text-gray-700 mb-2">
                {{ FILLED_INVESTOR_FORM_LABELS.INVESTMENTS.MIN }}
              </label>
              <v-text-field
                v-model="formData.investments.min"
                placeholder="Минимальная сумма"
                type="number"
                variant="outlined"
                density="comfortable"
                class="field-input"
              />
            </div>
            
            <div class="field-group">
              <label class="text-sm font-medium text-gray-700 mb-2">
                {{ FILLED_INVESTOR_FORM_LABELS.INVESTMENTS.MAX }}
              </label>
              <v-text-field
                v-model="formData.investments.max"
                placeholder="Максимальная сумма"
                type="number"
                variant="outlined"
                density="comfortable"
                class="field-input"
              />
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3 class="text-xl font-semibold text-gray-800 mb-6">
            {{ FILLED_INVESTOR_FORM_SECTIONS.CATEGORIES }}
          </h3>
          <div class="space-y-6">
            <div class="field-group">
              <label class="text-sm font-medium text-gray-700 mb-2">
                {{ FILLED_INVESTOR_FORM_LABELS.CATEGORIES.TAGS }}
              </label>
              <v-textarea
                v-model="formData.categories.tags"
                placeholder="Ключевые слова по вашей тематике"
                variant="outlined"
                density="comfortable"
                rows="4"
                class="field-input"
              />
            </div>
            
            <div class="field-group">
              <label class="text-sm font-medium text-gray-700 mb-2">
                {{ FILLED_INVESTOR_FORM_LABELS.CATEGORIES.CATEGORIES }}
              </label>
              <div class="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <div class="space-y-2">
                  <v-checkbox
                    v-for="category in INVESTMENT_CATEGORIES"
                    :key="category"
                    v-model="formData.categories.selectedCategories"
                    :value="category"
                    :label="category"
                    color="primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-4 pt-8 border-t border-gray-200">
        <v-btn
          color="primary"
          variant="elevated"
          size="large"
          @click="handleResubmit"
        >
          Отправить
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useProfile } from '@/composables/useProfile'
import type { FilledInvestorFormData, RejectionWarning } from '@/types'
import { 
  FILLED_INVESTOR_FORM_SECTIONS, 
  FILLED_INVESTOR_FORM_LABELS,
  INVESTMENT_CATEGORIES,
  REJECTION_WARNING
} from '@/constants/investorForm'

interface Props {
  formData?: FilledInvestorFormData
  rejectionWarning?: RejectionWarning
}

interface Emits {
  (e: 'actionClick', actionId: string): void
  (e: 'resubmit'): void
}

const props = withDefaults(defineProps<Props>(), {
  formData: undefined,
  rejectionWarning: undefined
})

const emit = defineEmits<Emits>()

const { currentProfile } = useProfile()

const newResourceLink = ref({
  type: '',
  url: ''
})

const resourceLinks = ref<Array<{ type: string; url: string }>>([])

const isFormFilled = computed(() => {
  return !!props.formData
})

const handleActionClick = (actionId: string) => {
  emit('actionClick', actionId)
  console.log('Action clicked:', actionId)
}

const handleResubmit = (): void => {
  emit('resubmit')
}

const addResourceLink = (): void => {
  if (newResourceLink.value.type && newResourceLink.value.url) {
    resourceLinks.value.push({
      type: newResourceLink.value.type,
      url: newResourceLink.value.url
    })
    newResourceLink.value.type = ''
    newResourceLink.value.url = ''
  }
}

const removeResourceLink = (index: number): void => {
  resourceLinks.value.splice(index, 1)
}
</script>

<style scoped>
.investor-profile-card {
  padding: 2rem;
}

.bg-purple-100 {
  background-color: #f3e8ff;
}

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

.field-input {
  width: 100%;
}

.name-surname-row,
.phone-email-row {
  display: flex;
  gap: 4rem;
  margin-bottom: 1.5rem;
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
